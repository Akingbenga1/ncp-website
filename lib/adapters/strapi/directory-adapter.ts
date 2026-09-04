import type {
  ListingDetail,
  ListingFilters,
  ListingSuggestion,
  ListingSummary,
} from "@/lib/domain/directory";
import type { DirectoryPort } from "@/lib/ports/directory-port";
import {
  resolveStrapiConfig,
  strapiFetchJson,
  strapiMutateJson,
  type StrapiClientConfig,
  type StrapiQuery,
} from "./client";
import { mapListingDetail, mapListingSummary } from "./mappers";
import type { StrapiListResponse, StrapiListingDoc, StrapiOneResponse } from "./types";

const LISTINGS_PATH = "/api/listings";

function paginationQuery(params?: {
  limit?: number;
  offset?: number;
}): StrapiQuery {
  const limit = params?.limit && params.limit > 0 ? params.limit : 25;
  const offset = params?.offset && params.offset > 0 ? params.offset : 0;
  const pageSize = limit;
  const page = Math.floor(offset / pageSize) + 1;
  return {
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
  };
}

function slugifyName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Concrete DirectoryPort adapter over Strapi REST (Listing).
 * Bound at composition root — do not import from UI pages.
 */
export function createStrapiDirectoryAdapter(
  config: StrapiClientConfig = resolveStrapiConfig(),
): DirectoryPort {
  return {
    async listListings(filters?: ListingFilters): Promise<ListingSummary[]> {
      const query: StrapiQuery = {
        status: "published",
        "populate[photo]": "true",
        sort: "name:asc",
        ...paginationQuery(filters),
      };

      if (filters?.category) {
        query["filters[category][$eq]"] = filters.category;
      }

      const keyword = filters?.query?.trim();
      if (keyword) {
        // $or on name / summary / locality — flat Strapi query keys
        query["filters[$or][0][name][$containsi]"] = keyword;
        query["filters[$or][1][summary][$containsi]"] = keyword;
        query["filters[$or][2][locality][$containsi]"] = keyword;
      }

      const json = await strapiFetchJson<StrapiListResponse<StrapiListingDoc>>(
        LISTINGS_PATH,
        config,
        query,
      );
      const rows = json?.data ?? [];
      return rows
        .map((doc) => mapListingSummary(doc, config.baseUrl))
        .filter((row): row is ListingSummary => row !== null);
    },

    async getListingBySlug(slug: string): Promise<ListingDetail | null> {
      const normalized = slug.trim();
      if (!normalized) return null;

      const json = await strapiFetchJson<StrapiListResponse<StrapiListingDoc>>(
        LISTINGS_PATH,
        config,
        {
          status: "published",
          "filters[slug][$eq]": normalized,
          "populate[photo]": "true",
          "pagination[pageSize]": 1,
        },
      );
      const doc = json?.data?.[0];
      if (!doc) return null;
      return mapListingDetail(doc, config.baseUrl);
    },

    async suggestListing(
      input: ListingSuggestion,
    ): Promise<{ accepted: boolean }> {
      if (!input.consentGiven) return { accepted: false };

      const name = input.name?.trim();
      const description = input.description?.trim();
      if (!name || !description) return { accepted: false };
      if (!input.category) return { accepted: false };

      // Draft by default (no status:published) — admin must publish.
      const slugBase = slugifyName(name) || "listing";
      const slug = `${slugBase}-${Date.now().toString(36)}`;

      const data: Record<string, string | undefined> = {
        name,
        slug,
        category: input.category,
        summary: description,
        locality: input.locality?.trim() || undefined,
        contactPhone: input.contactPhone?.trim() || undefined,
        contactEmail: input.contactEmail?.trim() || undefined,
        websiteUrl: input.websiteUrl?.trim() || undefined,
        submittedByEmail: input.submittedByEmail?.trim() || undefined,
      };

      const json = await strapiMutateJson<StrapiOneResponse<StrapiListingDoc>>(
        LISTINGS_PATH,
        config,
        { data },
        { method: "POST" },
      );

      if (!json?.data) return { accepted: false };
      return { accepted: true };
    },
  };
}

/** Eager singleton — prefer createStrapiDirectoryAdapter() via composition root. */
export const strapiDirectoryAdapter: DirectoryPort =
  createStrapiDirectoryAdapter();
