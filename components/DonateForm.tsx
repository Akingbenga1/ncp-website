"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import {
  createCheckoutAction,
  initialDonateCheckoutState,
} from "@/lib/actions/donate";
import type { CharityIdentity } from "@/lib/domain/payment";

function FieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  if (!message) return null;
  return (
    <p className="form-field-error" id={id} role="alert">
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
      <div className="form" role="status">
        <p className="form-status">
          Card donations are being set up. You can still give by bank transfer
          using the details on this page, or email Theresa for help.
        </p>
      </div>
    );
  }

  const declaration =
    charityIdentity?.giftAidDeclaration ?? DRAFT_GIFT_AID_LABEL;

  return (
    <form className="form donate-form" action={formAction} noValidate>
      {state.status === "error" && state.message ? (
        <p className="form-status form-status--error" role="alert">
          {state.message}
        </p>
      ) : null}

      <fieldset className="donate-fieldset">
        <legend>Amount</legend>
        <div
          className="donate-amount-options"
          role="radiogroup"
          aria-label="Donation amount"
        >
          {SUGGESTED.map((option) => (
            <label key={option.value} className="donate-choice">
              <input
                type="radio"
                name="amountPreset"
                value={option.value}
                checked={amountPreset === option.value}
                onChange={() => setAmountPreset(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
          <label className="donate-choice">
            <input
              type="radio"
              name="amountPreset"
              value="other"
              checked={amountPreset === "other"}
              onChange={() => setAmountPreset("other")}
            />
            <span>Other</span>
          </label>
        </div>
        {amountPreset === "other" ? (
          <label htmlFor="donate-amount-other">
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
              aria-invalid={Boolean(state.fieldErrors?.amount)}
              aria-describedby={
                state.fieldErrors?.amount ? "donate-amount-error" : undefined
              }
            />
          </label>
        ) : null}
        <FieldError id="donate-amount-error" message={state.fieldErrors?.amount} />
      </fieldset>

      <fieldset className="donate-fieldset">
        <legend>Frequency</legend>
        <div
          className="donate-amount-options"
          role="radiogroup"
          aria-label="Donation frequency"
        >
          <label className="donate-choice">
            <input
              type="radio"
              name="frequency"
              value="one-off"
              defaultChecked
            />
            <span>One-off</span>
          </label>
          <label className="donate-choice">
            <input type="radio" name="frequency" value="monthly" />
            <span>Monthly</span>
          </label>
        </div>
        <FieldError
          id="donate-frequency-error"
          message={state.fieldErrors?.frequency}
        />
      </fieldset>

      <fieldset className="donate-fieldset">
        <legend>Gift Aid</legend>
        {charityIdentity ? (
          <p className="donate-charity-identity" id="donate-charity-identity">
            Gift Aid claims are made by{" "}
            <strong>{charityIdentity.registeredName}</strong>, registered charity
            number <strong>{charityIdentity.charityNumber}</strong>.
          </p>
        ) : (
          <p className="form-note" role="status">
            Registered charity name and number will appear here once NCP confirms
            them (NH-2). Gift Aid can still be recorded; official identity copy
            follows.
          </p>
        )}
        <label className="form-consent">
          <input
            type="checkbox"
            name="giftAid"
            checked={giftAid}
            onChange={(event) => setGiftAid(event.target.checked)}
            aria-describedby={
              charityIdentity ? "donate-charity-identity" : undefined
            }
          />
          <span>{declaration}</span>
        </label>
        {!charityIdentity ? (
          <p className="form-note">
            Draft declaration for launch wiring. Final wording may be replaced
            when NCP provides official Gift Aid text (NH-5).
          </p>
        ) : null}
        {giftAid ? (
          <div className="donate-gift-aid-fields">
            <label htmlFor="donate-gift-aid-name">
              Full name
              <input
                id="donate-gift-aid-name"
                name="giftAidName"
                type="text"
                autoComplete="name"
                required
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

            <label htmlFor="donate-gift-aid-address">
              Address
              <input
                id="donate-gift-aid-address"
                name="giftAidAddress"
                type="text"
                autoComplete="street-address"
                required
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

            <label htmlFor="donate-gift-aid-postcode">
              Postcode
              <input
                id="donate-gift-aid-postcode"
                name="giftAidPostcode"
                type="text"
                autoComplete="postal-code"
                required
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

      <div className="form-actions">
        <button className="btn btn-solid" type="submit" disabled={pending}>
          {pending ? "Starting checkout…" : "Continue to card payment"}
        </button>
      </div>
      <p className="form-note">
        You will complete payment on a secure card checkout page. Money goes to
        NCP’s payment account, not a developer account. We process donation
        records under legitimate interests / legal obligation for financial
        records, and consent where you opt into Gift Aid. See our{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>
    </form>
  );
}
