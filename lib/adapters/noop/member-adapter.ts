import type { MemberPort } from "@/lib/ports/member-port";

/** No-op MemberPort until Strapi members adapter is wired. */
export const noopMemberAdapter: MemberPort = {
  async getOwnProfile() {
    return null;
  },
  async updateOwnProfile() {
    throw new Error("MemberPort: updateOwnProfile not configured");
  },
};
