import Link from "next/link";
import { MaterialIcon } from "@/components/MaterialIcon";
import type { SearchScope } from "@/lib/domain/search";

type SearchFormProps = {
  query?: string;
  scope?: SearchScope;
  resultTotal?: number;
};

const AREA_OPTIONS = [
  { value: "all", label: "All Peterborough (PE1–PE7)" },
  { value: "pe1", label: "Central & Lincoln Rd (PE1)" },
  { value: "pe2", label: "Woodston & Fletton (PE2)" },
  { value: "pe3", label: "Bretton & Westwood (PE3)" },
  { value: "pe4", label: "Werrington & Gunthorpe (PE4)" },
  { value: "pe7", label: "Hampton & Yaxley (PE7)" },
] as const;

/**
 * Progressive GET omnisearch — submits to /search with q + scope.
 * Area / sort controls are presentational (search API has no locality filter).
 */
export function SearchForm({
  query = "",
  scope = "all",
  resultTotal,
}: SearchFormProps) {
  const hasQuery = Boolean(query);

  return (
    <div className="rounded-xl bg-surface-card p-space-sm shadow-md sm:p-space-md">
      <form
        className="flex flex-col items-stretch gap-space-2xs md:flex-row"
        method="get"
        action="/search"
        id="globalSearchForm"
      >
        {scope !== "all" ? (
          <input type="hidden" name="scope" value={scope} />
        ) : null}

        <div className="relative flex flex-1 items-center rounded-lg bg-surface-container-low px-space-xs py-space-2xs">
          <MaterialIcon
            name="travel_explore"
            className="mr-space-2xs shrink-0 text-[24px] text-primary"
          />
          <label className="sr-only" htmlFor="site-search-q">
            Search query
          </label>
          <input
            id="site-search-q"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search dishes, market vendors, council galas, student guides…"
            autoComplete="off"
            enterKeyHint="search"
            className="w-full bg-transparent font-headline text-headline-sm text-text-primary placeholder:text-text-muted focus:outline-none"
          />
          {hasQuery ? (
            <Link
              href="/search"
              className="shrink-0 rounded-full p-space-3xs text-text-muted transition-colors hover:bg-surface-container hover:text-text-primary"
              title="Clear query"
              aria-label="Clear search"
            >
              <MaterialIcon name="cancel" className="text-[20px]" />
            </Link>
          ) : null}
        </div>

        <div className="relative flex shrink-0 items-center rounded-lg bg-surface-container-low px-space-xs py-space-2xs md:w-56">
          <MaterialIcon
            name="distance"
            className="mr-space-3xs text-[20px] text-text-secondary"
          />
          <label className="sr-only" htmlFor="site-search-area">
            Area filter
          </label>
          <select
            id="site-search-area"
            defaultValue="all"
            className="w-full cursor-pointer bg-transparent font-label text-label-lg text-text-primary focus:outline-none"
            aria-label="Peterborough area (visual filter)"
          >
            {AREA_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className="inline-flex shrink-0 items-center justify-center gap-space-3xs rounded-lg bg-primary px-space-lg py-space-xs font-headline text-headline-sm text-on-primary shadow-sm transition-all hover:bg-primary-container"
          type="submit"
        >
          <MaterialIcon name="search" className="text-[20px]" />
          <span>Search</span>
        </button>
      </form>

      <div className="mt-space-xs flex flex-wrap items-center justify-between gap-space-2xs pt-space-xs font-body text-body-sm text-text-muted">
        <div className="flex flex-wrap items-center gap-space-3xs">
          {hasQuery ? (
            <>
              <span>Showing</span>
              <strong className="font-semibold text-text-primary">
                {typeof resultTotal === "number"
                  ? `${resultTotal} result${resultTotal === 1 ? "" : "s"}`
                  : "results"}
              </strong>
              <span>for</span>
              <span className="font-medium text-primary">“{query}”</span>
              <span className="hidden text-outline-variant sm:inline">•</span>
              <span className="hidden sm:inline">
                across verified community records
              </span>
            </>
          ) : (
            <span>
              Search published events, news, and approved Market listings.
            </span>
          )}
        </div>
        <div className="flex items-center gap-space-3xs">
          <MaterialIcon
            name="verified"
            className="text-[18px] text-accent-warm-ochre"
          />
          <span className="text-text-secondary">
            Official NCP Verified Database
          </span>
        </div>
      </div>
    </div>
  );
}
