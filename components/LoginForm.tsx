"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, logoutAction } from "@/lib/actions/auth";
import { initialLoginState } from "@/lib/actions/auth-state";

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
      <div className="form" role="status">
        <p className="form-status form-status--success">
          You are signed in as {signedInAs}.
        </p>
        <div className="form-actions">
          <form action={logoutAction}>
            <button className="btn btn-solid" type="submit">
              Sign out
            </button>
          </form>
          <Link className="btn btn-primary" href="/profile">
            Your profile
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

      <label htmlFor="login-email">
        Email
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={
            state.fieldErrors?.email ? "login-email-error" : undefined
          }
        />
      </label>
      <FieldError id="login-email-error" message={state.fieldErrors?.email} />

      <label htmlFor="login-password">
        Password
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
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

        <p className="form-note">
          <Link href="/forgot-password">Forgot password?</Link>
        </p>

      <div className="form-actions">
        <button className="btn btn-solid" type="submit" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </button>
        <Link className="btn btn-primary" href="/register">
          Create free account
        </Link>
      </div>
    </form>
  );
}
