import type {
  MemberProfile,
  UpdateProfileInput,
} from "@/lib/domain/member";
import type { MemberPort } from "@/lib/ports/member-port";
import { mapMemberProfile } from "./auth-mappers";
import type { StrapiAuthUser } from "./auth-mappers";
import {
  createMemoryCredentialStore,
  type AuthCredentialStore,
} from "./auth-session";
import {
  resolveStrapiConfig,
  strapiAuthRequest,
  type StrapiClientConfig,
} from "./client";

export type CreateStrapiMemberAdapterOptions = {
  config?: StrapiClientConfig;
  /** Must share the same store as AuthPort for the signed-in member. */
  credentials?: AuthCredentialStore;
};

/**
 * Concrete MemberPort over Strapi Users & Permissions (/users/me + PUT /users/:id).
 * Bound at composition root — do not import from UI pages.
 */
export function createStrapiMemberAdapter(
  options: CreateStrapiMemberAdapterOptions = {},
): MemberPort {
  const config = options.config ?? resolveStrapiConfig();
  const credentials = options.credentials ?? createMemoryCredentialStore();

  async function requireToken(): Promise<string> {
    const token = await credentials.getAccessToken();
    if (!token) {
      throw new Error("Not signed in");
    }
    return token;
  }

  async function loadMe(accessToken: string): Promise<StrapiAuthUser> {
    const result = await strapiAuthRequest<StrapiAuthUser>(
      "/api/users/me",
      config,
      { accessToken },
    );
    if (!result.ok) {
      throw new Error(result.message || "Could not load profile");
    }
    return result.data;
  }

  return {
    async getOwnProfile(): Promise<MemberProfile | null> {
      const token = await credentials.getAccessToken();
      if (!token) return null;

      const result = await strapiAuthRequest<StrapiAuthUser>(
        "/api/users/me",
        config,
        { accessToken: token },
      );
      if (!result.ok) return null;
      return mapMemberProfile(result.data);
    },

    async updateOwnProfile(input: UpdateProfileInput): Promise<MemberProfile> {
      const token = await requireToken();
      const me = await loadMe(token);
      const userId = me.id;
      if (userId === undefined || userId === null) {
        throw new Error("Profile is missing an id");
      }

      const body: Record<string, string> = {};
      if (input.displayName !== undefined) {
        body.displayName = input.displayName.trim();
      }
      if (input.phone !== undefined) {
        body.phone = input.phone.trim();
      }
      if (input.locality !== undefined) {
        body.locality = input.locality.trim();
      }
      if (input.involvement !== undefined) {
        body.involvement = input.involvement;
      }

      if (Object.keys(body).length === 0) {
        const profile = mapMemberProfile(me);
        if (!profile) throw new Error("Could not map profile");
        return profile;
      }

      const result = await strapiAuthRequest<StrapiAuthUser>(
        `/api/users/${userId}`,
        config,
        {
          method: "PUT",
          accessToken: token,
          body,
        },
      );

      if (!result.ok) {
        throw new Error(result.message || "Could not update profile");
      }

      const profile = mapMemberProfile(result.data);
      if (!profile) {
        throw new Error("Update returned an incomplete profile");
      }
      return profile;
    },
  };
}

export const strapiMemberAdapter: MemberPort = createStrapiMemberAdapter();
