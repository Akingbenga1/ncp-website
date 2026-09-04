import type { Metadata } from "next";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { ContentEmptyState } from "@/components/ContentEmptyState";
import { Reveal } from "@/components/Reveal";
import { SearchForm } from "@/components/SearchForm";
import { SearchHitItem } from "@/components/SearchHitItem";
import { communityPhotos } from "@/data/pixabay-credits";
import { getAppServices } from "@/lib/composition";
import { isSearchScope, type SearchScope } from "@/lib/domain/search";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search events, news, and Market listings from Nigerian Community Peterborough.",
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string; scope?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const scopeRaw = params.scope?.trim() ?? "";
  const scope: SearchScope = isSearchScope(scopeRaw) ? scopeRaw : "all";

  const { search } = getAppServices();
  const result = query
    ? await search.search({ q: query, scope, limit: 30 })
    : { query: "", hits: [], total: 0 };

  const hasQuery = Boolean(query);

  return (
    <main id="main">
      <header className="page-hero page-hero--banner page-hero--photo">
        <div className="wrap page-hero-grid page-hero-grid-photo">
          <div>
            <p className="hero-kicker">Find</p>
            <h1>Search</h1>
            <p className="hero-lead hero-lead-inline">
              Look up NCP events, community news, and approved Market listings
              in one place.
            </p>
          </div>
          <Reveal className="page-hero-photo" variant="clip" delay={180}>
            <CommunityPhoto credit={communityPhotos.handsUnity} priority />
          </Reveal>
        </div>
      </header>

      <section
        className="section section-overlap"
        aria-labelledby="search-results-heading"
      >
        <div className="wrap directory-browse">
          <h2 id="search-results-heading" className="visually-hidden">
            Search results
          </h2>

          <SearchForm query={query} scope={scope} />

          {!hasQuery ? (
            <ContentEmptyState
              kicker="Ready when you are"
              title="Enter a keyword to search"
              lead="Search published events, news articles, and approved Market listings. Choose a scope to narrow results."
              primaryHref="/events"
              primaryLabel="Browse events"
            />
          ) : result.hits.length === 0 ? (
            <ContentEmptyState
              kicker="No matches"
              title="Nothing matched that search"
              lead="Try another keyword, widen the scope to Everything, or browse Events, News, and Market directly."
              primaryHref="/search"
              primaryLabel="Clear search"
            />
          ) : (
            <>
              <p className="search-results-count" role="status">
                {result.total === 1
                  ? "1 result"
                  : `${result.total} results`}
                {result.query ? (
                  <>
                    {" "}
                    for <span className="search-results-query">“{result.query}”</span>
                  </>
                ) : null}
              </p>
              <ul className="content-feed">
                {result.hits.map((hit) => (
                  <li key={`${hit.kind}-${hit.id}`}>
                    <SearchHitItem hit={hit} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
