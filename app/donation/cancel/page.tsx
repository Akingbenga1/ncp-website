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
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <header className="py-space-xl">
        <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
          Support NCP
        </p>
        <h1 className="mt-space-2xs font-display text-display-lg-mobile font-extrabold tracking-tight text-primary md:text-headline-xl">
          Checkout cancelled
        </h1>
        <p className="mt-space-sm max-w-2xl font-body text-body-lg text-text-secondary">
          No card payment was taken. You can return to the donation page when
          you are ready, or give by bank transfer instead.
        </p>
      </header>

      <section className="pb-space-2xl" aria-labelledby="cancel-next">
        <Reveal
          className="rounded-2xl border border-border-subtle bg-surface-card p-space-lg shadow-sm"
          variant="up"
        >
          <h2
            id="cancel-next"
            className="font-headline text-headline-md font-bold text-primary"
          >
            Ways to continue
          </h2>
          <ul className="mt-space-md list-disc space-y-space-sm pl-space-md font-body text-body-md text-text-secondary">
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
              <a
                className="text-brand-emerald underline-offset-2 hover:underline"
                href={siteContact.emailHref}
              >
                {siteContact.contactName}
              </a>{" "}
              (
              <a
                className="text-brand-emerald underline-offset-2 hover:underline"
                href={siteContact.emailHref}
              >
                {siteContact.email}
              </a>
              ).
            </li>
          </ul>
          <p className="mt-space-lg flex flex-wrap gap-space-2xs">
            <Link
              className="inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
              href="/donation"
            >
              Back to Donation
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
              href="/get-involved"
            >
              Get involved
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
              href="/"
            >
              Home
            </Link>
          </p>
        </Reveal>
      </section>
    </main>
  );
}
