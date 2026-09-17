import type { Metadata } from "next";
import Link from "next/link";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { EventsBrowse } from "@/components/EventsBrowse";
import { EventsCalendar } from "@/components/EventsCalendar";
import { MaterialIcon } from "@/components/MaterialIcon";
import { communityPhotos } from "@/data/pixabay-credits";
import { siteContact } from "@/data/site-contact";
import { formatEventCardWhen } from "@/lib/format/event-ui";
import { getAppServices } from "@/lib/composition";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming gatherings, celebrations, and community meet-ups from Nigerian Community Peterborough.",
};

const archives = [
  {
    credit: communityPhotos.heritageCelebration,
    badge: "450+ Attendees",
    kicker: "Annual Showcase • 2024",
    title: "Peterborough Nigerian Cultural Carnival",
    body: "A milestone showcase featuring masquerade performances, highlife brass bands, authentic culinary competition, and attendance from Cambridgeshire civic leaders.",
  },
  {
    credit: communityPhotos.familyInPark,
    badge: "Summer 2024",
    kicker: "Outdoor Gathering",
    title: "Summer Picnic at Central Park",
    body: "Celebrated intergenerational bonding with over 200 participants, five-a-side friendlies, traditional games, and homemade Nigerian jollof feasts.",
  },
  {
    credit: communityPhotos.friendsOnBench,
    badge: "80+ Students",
    kicker: "Student Welcoming",
    title: "ARU Student Induction Reception",
    body: "Provided incoming postgraduate students from Nigeria with winter coat assistance, accommodation insights, and direct mentor matching with local professionals.",
  },
] as const;

