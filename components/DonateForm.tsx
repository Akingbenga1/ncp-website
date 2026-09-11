"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import {
  createCheckoutAction,
  initialDonateCheckoutState,
} from "@/lib/actions/donate";
import type { CharityIdentity } from "@/lib/domain/payment";
import { cn } from "@/lib/cn";

const inputClass =
  "mt-space-3xs w-full rounded-lg border border-border-strong bg-surface-card px-space-sm py-space-2xs font-body text-body-md text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
const labelClass =
  "flex flex-col font-label text-label-md font-semibold text-text-primary";
const btnSolid =
  "inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container disabled:opacity-60";

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
      <div className="flex flex-col gap-space-md" role="status">
        <p className="rounded-lg bg-surface-tinted px-space-sm py-space-2xs font-body text-body-md text-text-secondary">
          Card donations are being set up. You can still give by bank transfer
          using the details on this page, or email Theresa for help.
        </p>
      </div>
    );
  }

  const declaration =
    charityIdentity?.giftAidDeclaration ?? DRAFT_GIFT_AID_LABEL;

  return (
    <form className="flex flex-col gap-space-md" action={formAction} noValidate>
      {state.status === "error" && state.message ? (
        <p
          className="rounded-lg bg-error-container px-space-sm py-space-2xs font-body text-body-md text-on-error-container"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <fieldset className="flex flex-col gap-space-sm border-0 p-0">
        <legend className="font-label text-label-md font-semibold text-text-primary">
          Amount
        </legend>
        <div
          className="flex flex-wrap gap-space-2xs"
          role="radiogroup"
          aria-label="Donation amount"
        >
          {SUGGESTED.map((option) => (
            <label
              key={option.value}
              className={cn(
                "cursor-pointer rounded-lg border px-space-sm py-space-2xs font-label text-label-lg transition-colors",
                amountPreset === option.value
                  ? "border-primary bg-primary text-on-primary"
                  : "border-border-strong bg-surface-card text-primary hover:bg-surface-tinted",
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
              "cursor-pointer rounded-lg border px-space-sm py-space-2xs font-label text-label-lg transition-colors",
              amountPreset === "other"
                ? "border-primary bg-primary text-on-primary"
                : "border-border-strong bg-surface-card text-primary hover:bg-surface-tinted",
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
          <label className={labelClass} htmlFor="donate-amount-other">
            Other amount (£)
            <input
              id="donate-amount-other"
              name="amountOther"
              type="number"
              inputMode="decimal"
              min={1}
              max={25000}
              step={0.01}
              required
              className={inputClass}
              aria-invalid={Boolean(state.fieldErrors?.amount)}
              aria-describedby={
                state.fieldErrors?.amount ? "donate-amount-error" : undefined
              }
            />
          </label>
        ) : null}
        <FieldError id="donate-amount-error" message={state.fieldErrors?.amount} />
      </fieldset>

      <fieldset className="flex flex-col gap-space-sm border-0 p-0">
        <legend className="font-label text-label-md font-semibold text-text-primary">
          Frequency
        </legend>
        <div
          className="flex flex-wrap gap-space-2xs"
          role="radiogroup"
          aria-label="Donation frequency"
        >
          <label className="flex cursor-pointer items-center gap-space-2xs rounded-lg border border-border-strong bg-surface-card px-space-sm py-space-2xs font-label text-label-lg text-primary has-[:checked]:border-primary has-[:checked]:bg-surface-tinted">
            <input
              type="radio"
              name="frequency"
              value="one-off"
              defaultChecked
              className="accent-primary"
            />
            <span>One-off</span>
          </label>
          <label className="flex cursor-pointer items-center gap-space-2xs rounded-lg border border-border-strong bg-surface-card px-space-sm py-space-2xs font-label text-label-lg text-primary has-[:checked]:border-primary has-[:checked]:bg-surface-tinted">
            <input type="radio" name="frequency" value="monthly" className="accent-primary" />
            <span>Monthly</span>
          </label>
        </div>
        <FieldError
          id="donate-frequency-error"
          message={state.fieldErrors?.frequency}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-space-sm border-0 p-0">
        <legend className="font-label text-label-md font-semibold text-text-primary">
          Gift Aid
        </legend>
        {charityIdentity ? (
          <p className="font-body text-body-sm text-text-secondary" id="donate-charity-identity">
            Gift Aid claims are made by{" "}
            <strong>{charityIdentity.registeredName}</strong>, registered charity
            number <strong>{charityIdentity.charityNumber}</strong>.
          </p>
        ) : (
          <p className="font-body text-body-sm text-text-muted" role="status">
            Registered charity name and number will appear here once NCP confirms
            them (NH-2). Gift Aid can still be recorded; official identity copy
            follows.
          </p>
        )}
        <label className="flex items-start gap-space-2xs font-body text-body-sm text-text-secondary">
          <input
            type="checkbox"
            name="giftAid"
            checked={giftAid}
            onChange={(event) => setGiftAid(event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-border-strong text-primary focus:ring-primary/20"
            aria-describedby={
              charityIdentity ? "donate-charity-identity" : undefined
            }
          />
          <span>{declaration}</span>
        </label>
        {!charityIdentity ? (
          <p className="font-body text-body-sm text-text-muted">
            Draft declaration for launch wiring. Final wording may be replaced
            when NCP provides official Gift Aid text (NH-5).
          </p>
        ) : null}
        {giftAid ? (
          <div className="flex flex-col gap-space-sm rounded-xl bg-surface-stone p-space-sm">
            <label className={labelClass} htmlFor="donate-gift-aid-name">
              Full name
              <input
                id="donate-gift-aid-name"
                name="giftAidName"
                type="text"
                autoComplete="name"
                required
                className={inputClass}
                aria-invalid={Boolean(state.fieldErrors?.giftAidName)}
                aria-describedby={
                  state.fieldErrors?.giftAidName
                    ? "donate-gift-aid-name-error"
                    : undefined
                }
              />
            </label>
            <FieldError
              id="donate-gift-aid-name-error"
              message={state.fieldErrors?.giftAidName}
            />

            <label className={labelClass} htmlFor="donate-gift-aid-address">
              Address
              <input
                id="donate-gift-aid-address"
                name="giftAidAddress"
                type="text"
                autoComplete="street-address"
                required
                className={inputClass}
                aria-invalid={Boolean(state.fieldErrors?.giftAidAddress)}
                aria-describedby={
                  state.fieldErrors?.giftAidAddress
                    ? "donate-gift-aid-address-error"
                    : undefined
                }
              />
            </label>
            <FieldError
              id="donate-gift-aid-address-error"
              message={state.fieldErrors?.giftAidAddress}
            />

            <label className={labelClass} htmlFor="donate-gift-aid-postcode">
              Postcode
              <input
                id="donate-gift-aid-postcode"
                name="giftAidPostcode"
                type="text"
                autoComplete="postal-code"
                required
                className={inputClass}
                aria-invalid={Boolean(state.fieldErrors?.giftAidPostcode)}
                aria-describedby={
                  state.fieldErrors?.giftAidPostcode
                    ? "donate-gift-aid-postcode-error"
                    : undefined
                }
              />
            </label>
            <FieldError
              id="donate-gift-aid-postcode-error"
              message={state.fieldErrors?.giftAidPostcode}
            />
          </div>
        ) : null}
      </fieldset>

      <div className="flex flex-wrap gap-space-2xs">
        <button className={btnSolid} type="submit" disabled={pending}>
          {pending ? "Starting checkout…" : "Continue to card payment"}
        </button>
      </div>
      <p className="font-body text-body-sm text-text-muted">
        You will complete payment on a secure card checkout page. Money goes to
        NCP’s payment account, not a developer account. We process donation
        records under legitimate interests / legal obligation for financial
        records, and consent where you opt into Gift Aid. See our{" "}
        <Link className="text-brand-emerald underline-offset-2 hover:underline" href="/privacy">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
