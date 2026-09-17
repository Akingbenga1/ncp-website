"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { MaterialIcon } from "@/components/MaterialIcon";
import { registerAction } from "@/lib/actions/auth";
import { initialRegisterState } from "@/lib/actions/auth-state";
import {
  INVOLVEMENT_INTERESTS,
  involvementInterestLabel,
} from "@/lib/domain/member";

const fieldInputClass =
  "w-full rounded-xl bg-surface-stone py-3 pr-4 pl-11 font-body text-body-sm text-on-surface placeholder:text-text-muted transition duration-200 outline-none focus:bg-surface-card focus:shadow-md";
const selectInputClass =
  "w-full appearance-none rounded-xl bg-surface-stone py-3 pr-10 pl-11 font-body text-body-sm text-on-surface transition duration-200 outline-none focus:bg-surface-card focus:shadow-md";

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

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialRegisterState,
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
              Welcome to NCP
            </h2>
            <p className="font-body text-xs text-text-muted">
              Your free membership is active
            </p>
          </div>
        </div>
        <p className="rounded-xl bg-surface-tinted px-space-sm py-space-2xs font-body text-body-md text-brand-emerald">
          {state.message}
        </p>
        <div className="mt-space-md flex flex-wrap gap-space-2xs">
          <Link
            className="inline-flex items-center justify-center rounded-xl bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
            href="/profile"
          >
            Your profile
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-xl border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
            href="/login"
          >
            Sign in
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
            <MaterialIcon name="person_add" className="text-[20px]" />
          </div>
          <div>
            <h2 className="font-headline text-lg font-bold text-on-surface">
              Create Your NCP Account
            </h2>
            <p className="font-body text-xs text-text-muted">
              Free membership — active immediately, no approval wait
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
            htmlFor="register-display-name"
          >
            Full Name <span className="text-error">*</span>
          </label>
          <div className="relative flex items-center">
            <MaterialIcon
              name="badge"
              className="pointer-events-none absolute left-3.5 text-[20px] text-text-muted"
            />
            <input
              id="register-display-name"
              name="displayName"
              type="text"
              autoComplete="name"
              required
              placeholder="e.g. Ada Okonkwo"
              className={fieldInputClass}
              aria-invalid={Boolean(state.fieldErrors?.displayName)}
              aria-describedby={
                state.fieldErrors?.displayName
                  ? "register-display-name-error"
                  : undefined
              }
            />
          </div>
          <FieldError
            id="register-display-name-error"
            message={state.fieldErrors?.displayName}
          />
        </div>

        <div>
          <label
            className="mb-1.5 block font-label text-label-md font-semibold text-text-primary"
            htmlFor="register-email"
          >
            Email Address <span className="text-error">*</span>
          </label>
          <div className="relative flex items-center">
            <MaterialIcon
              name="mail"
              className="pointer-events-none absolute left-3.5 text-[20px] text-text-muted"
            />
            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              placeholder="e.g. ada@gmail.com"
              className={fieldInputClass}
              aria-invalid={Boolean(state.fieldErrors?.email)}
              aria-describedby={
                state.fieldErrors?.email ? "register-email-error" : undefined
              }
            />
          </div>
          <FieldError
            id="register-email-error"
            message={state.fieldErrors?.email}
          />
        </div>

        <div>
          <label
            className="mb-1.5 block font-label text-label-md font-semibold text-text-primary"
            htmlFor="register-password"
          >
            Password <span className="text-error">*</span>
          </label>
          <div className="relative flex items-center">
            <MaterialIcon
              name="key"
              className="pointer-events-none absolute left-3.5 text-[20px] text-text-muted"
            />
            <input
              id="register-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={6}
              placeholder="At least 6 characters"
              className={`${fieldInputClass} pr-12`}
              aria-invalid={Boolean(state.fieldErrors?.password)}
              aria-describedby={
                state.fieldErrors?.password
                  ? "register-password-error"
                  : "register-password-hint"
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
          <p
            className="mt-space-3xs font-body text-body-sm text-text-muted"
            id="register-password-hint"
          >
            At least 6 characters.
          </p>
          <FieldError
            id="register-password-error"
            message={state.fieldErrors?.password}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              className="mb-1.5 block font-label text-label-md font-semibold text-text-primary"
              htmlFor="register-phone"
            >
              Phone
            </label>
            <div className="relative flex items-center">
              <MaterialIcon
                name="call"
                className="pointer-events-none absolute left-3.5 text-[20px] text-text-muted"
              />
              <input
                id="register-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+44 7700 900000"
                className={fieldInputClass}
                aria-invalid={Boolean(state.fieldErrors?.phone)}
                aria-describedby={
                  state.fieldErrors?.phone ? "register-phone-error" : undefined
                }
              />
            </div>
            <FieldError
              id="register-phone-error"
              message={state.fieldErrors?.phone}
            />
          </div>

          <div>
            <label
              className="mb-1.5 block font-label text-label-md font-semibold text-text-primary"
              htmlFor="register-locality"
            >
              Postcode / Area
            </label>
            <div className="relative flex items-center">
              <MaterialIcon
                name="location_on"
                className="pointer-events-none absolute left-3.5 text-[20px] text-text-muted"
              />
              <input
                id="register-locality"
                name="locality"
                type="text"
                autoComplete="postal-code"
                placeholder="e.g. PE1"
                className={fieldInputClass}
                aria-invalid={Boolean(state.fieldErrors?.locality)}
                aria-describedby={
                  state.fieldErrors?.locality
                    ? "register-locality-error"
                    : undefined
                }
              />
            </div>
            <FieldError
              id="register-locality-error"
              message={state.fieldErrors?.locality}
            />
          </div>
        </div>

        <div>
          <label
            className="mb-1.5 block font-label text-label-md font-semibold text-text-primary"
            htmlFor="register-involvement"
          >
            How I want to be involved <span className="text-error">*</span>
          </label>
          <div className="relative flex items-center">
            <MaterialIcon
              name="groups"
              className="pointer-events-none absolute left-3.5 text-[20px] text-text-muted"
            />
            <select
              id="register-involvement"
              name="involvement"
              required
              defaultValue=""
              className={selectInputClass}
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
            <MaterialIcon
              name="expand_more"
              className="pointer-events-none absolute right-3.5 text-[20px] text-text-muted"
            />
          </div>
          <FieldError
            id="register-involvement-error"
            message={state.fieldErrors?.involvement}
          />
        </div>

        <div className="pt-1">
          <label
            className="flex cursor-pointer items-start gap-3 select-none"
            htmlFor="register-consent"
          >
            <input
              id="register-consent"
              name="consent"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded accent-primary focus:ring-0"
              aria-invalid={Boolean(state.fieldErrors?.consent)}
              aria-describedby={
                state.fieldErrors?.consent
                  ? "register-consent-error"
                  : undefined
              }
            />
            <span className="font-body text-xs text-text-secondary sm:text-sm">
              I agree that Nigerian Community Peterborough may store my
              membership details for community membership (GDPR consent).{" "}
              <span className="text-error">*</span>
            </span>
          </label>
          <FieldError
            id="register-consent-error"
            message={state.fieldErrors?.consent}
          />
        </div>

        <button
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-label text-label-lg font-semibold text-on-primary shadow-md transition-all duration-200 hover:bg-primary-container hover:shadow-lg active:scale-[0.99] disabled:opacity-60"
          type="submit"
          disabled={pending}
        >
          <span>{pending ? "Creating account…" : "Create Free Account"}</span>
          <MaterialIcon name="arrow_forward" className="text-[20px]" />
        </button>
      </form>

      <div className="mt-8 flex flex-col items-stretch justify-between gap-3 rounded-xl bg-surface-stone p-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-headline text-sm font-bold text-on-surface">
            Already a member?
          </p>
          <p className="font-body text-xs text-text-muted">
            Sign in to manage your profile and RSVP to events
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
