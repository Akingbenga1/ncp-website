import type {
  EventDetail,
  EventListParams,
  EventSummary,
  NewsArticle,
  NewsListParams,
  NewsSummary,
} from "@/lib/domain/content";

/**
 * ContentPort — list/get published Events & News.
 * Concrete adapter: Strapi content-types (Sprint 3).
 * UI and use-cases must depend on this contract only — never on Strapi SDK shapes.
 */
export interface ContentPort {
  listEvents(params?: EventListParams): Promise<EventSummary[]>;
  getEventBySlug(slug: string): Promise<EventDetail | null>;
  listNews(params?: NewsListParams): Promise<NewsSummary[]>;
  getNewsBySlug(slug: string): Promise<NewsArticle | null>;
}
