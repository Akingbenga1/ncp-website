import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getAppServices } from "@/lib/composition";
import { listingCategoryLabel } from "@/lib/domain/listing-labels";

type ListingDetailPageProps = {
  params: Promise<{ slug: string }>;
};

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
  const listing = await getAppServices().directory.getListingBySlug(slug);
  if (!listing) notFound();

  const meta = [listingCategoryLabel(listing.category), listing.locality]
    .filter(Boolean)
    .join(" · ");

  return (
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <header className="py-space-xl">
        <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
          Market
        </p>
        <h1 className="mt-space-2xs font-display text-display-lg-mobile font-extrabold tracking-tight text-primary md:text-headline-xl">
          {listing.name}
        </h1>
        <p className="mt-space-sm font-body text-body-lg text-text-secondary">
          {meta}
        </p>
      </header>

      <article className="pb-space-2xl" aria-labelledby="listing-detail-title">
        <h2 id="listing-detail-title" className="sr-only">
          {listing.name}
        </h2>
        <Reveal
          className="rounded-2xl border border-border-subtle bg-surface-card p-space-lg shadow-sm"
          variant="up"
        >
          {listing.imageUrl ? (
            <figure className="mb-space-md overflow-hidden rounded-xl">
              <img
                src={listing.imageUrl}
                alt={listing.imageAlt ?? listing.name}
                className="aspect-[16/10] w-full object-cover"
                width={1200}
                height={750}
                loading="eager"
                decoding="async"
              />
            </figure>
          ) : null}
          {listing.summary ? (
            <p className="mb-space-md font-body text-body-lg text-text-secondary">
              {listing.summary}
            </p>
          ) : null}
          <div className="font-body text-body-md text-on-surface whitespace-pre-wrap">
            {listing.description}
          </div>

          {listing.contactPhone ||
          listing.contactEmail ||
          listing.websiteUrl ? (
            <dl className="mt-space-md flex flex-col gap-space-2xs border-t border-border-subtle pt-space-md">
              {listing.contactPhone ? (
                <>
                  <dt className="sr-only">Phone</dt>
                  <dd>
                    <a
                      className="font-body text-body-md text-brand-emerald underline-offset-2 hover:underline"
                      href={`tel:${listing.contactPhone.replace(/\s+/g, "")}`}
                    >
                      {listing.contactPhone}
                    </a>
                  </dd>
                </>
              ) : null}
              {listing.contactEmail ? (
                <>
                  <dt className="sr-only">Email</dt>
                  <dd>
                    <a
                      className="font-body text-body-md text-brand-emerald underline-offset-2 hover:underline"
                      href={`mailto:${listing.contactEmail}`}
                    >
                      {listing.contactEmail}
                    </a>
                  </dd>
                </>
              ) : null}
              {listing.websiteUrl ? (
                <>
                  <dt className="sr-only">Website</dt>
                  <dd>
                    <a
                      className="font-body text-body-md text-brand-emerald underline-offset-2 hover:underline"
                      href={listing.websiteUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Visit website
                    </a>
                  </dd>
                </>
              ) : null}
            </dl>
          ) : null}

          <p className="mt-space-lg">
            <Link
              className="inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
              href="/market"
            >
              All listings
            </Link>
          </p>
        </Reveal>
      </article>
    </main>
  );
}
