import type {
  BankTransferDetails,
  CreateDonationSessionInput,
  DonationSession,
} from "@/lib/domain/payment";

/** Port: donate sessions + bank blurbs. Concrete: Stripe (+ bank as config). */
export interface PaymentPort {
  createDonationSession(
    input: CreateDonationSessionInput,
  ): Promise<DonationSession>;
  getBankTransferDetails(): Promise<BankTransferDetails | null>;
}
