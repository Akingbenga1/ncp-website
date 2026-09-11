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
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <header className="grid items-center gap-space-lg py-space-xl lg:grid-cols-2">
        <div>
          <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
            Find
          </p>
          <h1 className="mt-space-2xs font-display text-display-lg-mobile font-extrabold tracking-tight text-primary md:text-headline-xl">
            Search
          </h1>
          <p className="mt-space-sm max-w-xl font-body text-body-lg text-text-secondary">
            Look up NCP events, community news, and approved Market listings
            in one place.
          </p>
        </div>
        <Reveal className="overflow-hidden rounded-2xl shadow-card" variant="clip" delay={180}>
          <div className="aspect-[4/3]">
            <CommunityPhoto credit={communityPhotos.handsUnity} priority />
          </div>
        </Reveal>
      </header>

      <section className="pb-space-2xl" aria-labelledby="search-results-heading">
        <h2 id="search-results-heading" className="sr-only">
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
            <p
              className="mb-space-md font-body text-body-md text-text-secondary"
              role="status"
            >
              {result.total === 1 ? "1 result" : `${result.total} results`}
              {result.query ? (
                <>
                  {" "}
                  for{" "}
                  <span className="font-semibold text-primary">
                    “{result.query}”
                  </span>
                </>
              ) : null}
            </p>
            <ul className="flex flex-col gap-space-md">
              {result.hits.map((hit) => (
                <li key={`${hit.kind}-${hit.id}`}>
                  <SearchHitItem hit={hit} />
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  );
}
