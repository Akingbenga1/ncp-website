/** Domain types for Events & News (ContentPort). No CMS vendor shapes. */

export type EventId = string;
export type NewsId = string;

export type EventSummary = {
  id: EventId;
  title: string;
  slug: string;
  startsAt: string; // ISO-8601
  endsAt?: string;
  venue?: string;
  summary?: string;
  imageUrl?: string;
};

export type EventDetail = EventSummary & {
  description: string;
};

export type NewsSummary = {
  id: NewsId;
  title: string;
  slug: string;
  publishedAt: string; // ISO-8601
  summary?: string;
  imageUrl?: string;
};

export type NewsArticle = NewsSummary & {
  body: string;
};

export type ContentListParams = {
  limit?: number;
  offset?: number;
};
