import type { SearchQuery, SearchResult } from "@/lib/domain/search";

/**
 * SearchPort — query published events, news, and Market listings.
 * Concrete adapter: Strapi REST filters (Task 7.2); later index swap behind same contract.
 * UI and use-cases must depend on this contract only — never on Strapi SDK / SQL shapes.
 */
export interface SearchPort {
  /**
   * Cross-content search with optional scope + pagination.
   * Blank `q` returns `{ hits: [], total: 0 }` without dumping the catalog.
   */
  search(query: SearchQuery): Promise<SearchResult>;
}
