import type {
  MemberProfile,
  UpdateProfileInput,
} from "@/lib/domain/member";

/**
 * Port: read/update the signed-in member’s own profile.
 * Concrete: Strapi users (Tasks 5.2–5.3). No Strapi types here.
 * Never exposes other members’ data.
 */
export interface MemberPort {
  getOwnProfile(): Promise<MemberProfile | null>;
  updateOwnProfile(input: UpdateProfileInput): Promise<MemberProfile>;
}
