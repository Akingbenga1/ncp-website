import type {
  MemberProfile,
  UpdateProfileInput,
} from "@/lib/domain/member";

/** Port: member profile read/update. Concrete: Strapi users/members. */
export interface MemberPort {
  getProfile(): Promise<MemberProfile | null>;
  updateProfile(input: UpdateProfileInput): Promise<MemberProfile>;
}
