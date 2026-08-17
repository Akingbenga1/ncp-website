/** Domain types for the business & community directory (DirectoryPort). */

export type ListingId = string;

export type ListingCategory =
  | "business"
  | "community-group"
  | "church"
  | "association"
  | "service"
  | "other";

export type ListingSummary = {
  id: ListingId;
  name: string;
  slug: string;
  category: ListingCategory;
  locality?: string;
  summary?: string;
  imageUrl?: string;
};

export type ListingDetail = ListingSummary & {
  description: string;
  websiteUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
};

export type ListingFilters = {
  category?: ListingCategory;
  query?: string;
  limit?: number;
  offset?: number;
};

/** Public suggest-a-listing payload (admin approval later). */
export type ListingSuggestion = {
  name: string;
  category: ListingCategory;
  locality?: string;
  description: string;
  websiteUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  submittedByEmail?: string;
};
