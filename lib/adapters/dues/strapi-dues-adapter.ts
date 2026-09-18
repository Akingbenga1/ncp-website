import Stripe from "stripe";
import {
  COMMUNITY_DUES_AMOUNT_GBP,
  isAllowedReceiptMime,
  isPeriodActive,
  periodEndsAtIso,
  type ConfirmDuesCheckoutInput,
  type CreateDuesCheckoutInput,
  type DuesCheckoutSession,
  type DuesRecord,
  type MemberDuesStatus,
  type SubmitDuesReceiptInput,
} from "@/lib/domain/dues";
import type { BankTransferDetails } from "@/lib/domain/payment";
import type { DuesPort } from "@/lib/ports/dues-port";
import {
  isPaymentCheckoutConfigured,
  readBankDetailsFromEnv,
} from "@/lib/adapters/stripe";
import type { AuthCredentialStore } from "@/lib/adapters/strapi/auth-session";
import {
  resolveStrapiConfig,
  strapiAuthRequest,
  strapiFetchJson,
  strapiMutateJson,
  strapiUploadFile,
  type StrapiClientConfig,
} from "@/lib/adapters/strapi/client";
import type {
  StrapiListResponse,
  StrapiOneResponse,
} from "@/lib/adapters/strapi/types";

const DUES_PURPOSE = "community-dues";
const DUES_PATH = "/api/community-dues";

type StrapiCommunityDueDoc = {
  documentId?: string;
  id?: number | string;
  memberId?: string;
  email?: string;
  status?: "pending" | "paid";
  method?: "card" | "bank_transfer";
  periodStartedAt?: string;
  amountGbp?: number | string;
  stripeSessionId?: string | null;
  receiptFileName?: string | null;
  receiptMimeType?: string | null;
  receipt?: { id?: number; url?: string; name?: string } | null;
};

function toStatus(
  record: DuesRecord | null,
  email: string,
  now: Date = new Date(),
): MemberDuesStatus {
  const paymentReferenceEmail = email.trim().toLowerCase();

  if (!record || !isPeriodActive(record.periodStartedAt, now)) {
    return {
      status: "due",
      amountGbp: COMMUNITY_DUES_AMOUNT_GBP,
      periodEndsAt: null,
      paymentReferenceEmail,
      hasPendingReceipt: false,
    };
  }

  return {
    status: record.status === "paid" ? "paid" : "pending",
    amountGbp: COMMUNITY_DUES_AMOUNT_GBP,
    periodEndsAt: periodEndsAtIso(record.periodStartedAt),
    paymentReferenceEmail,
    hasPendingReceipt: record.status === "pending",
  };
}

function mapDoc(doc: StrapiCommunityDueDoc | null | undefined): DuesRecord | null {
  if (
    !doc?.memberId ||
    !doc.email ||
    !doc.status ||
    !doc.method ||
    !doc.periodStartedAt
  ) {
    return null;
  }
  const amount =
    typeof doc.amountGbp === "number"
      ? doc.amountGbp
      : Number.parseFloat(String(doc.amountGbp ?? COMMUNITY_DUES_AMOUNT_GBP));

  return {
    memberId: String(doc.memberId),
    email: String(doc.email).trim().toLowerCase(),
    status: doc.status,
    method: doc.method,
    periodStartedAt: doc.periodStartedAt,
    amountGbp: Number.isFinite(amount) ? amount : COMMUNITY_DUES_AMOUNT_GBP,
    stripeSessionId: doc.stripeSessionId?.trim() || undefined,
    receiptFileName:
      doc.receiptFileName?.trim() || doc.receipt?.name || undefined,
    receiptMimeType: doc.receiptMimeType?.trim() || undefined,
    receiptStoredName: doc.receipt?.url || undefined,
  };
}

function buildListQuery(memberId: string): string {
  const q = new URLSearchParams({
    "filters[memberId][$eq]": memberId,
    sort: "periodStartedAt:desc",
    "pagination[pageSize]": "1",
    "populate[receipt]": "true",
  });
  return `${DUES_PATH}?${q.toString()}`;
}

export type CreateStrapiDuesAdapterOptions = {
  config?: StrapiClientConfig;
  env?: NodeJS.ProcessEnv;
  stripe?: Stripe | null;
  /** Shared with AuthPort — member JWT for Strapi Content API when no API token. */
  credentials?: AuthCredentialStore;
};

