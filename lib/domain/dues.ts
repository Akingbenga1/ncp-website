/** Domain types for Community Dues (DuesPort). Separate from donations. */

export const COMMUNITY_DUES_AMOUNT_GBP = 20;
export const COMMUNITY_DUES_PERIOD_DAYS = 30;

/** Current-period status only (no history in MVP). */
export type DuesPeriodStatus = "due" | "pending" | "paid";

export type DuesPaymentMethod = "card" | "bank_transfer";

/**
 * Stored record for the member's latest dues activity.
 * Rolling 30-day window starts at paidAt (card) or submittedAt (bank receipt).
 */
export type DuesRecord = {
  memberId: string;
  email: string;
  status: "pending" | "paid";
  method: DuesPaymentMethod;
  /** ISO timestamp when the current period started (payment or receipt). */
  periodStartedAt: string;
  amountGbp: number;
  stripeSessionId?: string;
  receiptFileName?: string;
  receiptMimeType?: string;
  receiptStoredName?: string;
};

export type MemberDuesStatus = {
  status: DuesPeriodStatus;
  amountGbp: number;
  /** ISO end of current coverage window when paid/pending; null when due. */
  periodEndsAt: string | null;
  paymentReferenceEmail: string;
  hasPendingReceipt: boolean;
};

export type CreateDuesCheckoutInput = {
  memberId: string;
  email: string;
  successUrl: string;
  cancelUrl: string;
};

export type ConfirmDuesCheckoutInput = {
  memberId: string;
  email: string;
  sessionId: string;
};

export type SubmitDuesReceiptInput = {
  memberId: string;
  email: string;
  fileName: string;
  mimeType: string;
  bytes: Uint8Array;
};

export type DuesCheckoutSession = {
  id: string;
  redirectUrl: string;
};

export function periodEndsAtIso(periodStartedAt: string): string {
  const start = new Date(periodStartedAt);
  const end = new Date(
    start.getTime() + COMMUNITY_DUES_PERIOD_DAYS * 24 * 60 * 60 * 1000,
  );
  return end.toISOString();
}

export function isPeriodActive(
  periodStartedAt: string,
  now: Date = new Date(),
): boolean {
  return now.getTime() < new Date(periodEndsAtIso(periodStartedAt)).getTime();
}

export function isAllowedReceiptMime(mimeType: string): boolean {
  const mime = mimeType.trim().toLowerCase();
  return (
    mime === "application/pdf" ||
    mime === "image/jpeg" ||
    mime === "image/png" ||
    mime === "image/webp" ||
    mime === "image/gif"
  );
}
