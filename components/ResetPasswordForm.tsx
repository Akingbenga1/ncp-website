"use client";

import Link from "next/link";
import { useActionState } from "react";
import { resetPasswordAction } from "@/lib/actions/auth";
import { initialResetPasswordState } from "@/lib/actions/auth-state";

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
      <div className="flex flex-col gap-space-md" role="status">
        <p className="rounded-lg bg-surface-tinted px-space-sm py-space-2xs font-body text-body-md text-brand-emerald">
          {state.message}
        </p>
        <div className="flex flex-wrap gap-space-2xs">
          <Link className={btnSolid} href="/login">
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex flex-col gap-space-md" role="alert">
        <p className="rounded-lg bg-error-container px-space-sm py-space-2xs font-body text-body-md text-on-error-container">
          This reset link is missing or incomplete. Request a new one from the
          forgot-password page.
        </p>
        <div className="flex flex-wrap gap-space-2xs">
          <Link className={btnSolid} href="/forgot-password">
            Request a new link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-space-sm" action={formAction} noValidate>
      <input type="hidden" name="token" value={token} />

      {state.status === "error" && state.message ? (
        <p
          className="rounded-lg bg-error-container px-space-sm py-space-2xs font-body text-body-md text-on-error-container"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}
      <FieldError id="reset-token-error" message={state.fieldErrors?.token} />

      <label className={labelClass} htmlFor="reset-password">
        New password
        <input
          id="reset-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          className={inputClass}
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

      <label className={labelClass} htmlFor="reset-password-confirm">
        Confirm new password
        <input
          id="reset-password-confirm"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          className={inputClass}
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

      <div className="flex flex-wrap gap-space-2xs pt-space-2xs">
        <button className={btnSolid} type="submit" disabled={pending}>
          {pending ? "Updating…" : "Update password"}
        </button>
        <Link className={btnGhost} href="/login">
          Back to sign in
        </Link>
      </div>
    </form>
  );
}
