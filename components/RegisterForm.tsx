"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerAction } from "@/lib/actions/auth";
import { initialRegisterState } from "@/lib/actions/auth-state";
import {
  INVOLVEMENT_INTERESTS,
  involvementInterestLabel,
} from "@/lib/domain/member";

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

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialRegisterState,
  );

  if (state.status === "success") {
    return (
      <div className="form" role="status">
        <p className="form-status form-status--success">{state.message}</p>
        <p className="form-actions">
          <Link className="btn btn-solid" href="/profile">
            Your profile
          </Link>
          <Link className="btn btn-primary" href="/login">
            Sign in
          </Link>
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

      <label htmlFor="register-display-name">
        Full name
        <input
          id="register-display-name"
          name="displayName"
          type="text"
          autoComplete="name"
          required
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

      <label htmlFor="register-email">
        Email
        <input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
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

      <label htmlFor="register-password">
        Password
        <input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          aria-invalid={Boolean(state.fieldErrors?.password)}
          aria-describedby={
            state.fieldErrors?.password
              ? "register-password-error"
              : "register-password-hint"
          }
        />
      </label>
      <p className="form-note" id="register-password-hint">
        At least 6 characters.
      </p>
      <FieldError
        id="register-password-error"
        message={state.fieldErrors?.password}
      />

      <label htmlFor="register-phone">
        Phone
        <input
          id="register-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
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

      <label htmlFor="register-locality">
        Postcode / area
        <input
          id="register-locality"
          name="locality"
          type="text"
          autoComplete="postal-code"
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

      <label htmlFor="register-involvement">
        How I want to be involved
        <select
          id="register-involvement"
          name="involvement"
          required
          defaultValue=""
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

      <label className="form-consent" htmlFor="register-consent">
        <input
          id="register-consent"
          name="consent"
          type="checkbox"
          required
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

      <div className="form-actions">
        <button className="btn btn-solid" type="submit" disabled={pending}>
          {pending ? "Creating account…" : "Create free account"}
        </button>
        <Link className="btn btn-primary" href="/login">
          Already a member? Sign in
        </Link>
      </div>
    </form>
  );
}
