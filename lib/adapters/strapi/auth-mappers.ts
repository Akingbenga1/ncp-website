import type {
  AuthSession,
  InvolvementInterest,
  MemberProfile,
} from "@/lib/domain/member";
import { isInvolvementInterest } from "@/lib/domain/member";

/** Internal Users & Permissions user shape — adapter-only. */
export type StrapiAuthUser = {
  id?: number | string;
  documentId?: string;
  username?: string;
  email?: string;
  displayName?: string | null;
  phone?: string | null;
  locality?: string | null;
  involvement?: string | null;
  consentGiven?: boolean | null;
  confirmed?: boolean | null;
  blocked?: boolean | null;
};

export type StrapiAuthResponse = {
  jwt?: string;
  user?: StrapiAuthUser;
  refreshToken?: string;
};

function memberId(user: StrapiAuthUser): string | null {
  if (user.documentId) return String(user.documentId);
  if (user.id !== undefined && user.id !== null) return String(user.id);
  return null;
}

export function mapAuthSession(
  jwt: string,
  user: StrapiAuthUser,
): AuthSession | null {
  const id = memberId(user);
  const email = user.email?.trim();
  if (!id || !email || !jwt) return null;

  const displayName =
    user.displayName?.trim() ||
    user.username?.trim() ||
    email.split("@")[0] ||
    "Member";

  return {
    memberId: id,
    email,
    displayName,
    accessToken: jwt,
  };
}

export function mapMemberProfile(user: StrapiAuthUser): MemberProfile | null {
  const id = memberId(user);
  const email = user.email?.trim();
  if (!id || !email) return null;

  const displayName =
    user.displayName?.trim() ||
    user.username?.trim() ||
    email.split("@")[0] ||
    "Member";

  const involvementRaw = user.involvement?.trim();
  const involvement: InvolvementInterest | undefined =
    involvementRaw && isInvolvementInterest(involvementRaw)
      ? involvementRaw
      : undefined;

  return {
    id,
    email,
    displayName,
    phone: user.phone?.trim() || undefined,
    locality: user.locality?.trim() || undefined,
    involvement,
    consentGiven: Boolean(user.consentGiven),
  };
}
