import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/MaterialIcon";
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
    <main id="main" className="w-full flex-grow bg-surface pt-20">
      <section className="w-full bg-surface-stone/60 py-space-md">
        <div className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop">
          <nav
            aria-label="Breadcrumb"
            className="mb-space-sm flex items-center gap-space-3xs font-label text-label-md text-text-muted"
          >
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <MaterialIcon name="chevron_right" className="text-[16px]" />
            <Link
              href="/donation"
              className="transition-colors hover:text-primary"
            >
              Donate
            </Link>
            <MaterialIcon name="chevron_right" className="text-[16px]" />
            <span className="font-semibold text-primary">Thank you</span>
          </nav>

          <div className="mb-space-2xs inline-flex items-center gap-space-2xs rounded-full bg-surface-tinted px-space-xs py-space-3xs font-label text-label-eyebrow tracking-wider text-primary uppercase">
            <MaterialIcon
              name="volunteer_activism"
              className="text-[16px] text-brand-emerald"
            />
            Support NCP
          </div>
          <h1 className="max-w-2xl font-headline text-headline-xl tracking-tight text-text-primary">
            Thank you for your gift
          </h1>
          <p className="mt-space-2xs max-w-2xl font-body text-body-lg text-text-secondary">
            Your card donation to Nigerian Community Peterborough was received.
            Thank you for supporting community programmes in Peterborough.
          </p>
        </div>
      </section>

      <section
        className="w-full py-space-xl"
        aria-labelledby="success-next"
      >
        <div className="mx-auto grid max-w-container-max grid-cols-1 items-start gap-8 px-gutter-mobile pb-space-2xl lg:grid-cols-12 lg:px-gutter-desktop">
          <div
            className="rounded-2xl bg-surface-card p-6 shadow-sm sm:p-8 md:p-10 lg:col-span-7"
            role="status"
          >
            <div className="mb-6 flex items-center gap-2.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-tinted text-brand-emerald">
                <MaterialIcon name="check_circle" className="text-[28px]" />
              </div>
              <div>
                <h2
                  id="success-next"
                  className="font-headline text-lg font-bold text-on-surface"
                >
                  What happens next
                </h2>
                <p className="font-body text-xs text-text-muted">
                  Your gift is with NCP
                </p>
              </div>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary-fixed text-on-secondary-fixed">
                  <MaterialIcon name="receipt_long" className="text-[15px]" />
                </div>
                <p className="font-body text-sm leading-relaxed text-text-secondary">
                  Your payment confirmation is held with NCP’s payment records
                  — keep any email receipt from the card provider for your own
                  records.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary-fixed text-on-secondary-fixed">
                  <MaterialIcon name="favorite" className="text-[15px]" />
                </div>
                <p className="font-body text-sm leading-relaxed text-text-secondary">
                  If you opted into Gift Aid, we keep your name and address
                  with the donation so NCP can claim Gift Aid where eligible
                  {charityIdentity
                    ? ` (${charityIdentity.registeredName}, charity number ${charityIdentity.charityNumber})`
                    : ""}
                  .
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary-fixed text-on-secondary-fixed">
                  <MaterialIcon name="mail" className="text-[15px]" />
                </div>
                <p className="font-body text-sm leading-relaxed text-text-secondary">
                  Questions about your gift? Contact{" "}
                  <a
                    className="font-semibold text-brand-emerald hover:underline"
                    href={siteContact.emailHref}
                  >
                    {siteContact.contactName}
                  </a>{" "}
                  (
                  <a
                    className="font-semibold text-brand-emerald hover:underline"
                    href={siteContact.emailHref}
                  >
                    {siteContact.email}
                  </a>
                  ). How we use donation data is in our{" "}
                  <Link
                    className="font-semibold text-brand-emerald hover:underline"
                    href="/privacy"
                  >
                    privacy policy
                  </Link>
                  .
                </p>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-5 py-3 font-label text-label-lg font-semibold text-on-primary hover:bg-primary-container"
                href="/"
              >
                Home
              </Link>
              <Link
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border-strong bg-surface-card px-5 py-3 font-label text-label-lg font-semibold text-primary hover:bg-surface-tinted"
                href="/get-involved"
              >
                Get involved
              </Link>
              <Link
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border-strong bg-surface-card px-5 py-3 font-label text-label-lg font-semibold text-primary hover:bg-surface-tinted"
                href="/donation"
              >
                Donate again
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
