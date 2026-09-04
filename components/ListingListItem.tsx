import Link from "next/link";
import type { ListingSummary } from "@/lib/domain/directory";
import { listingCategoryLabel } from "@/lib/domain/listing-labels";

type ListingListItemProps = {
  listing: ListingSummary;
};

export function ListingListItem({ listing }: ListingListItemProps) {
  const meta = [
    listingCategoryLabel(listing.category),
    listing.locality,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      className={
        listing.imageUrl
          ? "content-entry content-entry--with-media home2-glass"
          : "content-entry home2-glass"
      }
      href={`/market/${listing.slug}`}
    >
      {listing.imageUrl ? (
        <span className="content-entry-media">
          <img
            src={listing.imageUrl}
            alt={listing.imageAlt ?? ""}
            className="content-entry-img"
            width={640}
            height={400}
            loading="lazy"
            decoding="async"
          />
        </span>
      ) : null}
      <span className="content-entry-body">
        <span className="content-entry-meta">{meta}</span>
        <span className="content-entry-title">{listing.name}</span>
        {listing.summary ? (
          <span className="content-entry-summary">{listing.summary}</span>
        ) : null}
        <span className="content-entry-more">View listing</span>
      </span>
    </Link>
  );
}
