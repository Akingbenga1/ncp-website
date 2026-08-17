import type {
  AuthSession,
  LoginInput,
  PasswordResetConfirm,
  PasswordResetRequest,
  RegisterInput,
} from "@/lib/domain/member";

/** Port: register, login, logout, password reset. Concrete: Strapi users. */
export interface AuthPort {
  register(input: RegisterInput): Promise<AuthSession>;
  login(input: LoginInput): Promise<AuthSession>;
  logout(): Promise<void>;
  getSession(): Promise<AuthSession | null>;
  requestPasswordReset(input: PasswordResetRequest): Promise<void>;
  confirmPasswordReset(input: PasswordResetConfirm): Promise<void>;
}
