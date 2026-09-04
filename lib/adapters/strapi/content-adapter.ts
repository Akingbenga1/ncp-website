import type {
  EventDetail,
  EventListParams,
  EventSummary,
  NewsArticle,
  NewsListParams,
  NewsSummary,
} from "@/lib/domain/content";
import type { ContentPort } from "@/lib/ports/content-port";
import {
  resolveStrapiConfig,
  strapiFetchJson,
  type StrapiClientConfig,
  type StrapiQuery,
} from "./client";
import {
  mapEventDetail,
  mapEventSummary,
  mapNewsArticle,
  mapNewsSummary,
} from "./mappers";
import type {
  StrapiEventDoc,
  StrapiListResponse,
  StrapiNewsDoc,
} from "./types";

const EVENTS_PATH = "/api/events";
const NEWS_PATH = "/api/news-articles";

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

function publishedListBase(params?: {
  limit?: number;
  offset?: number;
}): StrapiQuery {
  return {
    status: "published",
    "populate[image]": "true",
    ...paginationQuery(params),
  };
}

/**
 * Concrete ContentPort adapter over Strapi REST (Events + News).
 * Bound at composition root — do not import from UI pages.
 */
export function createStrapiContentAdapter(
  config: StrapiClientConfig = resolveStrapiConfig(),
): ContentPort {
  return {
    async listEvents(params?: EventListParams): Promise<EventSummary[]> {
      const query: StrapiQuery = {
        ...publishedListBase(params),
        sort: "startsAt:asc",
      };
      if (params?.upcomingOnly) {
        query["filters[startsAt][$gte]"] = new Date().toISOString();
      }

      const json = await strapiFetchJson<StrapiListResponse<StrapiEventDoc>>(
        EVENTS_PATH,
        config,
        query,
      );
      const rows = json?.data ?? [];
      return rows
        .map((doc) => mapEventSummary(doc, config.baseUrl))
        .filter((row): row is EventSummary => row !== null);
    },

    async getEventBySlug(slug: string): Promise<EventDetail | null> {
      const normalized = slug.trim();
      if (!normalized) return null;

      const json = await strapiFetchJson<StrapiListResponse<StrapiEventDoc>>(
        EVENTS_PATH,
        config,
        {
          status: "published",
          "filters[slug][$eq]": normalized,
          "populate[image]": "true",
          "pagination[pageSize]": 1,
        },
      );
      const doc = json?.data?.[0];
      if (!doc) return null;
      return mapEventDetail(doc, config.baseUrl);
    },

    async listNews(params?: NewsListParams): Promise<NewsSummary[]> {
      const json = await strapiFetchJson<StrapiListResponse<StrapiNewsDoc>>(
        NEWS_PATH,
        config,
        {
          ...publishedListBase(params),
          sort: "date:desc",
        },
      );
      const rows = json?.data ?? [];
      return rows
        .map((doc) => mapNewsSummary(doc, config.baseUrl))
        .filter((row): row is NewsSummary => row !== null);
    },

    async getNewsBySlug(slug: string): Promise<NewsArticle | null> {
      const normalized = slug.trim();
      if (!normalized) return null;

      const json = await strapiFetchJson<StrapiListResponse<StrapiNewsDoc>>(
        NEWS_PATH,
        config,
        {
          status: "published",
          "filters[slug][$eq]": normalized,
          "populate[image]": "true",
          "pagination[pageSize]": 1,
        },
      );
      const doc = json?.data?.[0];
      if (!doc) return null;
      return mapNewsArticle(doc, config.baseUrl);
    },
  };
}

/** Eager singleton — prefer createStrapiContentAdapter() via composition root. */
export const strapiContentAdapter: ContentPort = createStrapiContentAdapter();
