/** Category / display helpers for News list UI (Europe/London). */

import type { NewsSummary } from "@/lib/domain/content";

export type NewsCategoryId =
  | "all"
  | "stories"
  | "civic"
  | "health"
  | "education"
  | "culture";

const shortDateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Europe/London",
});

const featuredDateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/London",
});

export function formatNewsCardDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return shortDateFmt.format(d);
}

export function formatNewsFeaturedDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return featuredDateFmt.format(d);
}

export function newsPublishedYear(iso: string): number | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return Number(
    new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      timeZone: "Europe/London",
    }).format(d),
  );
}

export function estimateReadMinutes(text?: string): number {
  const words = (text ?? "").trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) return 2;
  return Math.max(2, Math.min(12, Math.ceil(words / 180)));
}

const articleDateFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Europe/London",
});

/** e.g. "Mon, 28 Sept 2026" for article meta strip. */
export function formatNewsArticleDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return articleDateFmt.format(d);
}

export function newsReleaseLabel(iso: string): string {
  const year = newsPublishedYear(iso);
  const month = new Intl.DateTimeFormat("en-GB", {
    month: "2-digit",
    timeZone: "Europe/London",
  }).format(new Date(iso));
  if (!year) return "NCP Release";
  return `Release #${year}-${month}`;
}

export function splitNewsBody(body: string): string[] {
  return body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function inferNewsCategory(
  title: string,
  summary?: string,
): Exclude<NewsCategoryId, "all"> {
  const t = `${title} ${summary ?? ""}`.toLowerCase();
  if (
    /nhs|health|hospital|sickle|blood|wellbeing|medical|gp|clinic/.test(t)
  ) {
    return "health";
  }
  if (
    /aru|student|youth|mentorship|education|school|academic|exam|university/.test(
      t,
    )
  ) {
    return "education";
  }
  if (
    /cultural|heritage|carnival|celebration|festival|gele|agbada|highlife/.test(
      t,
    )
  ) {
    return "culture";
  }
  if (
    /council|civic|volunteer|housing|admissions|charter|forum|policy|visa|mayor|agm|governance/.test(
      t,
    )
  ) {
    return "civic";
  }
  return "stories";
}

export function newsCategoryLabel(
  category: Exclude<NewsCategoryId, "all">,
): string {
  switch (category) {
    case "civic":
      return "Civic & Council";
    case "health":
      return "NHS & Healthcare";
    case "education":
      return "Education & Youth";
    case "culture":
      return "Cultural Heritage";
    case "stories":
    default:
      return "Community Stories";
  }
}

/** Pill styling for text-first cards. */
export function newsCategoryPillClass(
  category: Exclude<NewsCategoryId, "all">,
): string {
  switch (category) {
    case "civic":
      return "bg-surface-stone text-accent-warm-ochre";
    case "health":
      return "bg-surface-tinted text-brand-emerald";
    case "education":
      return "bg-surface-tinted text-primary";
    case "culture":
      return "bg-secondary-container text-on-secondary-container";
    case "stories":
    default:
      return "bg-surface-stone text-primary";
  }
}

export function newsMatchesQuery(article: NewsSummary, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const hay = `${article.title} ${article.summary ?? ""}`.toLowerCase();
  return hay.includes(q);
}
