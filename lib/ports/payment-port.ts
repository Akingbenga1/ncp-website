import type {
  BankTransferDetails,
  CharityIdentity,
  CheckoutSession,
  CreateCheckoutInput,
} from "@/lib/domain/payment";

/**
 * Port: card checkout + public bank details + charity / Gift Aid copy for donations.
 * Concrete: Stripe Checkout adapter (Task 6.2); bank + charity from config/env — never Stripe.
 * No Stripe SDK types here.
 */
export interface PaymentPort {
  /**
   * Start a one-off or monthly donation checkout.
   * Gift Aid flags/metadata travel with the session for the payment provider / records.
   */
  createCheckout(input: CreateCheckoutInput): Promise<CheckoutSession>;

  /**
   * Public bank transfer details for offline giving.
   * Returns null when NH-4 data is not configured.
   */
  getBankTransferDetails(): Promise<BankTransferDetails | null>;

  /**
   * Registered charity identity and Gift Aid declaration copy.
   * Returns null when NH-2 (charity number) is not configured.
   */
  getCharityIdentity(): Promise<CharityIdentity | null>;
}
