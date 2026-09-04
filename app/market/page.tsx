import type { Metadata } from "next";
import Link from "next/link";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { ContentEmptyState } from "@/components/ContentEmptyState";
import { ListingListItem } from "@/components/ListingListItem";
import { MarketBrowseFilters } from "@/components/MarketBrowseFilters";
import { Reveal } from "@/components/Reveal";
import { communityPhotos } from "@/data/pixabay-credits";
import { getAppServices } from "@/lib/composition";
import { isListingCategory } from "@/lib/domain/listing-labels";

export const metadata: Metadata = {
  title: "Market",
  description:
    "Approved Nigerian-owned and Nigerian-serving businesses and community groups in Peterborough and the surrounding area.",
};

type MarketPageProps = {
  searchParams: Promise<{ category?: string; q?: string }>;
};

export default async function MarketPage({ searchParams }: MarketPageProps) {
  const params = await searchParams;
  const categoryRaw = params.category?.trim() ?? "";
  const category = isListingCategory(categoryRaw) ? categoryRaw : undefined;
  const query = params.q?.trim() || undefined;

  const { directory } = getAppServices();
  const listings = await directory.listListings({ category, query });

  const hasFilters = Boolean(category || query);

  return (
    <main id="main">
      <header className="page-hero page-hero--banner page-hero--photo">
        <div className="wrap page-hero-grid page-hero-grid-photo">
          <div>
            <p className="hero-kicker">Directory</p>
            <h1>Market</h1>
            <p className="hero-lead hero-lead-inline">
              An approved directory of Nigerian-owned and Nigerian-serving
              businesses and community groups in Peterborough and nearby.
            </p>
            <p className="hero-actions">
              <Link className="btn btn-solid" href="/market/suggest">
                Suggest a listing
              </Link>
            </p>
          </div>
          <Reveal className="page-hero-photo" variant="clip" delay={180}>
            <CommunityPhoto credit={communityPhotos.ukStreetMarket} priority />
          </Reveal>
        </div>
      </header>

      <section
        className="section section-overlap"
        aria-labelledby="market-list-heading"
      >
        <div className="wrap directory-browse">
          <h2 id="market-list-heading" className="visually-hidden">
            Directory listings
          </h2>

          <MarketBrowseFilters category={category} query={query ?? ""} />

          {listings.length === 0 ? (
            hasFilters ? (
              <ContentEmptyState
                kicker="No matches"
                title="No listings match these filters"
                lead="Try another category or keyword, or clear the filters to see everything published so far."
                primaryHref="/market"
                primaryLabel="Clear filters"
              />
            ) : (
              <ContentEmptyState
                kicker="Growing list"
                title="No published listings yet"
                lead="This directory only shows approved entries. Until NCP publishes listings, nothing fabricated appears here. Suggest a Nigerian-owned or Nigerian-serving business or community group for review."
                primaryHref="/market/suggest"
                primaryLabel="Suggest a listing"
              />
            )
          ) : (
            <ul className="content-feed">
              {listings.map((listing) => (
                <li key={listing.id}>
                  <ListingListItem listing={listing} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
