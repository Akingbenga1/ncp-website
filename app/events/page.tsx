import type { Metadata } from "next";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { ContentEmptyState } from "@/components/ContentEmptyState";
import { EventListItem } from "@/components/EventListItem";
import { Reveal } from "@/components/Reveal";
import { communityPhotos } from "@/data/pixabay-credits";
import { getAppServices } from "@/lib/composition";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming gatherings, celebrations, and community meet-ups from Nigerian Community Peterborough.",
};

export default async function EventsPage() {
  const { content } = getAppServices();
  const events = await content.listEvents({ upcomingOnly: true });

  return (
    <main id="main">
      <header className="page-hero page-hero--banner page-hero--photo">
        <div className="wrap page-hero-grid page-hero-grid-photo">
          <div>
            <p className="hero-kicker">What&apos;s on</p>
            <h1>Events</h1>
            <p className="hero-lead hero-lead-inline">
              Gatherings, celebrations, and meet-ups for Nigerian families and
              friends in Peterborough and beyond.
            </p>
          </div>
          <Reveal className="page-hero-photo" variant="clip" delay={180}>
            <CommunityPhoto
              credit={communityPhotos.heritageCelebration}
              priority
            />
          </Reveal>
        </div>
      </header>

      <section
        className="section section-overlap"
        aria-labelledby="events-list-heading"
      >
        <div className="wrap">
          <h2 id="events-list-heading" className="visually-hidden">
            Upcoming events
          </h2>
          {events.length === 0 ? (
            <ContentEmptyState
              kicker="Coming soon"
              title="No upcoming events yet"
              lead="When NCP publishes dates and venues, they will appear here. In the meantime, stay close through Get involved."
            />
          ) : (
            <ul className="content-feed">
              {events.map((event) => (
                <li key={event.id}>
                  <EventListItem event={event} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
