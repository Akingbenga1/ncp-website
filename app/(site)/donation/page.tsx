import type { Metadata } from "next";
import Link from "next/link";
import { BankTransferDetailsBlock } from "@/components/BankTransferDetails";
import { DonateForm } from "@/components/DonateForm";
import { MaterialIcon } from "@/components/MaterialIcon";
import { siteContact } from "@/data/site-contact";
import {
  getAppServices,
  isPaymentCheckoutConfigured,
} from "@/lib/composition";

export const metadata: Metadata = {
  title: "Donation",
  description:
    "Support Nigerian Community Peterborough with a one-off or monthly donation — card or bank transfer.",
};

const TRUST = [
  ["volunteer_activism", "100% to community programmes"],
  ["verified_user", "Secure card checkout"],
  ["account_balance", "Bank transfer option"],
  ["favorite", "Gift Aid can add 25%"],
] as const;

export default async function DonationPage() {
  const { payments } = getAppServices();
  const [bankDetails, charityIdentity] = await Promise.all([
    payments.getBankTransferDetails(),
    payments.getCharityIdentity(),
  ]);
  const checkoutAvailable = isPaymentCheckoutConfigured();

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
                href="/get-involved"
                className="transition-colors hover:text-primary"
              >
                Get involved
              </Link>
              <MaterialIcon name="chevron_right" className="text-[16px]" />
              <span className="font-semibold text-primary">Donate</span>
            </nav>
            <Link
              href="/get-involved"
              className="inline-flex items-center gap-space-3xs font-label text-label-md font-semibold text-primary transition-colors hover:text-primary-container"
            >
              <MaterialIcon name="arrow_back" className="text-[18px]" />
              Back to Get involved
            </Link>
          </div>

          <div className="max-w-3xl">
            <div className="mb-space-2xs inline-flex items-center gap-space-2xs rounded-full bg-surface-tinted px-space-xs py-space-3xs font-label text-label-eyebrow tracking-wider text-primary uppercase">
              <MaterialIcon
                name="volunteer_activism"
                className="text-[16px] text-brand-emerald"
              />
              Support NCP
            </div>
            <h1 className="mb-space-2xs font-headline text-headline-xl tracking-tight text-text-primary">
              Donate to community programmes in Peterborough
            </h1>
            <p className="font-body text-body-lg text-text-secondary">
              Give once or monthly by card, or transfer directly to NCP’s bank
              account. Every gift supports culture, welfare, and connection
              across Peterborough &amp; Cambridgeshire.
            </p>
          </div>

          <div className="mt-space-md grid grid-cols-2 gap-space-xs rounded-xl bg-surface-card p-space-sm pt-space-md shadow-sm md:grid-cols-4">
            {TRUST.map(([icon, label]) => (
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
        aria-labelledby="donate-card-heading"
      >
        <div className="mx-auto grid max-w-container-max grid-cols-1 items-start gap-8 px-gutter-mobile pb-space-2xl lg:grid-cols-12 lg:px-gutter-desktop">
          <div className="lg:col-span-7">
            <DonateForm
              checkoutAvailable={checkoutAvailable}
              charityIdentity={charityIdentity}
            />
          </div>

          <aside className="flex flex-col gap-6 lg:col-span-5">
            <div className="rounded-2xl bg-surface-tinted p-6 shadow-sm sm:p-8">
              <BankTransferDetailsBlock details={bankDetails} />
              {charityIdentity ? (
                <p className="mt-4 font-body text-xs text-text-muted">
                  {charityIdentity.registeredName} is a registered charity (
                  {charityIdentity.charityNumber}).
                </p>
              ) : null}
              <p className="mt-3 font-body text-xs text-text-muted">
                Donation and Gift Aid details are handled as described in our{" "}
                <Link
                  className="font-semibold text-brand-emerald hover:underline"
                  href="/privacy"
                >
                  privacy policy
                </Link>{" "}
                (lawful basis: legitimate interests / legal obligation for
                records; consent for Gift Aid).
              </p>
            </div>

            <div className="rounded-2xl bg-surface-card p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-tinted text-primary">
                  <MaterialIcon name="support_agent" className="text-[18px]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline text-sm font-bold text-on-surface">
                    Questions about giving?
                  </h3>
                  <p className="font-body text-xs leading-relaxed text-text-secondary">
                    Contact{" "}
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
                    ) or the {siteContact.excoLabel}.
                  </p>
                  <div className="pt-2">
                    <a
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-colors hover:text-brand-emerald"
                      href={siteContact.phoneHref}
                    >
                      <MaterialIcon name="call" className="text-[16px]" />
                      <span>
                        {siteContact.phoneDisplay} (Mon–Sat 9am–6pm)
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
