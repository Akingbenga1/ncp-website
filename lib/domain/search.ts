/** Domain types for site-wide search (SearchPort). */

export type SearchScope = "events" | "news" | "listings" | "all";

export type SearchHitKind = "event" | "news" | "listing";

export const SEARCH_SCOPES = [
  "all",
  "events",
  "news",
  "listings",
] as const satisfies ReadonlyArray<SearchScope>;

const SEARCH_SCOPE_SET: ReadonlySet<string> = new Set(SEARCH_SCOPES);

export function isSearchScope(value: string): value is SearchScope {
  return SEARCH_SCOPE_SET.has(value);
}

export function searchScopeLabel(scope: SearchScope): string {
  switch (scope) {
    case "events":
      return "Events";
    case "news":
      return "News";
    case "listings":
      return "Market";
    case "all":
    default:
      return "Everything";
  }
}

export function searchHitKindLabel(kind: SearchHitKind): string {
  switch (kind) {
    case "event":
      return "Event";
    case "news":
      return "News";
    case "listing":
      return "Market";
    default:
      return "Result";
  }
}

/**
 * Normalized hit — same shape whether the adapter uses Strapi filters or a later index.
 * `href` is app-route absolute path (e.g. `/events/foo`) — no CMS URLs.
 */
export type SearchHit = {
  kind: SearchHitKind;
  id: string;
  title: string;
  slug: string;
  summary?: string;
  href: string;
};

export type SearchQuery = {
  /** Free-text keyword. Empty / whitespace → empty result (no full catalog dump). */
  q: string;
  /** Default `"all"` when omitted. */
  scope?: SearchScope;
  limit?: number;
  offset?: number;
};

export type SearchResult = {
  /** Echo of trimmed query string. */
  query: string;
  hits: SearchHit[];
  /** Total matches (may exceed `hits.length` when paginated). */
  total: number;
};
