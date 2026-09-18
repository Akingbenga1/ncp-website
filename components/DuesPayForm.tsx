"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createDuesCheckoutAction,
  submitDuesReceiptAction,
} from "@/lib/actions/dues";
import {
  initialDuesCheckoutState,
  initialDuesReceiptState,
  type DuesCheckoutState,
  type DuesReceiptState,
} from "@/lib/actions/dues-state";
import type { MemberDuesStatus } from "@/lib/domain/dues";
import { COMMUNITY_DUES_AMOUNT_GBP } from "@/lib/domain/dues";
import type { BankTransferDetails } from "@/lib/domain/payment";
import { MaterialIcon } from "@/components/MaterialIcon";
import { BankTransferDetailsBlock } from "@/components/BankTransferDetails";
import { DuesStatusBadge } from "@/components/DuesStatusBadge";

type DuesPayFormProps = {
  duesStatus: MemberDuesStatus;
  checkoutAvailable: boolean;
  bankDetails: BankTransferDetails | null;
  memberEmail: string;
};

function FormMessage({
  id,
  state,
}: {
  id: string;
  state: DuesCheckoutState | DuesReceiptState;
}) {
  if (!state.message) return null;
  const ok = "status" in state && state.status === "success";
  return (
    <p
      id={id}
      role="status"
      className={
        ok
          ? "font-body text-body-sm text-brand-emerald"
          : "font-body text-body-sm text-error"
      }
    >
      {state.message}
    </p>
  );
}

export function DuesPayForm({
  duesStatus,
  checkoutAvailable,
  bankDetails,
  memberEmail,
}: DuesPayFormProps) {
  const router = useRouter();
  const [checkoutState, checkoutAction, checkoutPending] = useActionState(
    createDuesCheckoutAction,
    initialDuesCheckoutState,
  );
  const [receiptState, receiptAction, receiptPending] = useActionState(
    submitDuesReceiptAction,
    initialDuesReceiptState,
  );

  useEffect(() => {
    if (receiptState.status === "success") {
      router.refresh();
    }
  }, [receiptState.status, router]);

  const isDue = duesStatus.status === "due";
  const canUpload = isDue;

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="rounded-2xl bg-surface-card p-space-md shadow-sm sm:p-space-lg">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm">
          <div>
            <h2 className="font-headline text-headline-sm font-bold text-text-primary">
              This period
            </h2>
            <p className="mt-space-3xs font-body text-body-sm text-text-secondary">
              Fixed amount £{COMMUNITY_DUES_AMOUNT_GBP} · rolling 30 days
            </p>
          </div>
          {duesStatus.status === "due" ? (
            <span className="inline-flex items-center gap-space-2xs rounded-lg bg-surface-tinted px-space-sm py-space-2xs font-label text-label-md text-primary">
              <MaterialIcon name="event_upcoming" className="text-[16px]" />
              Due now
            </span>
          ) : (
            <DuesStatusBadge
              status={duesStatus.status}
              periodEndsAt={duesStatus.periodEndsAt}
            />
          )}
        </div>

        {!isDue ? (
          <p className="font-body text-body-md text-text-secondary">
            {duesStatus.status === "paid"
              ? "Thank you — your community dues are paid for the current period. You can pay again when the next 30-day window opens."
              : "Your bank-transfer receipt is on file as pending. NCP will match it using your email as the payment reference. You cannot replace this upload while the period is active."}
          </p>
        ) : null}
      </div>

      {isDue ? (
        <>
          <section
            className="rounded-2xl bg-surface-card p-space-md shadow-sm sm:p-space-lg"
            aria-labelledby="dues-card-heading"
          >
            <div className="mb-space-md flex items-center gap-space-2xs">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-tinted text-primary">
                <MaterialIcon name="credit_card" className="text-[20px]" />
              </div>
              <h2
                id="dues-card-heading"
                className="font-headline text-headline-sm font-bold text-primary"
              >
                Pay by card
              </h2>
            </div>
            <p className="mb-space-md font-body text-body-sm text-text-secondary">
              One-off Stripe checkout for £{COMMUNITY_DUES_AMOUNT_GBP} community
              dues (separate from donations).
            </p>
            {checkoutAvailable ? (
              <form action={checkoutAction} className="flex flex-col gap-space-sm">
                <button
                  type="submit"
                  disabled={checkoutPending}
                  className="inline-flex w-full items-center justify-center gap-space-2xs rounded-lg bg-primary px-space-md py-space-xs font-label text-label-lg text-on-primary shadow-sm transition-colors hover:bg-primary-container disabled:opacity-60 sm:w-auto"
                >
                  <MaterialIcon name="lock" className="text-[18px]" />
                  {checkoutPending
                    ? "Starting checkout…"
                    : `Pay £${COMMUNITY_DUES_AMOUNT_GBP} by card`}
                </button>
                <FormMessage id="dues-checkout-msg" state={checkoutState} />
              </form>
            ) : (
              <p className="font-body text-body-sm text-text-muted">
                Card payment is not available yet. Please use bank transfer and
                upload your receipt below.
              </p>
            )}
          </section>

          <section
            className="rounded-2xl bg-surface-stone/50 p-space-md sm:p-space-lg"
            aria-labelledby="bank-transfer-heading"
          >
            <BankTransferDetailsBlock details={bankDetails} />
            <div className="mt-space-md rounded-xl border border-border-subtle bg-surface-card p-space-md">
              <p className="font-body text-body-sm text-text-secondary">
                Transfer{" "}
                <strong className="text-text-primary">
                  £{COMMUNITY_DUES_AMOUNT_GBP}
                </strong>{" "}
                and use this email as your payment reference so NCP can match
                your payment:
              </p>
              <p className="mt-space-2xs font-mono text-sm font-semibold break-all text-primary">
                {memberEmail}
              </p>
            </div>

            {canUpload ? (
              <form
                action={receiptAction}
                className="mt-space-md flex flex-col gap-space-sm"
              >
                <label
                  htmlFor="dues-receipt"
                  className="font-label text-label-md text-text-primary"
                >
                  Upload payment receipt (PDF or image)
                </label>
                <input
                  id="dues-receipt"
                  name="receipt"
                  type="file"
                  accept="application/pdf,image/jpeg,image/png,image/webp,image/gif,.pdf,.jpg,.jpeg,.png,.webp,.gif"
                  required
                  className="block w-full font-body text-body-sm text-text-secondary file:mr-space-sm file:rounded-lg file:border-0 file:bg-secondary file:px-space-sm file:py-space-2xs file:font-label file:text-label-md file:text-on-secondary"
                />
                <p className="font-body text-xs text-text-muted">
                  One upload per period — you cannot replace a pending receipt.
                </p>
                <button
                  type="submit"
                  disabled={receiptPending}
                  className="inline-flex w-full items-center justify-center gap-space-2xs rounded-lg bg-secondary px-space-md py-space-xs font-label text-label-lg text-on-secondary transition-colors hover:bg-secondary-container hover:text-on-secondary-container disabled:opacity-60 sm:w-auto"
                >
                  <MaterialIcon name="upload_file" className="text-[18px]" />
                  {receiptPending ? "Uploading…" : "Submit receipt"}
                </button>
                <FormMessage id="dues-receipt-msg" state={receiptState} />
              </form>
            ) : null}
          </section>
        </>
      ) : null}
    </div>
  );
}
