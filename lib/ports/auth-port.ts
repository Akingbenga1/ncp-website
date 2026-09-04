import type {
  AuthSession,
  LoginInput,
  PasswordResetConfirm,
  PasswordResetRequest,
  PasswordResetRequestResult,
  RegisterInput,
} from "@/lib/domain/member";

/**
 * Port: register, login, logout, session, password reset.
 * Concrete: Strapi users-permissions (Tasks 5.2–5.3). No Strapi types here.
 *
 * Accounts are active immediately on register (no approval gate).
 */
export interface AuthPort {
  register(input: RegisterInput): Promise<AuthSession>;
  login(input: LoginInput): Promise<AuthSession>;
  logout(): Promise<void>;
  getSession(): Promise<AuthSession | null>;
  /**
   * Start password reset. Never reveals whether the email exists.
   * When the adapter returns `emailToken`, the caller should send it via MailPort.
   */
  requestPasswordReset(
    input: PasswordResetRequest,
  ): Promise<PasswordResetRequestResult>;
  /** Confirm reset with opaque token from the reset link. */
  resetPassword(input: PasswordResetConfirm): Promise<void>;
}
