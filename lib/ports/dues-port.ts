import type { BankTransferDetails } from "@/lib/domain/payment";
import type {
  ConfirmDuesCheckoutInput,
  CreateDuesCheckoutInput,
  DuesCheckoutSession,
  MemberDuesStatus,
  SubmitDuesReceiptInput,
} from "@/lib/domain/dues";

/**
 * Community Dues — separate from PaymentPort / donations.
 * Tracks current-period status, card checkout, and bank receipt upload.
 */
export interface DuesPort {
  getStatusForMember(
    memberId: string,
    email: string,
  ): Promise<MemberDuesStatus>;

  /** True when Stripe (or test) card checkout can start. */
  isCardCheckoutConfigured(): boolean;

  /** Same NCP bank account as donations (shared env config). */
  getBankTransferDetails(): Promise<BankTransferDetails | null>;

  createCardCheckout(
    input: CreateDuesCheckoutInput,
  ): Promise<DuesCheckoutSession>;

  /** Verify Stripe session and mark the period paid. */
  confirmCardCheckout(
    input: ConfirmDuesCheckoutInput,
  ): Promise<MemberDuesStatus>;

  /**
   * Store receipt as pending. Rejects if a pending upload already covers
   * the active period (no replacement).
   */
  submitBankReceipt(input: SubmitDuesReceiptInput): Promise<MemberDuesStatus>;
}
