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

  const meta = [
    listingCategoryLabel(listing.category),
    listing.locality,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <main id="main">
      <header className="page-hero page-hero--banner">
        <div className="wrap">
          <p className="hero-kicker">Market</p>
          <h1>{listing.name}</h1>
          <p className="hero-lead hero-lead-inline content-detail-hero-meta">
            {meta}
          </p>
        </div>
      </header>

      <article
        className="section section-overlap"
        aria-labelledby="listing-detail-title"
      >
        <div className="wrap content-detail">
          <h2 id="listing-detail-title" className="visually-hidden">
            {listing.name}
          </h2>
          <Reveal className="home2-glass content-detail-panel" variant="up">
            {listing.imageUrl ? (
              <figure className="content-detail-figure">
                <img
                  src={listing.imageUrl}
                  alt={listing.imageAlt ?? listing.name}
                  className="content-detail-img"
                  width={1200}
                  height={750}
                  loading="eager"
                  decoding="async"
                />
              </figure>
            ) : null}
            {listing.summary ? (
              <p className="content-detail-summary">{listing.summary}</p>
            ) : null}
            <div className="content-prose">{listing.description}</div>

            {listing.contactPhone ||
            listing.contactEmail ||
            listing.websiteUrl ? (
              <dl className="directory-contact">
                {listing.contactPhone ? (
                  <>
                    <dt className="visually-hidden">Phone</dt>
                    <dd>
                      <a href={`tel:${listing.contactPhone.replace(/\s+/g, "")}`}>
                        {listing.contactPhone}
                      </a>
                    </dd>
                  </>
                ) : null}
                {listing.contactEmail ? (
                  <>
                    <dt className="visually-hidden">Email</dt>
                    <dd>
                      <a href={`mailto:${listing.contactEmail}`}>
                        {listing.contactEmail}
                      </a>
                    </dd>
                  </>
                ) : null}
                {listing.websiteUrl ? (
                  <>
                    <dt className="visually-hidden">Website</dt>
                    <dd>
                      <a
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

            <p className="content-detail-back">
              <Link className="btn btn-solid" href="/market">
                All listings
              </Link>
            </p>
          </Reveal>
        </div>
      </article>
    </main>
  );
}
