import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { siteContact } from "@/data/site-contact";

export const metadata: Metadata = {
  title: "Donation cancelled",
  description: "Your card donation was cancelled — you can try again anytime.",
};

export default function DonationCancelPage() {
  return (
    <main id="main">
      <header className="page-hero page-hero--banner">
        <div className="wrap">
          <p className="hero-kicker">Support NCP</p>
          <h1>Checkout cancelled</h1>
          <p className="hero-lead hero-lead-inline">
            No card payment was taken. You can return to the donation page when
            you are ready, or give by bank transfer instead.
          </p>
        </div>
      </header>

      <section className="section section-overlap" aria-labelledby="cancel-next">
        <div className="wrap content-detail">
          <Reveal className="home2-glass content-detail-panel" variant="up">
            <h2 id="cancel-next">Ways to continue</h2>
            <ul className="donate-return-list">
              <li>
                Return to Donation to choose an amount and complete card checkout
                again.
              </li>
              <li>
                Prefer offline giving? Use the bank transfer details on the
                donation page (when published).
              </li>
              <li>
                Need help? Contact{" "}
                <a href={siteContact.emailHref}>{siteContact.contactName}</a> (
                <a href={siteContact.emailHref}>{siteContact.email}</a>).
              </li>
            </ul>
            <p className="form-actions">
              <Link className="btn btn-solid" href="/donation">
                Back to Donation
              </Link>
              <Link className="btn btn-primary" href="/get-involved">
                Get involved
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
