/** Domain types for membership & auth (AuthPort / MemberPort). */

export type MemberId = string;

export type MemberProfile = {
  id: MemberId;
  email: string;
  displayName: string;
  phone?: string;
  locality?: string;
};

export type AuthSession = {
  memberId: MemberId;
  email: string;
  displayName: string;
};

export type RegisterInput = {
  email: string;
  password: string;
  displayName: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type UpdateProfileInput = {
  displayName?: string;
  phone?: string;
  locality?: string;
};

export type PasswordResetRequest = {
  email: string;
};

export type PasswordResetConfirm = {
  token: string;
  newPassword: string;
};
