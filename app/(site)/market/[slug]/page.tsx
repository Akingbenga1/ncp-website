import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { ListingListItem } from "@/components/ListingListItem";
import { MaterialIcon } from "@/components/MaterialIcon";
import { ShareArticleActions } from "@/components/ShareArticleActions";
import { communityPhotos } from "@/data/pixabay-credits";
import type { PixabayCredit } from "@/data/pixabay-credits";
import { siteContact } from "@/data/site-contact";
import { getAppServices } from "@/lib/composition";
import type { ListingCategory, ListingDetail } from "@/lib/domain/directory";
import { listingCategoryLabel } from "@/lib/domain/listing-labels";

type ListingDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function fallbackCredit(category: ListingCategory): PixabayCredit {
  switch (category) {
    case "business":
      return communityPhotos.ukStreetMarket;
    case "service":
      return communityPhotos.proBusinessman;
    case "church":
    case "association":
    case "community-group":
      return communityPhotos.handsUnity;
    default:
      return communityPhotos.familyInPark;
  }
}

function categoryIcon(category: ListingCategory): string {
  switch (category) {
    case "business":
      return "storefront";
    case "service":
      return "handyman";
    case "church":
      return "church";
    case "association":
      return "handshake";
    case "community-group":
      return "groups";
    default:
      return "category";
  }
}

function isFoodListing(listing: ListingDetail): boolean {
  const hay = `${listing.name} ${listing.summary ?? ""} ${listing.description}`.toLowerCase();
  return (
    listing.category === "business" &&
    /food|cater|kitchen|jollof|suya|bakery|grill|restaurant|buka|chops|banquet/.test(
      hay,
    )
  );
}

function phoneTelHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

function whatsappHref(phone: string, listingName: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) return null;
  const text = encodeURIComponent(
    `Hello ${listingName}, I am inquiring from the NCP Marketplace directory.`,
  );
  return `https://wa.me/${digits}?text=${text}`;
}

function highlightChips(listing: ListingDetail): string[] {
  const parts = (listing.summary ?? listing.description)
    .split(/[,.;]/)
    .map((p) => p.trim())
    .filter((p) => p.length > 3 && p.length < 36)
    .slice(0, 4);
  if (parts.length > 0) return parts;
  return [listingCategoryLabel(listing.category), "Peterborough", "NCP Verified"];
}

const foodHighlights = [
  { label: "Party Jollof Trays", value: "From £35" },
  { label: "Suya Platters", value: "£22" },
  { label: "Small Chops Box", value: "£18" },
] as const;

const foodFacts = [
  { label: "Order Lead Time", value: "24–48 Hours" },
  { label: "Party Sizes", value: "10 to 300+ guests" },
  { label: "Hygiene", value: "5-Star Local Council" },
  { label: "Delivery", value: "PE1–PE3 on orders £40+" },
] as const;

export async function generateMetadata({
  params,
}: ListingDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getAppServices().directory.getListingBySlug(slug);
  if (!listing) {
    return { title: "Listing not found" };
  }
  return {
    title: listing.name,
    description:
      listing.summary ??
      `${listing.name} — Market directory, Nigerian Community Peterborough`,
  };
}

