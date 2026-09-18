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
import {
  loadDuesRecord,
  saveDuesRecord,
  storeReceiptFile,
} from "./file-store";

const DUES_PURPOSE = "community-dues";

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

export type CreateFileDuesAdapterOptions = {
  env?: NodeJS.ProcessEnv;
  /** Inject Stripe for tests; default constructs from STRIPE_SECRET_KEY. */
  stripe?: Stripe | null;
};

/**
 * File-backed Community Dues adapter (MVP persistence).
 * Card checkout uses Stripe with dues-specific metadata — not PaymentPort.
 * Bank details reuse the same env vars as donations.
 */
export function createFileDuesAdapter(
  options: CreateFileDuesAdapterOptions = {},
): DuesPort {
  const env = options.env ?? process.env;
  const bankDetails = readBankDetailsFromEnv(env);

  function stripeClient(): Stripe | null {
    if (options.stripe !== undefined) return options.stripe;
    const secretKey = env.STRIPE_SECRET_KEY?.trim() ?? "";
    if (!secretKey) return null;
    return new Stripe(secretKey);
  }

  return {
    async getStatusForMember(
      memberId: string,
      email: string,
    ): Promise<MemberDuesStatus> {
      const record = await loadDuesRecord(memberId);
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

      const existing = await loadDuesRecord(input.memberId);
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

      const nowIso = new Date().toISOString();
      const record: DuesRecord = {
        memberId: input.memberId,
        email: input.email.trim().toLowerCase(),
        status: "paid",
        method: "card",
        periodStartedAt: nowIso,
        amountGbp: COMMUNITY_DUES_AMOUNT_GBP,
        stripeSessionId: session.id,
      };
      await saveDuesRecord(record);
      return toStatus(record, input.email);
    },

    async submitBankReceipt(
      input: SubmitDuesReceiptInput,
    ): Promise<MemberDuesStatus> {
      if (!isAllowedReceiptMime(input.mimeType)) {
        throw new Error("Receipt must be a PDF or image (JPEG, PNG, WebP, or GIF)");
      }
      if (!input.bytes.length) {
        throw new Error("Receipt file is empty");
      }
      if (input.bytes.length > 8 * 1024 * 1024) {
        throw new Error("Receipt must be 8 MB or smaller");
      }

      const existing = await loadDuesRecord(input.memberId);
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

      const storedName = await storeReceiptFile({
        memberId: input.memberId,
        fileName: input.fileName,
        bytes: input.bytes,
      });

      const nowIso = new Date().toISOString();
      const record: DuesRecord = {
        memberId: input.memberId,
        email: input.email.trim().toLowerCase(),
        status: "pending",
        method: "bank_transfer",
        periodStartedAt: nowIso,
        amountGbp: COMMUNITY_DUES_AMOUNT_GBP,
        receiptFileName: input.fileName,
        receiptMimeType: input.mimeType,
        receiptStoredName: storedName,
      };
      await saveDuesRecord(record);
      return toStatus(record, input.email);
    },
  };
}

export function createNoopDuesAdapter(): DuesPort {
  return {
    async getStatusForMember(memberId, email) {
      return {
        status: "due",
        amountGbp: COMMUNITY_DUES_AMOUNT_GBP,
        periodEndsAt: null,
        paymentReferenceEmail: email.trim().toLowerCase(),
        hasPendingReceipt: false,
      };
    },
    isCardCheckoutConfigured() {
      return false;
    },
    async getBankTransferDetails() {
      return null;
    },
    async createCardCheckout() {
      throw new Error("DuesPort: card checkout not configured");
    },
    async confirmCardCheckout() {
      throw new Error("DuesPort: card checkout not configured");
    },
    async submitBankReceipt() {
      throw new Error("DuesPort: receipt upload not configured");
    },
  };
}
