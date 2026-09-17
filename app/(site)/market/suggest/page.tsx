import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/MaterialIcon";
import { SuggestListingForm } from "@/components/SuggestListingForm";

export const metadata: Metadata = {
  title: "Suggest a listing",
  description:
    "Post a market offering or business listing for Nigerian Community Peterborough review and approval.",
};

export default function SuggestListingPage() {
  return (
    <main id="main" className="w-full flex-grow bg-surface pt-20">
      <section className="w-full bg-surface-stone/60 py-space-md">
        <div className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop">
          <div className="mb-space-sm flex flex-wrap items-center justify-between gap-space-xs">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-space-3xs font-label text-label-md text-text-muted"
            >
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <MaterialIcon name="chevron_right" className="text-[16px]" />
              <Link
                href="/market"
                className="transition-colors hover:text-primary"
              >
                Marketplace
              </Link>
              <MaterialIcon name="chevron_right" className="text-[16px]" />
              <span className="font-semibold text-primary">Post an Offering</span>
            </nav>
            <Link
              href="/market"
              className="inline-flex items-center gap-space-3xs font-label text-label-md font-semibold text-primary transition-colors hover:text-primary-container"
            >
              <MaterialIcon name="arrow_back" className="text-[18px]" />
              Back to Marketplace
            </Link>
          </div>

          <div className="max-w-3xl">
            <div className="mb-space-2xs inline-flex items-center gap-space-2xs rounded-full bg-surface-tinted px-space-xs py-space-3xs font-label text-label-eyebrow tracking-wider text-primary uppercase">
              <MaterialIcon
                name="storefront"
                className="text-[16px] text-brand-emerald"
              />
              Community Commerce &amp; Trusted Services
            </div>
            <h1 className="mb-space-2xs font-headline text-headline-xl tracking-tight text-text-primary">
              Post a Market Offering or Business Listing
            </h1>
            <p className="font-body text-body-lg text-text-secondary">
              Are you a Nigerian entrepreneur, catering chef, artisan, or service
              provider in Peterborough? Share your offerings with local families.
              Every listing is reviewed by the NCP Trade &amp; Welfare Committee
              before going live.
            </p>
          </div>

          <div className="mt-space-md grid grid-cols-2 gap-space-xs rounded-xl bg-surface-card p-space-sm pt-space-md shadow-sm md:grid-cols-4">
            {(
              [
                ["check_circle", "Free for Community Members"],
                ["chat", "Verified WhatsApp Inquiries"],
                ["verified", "Reviewed within 48 Hours"],
                ["payments", "Zero Platform Fees"],
              ] as const
            ).map(([icon, label]) => (
              <div
                key={label}
                className="flex items-center gap-space-2xs text-text-primary"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-tinted">
                  <MaterialIcon
                    name={icon}
                    className="text-[20px] text-brand-emerald"
                  />
                </div>
                <span className="font-label text-label-md">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="w-full py-space-xl"
        aria-labelledby="suggest-listing-heading"
      >
        <h2 id="suggest-listing-heading" className="sr-only">
          Listing suggestion form
        </h2>
        <div className="mx-auto max-w-container-max px-gutter-mobile pb-space-2xl lg:px-gutter-desktop">
          <SuggestListingForm />
        </div>
      </section>
    </main>
  );
}
