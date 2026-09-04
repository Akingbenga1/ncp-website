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
    <main id="main" className="home-variant home-variant-2">
      <section className="hero-immersion" aria-labelledby="home2-heading">
        <div className="hero-immersion-media" aria-hidden="true">
          <CommunityCarousel
            slides={[...ukLandscapeSlides]}
            className="hero-immersion-carousel"
            intervalMs={7000}
            priorityFirst
          />
          <div className="hero-immersion-fog" />
          <div className="hero-immersion-veil" />
        </div>

        <div className="hero-immersion-content">
          <p className="hero-immersion-kicker">
            Nigerian Community Peterborough
          </p>
          <h1 id="home2-heading">Peterborough &amp; beyond</h1>
          <p className="hero-immersion-lead">
            Our digital home to connect, inform, and engage — uniting Nigerian
            families and friends across Peterborough and the wider UK.
          </p>
          <Link className="btn btn-primary hero-immersion-cta" href="/about">
            About us
          </Link>
          <nav
            className="hero-variant-nav hero-variant-nav--light"
            aria-label="Quick links"
          >
            <ul>
              {heroQuickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <div className="home2-after">
        <div className="home2-after-bg-track" aria-hidden="true">
          <div className="home2-after-bg">
            <div className="home2-after-veil" />
            <div className="home2-after-grain" />
          </div>
        </div>

        <div className="home2-after-content">
          <Reveal as="section" className="section home2-community" variant="up">
            <div className="wrap home2-community-grid">
              <div className="home2-glass home2-community-copy">
                <p className="kicker">Our people</p>
                <h2>Community. Culture. Connection.</h2>
                <p className="section-lead">
                  Families, friends, and professionals building life in the UK
                  while carrying Nigerian warmth into every gathering — from
                  Peterborough to the wider diaspora.
                </p>
                <Link className="btn btn-primary" href="/get-involved">
                  Get involved
                </Link>
              </div>
              <CommunityCarousel
                slides={[...communityPortraitSlides]}
                className="home2-people-carousel"
                intervalMs={4800}
                showCaptions
              />
            </div>
          </Reveal>

          <Home2FeatureFlow />

          <Reveal as="section" className="home2-close" variant="up">
            <div className="wrap">
              <div className="home2-glass home2-close-inner">
                <p className="kicker">Be part of it</p>
                <h2>Built face to face — strengthened online</h2>
                <p className="section-lead">
                  NCP’s website is here so you can find events and news, explore
                  the Market directory, give to the work, and take the first step
                  to join or enquire.
                </p>
                <Link className="btn btn-primary" href="/get-involved">
                  Get involved
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
