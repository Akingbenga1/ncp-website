import Link from "next/link";
import { MaterialIcon } from "@/components/MaterialIcon";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import type { PixabayCredit } from "@/data/pixabay-credits";
import {
  eventCategoryBadge,
  formatEventCardWhen,
  inferEventFilter,
} from "@/lib/format/event-ui";
import type { EventSummary } from "@/lib/domain/content";
import { communityPhotos } from "@/data/pixabay-credits";

type EventListItemProps = {
  event: EventSummary;
};

function fallbackCredit(event: EventSummary): PixabayCredit {
  const filter = inferEventFilter(event.title, event.summary);
  if (filter === "sports") return communityPhotos.handsUnity;
  if (filter === "cultural") return communityPhotos.heritageCelebration;
  if (filter === "welcome") return communityPhotos.friendsOnBench;
  return communityPhotos.familyInPark;
}

export function EventListItem({ event }: EventListItemProps) {
  const when = formatEventCardWhen(event.startsAt);
  const badge = eventCategoryBadge(event.title, event.summary);
  const credit = fallbackCredit(event);
  const href = `/events/${event.slug}`;

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-surface-card shadow-sm transition-all duration-300 hover:shadow-xl">
      <div>
        <div className="relative h-56 overflow-hidden bg-surface-container">
          {event.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.imageUrl}
              alt={event.imageAlt ?? ""}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              width={640}
              height={400}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <CommunityPhoto
              credit={credit}
              className="transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div
            className={`absolute top-3 left-3 rounded-full px-space-xs py-1 font-label text-label-eyebrow font-bold uppercase shadow-sm backdrop-blur-sm ${badge.className}`}
          >
            {badge.label}
          </div>
          {when ? (
            <div className="absolute right-3 bottom-3 rounded-lg bg-surface/90 px-space-xs py-1 font-label text-label-md font-bold text-primary shadow-sm backdrop-blur-sm">
              {when}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-space-2xs p-space-md">
          {event.venue ? (
            <div className="flex items-center gap-space-3xs font-body text-body-sm text-text-muted">
              <MaterialIcon
                name="location_on"
                className="text-[16px] text-accent-warm-ochre"
              />
              <span>{event.venue}</span>
            </div>
          ) : null}
          <h3 className="font-headline text-headline-md font-bold text-on-surface">
            {event.title}
          </h3>
          {event.summary ? (
            <p className="font-body text-body-md text-text-secondary">
              {event.summary}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex items-center justify-between px-space-md pt-space-xs pb-space-md">
        <Link
          href={href}
          className="rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary shadow-sm transition-colors hover:bg-primary-container"
        >
          View event
        </Link>
        <Link
          href={href}
          className="inline-flex items-center gap-1 font-label text-label-md font-semibold text-primary hover:text-brand-emerald"
        >
          <span>View Details</span>
          <MaterialIcon name="chevron_right" className="text-[16px]" />
        </Link>
      </div>
    </article>
  );
}
