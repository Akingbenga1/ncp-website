import type { SearchQuery, SearchResult } from "@/lib/domain/search";

/** Port: search events, news, listings. Concrete: Strapi queries / index. */
export interface SearchPort {
  search(query: SearchQuery): Promise<SearchResult>;
}
