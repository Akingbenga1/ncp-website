"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MaterialIcon } from "@/components/MaterialIcon";
import { cn } from "@/lib/cn";
import type { NewsSummary } from "@/lib/domain/content";
import {
  formatNewsCardDate,
  inferNewsCategory,
  newsCategoryLabel,
  newsPublishedYear,
} from "@/lib/format/news-ui";

type NewsArchivesProps = {
  articles: NewsSummary[];
};

export function NewsArchives({ articles }: NewsArchivesProps) {
  const years = useMemo(() => {
    const set = new Set<number>();
    for (const article of articles) {
      const year = newsPublishedYear(article.publishedAt);
      if (year) set.add(year);
    }
    return Array.from(set).sort((a, b) => b - a);
  }, [articles]);

  const [yearFilter, setYearFilter] = useState<"all" | number>("all");

  const visible = useMemo(() => {
    if (yearFilter === "all") return articles;
    return articles.filter(
      (article) => newsPublishedYear(article.publishedAt) === yearFilter,
    );
  }, [articles, yearFilter]);

  if (articles.length === 0) return null;

  return (
    <section className="mb-space-2xl flex w-full flex-col gap-space-lg rounded-2xl bg-surface-card p-space-lg shadow-sm sm:p-space-xl">
      <div className="flex flex-col justify-between gap-space-md md:flex-row md:items-end">
        <div className="flex flex-col gap-space-3xs">
          <div className="inline-flex items-center gap-space-3xs text-accent-warm-ochre">
            <MaterialIcon name="inventory_2" className="text-[18px]" />
            <span className="font-label text-label-eyebrow font-bold tracking-wider uppercase">
              Chronicles &amp; Archives
            </span>
          </div>
          <h2 className="font-headline text-headline-lg font-bold tracking-tight text-primary">
            Past News &amp; Community Records
          </h2>
          <p className="max-w-2xl font-body text-body-md text-text-secondary">
            Explore past newsletters, milestone announcements, and historical
            coverage of NCP initiatives across Peterborough.
          </p>
        </div>
        <div
          className="flex items-center gap-space-3xs rounded-xl bg-surface-stone p-1"
          role="tablist"
          aria-label="Filter archives by year"
        >
          <button
            type="button"
            role="tab"
            aria-selected={yearFilter === "all"}
            onClick={() => setYearFilter("all")}
            className={cn(
              "rounded-lg px-space-xs py-space-3xs font-label text-label-md transition-colors",
              yearFilter === "all"
                ? "bg-surface-card font-bold text-primary shadow-sm"
                : "text-text-secondary hover:text-primary",
            )}
          >
            All Years
          </button>
          {years.map((year) => {
            const count = articles.filter(
              (a) => newsPublishedYear(a.publishedAt) === year,
            ).length;
            return (
              <button
                key={year}
                type="button"
                role="tab"
                aria-selected={yearFilter === year}
                onClick={() => setYearFilter(year)}
                className={cn(
                  "rounded-lg px-space-xs py-space-3xs font-label text-label-md transition-colors",
                  yearFilter === year
                    ? "bg-surface-card font-bold text-primary shadow-sm"
                    : "text-text-secondary hover:text-primary",
                )}
              >
                {year} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-space-xs">
        {visible.map((article) => {
          const category = inferNewsCategory(article.title, article.summary);
          const when = formatNewsCardDate(article.publishedAt);
          return (
            <div
              key={article.id}
              className="group flex flex-col justify-between gap-space-sm rounded-xl bg-surface-stone p-space-md transition-all duration-200 hover:bg-surface-tinted sm:flex-row sm:items-center"
            >
              <div className="flex flex-col gap-space-xs sm:flex-row sm:items-center sm:gap-space-md">
                <span className="min-w-[95px] font-body text-body-sm text-text-muted">
                  {when || "—"}
                </span>
                <span className="inline-flex w-fit items-center rounded-full bg-surface-card px-space-xs py-space-3xs font-label text-label-eyebrow font-bold text-primary uppercase">
                  {newsCategoryLabel(category)}
                </span>
                <h3 className="font-headline text-headline-sm font-semibold text-text-primary transition-colors group-hover:text-primary">
                  {article.title}
                </h3>
              </div>
              <Link
                href={`/news/${article.slug}`}
                className="inline-flex items-center gap-space-3xs self-start font-label text-label-md font-bold text-primary transition-colors hover:text-brand-emerald sm:self-center"
              >
                <span>Read Archive</span>
                <MaterialIcon name="arrow_forward" className="text-[16px]" />
              </Link>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center pt-space-2xs">
        <a
          href="#latest-news"
          className="inline-flex items-center gap-space-2xs rounded-xl bg-surface-stone px-space-md py-space-2xs font-label text-label-lg font-bold text-primary transition-all hover:bg-surface-tinted hover:text-brand-emerald"
        >
          <MaterialIcon name="folder_open" className="text-[20px]" />
          <span>Back to latest updates</span>
          <MaterialIcon name="arrow_forward" className="text-[18px]" />
        </a>
      </div>
    </section>
  );
}
