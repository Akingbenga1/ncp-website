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
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <header className="py-space-xl">
        <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
          Support NCP
        </p>
        <h1 className="mt-space-2xs font-display text-display-lg-mobile font-extrabold tracking-tight text-primary md:text-headline-xl">
          Donate
        </h1>
        <p className="mt-space-sm max-w-2xl font-body text-body-lg text-text-secondary">
          Give once or monthly by card, or transfer directly to NCP’s bank
          account. Every gift supports community programmes in Peterborough.
        </p>
      </header>

      <section
        className="grid gap-space-lg pb-space-2xl lg:grid-cols-2"
        aria-labelledby="donate-card-heading"
      >
        <Reveal
          className="rounded-2xl border border-border-subtle bg-surface-card p-space-lg shadow-sm"
          variant="up"
        >
          <h2
            id="donate-card-heading"
            className="font-headline text-headline-md font-bold text-primary"
          >
            Card donation
          </h2>
          <p className="mt-space-sm mb-space-md font-body text-body-md text-text-secondary">
            Choose an amount and frequency. Gift Aid can increase the value of
            your gift at no extra cost to you when you are a UK taxpayer.
          </p>
          <DonateForm
            checkoutAvailable={checkoutAvailable}
            charityIdentity={charityIdentity}
          />
        </Reveal>

        <Reveal
          className="rounded-2xl border border-border-subtle bg-surface-card p-space-lg shadow-sm"
          variant="up"
          delay={100}
        >
          <BankTransferDetailsBlock details={bankDetails} />
          {charityIdentity ? (
            <p className="mt-space-md font-body text-body-sm text-text-muted">
              {charityIdentity.registeredName} is a registered charity (
              {charityIdentity.charityNumber}).
            </p>
          ) : null}
          <p className="mt-space-sm font-body text-body-sm text-text-muted">
            Donation and Gift Aid details are handled as described in our{" "}
            <Link
              className="text-brand-emerald underline-offset-2 hover:underline"
              href="/privacy"
            >
              privacy policy
            </Link>{" "}
            (lawful basis: legitimate interests / legal obligation for records;
            consent for Gift Aid).
          </p>
          <p className="mt-space-lg">
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
              href="/get-involved"
            >
              Back to Get involved
            </Link>
          </p>
        </Reveal>
      </section>
    </main>
  );
}
