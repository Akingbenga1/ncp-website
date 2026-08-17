import type {
  ContentListParams,
  EventDetail,
  EventSummary,
  NewsArticle,
  NewsSummary,
} from "@/lib/domain/content";

/** Port: list/get published events & news. Concrete: Strapi content-types. */
export interface ContentPort {
  listEvents(params?: ContentListParams): Promise<EventSummary[]>;
  getEventBySlug(slug: string): Promise<EventDetail | null>;
  listNews(params?: ContentListParams): Promise<NewsSummary[]>;
  getNewsBySlug(slug: string): Promise<NewsArticle | null>;
}
