/** Domain types for donations (PaymentPort). No Stripe SDK types. */

export type DonationFrequency = "one-off" | "monthly";

export type GiftAidDetails = {
  /** Donor opts into Gift Aid; wording comes from content/config. */
  optedIn: boolean;
  fullName?: string;
  addressLine?: string;
  postcode?: string;
};

/**
 * Registered charity identity + Gift Aid declaration copy for the donate UI.
 * From config/env (NH-2 / NH-5) — not a payment-provider API.
 * Null from the port when charity number is not yet confirmed.
 */
export type CharityIdentity = {
  /** Legal registered name (e.g. for Gift Aid claims). */
  registeredName: string;
  /** Charity Commission / OSCR / CCNI number. */
  charityNumber: string;
  /**
   * Declaration text shown beside the Gift Aid checkbox.
   * When omitted by config, adapters supply HMRC-aligned default using registeredName.
   */
  giftAidDeclaration: string;
};

/**
 * Input for PaymentPort.createCheckout.
 * Amounts are GBP major units (e.g. 10 = £10.00).
 */
export type CreateCheckoutInput = {
  amountGbp: number;
  frequency: DonationFrequency;
  giftAid?: GiftAidDetails;
  successUrl: string;
  cancelUrl: string;
};

/** Opaque checkout session for the UI to redirect into. */
export type CheckoutSession = {
  /** Opaque id from the payment adapter. */
  id: string;
  /** URL the browser should navigate to (e.g. Stripe Checkout). */
  redirectUrl: string;
};

/** Public bank details for offline giving — config/content, not a vendor API. */
export type BankTransferDetails = {
  accountName: string;
  sortCode: string;
  accountNumber: string;
  bankName?: string;
};
