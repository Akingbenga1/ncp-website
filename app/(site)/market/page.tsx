import type { Metadata } from "next";
import Link from "next/link";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { ContentEmptyState } from "@/components/ContentEmptyState";
import { ListingListItem } from "@/components/ListingListItem";
import {
  MarketBrowseFilters,
  type MarketSortId,
} from "@/components/MarketBrowseFilters";
import { MaterialIcon } from "@/components/MaterialIcon";
import { communityPhotos } from "@/data/pixabay-credits";
import { siteContact } from "@/data/site-contact";
import { getAppServices } from "@/lib/composition";
import type { ListingCategory, ListingSummary } from "@/lib/domain/directory";
import {
  isListingCategory,
  listingCategoryLabel,
  LISTING_CATEGORIES,
} from "@/lib/domain/listing-labels";

export const metadata: Metadata = {
  title: "Market",
  description:
    "Discover verified Nigerian-owned businesses and community services across Peterborough and Cambridgeshire.",
};

type MarketPageProps = {
  searchParams: Promise<{
    category?: string;
    q?: string;
    locality?: string;
    sort?: string;
  }>;
};

const sectorTiles = [
  {
    title: "Authentic Dining",
    body: "Jollof, grilled fish, suya skewers & party banquets across PE postcodes.",
    icon: "restaurant",
    href: "/market?category=business&q=food",
    tileClass: "bg-surface-tinted",
    iconWrap: "bg-primary text-on-primary",
    arrowClass: "text-brand-emerald",
    titleClass: "text-primary",
  },
  {
    title: "Ankara & Couture",
    body: "Custom Agbada, Aso-Ebi, bridal gowns and alterations by master tailors.",
    icon: "apparel",
    href: "/market?category=business&q=fashion",
    tileClass: "bg-surface-stone",
    iconWrap: "bg-secondary text-on-secondary",
    arrowClass: "text-secondary",
    titleClass: "text-text-primary",
  },
  {
    title: "Fresh Foodstuffs",
    body: "Yams, scotch bonnets, dried fish, garri, and authentic Nigerian spices.",
    icon: "shopping_bag",
    href: "/market?category=business&q=grocery",
    tileClass: "bg-surface-tinted",
    iconWrap: "bg-primary-container text-on-primary",
    arrowClass: "text-brand-emerald",
    titleClass: "text-primary",
  },
  {
    title: "Cargo & Shipping",
    body: "Door-to-door air freight & container deliveries between UK and Nigeria.",
    icon: "flight_takeoff",
    href: "/market?category=service&q=cargo",
    tileClass: "bg-surface-stone",
    iconWrap: "bg-tertiary-container text-on-primary",
    arrowClass: "text-accent-warm-ochre",
    titleClass: "text-text-primary",
  },
] as const;

function matchesLocality(locality: string | undefined, filter: string): boolean {
  if (!filter) return true;
  const hay = (locality ?? "").toLowerCase();
  if (filter === "cambs") {
    return (
      hay.includes("cambridg") ||
      hay.includes("huntingdon") ||
      hay.includes("ely") ||
      hay.length === 0
    );
  }
  return hay.includes(filter) || hay.includes(filter.toUpperCase());
}

function isMarketSort(value: string): value is MarketSortId {
  return value === "featured" || value === "name" || value === "recent";
}

function sortListings(
  listings: ListingSummary[],
  sort: MarketSortId,
): ListingSummary[] {
  const copy = [...listings];
  if (sort === "name" || sort === "featured") {
    copy.sort((a, b) => a.name.localeCompare(b.name, "en-GB"));
    return copy;
  }
  // recently listed — reverse alpha as a stable stand-in without createdAt
  copy.sort((a, b) => b.name.localeCompare(a.name, "en-GB"));
  return copy;
}