/**
 * Strapi-backed Community Dues (Postgres via Strapi).
 * Uses STRAPI_API_TOKEN when set; otherwise the signed-in member JWT.
 */
export function createStrapiDuesAdapter(
  options: CreateStrapiDuesAdapterOptions = {},
): DuesPort {
  const env = options.env ?? process.env;
  const config = options.config ?? resolveStrapiConfig(env);
  const bankDetails = readBankDetailsFromEnv(env);
  const credentials = options.credentials;

  function stripeClient(): Stripe | null {
    if (options.stripe !== undefined) return options.stripe;
    const secretKey = env.STRIPE_SECRET_KEY?.trim() ?? "";
    if (!secretKey) return null;
    return new Stripe(secretKey);
  }

  async function memberToken(): Promise<string | null> {
    if (!credentials) return null;
    return credentials.getAccessToken();
  }

  async function loadLatestRecord(memberId: string): Promise<DuesRecord | null> {
    if (config.apiToken) {
      const json = await strapiFetchJson<
        StrapiListResponse<StrapiCommunityDueDoc>
      >(DUES_PATH, config, {
        "filters[memberId][$eq]": memberId,
        sort: "periodStartedAt:desc",
        "pagination[pageSize]": 1,
        "populate[receipt]": "true",
      });
      return mapDoc(json?.data?.[0]);
    }

    const token = await memberToken();
    if (!token) {
      console.error("DuesPort(Strapi): not signed in and no STRAPI_API_TOKEN");
      return null;
    }

    const result = await strapiAuthRequest<
      StrapiListResponse<StrapiCommunityDueDoc>
    >(buildListQuery(memberId), config, { accessToken: token });

    if (!result.ok) {
      console.error("DuesPort(Strapi) load failed", result.message);
      return null;
    }
    return mapDoc(result.data?.data?.[0]);
  }

  async function createRecord(
    record: DuesRecord,
    receiptMediaId?: number,
  ): Promise<DuesRecord> {
    const body: Record<string, unknown> = {
      memberId: record.memberId,
      email: record.email,
      status: record.status,
      method: record.method,
      periodStartedAt: record.periodStartedAt,
      amountGbp: record.amountGbp,
    };
    if (record.stripeSessionId) body.stripeSessionId = record.stripeSessionId;
    if (record.receiptFileName) body.receiptFileName = record.receiptFileName;
    if (record.receiptMimeType) body.receiptMimeType = record.receiptMimeType;
    if (receiptMediaId !== undefined) body.receipt = receiptMediaId;

    if (config.apiToken) {
      const created = await strapiMutateJson<
        StrapiOneResponse<StrapiCommunityDueDoc>
      >(DUES_PATH, config, { data: body }, { method: "POST" });
      const mapped = mapDoc(created?.data);
      if (!mapped) {
        throw new Error("Could not save community dues record in Strapi");
      }
      return mapped;
    }

    const token = await memberToken();
    if (!token) {
      throw new Error("Please sign in to save community dues");
    }

    const result = await strapiAuthRequest<
      StrapiOneResponse<StrapiCommunityDueDoc>
    >(DUES_PATH, config, {
      method: "POST",
      accessToken: token,
      body: { data: body },
    });

    if (!result.ok) {
      throw new Error(result.message || "Could not save community dues record");
    }
    const mapped = mapDoc(result.data?.data);
    if (!mapped) {
      throw new Error("Could not save community dues record in Strapi");
    }
    return mapped;
  }

  return {
    async getStatusForMember(
      memberId: string,
      email: string,
    ): Promise<MemberDuesStatus> {
      const record = await loadLatestRecord(memberId);
      return toStatus(record, email);
    },

    isCardCheckoutConfigured(): boolean {
      return isPaymentCheckoutConfigured(env);
    },

    async getBankTransferDetails(): Promise<BankTransferDetails | null> {
      return bankDetails;
    },

    async createCardCheckout(
      input: CreateDuesCheckoutInput,
    ): Promise<DuesCheckoutSession> {
      const stripe = stripeClient();
      if (!stripe) {
        throw new Error("Card dues checkout is not configured");
      }

      const existing = await loadLatestRecord(input.memberId);
      if (existing && isPeriodActive(existing.periodStartedAt)) {
        if (existing.status === "paid") {
          throw new Error("Community dues are already paid for this period");
        }
        if (existing.status === "pending") {
          throw new Error(
            "A bank-transfer receipt is already pending for this period",
          );
        }
      }

      const amountMinor = Math.round(COMMUNITY_DUES_AMOUNT_GBP * 100);
      const metadata = {
        purpose: DUES_PURPOSE,
        member_id: input.memberId,
        member_email: input.email.trim().toLowerCase(),
        amount_gbp: String(COMMUNITY_DUES_AMOUNT_GBP),
        source: "ncp-web-dues",
      };

      const successUrl = input.successUrl.includes("{CHECKOUT_SESSION_ID}")
        ? input.successUrl
        : `${input.successUrl}${input.successUrl.includes("?") ? "&" : "?"}session_id={CHECKOUT_SESSION_ID}`;

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: successUrl,
        cancel_url: input.cancelUrl,
        customer_email: input.email.trim(),
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "gbp",
              unit_amount: amountMinor,
              product_data: {
                name: "NCP community dues",
                description: "Rolling 30-day community dues (£20)",
              },
            },
          },
        ],
        metadata,
        payment_intent_data: { metadata },
      });

      const redirectUrl = session.url?.trim();
      if (!session.id || !redirectUrl) {
        throw new Error("Stripe Checkout did not return a session URL");
      }

      return { id: session.id, redirectUrl };
    },

    async confirmCardCheckout(
      input: ConfirmDuesCheckoutInput,
    ): Promise<MemberDuesStatus> {
      const stripe = stripeClient();
      if (!stripe) {
        throw new Error("Card dues checkout is not configured");
      }

      const session = await stripe.checkout.sessions.retrieve(input.sessionId);
      if (session.payment_status !== "paid") {
        throw new Error("Checkout session is not paid");
      }

      const purpose = session.metadata?.purpose;
      const memberIdMeta = session.metadata?.member_id;
      if (purpose !== DUES_PURPOSE || memberIdMeta !== input.memberId) {
        throw new Error("Checkout session does not match this member’s dues");
      }

      const existing = await loadLatestRecord(input.memberId);
      if (
        existing &&
        isPeriodActive(existing.periodStartedAt) &&
        existing.status === "paid" &&
        existing.stripeSessionId === session.id
      ) {
        return toStatus(existing, input.email);
      }

      const nowIso = new Date().toISOString();
      const record = await createRecord({
        memberId: input.memberId,
        email: input.email.trim().toLowerCase(),
        status: "paid",
        method: "card",
        periodStartedAt: nowIso,
        amountGbp: COMMUNITY_DUES_AMOUNT_GBP,
        stripeSessionId: session.id,
      });
      return toStatus(record, input.email);
    },

    async submitBankReceipt(
      input: SubmitDuesReceiptInput,
    ): Promise<MemberDuesStatus> {
      if (!isAllowedReceiptMime(input.mimeType)) {
        throw new Error(
          "Receipt must be a PDF or image (JPEG, PNG, WebP, or GIF)",
        );
      }
      if (!input.bytes.length) {
        throw new Error("Receipt file is empty");
      }
      if (input.bytes.length > 8 * 1024 * 1024) {
        throw new Error("Receipt must be 8 MB or smaller");
      }

      const existing = await loadLatestRecord(input.memberId);
      if (existing && isPeriodActive(existing.periodStartedAt)) {
        if (existing.status === "paid") {
          throw new Error("Community dues are already paid for this period");
        }
        if (existing.status === "pending") {
          throw new Error(
            "A receipt is already pending for this period and cannot be replaced",
          );
        }
      }

      const token = config.apiToken ? null : await memberToken();
      const uploaded = await strapiUploadFile(
        config,
        {
          bytes: input.bytes,
          fileName: input.fileName,
          mimeType: input.mimeType,
        },
        token,
      );
      if (!uploaded) {
        throw new Error(
          "Could not upload receipt to Strapi. Sign in again or configure STRAPI_API_TOKEN / upload permissions.",
        );
      }

      const nowIso = new Date().toISOString();
      const record = await createRecord(
        {
          memberId: input.memberId,
          email: input.email.trim().toLowerCase(),
          status: "pending",
          method: "bank_transfer",
          periodStartedAt: nowIso,
          amountGbp: COMMUNITY_DUES_AMOUNT_GBP,
          receiptFileName: input.fileName,
          receiptMimeType: input.mimeType,
          receiptStoredName: uploaded.url,
        },
        uploaded.id,
      );
      return toStatus(record, input.email);
    },
  };
}
