"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestPasswordResetAction } from "@/lib/actions/auth";
import { initialForgotPasswordState } from "@/lib/actions/auth-state";

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

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(
    requestPasswordResetAction,
    initialForgotPasswordState,
  );

  if (state.status === "success") {
    return (
      <div className="form" role="status">
        <p className="form-status form-status--success">{state.message}</p>
        <div className="form-actions">
          <Link className="btn btn-solid" href="/login">
            Back to sign in
          </Link>
        </div>
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

      <p className="form-note">
        Enter the email for your membership account. If it matches an account,
        we will send a one-time reset link.
      </p>

      <label htmlFor="forgot-email">
        Email
        <input
          id="forgot-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={
            state.fieldErrors?.email ? "forgot-email-error" : undefined
          }
        />
      </label>
      <FieldError id="forgot-email-error" message={state.fieldErrors?.email} />

      <div className="form-actions">
        <button className="btn btn-solid" type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send reset link"}
        </button>
        <Link className="btn btn-primary" href="/login">
          Back to sign in
        </Link>
      </div>
    </form>
  );
}
