"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerAction } from "@/lib/actions/auth";
import { initialRegisterState } from "@/lib/actions/auth-state";
import {
  INVOLVEMENT_INTERESTS,
  involvementInterestLabel,
} from "@/lib/domain/member";

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

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialRegisterState,
  );

  if (state.status === "success") {
    return (
      <div className="flex flex-col gap-space-md" role="status">
        <p className="rounded-lg bg-surface-tinted px-space-sm py-space-2xs font-body text-body-md text-brand-emerald">
          {state.message}
        </p>
        <p className="flex flex-wrap gap-space-2xs">
          <Link className={btnSolid} href="/profile">
            Your profile
          </Link>
          <Link className={btnGhost} href="/login">
            Sign in
          </Link>
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

      <label className={labelClass} htmlFor="register-display-name">
        Full name
        <input
          id="register-display-name"
          name="displayName"
          type="text"
          autoComplete="name"
          required
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.displayName)}
          aria-describedby={
            state.fieldErrors?.displayName
              ? "register-display-name-error"
              : undefined
          }
        />
      </label>
      <FieldError
        id="register-display-name-error"
        message={state.fieldErrors?.displayName}
      />

      <label className={labelClass} htmlFor="register-email">
        Email
        <input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={
            state.fieldErrors?.email ? "register-email-error" : undefined
          }
        />
      </label>
      <FieldError
        id="register-email-error"
        message={state.fieldErrors?.email}
      />

      <label className={labelClass} htmlFor="register-password">
        Password
        <input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.password)}
          aria-describedby={
            state.fieldErrors?.password
              ? "register-password-error"
              : "register-password-hint"
          }
        />
      </label>
      <p className="font-body text-body-sm text-text-muted" id="register-password-hint">
        At least 6 characters.
      </p>
      <FieldError
        id="register-password-error"
        message={state.fieldErrors?.password}
      />

      <label className={labelClass} htmlFor="register-phone">
        Phone
        <input
          id="register-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.phone)}
          aria-describedby={
            state.fieldErrors?.phone ? "register-phone-error" : undefined
          }
        />
      </label>
      <FieldError
        id="register-phone-error"
        message={state.fieldErrors?.phone}
      />

      <label className={labelClass} htmlFor="register-locality">
        Postcode / area
        <input
          id="register-locality"
          name="locality"
          type="text"
          autoComplete="postal-code"
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.locality)}
          aria-describedby={
            state.fieldErrors?.locality
              ? "register-locality-error"
              : undefined
          }
        />
      </label>
      <FieldError
        id="register-locality-error"
        message={state.fieldErrors?.locality}
      />

      <label className={labelClass} htmlFor="register-involvement">
        How I want to be involved
        <select
          id="register-involvement"
          name="involvement"
          required
          defaultValue=""
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.involvement)}
          aria-describedby={
            state.fieldErrors?.involvement
              ? "register-involvement-error"
              : undefined
          }
        >
          <option value="" disabled>
            Select an option
          </option>
          {INVOLVEMENT_INTERESTS.map((value) => (
            <option key={value} value={value}>
              {involvementInterestLabel(value)}
            </option>
          ))}
        </select>
      </label>
      <FieldError
        id="register-involvement-error"
        message={state.fieldErrors?.involvement}
      />

      <label
        className="flex items-start gap-space-2xs font-body text-body-sm text-text-secondary"
        htmlFor="register-consent"
      >
        <input
          id="register-consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-border-strong text-primary focus:ring-primary/20"
          aria-invalid={Boolean(state.fieldErrors?.consent)}
          aria-describedby={
            state.fieldErrors?.consent ? "register-consent-error" : undefined
          }
        />
        <span>
          I agree that Nigerian Community Peterborough may store my membership
          details for community membership (GDPR consent).
        </span>
      </label>
      <FieldError
        id="register-consent-error"
        message={state.fieldErrors?.consent}
      />

      <div className="flex flex-wrap gap-space-2xs pt-space-2xs">
        <button className={btnSolid} type="submit" disabled={pending}>
          {pending ? "Creating account…" : "Create free account"}
        </button>
        <Link className={btnGhost} href="/login">
          Already a member? Sign in
        </Link>
      </div>
    </form>
  );
}
