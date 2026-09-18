"use client";

import { useState } from "react";
import Link from "next/link";
import { DuesStatusBadge, PayDuesCta } from "@/components/DuesStatusBadge";
import { MaterialIcon } from "@/components/MaterialIcon";
import { logoutAction, updateProfileAction } from "@/lib/actions/auth";
import { initialProfileState } from "@/lib/actions/auth-state";
import { useActionState } from "react";
import type { DuesPeriodStatus } from "@/lib/domain/dues";
import {
  INVOLVEMENT_INTERESTS,
  involvementInterestLabel,
  type InvolvementInterest,
  type MemberProfile,
} from "@/lib/domain/member";
import { initialsFromName } from "@/lib/format/member-ui";

const inputClass =
  "mt-space-3xs w-full rounded-xl bg-surface-stone px-space-sm py-3 font-body text-body-sm text-on-surface placeholder:text-text-muted transition outline-none focus:bg-surface-card focus:shadow-md read-only:bg-surface-container-low read-only:text-text-muted";
const labelClass =
  "flex flex-col font-label text-label-md font-semibold text-text-primary";

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
    <form
      id="edit-profile"
      className="flex flex-col gap-space-sm"
      action={formAction}
      noValidate
    >
      {state.status === "success" && state.message ? (
        <p
          className="rounded-xl bg-surface-tinted px-space-sm py-space-2xs font-body text-body-md text-brand-emerald"
          role="status"
        >
          {state.message}
        </p>
      ) : null}
      {state.status === "error" && state.message ? (
        <p
          className="rounded-xl bg-error-container px-space-sm py-space-2xs font-body text-body-md text-on-error-container"
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
      <FieldError id="profile-phone-error" message={state.fieldErrors?.phone} />

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
            state.fieldErrors?.locality ? "profile-locality-error" : undefined
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
        <button
          className="inline-flex items-center justify-center gap-space-2xs rounded-lg bg-primary px-space-md py-space-xs font-label text-label-lg text-on-primary shadow-sm transition-all hover:bg-primary-container disabled:opacity-60"
          type="submit"
          disabled={pending}
        >
          <MaterialIcon name="save" className="text-[18px]" />
          {pending ? "Saving…" : "Save profile"}
        </button>
        <Link
          className="inline-flex items-center justify-center rounded-lg bg-surface-container px-space-md py-space-xs font-label text-label-lg text-primary transition-colors hover:bg-surface-container-high"
          href="/get-involved"
        >
          Get involved
        </Link>
      </div>
    </form>
  );
}

export function ProfileSignOut({ className = "" }: { className?: string }) {
  return (
    <form action={logoutAction} className={className}>
      <button
        className="inline-flex w-full items-center justify-center gap-space-2xs rounded-lg bg-surface-stone px-space-md py-space-xs font-label text-label-lg text-primary transition-colors hover:bg-surface-variant sm:w-auto"
        type="submit"
      >
        <MaterialIcon name="logout" className="text-[18px]" />
        Sign out
      </button>
    </form>
  );
}

type ProfileHeroActionsProps = {
  displayName: string;
  memberCode: string;
  email: string;
  duesStatus: DuesPeriodStatus;
  duesPeriodEndsAt?: string | null;
};

export function ProfileHeroActions({
  displayName,
  memberCode,
  email,
  duesStatus,
  duesPeriodEndsAt,
}: ProfileHeroActionsProps) {
  const [passOpen, setPassOpen] = useState(false);
  const [shareNote, setShareNote] = useState<string | null>(null);

  async function copyMemberLink() {
    try {
      const url = `${window.location.origin}/profile`;
      await navigator.clipboard.writeText(url);
      setShareNote("Profile link copied");
    } catch {
      setShareNote("Could not copy link");
    }
    window.setTimeout(() => setShareNote(null), 2500);
  }

  return (
    <>
      <div className="flex w-full shrink-0 flex-wrap items-stretch gap-space-xs sm:flex-row lg:w-auto lg:flex-col">
        <button
          type="button"
          onClick={() => setPassOpen(true)}
          className="inline-flex flex-1 items-center justify-center gap-space-2xs rounded-lg bg-primary px-space-md py-space-xs font-label text-label-lg text-on-primary shadow-sm transition-all hover:bg-primary-container lg:flex-none"
        >
          <MaterialIcon name="qr_code_2" className="text-[20px]" />
          <span>Digital Member Pass</span>
        </button>
        <button
          type="button"
          onClick={copyMemberLink}
          className="inline-flex flex-1 items-center justify-center gap-space-2xs rounded-lg bg-surface-container px-space-md py-space-xs font-label text-label-lg text-on-surface transition-colors hover:bg-surface-container-high lg:flex-none"
        >
          <MaterialIcon name="share" className="text-[18px]" />
          <span>Share Profile</span>
        </button>
        <a
          href="#edit-profile"
          className="inline-flex flex-1 items-center justify-center gap-space-2xs rounded-lg bg-surface-stone px-space-md py-space-xs font-label text-label-lg text-primary transition-colors hover:bg-surface-variant lg:flex-none"
        >
          <MaterialIcon name="edit_note" className="text-[18px]" />
          <span>Edit Profile</span>
        </a>
        {duesStatus === "due" ? (
          <PayDuesCta />
        ) : (
          <div className="inline-flex flex-1 items-center justify-center lg:flex-none">
            <DuesStatusBadge
              status={duesStatus}
              periodEndsAt={duesPeriodEndsAt}
            />
          </div>
        )}
      </div>
      {shareNote ? (
        <p className="mt-space-2xs font-body text-body-sm text-brand-emerald" role="status">
          {shareNote}
        </p>
      ) : null}

      {passOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 p-gutter-mobile backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="digital-pass-title"
        >
          <div className="relative w-full max-w-sm space-y-space-md overflow-hidden rounded-2xl bg-surface-card p-space-md shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-2xs">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-bold text-on-primary">
                  NCP
                </div>
                <h2
                  id="digital-pass-title"
                  className="font-headline text-headline-sm text-text-primary"
                >
                  Digital Pass
                </h2>
              </div>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-container"
                onClick={() => setPassOpen(false)}
                aria-label="Close digital pass"
              >
                <MaterialIcon name="close" />
              </button>
            </div>

            <div className="relative space-y-space-md overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary-container p-space-md text-center text-on-primary">
              <div className="flex items-center justify-between text-xs opacity-80">
                <span>NIGERIAN COMMUNITY PETERBOROUGH</span>
                <span>MEMBER</span>
              </div>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-surface-card/15 text-2xl font-bold">
                {initialsFromName(displayName)}
              </div>
              <div>
                <p className="font-headline text-headline-sm font-bold">
                  {displayName}
                </p>
                <p className="mt-1 font-mono text-sm tracking-wider text-accent-gold">
                  {memberCode}
                </p>
                <p className="mt-space-2xs font-body text-body-sm text-on-primary/80">
                  {email}
                </p>
              </div>
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-lg bg-surface-card p-2">
                <div
                  className="grid h-full w-full grid-cols-5 grid-rows-5 gap-0.5"
                  aria-hidden="true"
                >
                  {Array.from({ length: 25 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        (i * 7 + memberCode.length) % 3 === 0
                          ? "rounded-sm bg-primary"
                          : "rounded-sm bg-primary/20"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="font-body text-xs text-on-primary/70">
                Show this pass at NCP events for member check-in.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
