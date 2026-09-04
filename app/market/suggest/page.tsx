import type { Metadata } from "next";
import Link from "next/link";
import { SuggestListingForm } from "@/components/SuggestListingForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Suggest a listing",
  description:
    "Suggest a Nigerian-owned or Nigerian-serving business or community group for the NCP Market directory.",
};

export default function SuggestListingPage() {
  return (
    <main id="main">
      <header className="page-hero page-hero--banner">
        <div className="wrap">
          <p className="hero-kicker">Market</p>
          <h1>Suggest a listing</h1>
          <p className="hero-lead hero-lead-inline">
            Tell us about a business or community group. Suggestions stay
            unpublished until NCP reviews and approves them.
          </p>
        </div>
      </header>

      <section
        className="section section-overlap"
        aria-labelledby="suggest-listing-heading"
      >
        <div className="wrap content-detail">
          <h2 id="suggest-listing-heading" className="visually-hidden">
            Listing suggestion form
          </h2>
          <Reveal className="home2-glass content-detail-panel" variant="up">
            <SuggestListingForm />
            <p className="content-detail-back">
              <Link className="btn btn-primary" href="/market">
                Back to Market
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
