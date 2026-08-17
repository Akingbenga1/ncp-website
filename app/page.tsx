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
  title: "Home",
};

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/";

const heroQuickLinks = [
  { href: "#donation", label: "Donation" },
  { href: "#events-news", label: "Events" },
  { href: "/get-involved", label: "Enquireies" },
] as const;

const homePeopleCarouselStatements = [
  "Your story belongs here — come as you are and find your place among neighbours who understand you and your family.",
  "Find factual information fast such as accommodation, locations , friends and connections",
  "From first hello to lifelong friendship — this is where connections in Peterborough begin.",
  "Share your gifts, your culture, your time — the community grows stronger when you take part.",
  "New in town or already living here — there is always room for one more at the table.",
  "Get connected to useful Businesses and advertise your business also. From  African shops, trades, Professional services and more",
  "Together we celebrate, support, and look forward — get involved and help shape what NCP becomes.",
] as const;

const homePeopleCarouselSlides = communityPortraitSlides.map((slide, index) => ({
  ...slide,
  alt: homePeopleCarouselStatements[index] ?? slide.alt,
}));

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
          <p className="hero-immersion-kicker">In the heart of</p>
          <h1 id="home2-heading">Peterborough &amp; beyond</h1>
          <p className="hero-immersion-lead">
            A home for Nigerians living in Peterborough, UK — connected, proud, and
            looking forward together.
          </p>
          <a
            className="btn btn-primary hero-immersion-cta"
            href={WHATSAPP_GROUP_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Join Whatsapp Group
          </a>
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
                <h2>Mordern, Cultural and Forward thinking Community</h2>
                <p className="section-lead">
                  Families, friends, and professionals building life in the UK
                  while carrying Nigerian warmth into every gathering.
                </p>
                <Link className="btn btn-primary" href="/get-involved">
                  Get involved
                </Link>
              </div>
              <CommunityCarousel
                slides={[...homePeopleCarouselSlides]}
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
                <h2>This community is built in person — and online</h2>
                <p className="section-lead">
                  NCP’s digital home is here to connect, inform, and engage. Join
                  in, find your people, and help the work grow.
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
