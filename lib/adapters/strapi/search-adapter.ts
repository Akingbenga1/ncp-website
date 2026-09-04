import type {
  SearchHit,
  SearchQuery,
  SearchResult,
  SearchScope,
} from "@/lib/domain/search";
import type { SearchPort } from "@/lib/ports/search-port";
import {
  resolveStrapiConfig,
  strapiFetchJson,
  type StrapiClientConfig,
  type StrapiQuery,
} from "./client";
import type {
  StrapiEventDoc,
  StrapiListingDoc,
  StrapiListResponse,
  StrapiNewsDoc,
} from "./types";

const EVENTS_PATH = "/api/events";
const NEWS_PATH = "/api/news-articles";
const LISTINGS_PATH = "/api/listings";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

type StrapiPagedResponse<T> = StrapiListResponse<T> & {
  meta?: {
    pagination?: {
      total?: number;
    };
  };
};

type ScopedHits = {
  hits: SearchHit[];
  total: number;
};

function clampLimit(limit?: number): number {
  if (!limit || limit < 1) return DEFAULT_LIMIT;
  return Math.min(limit, MAX_LIMIT);
}

function clampOffset(offset?: number): number {
  if (!offset || offset < 0) return 0;
  return offset;
}

function paginationQuery(limit: number, offset: number): StrapiQuery {
  const pageSize = limit;
  const page = Math.floor(offset / pageSize) + 1;
  return {
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
  };
}

function requireId(doc: { documentId?: string; id?: number | string }): string {
  if (doc.documentId) return doc.documentId;
  if (doc.id !== undefined && doc.id !== null) return String(doc.id);
  return "";
}

function summaryOf(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

function mapEventHit(doc: StrapiEventDoc): SearchHit | null {
  const id = requireId(doc);
  const title = doc.title?.trim();
  const slug = doc.slug?.trim();
  if (!id || !title || !slug) return null;
  return {
    kind: "event",
    id,
    title,
    slug,
    summary: summaryOf(doc.summary),
    href: `/events/${slug}`,
  };
}

function mapNewsHit(doc: StrapiNewsDoc): SearchHit | null {
  const id = requireId(doc);
  const title = doc.title?.trim();
  const slug = doc.slug?.trim();
  if (!id || !title || !slug) return null;
  return {
    kind: "news",
    id,
    title,
    slug,
    summary: summaryOf(doc.summary),
    href: `/news/${slug}`,
  };
}

function mapListingHit(doc: StrapiListingDoc): SearchHit | null {
  const id = requireId(doc);
  const title = doc.name?.trim();
  const slug = doc.slug?.trim();
  if (!id || !title || !slug) return null;
  return {
    kind: "listing",
    id,
    title,
    slug,
    summary: summaryOf(doc.summary),
    href: `/market/${slug}`,
  };
}

function totalFrom(
  json: StrapiPagedResponse<unknown> | null,
  hitCount: number,
): number {
  const total = json?.meta?.pagination?.total;
  if (typeof total === "number" && total >= 0) return total;
  return hitCount;
}

async function searchEvents(
  keyword: string,
  limit: number,
  offset: number,
  config: StrapiClientConfig,
): Promise<ScopedHits> {
  const query: StrapiQuery = {
    status: "published",
    sort: "startsAt:asc",
    ...paginationQuery(limit, offset),
    "filters[$or][0][title][$containsi]": keyword,
    "filters[$or][1][summary][$containsi]": keyword,
    "filters[$or][2][venue][$containsi]": keyword,
  };

  const json = await strapiFetchJson<StrapiPagedResponse<StrapiEventDoc>>(
    EVENTS_PATH,
    config,
    query,
  );
  const rows = json?.data ?? [];
  const hits = rows
    .map(mapEventHit)
    .filter((hit): hit is SearchHit => hit !== null);
  return { hits, total: totalFrom(json, hits.length) };
}

async function searchNews(
  keyword: string,
  limit: number,
  offset: number,
  config: StrapiClientConfig,
): Promise<ScopedHits> {
  const query: StrapiQuery = {
    status: "published",
    sort: "date:desc",
    ...paginationQuery(limit, offset),
    "filters[$or][0][title][$containsi]": keyword,
    "filters[$or][1][summary][$containsi]": keyword,
  };

  const json = await strapiFetchJson<StrapiPagedResponse<StrapiNewsDoc>>(
    NEWS_PATH,
    config,
    query,
  );
  const rows = json?.data ?? [];
  const hits = rows
    .map(mapNewsHit)
    .filter((hit): hit is SearchHit => hit !== null);
  return { hits, total: totalFrom(json, hits.length) };
}

async function searchListings(
  keyword: string,
  limit: number,
  offset: number,
  config: StrapiClientConfig,
): Promise<ScopedHits> {
  const query: StrapiQuery = {
    status: "published",
    sort: "name:asc",
    ...paginationQuery(limit, offset),
    "filters[$or][0][name][$containsi]": keyword,
    "filters[$or][1][summary][$containsi]": keyword,
    "filters[$or][2][locality][$containsi]": keyword,
  };

  const json = await strapiFetchJson<StrapiPagedResponse<StrapiListingDoc>>(
    LISTINGS_PATH,
    config,
    query,
  );
  const rows = json?.data ?? [];
  const hits = rows
    .map(mapListingHit)
    .filter((hit): hit is SearchHit => hit !== null);
  return { hits, total: totalFrom(json, hits.length) };
}

async function searchScoped(
  scope: Exclude<SearchScope, "all">,
  keyword: string,
  limit: number,
  offset: number,
  config: StrapiClientConfig,
): Promise<ScopedHits> {
  switch (scope) {
    case "events":
      return searchEvents(keyword, limit, offset, config);
    case "news":
      return searchNews(keyword, limit, offset, config);
    case "listings":
      return searchListings(keyword, limit, offset, config);
  }
}

/**
 * Concrete SearchPort adapter over Strapi REST filters (Events, News, Listings).
 * Bound at composition root — do not import from UI pages.
 * Later index/search engines can replace this adapter without changing SearchPort.
 */
export function createStrapiSearchAdapter(
  config: StrapiClientConfig = resolveStrapiConfig(),
): SearchPort {
  return {
    async search(input: SearchQuery): Promise<SearchResult> {
      const q = input.q?.trim() ?? "";
      if (!q) {
        return { query: "", hits: [], total: 0 };
      }

      const scope: SearchScope = input.scope ?? "all";
      const limit = clampLimit(input.limit);
      const offset = clampOffset(input.offset);

      if (scope !== "all") {
        const scoped = await searchScoped(scope, q, limit, offset, config);
        return { query: q, hits: scoped.hits, total: scoped.total };
      }

      // Cross-scope: fetch up to `limit` from each, merge, then apply offset/limit.
      // Good enough for site search without a dedicated index; swap later behind the port.
      const [events, news, listings] = await Promise.all([
        searchEvents(q, limit, 0, config),
        searchNews(q, limit, 0, config),
        searchListings(q, limit, 0, config),
      ]);

      const merged = [...events.hits, ...news.hits, ...listings.hits];
      const total = events.total + news.total + listings.total;
      const hits = merged.slice(offset, offset + limit);

      return { query: q, hits, total };
    },
  };
}

/** Eager singleton — prefer createStrapiSearchAdapter() via composition root. */
export const strapiSearchAdapter: SearchPort = createStrapiSearchAdapter();
