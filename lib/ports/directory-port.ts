import type {
  ListingDetail,
  ListingFilters,
  ListingSuggestion,
  ListingSummary,
} from "@/lib/domain/directory";

/**
 * Port: browse/filter/get published listings; suggest a pending listing.
 * Concrete: Strapi Listing (Tasks 4.2–4.3). No Strapi types here.
 */
export interface DirectoryPort {
  listListings(filters?: ListingFilters): Promise<ListingSummary[]>;
  getListingBySlug(slug: string): Promise<ListingDetail | null>;
  /** Creates an unpublished suggestion; returns accepted:false if validation/adapter fails. */
  suggestListing(input: ListingSuggestion): Promise<{ accepted: boolean }>;
}
