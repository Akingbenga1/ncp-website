"use client";

import Link from "next/link";
import { useActionState } from "react";
import { MaterialIcon } from "@/components/MaterialIcon";
import { requestPasswordResetAction } from "@/lib/actions/auth";
import { initialForgotPasswordState } from "@/lib/actions/auth-state";

const fieldInputClass =
  "w-full rounded-xl bg-surface-stone py-3 pr-4 pl-11 font-body text-body-sm text-on-surface placeholder:text-text-muted transition duration-200 outline-none focus:bg-surface-card focus:shadow-md";

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
      <div
        className="relative w-full rounded-2xl bg-surface-card p-6 shadow-sm sm:p-8 md:p-10 lg:col-span-7"
        role="status"
      >
        <div className="mb-6 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-tinted text-brand-emerald">
            <MaterialIcon name="mark_email_read" className="text-[20px]" />
          </div>
          <div>
            <h2 className="font-headline text-lg font-bold text-on-surface">
              Check your inbox
            </h2>
            <p className="font-body text-xs text-text-muted">
              Reset link sent if the account exists
            </p>
          </div>
        </div>
        <p className="rounded-xl bg-surface-tinted px-space-sm py-space-2xs font-body text-body-md text-brand-emerald">
          {state.message}
        </p>
        <div className="mt-space-md">
          <Link
            className="inline-flex items-center justify-center rounded-xl bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
            href="/login"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-2xl bg-surface-card p-6 shadow-sm sm:p-8 md:p-10 lg:col-span-7">
      <div className="mb-6 flex items-center justify-between pb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-tinted text-primary">
            <MaterialIcon name="lock_reset" className="text-[20px]" />
          </div>
          <div>
            <h2 className="font-headline text-lg font-bold text-on-surface">
              Reset your password
            </h2>
            <p className="font-body text-xs text-text-muted">
              We’ll email a one-time link
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-fixed px-2.5 py-1 text-xs font-semibold text-on-secondary-fixed">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-emerald" />
          Live Portal
        </span>
      </div>

      <form className="space-y-5" action={formAction} noValidate>
        {state.status === "error" && state.message ? (
          <p
            className="rounded-xl bg-error-container px-space-sm py-space-2xs font-body text-body-md text-on-error-container"
            role="alert"
          >
            {state.message}
          </p>
        ) : null}

        <p className="font-body text-sm text-text-secondary">
          Enter the email for your membership account. If it matches an
          account, we will send a one-time reset link.
        </p>

        <div>
          <label
            className="mb-1.5 block font-label text-label-md font-semibold text-text-primary"
            htmlFor="forgot-email"
          >
            Email Address <span className="text-error">*</span>
          </label>
          <div className="relative flex items-center">
            <MaterialIcon
              name="mail"
              className="pointer-events-none absolute left-3.5 text-[20px] text-text-muted"
            />
            <input
              id="forgot-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              placeholder="e.g. ada@gmail.com"
              className={fieldInputClass}
              aria-invalid={Boolean(state.fieldErrors?.email)}
              aria-describedby={
                state.fieldErrors?.email ? "forgot-email-error" : undefined
              }
            />
          </div>
          <FieldError
            id="forgot-email-error"
            message={state.fieldErrors?.email}
          />
        </div>

        <button
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-label text-label-lg font-semibold text-on-primary shadow-md transition-all duration-200 hover:bg-primary-container hover:shadow-lg active:scale-[0.99] disabled:opacity-60"
          type="submit"
          disabled={pending}
        >
          <span>{pending ? "Sending…" : "Send reset link"}</span>
          <MaterialIcon name="arrow_forward" className="text-[20px]" />
        </button>
      </form>

      <div className="mt-8 flex flex-col items-stretch justify-between gap-3 rounded-xl bg-surface-stone p-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-headline text-sm font-bold text-on-surface">
            Remembered it?
          </p>
          <p className="font-body text-xs text-text-muted">
            Sign in with your existing membership password
          </p>
        </div>
        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-surface-card px-4 py-2 font-label text-xs font-bold text-primary shadow-sm transition-all hover:shadow"
        >
          <span>Sign In</span>
          <MaterialIcon name="arrow_outward" className="text-[16px]" />
        </Link>
      </div>

      <div className="mt-6 pt-4 text-center sm:text-left">
        <Link
          href="/get-involved"
          className="inline-flex items-center gap-2 font-label text-xs font-semibold text-text-secondary transition-colors hover:text-primary"
        >
          <MaterialIcon name="west" className="text-[16px]" />
          <span>Back to Get Involved &amp; Membership Details</span>
        </Link>
      </div>
    </div>
  );
}
