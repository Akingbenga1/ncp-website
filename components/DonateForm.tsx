"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { MaterialIcon } from "@/components/MaterialIcon";
import {
  createCheckoutAction,
  initialDonateCheckoutState,
} from "@/lib/actions/donate";
import type { CharityIdentity } from "@/lib/domain/payment";
import { cn } from "@/lib/cn";

const fieldInputClass =
  "w-full rounded-xl bg-surface-stone py-3 pr-4 pl-11 font-body text-body-sm text-on-surface placeholder:text-text-muted transition duration-200 outline-none focus:bg-surface-card focus:shadow-md";
const plainInputClass =
  "w-full rounded-xl bg-surface-card py-3 px-4 font-body text-body-sm text-on-surface placeholder:text-text-muted transition duration-200 outline-none focus:shadow-md";

function FieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  if (!message) return null;
  return (
    <p className="mt-space-3xs font-body text-body-sm text-error" id={id} role="alert">
      {message}
    </p>
  );
}

const SUGGESTED = [
  { value: "10", label: "£10" },
  { value: "25", label: "£25" },
  { value: "50", label: "£50" },
] as const;

const DRAFT_GIFT_AID_LABEL =
  "Yes, add Gift Aid. I am a UK taxpayer and understand that if I pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all my donations in that tax year, it is my responsibility to pay any difference.";

type DonateFormProps = {
  /** When false, hide card CTA — do not show a disabled fake primary button. */
  checkoutAvailable: boolean;
  /** From PaymentPort — null until NH-2 charity number is configured. */
  charityIdentity: CharityIdentity | null;
};

