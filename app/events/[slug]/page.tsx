import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { EventRsvpForm } from "@/components/EventRsvpForm";
import { MaterialIcon } from "@/components/MaterialIcon";
import { Reveal } from "@/components/Reveal";
import { ShareEventButton } from "@/components/ShareEventButton";
import { communityPhotos } from "@/data/pixabay-credits";
import { siteContact } from "@/data/site-contact";
import { getAppServices } from "@/lib/composition";
import type { EventSummary } from "@/lib/domain/content";
import {
  eventCategoryBadge,
  eventIcsDataUrl,
  formatEventDayChip,
  formatEventDetailDate,
  formatEventTimeRange,
  googleCalendarUrl,
  inferEventFilter,
} from "@/lib/format/event-ui";

type EventDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const programme = [
  {
    time: "18:30 – 19:00",
    tag: "30 mins",
    tagClass: "text-text-muted",
    title: "Arrival, Registration & Welcome Refreshments",
    body: "Check-in at the foyer desk, collect your welcome badge, and enjoy light Nigerian finger foods, tea, and soft drinks while finding a seat.",
    dotClass: "bg-brand-emerald",
  },
  {
    time: "19:00 – 19:30",
    tag: "Opening Session",
    tagClass: "text-brand-emerald font-semibold",
    title: "Welcome Address & About NCP",
    body: `Introduction by ${siteContact.contactName} (Community Co-ordinator) and executive team members outlining NCP's mission, welfare support, and upcoming initiatives.`,
    dotClass: "bg-primary",
  },
  {
    time: "19:30 – 20:00",
    tag: "Panel Discussion",
    tagClass: "text-accent-warm-ochre font-semibold",
    title: "Settling in Peterborough: Housing, NHS & Council Tips",
    body: "Practical guidance from resident elders covering school admissions, tenant rights, GP registration, public transit, and winter readiness in Cambridgeshire.",
    dotClass: "bg-primary",
  },
  {
    time: "20:00 – 21:00",
    tag: "Interactive Breakouts",
    tagClass: "text-primary font-semibold",
    title: "Peer Mentorship Circles & Open Networking",
    body: "Themed conversational clusters: 1) ARU Students & Academics, 2) NHS Doctors, Nurses & Allied Health, 3) Entrepreneurs & Tech, 4) Young Families & Parenting.",
    dotClass: "bg-primary",
  },
  {
    time: "21:00 – 21:30",
    tag: "Wrap Up",
    tagClass: "text-text-muted",
    title: "Announcements, Group Photo & Closing Blessing",
    body: "Preview of upcoming autumn football fixtures and family picnics, followed by our commemorative community photo and optional WhatsApp group onboarding.",
    dotClass: "bg-brand-mint",
    innerDotClass: "bg-primary",
  },
] as const;

const perks = [
  {
    icon: "menu_book",
    title: "Free Welcome Pack",
    body: "Take home our newly published Peterborough Guidebook containing vetted Nigerian grocery shops, barbers, solicitors, and faith centres.",
  },
  {
    icon: "bakery_dining",
    title: "Traditional Refreshments",
    body: "Taste of home: hot savoury snacks, fresh chin-chin, Nigerian meat pies, puff puff, soft beverages, and hot tea/coffee service.",
  },
  {
    icon: "child_care",
    title: "Family & Kids Friendly",
    body: "Dedicated quiet activity corner with colouring books and children's storybooks for parents attending with young children.",
  },
  {
    icon: "diversity_3",
    title: "Meet NCP Leadership",
    body: "Direct accessibility to the NCP Executive Committee (EXCO) for advice, volunteering pathways, and membership registration.",
  },
] as const;

