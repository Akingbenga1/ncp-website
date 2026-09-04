import type { Metadata } from "next";
import Link from "next/link";
import { Home3Hero } from "@/components/Home3Hero";
import { Pillars } from "@/components/Pillars";
import { Reveal } from "@/components/Reveal";

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
    <main id="main" className="home-variant home-variant-3">
      <Home3Hero />

      <Reveal as="section" className="section home3-below" variant="up">
        <div className="wrap">
          <p className="kicker">Belonging in the UK</p>
          <h2 className="section-title">One community. Three pillars.</h2>
          <p className="section-lead home3-below-lead">
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
          <div className="home3-below-actions">
            <Link className="btn btn-primary" href="/about">
              About us
            </Link>
            <Link className="btn btn-solid" href="/get-involved">
              Get involved
            </Link>
          </div>
        </div>
      </Reveal>

      {featureSections.map((feature, index) => (
        <Reveal
          key={feature.id}
          as="section"
          className={
            feature.reverse
              ? "section home3-feature home3-feature--alt"
              : "section home3-feature"
          }
          variant={index % 2 === 0 ? "left" : "right"}
        >
          <div
            className={
              feature.reverse
                ? "wrap home3-feature-grid home3-feature-grid--reverse"
                : "wrap home3-feature-grid"
            }
          >
            <div className="home3-feature-copy">
              <p className="kicker">{feature.kicker}</p>
              <h2 id={`${feature.id}-heading`} className="section-title">
                {feature.title}
              </h2>
              <p className="section-lead">{feature.lead}</p>
              <ul className="home3-feature-list">
                {feature.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link className="btn btn-primary" href={feature.cta.href}>
                {feature.cta.label}
              </Link>
            </div>
            <figure className="home3-feature-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={feature.image}
                alt={feature.imageAlt}
                width={900}
                height={900}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </Reveal>
      ))}
    </main>
  );
}
