import type {

  EventDetail,

  EventSummary,

  NewsArticle,

  NewsSummary,

} from "@/lib/domain/content";

import type {

  ListingCategory,

  ListingDetail,

  ListingSummary,

} from "@/lib/domain/directory";

import { absolutizeMediaUrl } from "./client";

import type {

  StrapiEventDoc,

  StrapiListingDoc,

  StrapiMedia,

  StrapiNewsDoc,

} from "./types";



const LISTING_CATEGORIES: ReadonlySet<string> = new Set([

  "business",

  "community-group",

  "church",

  "association",

  "service",

  "other",

]);



function mediaFields(

  image: StrapiMedia | null | undefined,

  baseUrl: string,

): { imageUrl?: string; imageAlt?: string } {

  if (!image?.url) return {};

  const imageUrl = absolutizeMediaUrl(image.url, baseUrl);

  const imageAlt = image.alternativeText?.trim() || undefined;

  return { imageUrl, imageAlt };

}



function requireId(doc: { documentId?: string; id?: number | string }): string {

  if (doc.documentId) return doc.documentId;

  if (doc.id !== undefined && doc.id !== null) return String(doc.id);

  return "";

}



/** Map date-only `YYYY-MM-DD` to ISO midnight UTC for domain consistency. */

function dateToIso(date: string | undefined): string {

  if (!date) return "";

  if (date.includes("T")) return date;

  return `${date}T00:00:00.000Z`;

}



function asListingCategory(

  value: string | undefined | null,

): ListingCategory | null {

  if (!value) return null;

  return LISTING_CATEGORIES.has(value) ? (value as ListingCategory) : null;

}



export function mapEventSummary(

  doc: StrapiEventDoc,

  baseUrl: string,

): EventSummary | null {

  const id = requireId(doc);

  const title = doc.title?.trim();

  const slug = doc.slug?.trim();

  const startsAt = doc.startsAt?.trim();

  if (!id || !title || !slug || !startsAt) return null;



  const { imageUrl, imageAlt } = mediaFields(doc.image, baseUrl);

  return {

    id,

    title,

    slug,

    startsAt,

    endsAt: doc.endsAt?.trim() || undefined,

    venue: doc.venue?.trim() || undefined,

    summary: doc.summary?.trim() || undefined,

    imageUrl,

    imageAlt,

  };

}



export function mapEventDetail(

  doc: StrapiEventDoc,

  baseUrl: string,

): EventDetail | null {

  const summary = mapEventSummary(doc, baseUrl);

  if (!summary) return null;

  const description = doc.description?.trim();

  if (!description) return null;

  return { ...summary, description };

}



export function mapNewsSummary(

  doc: StrapiNewsDoc,

  baseUrl: string,

): NewsSummary | null {

  const id = requireId(doc);

  const title = doc.title?.trim();

  const slug = doc.slug?.trim();

  const publishedAt = dateToIso(doc.date?.trim());

  if (!id || !title || !slug || !publishedAt) return null;



  const { imageUrl, imageAlt } = mediaFields(doc.image, baseUrl);

  return {

    id,

    title,

    slug,

    publishedAt,

    summary: doc.summary?.trim() || undefined,

    imageUrl,

    imageAlt,

  };

}



export function mapNewsArticle(

  doc: StrapiNewsDoc,

  baseUrl: string,

): NewsArticle | null {

  const summary = mapNewsSummary(doc, baseUrl);

  if (!summary) return null;

  const body = doc.body?.trim();

  if (!body) return null;

  return { ...summary, body };

}



export function mapListingSummary(

  doc: StrapiListingDoc,

  baseUrl: string,

): ListingSummary | null {

  const id = requireId(doc);

  const name = doc.name?.trim();

  const slug = doc.slug?.trim();

  const category = asListingCategory(doc.category);

  if (!id || !name || !slug || !category) return null;



  const { imageUrl, imageAlt } = mediaFields(doc.photo, baseUrl);

  return {

    id,

    name,

    slug,

    category,

    locality: doc.locality?.trim() || undefined,

    summary: doc.summary?.trim() || undefined,

    imageUrl,

    imageAlt,

  };

}



export function mapListingDetail(

  doc: StrapiListingDoc,

  baseUrl: string,

): ListingDetail | null {

  const summary = mapListingSummary(doc, baseUrl);

  if (!summary) return null;

  const description = doc.summary?.trim();

  if (!description) return null;

  return {

    ...summary,

    description,

    websiteUrl: doc.websiteUrl?.trim() || undefined,

    contactEmail: doc.contactEmail?.trim() || undefined,

    contactPhone: doc.contactPhone?.trim() || undefined,

  };

}


