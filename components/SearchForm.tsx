import {
  SEARCH_SCOPES,
  searchScopeLabel,
  type SearchScope,
} from "@/lib/domain/search";

type SearchFormProps = {
  query?: string;
  scope?: SearchScope;
};

/**
 * Progressive GET search form — no client JS required.
 * Submits to /search with q + scope query params.
 */
export function SearchForm({ query = "", scope = "all" }: SearchFormProps) {
  return (
    <form
      className="mb-space-lg rounded-2xl border border-border-subtle bg-surface-card p-space-md shadow-sm"
      method="get"
      action="/search"
    >
      <div className="grid gap-space-sm md:grid-cols-[1fr_auto]">
        <label
          className="flex flex-col gap-space-3xs font-label text-label-md font-semibold text-text-primary"
          htmlFor="site-search-q"
        >
          Search
          <input
            id="site-search-q"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Events, news, or Market listings"
            autoComplete="off"
            enterKeyHint="search"
            className="w-full rounded-lg border border-border-strong bg-surface-card px-space-sm py-space-2xs font-body text-body-md text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label
          className="flex flex-col gap-space-3xs font-label text-label-md font-semibold text-text-primary"
          htmlFor="site-search-scope"
        >
          In
          <select
            id="site-search-scope"
            name="scope"
            defaultValue={scope}
            className="w-full rounded-lg border border-border-strong bg-surface-card px-space-sm py-space-2xs font-body text-body-md text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {SEARCH_SCOPES.map((value) => (
              <option key={value} value={value}>
                {searchScopeLabel(value)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-space-sm flex flex-wrap gap-space-2xs">
        <button
          className="inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
          type="submit"
        >
          Search
        </button>
        {query || scope !== "all" ? (
          <a
            className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
            href="/search"
          >
            Clear
          </a>
        ) : null}
      </div>
    </form>
  );
}
