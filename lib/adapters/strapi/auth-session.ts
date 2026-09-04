/**
 * Opaque access-token store for AuthPort / MemberPort adapters.
 * Composition root binds a cookie-backed store (`createCookieCredentialStore`);
 * memory store remains for adapter smoke tests.
 */
export type AuthCredentialStore = {
  getAccessToken(): Promise<string | null>;
  setAccessToken(token: string | null): Promise<void>;
};

/** In-memory store for adapter smoke tests (not for multi-request production). */
export function createMemoryCredentialStore(
  initial: string | null = null,
): AuthCredentialStore {
  let token = initial;
  return {
    async getAccessToken() {
      return token;
    },
    async setAccessToken(next) {
      token = next;
    },
  };
}
