import type { MemberPort } from "@/lib/ports/member-port";

/** No-op MemberPort until Strapi members adapter is wired. */
export const noopMemberAdapter: MemberPort = {
  async getProfile() {
    return null;
  },
  async updateProfile() {
    throw new Error("MemberPort: updateProfile not configured");
  },
};
