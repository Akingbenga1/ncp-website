"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, logoutAction } from "@/lib/actions/auth";
import { initialLoginState } from "@/lib/actions/auth-state";

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

type LoginFormProps = {
  /** When already signed in, show logout instead of the login form. */
  signedInAs?: string | null;
};

export function LoginForm({ signedInAs }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialLoginState,
  );

  if (signedInAs) {
    return (
      <div className="flex flex-col gap-space-md" role="status">
        <p className="rounded-lg bg-surface-tinted px-space-sm py-space-2xs font-body text-body-md text-brand-emerald">
          You are signed in as {signedInAs}.
        </p>
        <div className="flex flex-wrap gap-space-2xs">
          <form action={logoutAction}>
            <button className={btnSolid} type="submit">
              Sign out
            </button>
          </form>
          <Link className={btnGhost} href="/profile">
            Your profile
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

      <label className={labelClass} htmlFor="login-email">
        Email
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={
            state.fieldErrors?.email ? "login-email-error" : undefined
          }
        />
      </label>
      <FieldError id="login-email-error" message={state.fieldErrors?.email} />

      <label className={labelClass} htmlFor="login-password">
        Password
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.password)}
          aria-describedby={
            state.fieldErrors?.password ? "login-password-error" : undefined
          }
        />
      </label>
      <FieldError
        id="login-password-error"
        message={state.fieldErrors?.password}
      />

      <p className="font-body text-body-sm text-text-secondary">
        <Link className="text-brand-emerald underline-offset-2 hover:underline" href="/forgot-password">
          Forgot password?
        </Link>
      </p>

      <div className="flex flex-wrap gap-space-2xs pt-space-2xs">
        <button className={btnSolid} type="submit" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </button>
        <Link className={btnGhost} href="/register">
          Create free account
        </Link>
      </div>
    </form>
  );
}
