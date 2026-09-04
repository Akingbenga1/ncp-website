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

export function SuggestListingForm() {
  const [state, formAction, pending] = useActionState(
    suggestListingAction,
    initialSuggestListingState,
  );

  if (state.status === "success") {
    return (
      <div className="form" role="status">
        <p className="form-status form-status--success">{state.message}</p>
        <p className="form-actions">
          <a className="btn btn-solid" href="/market">
            Back to Market
          </a>
          <a className="btn btn-primary" href="/market/suggest">
            Suggest another
          </a>
        </p>
      </div>
    );
  }

  return (
    <form className="form" action={formAction} noValidate>
      {state.status === "error" && state.message ? (
        <p className="form-status form-status--error" role="alert">
          {state.message}
        </p>
      ) : null}

      <label htmlFor="listing-name">
        Listing name
        <input
          id="listing-name"
          name="name"
          type="text"
          autoComplete="organization"
          required
          aria-invalid={Boolean(state.fieldErrors?.name)}
          aria-describedby={
            state.fieldErrors?.name ? "listing-name-error" : undefined
          }
        />
      </label>
      <FieldError id="listing-name-error" message={state.fieldErrors?.name} />

      <label htmlFor="listing-category">
        Category
        <select
          id="listing-category"
          name="category"
          required
          defaultValue=""
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

      <label htmlFor="listing-locality">
        Area / town
        <input
          id="listing-locality"
          name="locality"
          type="text"
          autoComplete="address-level2"
          placeholder="e.g. Peterborough"
        />
      </label>

      <label htmlFor="listing-description">
        Short description
        <textarea
          id="listing-description"
          name="description"
          rows={5}
          required
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

      <label htmlFor="listing-phone">
        Phone (optional)
        <input
          id="listing-phone"
          name="contactPhone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
        />
      </label>

      <label htmlFor="listing-email">
        Listing email (optional)
        <input
          id="listing-email"
          name="contactEmail"
          type="email"
          autoComplete="email"
          inputMode="email"
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

      <label htmlFor="listing-website">
        Website (optional)
        <input
          id="listing-website"
          name="websiteUrl"
          type="url"
          inputMode="url"
          placeholder="https://"
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

      <label htmlFor="listing-submitter">
        Your email (optional)
        <input
          id="listing-submitter"
          name="submittedByEmail"
          type="email"
          autoComplete="email"
          inputMode="email"
          aria-invalid={Boolean(state.fieldErrors?.submittedByEmail)}
          aria-describedby={
            state.fieldErrors?.submittedByEmail
              ? "listing-submitter-error"
              : "listing-submitter-hint"
          }
        />
      </label>
      <p className="form-note" id="listing-submitter-hint">
        So we can contact you if we need more detail. Not shown on the public
        listing.
      </p>
      <FieldError
        id="listing-submitter-error"
        message={state.fieldErrors?.submittedByEmail}
      />

      <label className="form-consent" htmlFor="listing-consent">
        <input
          id="listing-consent"
          name="consent"
          type="checkbox"
          required
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

      <div className="form-actions">
        <button className="btn btn-solid" type="submit" disabled={pending}>
          {pending ? "Sending…" : "Submit suggestion"}
        </button>
      </div>
    </form>
  );
}

/** Re-export state type for pages that want to type status UI. */
export type { SuggestListingState };
