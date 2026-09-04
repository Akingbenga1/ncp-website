"use client";

import Link from "next/link";
import { useActionState } from "react";
import { resetPasswordAction } from "@/lib/actions/auth";
import { initialResetPasswordState } from "@/lib/actions/auth-state";

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

type ResetPasswordFormProps = {
  /** Opaque token from the reset email link (`?token=`). */
  token: string;
};

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [state, formAction, pending] = useActionState(
    resetPasswordAction,
    initialResetPasswordState,
  );

  if (state.status === "success") {
    return (
      <div className="form" role="status">
        <p className="form-status form-status--success">{state.message}</p>
        <div className="form-actions">
          <Link className="btn btn-solid" href="/login">
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="form" role="alert">
        <p className="form-status form-status--error">
          This reset link is missing or incomplete. Request a new one from the
          forgot-password page.
        </p>
        <div className="form-actions">
          <Link className="btn btn-solid" href="/forgot-password">
            Request a new link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="form" action={formAction} noValidate>
      <input type="hidden" name="token" value={token} />

      {state.status === "error" && state.message ? (
        <p className="form-status form-status--error" role="alert">
          {state.message}
        </p>
      ) : null}
      <FieldError id="reset-token-error" message={state.fieldErrors?.token} />

      <label htmlFor="reset-password">
        New password
        <input
          id="reset-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          aria-invalid={Boolean(state.fieldErrors?.password)}
          aria-describedby={
            state.fieldErrors?.password ? "reset-password-error" : undefined
          }
        />
      </label>
      <FieldError
        id="reset-password-error"
        message={state.fieldErrors?.password}
      />

      <label htmlFor="reset-password-confirm">
        Confirm new password
        <input
          id="reset-password-confirm"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          aria-invalid={Boolean(state.fieldErrors?.passwordConfirm)}
          aria-describedby={
            state.fieldErrors?.passwordConfirm
              ? "reset-password-confirm-error"
              : undefined
          }
        />
      </label>
      <FieldError
        id="reset-password-confirm-error"
        message={state.fieldErrors?.passwordConfirm}
      />

      <div className="form-actions">
        <button className="btn btn-solid" type="submit" disabled={pending}>
          {pending ? "Updating…" : "Update password"}
        </button>
        <Link className="btn btn-primary" href="/login">
          Back to sign in
        </Link>
      </div>
    </form>
  );
}
