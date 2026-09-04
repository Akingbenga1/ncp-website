import type { MetadataRoute } from "next";
import { getAppServices } from "@/lib/composition";
import { getSiteUrl } from "@/lib/site-url";

/** Production IA static paths — not experimental homes or account flows. */
const STATIC_PATHS: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/events", changeFrequency: "weekly", priority: 0.9 },
  { path: "/news", changeFrequency: "weekly", priority: 0.9 },
  { path: "/market", changeFrequency: "weekly", priority: 0.9 },
  { path: "/market/suggest", changeFrequency: "monthly", priority: 0.5 },
  { path: "/donation", changeFrequency: "monthly", priority: 0.8 },
  { path: "/search", changeFrequency: "monthly", priority: 0.6 },
  { path: "/get-involved", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.4 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();
  const { content, directory } = getAppServices();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((entry) => ({
    url: `${base}${entry.path === "/" ? "" : entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  const [events, news, listings] = await Promise.all([
    content.listEvents({ limit: 500 }),
    content.listNews({ limit: 500 }),
    directory.listListings({ limit: 500 }),
  ]);

  const eventEntries: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${base}/events/${event.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const newsEntries: MetadataRoute.Sitemap = news.map((article) => ({
    url: `${base}/news/${article.slug}`,
    lastModified: article.publishedAt
      ? new Date(article.publishedAt)
      : now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const listingEntries: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: `${base}/market/${listing.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...eventEntries,
    ...newsEntries,
    ...listingEntries,
  ];
}