export default async function MarketPage({ searchParams }: MarketPageProps) {
  const params = await searchParams;
  const categoryRaw = params.category?.trim() ?? "";
  const category = isListingCategory(categoryRaw) ? categoryRaw : undefined;
  const query = params.q?.trim() || undefined;
  const locality = params.locality?.trim() || undefined;
  const sortRaw = params.sort?.trim() ?? "featured";
  const sort: MarketSortId = isMarketSort(sortRaw) ? sortRaw : "featured";

  const { directory } = getAppServices();
  const allListings = await directory.listListings({ limit: 500 });

  const categoryCounts = Object.fromEntries(
    LISTING_CATEGORIES.map((id) => [
      id,
      allListings.filter((item) => item.category === id).length,
    ]),
  ) as Record<ListingCategory, number>;

  let listings = allListings.filter((item) => {
    if (category && item.category !== category) return false;
    if (locality && !matchesLocality(item.locality, locality)) return false;
    if (query) {
      const hay =
        `${item.name} ${item.summary ?? ""} ${item.locality ?? ""}`.toLowerCase();
      if (!hay.includes(query.toLowerCase())) return false;
    }
    return true;
  });
  listings = sortListings(listings, sort);

  const hasFilters = Boolean(category || query || locality);
  const spotlight =
    allListings.find((item) => item.category === "business") ?? allListings[0];
  const suggestMailto = `${siteContact.emailHref}?subject=${encodeURIComponent("NCP directory listing request")}&body=${encodeURIComponent("Hi Theresa,\n\nI'd like to list my business on the NCP Directory.\n\nBusiness name:\nCategory:\nLocality:\nWhatsApp / phone:\nShort description:\n")}`;

  return (
    <main id="main" className="w-full flex-grow bg-surface pt-20">
      <div className="flex w-full flex-col">
        <section className="relative w-full overflow-hidden bg-primary text-on-primary">
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-container/40 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-brand-mint/10 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-container-max px-gutter-mobile pt-space-xl pb-space-2xl lg:px-gutter-desktop lg:pb-space-3xl">
            <div className="grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
              <div className="flex flex-col gap-space-md lg:col-span-7">
                <div className="inline-flex w-fit items-center gap-space-2xs rounded-full bg-surface-tinted/10 px-space-xs py-1 text-brand-mint backdrop-blur-md">
                  <MaterialIcon name="storefront" className="text-[16px]" />
                  <span className="font-label text-label-eyebrow tracking-wider uppercase">
                    Community Commerce &amp; Trusted Services
                  </span>
                </div>
                <div className="flex flex-col gap-space-xs">
                  <h1 className="font-display text-headline-xl leading-none font-extrabold tracking-tight text-on-primary lg:text-display-lg">
                    NCP Marketplace &amp; Directory
                  </h1>
                  <p className="max-w-xl font-body text-body-lg text-surface-container-highest/90">
                    Discover, support, and connect with verified Nigerian-owned
                    businesses, catering kitchens, bespoke fashion artisans,
                    groceries, and licensed advisors across Peterborough and
                    Cambridgeshire.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-space-sm pt-space-2xs">
                  <div className="flex items-center gap-space-2xs rounded-lg bg-surface-tinted/10 px-space-sm py-space-2xs backdrop-blur-sm">
                    <MaterialIcon
                      name="verified"
                      className="text-[20px] text-brand-mint"
                    />
                    <div>
                      <p className="font-headline text-headline-sm leading-tight font-bold text-on-primary">
                        {allListings.length > 0
                          ? `${allListings.length}+`
                          : "—"}
                      </p>
                      <p className="font-label text-label-eyebrow text-surface-container-highest/80 uppercase">
                        Vetted Vendors
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-2xs rounded-lg bg-surface-tinted/10 px-space-sm py-space-2xs backdrop-blur-sm">
                    <MaterialIcon
                      name="shield"
                      className="text-[20px] text-accent-gold"
                    />
                    <div>
                      <p className="font-headline text-headline-sm leading-tight font-bold text-on-primary">
                        100%
                      </p>
                      <p className="font-label text-label-eyebrow text-surface-container-highest/80 uppercase">
                        Community Endorsed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-2xs rounded-lg bg-surface-tinted/10 px-space-sm py-space-2xs backdrop-blur-sm">
                    <MaterialIcon
                      name="chat"
                      className="text-[20px] text-brand-mint"
                    />
                    <div>
                      <p className="font-headline text-headline-sm leading-tight font-bold text-on-primary">
                        Direct
                      </p>
                      <p className="font-label text-label-eyebrow text-surface-container-highest/80 uppercase">
                        WhatsApp &amp; Phone
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-space-xs pt-space-2xs">
                  <a
                    href="#list-business"
                    className="inline-flex items-center justify-center gap-space-2xs rounded-lg bg-brand-mint px-space-md py-space-2xs font-label text-label-lg text-on-primary-fixed shadow-md transition-colors hover:bg-primary-fixed"
                  >
                    <MaterialIcon name="add_business" className="text-[20px]" />
                    Register Your Business (Free)
                  </a>
                  <a
                    href="#directory-grid"
                    className="inline-flex items-center justify-center gap-space-2xs rounded-lg bg-surface-tinted/15 px-space-md py-space-2xs font-label text-label-lg text-on-primary transition-colors hover:bg-surface-tinted/25"
                  >
                    Browse All Listings
                    <MaterialIcon name="arrow_downward" className="text-[18px]" />
                  </a>
                </div>
              </div>

              <div className="flex flex-col justify-center lg:col-span-5">
                {spotlight ? (
                  <div className="overflow-hidden rounded-xl bg-surface-card text-on-surface shadow-xl transition-transform duration-300 hover:-translate-y-1">
                    <div className="relative h-56 w-full">
                      {spotlight.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={spotlight.imageUrl}
                          alt={spotlight.imageAlt ?? spotlight.name}
                          className="h-full w-full object-cover"
                          width={640}
                          height={360}
                          fetchPriority="high"
                        />
                      ) : (
                        <CommunityPhoto
                          credit={communityPhotos.ukStreetMarket}
                          priority
                        />
                      )}
                      <div className="absolute top-space-xs left-space-xs flex items-center gap-space-3xs rounded-full bg-tertiary px-space-xs py-1 font-label text-label-eyebrow text-tertiary-fixed uppercase shadow-md">
                        <MaterialIcon
                          name="local_fire_department"
                          className="text-[14px]"
                        />
                        Spotlight of the Month
                      </div>
                    </div>
                    <div className="flex flex-col gap-space-xs p-space-md">
                      <div className="flex items-center justify-between gap-space-2xs">
                        <span className="font-label text-label-eyebrow tracking-wider text-brand-emerald uppercase">
                          {listingCategoryLabel(spotlight.category)}
                        </span>
                        {spotlight.locality ? (
                          <span className="inline-flex items-center gap-1 font-body text-body-sm font-medium text-secondary">
                            <MaterialIcon
                              name="location_on"
                              className="text-[15px]"
                            />
                            {spotlight.locality}
                          </span>
                        ) : null}
                      </div>
                      <h2 className="font-headline text-headline-md font-bold text-text-primary">
                        {spotlight.name}
                      </h2>
                      {spotlight.summary ? (
                        <p className="line-clamp-2 font-body text-body-sm text-text-secondary">
                          {spotlight.summary}
                        </p>
                      ) : null}
                      <div className="flex items-center justify-between gap-space-2xs pt-space-xs">
                        <Link
                          href={`/market/${spotlight.slug}`}
                          className="inline-flex items-center gap-space-3xs rounded-lg bg-primary px-space-sm py-2 font-label text-label-md text-on-primary shadow-sm transition-colors hover:bg-primary-container"
                        >
                          <MaterialIcon name="storefront" className="text-[16px]" />
                          View Spotlight
                        </Link>
                        <Link
                          href="/market/suggest"
                          className="inline-flex items-center gap-space-3xs rounded-lg bg-surface-stone px-space-sm py-2 font-label text-label-md text-text-primary transition-colors hover:bg-surface-container"
                        >
                          Suggest yours
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-xl bg-surface-card text-on-surface shadow-xl">
                    <div className="h-56">
                      <CommunityPhoto
                        credit={communityPhotos.ukStreetMarket}
                        priority
                      />
                    </div>
                    <div className="flex flex-col gap-space-xs p-space-md">
                      <h2 className="font-headline text-headline-md font-bold text-text-primary">
                        Directory spotlight coming soon
                      </h2>
                      <p className="font-body text-body-sm text-text-secondary">
                        When NCP publishes verified vendors, a featured partner
                        will appear here.
                      </p>
                      <Link
                        href="/market/suggest"
                        className="inline-flex items-center gap-space-3xs rounded-lg bg-primary px-space-sm py-2 font-label text-label-md text-on-primary"
                      >
                        Suggest a listing
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <MarketBrowseFilters
          category={category}
          query={query ?? ""}
          locality={locality ?? ""}
          sort={sort}
          categoryCounts={categoryCounts}
          totalCount={allListings.length}
        />

        <section className="w-full bg-surface-canvas py-space-xl">
          <div className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop">
            <div className="mb-space-md flex items-end justify-between">
              <div>
                <span className="font-label text-label-eyebrow tracking-wider text-brand-emerald uppercase">
                  Explore Collections
                </span>
                <h2 className="font-headline text-headline-lg font-bold text-text-primary">
                  Featured Business Sectors
                </h2>
              </div>
              <p className="hidden font-body text-body-sm text-text-muted sm:block">
                Direct community connections in Peterborough
              </p>
            </div>
            <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2 lg:grid-cols-4">
              {sectorTiles.map((tile) => (
                <Link
                  key={tile.title}
                  href={tile.href}
                  className={`group relative overflow-hidden rounded-xl p-space-md transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${tile.tileClass}`}
                >
                  <div className="mb-space-sm flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg ${tile.iconWrap}`}
                    >
                      <MaterialIcon name={tile.icon} className="text-[24px]" />
                    </div>
                    <MaterialIcon
                      name="arrow_forward"
                      className={`transition-transform group-hover:translate-x-1 ${tile.arrowClass}`}
                    />
                  </div>
                  <h3
                    className={`mb-1 font-headline text-headline-sm font-bold ${tile.titleClass}`}
                  >
                    {tile.title}
                  </h3>
                  <p className="font-body text-body-sm text-text-secondary">
                    {tile.body}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          className="w-full bg-surface py-space-2xl"
          id="directory-grid"
          aria-labelledby="market-list-heading"
        >
          <div className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop">
            <div className="mb-space-xl flex flex-col justify-between gap-space-xs sm:flex-row sm:items-end">
              <div>
                <span className="font-label text-label-eyebrow tracking-wider text-brand-emerald uppercase">
                  Directory Catalog
                </span>
                <h2
                  id="market-list-heading"
                  className="font-headline text-headline-xl font-bold text-text-primary"
                >
                  Verified Community Businesses
                </h2>
              </div>
              <div className="flex items-center gap-space-2xs font-body text-body-sm text-text-muted">
                <span className="h-2 w-2 rounded-full bg-brand-emerald" />
                Showing {listings.length} verified{" "}
                {listings.length === 1 ? "partner" : "partners"}
              </div>
            </div>

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
              <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing) => (
                  <ListingListItem key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section
          className="w-full bg-surface-tinted py-space-2xl"
          id="list-business"
        >
          <div className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop">
            <div className="relative overflow-hidden rounded-xl bg-primary p-space-lg text-on-primary shadow-xl lg:p-space-2xl">
              <div className="pointer-events-none absolute -top-16 -right-16 h-80 w-80 rounded-full bg-brand-mint/10 blur-3xl" />
              <div className="relative z-10 grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
                <div className="flex flex-col gap-space-sm lg:col-span-8">
                  <span className="font-label text-label-eyebrow tracking-wider text-brand-mint uppercase">
                    Join The Peterborough Network
                  </span>
                  <h2 className="font-headline text-headline-xl font-bold tracking-tight text-on-primary">
                    Are you a Nigerian entrepreneur or service provider in
                    Peterborough?
                  </h2>
                  <p className="max-w-2xl font-body text-body-md text-surface-container-highest/90">
                    Listing your business on the official NCP Directory is
                    completely free. We help channel patronage directly into our
                    diaspora ventures, build commercial trust, and offer
                    cooperative marketing across our member network.
                  </p>
                  <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                    <div className="flex items-center gap-space-2xs">
                      <MaterialIcon
                        name="verified_user"
                        className="text-[20px] text-brand-mint"
                      />
                      <span className="font-label text-label-md font-medium text-on-primary">
                        Free Verified Badge
                      </span>
                    </div>
                    <div className="flex items-center gap-space-2xs">
                      <MaterialIcon
                        name="campaign"
                        className="text-[20px] text-brand-mint"
                      />
                      <span className="font-label text-label-md font-medium text-on-primary">
                        Monthly Social Spotlight
                      </span>
                    </div>
                    <div className="flex items-center gap-space-2xs">
                      <MaterialIcon
                        name="groups"
                        className="text-[20px] text-brand-mint"
                      />
                      <span className="font-label text-label-md font-medium text-on-primary">
                        Cooperative Purchasing
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-space-sm rounded-xl bg-primary-container p-space-md shadow-inner lg:col-span-4">
                  <div className="flex items-center gap-space-2xs">
                    <MaterialIcon
                      name="contact_support"
                      className="text-[24px] text-accent-gold"
                    />
                    <p className="font-headline text-headline-sm font-semibold text-on-primary">
                      Quick Submission
                    </p>
                  </div>
                  <p className="font-body text-body-sm text-surface-container-highest/80">
                    Submit your company name, WhatsApp link, and category to{" "}
                    {siteContact.contactName}, EXCO Trade Lead.
                  </p>
                  <Link
                    href="/market/suggest"
                    className="inline-flex items-center justify-center gap-space-2xs rounded-lg bg-brand-mint px-space-md py-space-2xs font-label text-label-lg text-on-primary-fixed shadow-md transition-colors hover:bg-primary-fixed"
                  >
                    <MaterialIcon name="send" className="text-[20px]" />
                    Suggest a listing
                  </Link>
                  <a
                    href={suggestMailto}
                    className="text-center font-label text-label-eyebrow text-surface-container-highest/60 hover:underline"
                  >
                    Or email {siteContact.contactName} directly
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-surface-canvas py-space-xl">
          <div className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop">
            <div className="grid grid-cols-1 gap-space-lg md:grid-cols-3">
              <div className="flex items-start gap-space-sm rounded-xl bg-surface-card p-space-md shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                  <MaterialIcon name="verified" className="text-[22px]" />
                </div>
                <div>
                  <h3 className="mb-1 font-headline text-headline-sm font-bold text-text-primary">
                    Vetted Quality
                  </h3>
                  <p className="font-body text-body-sm text-text-secondary">
                    Every merchant is endorsed by community references and
                    confirmed local presence in Cambridgeshire.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-space-sm rounded-xl bg-surface-card p-space-md shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                  <MaterialIcon name="forum" className="text-[22px]" />
                </div>
                <div>
                  <h3 className="mb-1 font-headline text-headline-sm font-bold text-text-primary">
                    Direct Communication
                  </h3>
                  <p className="font-body text-body-sm text-text-secondary">
                    No platform commissions or hidden middleman fees. You talk
                    directly with the owner on WhatsApp.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-space-sm rounded-xl bg-surface-card p-space-md shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                  <MaterialIcon name="handshake" className="text-[22px]" />
                </div>
                <div>
                  <h3 className="mb-1 font-headline text-headline-sm font-bold text-text-primary">
                    Consumer Support
                  </h3>
                  <p className="font-body text-body-sm text-text-secondary">
                    The NCP Trade &amp; Welfare committee is available to
                    facilitate cordial resolution for any patron disputes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
