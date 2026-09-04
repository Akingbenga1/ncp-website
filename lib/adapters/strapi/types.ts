/**
 * Internal Strapi REST shapes for ContentPort / DirectoryPort mapping.
 * Stay inside `lib/adapters/strapi` — never export to UI.
 */

export type StrapiMedia = {
  url?: string;
  alternativeText?: string | null;
  formats?: Record<string, { url?: string } | undefined>;
};

export type StrapiEventDoc = {
  documentId?: string;
  id?: number | string;
  title?: string;
  slug?: string;
  startsAt?: string;
  endsAt?: string | null;
  venue?: string | null;
  summary?: string | null;
  description?: string | null;
  image?: StrapiMedia | null;
};

export type StrapiNewsDoc = {
  documentId?: string;
  id?: number | string;
  title?: string;
  slug?: string;
  date?: string;
  summary?: string | null;
  body?: string | null;
  image?: StrapiMedia | null;
};

export type StrapiListingDoc = {
  documentId?: string;
  id?: number | string;
  name?: string;
  slug?: string;
  category?: string;
  summary?: string | null;
  locality?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  websiteUrl?: string | null;
  photo?: StrapiMedia | null;
  submittedByEmail?: string | null;
};

export type StrapiListResponse<T> = {
  data?: T[] | null;
};

export type StrapiOneResponse<T> = {
  data?: T | null;
};
