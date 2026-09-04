import type {
  AuthSession,
  LoginInput,
  PasswordResetConfirm,
  PasswordResetRequest,
  PasswordResetRequestResult,
  RegisterInput,
} from "@/lib/domain/member";
import type { AuthPort } from "@/lib/ports/auth-port";
import { mapAuthSession } from "./auth-mappers";
import type { StrapiAuthResponse, StrapiAuthUser } from "./auth-mappers";
import {
  createMemoryCredentialStore,
  type AuthCredentialStore,
} from "./auth-session";
import {
  resolveStrapiConfig,
  strapiAuthRequest,
  type StrapiClientConfig,
} from "./client";

export type CreateStrapiAuthAdapterOptions = {
  config?: StrapiClientConfig;
  /** Defaults to in-memory (smoke). Composition root binds cookie-backed store. */
  credentials?: AuthCredentialStore;
};

function usernameFromEmail(email: string): string {
  const base = email.trim().toLowerCase();
  if (base.length >= 3) return base;
  return `user-${base}`;
}

/**
 * Concrete AuthPort over Strapi Users & Permissions.
 * Bound at composition root — do not import from UI pages.
 */
export function createStrapiAuthAdapter(
  options: CreateStrapiAuthAdapterOptions = {},
): AuthPort {
  const config = options.config ?? resolveStrapiConfig();
  const credentials = options.credentials ?? createMemoryCredentialStore();

  async function persistSession(session: AuthSession): Promise<AuthSession> {
    await credentials.setAccessToken(session.accessToken);
    return session;
  }

  return {
    async register(input: RegisterInput): Promise<AuthSession> {
      if (!input.consentGiven) {
        throw new Error("GDPR consent is required to register");
      }

      const email = input.email.trim().toLowerCase();
      const displayName = input.displayName.trim();
      if (!email || !displayName || !input.password) {
        throw new Error("Name, email, and password are required");
      }

      const result = await strapiAuthRequest<StrapiAuthResponse>(
        "/api/auth/local/register",
        config,
        {
          method: "POST",
          body: {
            username: usernameFromEmail(email),
            email,
            password: input.password,
            displayName,
            phone: input.phone?.trim() || undefined,
            locality: input.locality?.trim() || undefined,
            involvement: input.involvement,
            consentGiven: true,
          },
        },
      );

      if (!result.ok) {
        throw new Error(result.message || "Registration failed");
      }

      const jwt = result.data.jwt?.trim();
      const user = result.data.user;
      if (!jwt || !user) {
        throw new Error("Registration did not return a session");
      }

      const session = mapAuthSession(jwt, user);
      if (!session) {
        throw new Error("Registration returned an incomplete user");
      }

      return persistSession(session);
    },

    async login(input: LoginInput): Promise<AuthSession> {
      const identifier = input.email.trim().toLowerCase();
      if (!identifier || !input.password) {
        throw new Error("Email and password are required");
      }

      const result = await strapiAuthRequest<StrapiAuthResponse>(
        "/api/auth/local",
        config,
        {
          method: "POST",
          body: {
            identifier,
            password: input.password,
          },
        },
      );

      if (!result.ok) {
        throw new Error(result.message || "Login failed");
      }

      const jwt = result.data.jwt?.trim();
      const user = result.data.user;
      if (!jwt || !user) {
        throw new Error("Login did not return a session");
      }

      const session = mapAuthSession(jwt, user);
      if (!session) {
        throw new Error("Login returned an incomplete user");
      }

      return persistSession(session);
    },

    async logout(): Promise<void> {
      const token = await credentials.getAccessToken();
      if (token) {
        await strapiAuthRequest("/api/auth/logout", config, {
          method: "POST",
          accessToken: token,
          body: {},
        });
      }
      await credentials.setAccessToken(null);
    },

    async getSession(): Promise<AuthSession | null> {
      const token = await credentials.getAccessToken();
      if (!token) return null;

      const result = await strapiAuthRequest<StrapiAuthUser>(
        "/api/users/me",
        config,
        { accessToken: token },
      );

      if (!result.ok) {
        await credentials.setAccessToken(null);
        return null;
      }

      return mapAuthSession(token, result.data);
    },

    async requestPasswordReset(
      input: PasswordResetRequest,
    ): Promise<PasswordResetRequestResult> {
      const email = input.email.trim().toLowerCase();
      if (!email) return {};

      // Prefer trusted Strapi issue endpoint → MailPort delivers the link.
      if (config.apiToken) {
        const issued = await issueResetTokenForEmail(email, config);
        if (issued) return { emailToken: { email, token: issued } };
        // Unknown email or API failure — still silent (no enumeration).
        return {};
      }

      // Fallback: Strapi forgot-password (uses Strapi email plugin if configured).
      await strapiAuthRequest("/api/auth/forgot-password", config, {
        method: "POST",
        body: { email },
      });
      return {};
    },

    async resetPassword(input: PasswordResetConfirm): Promise<void> {
      const code = input.token.trim();
      const password = input.newPassword;
      if (!code || !password) {
        throw new Error("Reset token and new password are required");
      }

      const result = await strapiAuthRequest("/api/auth/reset-password", config, {
        method: "POST",
        body: {
          code,
          password,
          passwordConfirmation: password,
        },
      });

      if (!result.ok) {
        throw new Error(result.message || "Password reset failed");
      }
    },
  };
}

export const strapiAuthAdapter: AuthPort = createStrapiAuthAdapter();

type StrapiUserRow = {
  id?: number | string;
  email?: string;
};

type IssueResetResponse = {
  token?: string | null;
};

/**
 * Issue a one-time reset token via Strapi custom route (sets private field safely).
 * Requires STRAPI_API_TOKEN. Returns null when the user is missing or the call fails.
 */
async function issueResetTokenForEmail(
  email: string,
  config: StrapiClientConfig,
): Promise<string | null> {
  if (!config.apiToken) return null;

  const result = await strapiAuthRequest<IssueResetResponse>(
    "/api/password-reset/issue",
    config,
    {
      method: "POST",
      body: { email },
      accessToken: config.apiToken,
    },
  );

  if (!result.ok) return null;
  const token = result.data.token?.trim();
  return token || null;
}