export function DonateForm({
  checkoutAvailable,
  charityIdentity,
}: DonateFormProps) {
  const [state, formAction, pending] = useActionState(
    createCheckoutAction,
    initialDonateCheckoutState,
  );
  const [amountPreset, setAmountPreset] = useState<string>("25");
  const [giftAid, setGiftAid] = useState(false);

  if (!checkoutAvailable) {
    return (
      <div
        className="relative w-full rounded-2xl bg-surface-card p-6 shadow-sm sm:p-8 md:p-10"
        role="status"
      >
        <div className="mb-6 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-tinted text-primary">
            <MaterialIcon name="credit_card_off" className="text-[20px]" />
          </div>
          <div>
            <h2
              id="donate-card-heading"
              className="font-headline text-lg font-bold text-on-surface"
            >
              Card donation
            </h2>
            <p className="font-body text-xs text-text-muted">
              Checkout is being set up
            </p>
          </div>
        </div>
        <p className="rounded-xl bg-surface-tinted px-space-sm py-space-2xs font-body text-body-md text-text-secondary">
          Card donations are being set up. You can still give by bank transfer
          using the details on this page, or email Theresa for help.
        </p>
      </div>
    );
  }

  const declaration =
    charityIdentity?.giftAidDeclaration ?? DRAFT_GIFT_AID_LABEL;

  return (
    <div className="relative w-full rounded-2xl bg-surface-card p-6 shadow-sm sm:p-8 md:p-10">
      <div className="mb-6 flex items-center justify-between pb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-tinted text-primary">
            <MaterialIcon name="credit_card" className="text-[20px]" />
          </div>
          <div>
            <h2
              id="donate-card-heading"
              className="font-headline text-lg font-bold text-on-surface"
            >
              Card donation
            </h2>
            <p className="font-body text-xs text-text-muted">
              One-off or monthly · Gift Aid available
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-fixed px-2.5 py-1 text-xs font-semibold text-on-secondary-fixed">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-emerald" />
          Secure checkout
        </span>
      </div>

      <form className="space-y-5" action={formAction} noValidate>
        {state.status === "error" && state.message ? (
          <p
            className="rounded-xl bg-error-container px-space-sm py-space-2xs font-body text-body-md text-on-error-container"
            role="alert"
          >
            {state.message}
          </p>
        ) : null}

        <fieldset className="space-y-3 border-0 p-0">
          <legend className="font-label text-label-md font-semibold text-text-primary">
            Amount
          </legend>
          <div
            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
            role="radiogroup"
            aria-label="Donation amount"
          >
            {SUGGESTED.map((option) => (
              <label
                key={option.value}
                className={cn(
                  "cursor-pointer rounded-xl px-4 py-3 text-center font-label text-label-lg font-semibold transition-colors",
                  amountPreset === option.value
                    ? "bg-primary text-on-primary shadow-md"
                    : "bg-surface-stone text-primary hover:bg-surface-tinted",
                )}
              >
                <input
                  type="radio"
                  name="amountPreset"
                  value={option.value}
                  checked={amountPreset === option.value}
                  onChange={() => setAmountPreset(option.value)}
                  className="sr-only"
                />
                <span>{option.label}</span>
              </label>
            ))}
            <label
              className={cn(
                "cursor-pointer rounded-xl px-4 py-3 text-center font-label text-label-lg font-semibold transition-colors",
                amountPreset === "other"
                  ? "bg-primary text-on-primary shadow-md"
                  : "bg-surface-stone text-primary hover:bg-surface-tinted",
              )}
            >
              <input
                type="radio"
                name="amountPreset"
                value="other"
                checked={amountPreset === "other"}
                onChange={() => setAmountPreset("other")}
                className="sr-only"
              />
              <span>Other</span>
            </label>
          </div>
          {amountPreset === "other" ? (
            <div>
              <label
                className="mb-1.5 block font-label text-label-md font-semibold text-text-primary"
                htmlFor="donate-amount-other"
              >
                Other amount (£)
              </label>
              <div className="relative flex items-center">
                <MaterialIcon
                  name="payments"
                  className="pointer-events-none absolute left-3.5 text-[20px] text-text-muted"
                />
                <input
                  id="donate-amount-other"
                  name="amountOther"
                  type="number"
                  inputMode="decimal"
                  min={1}
                  max={25000}
                  step={0.01}
                  required
                  placeholder="e.g. 75"
                  className={fieldInputClass}
                  aria-invalid={Boolean(state.fieldErrors?.amount)}
                  aria-describedby={
                    state.fieldErrors?.amount ? "donate-amount-error" : undefined
                  }
                />
              </div>
            </div>
          ) : null}
          <FieldError
            id="donate-amount-error"
            message={state.fieldErrors?.amount}
          />
        </fieldset>

        <fieldset className="space-y-3 border-0 p-0">
          <legend className="font-label text-label-md font-semibold text-text-primary">
            Frequency
          </legend>
          <div
            className="grid grid-cols-2 gap-2"
            role="radiogroup"
            aria-label="Donation frequency"
          >
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-surface-stone px-4 py-3 font-label text-label-lg text-primary has-[:checked]:bg-primary has-[:checked]:text-on-primary has-[:checked]:shadow-md">
              <input
                type="radio"
                name="frequency"
                value="one-off"
                defaultChecked
                className="sr-only"
              />
              <MaterialIcon name="volunteer_activism" className="text-[18px]" />
              <span>One-off</span>
            </label>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-surface-stone px-4 py-3 font-label text-label-lg text-primary has-[:checked]:bg-primary has-[:checked]:text-on-primary has-[:checked]:shadow-md">
              <input
                type="radio"
                name="frequency"
                value="monthly"
                className="sr-only"
              />
              <MaterialIcon name="event_repeat" className="text-[18px]" />
              <span>Monthly</span>
            </label>
          </div>
          <FieldError
            id="donate-frequency-error"
            message={state.fieldErrors?.frequency}
          />
        </fieldset>

        <fieldset className="space-y-3 border-0 p-0">
          <legend className="font-label text-label-md font-semibold text-text-primary">
            Gift Aid
          </legend>
          {charityIdentity ? (
            <p
              className="font-body text-body-sm text-text-secondary"
              id="donate-charity-identity"
            >
              Gift Aid claims are made by{" "}
              <strong className="text-on-surface">
                {charityIdentity.registeredName}
              </strong>
              , registered charity number{" "}
              <strong className="text-on-surface">
                {charityIdentity.charityNumber}
              </strong>
              .
            </p>
          ) : (
            <p className="font-body text-body-sm text-text-muted" role="status">
              Registered charity name and number will appear here once NCP
              confirms them (NH-2). Gift Aid can still be recorded; official
              identity copy follows.
            </p>
          )}
          <label className="flex cursor-pointer items-start gap-3 select-none">
            <input
              type="checkbox"
              name="giftAid"
              checked={giftAid}
              onChange={(event) => setGiftAid(event.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded accent-primary focus:ring-0"
              aria-describedby={
                charityIdentity ? "donate-charity-identity" : undefined
              }
            />
            <span className="font-body text-xs text-text-secondary sm:text-sm">
              {declaration}
            </span>
          </label>
          {!charityIdentity ? (
            <p className="font-body text-body-sm text-text-muted">
              Draft declaration for launch wiring. Final wording may be replaced
              when NCP provides official Gift Aid text (NH-5).
            </p>
          ) : null}
          {giftAid ? (
            <div className="space-y-4 rounded-xl bg-surface-stone p-4">
              <div>
                <label
                  className="mb-1.5 block font-label text-label-md font-semibold text-text-primary"
                  htmlFor="donate-gift-aid-name"
                >
                  Full name
                </label>
                <input
                  id="donate-gift-aid-name"
                  name="giftAidName"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Name as on your tax records"
                  className={plainInputClass}
                  aria-invalid={Boolean(state.fieldErrors?.giftAidName)}
                  aria-describedby={
                    state.fieldErrors?.giftAidName
                      ? "donate-gift-aid-name-error"
                      : undefined
                  }
                />
                <FieldError
                  id="donate-gift-aid-name-error"
                  message={state.fieldErrors?.giftAidName}
                />
              </div>
              <div>
                <label
                  className="mb-1.5 block font-label text-label-md font-semibold text-text-primary"
                  htmlFor="donate-gift-aid-address"
                >
                  Address
                </label>
                <input
                  id="donate-gift-aid-address"
                  name="giftAidAddress"
                  type="text"
                  autoComplete="street-address"
                  required
                  placeholder="House number and street"
                  className={plainInputClass}
                  aria-invalid={Boolean(state.fieldErrors?.giftAidAddress)}
                  aria-describedby={
                    state.fieldErrors?.giftAidAddress
                      ? "donate-gift-aid-address-error"
                      : undefined
                  }
                />
                <FieldError
                  id="donate-gift-aid-address-error"
                  message={state.fieldErrors?.giftAidAddress}
                />
              </div>
              <div>
                <label
                  className="mb-1.5 block font-label text-label-md font-semibold text-text-primary"
                  htmlFor="donate-gift-aid-postcode"
                >
                  Postcode
                </label>
                <input
                  id="donate-gift-aid-postcode"
                  name="giftAidPostcode"
                  type="text"
                  autoComplete="postal-code"
                  required
                  placeholder="e.g. PE1 1AA"
                  className={plainInputClass}
                  aria-invalid={Boolean(state.fieldErrors?.giftAidPostcode)}
                  aria-describedby={
                    state.fieldErrors?.giftAidPostcode
                      ? "donate-gift-aid-postcode-error"
                      : undefined
                  }
                />
                <FieldError
                  id="donate-gift-aid-postcode-error"
                  message={state.fieldErrors?.giftAidPostcode}
                />
              </div>
            </div>
          ) : null}
        </fieldset>

        <button
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-label text-label-lg font-semibold text-on-primary shadow-md transition-all duration-200 hover:bg-primary-container hover:shadow-lg active:scale-[0.99] disabled:opacity-60"
          type="submit"
          disabled={pending}
        >
          <span>
            {pending ? "Starting checkout…" : "Continue to card payment"}
          </span>
          <MaterialIcon name="arrow_forward" className="text-[20px]" />
        </button>
      </form>

      <p className="mt-5 rounded-xl bg-surface-tinted/80 px-space-sm py-space-2xs font-body text-body-sm text-text-secondary">
        You will complete payment on a secure card checkout page. Money goes to
        NCP’s payment account, not a developer account. We process donation
        records under legitimate interests / legal obligation for financial
        records, and consent where you opt into Gift Aid. See our{" "}
        <Link
          className="font-semibold text-brand-emerald hover:underline"
          href="/privacy"
        >
          privacy policy
        </Link>
        .
      </p>
    </div>
  );
}
