import type { ListingCategory } from "./directory";

/** All public listing categories (enumeration order for filters / forms). */
export const LISTING_CATEGORIES: readonly ListingCategory[] = [
  "business",
  "community-group",
  "church",
  "association",
  "service",
  "other",
] as const;

const LABELS: Record<ListingCategory, string> = {
  business: "Business",
  "community-group": "Community group",
  church: "Church",
  association: "Association",
  service: "Service",
  other: "Other",
};

export function listingCategoryLabel(category: ListingCategory): string {
  return LABELS[category];
}

export function isListingCategory(value: string): value is ListingCategory {
  return (LISTING_CATEGORIES as readonly string[]).includes(value);
}
