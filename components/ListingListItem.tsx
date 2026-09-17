import Link from "next/link";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { MaterialIcon } from "@/components/MaterialIcon";
import { communityPhotos } from "@/data/pixabay-credits";
import type { PixabayCredit } from "@/data/pixabay-credits";
import type { ListingCategory, ListingSummary } from "@/lib/domain/directory";
import { listingCategoryLabel } from "@/lib/domain/listing-labels";

type ListingListItemProps = {
  listing: ListingSummary;
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

function tagChips(listing: ListingSummary): string[] {
  const words = (listing.summary ?? "")
    .split(/[,.;]/)
    .map((part) => part.trim())
    .filter((part) => part.length > 2 && part.length < 28)
    .slice(0, 3);
  if (words.length > 0) return words;
  return [listingCategoryLabel(listing.category), "Peterborough"];
}

export function ListingListItem({ listing }: ListingListItemProps) {
  const href = `/market/${listing.slug}`;
  const tags = tagChips(listing);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-surface-card shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="relative h-52 w-full overflow-hidden bg-surface-container">
        {listing.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={listing.imageUrl}
            alt={listing.imageAlt ?? ""}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            width={640}
            height={400}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <CommunityPhoto
            credit={fallbackCredit(listing.category)}
            className="transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute top-space-xs left-space-xs flex items-center gap-1 rounded-full bg-surface-card/90 px-space-xs py-1 font-label text-label-eyebrow text-primary uppercase shadow-sm backdrop-blur-sm">
          <MaterialIcon
            name="verified"
            className="text-[14px] text-brand-emerald"
          />
          NCP Verified
        </div>
      </div>
      <div className="flex flex-grow flex-col justify-between gap-space-sm p-space-md">
        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center justify-between gap-space-2xs">
            <span className="font-label text-label-md font-semibold text-brand-emerald">
              {listingCategoryLabel(listing.category)}
            </span>
            {listing.locality ? (
              <span className="flex items-center gap-1 font-body text-body-sm text-text-muted">
                <MaterialIcon name="pin_drop" className="text-[14px]" />
                {listing.locality}
              </span>
            ) : null}
          </div>
          <h3 className="font-headline text-headline-sm font-bold text-text-primary transition-colors group-hover:text-primary">
            <Link href={href}>{listing.name}</Link>
          </h3>
          {listing.summary ? (
            <p className="line-clamp-3 font-body text-body-sm text-text-secondary">
              {listing.summary}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-1.5 pt-space-2xs">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-stone px-2 py-0.5 text-[12px] text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-space-2xs pt-space-xs">
          <Link
            href={href}
            className="inline-flex flex-1 items-center justify-center gap-space-3xs rounded-lg bg-primary py-2 font-label text-label-md text-on-primary shadow-sm transition-colors hover:bg-primary-container"
          >
            <MaterialIcon name="storefront" className="text-[16px]" />
            View listing
          </Link>
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-lg bg-surface-stone p-2 text-text-primary transition-colors hover:bg-surface-container"
            title="Open listing details"
          >
            <MaterialIcon name="arrow_forward" className="text-[18px]" />
          </Link>
        </div>
      </div>
    </article>
  );
}
