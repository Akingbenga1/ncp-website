"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { MaterialIcon } from "@/components/MaterialIcon";
import { resetPasswordAction } from "@/lib/actions/auth";
import { initialResetPasswordState } from "@/lib/actions/auth-state";

const fieldInputClass =
  "w-full rounded-xl bg-surface-stone py-3 pr-12 pl-11 font-body text-body-sm text-on-surface placeholder:text-text-muted transition duration-200 outline-none focus:bg-surface-card focus:shadow-md";

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
  const [showPassword, setShowPassword] = useState(false);

  if (state.status === "success") {
    return (
      <div
        className="relative w-full rounded-2xl bg-surface-card p-6 shadow-sm sm:p-8 md:p-10 lg:col-span-7"
        role="status"
      >
        <div className="mb-6 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-tinted text-brand-emerald">
            <MaterialIcon name="check_circle" className="text-[20px]" />
          </div>
          <div>
            <h2 className="font-headline text-lg font-bold text-on-surface">
              Password updated
            </h2>
            <p className="font-body text-xs text-text-muted">
              You can sign in with your new password
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
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div
        className="relative w-full rounded-2xl bg-surface-card p-6 shadow-sm sm:p-8 md:p-10 lg:col-span-7"
        role="alert"
      >
        <div className="mb-6 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-error-container text-on-error-container">
            <MaterialIcon name="link_off" className="text-[20px]" />
          </div>
          <div>
            <h2 className="font-headline text-lg font-bold text-on-surface">
              Link missing
            </h2>
            <p className="font-body text-xs text-text-muted">
              Request a new reset email
            </p>
          </div>
        </div>
        <p className="rounded-xl bg-error-container px-space-sm py-space-2xs font-body text-body-md text-on-error-container">
          This reset link is missing or incomplete. Request a new one from the
          forgot-password page.
        </p>
        <div className="mt-space-md">
          <Link
            className="inline-flex items-center justify-center rounded-xl bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
            href="/forgot-password"
          >
            Request a new link
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
            <MaterialIcon name="password" className="text-[20px]" />
          </div>
          <div>
            <h2 className="font-headline text-lg font-bold text-on-surface">
              Choose a new password
            </h2>
            <p className="font-body text-xs text-text-muted">
              At least 6 characters
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-fixed px-2.5 py-1 text-xs font-semibold text-on-secondary-fixed">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-emerald" />
          Live Portal
        </span>
      </div>

      <form className="space-y-5" action={formAction} noValidate>
        <input type="hidden" name="token" value={token} />

        {state.status === "error" && state.message ? (
          <p
            className="rounded-xl bg-error-container px-space-sm py-space-2xs font-body text-body-md text-on-error-container"
            role="alert"
          >
            {state.message}
          </p>
        ) : null}
        <FieldError id="reset-token-error" message={state.fieldErrors?.token} />

        <div>
          <label
            className="mb-1.5 block font-label text-label-md font-semibold text-text-primary"
            htmlFor="reset-password"
          >
            New password <span className="text-error">*</span>
          </label>
          <div className="relative flex items-center">
            <MaterialIcon
              name="key"
              className="pointer-events-none absolute left-3.5 text-[20px] text-text-muted"
            />
            <input
              id="reset-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={6}
              placeholder="At least 6 characters"
              className={fieldInputClass}
              aria-invalid={Boolean(state.fieldErrors?.password)}
              aria-describedby={
                state.fieldErrors?.password
                  ? "reset-password-error"
                  : undefined
              }
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 flex items-center text-text-muted transition-colors hover:text-text-primary focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
            >
              <MaterialIcon
                name={showPassword ? "visibility_off" : "visibility"}
                className="text-[20px]"
              />
            </button>
          </div>
          <FieldError
            id="reset-password-error"
            message={state.fieldErrors?.password}
          />
        </div>

        <div>
          <label
            className="mb-1.5 block font-label text-label-md font-semibold text-text-primary"
            htmlFor="reset-password-confirm"
          >
            Confirm new password <span className="text-error">*</span>
          </label>
          <div className="relative flex items-center">
            <MaterialIcon
              name="key"
              className="pointer-events-none absolute left-3.5 text-[20px] text-text-muted"
            />
            <input
              id="reset-password-confirm"
              name="passwordConfirm"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={6}
              placeholder="Re-enter your new password"
              className={fieldInputClass}
              aria-invalid={Boolean(state.fieldErrors?.passwordConfirm)}
              aria-describedby={
                state.fieldErrors?.passwordConfirm
                  ? "reset-password-confirm-error"
                  : undefined
              }
            />
          </div>
          <FieldError
            id="reset-password-confirm-error"
            message={state.fieldErrors?.passwordConfirm}
          />
        </div>

        <button
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-label text-label-lg font-semibold text-on-primary shadow-md transition-all duration-200 hover:bg-primary-container hover:shadow-lg active:scale-[0.99] disabled:opacity-60"
          type="submit"
          disabled={pending}
        >
          <span>{pending ? "Updating…" : "Update password"}</span>
          <MaterialIcon name="arrow_forward" className="text-[20px]" />
        </button>
      </form>

      <div className="mt-8 flex flex-col items-stretch justify-between gap-3 rounded-xl bg-surface-stone p-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-headline text-sm font-bold text-on-surface">
            Need a new link?
          </p>
          <p className="font-body text-xs text-text-muted">
            Request another one-time reset email
          </p>
        </div>
        <Link
          href="/forgot-password"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-surface-card px-4 py-2 font-label text-xs font-bold text-primary shadow-sm transition-all hover:shadow"
        >
          <span>Request a new link</span>
          <MaterialIcon name="arrow_outward" className="text-[16px]" />
        </Link>
      </div>

      <div className="mt-6 pt-4 text-center sm:text-left">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 font-label text-xs font-semibold text-text-secondary transition-colors hover:text-primary"
        >
          <MaterialIcon name="west" className="text-[16px]" />
          <span>Back to sign in</span>
        </Link>
      </div>
    </div>
  );
}
