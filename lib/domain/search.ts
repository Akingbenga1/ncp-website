/** Domain types for site-wide search (SearchPort). */

export type SearchScope = "events" | "news" | "listings" | "all";

export type SearchHitKind = "event" | "news" | "listing";

export type SearchHit = {
  kind: SearchHitKind;
  id: string;
  title: string;
  slug: string;
  summary?: string;
  href: string;
};

export type SearchQuery = {
  q: string;
  scope?: SearchScope;
  limit?: number;
  offset?: number;
};

export type SearchResult = {
  query: string;
  hits: SearchHit[];
  total: number;
};
