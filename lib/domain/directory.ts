/** Domain types for the business & community directory (DirectoryPort). */

export type ListingId = string;

/** Categories aligned with project-answers §5 (Nigerian-owned/serving + community). */
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
  /** Area / town (e.g. Peterborough). */
  locality?: string;
  /** Short description for cards / browse. */
  summary?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type ListingDetail = ListingSummary & {
  /** Full listing copy (often same as short description at launch). */
  description: string;
  websiteUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
};

export type ListingFilters = {
  category?: ListingCategory;
  /** Name / keyword search (adapter maps to CMS filters). */
  query?: string;
  limit?: number;
  offset?: number;
};

/**
 * Public suggest-a-listing payload.
 * Creates a pending (unpublished) listing for admin approval — never live without publish.
 */
export type ListingSuggestion = {
  name: string;
  category: ListingCategory;
  locality?: string;
  description: string;
  websiteUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  submittedByEmail?: string;
  /** GDPR consent must be true before the adapter accepts the suggestion. */
  consentGiven: boolean;
};
