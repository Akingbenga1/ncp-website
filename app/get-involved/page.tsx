import type { Metadata } from "next";
import Link from "next/link";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { MembershipEnquiryForm } from "@/components/MembershipEnquiryForm";
import { Reveal } from "@/components/Reveal";
import { communityPhotos } from "@/data/pixabay-credits";
import { siteContact } from "@/data/site-contact";

export const metadata: Metadata = {
  title: "Get involved",
  description:
    "Join Nigerian Community Peterborough as a member, volunteer, or supporter — enquire or donate.",
};

const paths = [
  {
    index: "01",
    title: "Member",
    body: "Join the community and stay in the loop with what NCP is doing.",
    href: "#membership-enquiry",
    cta: "Start enquiry",
  },
  {
    index: "02",
    title: "Volunteer",
    body: "Give time — events, welcome, and the work that keeps people together.",
    href: "#membership-enquiry",
    cta: "Offer to help",
  },
  {
    index: "03",
    title: "Support",
    body: "Donate so the organisation can keep a public home for the community.",
    href: "/donation",
    cta: "Go to donation",
  },
] as const;

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
            {paths.map((path, i) => (
              <Reveal
                as="article"
                className="point-card"
                variant="up"
                delay={i * 120}
                key={path.title}
              >
                <span className="pillar-index">{path.index}</span>
                <h3>{path.title}</h3>
                <p>{path.body}</p>
                <Link className="btn btn-solid involve-path-cta" href={path.href}>
                  {path.cta}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="enquiry-heading">
        <div className="wrap split split-form">
          <Reveal className="card form-card" variant="left">
            <div id="membership-enquiry">
              <h2 id="enquiry-heading">Membership enquiry</h2>
              <p className="form-note">
                Registration and enquiry delivery will use the membership and
                mail ports when those flows go live. Until then, email Theresa or
                call the EXCO line — this form never pretends a message was sent.
              </p>
              <MembershipEnquiryForm />
            </div>
          </Reveal>

          <Reveal className="side-stack side-sticky" variant="right" delay={140}>
            <div className="card donate-block">
              <h2>Donate</h2>
              <p>
                Support the work of Nigerian Community Peterborough. Card and
                bank options live on the donation page — wired through the
                payment port when live, never a disabled button here.
              </p>
              <Link className="btn btn-primary" href="/donation">
                Donation
              </Link>
            </div>

            <div className="card contact-block">
              <h2>Talk to us</h2>
              <p>{siteContact.contactName}</p>
              <p>
                <a href={siteContact.emailHref}>{siteContact.email}</a>
              </p>
              <p>
                {siteContact.excoLabel}:{" "}
                <a href={siteContact.phoneHref}>{siteContact.phoneDisplay}</a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
