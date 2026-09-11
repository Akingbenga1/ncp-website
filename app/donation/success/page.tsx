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
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <header className="py-space-xl">
        <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
          Support NCP
        </p>
        <h1 className="mt-space-2xs font-display text-display-lg-mobile font-extrabold tracking-tight text-primary md:text-headline-xl">
          Thank you
        </h1>
        <p className="mt-space-sm max-w-2xl font-body text-body-lg text-text-secondary">
          Your card donation to Nigerian Community Peterborough was received.
          Thank you for supporting community programmes in Peterborough.
        </p>
      </header>

      <section className="pb-space-2xl" aria-labelledby="success-next">
        <Reveal
          className="rounded-2xl border border-border-subtle bg-surface-card p-space-lg shadow-sm"
          variant="up"
        >
          <h2
            id="success-next"
            className="font-headline text-headline-md font-bold text-primary"
          >
            What happens next
          </h2>
          <ul className="mt-space-md list-disc space-y-space-sm pl-space-md font-body text-body-md text-text-secondary">
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
              ) or use Get involved. How we use donation data is in our{" "}
              <Link
                className="text-brand-emerald underline-offset-2 hover:underline"
                href="/privacy"
              >
                privacy policy
              </Link>
              .
            </li>
          </ul>
          <p className="mt-space-lg flex flex-wrap gap-space-2xs">
            <Link
              className="inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
              href="/"
            >
              Home
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
              href="/get-involved"
            >
              Get involved
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
              href="/donation"
            >
              Donate again
            </Link>
          </p>
        </Reveal>
      </section>
    </main>
  );
}