export default async function EventsPage() {
  const { content } = getAppServices();
  const events = await content.listEvents({ upcomingOnly: true });
  const featured = events[0];
  const suggestMailto = `${siteContact.emailHref}?subject=${encodeURIComponent("Suggest an NCP event")}&body=${encodeURIComponent("Hi Theresa,\n\nI'd like to suggest a community gathering:\n\nTitle:\nPreferred date:\nVenue idea:\nShort description:\n")}`;

  return (
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <div className="flex w-full flex-col">
        {/* Hero */}
        <section className="relative mb-space-2xl overflow-hidden rounded-3xl bg-primary text-on-primary shadow-xl">
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-primary-container/40 blur-3xl" />
          <div className="pointer-events-none absolute -top-12 -left-12 h-80 w-80 rounded-full bg-brand-mint/10 blur-2xl" />
          <div className="relative z-10 grid grid-cols-1 items-center gap-space-lg px-gutter-mobile py-space-xl md:px-gutter-desktop md:py-space-2xl lg:grid-cols-12">
            <div className="flex flex-col items-start gap-space-sm lg:col-span-7">
              <div className="inline-flex items-center gap-space-3xs rounded-full bg-surface-tinted/15 px-space-xs py-space-3xs font-label text-label-eyebrow tracking-wider text-primary-fixed uppercase">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent-gold" />
                What&apos;s On • Gatherings &amp; Celebrations
              </div>
              <h1 className="font-headline text-headline-xl leading-tight font-extrabold tracking-tight text-on-primary">
                Events &amp; Gatherings
              </h1>
              <p className="max-w-xl font-body text-body-lg text-surface-container-high/90">
                Gatherings, celebrations, and meet-ups for Nigerian families and
                friends across Peterborough and Cambridgeshire. From lively
                cultural showcases to newcomer welcomes and youth sports.
              </p>
              <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
                <a
                  href="#calendar-view"
                  className="inline-flex items-center gap-space-3xs rounded-xl bg-brand-mint px-space-md py-space-xs font-label text-label-lg text-primary shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-fixed"
                >
                  <MaterialIcon name="calendar_month" className="text-[20px]" />
                  <span>Browse Calendar</span>
                </a>
                <a
                  href={suggestMailto}
                  className="inline-flex items-center gap-space-3xs rounded-xl bg-primary-container px-space-md py-space-xs font-label text-label-lg text-on-primary transition-all hover:bg-surface-tint"
                >
                  <MaterialIcon name="add_circle" className="text-[20px]" />
                  <span>Suggest an Event</span>
                </a>
                <a
                  href="#archives"
                  className="inline-flex items-center gap-space-3xs rounded-xl bg-primary-container px-space-md py-space-xs font-label text-label-lg text-on-primary transition-all hover:bg-surface-tint"
                >
                  <MaterialIcon name="photo_library" className="text-[20px]" />
                  <span>View Community Archive</span>
                </a>
              </div>
              <div className="grid w-full max-w-lg grid-cols-3 gap-space-xs pt-space-sm">
                <div className="flex flex-col rounded-xl bg-primary-container/60 p-space-xs">
                  <span className="font-headline text-headline-sm font-bold text-accent-gold">
                    {events.length > 0 ? `${events.length}` : "—"}
                  </span>
                  <span className="font-body text-body-sm text-surface-container-high/80">
                    Upcoming listed
                  </span>
                </div>
                <div className="flex flex-col rounded-xl bg-primary-container/60 p-space-xs">
                  <span className="font-headline text-headline-sm font-bold text-brand-mint">
                    Free
                  </span>
                  <span className="font-body text-body-sm text-surface-container-high/80">
                    Open Community
                  </span>
                </div>
                <div className="flex flex-col rounded-xl bg-primary-container/60 p-space-xs">
                  <span className="font-headline text-headline-sm font-bold text-on-primary">
                    All Ages
                  </span>
                  <span className="font-body text-body-sm text-surface-container-high/80">
                    Family &amp; Youth
                  </span>
                </div>
              </div>
            </div>

            <div className="relative lg:col-span-5">
              <div className="relative mx-auto overflow-hidden rounded-2xl bg-surface-container-highest shadow-2xl">
                {featured?.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.imageUrl}
                    alt={featured.imageAlt ?? featured.title}
                    className="h-80 w-full object-cover object-center lg:h-96"
                    width={800}
                    height={600}
                    fetchPriority="high"
                  />
                ) : (
                  <div className="h-80 lg:h-96">
                    <CommunityPhoto
                      credit={communityPhotos.heritageCelebration}
                      priority
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />
                <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-xl bg-surface/95 p-space-xs text-on-surface shadow-lg backdrop-blur-md">
                  <div className="flex min-w-0 items-center gap-space-2xs">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                      <MaterialIcon name="park" className="text-[22px]" />
                    </div>
                    <div className="truncate">
                      <span className="block font-label text-label-eyebrow font-bold text-accent-warm-ochre uppercase">
                        Upcoming Featured
                      </span>
                      <span className="block truncate font-headline text-headline-sm font-bold text-on-surface">
                        {featured
                          ? `${featured.title}${featured.startsAt ? ` • ${formatEventCardWhen(featured.startsAt)}` : ""}`
                          : "New dates coming soon"}
                      </span>
                    </div>
                  </div>
                  <a
                    href={
                      featured ? `/events/${featured.slug}` : "#calendar-view"
                    }
                    className="flex flex-shrink-0 items-center justify-center rounded-lg bg-primary p-space-2xs text-on-primary hover:bg-primary-container"
                    aria-label={
                      featured ? `View ${featured.title}` : "Browse calendar"
                    }
                  >
                    <MaterialIcon name="arrow_forward" className="text-[18px]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <EventsBrowse events={events} />
        <EventsCalendar events={events} />

        {/* Archives */}
        <section
          id="archives"
          className="mb-space-3xl scroll-mt-24"
          aria-labelledby="archives-heading"
        >
          <div className="mb-space-md flex flex-col justify-between gap-space-xs md:flex-row md:items-end">
            <div>
              <span className="font-label text-label-eyebrow font-bold tracking-wider text-secondary uppercase">
                Community Highlights
              </span>
              <h2
                id="archives-heading"
                className="font-headline text-headline-lg font-bold text-on-surface"
              >
                Memories from Past Gatherings
              </h2>
              <p className="mt-1 font-body text-body-md text-text-secondary">
                A look back at the joyful moments, cultural showcases, and
                milestones we celebrated together.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-space-md md:grid-cols-3">
            {archives.map((item) => (
              <article
                key={item.title}
                className="flex flex-col overflow-hidden rounded-2xl bg-surface-card shadow-sm"
              >
                <div className="relative h-60 overflow-hidden bg-surface-container">
                  <CommunityPhoto credit={item.credit} />
                  <div className="absolute top-3 left-3 rounded-full bg-surface/90 px-space-xs py-1 font-label text-label-eyebrow font-bold text-primary uppercase shadow-sm backdrop-blur-sm">
                    {item.badge}
                  </div>
                </div>
                <div className="flex flex-grow flex-col gap-space-3xs p-space-md">
                  <span className="font-label text-label-eyebrow font-bold text-accent-warm-ochre uppercase">
                    {item.kicker}
                  </span>
                  <h3 className="font-headline text-headline-sm font-bold text-on-surface">
                    {item.title}
                  </h3>
                  <p className="font-body text-body-sm leading-relaxed text-text-secondary">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-space-2xl">
          <div className="relative overflow-hidden rounded-3xl bg-primary p-space-lg text-on-primary shadow-xl md:p-space-xl">
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-brand-mint/10 blur-3xl" />
            <div className="relative z-10 grid grid-cols-1 items-center gap-space-lg lg:grid-cols-12">
              <div className="flex flex-col gap-space-2xs lg:col-span-8">
                <div className="inline-flex w-fit items-center gap-space-3xs rounded-full bg-surface-tinted/10 px-space-xs py-1 font-label text-label-eyebrow font-bold text-brand-mint uppercase">
                  Get Involved
                </div>
                <h2 className="font-headline text-headline-xl font-bold tracking-tight text-on-primary">
                  Want to organize a meetup or volunteer at our next event?
                </h2>
                <p className="max-w-2xl font-body text-body-md text-surface-container-high/90">
                  Our events are powered by warm-hearted volunteers, local
                  sponsors, and passionate community builders. Whether you have
                  an idea for a business seminar, sports tournament, or kids
                  craft workshop, NCP is ready to support you.
                </p>
                <div className="flex items-center gap-space-sm pt-space-xs font-body text-body-sm text-brand-mint">
                  <span className="inline-flex items-center gap-1">
                    <MaterialIcon name="verified" className="text-[18px]" />
                    Direct Support from EXCO
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MaterialIcon name="group" className="text-[18px]" />
                    Access to Community Spaces
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-space-sm lg:col-span-4 lg:items-end">
                <Link
                  href="/get-involved"
                  className="inline-flex w-full items-center justify-center gap-space-3xs rounded-xl bg-brand-mint px-space-md py-space-xs font-label text-label-lg font-bold text-primary shadow-md transition-all hover:bg-primary-fixed lg:w-auto"
                >
                  <span>Volunteer with NCP</span>
                  <MaterialIcon name="volunteer_activism" className="text-[18px]" />
                </Link>
                <a
                  href={suggestMailto}
                  className="inline-flex w-full items-center justify-center gap-space-3xs rounded-xl bg-primary-container px-space-md py-space-xs font-label text-label-lg text-on-primary transition-all hover:bg-surface-tint lg:w-auto"
                >
                  <span>Propose a Gathering</span>
                  <MaterialIcon name="mail" className="text-[18px]" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
