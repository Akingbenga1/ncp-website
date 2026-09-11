"use client";

import Link from "next/link";
import { useActionState } from "react";
import { logoutAction, updateProfileAction } from "@/lib/actions/auth";
import { initialProfileState } from "@/lib/actions/auth-state";
import {
  INVOLVEMENT_INTERESTS,
  involvementInterestLabel,
  type InvolvementInterest,
  type MemberProfile,
} from "@/lib/domain/member";

const inputClass =
  "mt-space-3xs w-full rounded-lg border border-border-strong bg-surface-card px-space-sm py-space-2xs font-body text-body-md text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 read-only:bg-surface-stone read-only:text-text-muted";
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

type ProfileFormProps = {
  profile: MemberProfile;
};

export function ProfileForm({ profile }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProfileAction,
    initialProfileState,
  );

  const involvementDefault: InvolvementInterest | "" =
    profile.involvement ?? "";

  return (
    <form className="flex flex-col gap-space-sm" action={formAction} noValidate>
      {state.status === "success" && state.message ? (
        <p
          className="rounded-lg bg-surface-tinted px-space-sm py-space-2xs font-body text-body-md text-brand-emerald"
          role="status"
        >
          {state.message}
        </p>
      ) : null}
      {state.status === "error" && state.message ? (
        <p
          className="rounded-lg bg-error-container px-space-sm py-space-2xs font-body text-body-md text-on-error-container"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <label className={labelClass} htmlFor="profile-email">
        Email
        <input
          id="profile-email"
          name="email"
          type="email"
          value={profile.email}
          readOnly
          aria-readonly="true"
          autoComplete="email"
          className={inputClass}
        />
      </label>
      <p className="font-body text-body-sm text-text-muted" id="profile-email-hint">
        Email cannot be changed here. Contact NCP if you need to update it.
      </p>

      <label className={labelClass} htmlFor="profile-display-name">
        Full name
        <input
          id="profile-display-name"
          name="displayName"
          type="text"
          autoComplete="name"
          required
          defaultValue={profile.displayName}
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.displayName)}
          aria-describedby={
            state.fieldErrors?.displayName
              ? "profile-display-name-error"
              : undefined
          }
        />
      </label>
      <FieldError
        id="profile-display-name-error"
        message={state.fieldErrors?.displayName}
      />

      <label className={labelClass} htmlFor="profile-phone">
        Phone
        <input
          id="profile-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          defaultValue={profile.phone ?? ""}
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.phone)}
          aria-describedby={
            state.fieldErrors?.phone ? "profile-phone-error" : undefined
          }
        />
      </label>
      <FieldError
        id="profile-phone-error"
        message={state.fieldErrors?.phone}
      />

      <label className={labelClass} htmlFor="profile-locality">
        Postcode / area
        <input
          id="profile-locality"
          name="locality"
          type="text"
          autoComplete="postal-code"
          defaultValue={profile.locality ?? ""}
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.locality)}
          aria-describedby={
            state.fieldErrors?.locality
              ? "profile-locality-error"
              : undefined
          }
        />
      </label>
      <FieldError
        id="profile-locality-error"
        message={state.fieldErrors?.locality}
      />

      <label className={labelClass} htmlFor="profile-involvement">
        How I want to be involved
        <select
          id="profile-involvement"
          name="involvement"
          required
          defaultValue={involvementDefault}
          className={inputClass}
          aria-invalid={Boolean(state.fieldErrors?.involvement)}
          aria-describedby={
            state.fieldErrors?.involvement
              ? "profile-involvement-error"
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
      </label>
      <FieldError
        id="profile-involvement-error"
        message={state.fieldErrors?.involvement}
      />

      {profile.consentGiven ? (
        <p className="font-body text-body-sm text-text-muted">
          GDPR consent was recorded when you registered.
        </p>
      ) : null}

      <div className="flex flex-wrap gap-space-2xs pt-space-2xs">
        <button className={btnSolid} type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save profile"}
        </button>
        <Link className={btnGhost} href="/get-involved">
          Get involved
        </Link>
      </div>
    </form>
  );
}

/** Sign-out control kept outside the profile form (no nested forms). */
export function ProfileSignOut() {
  return (
    <form action={logoutAction} className="mt-space-md flex flex-wrap gap-space-2xs">
      <button className={btnGhost} type="submit">
        Sign out
      </button>
    </form>
  );
}