export default async function ListingDetailPage({
  params,
}: ListingDetailPageProps) {
  const { slug } = await params;
  const directory = getAppServices().directory;
  const listing = await directory.getListingBySlug(slug);
  if (!listing) notFound();

  const all = await directory.listListings({ limit: 24 });
  const related = all.filter((item) => item.slug !== listing.slug).slice(0, 3);
  const food = isFoodListing(listing);
  const chips = highlightChips(listing);
  const phone = listing.contactPhone ?? siteContact.phoneDisplay;
  const wa = whatsappHref(phone, listing.name);
  const email = listing.contactEmail ?? siteContact.email;
  const paragraphs = listing.description
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main id="main" className="w-full flex-grow bg-surface pt-20">
      <div className="flex w-full flex-col">
        <section className="relative w-full overflow-hidden bg-surface-stone pt-space-lg pb-space-2xl">
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary-container/40 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent-gold/10 blur-2xl" />
          <div className="relative z-10 mx-auto flex max-w-container-max flex-col gap-space-md px-gutter-mobile lg:px-gutter-desktop">
            <div className="flex flex-wrap items-center justify-between gap-space-xs font-body text-body-sm">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-space-2xs text-text-muted"
              >
                <Link href="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
                <MaterialIcon name="chevron_right" className="text-[16px]" />
                <Link
                  href="/market"
                  className="transition-colors hover:text-primary"
                >
                  Market
                </Link>
                <MaterialIcon name="chevron_right" className="text-[16px]" />
                <span className="max-w-[220px] truncate font-medium text-primary sm:max-w-none">
                  {listing.name}
                </span>
              </nav>
              <Link
                href="/market"
                className="inline-flex items-center gap-space-3xs font-label text-label-md text-primary hover:underline"
              >
                <MaterialIcon name="arrow_back" className="text-[18px]" />
                Back to Marketplace Directory
              </Link>
            </div>

            <div className="grid grid-cols-1 items-end gap-space-lg lg:grid-cols-12">
              <div className="flex flex-col gap-space-xs lg:col-span-8">
                <div className="inline-flex w-fit items-center gap-space-2xs rounded-full bg-surface-tinted px-space-xs py-1">
                  <MaterialIcon
                    name={food ? "restaurant_menu" : categoryIcon(listing.category)}
                    className="text-[18px] text-brand-emerald"
                  />
                  <span className="font-label text-label-eyebrow tracking-wider text-brand-emerald uppercase">
                    {listingCategoryLabel(listing.category)}
                    {listing.locality ? ` • ${listing.locality}` : ""}
                  </span>
                </div>
                <h1 className="font-headline text-headline-xl-mobile font-extrabold tracking-tight text-text-primary md:text-headline-xl">
                  {listing.name}
                </h1>
                {listing.summary ? (
                  <p className="max-w-3xl font-body text-body-lg leading-relaxed text-text-secondary">
                    {listing.summary}
                  </p>
                ) : null}
                <div className="flex flex-wrap items-center gap-space-2xs pt-space-2xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface-card px-space-xs py-1 font-label text-label-md text-brand-emerald shadow-sm">
                    <MaterialIcon name="verified" className="text-[16px]" />
                    NCP Verified
                  </span>
                  {listing.locality ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-surface-card px-space-xs py-1 font-label text-label-md text-text-secondary shadow-sm">
                      <MaterialIcon name="location_on" className="text-[16px]" />
                      {listing.locality}
                    </span>
                  ) : null}
                  {food ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent-gold px-space-xs py-1 font-label text-label-md text-on-primary shadow-sm">
                      Hygiene 5/5
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-space-2xs rounded-xl bg-surface-card p-space-md shadow-sm lg:col-span-4">
                <div className="flex items-center justify-between">
                  <span className="font-label text-label-eyebrow font-bold tracking-wider text-accent-warm-ochre uppercase">
                    Hygiene &amp; Trust
                  </span>
                  <span className="inline-flex items-center gap-1 font-label text-label-md font-semibold text-brand-emerald">
                    <MaterialIcon name="verified" className="text-[16px]" />
                    100% Vetted
                  </span>
                </div>
                <p className="font-body text-body-sm text-text-secondary">
                  {food
                    ? "Listed kitchens hold local council food hygiene standards and NCP verified diaspora vendor status."
                    : "Directory partners are community-endorsed with confirmed local presence across Peterborough and Cambridgeshire."}
                </p>
                <div className="flex items-center gap-2 pt-1 font-label text-label-md text-text-primary">
                  <MaterialIcon
                    name="local_shipping"
                    className="text-[18px] text-primary"
                  />
                  Serving PE1–PE7 &amp; Greater Cambridgeshire
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-space-xs pt-space-xs md:grid-cols-4">
              <div className="flex items-center gap-space-xs rounded-lg bg-surface-card px-space-sm py-space-xs shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-tinted">
                  <MaterialIcon
                    name="storefront"
                    className="text-[20px] text-primary"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-headline-sm leading-tight font-bold text-text-primary">
                    Verified
                  </span>
                  <span className="font-body text-body-sm text-text-muted">
                    Directory Partner
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-space-xs rounded-lg bg-surface-card px-space-sm py-space-xs shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-container/60">
                  <MaterialIcon
                    name="verified_user"
                    className="text-[20px] text-secondary"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-headline-sm leading-tight font-bold text-text-primary">
                    {food ? "5/5" : "Trusted"}
                  </span>
                  <span className="font-body text-body-sm text-text-muted">
                    {food ? "Hygiene Standard" : "Community Endorsed"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-space-xs rounded-lg bg-surface-card px-space-sm py-space-xs shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tertiary-fixed">
                  <MaterialIcon
                    name={food ? "moped" : "pin_drop"}
                    className="text-[20px] text-accent-warm-ochre"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-headline-sm leading-tight font-bold text-text-primary">
                    {food ? "Doorstep" : listing.locality ? "Local" : "Area"}
                  </span>
                  <span className="font-body text-body-sm text-text-muted">
                    {food ? "& Event Delivery" : "Peterborough Focus"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-space-xs rounded-lg bg-surface-card px-space-sm py-space-xs shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-fixed">
                  <MaterialIcon name="chat" className="text-[20px] text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-headline-sm leading-tight font-bold text-text-primary">
                    Direct
                  </span>
                  <span className="font-body text-body-sm text-text-muted">
                    WhatsApp &amp; Phone
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-surface py-space-xl">
          <div className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop">
            <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
              <article className="flex min-w-0 flex-col gap-space-lg lg:col-span-8">
                <div className="overflow-hidden rounded-xl bg-surface-card shadow-sm">
                  <div className="relative h-72 w-full overflow-hidden bg-surface-container sm:h-96">
                    {listing.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={listing.imageUrl}
                        alt={listing.imageAlt ?? listing.name}
                        className="h-full w-full object-cover"
                        width={1200}
                        height={640}
                        fetchPriority="high"
                      />
                    ) : (
                      <CommunityPhoto
                        credit={fallbackCredit(listing.category)}
                        priority
                        className="h-full w-full object-cover"
                        width={1200}
                        height={640}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 font-label text-label-eyebrow tracking-wider text-on-primary uppercase shadow-sm">
                        <MaterialIcon name="star" className="text-[14px]" />
                        Spotlight Vendor
                      </span>
                      {food ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent-gold px-2 py-0.5 font-label text-label-md text-on-primary">
                          Hygiene 5/5
                        </span>
                      ) : null}
                    </div>
                    {listing.locality ? (
                      <div className="absolute bottom-3 left-3">
                        <span className="rounded bg-black/40 px-2 py-0.5 font-label text-label-md text-on-primary backdrop-blur-md">
                          {listing.locality}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-col gap-space-sm rounded-xl bg-surface-card p-space-md shadow-sm md:p-space-lg">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-emerald" />
                    <h2 className="font-headline text-headline-lg font-bold text-text-primary">
                      About this listing
                    </h2>
                  </div>
                  {paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="font-body text-body-md leading-relaxed whitespace-pre-wrap text-text-secondary"
                    >
                      {paragraph}
                    </p>
                  ))}
                  <div className="flex flex-wrap gap-1.5 pt-space-2xs">
                    {chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full bg-surface-stone px-2 py-0.5 text-[12px] text-text-secondary"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                {food ? (
                  <>
                    <div className="flex flex-col gap-space-sm rounded-xl bg-surface-card p-space-md shadow-sm md:p-space-lg">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-accent-gold" />
                        <h2 className="font-headline text-headline-lg font-bold text-text-primary">
                          Popular catering highlights
                        </h2>
                      </div>
                      <div className="flex flex-col gap-space-2xs rounded-lg bg-surface-stone p-space-xs">
                        {foodHighlights.map((row) => (
                          <div
                            key={row.label}
                            className="flex items-center justify-between font-body text-body-sm"
                          >
                            <span className="text-text-muted">{row.label}</span>
                            <span className="font-bold text-text-primary">
                              {row.value}
                            </span>
                          </div>
                        ))}
                        <div className="flex items-center gap-1 pt-1 text-[12px] font-medium text-brand-emerald">
                          <MaterialIcon
                            name="check_circle"
                            className="text-[15px]"
                          />
                          Free PE1–PE3 delivery on orders over £40
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-2 rounded-lg bg-surface p-3 sm:grid-cols-2">
                        {foodFacts.map((fact) => (
                          <div
                            key={fact.label}
                            className="font-body text-body-sm text-text-secondary"
                          >
                            <strong className="text-text-primary">
                              {fact.label}:
                            </strong>{" "}
                            {fact.value}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-space-xs rounded-lg bg-surface-tinted p-space-sm text-primary">
                      <MaterialIcon name="payments" className="text-[24px]" />
                      <div>
                        <p className="font-label text-label-md font-semibold text-primary">
                          Payment &amp; Deposit Policy
                        </p>
                        <p className="font-body text-body-sm text-on-secondary-container">
                          Standard 50% deposit secures event dates. Weekend
                          pickup orders accept bank transfer and card on
                          collection.
                        </p>
                      </div>
                    </div>
                  </>
                ) : null}
              </article>

              <aside className="flex flex-col gap-space-md lg:sticky lg:top-24 lg:col-span-4">
                <div className="flex flex-col gap-space-sm rounded-xl bg-surface-card p-space-md shadow-sm">
                  <h2 className="font-headline text-headline-sm font-bold text-text-primary">
                    Contact this partner
                  </h2>
                  <p className="font-body text-body-sm text-text-secondary">
                    Reach out directly — no platform fees. Mention you found them
                    on the NCP Marketplace.
                  </p>
                  <div className="grid grid-cols-1 gap-space-2xs">
                    {wa ? (
                      <a
                        href={wa}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-space-md py-2.5 font-label text-label-md text-on-primary shadow-sm transition-colors hover:bg-primary-container"
                      >
                        <MaterialIcon name="chat" className="text-[18px]" />
                        Chat on WhatsApp
                      </a>
                    ) : null}
                    <a
                      href={phoneTelHref(phone)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-surface-stone px-space-md py-2.5 font-label text-label-md text-primary transition-colors hover:bg-surface-tinted"
                    >
                      <MaterialIcon name="call" className="text-[18px]" />
                      Call {phone}
                    </a>
                    <a
                      href={`mailto:${email}?subject=${encodeURIComponent(`NCP Marketplace inquiry: ${listing.name}`)}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-surface-stone px-space-md py-2.5 font-label text-label-md text-text-primary transition-colors hover:bg-surface-container"
                    >
                      <MaterialIcon name="mail" className="text-[18px]" />
                      Email
                    </a>
                    {listing.websiteUrl ? (
                      <a
                        href={listing.websiteUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border-subtle px-space-md py-2.5 font-label text-label-md text-primary transition-colors hover:bg-surface-tinted"
                      >
                        <MaterialIcon name="open_in_new" className="text-[18px]" />
                        Visit website
                      </a>
                    ) : null}
                  </div>
                </div>

                <ShareArticleActions title={listing.name} />

                <div className="flex flex-col gap-space-2xs rounded-xl bg-primary p-space-md text-on-primary shadow-sm">
                  <span className="font-label text-label-eyebrow font-semibold tracking-wider text-accent-gold uppercase">
                    Directory Support
                  </span>
                  <p className="font-headline text-headline-sm font-bold">
                    {siteContact.contactName}
                  </p>
                  <p className="font-body text-body-sm text-surface-container-highest/80">
                    NCP Trade &amp; Welfare liaison for marketplace inquiries.
                  </p>
                  <a
                    href={siteContact.emailHref}
                    className="mt-space-2xs inline-flex items-center gap-2 font-body text-body-sm text-brand-mint hover:underline"
                  >
                    <MaterialIcon name="mail" className="text-[18px]" />
                    {siteContact.email}
                  </a>
                  <a
                    href={siteContact.phoneHref}
                    className="inline-flex items-center gap-2 font-body text-body-sm text-brand-mint hover:underline"
                  >
                    <MaterialIcon name="call" className="text-[18px]" />
                    {siteContact.phoneDisplay}
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {related.length > 0 ? (
          <section className="w-full bg-surface-canvas py-space-2xl">
            <div className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop">
              <div className="mb-space-lg flex flex-wrap items-end justify-between gap-space-sm">
                <div>
                  <span className="font-label text-label-eyebrow font-bold tracking-wider text-brand-emerald uppercase">
                    More from the directory
                  </span>
                  <h2 className="mt-1 font-headline text-headline-lg font-extrabold text-text-primary">
                    Related community partners
                  </h2>
                </div>
                <Link
                  href="/market"
                  className="flex items-center gap-1 font-label text-label-lg font-semibold text-secondary transition-colors hover:text-primary"
                >
                  View all listings
                  <MaterialIcon name="east" className="text-[18px]" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <ListingListItem key={item.id} listing={item} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="relative w-full overflow-hidden bg-primary py-space-2xl text-on-primary">
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-primary-container/60 blur-3xl" />
          <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-brand-mint/10 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop">
            <div className="grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
              <div className="flex flex-col gap-space-xs lg:col-span-8">
                <div className="inline-flex w-fit items-center gap-space-2xs rounded-full bg-primary-container px-space-xs py-1 text-brand-mint">
                  <MaterialIcon name="diversity_3" className="text-[16px]" />
                  <span className="font-label text-label-eyebrow tracking-wider uppercase">
                    NCP Trade &amp; Welfare Support
                  </span>
                </div>
                <h2 className="font-headline text-headline-lg font-extrabold tracking-tight text-on-primary">
                  {food
                    ? "Planning a Community Gathering, Church Banquet, or Family Wedding?"
                    : "Need help choosing a trusted Peterborough partner?"}
                </h2>
                <p className="max-w-2xl font-body text-body-md leading-relaxed text-surface-container-highest/90">
                  NCP connects families and organizers directly with verified
                  diaspora entrepreneurs. Get reliable timing, community trust,
                  and culturally grounded services across Peterborough.
                </p>
                <div className="flex flex-wrap items-center gap-space-md pt-space-xs font-body text-body-sm text-surface-container-highest/80">
                  <div className="flex items-center gap-1.5">
                    <MaterialIcon
                      name="check_circle"
                      className="text-[18px] text-brand-mint"
                    />
                    Subsidized rates for registered NCP members
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MaterialIcon
                      name="check_circle"
                      className="text-[18px] text-brand-mint"
                    />
                    Free coordination liaison
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs rounded-xl bg-surface-card/10 p-space-md backdrop-blur-md lg:col-span-4">
                <h3 className="font-headline text-headline-sm font-bold text-accent-gold">
                  Are You a Peterborough Business?
                </h3>
                <p className="font-body text-body-sm text-surface-container-highest/90">
                  Get discovered by Nigerian households and local organizers in
                  Cambridgeshire.
                </p>
                <div className="flex flex-col gap-space-2xs pt-space-xs">
                  <Link
                    href="/market/suggest"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-mint px-space-md py-2.5 font-label text-label-lg text-on-primary-fixed shadow-md transition-colors hover:bg-primary-fixed"
                  >
                    <MaterialIcon name="add_business" className="text-[20px]" />
                    Register Your Business
                  </Link>
                  <a
                    href={siteContact.phoneHref}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-surface-card/15 px-space-md py-2 font-label text-label-md text-on-primary transition-colors hover:bg-surface-card/25"
                  >
                    <MaterialIcon name="call" className="text-[18px]" />
                    Speak to Trade Liaison
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
