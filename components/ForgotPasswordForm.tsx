"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestPasswordResetAction } from "@/lib/actions/auth";
import { initialForgotPasswordState } from "@/lib/actions/auth-state";

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

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(
    requestPasswordResetAction,
    initialForgotPasswordState,
  );

  if (state.status === "success") {
    return (
      <div className="flex flex-col gap-space-md" role="status">
        <p className="rounded-lg bg-surface-tinted px-space-sm py-space-2xs font-body text-body-md text-brand-emerald">
          {state.message}
        </p>
        <div className="flex flex-wrap gap-space-2xs">
          <Link className={btnSolid} href="/login">
            Back to sign in
          </Link>
        </div>
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

      <p className="font-body text-body-md text-text-secondary">
        Enter the email for your membership account. If it matches an account,
        we will send a one-time reset link.
      </p>

      <label className={labelClass} htmlFor="forgot-email">
        Email
        <input
          id="forgot-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={
            state.fieldErrors?.email ? "forgot-email-error" : undefined
          }
        />
      </label>
      <FieldError id="forgot-email-error" message={state.fieldErrors?.email} />

      <div className="flex flex-wrap gap-space-2xs pt-space-2xs">
        <button className={btnSolid} type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send reset link"}
        </button>
        <Link className={btnGhost} href="/login">
          Back to sign in
        </Link>
      </div>
    </form>
  );
}
