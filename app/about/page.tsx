import type { Metadata } from "next";
import Link from "next/link";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { MaterialIcon } from "@/components/MaterialIcon";
import { Reveal } from "@/components/Reveal";
import { communityPhotos } from "@/data/pixabay-credits";
import { siteContact } from "@/data/site-contact";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Nigerian Community Peterborough is — mission, pillars, and how to reach Theresa and the EXCO line.",
};

export default function AboutPage() {
  return (
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <div className="flex w-full flex-col">
        {/* Hero */}
        <section className="relative mt-space-md mb-space-2xl w-full overflow-hidden rounded-3xl bg-primary text-on-primary shadow-xl">
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-emerald/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-brand-mint/10 blur-2xl" />
          <div className="relative z-10 grid grid-cols-1 items-center gap-space-xl p-space-lg md:p-space-2xl lg:grid-cols-12 lg:p-space-3xl">
            <div className="flex flex-col gap-space-md lg:col-span-6">
              <div className="inline-flex w-fit items-center gap-space-2xs rounded-full bg-primary-container px-space-xs py-space-3xs font-label text-label-eyebrow tracking-widest text-brand-mint uppercase shadow-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand-mint" />
                <span>Who We Are</span>
              </div>
              <h1 className="font-display text-display-lg-mobile leading-tight font-extrabold tracking-tight text-on-primary md:text-display-lg">
                About <span className="text-brand-mint">NCP</span>
              </h1>
              <p className="max-w-xl font-body text-body-lg leading-relaxed text-surface-container-low">
                Nigerian Community Peterborough is a home for Nigerian families
                and friends in Peterborough and beyond — a place to belong, stay
                informed, and take part.
              </p>
              <div className="grid grid-cols-3 gap-space-xs pt-space-xs">
                <div className="rounded-xl bg-primary-container/70 p-space-xs backdrop-blur-sm">
                  <span className="block font-headline text-headline-sm font-bold text-brand-mint">
                    100%
                  </span>
                  <span className="font-body text-body-sm leading-snug text-surface-container-high">
                    Volunteer Run
                  </span>
                </div>
                <div className="rounded-xl bg-primary-container/70 p-space-xs backdrop-blur-sm">
                  <span className="block font-headline text-headline-sm font-bold text-accent-gold">
                    PE1–PE7
                  </span>
                  <span className="font-body text-body-sm leading-snug text-surface-container-high">
                    Peterborough &amp; Cambs
                  </span>
                </div>
                <div className="rounded-xl bg-primary-container/70 p-space-xs backdrop-blur-sm">
                  <span className="block font-headline text-headline-sm font-bold text-on-primary">
                    Family
                  </span>
                  <span className="font-body text-body-sm leading-snug text-surface-container-high">
                    First Community
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-space-sm pt-space-2xs">
                <Link
                  href="/get-involved"
                  className="inline-flex items-center gap-space-2xs rounded-lg bg-brand-mint px-space-md py-space-xs font-label text-label-lg text-primary shadow-md transition-all hover:bg-primary-fixed"
                >
                  <span>Join Our Journey</span>
                  <MaterialIcon name="arrow_forward" className="text-[18px]" />
                </Link>
                <a
                  href="#mission"
                  className="inline-flex items-center gap-space-3xs py-space-xs font-label text-label-lg text-surface-container-high transition-colors hover:text-brand-mint"
                >
                  <span>Explore Mission</span>
                  <MaterialIcon name="south" className="text-[18px]" />
                </a>
              </div>
            </div>

            <div className="relative lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-primary-container shadow-2xl">
                <CommunityPhoto
                  credit={communityPhotos.familyInPark}
                  priority
                  className="transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                <div className="absolute right-space-md bottom-space-md left-space-md flex items-center justify-between rounded-xl bg-surface-card/90 p-space-xs text-on-surface shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-space-xs">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                      <MaterialIcon name="diversity_3" className="text-[22px]" />
                    </div>
                    <div>
                      <span className="block font-label text-label-md font-bold text-primary">
                        Peterborough Community
                      </span>
                      <span className="font-body text-body-sm text-text-secondary">
                        Rooted in heritage, growing together
                      </span>
                    </div>
                  </div>
                  <MaterialIcon
                    name="check_circle"
                    className="text-brand-emerald"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -left-4 hidden items-center gap-space-3xs rounded-full bg-accent-gold px-space-sm py-space-3xs font-label text-label-eyebrow tracking-wider text-on-primary uppercase shadow-lg sm:flex">
                <MaterialIcon name="wb_sunny" className="text-[16px]" />
                <span>A Place to Belong</span>
              </div>
            </div>
          </div>
        </section>

        {/* Identity */}
        <Reveal as="section" className="mb-space-3xl w-full" variant="up">
          <div className="flex flex-col items-center justify-between gap-space-lg rounded-2xl bg-surface-stone p-space-lg shadow-sm md:flex-row md:p-space-xl">
            <div className="max-w-2xl">
              <span className="mb-space-3xs block font-label text-label-eyebrow tracking-widest text-secondary uppercase">
                Our Identity &amp; Promise
              </span>
              <h2 className="font-headline text-headline-lg font-bold tracking-tight text-primary">
                Not a brochure, but an open table for every Nigerian home.
              </h2>
              <p className="mt-space-2xs font-body text-body-md leading-relaxed text-text-secondary">
                From newly arriving international students at ARU Peterborough
                to multi-generational residents, professionals, and entrepreneurs
                across Cambridgeshire, NCP creates genuine shared ground.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-space-2xs sm:flex-row md:w-auto md:flex-col">
              {[
                { color: "bg-brand-emerald", label: "Regular townhalls & picnics" },
                {
                  color: "bg-accent-gold",
                  label: "Verified welfare support network",
                },
                {
                  color: "bg-brand-mint",
                  label: "Youth & family mentorship",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-space-xs rounded-xl bg-surface-card px-space-sm p-space-xs shadow-sm"
                >
                  <span className={`h-3 w-3 rounded-full ${item.color}`} />
                  <span className="font-label text-label-md text-on-surface">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Mission */}
        <section
          id="mission"
          className="mb-space-3xl w-full scroll-mt-24"
          aria-labelledby="mission-heading"
        >
          <div className="mb-space-xl flex flex-col justify-between gap-space-sm md:flex-row md:items-end">
            <div>
              <div className="mb-space-3xs inline-flex items-center gap-space-3xs font-label text-label-eyebrow tracking-widest text-secondary uppercase">
                <MaterialIcon
                  name="flag"
                  className="text-[16px] text-brand-emerald"
                />
                <span>Core Intentions</span>
              </div>
              <h2
                id="mission-heading"
                className="font-headline text-headline-xl font-extrabold tracking-tight text-primary"
              >
                Our Mission
              </h2>
            </div>
            <p className="max-w-md font-body text-body-md text-text-secondary">
              Guiding principles that steer our service to every family, student,
              and individual in our growing region.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-space-lg md:grid-cols-3">
            {[
              {
                n: "01",
                title: "Connect",
                body: "Bring people together — families, friends, and neighbours who want a community they can recognise and rely on in times of both celebration and need.",
                bar: "bg-brand-emerald",
                icon: "groups",
                iconClass: "text-primary",
                footIcon: "verified",
                foot: "Family networks & social circles",
                footClass: "text-secondary",
              },
              {
                n: "02",
                title: "Inform",
                body: "Share what is happening clearly, so nobody has to rely on a forwarded message to know where they stand with immigration policies, schools, healthcare, and council initiatives.",
                bar: "bg-accent-gold",
                icon: "campaign",
                iconClass: "text-accent-warm-ochre",
                footIcon: "newspaper",
                foot: "Verified guidance & clear channels",
                footClass: "text-accent-warm-ochre",
              },
              {
                n: "03",
                title: "Engage",
                body: "Make it easy to join in — as a member, a volunteer, or someone who simply wants to stay close and contribute their skills to community growth.",
                bar: "bg-brand-mint",
                icon: "volunteer_activism",
                iconClass: "text-secondary",
                footIcon: "handshake",
                foot: "Accessible volunteering & events",
                footClass: "text-secondary",
              },
            ].map((card, i) => (
              <Reveal
                as="article"
                key={card.title}
                delay={i * 100}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-surface-card p-space-lg shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className={`absolute top-0 right-0 left-0 h-1.5 ${card.bar}`} />
                <div>
                  <div className="mb-space-md flex items-center justify-between">
                    <span className="font-display text-headline-xl font-extrabold text-outline-variant transition-colors group-hover:text-primary">
                      {card.n}
                    </span>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-surface-tinted transition-transform group-hover:scale-110 ${card.iconClass}`}
                    >
                      <MaterialIcon name={card.icon} className="text-[26px]" />
                    </div>
                  </div>
                  <h3 className="mb-space-2xs font-headline text-headline-md font-bold text-primary">
                    {card.title}
                  </h3>
                  <p className="font-body text-body-md leading-relaxed text-text-secondary">
                    {card.body}
                  </p>
                </div>
                <div
                  className={`mt-space-lg flex items-center gap-space-2xs pt-space-xs font-label text-label-md ${card.footClass}`}
                >
                  <MaterialIcon name={card.footIcon} className="text-[18px]" />
                  <span>{card.foot}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Pillars */}
        <Reveal as="section" className="mb-space-3xl w-full" variant="up">
          <div className="rounded-3xl bg-surface-canvas p-space-lg shadow-sm md:p-space-2xl">
            <div className="mb-space-xl max-w-2xl">
              <span className="mb-space-3xs block font-label text-label-eyebrow font-bold tracking-widest text-brand-emerald uppercase">
                How We Show Up
              </span>
              <h2 className="font-headline text-headline-xl font-extrabold tracking-tight text-primary">
                Community, culture, connection
              </h2>
              <p className="mt-space-2xs font-body text-body-lg text-text-secondary">
                The three pillars that shape our townhalls, Independence Day
                gatherings, youth mentoring, and daily interactions.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-space-lg md:grid-cols-3">
              {[
                {
                  label: "Pillar 01",
                  labelClass: "text-brand-emerald",
                  icon: "diversity_1",
                  iconWrap: "bg-secondary-container text-on-secondary-container",
                  title: "Community",
                  body: "Building together in Peterborough — a place to belong, not a brochure. We foster real human touchpoints, welcoming new families off the train or plane and creating rooted local stability.",
                  footIcon: "home_pin",
                  footIconClass: "text-brand-emerald",
                  foot: "Local meetups across Peterborough",
                },
                {
                  label: "Pillar 02",
                  labelClass: "text-accent-warm-ochre",
                  icon: "festival",
                  iconWrap: "bg-tertiary-fixed text-on-tertiary-fixed",
                  title: "Culture",
                  body: "Celebrating heritage — language, food, faith, and the stories we carry. Passing Nigerian traditions, crafts, and values down to our British-born children with pride and creative vibrancy.",
                  footIcon: "celebration",
                  footIconClass: "text-accent-warm-ochre",
                  foot: "Cultural exhibitions & youth arts",
                },
                {
                  label: "Pillar 03",
                  labelClass: "text-secondary",
                  icon: "all_inclusive",
                  iconWrap: "bg-surface-tinted text-primary",
                  title: "Connection",
                  body: "Stronger together — families, friends, and neighbours looking out for each other. Peer advice, career guidance, newcomer acclimatisation, and mutual solidarity.",
                  footIcon: "hub",
                  footIconClass: "text-brand-emerald",
                  foot: "Professional & welfare solidarity",
                },
              ].map((pillar) => (
                <article
                  key={pillar.title}
                  className="flex flex-col justify-between rounded-2xl bg-surface-card p-space-lg shadow-sm transition-shadow hover:shadow-md"
                >
                  <div>
                    <div className="mb-space-md flex items-center justify-between">
                      <span
                        className={`font-label text-label-eyebrow font-bold tracking-widest uppercase ${pillar.labelClass}`}
                      >
                        {pillar.label}
                      </span>
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${pillar.iconWrap}`}
                      >
                        <MaterialIcon name={pillar.icon} className="text-[20px]" />
                      </div>
                    </div>
                    <h3 className="mb-space-2xs font-headline text-headline-md font-bold text-primary">
                      {pillar.title}
                    </h3>
                    <p className="font-body text-body-md leading-relaxed text-text-secondary">
                      {pillar.body}
                    </p>
                  </div>
                  <div className="mt-space-md flex items-center gap-space-2xs rounded-xl bg-surface-tinted p-space-xs pt-space-xs font-body text-body-sm text-primary">
                    <MaterialIcon
                      name={pillar.footIcon}
                      className={`text-[18px] ${pillar.footIconClass}`}
                    />
                    <span>{pillar.foot}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Photo mosaic */}
        <section className="mb-space-3xl w-full">
          <div className="grid grid-cols-1 items-center gap-space-md md:grid-cols-12">
            <div className="flex flex-col gap-space-xs md:col-span-5">
              <span className="font-label text-label-eyebrow font-bold tracking-widest text-brand-emerald uppercase">
                Community Life
              </span>
              <h3 className="font-headline text-headline-lg leading-snug font-bold text-primary">
                Rooted in Peterborough, celebrating Nigerian warmth.
              </h3>
              <p className="font-body text-body-md leading-relaxed text-text-secondary">
                Whether sharing jollof rice at our summer family barbecues,
                mentoring college students, or joining hands during civic
                heritage weeks, we are active contributors to the thriving fabric
                of Cambridgeshire.
              </p>
              <div className="pt-space-2xs">
                <div className="flex items-start gap-space-xs rounded-2xl bg-surface-tinted p-space-md text-primary">
                  <MaterialIcon
                    name="location_on"
                    className="mt-0.5 text-brand-emerald"
                  />
                  <div>
                    <span className="block font-label text-label-md font-bold">
                      Central Peterborough Hub
                    </span>
                    <span className="font-body text-body-sm text-text-secondary">
                      Community gatherings rotate across Central Park, Nene
                      Valley community centres, and local partnership halls.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-space-sm md:col-span-7">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-container shadow-md">
                <CommunityPhoto credit={communityPhotos.heritageCelebration} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                <span className="absolute bottom-space-xs left-space-xs rounded-md bg-primary/80 px-space-xs py-space-3xs font-label text-label-md text-on-primary backdrop-blur-sm">
                  Cultural Pride
                </span>
              </div>
              <div className="flex flex-col gap-space-sm">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-surface-container shadow-md">
                  <CommunityPhoto credit={communityPhotos.friendsOnBench} />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                  <span className="absolute bottom-space-xs left-space-xs rounded-md bg-primary/80 px-space-xs py-space-3xs font-label text-label-md text-on-primary backdrop-blur-sm">
                    Youth Mentorship
                  </span>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-surface-container shadow-md">
                  <CommunityPhoto credit={communityPhotos.womenTogether} />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                  <span className="absolute bottom-space-xs left-space-xs rounded-md bg-primary/80 px-space-xs py-space-3xs font-label text-label-md text-on-primary backdrop-blur-sm">
                    Family Gatherings
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section
          className="mb-space-3xl w-full"
          aria-labelledby="about-contact-heading"
        >
          <div className="rounded-3xl bg-surface-stone p-space-lg shadow-sm md:p-space-2xl">
            <div className="grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
              <div className="flex flex-col gap-space-xs lg:col-span-6">
                <span className="font-label text-label-eyebrow font-bold tracking-widest text-secondary uppercase">
                  Leadership &amp; Direct Support
                </span>
                <h2
                  id="about-contact-heading"
                  className="font-headline text-headline-lg font-bold tracking-tight text-primary"
                >
                  Here when you need guidance, answers, or a hand.
                </h2>
                <p className="font-body text-body-md leading-relaxed text-text-secondary">
                  Our Executive Committee (EXCO) volunteers are dedicated to
                  transparent governance, immediate support for emergencies, and
                  direct answers for families moving into the Peterborough area.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2 lg:col-span-6">
                <div className="flex flex-col justify-between rounded-2xl bg-surface-card p-space-md shadow-sm">
                  <div>
                    <div className="mb-space-xs flex h-10 w-10 items-center justify-center rounded-full bg-surface-tinted text-primary">
                      <MaterialIcon name="person_check" className="text-[20px]" />
                    </div>
                    <span className="block font-label text-label-md tracking-wider text-text-muted uppercase">
                      Leadership Outreach
                    </span>
                    <span className="mt-space-3xs block font-headline text-headline-sm font-bold text-primary">
                      {siteContact.contactName}
                    </span>
                    <p className="mt-space-3xs font-body text-body-sm text-text-secondary">
                      Community Co-ordinator &amp; EXCO Member
                    </p>
                  </div>
                  <a
                    className="mt-space-md inline-flex items-center gap-space-3xs font-label text-label-md text-brand-emerald hover:underline"
                    href={siteContact.emailHref}
                  >
                    <MaterialIcon name="mail" className="text-[16px]" />
                    <span className="truncate">{siteContact.email}</span>
                  </a>
                </div>
                <div className="flex flex-col justify-between rounded-2xl bg-surface-card p-space-md shadow-sm">
                  <div>
                    <div className="mb-space-xs flex h-10 w-10 items-center justify-center rounded-full bg-surface-tinted text-primary">
                      <MaterialIcon name="phone_in_talk" className="text-[20px]" />
                    </div>
                    <span className="block font-label text-label-md tracking-wider text-text-muted uppercase">
                      Official Inquiries
                    </span>
                    <span className="mt-space-3xs block font-headline text-headline-sm font-bold text-primary">
                      EXCO Line
                    </span>
                    <p className="mt-space-3xs font-body text-body-sm text-text-secondary">
                      Phone &amp; WhatsApp direct lines for urgent welfare and
                      inquiries.
                    </p>
                  </div>
                  <a
                    className="mt-space-md inline-flex items-center gap-space-3xs font-headline text-headline-sm font-bold text-primary transition-colors hover:text-brand-emerald"
                    href={siteContact.phoneHref}
                  >
                    <MaterialIcon
                      name="call"
                      className="text-[18px] text-brand-emerald"
                    />
                    <span>{siteContact.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-space-2xl w-full">
          <div className="relative overflow-hidden rounded-3xl bg-primary-container p-space-lg text-on-primary shadow-xl md:p-space-2xl">
            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-brand-mint/15 blur-3xl" />
            <div className="relative z-10 flex flex-col items-start justify-between gap-space-xl md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="mb-space-xs inline-flex items-center gap-space-3xs rounded-full bg-primary px-space-xs py-space-3xs font-label text-label-eyebrow tracking-widest text-brand-mint uppercase shadow-sm">
                  <MaterialIcon
                    name="volunteer_activism"
                    className="text-[14px]"
                  />
                  <span>Next Step</span>
                </div>
                <h2 className="font-display text-headline-xl-mobile font-extrabold tracking-tight text-on-primary md:text-headline-xl">
                  Come and take part
                </h2>
                <p className="mt-space-2xs font-body text-body-lg leading-relaxed text-on-primary-container">
                  Whether you just moved to Peterborough this week or have called
                  Cambridgeshire home for decades, there is a warm seat waiting
                  for you. Get involved today.
                </p>
              </div>
              <div className="flex w-full shrink-0 flex-col items-stretch gap-space-sm sm:flex-row sm:items-center md:w-auto">
                <Link
                  href="/get-involved"
                  className="inline-flex items-center justify-center gap-space-2xs rounded-xl bg-brand-mint px-space-xl py-space-sm font-label text-label-lg text-primary shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary-fixed"
                >
                  <span>Get involved</span>
                  <MaterialIcon name="arrow_forward" className="text-[18px]" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-space-2xs rounded-xl bg-surface-card px-space-lg py-space-sm font-label text-label-lg text-primary shadow-sm transition-all hover:bg-surface-tinted"
                >
                  Register Free
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
