import type { Metadata } from "next";
import Link from "next/link";
import { AdirePattern, BridgeArc } from "@/components/DiasporaArt";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { HeroCarousel, type HeroSlide } from "@/components/HeroCarousel";
import { Parallax } from "@/components/Parallax";
import { Pillars } from "@/components/Pillars";
import { Reveal } from "@/components/Reveal";
import { communityPhotos } from "@/data/pixabay-credits";

export const metadata: Metadata = {
  title: "Home 4",
  robots: { index: false, follow: false },
};

const heroSlides: HeroSlide[] = [
  {
    id: "belonging",
    kicker: "Nigerian Community Peterborough",
    title: "Together we grow stronger",
    lead: "Uniting Nigerian families and friends in Peterborough and beyond. A digital home to connect, inform, and engage — here, and with the places we still call home.",
    cta: { label: "About us", href: "/about" },
    photo: communityPhotos.friendsOnBench,
  },
  {
    id: "unity",
    kicker: "Show up for each other",
    title: "Many hands. One home.",
    lead: "From new arrivals to long-settled families, NCP is where we stack our strength — events, support, and neighbours who already understand the journey.",
    cta: { label: "Get involved", href: "/get-involved" },
    photo: communityPhotos.handsUnity,
  },
  {
    id: "culture",
    kicker: "Culture we keep close",
    title: "The table still gathers us",
    lead: "Jollof on a Sunday, stories in the kitchen, and the taste of home in Peterborough. This is how we remember who we are — and share it with the next generation.",
    cta: { label: "Join the community", href: "/get-involved" },
    photo: communityPhotos.jollofPlate,
  },
];

