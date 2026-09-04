import Stripe from "stripe";
import { noopPaymentAdapter } from "@/lib/adapters/noop";
import type {
  BankTransferDetails,
  CharityIdentity,
  CheckoutSession,
  CreateCheckoutInput,
} from "@/lib/domain/payment";
import type { PaymentPort } from "@/lib/ports/payment-port";

/** HMRC-aligned default when NH-5 custom wording is not set. */
export function defaultGiftAidDeclaration(registeredName: string): string {
  return (
    `I want to Gift Aid my donation and any donations I make in the future or ` +
    `have made in the past 4 years to ${registeredName}. I am a UK taxpayer and ` +
    `understand that if I pay less Income Tax and/or Capital Gains Tax than the ` +
    `amount of Gift Aid claimed on all my donations in that tax year, it is my ` +
    `responsibility to pay any difference.`
  );
}

export type CreateStripePaymentAdapterOptions = {
  /** Stripe secret key (test `sk_test_…` or live `sk_live_…`). */
  secretKey: string;
  /** Public bank details for offline giving — from config/env, not Stripe. */
  bankDetails?: BankTransferDetails | null;
  /** Charity identity + Gift Aid copy — from config/env (NH-2 / NH-5). */
  charityIdentity?: CharityIdentity | null;
};

function assertValidCheckoutInput(input: CreateCheckoutInput): void {
  if (!Number.isFinite(input.amountGbp) || input.amountGbp <= 0) {
    throw new Error("Donation amount must be a positive number of pounds");
  }
  if (input.amountGbp > 25000) {
    throw new Error("Donation amount is too large");
  }
  if (!input.successUrl?.trim() || !input.cancelUrl?.trim()) {
    throw new Error("successUrl and cancelUrl are required");
  }
}

function toMinorUnits(amountGbp: number): number {
  return Math.round(amountGbp * 100);
}

function giftAidMetadata(
  giftAid: CreateCheckoutInput["giftAid"],
  charity: CharityIdentity | null,
): Record<string, string> {
  if (!giftAid?.optedIn) {
    return { gift_aid: "false" };
  }
  const meta: Record<string, string> = { gift_aid: "true" };
  if (giftAid.fullName?.trim()) meta.gift_aid_name = giftAid.fullName.trim();
  if (giftAid.addressLine?.trim()) {
    meta.gift_aid_address = giftAid.addressLine.trim();
  }
  if (giftAid.postcode?.trim()) {
    meta.gift_aid_postcode = giftAid.postcode.trim();
  }
  if (charity?.charityNumber) {
    meta.charity_number = charity.charityNumber;
  }
  if (charity?.registeredName) {
    meta.charity_name = charity.registeredName;
  }
  return meta;
}

/**
 * Concrete PaymentPort over Stripe Checkout.
 * Bound at composition root (Task 6.3) — do not import from UI pages.
 */
