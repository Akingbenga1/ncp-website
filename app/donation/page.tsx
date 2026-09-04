import type { Metadata } from "next";
import Link from "next/link";
import { BankTransferDetailsBlock } from "@/components/BankTransferDetails";
import { DonateForm } from "@/components/DonateForm";
import { Reveal } from "@/components/Reveal";
import {
  getAppServices,
  isPaymentCheckoutConfigured,
} from "@/lib/composition";

export const metadata: Metadata = {
  title: "Donation",
  description:
    "Support Nigerian Community Peterborough with a one-off or monthly donation — card or bank transfer.",
};

export default async function DonationPage() {
  const { payments } = getAppServices();
  const [bankDetails, charityIdentity] = await Promise.all([
    payments.getBankTransferDetails(),
    payments.getCharityIdentity(),
  ]);
  const checkoutAvailable = isPaymentCheckoutConfigured();

  return (
    <main id="main">
      <header className="page-hero page-hero--banner">
        <div className="wrap">
          <p className="hero-kicker">Support NCP</p>
          <h1>Donate</h1>
          <p className="hero-lead hero-lead-inline">
            Give once or monthly by card, or transfer directly to NCP’s bank
            account. Every gift supports community programmes in Peterborough.
          </p>
        </div>
      </header>

      <section
        className="section section-overlap"
        aria-labelledby="donate-card-heading"
      >
        <div className="wrap donate-layout">
          <Reveal className="home2-glass content-detail-panel" variant="up">
            <h2 id="donate-card-heading">Card donation</h2>
            <p className="content-detail-summary">
              Choose an amount and frequency. Gift Aid can increase the value of
              your gift at no extra cost to you when you are a UK taxpayer.
            </p>
            <DonateForm
              checkoutAvailable={checkoutAvailable}
              charityIdentity={charityIdentity}
            />
          </Reveal>

          <Reveal
            className="home2-glass content-detail-panel"
            variant="up"
            delay={100}
          >
            <BankTransferDetailsBlock details={bankDetails} />
            {charityIdentity ? (
              <p className="donate-charity-footnote">
                {charityIdentity.registeredName} is a registered charity (
                {charityIdentity.charityNumber}).
              </p>
            ) : null}
            <p className="donate-privacy-note">
              Donation and Gift Aid details are handled as described in our{" "}
              <Link href="/privacy">privacy policy</Link> (lawful basis:
              legitimate interests / legal obligation for records; consent for
              Gift Aid).
            </p>
            <p className="content-detail-back">
              <Link className="btn btn-primary" href="/get-involved">
                Back to Get involved
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
