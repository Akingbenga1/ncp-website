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
    <main id="main">
      <section className="hero hero-with-photo" aria-labelledby="hero-heading">
        <div className="hero-atmosphere" aria-hidden="true">
          <div className="hero-atmosphere-mesh" />
          <div className="hero-atmosphere-grain" />
        </div>
        <div className="hero-pattern" aria-hidden="true" />
        <HeroCarousel slides={heroSlides} />
      </section>

      <section className="section section-overlap" aria-labelledby="pillars-heading">
        <div className="wrap">
          <h2 id="pillars-heading" className="visually-hidden">
            Our pillars
          </h2>
          <Pillars />
        </div>
      </section>

      <Reveal as="section" className="section" variant="up">
        <div className="wrap mission">
          <h2>Our digital home</h2>
          <div className="mission-copy">
            <p>
              NCP exists to connect, inform, and engage our community. This
              site is where we show who we are and where we are going — for
              members, neighbours, and anyone looking for a place to belong
              between Nigeria and Peterborough.
            </p>
            <Link className="btn btn-primary" href="/get-involved">
              Get involved
            </Link>
          </div>
        </div>
      </Reveal>

      <section className="section corridor" aria-labelledby="corridor-heading">
        <div className="wrap">
          <Reveal>
            <p className="kicker">Diaspora</p>
            <h2 id="corridor-heading" className="section-title">
              Two homes. One people.
            </h2>
            <p className="section-lead">
              We carry Lagos traffic in our stories and Peterborough weather in
              our coats. The work of NCP is to hold both — so nobody has to
              choose which version of themselves to bring into the room.
            </p>
          </Reveal>

          <div className="corridor-grid">
            <Reveal as="article" className="corridor-panel" variant="left">
              <div className="photo-frame">
                <Parallax factor={0.06}>
                  <CommunityPhoto credit={communityPhotos.heritageCelebration} />
                </Parallax>
              </div>
              <h3>Where we are from</h3>
              <p>
                Names, food, faith, and the particular way an aunty greets you.
                The rivers still meet. The sun is still bright.
              </p>
            </Reveal>

            <Reveal className="corridor-bridge" variant="scale" delay={120}>
              <BridgeArc />
              <p>Nigeria to Peterborough</p>
            </Reveal>

            <Reveal as="article" className="corridor-panel" variant="right" delay={80}>
              <div className="photo-frame">
                <Parallax factor={0.06}>
                  <CommunityPhoto credit={communityPhotos.ukStreetMarket} />
                </Parallax>
              </div>
              <h3>Where we are now</h3>
              <p>
                Cathedral city, school runs, night shifts, and a living room
                that still smells like pepper soup on a Sunday.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="gather-band" aria-labelledby="gather-heading">
        <div className="wrap gather-grid">
          <Reveal variant="clip" className="gather-art">
            <CommunityPhoto credit={communityPhotos.womenTogether} />
          </Reveal>
          <Reveal variant="right" delay={140} className="gather-copy">
            <p className="kicker kicker-on-dark">Belonging</p>
            <h2 id="gather-heading">Find your people</h2>
            <p>
              Diaspora life can be quiet in the wrong way — skilled, busy, and
              still hungry for a room that already understands you. NCP is that
              room: cousins by choice, neighbours by postcode, family by how we
              show up.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="moments-heading">
        <div className="wrap">
          <Reveal>
            <p className="kicker">Everyday Naija, here</p>
            <h2 id="moments-heading" className="section-title">
              What we keep close
            </h2>
          </Reveal>

          <div className="moment-grid">
            <Reveal as="article" className="moment-card" variant="clip">
              <div className="photo-frame">
                <CommunityPhoto credit={communityPhotos.jollofPlate} />
              </div>
              <div className="moment-copy">
                <h3>The table</h3>
                <p>
                  Jollof, fried plantain, a cooler in the boot. The table is
                  how we remember we are not guests in our own lives.
                </p>
              </div>
            </Reveal>

            <Reveal as="article" className="moment-card" variant="clip" delay={90}>
              <div className="photo-frame">
                <CommunityPhoto credit={communityPhotos.familyInPark} />
              </div>
              <div className="moment-copy">
                <h3>The language</h3>
                <p>
                  Ilé. Ụlọ. Gida. Home. The first language your child hears
                  should not have to wait until a trip to Nigeria.
                </p>
              </div>
            </Reveal>

            <Reveal as="article" className="moment-card" variant="clip" delay={40}>
              <div className="photo-frame">
                <CommunityPhoto credit={communityPhotos.claspedHands} />
              </div>
              <div className="moment-copy">
                <h3>The welcome</h3>
                <p>
                  New in the city, new in the country, or just new to needing
                  people. The door stays open.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Reveal as="section" className="quote-band" variant="up">
        <div className="quote-pattern" aria-hidden="true">
          <AdirePattern />
        </div>
        <div className="wrap quote-inner">
          <p className="kicker kicker-on-dark">A voice from the room</p>
          <blockquote>
            <p>
              Home is the people who still call your name the way they did in
              Nigeria — even when the postcode has changed.
            </p>
          </blockquote>
        </div>
      </Reveal>

      <Reveal as="section" className="cta-band">
        <div className="wrap cta-band-inner">
          <div>
            <p className="kicker kicker-on-dark">Be part of it</p>
            <h2>This community is built in person</h2>
          </div>
          <Link className="btn btn-primary" href="/get-involved">
            Get involved
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
