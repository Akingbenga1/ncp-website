/** Domain types for donations (PaymentPort). No Stripe SDK types. */

export type DonationFrequency = "one-off" | "monthly";

export type GiftAidDetails = {
  /** Donor opts into Gift Aid; wording comes from content/config. */
  optedIn: boolean;
  fullName?: string;
  addressLine?: string;
  postcode?: string;
};

export type CreateDonationSessionInput = {
  amountGbp: number;
  frequency: DonationFrequency;
  giftAid?: GiftAidDetails;
  successUrl: string;
  cancelUrl: string;
};

export type DonationSession = {
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
