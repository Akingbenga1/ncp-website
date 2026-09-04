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
    <form className="directory-filters home2-glass" method="get" action="/search">
      <div className="directory-filters-fields search-form-fields">
        <label htmlFor="site-search-q">
          Search
          <input
            id="site-search-q"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Events, news, or Market listings"
            autoComplete="off"
            enterKeyHint="search"
          />
        </label>
        <label htmlFor="site-search-scope">
          In
          <select id="site-search-scope" name="scope" defaultValue={scope}>
            {SEARCH_SCOPES.map((value) => (
              <option key={value} value={value}>
                {searchScopeLabel(value)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="directory-filters-actions">
        <button className="btn btn-solid" type="submit">
          Search
        </button>
        {query || scope !== "all" ? (
          <a className="btn btn-primary" href="/search">
            Clear
          </a>
        ) : null}
      </div>
    </form>
  );
}
