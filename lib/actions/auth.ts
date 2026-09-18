"use server";

import { redirect } from "next/navigation";
import {
  isInvolvementInterest,
  type InvolvementInterest,
} from "@/lib/domain/member";
import { getAppServices } from "@/lib/composition";
import type {
  ForgotPasswordState,
  LoginState,
  ProfileState,
  RegisterState,
  ResetPasswordState,
} from "./auth-state";

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function siteBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ||
    "http://localhost:3001"
  );
}

/**
 * Public membership registration via AuthPort only.
 */
export async function registerAction(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const displayName = readString(formData, "displayName");
  const email = readString(formData, "email").toLowerCase();
  const password =
    typeof formData.get("password") === "string"
      ? (formData.get("password") as string)
      : "";
  const phone = readString(formData, "phone");
  const locality = readString(formData, "locality");
  const involvementRaw = readString(formData, "involvement");
  const consentGiven = formData.get("consent") === "on";

  const fieldErrors: RegisterState["fieldErrors"] = {};

  if (!displayName) fieldErrors.displayName = "Enter your full name.";
  if (!email) fieldErrors.email = "Enter your email.";
  else if (!isValidEmail(email)) fieldErrors.email = "Enter a valid email.";
  if (!password) fieldErrors.password = "Choose a password.";
  else if (password.length < 6) {
    fieldErrors.password = "Password must be at least 6 characters.";
  }
  if (!isInvolvementInterest(involvementRaw)) {
    fieldErrors.involvement = "Choose how you want to be involved.";
  }
  if (!consentGiven) {
    fieldErrors.consent =
      "Please confirm you agree to NCP storing your membership details.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const involvement = involvementRaw as InvolvementInterest;

  try {
    await getAppServices().auth.register({
      displayName,
      email,
      password,
      phone: phone || undefined,
      locality: locality || undefined,
      involvement,
      consentGiven: true,
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Registration failed. Please try again.";
    return {
      status: "error",
      message,
    };
  }

  // On-site confirmation is always the source of truth.
  // Welcome email is best-effort via MailPort when NH-6 / provider is configured.
  const { mail } = getAppServices();
  const mailResult = await mail.send({
    to: { email, name: displayName },
    subject: "Welcome to Nigerian Community Peterborough",
    text: [
      `Hello ${displayName},`,
      "",
      "Your free NCP membership is active.",
      "You can sign in any time and edit your own profile on the website.",
      "",
      "Nigerian Community Peterborough",
      "Community. Culture. Connection.",
    ].join("\n"),
  });

  const emailSent = mailResult.ok;

  return {
    status: "success",
    emailSent,
    message: emailSent
      ? "Welcome — your free NCP membership is active. A confirmation email is on its way. You can edit your profile any time."
      : "Welcome — your free NCP membership is active. This page confirms your registration (email confirmation will arrive once NCP’s mail address is configured).",
  };
}

/**
 * Public login via AuthPort only. Redirects on success.
 */
export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = readString(formData, "email").toLowerCase();
  const password =
    typeof formData.get("password") === "string"
      ? (formData.get("password") as string)
      : "";

  const fieldErrors: LoginState["fieldErrors"] = {};
  if (!email) fieldErrors.email = "Enter your email.";
  else if (!isValidEmail(email)) fieldErrors.email = "Enter a valid email.";
  if (!password) fieldErrors.password = "Enter your password.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  try {
    await getAppServices().auth.login({ email, password });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Sign in failed. Check your email and password.";
    return {
      status: "error",
      message,
    };
  }

  const nextRaw = readString(formData, "next");
  const next =
    nextRaw.startsWith("/") && !nextRaw.startsWith("//") ? nextRaw : "/profile";
  redirect(next);
}

/** Sign out via AuthPort; clears httpOnly session cookie behind the port. */
export async function logoutAction(): Promise<void> {
  await getAppServices().auth.logout();
  redirect("/");
}

/**
 * Update the signed-in member’s own profile via MemberPort only.
 * Never accepts a member id from the client — adapter loads /users/me.
 */
export async function updateProfileAction(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const displayName = readString(formData, "displayName");
  const phone = readString(formData, "phone");
  const locality = readString(formData, "locality");
  const involvementRaw = readString(formData, "involvement");

  const fieldErrors: ProfileState["fieldErrors"] = {};

  if (!displayName) fieldErrors.displayName = "Enter your full name.";
  if (!isInvolvementInterest(involvementRaw)) {
    fieldErrors.involvement = "Choose how you want to be involved.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const involvement = involvementRaw as InvolvementInterest;
  const { auth, members } = getAppServices();
  const session = await auth.getSession();
  if (!session) {
    return {
      status: "error",
      message: "Your session has ended. Please sign in again.",
    };
  }

  try {
    await members.updateOwnProfile({
      displayName,
      phone,
      locality,
      involvement,
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Could not save your profile. Please try again.";
    return {
      status: "error",
      message,
    };
  }

  return {
    status: "success",
    message: "Your profile has been saved.",
  };
}

/**
 * Request a password reset via AuthPort; email the opaque token via MailPort.
 * Always returns the same success copy (no email enumeration).
 */
export async function requestPasswordResetAction(
  _prev: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const email = readString(formData, "email").toLowerCase();
  const fieldErrors: ForgotPasswordState["fieldErrors"] = {};

  if (!email) fieldErrors.email = "Enter your email.";
  else if (!isValidEmail(email)) fieldErrors.email = "Enter a valid email.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const { auth, mail } = getAppServices();
  let emailSent = false;

  try {
    const result = await auth.requestPasswordReset({ email });
    if (result.emailToken) {
      const resetUrl = `${siteBaseUrl()}/reset-password?token=${encodeURIComponent(result.emailToken.token)}`;
      const mailResult = await mail.send({
        to: { email: result.emailToken.email },
        subject: "Reset your NCP membership password",
        text: [
          "Hello,",
          "",
          "We received a request to reset the password for your Nigerian Community Peterborough membership.",
          "Use this link to choose a new password (it works once):",
          "",
          resetUrl,
          "",
          "If you did not ask for this, you can ignore this email.",
          "",
          "Nigerian Community Peterborough",
        ].join("\n"),
      });
      emailSent = mailResult.ok;
    }
  } catch {
    // Still show generic success — do not reveal account existence or adapter errors.
  }

  return {
    status: "success",
    emailSent,
    message: emailSent
      ? "If an account exists for that email, a reset link is on its way. Check your inbox (and spam folder)."
      : "If an account exists for that email, you can reset your password once NCP’s mail address is configured. You can also try again later, or contact Theresa for help.",
  };
}

/**
 * Confirm a new password via AuthPort using the opaque token from the reset link.
 */
export async function resetPasswordAction(
  _prev: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const token = readString(formData, "token");
  const password =
    typeof formData.get("password") === "string"
      ? (formData.get("password") as string)
      : "";
  const passwordConfirm =
    typeof formData.get("passwordConfirm") === "string"
      ? (formData.get("passwordConfirm") as string)
      : "";

  const fieldErrors: ResetPasswordState["fieldErrors"] = {};
  if (!token) fieldErrors.token = "This reset link is missing or incomplete.";
  if (!password) fieldErrors.password = "Choose a new password.";
  else if (password.length < 6) {
    fieldErrors.password = "Password must be at least 6 characters.";
  }
  if (!passwordConfirm) {
    fieldErrors.passwordConfirm = "Confirm your new password.";
  } else if (password && passwordConfirm !== password) {
    fieldErrors.passwordConfirm = "Passwords do not match.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  try {
    await getAppServices().auth.resetPassword({
      token,
      newPassword: password,
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Could not reset your password. The link may have expired — request a new one.";
    return {
      status: "error",
      message,
    };
  }

  return {
    status: "success",
    message:
      "Your password has been updated. You can sign in with your new password.",
  };
}