function descriptionParagraphs(description: string): string[] {
  return description
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function heroCredit(event: EventSummary) {
  const filter = inferEventFilter(event.title, event.summary);
  if (filter === "sports") return communityPhotos.handsUnity;
  if (filter === "cultural") return communityPhotos.heritageCelebration;
  if (filter === "welcome") return communityPhotos.friendsOnBench;
  return communityPhotos.familyInPark;
}

function relatedCredit(event: EventSummary) {
  return heroCredit(event);
}

function hostInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

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
  const content = getAppServices().content;
  const event = await content.getEventBySlug(slug);
  if (!event) notFound();

  const upcoming = await content.listEvents({ upcomingOnly: true, limit: 12 });
  const related = upcoming.filter((item) => item.slug !== event.slug).slice(0, 2);

  const filter = inferEventFilter(event.title, event.summary);
  const badge = eventCategoryBadge(event.title, event.summary);
  const showWelcomeExtras = filter === "welcome";
  const dateLabel = formatEventDetailDate(event.startsAt);
  const timeLabel = formatEventTimeRange(event.startsAt, event.endsAt);
  const paragraphs = descriptionParagraphs(event.description);
  const hero = heroCredit(event);
  const mapsQuery = encodeURIComponent(
    event.venue ?? "Peterborough Central Library",
  );
  const gcal = googleCalendarUrl({
    title: event.title,
    startsAt: event.startsAt,
    endsAt: event.endsAt,
    venue: event.venue,
    details: event.summary ?? event.description.slice(0, 400),
  });
  const icsHref = eventIcsDataUrl({
    title: event.title,
    startsAt: event.startsAt,
    endsAt: event.endsAt,
    venue: event.venue,
    description: event.summary ?? event.description.slice(0, 400),
    uid: event.slug,
  });
  const whatsappShare = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Join ${event.title}${event.venue ? ` at ${event.venue}` : ""} — Nigerian Community Peterborough`,
  )}`;
  const logisticsMailto = `${siteContact.emailHref}?subject=${encodeURIComponent(
    `${event.title} — logistics inquiry`,
  )}`;
  const secondaryAudience =
    filter === "welcome"
      ? "Newcomers • NHS • ARU Students"
      : filter === "sports"
        ? "Youth • Families • Amateur Teams"
        : filter === "cultural"
          ? "Families • Culture • All Ages"
          : "Community • Open to All";

  return (
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <div className="flex w-full flex-col">
        <section className="w-full pt-space-md pb-space-xs">
          <div className="flex flex-col justify-between gap-space-xs sm:flex-row sm:items-center">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-space-2xs font-body text-body-sm text-text-muted"
            >
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <MaterialIcon name="chevron_right" className="text-[14px]" />
              <Link href="/events" className="transition-colors hover:text-primary">
                Events
              </Link>
              <MaterialIcon name="chevron_right" className="text-[14px]" />
              <span className="max-w-[200px] truncate font-semibold text-primary sm:max-w-none">
                {event.title}
              </span>
            </nav>
            <Link
              href="/events"
              className="group inline-flex items-center gap-space-3xs font-label text-label-md text-primary transition-colors hover:text-brand-emerald"
            >
              <MaterialIcon
                name="arrow_back"
                className="text-[18px] transition-transform group-hover:-translate-x-1"
              />
              <span>Back to All Events</span>
            </Link>
          </div>
        </section>

        <section className="w-full py-space-md">
          <div className="flex flex-col gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <div className="flex flex-wrap items-center gap-space-2xs">
                <span className="inline-flex items-center gap-space-3xs rounded-full bg-surface-tinted px-space-xs py-space-3xs font-label text-label-eyebrow tracking-wider text-primary uppercase shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-brand-emerald" />
                  {badge.label}
                </span>
                <span className="inline-flex items-center gap-space-3xs rounded-full bg-secondary-container px-space-xs py-space-3xs font-label text-label-md text-on-secondary-container">
                  <MaterialIcon name="groups" className="text-[16px]" />
                  {secondaryAudience}
                </span>
              </div>
              <h1 className="font-display text-display-lg-mobile leading-tight font-extrabold tracking-tight text-text-primary md:text-display-lg">
                {event.title}
              </h1>
              {event.summary ? (
                <p className="max-w-4xl font-body text-body-lg leading-relaxed text-text-secondary">
                  {event.summary}
                </p>
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-space-md rounded-xl bg-surface-card p-space-md shadow-sm sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-start gap-space-xs">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                  <MaterialIcon name="calendar_month" className="text-[22px]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-label text-label-eyebrow text-text-muted uppercase">
                    Date
                  </span>
                  <span className="font-label text-label-lg font-bold text-text-primary">
                    {dateLabel || "Date TBC"}
                  </span>
                  <span className="font-body text-body-sm text-text-muted">
                    {showWelcomeExtras ? "Autumn Orientation" : "Community gathering"}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-space-xs">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                  <MaterialIcon name="schedule" className="text-[22px]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-label text-label-eyebrow text-text-muted uppercase">
                    Time
                  </span>
                  <span className="font-label text-label-lg font-bold text-text-primary">
                    {timeLabel ? `${timeLabel} BST` : "Time TBC"}
                  </span>
                  {showWelcomeExtras ? (
                    <span className="font-body text-body-sm font-medium text-brand-emerald">
                      Doors open at 18:30
                    </span>
                  ) : (
                    <span className="font-body text-body-sm text-text-muted">
                      Europe/London
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-space-xs">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                  <MaterialIcon name="location_on" className="text-[22px]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-label text-label-eyebrow text-text-muted uppercase">
                    Venue
                  </span>
                  <span className="font-label text-label-lg font-bold text-text-primary">
                    {event.venue ?? "Peterborough"}
                  </span>
                  <span className="font-body text-body-sm text-text-muted">
                    Cambridgeshire
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-space-xs">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                  <MaterialIcon name="confirmation_number" className="text-[22px]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-label text-label-eyebrow text-text-muted uppercase">
                    Admission
                  </span>
                  <span className="font-label text-label-lg font-bold text-brand-emerald">
                    Free Entry
                  </span>
                  <span className="font-body text-body-sm text-text-muted">
                    RSVP Required (Capacity limits)
                  </span>
                </div>
              </div>
            </div>

            <div className="relative w-full overflow-hidden rounded-2xl bg-surface-container shadow-md">
              {event.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={event.imageUrl}
                  alt={event.imageAlt ?? event.title}
                  className="h-72 w-full object-cover object-center sm:h-96 md:h-[420px]"
                  width={1200}
                  height={420}
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <CommunityPhoto
                  credit={hero}
                  priority
                  className="h-72 w-full object-cover object-center sm:h-96 md:h-[420px]"
                  width={1200}
                  height={420}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <div className="absolute right-4 bottom-4 left-4 flex flex-wrap items-center justify-between gap-space-xs sm:right-6 sm:bottom-6 sm:left-6">
                <div className="flex items-center gap-space-2xs rounded-full bg-surface/90 px-space-xs py-space-3xs font-label text-label-md text-text-primary shadow-sm backdrop-blur-md">
                  <MaterialIcon name="place" className="text-[18px] text-primary" />
                  <span>
                    {event.venue
                      ? `${event.venue} • Community Hall`
                      : "Peterborough • Community Hall"}
                  </span>
                </div>
                <div className="hidden items-center gap-space-2xs rounded-full bg-primary/85 px-space-xs py-space-3xs font-label text-label-md text-on-primary backdrop-blur-md sm:flex">
                  <MaterialIcon name="verified" className="text-[18px] text-brand-mint" />
                  <span>Organised by Nigerian Community Peterborough (NCP)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-space-lg">
          <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
            <div className="flex flex-col gap-space-xl lg:col-span-8">
              <Reveal
                as="article"
                variant="up"
                className="flex flex-col gap-space-md rounded-2xl bg-surface-card p-space-lg shadow-sm md:p-space-xl"
              >
                <div className="flex items-center gap-space-2xs">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                    <MaterialIcon name="handshake" className="text-[20px]" />
                  </div>
                  <h2 className="font-headline text-headline-md font-bold text-text-primary">
                    About this Gathering
                  </h2>
                </div>
                <div className="flex flex-col gap-space-sm font-body text-body-md leading-relaxed text-text-secondary">
                  {paragraphs.length > 0 ? (
                    paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))
                  ) : (
                    <p>
                      Join {siteContact.organisation} for{" "}
                      <strong className="text-text-primary">{event.title}</strong>
                      {event.venue ? ` at ${event.venue}` : ""}. All community
                      members and newcomers are welcome.
                    </p>
                  )}
                </div>
                {showWelcomeExtras ? (
                  <div className="flex items-start gap-space-sm rounded-xl bg-surface-tinted p-space-md">
                    <MaterialIcon
                      name="info"
                      className="mt-0.5 shrink-0 text-[28px] text-primary"
                    />
                    <div className="flex flex-col gap-space-3xs font-body text-body-sm text-on-surface-variant">
                      <span className="font-headline text-headline-sm font-bold text-primary">
                        Who should attend?
                      </span>
                      <p>
                        Newly relocated Nigerian singles, couples, families with
                        children, university students, healthcare workers, and
                        long-standing Peterborough residents wishing to mentor or
                        welcome newcomers. Everyone is welcome.
                      </p>
                    </div>
                  </div>
                ) : null}
              </Reveal>

              {showWelcomeExtras ? (
                <Reveal
                  as="section"
                  variant="up"
                  className="flex flex-col gap-space-lg rounded-2xl bg-surface-card p-space-lg shadow-sm md:p-space-xl"
                >
                  <div className="flex flex-col justify-between gap-space-xs sm:flex-row sm:items-center">
                    <div className="flex items-center gap-space-2xs">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                        <MaterialIcon name="view_timeline" className="text-[20px]" />
                      </div>
                      <h2 className="font-headline text-headline-md font-bold text-text-primary">
                        Evening Programme
                      </h2>
                    </div>
                    <span className="w-fit rounded-full bg-surface-container px-space-xs py-1 font-label text-label-md text-text-muted">
                      Subject to minor timing flow
                    </span>
                  </div>
                  <div className="relative flex flex-col gap-space-md pl-4 sm:pl-6">
                    <div className="absolute top-3 bottom-3 left-2.5 w-0.5 bg-surface-container-high" />
                    {programme.map((step) => (
                      <div
                        key={step.time}
                        className="relative flex items-start gap-space-md"
                      >
                        <div
                          className={`relative z-10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-4 ring-surface-card ${step.dotClass}`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              "innerDotClass" in step && step.innerDotClass
                                ? step.innerDotClass
                                : "bg-surface-card"
                            }`}
                          />
                        </div>
                        <div className="flex flex-1 flex-col rounded-xl bg-surface-canvas p-space-md">
                          <div className="flex flex-wrap items-center justify-between gap-space-3xs">
                            <span className="font-label text-label-lg font-bold text-primary">
                              {step.time}
                            </span>
                            <span
                              className={`font-label text-label-eyebrow uppercase ${step.tagClass}`}
                            >
                              {step.tag}
                            </span>
                          </div>
                          <h3 className="mt-1 font-headline text-headline-sm font-semibold text-text-primary">
                            {step.title}
                          </h3>
                          <p className="mt-1 font-body text-body-sm text-text-secondary">
                            {step.body}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ) : null}

              {showWelcomeExtras ? (
                <Reveal as="section" variant="up" className="flex flex-col gap-space-md">
                  <div className="flex items-center gap-space-2xs">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                      <MaterialIcon
                        name="featured_seasonal_and_gifts"
                        className="text-[20px]"
                      />
                    </div>
                    <h2 className="font-headline text-headline-md font-bold text-text-primary">
                      What to Expect
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                    {perks.map((perk) => (
                      <div
                        key={perk.title}
                        className="flex flex-col gap-space-2xs rounded-xl bg-surface-card p-space-md shadow-sm transition-shadow hover:shadow-md"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                          <MaterialIcon name={perk.icon} className="text-[22px]" />
                        </div>
                        <h3 className="font-headline text-headline-sm font-semibold text-text-primary">
                          {perk.title}
                        </h3>
                        <p className="font-body text-body-sm text-text-secondary">
                          {perk.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ) : null}

              <Reveal
                as="section"
                variant="up"
                className="flex flex-col gap-space-md rounded-2xl bg-surface-card p-space-lg shadow-sm md:p-space-xl"
              >
                <div className="flex items-center gap-space-2xs">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                    <MaterialIcon name="map" className="text-[20px]" />
                  </div>
                  <h2 className="font-headline text-headline-md font-bold text-text-primary">
                    Venue &amp; Accessibility
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
                  <div className="flex flex-col gap-space-sm font-body text-body-sm text-text-secondary">
                    <div>
                      <span className="block font-headline text-headline-sm font-bold text-text-primary">
                        {event.venue ?? "Peterborough Central Library"}
                      </span>
                      <span className="text-text-muted">
                        Peterborough, Cambridgeshire, United Kingdom
                      </span>
                    </div>
                    <ul className="flex flex-col gap-space-2xs">
                      <li className="flex items-start gap-space-2xs">
                        <MaterialIcon
                          name="accessible"
                          className="mt-0.5 shrink-0 text-[18px] text-brand-emerald"
                        />
                        <span>
                          Step-free access where venues allow; contact EXCO ahead
                          if you need specific arrangements.
                        </span>
                      </li>
                      <li className="flex items-start gap-space-2xs">
                        <MaterialIcon
                          name="directions_car"
                          className="mt-0.5 shrink-0 text-[18px] text-brand-emerald"
                        />
                        <span>
                          Local parking and public transport options vary by venue
                          — ask the host if you need directions.
                        </span>
                      </li>
                      <li className="flex items-start gap-space-2xs">
                        <MaterialIcon
                          name="view_compact"
                          className="mt-0.5 shrink-0 text-[18px] text-brand-emerald"
                        />
                        <span>
                          Central Peterborough venues are typically a short walk
                          from the railway and bus stations.
                        </span>
                      </li>
                    </ul>
                    <div className="pt-space-2xs">
                      <a
                        className="inline-flex items-center gap-space-3xs font-label text-label-md text-primary hover:underline"
                        href={`https://maps.google.com/?q=${mapsQuery}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span>Open in Google Maps</span>
                        <MaterialIcon name="open_in_new" className="text-[16px]" />
                      </a>
                    </div>
                  </div>
                  <div className="relative h-56 w-full overflow-hidden rounded-xl bg-surface-container shadow-inner">
                    <CommunityPhoto
                      credit={communityPhotos.ukStreetMarket}
                      className="h-full w-full object-cover"
                      width={640}
                      height={360}
                    />
                    <div className="absolute inset-0 bg-primary/10" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-surface/95 px-space-xs py-1 font-label text-label-md text-text-primary shadow backdrop-blur">
                      <MaterialIcon name="pin_drop" className="text-[16px] text-primary" />
                      <span>Central Peterborough</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <aside className="sticky top-24 flex flex-col gap-space-lg lg:col-span-4">
              <div
                id="rsvp-container"
                className="flex flex-col gap-space-md rounded-2xl bg-surface-card p-space-lg shadow-lg"
              >
                <div className="flex items-center justify-between border-b border-border-subtle pb-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-mint opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-emerald" />
                    </span>
                    <span className="font-label text-label-eyebrow font-bold text-brand-emerald uppercase">
                      Registration Open
                    </span>
                  </div>
                  <span className="font-label text-label-md text-text-muted">
                    Limited spots
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-display text-headline-xl font-extrabold text-primary">
                      Free
                    </span>
                    <span className="ml-1 font-body text-body-sm text-text-muted">
                      / Attendee
                    </span>
                  </div>
                  <span className="rounded-md bg-surface-tinted px-space-2xs py-0.5 font-label text-label-md text-primary">
                    RSVP required
                  </span>
                </div>

                <EventRsvpForm eventTitle={event.title} />

                <div className="flex flex-col gap-space-2xs border-t border-border-subtle pt-space-xs">
                  <span className="font-label text-label-eyebrow text-text-muted uppercase">
                    Add to your calendar
                  </span>
                  <div className="grid grid-cols-2 gap-space-2xs">
                    <a
                      className="flex items-center justify-center gap-1 rounded-md bg-surface-stone px-space-xs py-1.5 text-center font-label text-label-md text-text-primary transition-colors hover:bg-surface-tinted"
                      href={gcal}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <MaterialIcon name="event" className="text-[16px]" />
                      <span>Google</span>
                    </a>
                    <a
                      className="flex items-center justify-center gap-1 rounded-md bg-surface-stone px-space-xs py-1.5 text-center font-label text-label-md text-text-primary transition-colors hover:bg-surface-tinted"
                      href={icsHref}
                      download={`${event.slug}.ics`}
                    >
                      <MaterialIcon name="download" className="text-[16px]" />
                      <span>Apple / iCal</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border-subtle pt-space-xs">
                  <span className="font-body text-body-sm text-text-muted">
                    Share gathering:
                  </span>
                  <div className="flex items-center gap-space-2xs">
                    <a
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container text-primary transition-colors hover:bg-brand-mint/30"
                      href={whatsappShare}
                      rel="noopener noreferrer"
                      target="_blank"
                      title="Share on WhatsApp"
                    >
                      <MaterialIcon name="forum" className="text-[18px]" />
                    </a>
                    <ShareEventButton title={event.title} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-space-sm rounded-2xl bg-surface-card p-space-md shadow-sm">
                <span className="font-label text-label-eyebrow text-text-muted uppercase">
                  Gathering Host
                </span>
                <div className="flex items-center gap-space-xs">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-headline text-lg font-bold text-on-primary">
                    {hostInitials(siteContact.contactName)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label text-label-lg font-bold text-text-primary">
                      {siteContact.contactName}
                    </span>
                    <span className="font-body text-body-sm text-text-muted">
                      NCP Community Lead &amp; Welcoming EXCO
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-space-2xs pt-space-2xs font-body text-body-sm text-text-secondary">
                  <a
                    className="flex items-center gap-space-2xs transition-colors hover:text-primary"
                    href={siteContact.emailHref}
                  >
                    <MaterialIcon name="mail" className="text-[18px] text-primary" />
                    <span className="truncate">{siteContact.email}</span>
                  </a>
                  <a
                    className="flex items-center gap-space-2xs transition-colors hover:text-primary"
                    href={siteContact.phoneHref}
                  >
                    <MaterialIcon name="phone" className="text-[18px] text-primary" />
                    <span>{siteContact.phoneDisplay}</span>
                  </a>
                  <Link
                    className="flex items-center gap-space-2xs pt-1 font-semibold text-brand-emerald hover:underline"
                    href="/get-involved"
                  >
                    <MaterialIcon name="chat" className="text-[18px]" />
                    <span>Ask a question via Get Involved</span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {related.length > 0 ? (
          <section className="w-full pt-space-xl pb-space-lg">
            <div className="flex flex-col gap-space-lg">
              <div className="flex flex-col justify-between gap-space-xs sm:flex-row sm:items-end">
                <div>
                  <span className="font-label text-label-eyebrow font-bold tracking-wider text-primary uppercase">
                    Peterborough Calendar
                  </span>
                  <h2 className="font-headline text-headline-xl-mobile font-bold text-text-primary md:text-headline-xl">
                    More Upcoming Community Gatherings
                  </h2>
                </div>
                <Link
                  href="/events"
                  className="inline-flex items-center gap-1 font-label text-label-lg text-primary transition-colors hover:text-brand-emerald"
                >
                  <span>View All Events</span>
                  <MaterialIcon name="arrow_forward" className="text-[18px]" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2">
                {related.map((item) => {
                  const itemBadge = eventCategoryBadge(item.title, item.summary);
                  const chip = formatEventDayChip(item.startsAt);
                  const credit = relatedCredit(item);
                  return (
                    <article
                      key={item.id}
                      className="group flex flex-col overflow-hidden rounded-2xl bg-surface-card shadow-sm transition-all hover:shadow-md sm:flex-row"
                    >
                      <div className="relative h-48 overflow-hidden bg-surface-container sm:h-auto sm:w-2/5">
                        {item.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.imageUrl}
                            alt={item.imageAlt ?? item.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            width={400}
                            height={280}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <CommunityPhoto
                            credit={credit}
                            className="transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
                        {chip ? (
                          <span className="absolute top-3 left-3 rounded bg-primary px-space-2xs py-1 font-label text-label-eyebrow text-on-primary">
                            {chip}
                          </span>
                        ) : null}
                      </div>
                      <div className="flex flex-col justify-between gap-space-xs p-space-md sm:w-3/5">
                        <div className="flex flex-col gap-space-3xs">
                          <span
                            className={`font-label text-label-eyebrow font-bold uppercase ${
                              inferEventFilter(item.title, item.summary) ===
                              "sports"
                                ? "text-brand-emerald"
                                : "text-accent-warm-ochre"
                            }`}
                          >
                            {itemBadge.label}
                          </span>
                          <h3 className="font-headline text-headline-sm font-bold text-text-primary transition-colors group-hover:text-primary">
                            {item.title}
                          </h3>
                          {item.summary ? (
                            <p className="line-clamp-2 font-body text-body-sm text-text-secondary">
                              {item.summary}
                            </p>
                          ) : null}
                        </div>
                        <div className="flex items-center justify-between pt-space-xs font-body text-body-sm text-text-muted">
                          <span className="flex items-center gap-1">
                            <MaterialIcon name="place" className="text-[16px]" />
                            {item.venue ?? "Peterborough"}
                          </span>
                          <Link
                            href={`/events/${item.slug}`}
                            className="font-label text-label-md font-bold text-primary hover:underline"
                          >
                            Details →
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        <section className="my-space-lg w-full">
          <div className="flex flex-col items-center justify-between gap-space-md rounded-2xl bg-surface-stone p-space-lg sm:flex-row md:p-space-xl">
            <div className="flex items-center gap-space-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary">
                <MaterialIcon name="support_agent" className="text-[26px]" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline text-headline-sm font-bold text-text-primary">
                  Need transportation assistance or have special dietary needs?
                </h3>
                <p className="font-body text-body-sm text-text-secondary">
                  Our welfare and logistics team arranges carpools from ARU campus
                  and Bretton for elders and students.
                </p>
              </div>
            </div>
            <a
              className="shrink-0 rounded-lg bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary shadow-sm transition-colors hover:bg-surface-tinted"
              href={logisticsMailto}
            >
              Contact Logistics Team
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
