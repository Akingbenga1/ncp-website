import {
  LISTING_CATEGORIES,
  listingCategoryLabel,
} from "@/lib/domain/listing-labels";
import type { ListingCategory } from "@/lib/domain/directory";
import { MaterialIcon } from "@/components/MaterialIcon";
import { cn } from "@/lib/cn";

export const MARKET_LOCALITIES = [
  { value: "", label: "All Peterborough & PE Areas" },
  { value: "pe1", label: "PE1 Central / Millfield" },
  { value: "pe2", label: "PE2 Orton / Woodston" },
  { value: "pe3", label: "PE3 Bretton" },
  { value: "pe4", label: "PE4 Paston & Werrington" },
  { value: "cambs", label: "Cambridgeshire Wide" },
] as const;

export type MarketSortId = "featured" | "name" | "recent";

type MarketBrowseFiltersProps = {
  category?: ListingCategory;
  query?: string;
  locality?: string;
  sort?: MarketSortId;
  categoryCounts: Record<string, number>;
  totalCount: number;
};

export function MarketBrowseFilters({
  category,
  query = "",
  locality = "",
  sort = "featured",
  categoryCounts,
  totalCount,
}: MarketBrowseFiltersProps) {
  return (
    <section className="w-full bg-surface-stone py-space-lg shadow-inner">
      <div className="mx-auto flex max-w-container-max flex-col gap-space-md px-gutter-mobile lg:px-gutter-desktop">
        <form
          method="get"
          action="/market"
          className="grid grid-cols-1 gap-space-xs rounded-xl bg-surface-card p-space-xs shadow-sm lg:grid-cols-12"
        >
          <div className="flex items-center gap-space-xs rounded-lg bg-surface-stone px-space-sm py-space-2xs lg:col-span-6">
            <MaterialIcon name="search" className="text-text-muted" />
            <label htmlFor="market-query" className="sr-only">
              Search listings
            </label>
            <input
              id="market-query"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Search by business name, keyword, or service (e.g., Jollof, Ankara, Tax)..."
              autoComplete="off"
              className="w-full bg-transparent font-body text-body-sm text-text-primary placeholder:text-text-muted focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-space-2xs rounded-lg bg-surface-stone px-space-sm py-space-2xs lg:col-span-3">
            <MaterialIcon name="near_me" className="text-[18px] text-text-muted" />
            <label htmlFor="market-locality" className="sr-only">
              Location
            </label>
            <select
              id="market-locality"
              name="locality"
              defaultValue={locality}
              className="w-full cursor-pointer bg-transparent font-body text-body-sm text-text-primary focus:outline-none"
            >
              {MARKET_LOCALITIES.map((opt) => (
                <option key={opt.value || "all"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-space-2xs rounded-lg bg-surface-stone px-space-sm py-space-2xs lg:col-span-2">
            <MaterialIcon name="sort" className="text-[18px] text-text-muted" />
            <label htmlFor="market-sort" className="sr-only">
              Sort
            </label>
            <select
              id="market-sort"
              name="sort"
              defaultValue={sort}
              className="w-full cursor-pointer bg-transparent font-body text-body-sm text-text-primary focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="name">A–Z Name</option>
              <option value="recent">Recently Listed</option>
            </select>
          </div>
          <div className="flex lg:col-span-1">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-space-sm py-space-2xs font-label text-label-md text-on-primary hover:bg-primary-container"
            >
              Go
            </button>
          </div>
          {category ? (
            <input type="hidden" name="category" value={category} />
          ) : null}
        </form>

        <div
          className="scrollbar-none flex items-center gap-space-2xs overflow-x-auto pb-space-3xs"
          role="tablist"
          aria-label="Filter by category"
        >
          <a
            href={buildMarketHref({ query, locality, sort })}
            className={cn(
              "flex items-center gap-1.5 whitespace-nowrap rounded-full px-space-sm py-2 font-label text-label-md shadow-sm transition-all",
              !category
                ? "bg-primary text-on-primary"
                : "bg-surface-card text-text-secondary hover:bg-surface-tinted hover:text-primary",
            )}
            aria-current={!category ? "page" : undefined}
          >
            <span>All Categories</span>
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
                !category
                  ? "bg-surface-card/20 text-on-primary"
                  : "bg-surface-stone text-text-muted",
              )}
            >
              {totalCount}
            </span>
          </a>
          {LISTING_CATEGORIES.map((value) => {
            const active = category === value;
            const count = categoryCounts[value] ?? 0;
            return (
              <a
                key={value}
                href={buildMarketHref({
                  category: value,
                  query,
                  locality,
                  sort,
                })}
                className={cn(
                  "flex items-center gap-1.5 whitespace-nowrap rounded-full px-space-sm py-2 font-label text-label-md shadow-sm transition-all",
                  active
                    ? "bg-primary text-on-primary"
                    : "bg-surface-card text-text-secondary hover:bg-surface-tinted hover:text-primary",
                )}
                aria-current={active ? "page" : undefined}
              >
                <span>{listingCategoryLabel(value)}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
                    active
                      ? "bg-surface-card/20 text-on-primary"
                      : "bg-surface-stone text-text-muted",
                  )}
                >
                  {count}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function buildMarketHref(opts: {
  category?: ListingCategory;
  query?: string;
  locality?: string;
  sort?: MarketSortId;
}): string {
  const params = new URLSearchParams();
  if (opts.category) params.set("category", opts.category);
  if (opts.query?.trim()) params.set("q", opts.query.trim());
  if (opts.locality?.trim()) params.set("locality", opts.locality.trim());
  if (opts.sort && opts.sort !== "featured") params.set("sort", opts.sort);
  const qs = params.toString();
  return qs ? `/market?${qs}` : "/market";
}
