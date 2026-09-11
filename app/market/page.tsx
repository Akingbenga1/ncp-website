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
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <header className="grid items-center gap-space-lg py-space-xl lg:grid-cols-2">
        <div>
          <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
            Directory
          </p>
          <h1 className="mt-space-2xs font-display text-display-lg-mobile font-extrabold tracking-tight text-primary md:text-headline-xl">
            Market
          </h1>
          <p className="mt-space-sm max-w-xl font-body text-body-lg text-text-secondary">
            An approved directory of Nigerian-owned and Nigerian-serving
            businesses and community groups in Peterborough and nearby.
          </p>
          <p className="mt-space-md">
            <Link
              className="inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
              href="/market/suggest"
            >
              Suggest a listing
            </Link>
          </p>
        </div>
        <Reveal className="overflow-hidden rounded-2xl shadow-card" variant="clip" delay={180}>
          <div className="aspect-[4/3]">
            <CommunityPhoto credit={communityPhotos.ukStreetMarket} priority />
          </div>
        </Reveal>
      </header>

      <section className="pb-space-2xl" aria-labelledby="market-list-heading">
        <h2 id="market-list-heading" className="sr-only">
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
          <ul className="flex flex-col gap-space-md">
            {listings.map((listing) => (
              <li key={listing.id}>
                <ListingListItem listing={listing} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
