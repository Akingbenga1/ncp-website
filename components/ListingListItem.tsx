import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ListingSummary } from "@/lib/domain/directory";
import { listingCategoryLabel } from "@/lib/domain/listing-labels";

type ListingListItemProps = {
  listing: ListingSummary;
};

export function ListingListItem({ listing }: ListingListItemProps) {
  const meta = [listingCategoryLabel(listing.category), listing.locality]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-card shadow-sm transition hover:shadow-card",
        listing.imageUrl && "md:flex-row",
      )}
      href={`/market/${listing.slug}`}
    >
      {listing.imageUrl ? (
        <span className="block aspect-[16/10] w-full shrink-0 overflow-hidden md:w-56 lg:w-64">
          <img
            src={listing.imageUrl}
            alt={listing.imageAlt ?? ""}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            width={640}
            height={400}
            loading="lazy"
            decoding="async"
          />
        </span>
      ) : null}
      <span className="flex flex-1 flex-col gap-space-2xs p-space-md">
        <span className="font-label text-label-md text-text-muted">{meta}</span>
        <span className="font-headline text-headline-sm font-bold text-primary">
          {listing.name}
        </span>
        {listing.summary ? (
          <span className="font-body text-body-md text-text-secondary">
            {listing.summary}
          </span>
        ) : null}
        <span className="mt-auto pt-space-2xs font-label text-label-lg text-brand-emerald">
          View listing
        </span>
      </span>
    </Link>
  );
}
