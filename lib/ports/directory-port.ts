import type {
  ListingDetail,
  ListingFilters,
  ListingSuggestion,
  ListingSummary,
} from "@/lib/domain/directory";

/** Port: browse/filter/get listings; suggest listing. Concrete: Strapi Listing. */
export interface DirectoryPort {
  listListings(filters?: ListingFilters): Promise<ListingSummary[]>;
  getListingBySlug(slug: string): Promise<ListingDetail | null>;
  suggestListing(input: ListingSuggestion): Promise<{ accepted: boolean }>;
}