export function createStripePaymentAdapter(
  options: CreateStripePaymentAdapterOptions,
): PaymentPort {
  const secretKey = options.secretKey.trim();
  if (!secretKey) {
    throw new Error("Stripe secret key is required");
  }

  const stripe = new Stripe(secretKey);
  const bankDetails = options.bankDetails ?? null;
  const charityIdentity = options.charityIdentity ?? null;

  return {
    async createCheckout(input: CreateCheckoutInput): Promise<CheckoutSession> {
      assertValidCheckoutInput(input);

      const amountMinor = toMinorUnits(input.amountGbp);
      const metadata = {
        ...giftAidMetadata(input.giftAid, charityIdentity),
        frequency: input.frequency,
        source: "ncp-web",
      };

      const productName =
        input.frequency === "monthly"
          ? "NCP monthly donation"
          : "NCP one-off donation";

      const session =
        input.frequency === "monthly"
          ? await stripe.checkout.sessions.create({
              mode: "subscription",
              success_url: input.successUrl,
              cancel_url: input.cancelUrl,
              line_items: [
                {
                  quantity: 1,
                  price_data: {
                    currency: "gbp",
                    unit_amount: amountMinor,
                    recurring: { interval: "month" },
                    product_data: { name: productName },
                  },
                },
              ],
              metadata,
              subscription_data: { metadata },
            })
          : await stripe.checkout.sessions.create({
              mode: "payment",
              success_url: input.successUrl,
              cancel_url: input.cancelUrl,
              line_items: [
                {
                  quantity: 1,
                  price_data: {
                    currency: "gbp",
                    unit_amount: amountMinor,
                    product_data: { name: productName },
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

    async getBankTransferDetails(): Promise<BankTransferDetails | null> {
      return bankDetails;
    },

    async getCharityIdentity(): Promise<CharityIdentity | null> {
      return charityIdentity;
    },
  };
}

export function readBankDetailsFromEnv(
  env: NodeJS.ProcessEnv = process.env,
): BankTransferDetails | null {
  const accountName = env.BANK_ACCOUNT_NAME?.trim() ?? "";
  const sortCode = env.BANK_SORT_CODE?.trim() ?? "";
  const accountNumber = env.BANK_ACCOUNT_NUMBER?.trim() ?? "";
  const bankName = env.BANK_NAME?.trim() || undefined;

  if (!accountName || !sortCode || !accountNumber) {
    return null;
  }

  return { accountName, sortCode, accountNumber, bankName };
}

/**
 * Charity identity from env (NH-2). Optional NH-5 overrides declaration wording.
 * Missing charity number → null (UI shows Needs-human draft state).
 */
export function readCharityIdentityFromEnv(
  env: NodeJS.ProcessEnv = process.env,
): CharityIdentity | null {
  const registeredName = env.CHARITY_REGISTERED_NAME?.trim() ?? "";
  const charityNumber = env.CHARITY_NUMBER?.trim() ?? "";
  const customDeclaration = env.GIFT_AID_DECLARATION?.trim() ?? "";

  if (!registeredName || !charityNumber) {
    return null;
  }

  return {
    registeredName,
    charityNumber,
    giftAidDeclaration:
      customDeclaration || defaultGiftAidDeclaration(registeredName),
  };
}

/**
 * Config-only PaymentPort when Stripe keys are missing (NH-3 pending).
 * Serves bank details and/or charity identity; card checkout unavailable.
 */
function createConfigOnlyPaymentAdapter(options: {
  bankDetails: BankTransferDetails | null;
  charityIdentity: CharityIdentity | null;
}): PaymentPort {
  const { bankDetails, charityIdentity } = options;
  return {
    async createCheckout() {
      throw new Error(
        "PaymentPort: card checkout not configured (missing STRIPE_SECRET_KEY)",
      );
    },
    async getBankTransferDetails() {
      return bankDetails;
    },
    async getCharityIdentity() {
      return charityIdentity;
    },
  };
}

/**
 * Factory Method: Stripe PaymentPort from env.
 * Missing STRIPE_SECRET_KEY → null (prefer createPaymentAdapterFromEnv).
 */
export function createStripePaymentAdapterFromEnv(
  env: NodeJS.ProcessEnv = process.env,
): PaymentPort | null {
  const secretKey = env.STRIPE_SECRET_KEY?.trim() ?? "";
  if (!secretKey) return null;

  return createStripePaymentAdapter({
    secretKey,
    bankDetails: readBankDetailsFromEnv(env),
    charityIdentity: readCharityIdentityFromEnv(env),
  });
}

/** True when card checkout can be started (Stripe secret present). */
export function isPaymentCheckoutConfigured(
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  if (env.PAYMENT_ADAPTER?.trim().toLowerCase() === "noop") return false;
  return Boolean(env.STRIPE_SECRET_KEY?.trim());
}

/**
 * Factory Method: PaymentPort from env for the composition root.
 * - Stripe when STRIPE_SECRET_KEY set (bank + charity attached when present)
 * - Config-only shell when BANK_* and/or CHARITY_* present (NH-3 pending)
 * - noop otherwise
 */
export function createPaymentAdapterFromEnv(
  env: NodeJS.ProcessEnv = process.env,
): PaymentPort {
  if (env.PAYMENT_ADAPTER?.trim().toLowerCase() === "noop") {
    return noopPaymentAdapter;
  }

  const stripe = createStripePaymentAdapterFromEnv(env);
  if (stripe) return stripe;

  const bank = readBankDetailsFromEnv(env);
  const charity = readCharityIdentityFromEnv(env);
  if (bank || charity) {
    return createConfigOnlyPaymentAdapter({
      bankDetails: bank,
      charityIdentity: charity,
    });
  }

  return noopPaymentAdapter;
}
