/** Domain types for membership & auth (AuthPort / MemberPort). */

export type MemberId = string;

/** How the member wants to take part — project-answers §3. */
export type InvolvementInterest =
  | "member"
  | "volunteer"
  | "business-listing"
  | "other";

export type MemberProfile = {
  id: MemberId;
  email: string;
  /** Full name. */
  displayName: string;
  phone?: string;
  /** Postcode / area. */
  locality?: string;
  involvement?: InvolvementInterest;
  /** Whether GDPR consent was recorded at registration. */
  consentGiven: boolean;
};

/**
 * Authenticated session snapshot for the app.
 * `accessToken` is an opaque credential owned by the auth adapter — never a vendor SDK type.
 */
export type AuthSession = {
  memberId: MemberId;
  email: string;
  displayName: string;
  accessToken: string;
};

export type RegisterInput = {
  email: string;
  password: string;
  /** Full name. */
  displayName: string;
  phone?: string;
  /** Postcode / area. */
  locality?: string;
  involvement: InvolvementInterest;
  /** Must be true — adapter rejects otherwise. */
  consentGiven: boolean;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type UpdateProfileInput = {
  displayName?: string;
  phone?: string;
  locality?: string;
  involvement?: InvolvementInterest;
};

export type PasswordResetRequest = {
  email: string;
};

/**
 * Result of AuthPort.requestPasswordReset.
 * When `emailToken` is set, the use-case emails the opaque token via MailPort
 * (keeps mail swappable and out of the auth adapter).
 */
export type PasswordResetRequestResult = {
  emailToken?: {
    email: string;
    token: string;
  };
};

export type PasswordResetConfirm = {
  /** Opaque reset code from the mail/reset link (adapter-defined). */
  token: string;
  newPassword: string;
};

export const INVOLVEMENT_INTERESTS: InvolvementInterest[] = [
  "member",
  "volunteer",
  "business-listing",
  "other",
];

const INVOLVEMENT_LABELS: Record<InvolvementInterest, string> = {
  member: "Become a member",
  volunteer: "Volunteer",
  "business-listing": "Business listing",
  other: "Other",
};

export function involvementInterestLabel(
  value: InvolvementInterest,
): string {
  return INVOLVEMENT_LABELS[value];
}

export function isInvolvementInterest(
  value: string,
): value is InvolvementInterest {
  return (INVOLVEMENT_INTERESTS as string[]).includes(value);
}
