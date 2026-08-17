import type { PaymentPort } from "@/lib/ports/payment-port";

/** No-op PaymentPort until Stripe adapter is wired. */
export const noopPaymentAdapter: PaymentPort = {
  async createDonationSession() {
    throw new Error("PaymentPort: createDonationSession not configured");
  },
  async getBankTransferDetails() {
    return null;
  },
};
