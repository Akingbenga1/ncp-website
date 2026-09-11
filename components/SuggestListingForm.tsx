"use client";

import { useActionState } from "react";
import {
  initialSuggestListingState,
  suggestListingAction,
  type SuggestListingState,
} from "@/lib/actions/suggest-listing";
import {
  LISTING_CATEGORIES,
  listingCategoryLabel,
} from "@/lib/domain/listing-labels";

const inputClass =
  "mt-space-3xs w-full rounded-lg border border-border-strong bg-surface-card px-space-sm py-space-2xs font-body text-body-md text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
const labelClass =
  "flex flex-col font-label text-label-md font-semibold text-text-primary";
const btnSolid =
  "inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container disabled:opacity-60";
const btnGhost =
  "inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted";

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

export function SuggestListingForm() {
  const [state, formAction, pending] = useActionState(
    suggestListingAction,
    initialSuggestListingState,
  );

  if (state.status === "success") {
    return (
      <div className="flex flex-col gap-space-md" role="status">
        <p className="rounded-lg bg-surface-tinted px-space-sm py-space-2xs font-body text-body-md text-brand-emerald">
          {state.message}
        </p>
        <p className="flex flex-wrap gap-space-2xs">
          <a className={btnSolid} href="/market">
            Back to Market
          </a>
          <a className={btnGhost} href="/market/suggest">
            Suggest another
          </a>
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-space-sm" action={formAction} noValidate>
      {state.status === "error" && state.message ? (
        <p
          className="rounded-lg bg-error-container px-space-sm py-space-2xs font-body text-body-md text-on-error-container"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <label className={labelClass} htmlFor="listing-name">
        Listing name
        <input
          id="listing-name"
          name="name"
          type="text"
          autoComplete="organization"
          required
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.name)}
          aria-describedby={
            state.fieldErrors?.name ? "listing-name-error" : undefined
          }
        />
      </label>
      <FieldError id="listing-name-error" message={state.fieldErrors?.name} />

      <label className={labelClass} htmlFor="listing-category">
        Category
        <select
          id="listing-category"
          name="category"
          required
          defaultValue=""
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.category)}
          aria-describedby={
            state.fieldErrors?.category ? "listing-category-error" : undefined
          }
        >
          <option value="" disabled>
            Select a category
          </option>
          {LISTING_CATEGORIES.map((value) => (
            <option key={value} value={value}>
              {listingCategoryLabel(value)}
            </option>
          ))}
        </select>
      </label>
      <FieldError
        id="listing-category-error"
        message={state.fieldErrors?.category}
      />

      <label className={labelClass} htmlFor="listing-locality">
        Area / town
        <input
          id="listing-locality"
          name="locality"
          type="text"
          autoComplete="address-level2"
          placeholder="e.g. Peterborough"
          className={inputClass}
        />
      </label>

      <label className={labelClass} htmlFor="listing-description">
        Short description
        <textarea
          id="listing-description"
          name="description"
          rows={5}
          required
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.description)}
          aria-describedby={
            state.fieldErrors?.description
              ? "listing-description-error"
              : undefined
          }
        />
      </label>
      <FieldError
        id="listing-description-error"
        message={state.fieldErrors?.description}
      />

      <label className={labelClass} htmlFor="listing-phone">
        Phone (optional)
        <input
          id="listing-phone"
          name="contactPhone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          className={inputClass}
        />
      </label>

      <label className={labelClass} htmlFor="listing-email">
        Listing email (optional)
        <input
          id="listing-email"
          name="contactEmail"
          type="email"
          autoComplete="email"
          inputMode="email"
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.contactEmail)}
          aria-describedby={
            state.fieldErrors?.contactEmail
              ? "listing-email-error"
              : undefined
          }
        />
      </label>
      <FieldError
        id="listing-email-error"
        message={state.fieldErrors?.contactEmail}
      />

      <label className={labelClass} htmlFor="listing-website">
        Website (optional)
        <input
          id="listing-website"
          name="websiteUrl"
          type="url"
          inputMode="url"
          placeholder="https://"
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.websiteUrl)}
          aria-describedby={
            state.fieldErrors?.websiteUrl ? "listing-website-error" : undefined
          }
        />
      </label>
      <FieldError
        id="listing-website-error"
        message={state.fieldErrors?.websiteUrl}
      />

      <label className={labelClass} htmlFor="listing-submitter">
        Your email (optional)
        <input
          id="listing-submitter"
          name="submittedByEmail"
          type="email"
          autoComplete="email"
          inputMode="email"
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.submittedByEmail)}
          aria-describedby={
            state.fieldErrors?.submittedByEmail
              ? "listing-submitter-error"
              : "listing-submitter-hint"
          }
        />
      </label>
      <p className="font-body text-body-sm text-text-muted" id="listing-submitter-hint">
        So we can contact you if we need more detail. Not shown on the public
        listing.
      </p>
      <FieldError
        id="listing-submitter-error"
        message={state.fieldErrors?.submittedByEmail}
      />

      <label
        className="flex items-start gap-space-2xs font-body text-body-sm text-text-secondary"
        htmlFor="listing-consent"
      >
        <input
          id="listing-consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-border-strong text-primary focus:ring-primary/20"
          aria-invalid={Boolean(state.fieldErrors?.consent)}
          aria-describedby={
            state.fieldErrors?.consent ? "listing-consent-error" : undefined
          }
        />
        <span>
          I agree that Nigerian Community Peterborough may store this
          suggestion to review and publish a directory listing. Nothing goes
          live without admin approval.
        </span>
      </label>
      <FieldError
        id="listing-consent-error"
        message={state.fieldErrors?.consent}
      />

      <div className="flex flex-wrap gap-space-2xs pt-space-2xs">
        <button className={btnSolid} type="submit" disabled={pending}>
          {pending ? "Sending…" : "Submit suggestion"}
        </button>
      </div>
    </form>
  );
}

/** Re-export state type for pages that want to type status UI. */
export type { SuggestListingState };
