import Link from "next/link";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { MaterialIcon } from "@/components/MaterialIcon";
import { communityPhotos } from "@/data/pixabay-credits";
import type { PixabayCredit } from "@/data/pixabay-credits";
import {
  searchHitKindLabel,
  type SearchHit,
  type SearchHitKind,
} from "@/lib/domain/search";

type SearchHitItemProps = {
  hit: SearchHit;
  /** First result uses the large media card; later hits use the compact row. */
  variant?: "featured" | "compact";
};

function hitPhoto(kind: SearchHitKind): PixabayCredit {
  switch (kind) {
    case "listing":
      return communityPhotos.jollofPlate;
    case "event":
      return communityPhotos.friendsBlackWomen;
    case "news":
    default:
      return communityPhotos.handsUnity;
  }
}

function kindMeta(kind: SearchHitKind): {
  icon: string;
  eyebrow: string;
  pillClass: string;
  cta: string;
  secondary: string;
} {
  switch (kind) {
    case "listing":
      return {
        icon: "storefront",
        eyebrow: "Market Directory",
        pillClass:
          "bg-secondary-container text-on-secondary-container",
        cta: "View listing",
        secondary: "Details",
      };
    case "event":
      return {
        icon: "celebration",
        eyebrow: "Community Event",
        pillClass: "bg-surface-tinted text-primary",
        cta: "View event",
        secondary: "Details",
      };
    case "news":
    default:
      return {
        icon: "newspaper",
        eyebrow: "News & Civic",
        pillClass: "bg-surface-container-highest text-primary",
        cta: "Read article",
        secondary: "Open",
      };
  }
}

function FeaturedHit({ hit }: { hit: SearchHit }) {
  const meta = kindMeta(hit.kind);

  return (
    <article className="group relative flex flex-col gap-space-md overflow-hidden rounded-xl bg-surface-card p-space-md shadow-sm transition-all hover:shadow-md md:flex-row">
      <div className="relative min-h-[220px] shrink-0 overflow-hidden rounded-lg md:w-5/12">
        <CommunityPhoto
          credit={hitPhoto(hit.kind)}
          className="h-full min-h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-space-xs left-space-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent-gold px-space-xs py-1 font-label text-label-eyebrow tracking-wider text-on-surface uppercase shadow-sm">
            <MaterialIcon name="local_fire_department" className="text-[14px]" />
            Top match
          </span>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex flex-col gap-space-2xs">
          <div className="flex flex-wrap items-center gap-space-2xs">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-space-xs py-space-3xs font-label text-label-eyebrow font-bold tracking-wider uppercase ${meta.pillClass}`}
            >
              <MaterialIcon name={meta.icon} className="text-[14px]" />
              {meta.eyebrow}
            </span>
            {hit.kind === "listing" ? (
              <span className="inline-flex items-center gap-1 font-label text-label-md font-semibold text-primary">
                <MaterialIcon
                  name="check_circle"
                  className="text-[16px] text-brand-emerald"
                />
                Verified NCP Merchant
              </span>
            ) : null}
          </div>
          <h3 className="font-headline text-headline-md text-text-primary transition-colors group-hover:text-primary">
            <Link href={hit.href}>{hit.title}</Link>
          </h3>
          {hit.summary ? (
            <p className="line-clamp-2 font-body text-body-md text-text-secondary">
              {hit.summary}
            </p>
          ) : null}
        </div>
        <div className="mt-space-xs flex flex-wrap items-center gap-space-xs pt-space-md">
          <Link
            href={hit.href}
            className="inline-flex items-center gap-space-3xs rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg font-bold text-on-primary shadow-sm transition-colors hover:bg-primary-container"
          >
            {meta.cta}
            <MaterialIcon name="arrow_forward" className="text-[16px]" />
          </Link>
          <Link
            href={hit.href}
            className="inline-flex items-center gap-space-3xs rounded-lg bg-surface-container px-space-md py-space-2xs font-label text-label-lg text-primary transition-colors hover:bg-surface-container-high"
          >
            {meta.secondary}
          </Link>
        </div>
      </div>
    </article>
  );
}

function CompactHit({ hit }: { hit: SearchHit }) {
  const meta = kindMeta(hit.kind);

  return (
    <article className="group flex flex-col items-start justify-between gap-space-md rounded-xl bg-surface-card p-space-md shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center">
      <div className="flex items-start gap-space-md">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${
            hit.kind === "listing"
              ? "bg-secondary-container text-on-secondary-container"
              : hit.kind === "event"
                ? "bg-surface-tinted text-primary"
                : "bg-surface-container text-primary"
          }`}
        >
          <MaterialIcon name={meta.icon} className="text-[32px]" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-space-2xs">
            <span
              className={`rounded-full px-space-xs py-0.5 font-label text-label-eyebrow font-bold tracking-wider uppercase ${meta.pillClass}`}
            >
              {searchHitKindLabel(hit.kind)}
            </span>
          </div>
          <h4 className="font-headline text-headline-sm text-text-primary transition-colors group-hover:text-primary">
            <Link href={hit.href}>{hit.title}</Link>
          </h4>
          {hit.summary ? (
            <p className="line-clamp-1 font-body text-body-sm text-text-secondary">
              {hit.summary}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex w-full shrink-0 gap-space-2xs sm:w-auto sm:flex-col">
        <Link
          href={hit.href}
          className={`inline-flex flex-1 items-center justify-center gap-1 rounded-lg px-space-md py-space-2xs font-label text-label-lg font-bold transition-colors sm:flex-none ${
            hit.kind === "listing"
              ? "bg-brand-mint text-primary hover:bg-primary-fixed"
              : "bg-primary text-on-primary shadow-sm hover:bg-primary-container"
          }`}
        >
          {meta.cta}
        </Link>
        <Link
          href={hit.href}
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg bg-surface-container px-space-md py-space-2xs font-label text-label-lg text-primary transition-colors hover:bg-surface-container-high sm:flex-none"
        >
          {meta.secondary}
        </Link>
      </div>
    </article>
  );
}

export function SearchHitItem({
  hit,
  variant = "compact",
}: SearchHitItemProps) {
  if (variant === "featured") {
    return <FeaturedHit hit={hit} />;
  }
  return <CompactHit hit={hit} />;
}
