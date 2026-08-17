import type { Metadata } from "next";
import Link from "next/link";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { Pillars } from "@/components/Pillars";
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
    <main id="main">
      <header className="page-hero page-hero--banner page-hero--photo">
        <div className="wrap page-hero-grid page-hero-grid-photo">
          <div>
            <p className="hero-kicker">Who we are</p>
            <h1>About NCP</h1>
            <p className="hero-lead hero-lead-inline">
              Nigerian Community Peterborough is a home for Nigerian families and
              friends in Peterborough and beyond — a place to belong, stay
              informed, and take part.
            </p>
          </div>
          <Reveal className="page-hero-photo" variant="clip" delay={180}>
            <CommunityPhoto credit={communityPhotos.familyInPark} priority />
          </Reveal>
        </div>
      </header>

      <Reveal as="section" className="section section-overlap" variant="up">
        <div className="wrap about-mission">
          <div className="home2-glass about-mission-panel">
            <p className="kicker">Our mission</p>
            <h2 className="section-title">Connect. Inform. Engage.</h2>
            <p className="section-lead">
              We exist so Nigerian families and friends building life in the UK
              have a clear public home — not only a forwarded WhatsApp thread.
              NCP represents who we are today and where we are going: rooted in
              Peterborough, open to the wider diaspora.
            </p>
          </div>
        </div>
      </Reveal>

      <section className="section" aria-labelledby="mission-pillars-heading">
        <div className="wrap">
          <h2 id="mission-pillars-heading" className="visually-hidden">
            Mission pillars
          </h2>
          <div className="point-grid">
            <Reveal as="article" className="point-card" variant="up" delay={0}>
              <span className="pillar-index">01</span>
              <h3>Connect</h3>
              <p>
                Bring people together — families, friends, and neighbours who
                want a community they can recognise.
              </p>
            </Reveal>
            <Reveal as="article" className="point-card" variant="up" delay={120}>
              <span className="pillar-index">02</span>
              <h3>Inform</h3>
              <p>
                Share what is happening clearly, so nobody has to rely on a
                forwarded message to know where they stand.
              </p>
            </Reveal>
            <Reveal as="article" className="point-card" variant="up" delay={240}>
              <span className="pillar-index">03</span>
              <h3>Engage</h3>
              <p>
                Make it easy to join in — as a member, a volunteer, or someone
                who simply wants to stay close.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Reveal as="section" className="section" variant="up" delay={40}>
        <div className="wrap">
          <p className="kicker" id="about-pillars">
            How we show up
          </p>
          <h2 className="section-title">Community, culture, connection</h2>
          <Pillars heading="h3" />
        </div>
      </Reveal>

      <section
        className="section about-contact"
        aria-labelledby="about-contact-heading"
      >
        <div className="wrap">
          <Reveal className="home2-glass about-contact-panel" variant="up">
            <p className="kicker">Talk to us</p>
            <h2 id="about-contact-heading" className="section-title">
              Contact
            </h2>
            <p className="section-lead">
              Reach the organisation through Theresa or the EXCO line — the same
              public contacts from our community flyer.
            </p>
            <dl className="about-contact-list">
              <div>
                <dt>Contact</dt>
                <dd>{siteContact.contactName}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={siteContact.emailHref}>{siteContact.email}</a>
                </dd>
              </div>
              <div>
                <dt>{siteContact.excoLabel}</dt>
                <dd>
                  <a href={siteContact.phoneHref}>{siteContact.phoneDisplay}</a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <Reveal as="section" className="cta-band" variant="up">
        <div className="wrap cta-band-inner">
          <div>
            <p className="kicker kicker-on-dark">Next step</p>
            <h2>Come and take part</h2>
          </div>
          <Link className="btn btn-primary" href="/get-involved">
            Get involved
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
