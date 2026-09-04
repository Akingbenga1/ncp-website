import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getAppServices } from "@/lib/composition";
import {
  formatContentDateTime,
} from "@/lib/format/content-dates";

type EventDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getAppServices().content.getEventBySlug(slug);
  if (!event) {
    return { title: "Event not found" };
  }
  return {
    title: event.title,
    description: event.summary ?? `Event details for ${event.title}`,
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = await getAppServices().content.getEventBySlug(slug);
  if (!event) notFound();

  const when = formatContentDateTime(event.startsAt);
  const ends =
    event.endsAt && event.endsAt !== event.startsAt
      ? formatContentDateTime(event.endsAt)
      : null;

  return (
    <main id="main">
      <header className="page-hero page-hero--banner">
        <div className="wrap">
          <p className="hero-kicker">Event</p>
          <h1>{event.title}</h1>
          <p className="hero-lead hero-lead-inline content-detail-hero-meta">
            {[when, event.venue].filter(Boolean).join(" · ")}
            {ends ? ` · Until ${ends}` : null}
          </p>
        </div>
      </header>

      <article className="section section-overlap" aria-labelledby="event-detail-title">
        <div className="wrap content-detail">
          <h2 id="event-detail-title" className="visually-hidden">
            {event.title}
          </h2>
          <Reveal className="home2-glass content-detail-panel" variant="up">
            {event.imageUrl ? (
              <figure className="content-detail-figure">
                <img
                  src={event.imageUrl}
                  alt={event.imageAlt ?? event.title}
                  className="content-detail-img"
                  width={1200}
                  height={750}
                  loading="eager"
                  decoding="async"
                />
              </figure>
            ) : null}
            {event.summary ? (
              <p className="content-detail-summary">{event.summary}</p>
            ) : null}
            <div className="content-prose">{event.description}</div>
            <p className="content-detail-back">
              <Link className="btn btn-solid" href="/events">
                All events
              </Link>
            </p>
          </Reveal>
        </div>
      </article>
    </main>
  );
}
