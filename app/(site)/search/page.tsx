import type { Metadata } from "next";
import Link from "next/link";
import { ContentEmptyState } from "@/components/ContentEmptyState";
import { MaterialIcon } from "@/components/MaterialIcon";
import { SearchForm } from "@/components/SearchForm";
import { SearchHitItem } from "@/components/SearchHitItem";
import { SearchSidebar } from "@/components/SearchSidebar";
import { getAppServices } from "@/lib/composition";
import {
  isSearchScope,
  type SearchScope,
} from "@/lib/domain/search";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search Nigerian Community Peterborough events, news, and Market listings.",
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string; scope?: string }>;
};

function scopeHref(query: string, scope: SearchScope): string {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (scope !== "all") params.set("scope", scope);
  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
}

function popularSearchTerms(
  listings: Array<{ name: string }>,
  events: Array<{ title: string }>,
  news: Array<{ title: string }>,
  limit = 7,
): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const add = (raw: string) => {
    const term = raw.trim();
    if (term.length < 3 || out.length >= limit) return;
    const key = term.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push(term);
  };
  const max = Math.max(listings.length, events.length, news.length);
  for (let i = 0; i < max && out.length < limit; i += 1) {
    if (listings[i]) add(listings[i].name);
    if (events[i]) add(events[i].title);
    if (news[i]) add(news[i].title);
  }
  return out;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const scopeRaw = params.scope?.trim() ?? "";
  const scope: SearchScope = isSearchScope(scopeRaw) ? scopeRaw : "all";

  const { search, content, directory } = getAppServices();

  const empty = { query: "", hits: [], total: 0 };
  const [listings, events, news, result, eventsMeta, newsMeta, listingsMeta] =
    await Promise.all([
      directory.listListings({ limit: 4 }),
      content.listEvents({ limit: 4 }),
      content.listNews({ limit: 4 }),
      query ? search.search({ q: query, scope, limit: 30 }) : empty,
      query ? search.search({ q: query, scope: "events", limit: 1 }) : empty,
      query ? search.search({ q: query, scope: "news", limit: 1 }) : empty,
      query ? search.search({ q: query, scope: "listings", limit: 1 }) : empty,
    ]);
  const popularSearches = popularSearchTerms(listings, events, news);

  const hasQuery = Boolean(query);
  const counts = {
    all: eventsMeta.total + newsMeta.total + listingsMeta.total,
    events: eventsMeta.total,
    listings: listingsMeta.total,
    news: newsMeta.total,
  };

  const tabs = [
    {
      scope: "all" as const,
      label: "All Results",
      icon: null as string | null,
      count: counts.all,
    },
    {
      scope: "events" as const,
      label: "Events & Gatherings",
      icon: "event",
      count: counts.events,
    },
    {
      scope: "listings" as const,
      label: "Market Directory",
      icon: "storefront",
      count: counts.listings,
    },
    {
      scope: "news" as const,
      label: "News & Civic",
      icon: "newspaper",
      count: counts.news,
    },
  ];

  return (
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <div className="flex w-full flex-col">
        <section className="w-full pt-space-md pb-space-xl">
          <div className="flex flex-col gap-space-md">
            <div className="flex flex-wrap items-center justify-between gap-space-2xs font-body text-body-sm text-text-muted">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-space-3xs"
              >
                <Link href="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
                <span>/</span>
                <span className="font-medium text-text-primary">
                  Universal Search
                </span>
              </nav>
              <div className="flex items-center gap-space-2xs">
                <span className="inline-flex h-2 w-2 rounded-full bg-brand-mint" />
                <span className="font-label text-label-md text-primary">
                  Live Peterborough Directory &amp; Archive
                </span>
              </div>
            </div>

            <SearchForm
              query={query}
              scope={scope}
              resultTotal={hasQuery ? result.total : undefined}
            />

            <div className="flex flex-col justify-between gap-space-sm pt-space-2xs sm:flex-row sm:items-center">
              <div
                className="flex flex-wrap items-center gap-space-2xs overflow-x-auto pb-1"
                role="tablist"
                aria-label="Search scope"
              >
                {tabs.map((tab) => {
                  const active = scope === tab.scope;
                  return (
                    <Link
                      key={tab.scope}
                      href={scopeHref(query, tab.scope)}
                      role="tab"
                      aria-selected={active}
                      className={
                        active
                          ? "inline-flex items-center gap-space-3xs rounded-full bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary shadow-sm"
                          : "inline-flex items-center gap-space-3xs rounded-full bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-on-surface-variant transition-colors hover:bg-surface-tinted hover:text-primary"
                      }
                    >
                      {tab.icon ? (
                        <MaterialIcon
                          name={tab.icon}
                          className="text-[18px]"
                        />
                      ) : null}
                      <span>{tab.label}</span>
                      {hasQuery ? (
                        <span
                          className={
                            active
                              ? "rounded-full bg-brand-mint px-space-3xs py-0.5 text-[11px] font-bold text-primary"
                              : "rounded-full bg-surface-container-high px-space-3xs py-0.5 text-[11px] font-semibold text-text-secondary"
                          }
                        >
                          {tab.count}
                        </span>
                      ) : null}
                    </Link>
                  );
                })}
              </div>

              <div className="flex shrink-0 items-center gap-space-2xs self-end sm:self-center">
                <label
                  className="font-label text-label-md text-text-muted"
                  htmlFor="search-sort"
                >
                  Sort by:
                </label>
                <div className="rounded-lg bg-surface-card px-space-xs py-space-3xs shadow-sm">
                  <select
                    id="search-sort"
                    className="cursor-pointer bg-transparent font-label text-label-lg text-text-primary focus:outline-none"
                    defaultValue="relevant"
                    aria-label="Sort results"
                  >
                    <option value="relevant">Most Relevant</option>
                    <option value="soonest">Date: Soonest Event</option>
                    <option value="recent">Recently Added</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full pb-space-3xl" aria-labelledby="search-results-heading">
          <h2 id="search-results-heading" className="sr-only">
            Search results
          </h2>
          <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
            <div className="flex flex-col gap-space-lg lg:col-span-8">
              {!hasQuery ? (
                <ContentEmptyState
                  kicker="Ready when you are"
                  title="Enter a keyword to search"
                  lead="Search published events, news articles, and approved Market listings. Use the scope tabs to narrow results."
                  primaryHref="/events"
                  primaryLabel="Browse events"
                />
              ) : result.hits.length === 0 ? (
                <ContentEmptyState
                  kicker="No matches"
                  title="Nothing matched that search"
                  lead="Try another keyword, widen the scope to All Results, or browse Events, News, and Market directly."
                  primaryHref="/search"
                  primaryLabel="Clear search"
                />
              ) : (
                <>
                  {result.hits.map((hit, index) => (
                    <SearchHitItem
                      key={`${hit.kind}-${hit.id}`}
                      hit={hit}
                      variant={index === 0 ? "featured" : "compact"}
                    />
                  ))}
                  <div className="mt-space-sm flex flex-col items-center justify-between gap-space-md rounded-xl bg-surface-card p-space-md shadow-sm sm:flex-row">
                    <p className="font-body text-body-sm text-text-muted">
                      Showing results{" "}
                      <span className="font-bold text-text-primary">
                        1 – {result.hits.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-bold text-text-primary">
                        {result.total}
                      </span>{" "}
                      matches
                    </p>
                    {result.total > result.hits.length ? (
                      <p className="font-body text-body-sm text-text-muted">
                        Refine with a narrower keyword or scope tab for more
                        focused results.
                      </p>
                    ) : null}
                  </div>
                </>
              )}
            </div>

            <SearchSidebar popularSearches={popularSearches} />
          </div>
        </section>
      </div>
    </main>
  );
}
