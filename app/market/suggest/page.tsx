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
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <header className="py-space-xl">
        <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
          Market
        </p>
        <h1 className="mt-space-2xs font-display text-display-lg-mobile font-extrabold tracking-tight text-primary md:text-headline-xl">
          Suggest a listing
        </h1>
        <p className="mt-space-sm max-w-2xl font-body text-body-lg text-text-secondary">
          Tell us about a business or community group. Suggestions stay
          unpublished until NCP reviews and approves them.
        </p>
      </header>

      <section className="pb-space-2xl" aria-labelledby="suggest-listing-heading">
        <h2 id="suggest-listing-heading" className="sr-only">
          Listing suggestion form
        </h2>
        <Reveal
          className="mx-auto max-w-2xl rounded-2xl border border-border-subtle bg-surface-card p-space-lg shadow-sm"
          variant="up"
        >
          <SuggestListingForm />
          <p className="mt-space-lg">
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
              href="/market"
            >
              Back to Market
            </Link>
          </p>
        </Reveal>
      </section>
    </main>
  );
}
