import type { PaymentPort } from "@/lib/ports/payment-port";

/** No-op PaymentPort when payment adapters are not configured. */
export const noopPaymentAdapter: PaymentPort = {
  async createCheckout() {
    throw new Error("PaymentPort: createCheckout not configured");
  },
  async getBankTransferDetails() {
    return null;
  },
  async getCharityIdentity() {
    return null;
  },
};
