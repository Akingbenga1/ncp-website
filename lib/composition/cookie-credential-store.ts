import { cookies } from "next/headers";
import type { AuthCredentialStore } from "@/lib/adapters/strapi";

/** Opaque session cookie — name only; value is adapter JWT, never read by UI. */
export const AUTH_ACCESS_COOKIE = "ncp_access_token";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

/**
 * Next.js cookie-backed credential store for AuthPort / MemberPort.
 * Bound only at the composition root — adapters stay framework-agnostic via AuthCredentialStore.
 *
 * Cookie writes require a Server Action or Route Handler. Clears during RSC
 * (e.g. invalid session on getSession) are best-effort and may no-op.
 */
export function createCookieCredentialStore(): AuthCredentialStore {
  return {
    async getAccessToken() {
      const store = await cookies();
      const value = store.get(AUTH_ACCESS_COOKIE)?.value?.trim();
      return value || null;
    },

    async setAccessToken(token: string | null) {
      try {
        const store = await cookies();
        if (token) {
          store.set(AUTH_ACCESS_COOKIE, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: COOKIE_MAX_AGE_SECONDS,
          });
        } else {
          store.delete(AUTH_ACCESS_COOKIE);
        }
      } catch {
        // Ignore write failures outside mutable request contexts (RSC reads).
      }
    },
  };
}
