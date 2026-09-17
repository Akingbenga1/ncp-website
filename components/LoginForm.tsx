"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { MaterialIcon } from "@/components/MaterialIcon";
import { loginAction, logoutAction } from "@/lib/actions/auth";
import { initialLoginState } from "@/lib/actions/auth-state";

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

type LoginFormProps = {
  /** When already signed in, show logout instead of the login form. */
  signedInAs?: string | null;
};

export function LoginForm({ signedInAs }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialLoginState,
  );
  const [showPassword, setShowPassword] = useState(false);

  if (signedInAs) {
    return (
      <div
        className="relative w-full rounded-2xl bg-surface-card p-6 shadow-sm sm:p-8 md:p-10 lg:col-span-7"
        role="status"
      >
        <p className="rounded-xl bg-surface-tinted px-space-sm py-space-2xs font-body text-body-md text-brand-emerald">
          You are signed in as {signedInAs}.
        </p>
        <div className="mt-space-md flex flex-wrap gap-space-2xs">
          <form action={logoutAction}>
            <button
              className="inline-flex items-center justify-center rounded-xl bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
              type="submit"
            >
              Sign out
            </button>
          </form>
          <Link
            className="inline-flex items-center justify-center rounded-xl border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
            href="/profile"
          >
            Your profile
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
            <MaterialIcon name="lock" className="text-[20px]" />
          </div>
          <div>
            <h2 className="font-headline text-lg font-bold text-on-surface">
              NCP Member Access
            </h2>
            <p className="font-body text-xs text-text-muted">
              Secure verified login for registered members
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

        <div>
          <label
            className="mb-1.5 block font-label text-label-md font-semibold text-text-primary"
            htmlFor="login-email"
          >
            Email Address <span className="text-error">*</span>
          </label>
          <div className="relative flex items-center">
            <MaterialIcon
              name="mail"
              className="pointer-events-none absolute left-3.5 text-[20px] text-text-muted"
            />
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              placeholder="e.g. johndoe@gmail.com"
              className={fieldInputClass}
              aria-invalid={Boolean(state.fieldErrors?.email)}
              aria-describedby={
                state.fieldErrors?.email ? "login-email-error" : undefined
              }
            />
          </div>
          <FieldError id="login-email-error" message={state.fieldErrors?.email} />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label
              className="block font-label text-label-md font-semibold text-text-primary"
              htmlFor="login-password"
            >
              Password <span className="text-error">*</span>
            </label>
            <Link
              href="/forgot-password"
              className="font-label text-xs font-semibold text-brand-emerald hover:underline focus:text-primary focus:outline-none"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative flex items-center">
            <MaterialIcon
              name="key"
              className="pointer-events-none absolute left-3.5 text-[20px] text-text-muted"
            />
            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="••••••••••••"
              className={`${fieldInputClass} pr-12`}
              aria-invalid={Boolean(state.fieldErrors?.password)}
              aria-describedby={
                state.fieldErrors?.password ? "login-password-error" : undefined
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
            id="login-password-error"
            message={state.fieldErrors?.password}
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex cursor-pointer items-center gap-3 select-none">
            <input
              className="h-4 w-4 cursor-pointer rounded accent-primary focus:ring-0"
              id="remember"
              name="remember"
              type="checkbox"
            />
            <span className="font-body text-xs text-text-secondary sm:text-sm">
              Remember this device for 30 days
            </span>
          </label>
        </div>

        <button
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-label text-label-lg font-semibold text-on-primary shadow-md transition-all duration-200 hover:bg-primary-container hover:shadow-lg active:scale-[0.99] disabled:opacity-60"
          type="submit"
          disabled={pending}
        >
          <span>{pending ? "Signing in…" : "Sign In to My Account"}</span>
          <MaterialIcon name="arrow_forward" className="text-[20px]" />
        </button>
      </form>

      <p className="mt-5 rounded-xl bg-surface-tinted/80 px-space-sm py-space-2xs text-center font-body text-body-sm text-text-secondary">
        Sign in with the email and password from your free NCP membership
        account. Social and magic-link options are not available yet.
      </p>

      <div className="relative my-7 text-center">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="h-px w-full bg-surface-container-highest" />
        </div>
        <span className="relative bg-surface-card px-4 font-label text-label-eyebrow tracking-wider text-text-muted uppercase">
          New here?
        </span>
      </div>

      <div className="mt-2 flex flex-col items-stretch justify-between gap-3 rounded-xl bg-surface-stone p-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-headline text-sm font-bold text-on-surface">
            New to Peterborough?
          </p>
          <p className="font-body text-xs text-text-muted">
            Instant membership • No waitlist • 100% Free
          </p>
        </div>
        <Link
          href="/register"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-surface-card px-4 py-2 font-label text-xs font-bold text-primary shadow-sm transition-all hover:shadow"
        >
          <span>Create Free Account</span>
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
