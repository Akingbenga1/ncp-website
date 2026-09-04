import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { siteContact } from "@/data/site-contact";

export const metadata: Metadata = {
  title: "Cookie notice",
  description:
    "How Nigerian Community Peterborough uses essential cookies on this website.",
};

/**
 * Essential-only cookie notice (Task 7.6).
 * Non-essential analytics would need consent (NH-10) — not enabled at launch.
 */
export default function CookiesPage() {
  return (
    <main id="main">
      <header className="page-hero page-hero--banner">
        <div className="wrap">
          <p className="hero-kicker">Legal</p>
          <h1>Cookie notice</h1>
          <p className="hero-lead hero-lead-inline">
            {siteContact.organisation} uses essential cookies only at launch —
            no analytics or marketing cookies without a further consent step.
          </p>
        </div>
      </header>

      <section className="section section-overlap" aria-labelledby="cookies-body">
        <div className="wrap content-detail">
          <Reveal className="home2-glass content-detail-panel" variant="up">
            <h2 id="cookies-body">Essential cookies</h2>
            <p>
              Essential cookies are needed for the site to work as you expect.
              We set an httpOnly session cookie when you sign in so we can keep
              you logged in securely across pages. That cookie is not readable
              by scripts in the browser.
            </p>
            <p>
              Without that cookie, membership features (sign-in, profile, and
              related account actions) cannot work.
            </p>

            <h2>What we do not use at launch</h2>
            <p>
              We do not set non-essential cookies for analytics, advertising, or
              social tracking on this website at launch. If NCP later chooses
              analytics (NH-10), we will update this notice and only enable
              non-essential cookies after an accessible consent choice.
            </p>

            <h2>Managing cookies</h2>
            <p>
              You can clear cookies in your browser settings at any time. Clearing
              the session cookie will sign you out. For how we use personal data
              more broadly, see our{" "}
              <Link href="/privacy">privacy policy</Link>.
            </p>

            <p className="form-note">
              Questions about cookies or privacy:{" "}
              <a href={siteContact.emailHref}>{siteContact.contactName}</a> or
              the {siteContact.excoLabel} (
              <a href={siteContact.phoneHref}>{siteContact.phoneDisplay}</a>).
            </p>

            <p className="content-detail-back">
              <Link className="btn btn-primary" href="/privacy">
                Privacy policy
              </Link>
              <Link className="btn btn-primary" href="/">
                Home
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
