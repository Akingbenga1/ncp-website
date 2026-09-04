import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { siteContact } from "@/data/site-contact";
import { getAppServices } from "@/lib/composition";

export const metadata: Metadata = {
  title: "Donation received",
  description: "Thank you for supporting Nigerian Community Peterborough.",
};

export default async function DonationSuccessPage() {
  const { payments } = getAppServices();
  const charityIdentity = await payments.getCharityIdentity();

  return (
    <main id="main">
      <header className="page-hero page-hero--banner">
        <div className="wrap">
          <p className="hero-kicker">Support NCP</p>
          <h1>Thank you</h1>
          <p className="hero-lead hero-lead-inline">
            Your card donation to Nigerian Community Peterborough was received.
            Thank you for supporting community programmes in Peterborough.
          </p>
        </div>
      </header>

      <section className="section section-overlap" aria-labelledby="success-next">
        <div className="wrap content-detail">
          <Reveal className="home2-glass content-detail-panel" variant="up">
            <h2 id="success-next">What happens next</h2>
            <ul className="donate-return-list">
              <li>
                Your payment confirmation is held with NCP’s payment records —
                keep any email receipt from the card provider for your own
                records.
              </li>
              <li>
                If you opted into Gift Aid, we keep your name and address with
                the donation so NCP can claim Gift Aid where eligible
                {charityIdentity
                  ? ` (${charityIdentity.registeredName}, charity number ${charityIdentity.charityNumber})`
                  : ""}
                .
              </li>
              <li>
                Questions about your gift? Contact{" "}
                <a href={siteContact.emailHref}>{siteContact.contactName}</a> (
                <a href={siteContact.emailHref}>{siteContact.email}</a>) or use
                Get involved. How we use donation data is in our{" "}
                <Link href="/privacy">privacy policy</Link>.
              </li>
            </ul>
            <p className="form-actions">
              <Link className="btn btn-solid" href="/">
                Home
              </Link>
              <Link className="btn btn-primary" href="/get-involved">
                Get involved
              </Link>
              <Link className="btn btn-primary" href="/donation">
                Donate again
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
