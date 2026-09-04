import Link from "next/link";
import type { EventSummary } from "@/lib/domain/content";
import { formatContentDateTime } from "@/lib/format/content-dates";

type EventListItemProps = {
  event: EventSummary;
};

export function EventListItem({ event }: EventListItemProps) {
  const when = formatContentDateTime(event.startsAt);
  const meta = [when, event.venue].filter(Boolean).join(" · ");

  return (
    <Link
      className={
        event.imageUrl
          ? "content-entry content-entry--with-media home2-glass"
          : "content-entry home2-glass"
      }
      href={`/events/${event.slug}`}
    >
      {event.imageUrl ? (
        <span className="content-entry-media">
          <img
            src={event.imageUrl}
            alt={event.imageAlt ?? ""}
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
        <span className="content-entry-title">{event.title}</span>
        {event.summary ? (
          <span className="content-entry-summary">{event.summary}</span>
        ) : null}
        <span className="content-entry-more">View event</span>
      </span>
    </Link>
  );
}
