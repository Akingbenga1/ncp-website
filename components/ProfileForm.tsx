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
    <form className="form" action={formAction} noValidate>
      {state.status === "success" && state.message ? (
        <p className="form-status form-status--success" role="status">
          {state.message}
        </p>
      ) : null}
      {state.status === "error" && state.message ? (
        <p className="form-status form-status--error" role="alert">
          {state.message}
        </p>
      ) : null}

      <label htmlFor="profile-email">
        Email
        <input
          id="profile-email"
          name="email"
          type="email"
          value={profile.email}
          readOnly
          aria-readonly="true"
          autoComplete="email"
        />
      </label>
      <p className="form-note" id="profile-email-hint">
        Email cannot be changed here. Contact NCP if you need to update it.
      </p>

      <label htmlFor="profile-display-name">
        Full name
        <input
          id="profile-display-name"
          name="displayName"
          type="text"
          autoComplete="name"
          required
          defaultValue={profile.displayName}
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

      <label htmlFor="profile-phone">
        Phone
        <input
          id="profile-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          defaultValue={profile.phone ?? ""}
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

      <label htmlFor="profile-locality">
        Postcode / area
        <input
          id="profile-locality"
          name="locality"
          type="text"
          autoComplete="postal-code"
          defaultValue={profile.locality ?? ""}
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

      <label htmlFor="profile-involvement">
        How I want to be involved
        <select
          id="profile-involvement"
          name="involvement"
          required
          defaultValue={involvementDefault}
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
        <p className="form-note">
          GDPR consent was recorded when you registered.
        </p>
      ) : null}

      <div className="form-actions">
        <button className="btn btn-solid" type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save profile"}
        </button>
        <Link className="btn btn-primary" href="/get-involved">
          Get involved
        </Link>
      </div>
    </form>
  );
}

/** Sign-out control kept outside the profile form (no nested forms). */
export function ProfileSignOut() {
  return (
    <form action={logoutAction} className="form-actions">
      <button className="btn btn-primary" type="submit">
        Sign out
      </button>
    </form>
  );
}