export default function HomeFourPage() {
  return (
    <main id="main" className="flex w-full flex-col bg-surface">
      <section className="relative" aria-labelledby="hero-heading">
        <HeroCarousel slides={heroSlides} />
      </section>

      <section
        className="mx-auto w-full max-w-container-max px-gutter-mobile py-space-2xl md:px-gutter-desktop"
        aria-labelledby="pillars-heading"
      >
        <h2 id="pillars-heading" className="sr-only">
          Our pillars
        </h2>
        <Pillars />
      </section>

      <Reveal
        as="section"
        className="mx-auto w-full max-w-container-max px-gutter-mobile pb-space-2xl md:px-gutter-desktop"
        variant="up"
      >
        <div className="grid gap-space-lg rounded-2xl border border-border-subtle bg-surface-card p-space-lg shadow-sm md:grid-cols-2 md:p-space-xl">
          <h2 className="font-headline text-headline-lg font-bold text-primary">
            Our digital home
          </h2>
          <div>
            <p className="font-body text-body-lg text-text-secondary">
              NCP exists to connect, inform, and engage our community. This
              site is where we show who we are and where we are going — for
              members, neighbours, and anyone looking for a place to belong
              between Nigeria and Peterborough.
            </p>
            <Link
              className="mt-space-md inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
              href="/get-involved"
            >
              Get involved
            </Link>
          </div>
        </div>
      </Reveal>

      <section
        className="bg-surface-stone py-space-2xl"
        aria-labelledby="corridor-heading"
      >
        <div className="mx-auto w-full max-w-container-max px-gutter-mobile md:px-gutter-desktop">
          <Reveal>
            <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
              Diaspora
            </p>
            <h2
              id="corridor-heading"
              className="mt-space-2xs font-headline text-headline-lg font-bold text-primary"
            >
              Two homes. One people.
            </h2>
            <p className="mt-space-sm max-w-2xl font-body text-body-lg text-text-secondary">
              We carry Lagos traffic in our stories and Peterborough weather in
              our coats. The work of NCP is to hold both — so nobody has to
              choose which version of themselves to bring into the room.
            </p>
          </Reveal>

          <div className="mt-space-xl grid items-center gap-space-lg md:grid-cols-[1fr_auto_1fr]">
            <Reveal as="article" className="flex flex-col gap-space-sm" variant="left">
              <div className="overflow-hidden rounded-2xl shadow-card">
                <Parallax factor={0.06}>
                  <div className="aspect-[4/3]">
                    <CommunityPhoto credit={communityPhotos.heritageCelebration} />
                  </div>
                </Parallax>
              </div>
              <h3 className="font-headline text-headline-sm font-bold text-primary">
                Where we are from
              </h3>
              <p className="font-body text-body-md text-text-secondary">
                Names, food, faith, and the particular way an aunty greets you.
                The rivers still meet. The sun is still bright.
              </p>
            </Reveal>

            <Reveal className="flex flex-col items-center gap-space-2xs text-center" variant="scale" delay={120}>
              <BridgeArc />
              <p className="font-label text-label-md text-text-muted">
                Nigeria to Peterborough
              </p>
            </Reveal>

            <Reveal as="article" className="flex flex-col gap-space-sm" variant="right" delay={80}>
              <div className="overflow-hidden rounded-2xl shadow-card">
                <Parallax factor={0.06}>
                  <div className="aspect-[4/3]">
                    <CommunityPhoto credit={communityPhotos.ukStreetMarket} />
                  </div>
                </Parallax>
              </div>
              <h3 className="font-headline text-headline-sm font-bold text-primary">
                Where we are now
              </h3>
              <p className="font-body text-body-md text-text-secondary">
                Cathedral city, school runs, night shifts, and a living room
                that still smells like pepper soup on a Sunday.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        className="bg-primary py-space-2xl text-on-primary"
        aria-labelledby="gather-heading"
      >
        <div className="mx-auto grid w-full max-w-container-max items-center gap-space-lg px-gutter-mobile md:grid-cols-2 md:px-gutter-desktop">
          <Reveal variant="clip" className="overflow-hidden rounded-2xl shadow-elevated">
            <div className="aspect-[4/3]">
              <CommunityPhoto credit={communityPhotos.womenTogether} />
            </div>
          </Reveal>
          <Reveal variant="right" delay={140}>
            <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-mint">
              Belonging
            </p>
            <h2
              id="gather-heading"
              className="mt-space-2xs font-headline text-headline-lg font-bold text-on-primary"
            >
              Find your people
            </h2>
            <p className="mt-space-sm font-body text-body-lg text-surface-container-low">
              Diaspora life can be quiet in the wrong way — skilled, busy, and
              still hungry for a room that already understands you. NCP is that
              room: cousins by choice, neighbours by postcode, family by how we
              show up.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="mx-auto w-full max-w-container-max px-gutter-mobile py-space-2xl md:px-gutter-desktop"
        aria-labelledby="moments-heading"
      >
        <Reveal>
          <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
            Everyday Naija, here
          </p>
          <h2
            id="moments-heading"
            className="mt-space-2xs font-headline text-headline-lg font-bold text-primary"
          >
            What we keep close
          </h2>
        </Reveal>

        <div className="mt-space-lg grid gap-space-md md:grid-cols-3">
          <Reveal as="article" className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-card shadow-sm" variant="clip">
            <div className="aspect-[4/3] overflow-hidden">
              <CommunityPhoto credit={communityPhotos.jollofPlate} />
            </div>
            <div className="p-space-md">
              <h3 className="font-headline text-headline-sm font-bold text-primary">
                The table
              </h3>
              <p className="mt-space-2xs font-body text-body-md text-text-secondary">
                Jollof, fried plantain, a cooler in the boot. The table is
                how we remember we are not guests in our own lives.
              </p>
            </div>
          </Reveal>

          <Reveal as="article" className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-card shadow-sm" variant="clip" delay={90}>
            <div className="aspect-[4/3] overflow-hidden">
              <CommunityPhoto credit={communityPhotos.familyInPark} />
            </div>
            <div className="p-space-md">
              <h3 className="font-headline text-headline-sm font-bold text-primary">
                The language
              </h3>
              <p className="mt-space-2xs font-body text-body-md text-text-secondary">
                Ilé. Ụlọ. Gida. Home. The first language your child hears
                should not have to wait until a trip to Nigeria.
              </p>
            </div>
          </Reveal>

          <Reveal as="article" className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-card shadow-sm" variant="clip" delay={40}>
            <div className="aspect-[4/3] overflow-hidden">
              <CommunityPhoto credit={communityPhotos.claspedHands} />
            </div>
            <div className="p-space-md">
              <h3 className="font-headline text-headline-sm font-bold text-primary">
                The welcome
              </h3>
              <p className="mt-space-2xs font-body text-body-md text-text-secondary">
                New in the city, new in the country, or just new to needing
                people. The door stays open.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal as="section" className="relative overflow-hidden bg-primary py-space-2xl text-on-primary" variant="up">
        <div className="pointer-events-none absolute inset-0 text-brand-mint/10" aria-hidden="true">
          <AdirePattern className="h-full w-full" />
        </div>
        <div className="relative mx-auto w-full max-w-container-max px-gutter-mobile md:px-gutter-desktop">
          <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-mint">
            A voice from the room
          </p>
          <blockquote className="mt-space-md max-w-3xl">
            <p className="font-headline text-headline-md font-bold text-on-primary md:text-headline-lg">
              Home is the people who still call your name the way they did in
              Nigeria — even when the postcode has changed.
            </p>
          </blockquote>
        </div>
      </Reveal>

      <Reveal as="section" className="bg-primary-container py-space-xl text-on-primary">
        <div className="mx-auto flex w-full max-w-container-max flex-wrap items-center justify-between gap-space-md px-gutter-mobile md:px-gutter-desktop">
          <div>
            <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-mint">
              Be part of it
            </p>
            <h2 className="mt-space-2xs font-headline text-headline-md font-bold text-on-primary">
              This community is built in person
            </h2>
          </div>
          <Link
            className="inline-flex items-center justify-center rounded-lg bg-brand-mint px-space-md py-space-xs font-label text-label-lg text-primary hover:bg-primary-fixed"
            href="/get-involved"
          >
            Get involved
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
