"use client";

import { useMemo, useState } from "react";
import { ContentEmptyState } from "@/components/ContentEmptyState";
import { MaterialIcon } from "@/components/MaterialIcon";
import { NewsListItem } from "@/components/NewsListItem";
import { cn } from "@/lib/cn";
import type { NewsSummary } from "@/lib/domain/content";
import {
  inferNewsCategory,
  newsMatchesQuery,
  type NewsCategoryId,
} from "@/lib/format/news-ui";

const FILTERS: { id: NewsCategoryId; label: string }[] = [
  { id: "all", label: "All News" },
  { id: "stories", label: "Community Stories" },
  { id: "civic", label: "Civic & Council" },
  { id: "health", label: "NHS & Healthcare" },
  { id: "education", label: "Education & Youth" },
  { id: "culture", label: "Cultural Heritage" },
];

type NewsBrowseProps = {
  articles: NewsSummary[];
  /** When the page already shows a featured story and the grid is empty. */
  emptyBecauseFeatured?: boolean;
};

export function NewsBrowse({
  articles,
  emptyBecauseFeatured = false,
}: NewsBrowseProps) {
  const [category, setCategory] = useState<NewsCategoryId>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    return articles.filter((article) => {
      if (!newsMatchesQuery(article, query)) return false;
      if (category === "all") return true;
      return inferNewsCategory(article.title, article.summary) === category;
    });
  }, [articles, category, query]);

  const countLabel =
    visible.length === 1
      ? "Showing 1 update"
      : `Showing ${visible.length} latest updates`;

  return (
    <>
      <section
        id="latest-news"
        className="mb-space-lg flex w-full flex-col gap-space-md rounded-2xl bg-surface-card p-space-md shadow-sm"
      >
        <div className="flex flex-col justify-between gap-space-sm md:flex-row md:items-center">
          <div className="relative w-full md:max-w-md">
            <MaterialIcon
              name="search"
              className="absolute top-1/2 left-space-xs -translate-y-1/2 text-[20px] text-text-muted"
            />
            <label htmlFor="news-search-input" className="sr-only">
              Search news
            </label>
            <input
              id="news-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search news, announcements, council policies..."
              className="w-full rounded-xl bg-surface-stone py-space-2xs pr-space-md pl-10 font-body text-body-md text-text-primary transition-all placeholder:text-text-muted focus:bg-surface-card focus:shadow-md focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between gap-space-xs font-label text-label-md text-text-secondary md:justify-end">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-brand-emerald" />
              <span>{countLabel}</span>
            </span>
            <span className="text-text-muted">|</span>
            <span className="text-text-muted">Updated daily</span>
          </div>
        </div>
        <div
          className="scrollbar-none flex items-center gap-space-2xs overflow-x-auto pb-1 text-nowrap"
          role="tablist"
          aria-label="Filter news by category"
        >
          {FILTERS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={category === tab.id}
              onClick={() => setCategory(tab.id)}
              className={cn(
                "rounded-full px-space-md py-space-2xs font-label text-label-md transition-all duration-150",
                category === tab.id
                  ? "bg-primary font-bold text-on-primary shadow-sm"
                  : "bg-surface-stone text-on-surface-variant hover:bg-surface-tinted hover:text-primary",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <section
        className="mb-space-2xl flex w-full flex-col gap-space-lg"
        aria-labelledby="news-grid-heading"
      >
        <div className="flex items-center justify-between gap-space-sm">
          <div>
            <h2
              id="news-grid-heading"
              className="font-headline text-headline-lg font-bold tracking-tight text-primary"
            >
              Recent Community Reports
            </h2>
            <p className="mt-1 font-body text-body-md text-text-secondary">
              Direct dispatches, community programmes, and resource alerts.
            </p>
          </div>
          <div className="hidden items-center gap-space-3xs font-label text-label-md text-text-secondary sm:flex">
            <MaterialIcon
              name="autorenew"
              className="text-[18px] text-brand-emerald"
            />
            <span>Auto-refreshed via NCP Desk</span>
          </div>
        </div>

        {articles.length === 0 ? (
          <ContentEmptyState
            kicker={emptyBecauseFeatured ? "Up next" : "Coming soon"}
            title={
              emptyBecauseFeatured
                ? "More reports coming soon"
                : "No news published yet"
            }
            lead={
              emptyBecauseFeatured
                ? "The latest bulletin is featured above. Additional community stories will appear in this grid as NCP publishes them."
                : "When NCP shares updates, they will appear here. Stay close through Get involved for now."
            }
            primaryHref={emptyBecauseFeatured ? "#press-inquiries" : "/get-involved"}
            primaryLabel={
              emptyBecauseFeatured ? "Submit a story" : "Get involved"
            }
          />
        ) : visible.length === 0 ? (
          <ContentEmptyState
            kicker="No matches"
            title="Nothing matches this search"
            lead="Try another category or clear the search to see the latest community reports."
            primaryHref="#latest-news"
            primaryLabel="Browse all categories"
          />
        ) : (
          <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-3">
            {visible.map((article, index) => (
              <NewsListItem
                key={article.id}
                article={article}
                variant={index < 3 ? "image" : "text"}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
