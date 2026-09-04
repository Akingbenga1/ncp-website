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
    <form className="directory-filters home2-glass" method="get" action="/market">
      <div className="directory-filters-fields">
        <label htmlFor="market-category">
          Category
          <select
            id="market-category"
            name="category"
            defaultValue={category ?? ""}
          >
            <option value="">All categories</option>
            {LISTING_CATEGORIES.map((value) => (
              <option key={value} value={value}>
                {listingCategoryLabel(value)}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="market-query">
          Keyword
          <input
            id="market-query"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Name, area, or keyword"
            autoComplete="off"
          />
        </label>
      </div>
      <div className="directory-filters-actions">
        <button className="btn btn-solid" type="submit">
          Apply filters
        </button>
        {category || query ? (
          <a className="btn btn-primary" href="/market">
            Clear
          </a>
        ) : null}
      </div>
    </form>
  );
}
