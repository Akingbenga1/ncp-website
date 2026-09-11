import {
  LISTING_CATEGORIES,
  listingCategoryLabel,
} from "@/lib/domain/listing-labels";
import type { ListingCategory } from "@/lib/domain/directory";

type MarketBrowseFiltersProps = {
  category?: ListingCategory;
  query?: string;
};

/**
 * Progressive GET filter form — no client JS required.
 * Submits to /market with category + q query params.
 */
export function MarketBrowseFilters({
  category,
  query = "",
}: MarketBrowseFiltersProps) {
  return (
    <form
      className="mb-space-lg rounded-2xl border border-border-subtle bg-surface-card p-space-md shadow-sm"
      method="get"
      action="/market"
    >
      <div className="grid gap-space-sm md:grid-cols-2">
        <label
          className="flex flex-col gap-space-3xs font-label text-label-md font-semibold text-text-primary"
          htmlFor="market-category"
        >
          Category
          <select
            id="market-category"
            name="category"
            defaultValue={category ?? ""}
            className="w-full rounded-lg border border-border-strong bg-surface-card px-space-sm py-space-2xs font-body text-body-md text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All categories</option>
            {LISTING_CATEGORIES.map((value) => (
              <option key={value} value={value}>
                {listingCategoryLabel(value)}
              </option>
            ))}
          </select>
        </label>
        <label
          className="flex flex-col gap-space-3xs font-label text-label-md font-semibold text-text-primary"
          htmlFor="market-query"
        >
          Keyword
          <input
            id="market-query"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Name, area, or keyword"
            autoComplete="off"
            className="w-full rounded-lg border border-border-strong bg-surface-card px-space-sm py-space-2xs font-body text-body-md text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>
      <div className="mt-space-sm flex flex-wrap gap-space-2xs">
        <button
          className="inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
          type="submit"
        >
          Apply filters
        </button>
        {category || query ? (
          <a
            className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
            href="/market"
          >
            Clear
          </a>
        ) : null}
      </div>
    </form>
  );
}
