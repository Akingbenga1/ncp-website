/** Domain types for Events & News (ContentPort). No CMS vendor shapes. */

export type EventId = string;
export type NewsId = string;

/** Public list card / calendar row for an event. */
export type EventSummary = {
  id: EventId;
  title: string;
  slug: string;
  /** Event start (ISO-8601). Encodes date + time for display. */
  startsAt: string;
  endsAt?: string;
  venue?: string;
  summary?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type EventDetail = EventSummary & {
  /** Full description (plain text or simple HTML from CMS). */
  description: string;
};

/** Public list card for a news article. */
export type NewsSummary = {
  id: NewsId;
  title: string;
  slug: string;
  /** Editorial / display date (ISO-8601). */
  publishedAt: string;
  summary?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type NewsArticle = NewsSummary & {
  /** Full article body (plain text or simple HTML from CMS). */
  body: string;
};

export type ContentListParams = {
  limit?: number;
  offset?: number;
};

export type EventListParams = ContentListParams & {
  /** When true, only events with startsAt >= now (UTC). */
  upcomingOnly?: boolean;
};

export type NewsListParams = ContentListParams;
