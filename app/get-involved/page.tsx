import type { Metadata } from "next";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { Reveal } from "@/components/Reveal";
import { communityPhotos } from "@/data/pixabay-credits";

export const metadata: Metadata = {
  title: "Get involved",
};

export default function GetInvolvedPage() {
  return (
    <main id="main">
      <header className="page-hero page-hero--banner page-hero--photo">
        <div className="wrap page-hero-grid page-hero-grid-photo">
          <div>
            <p className="hero-kicker">Join us</p>
            <h1>Get involved</h1>
            <p className="hero-lead hero-lead-inline">
              Become part of NCP — as a member, a volunteer, or a neighbour who
              wants to stay close to community, culture, and connection in
              Peterborough.
            </p>
          </div>
          <Reveal className="page-hero-photo" variant="clip" delay={180}>
            <CommunityPhoto credit={communityPhotos.handsUnity} priority />
          </Reveal>
        </div>
      </header>

      <section className="section section-overlap" aria-labelledby="ways-heading">
        <div className="wrap">
          <h2 id="ways-heading" className="visually-hidden">
            Ways to take part
          </h2>
          <div className="point-grid">
            <Reveal as="article" className="point-card" variant="up" delay={0}>
              <span className="pillar-index">01</span>
              <h3>Member</h3>
              <p>Join the community and stay in the loop with what NCP is doing.</p>
            </Reveal>
            <Reveal as="article" className="point-card" variant="up" delay={120}>
              <span className="pillar-index">02</span>
              <h3>Volunteer</h3>
              <p>Give time — events, welcome, and the work that keeps people together.</p>
            </Reveal>
            <Reveal as="article" className="point-card" variant="up" delay={240}>
              <span className="pillar-index">03</span>
              <h3>Support</h3>
              <p>Donate so the organisation can keep a public home for the community.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split split-form">
          <Reveal className="card form-card" variant="left">
            <h2>Membership enquiry</h2>
            <p className="form-note">
              Design preview — this form does not send.
            </p>
            <form className="form" action="#" method="get">
              <label htmlFor="full-name">
                Full name
                <input id="full-name" name="name" type="text" autoComplete="name" />
              </label>
              <label htmlFor="email">
                Email
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                />
              </label>
              <label htmlFor="phone">
                Phone
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </label>
              <label htmlFor="message">
                Message
                <textarea id="message" name="message" rows={5} />
              </label>
              <button className="btn btn-solid" type="button">
                Send enquiry
              </button>
            </form>
          </Reveal>

          <Reveal className="side-stack side-sticky" variant="right" delay={140}>
            <div className="card donate-block">
              <h2>Donate</h2>
              <p>
                Support the work of Nigerian Community Peterborough. Giving
                will be connected on the live site.
              </p>
              <p className="form-note">
                Design preview — this does not take payment.
              </p>
              <button className="btn btn-primary" type="button">
                Donate
              </button>
            </div>

            <div className="card contact-block">
              <h2>Talk to us</h2>
              <p>Theresa Okogwa</p>
              <p>
                <a href="mailto:theresa.okogwa@naijacp.co.uk">
                  theresa.okogwa@naijacp.co.uk
                </a>
              </p>
              <p>
                NCP EXCO LINE:{" "}
                <a href="tel:+447737742387">+44 7737 742387</a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
