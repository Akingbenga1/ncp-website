import type { Metadata } from "next";
import Link from "next/link";
import { CommunityCarousel } from "@/components/CommunityCarousel";
import { Home2FeatureFlow } from "@/components/Home2FeatureFlow";
import { Reveal } from "@/components/Reveal";
import {
  communityPortraitSlides,
  ukLandscapeSlides,
} from "@/data/pixabay-credits";

export const metadata: Metadata = {
  title: {
    absolute: "Nigerian Community Peterborough",
  },
  description:
    "Nigerian Community Peterborough — connect, inform, and engage with Nigerian families and friends in Peterborough and beyond.",
};

const heroQuickLinks = [
  { href: "/donation", label: "Donation" },
  { href: "/events", label: "Events" },
  { href: "/get-involved", label: "Enquiries" },
] as const;

export default function HomePage() {
  return (
    <main id="main" className="flex w-full flex-col bg-surface">
      <section
        className="relative min-h-[85vh] overflow-hidden bg-primary text-on-primary"
        aria-labelledby="home2-heading"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <CommunityCarousel
            slides={[...ukLandscapeSlides]}
            className="h-full min-h-[85vh] rounded-none"
            fill
            intervalMs={7000}
            priorityFirst
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-primary/25" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[85vh] w-full max-w-container-max flex-col justify-end px-gutter-mobile pb-space-3xl pt-28 md:px-gutter-desktop">
          <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-mint">
            Nigerian Community Peterborough
          </p>
          <h1
            id="home2-heading"
            className="mt-space-2xs max-w-3xl font-display text-display-lg-mobile font-extrabold tracking-tight text-on-primary md:text-display-lg"
          >
            Peterborough &amp; beyond
          </h1>
          <p className="mt-space-sm max-w-xl font-body text-body-lg text-surface-container-low">
            Our digital home to connect, inform, and engage — uniting Nigerian
            families and friends across Peterborough and the wider UK.
          </p>
          <Link
            className="mt-space-md inline-flex w-fit items-center justify-center rounded-lg bg-brand-mint px-space-md py-space-xs font-label text-label-lg text-primary hover:bg-primary-fixed"
            href="/about"
          >
            About us
          </Link>
          <nav className="mt-space-lg" aria-label="Quick links">
            <ul className="flex flex-wrap gap-space-md">
              {heroQuickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    className="font-label text-label-lg text-surface-container-high underline-offset-4 hover:text-brand-mint hover:underline"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <div className="mx-auto w-full max-w-container-max px-gutter-mobile py-space-2xl md:px-gutter-desktop">
        <Reveal as="section" className="mb-space-2xl" variant="up">
          <div className="grid items-center gap-space-lg lg:grid-cols-2">
            <div className="rounded-2xl border border-border-subtle bg-surface-card p-space-lg shadow-sm">
              <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
                Our people
              </p>
              <h2 className="mt-space-2xs font-headline text-headline-lg font-bold text-primary">
                Community. Culture. Connection.
              </h2>
              <p className="mt-space-sm font-body text-body-lg text-text-secondary">
                Families, friends, and professionals building life in the UK
                while carrying Nigerian warmth into every gathering — from
                Peterborough to the wider diaspora.
              </p>
              <Link
                className="mt-space-md inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
                href="/get-involved"
              >
                Get involved
              </Link>
            </div>
            <CommunityCarousel
              slides={[...communityPortraitSlides]}
              className="shadow-card"
              intervalMs={4800}
              showCaptions
            />
          </div>
        </Reveal>

        <Home2FeatureFlow />

        <Reveal as="section" className="mt-space-xl" variant="up">
          <div className="rounded-2xl bg-primary p-space-lg text-on-primary shadow-elevated md:p-space-2xl">
            <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-mint">
              Be part of it
            </p>
            <h2 className="mt-space-2xs font-headline text-headline-lg font-bold text-on-primary">
              Built face to face — strengthened online
            </h2>
            <p className="mt-space-sm max-w-2xl font-body text-body-lg text-surface-container-low">
              NCP’s website is here so you can find events and news, explore
              the Market directory, give to the work, and take the first step
              to join or enquire.
            </p>
            <Link
              className="mt-space-md inline-flex items-center justify-center rounded-lg bg-brand-mint px-space-md py-space-xs font-label text-label-lg text-primary hover:bg-primary-fixed"
              href="/get-involved"
            >
              Get involved
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
