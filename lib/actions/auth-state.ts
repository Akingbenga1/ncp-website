export type RegisterState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Whether a welcome email was accepted by MailPort (optional). */
  emailSent?: boolean;
  fieldErrors?: Partial<
    Record<
      | "displayName"
      | "email"
      | "password"
      | "phone"
      | "locality"
      | "involvement"
      | "consent",
      string
    >
  >;
};

export type LoginState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"email" | "password", string>>;
};

export type ProfileState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<
    Record<"displayName" | "phone" | "locality" | "involvement", string>
  >;
};

export type ForgotPasswordState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Whether MailPort accepted the reset email (optional; NH-6 when false). */
  emailSent?: boolean;
  fieldErrors?: Partial<Record<"email", string>>;
};

export type ResetPasswordState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"token" | "password" | "passwordConfirm", string>>;
};

export const initialRegisterState: RegisterState = { status: "idle" };
export const initialLoginState: LoginState = { status: "idle" };
export const initialProfileState: ProfileState = { status: "idle" };
export const initialForgotPasswordState: ForgotPasswordState = {
  status: "idle",
};
export const initialResetPasswordState: ResetPasswordState = { status: "idle" };
