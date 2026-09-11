import type { Metadata } from "next";
import Link from "next/link";
import { Home3Hero } from "@/components/Home3Hero";
import { Pillars } from "@/components/Pillars";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Home 3",
  robots: { index: false, follow: false },
};

const featureSections = [
  {
    id: "donations",
    kicker: "Give",
    title: "Donations",
    lead: "Support programmes that keep families connected — culture nights, welcome support, and community care across Peterborough.",
    points: [
      "One-off gifts that fund real local work",
      "Transparent use of funds for community priorities",
      "A simple path to give when you’re ready",
    ],
    cta: { href: "/get-involved", label: "Donate / get involved" },
    image: "/images/home-3/illust-donations.jpg",
    imageAlt:
      "Symbolic flat illustration of a community member offering a heart gift for donations",
    reverse: false,
  },
  {
    id: "directory",
    kicker: "Market",
    title: "Community & business directory",
    lead: "Discover Nigerian-owned businesses, services, and community contacts — a digital marketplace that helps neighbours find each other.",
    points: [
      "Local listings for shops, services, and makers",
      "Searchable categories for everyday needs",
      "A growing directory the community can trust",
    ],
    cta: { href: "/get-involved", label: "List your business" },
    image: "/images/home-3/illust-directory.jpg",
    imageAlt:
      "Symbolic flat illustration of a community business directory with map pin and shopfront",
    reverse: true,
  },
  {
    id: "events",
    kicker: "Gather",
    title: "Events",
    lead: "From celebrations to meetings — stay informed about what’s happening next, so no one misses the moments that bring us together.",
    points: [
      "Upcoming gatherings in one clear place",
      "Cultural nights, meetings, and family days",
      "Easy ways to show up and take part",
    ],
    cta: { href: "/get-involved", label: "See what’s on" },
    image: "/images/home-3/illust-events.jpg",
    imageAlt:
      "Symbolic flat illustration of a community calendar and gathering for events",
    reverse: false,
  },
] as const;

export default function HomeThreePage() {
  return (
    <main id="main" className="flex w-full flex-col bg-surface">
      <Home3Hero />

      <Reveal
        as="section"
        className="mx-auto w-full max-w-container-max px-gutter-mobile py-space-2xl md:px-gutter-desktop"
        variant="up"
      >
        <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
          Belonging in the UK
        </p>
        <h2 className="mt-space-2xs font-headline text-headline-lg font-bold text-primary">
          One community. Three pillars.
        </h2>
        <p className="mt-space-sm mb-space-lg max-w-2xl font-body text-body-lg text-text-secondary">
          From Peterborough streets to family tables — we grow stronger when
          culture, care, and connection stay close.
        </p>
        <Pillars
          illustrations={[
            {
              src: "/images/home-3/illust-community.jpg",
              alt: "Symbolic flat illustration of community members standing together",
            },
            {
              src: "/images/home-3/illust-culture.jpg",
              alt: "Symbolic flat illustration celebrating culture and heritage",
            },
            {
              src: "/images/home-3/illust-connection.jpg",
              alt: "Symbolic flat illustration of people connected together",
            },
          ]}
        />
        <div className="mt-space-lg flex flex-wrap gap-space-2xs">
          <Link
            className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
            href="/about"
          >
            About us
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
            href="/get-involved"
          >
            Get involved
          </Link>
        </div>
      </Reveal>

      {featureSections.map((feature, index) => (
        <Reveal
          key={feature.id}
          as="section"
          className={cn(
            "mx-auto w-full max-w-container-max px-gutter-mobile py-space-xl md:px-gutter-desktop",
            feature.reverse && "bg-surface-stone",
          )}
          variant={index % 2 === 0 ? "left" : "right"}
        >
          <div
            className={cn(
              "grid items-center gap-space-lg md:grid-cols-2",
              feature.reverse && "md:[&>*:first-child]:order-2",
            )}
          >
            <div>
              <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
                {feature.kicker}
              </p>
              <h2
                id={`${feature.id}-heading`}
                className="mt-space-2xs font-headline text-headline-lg font-bold text-primary"
              >
                {feature.title}
              </h2>
              <p className="mt-space-sm font-body text-body-lg text-text-secondary">
                {feature.lead}
              </p>
              <ul className="mt-space-md list-disc space-y-space-2xs pl-space-md font-body text-body-md text-text-secondary">
                {feature.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link
                className="mt-space-md inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
                href={feature.cta.href}
              >
                {feature.cta.label}
              </Link>
            </div>
            <figure className="overflow-hidden rounded-2xl shadow-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={feature.image}
                alt={feature.imageAlt}
                width={900}
                height={900}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover"
              />
            </figure>
          </div>
        </Reveal>
      ))}
    </main>
  );
}
