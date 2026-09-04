import type { AuthPort } from "@/lib/ports/auth-port";

/** No-op AuthPort until Strapi users adapter is wired. */
export const noopAuthAdapter: AuthPort = {
  async register() {
    throw new Error("AuthPort: register not configured");
  },
  async login() {
    throw new Error("AuthPort: login not configured");
  },
  async logout() {},
  async getSession() {
    return null;
  },
  async requestPasswordReset() {
    return {};
  },
  async resetPassword() {
    throw new Error("AuthPort: password reset not configured");
  },
};
