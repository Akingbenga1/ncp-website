import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DuesPayForm } from "@/components/DuesPayForm";
import { MaterialIcon } from "@/components/MaterialIcon";
import { getAppServices } from "@/lib/composition";
import { COMMUNITY_DUES_AMOUNT_GBP } from "@/lib/domain/dues";

export const metadata: Metadata = {
  title: "Community dues",
  description:
    "Pay your £20 rolling community dues to Nigerian Community Peterborough by card or bank transfer.",
};

export default async function DuesPage() {
  const { auth, members, dues } = getAppServices();
  const session = await auth.getSession();
  if (!session) {
    redirect("/login?next=/dues");
  }

  const profile = await members.getOwnProfile();
  if (!profile) {
    redirect("/login?next=/dues");
  }

  const [duesStatus, bankDetails] = await Promise.all([
    dues.getStatusForMember(profile.id, profile.email),
    dues.getBankTransferDetails(),
  ]);
  const checkoutAvailable = dues.isCardCheckoutConfigured();

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
                href="/profile"
                className="transition-colors hover:text-primary"
              >
                Profile
              </Link>
              <MaterialIcon name="chevron_right" className="text-[16px]" />
              <span className="font-semibold text-primary">Community dues</span>
            </nav>
            <Link
              href="/profile"
              className="inline-flex items-center gap-space-3xs font-label text-label-md font-semibold text-primary transition-colors hover:text-primary-container"
            >
              <MaterialIcon name="arrow_back" className="text-[18px]" />
              Back to profile
            </Link>
          </div>

          <div className="max-w-3xl">
            <div className="mb-space-2xs inline-flex items-center gap-space-2xs rounded-full bg-surface-tinted px-space-xs py-space-3xs font-label text-label-eyebrow tracking-wider text-primary uppercase">
              <MaterialIcon name="payments" className="text-[16px] text-secondary" />
              Members
            </div>
            <h1 className="mb-space-2xs font-headline text-headline-xl tracking-tight text-text-primary">
              Community dues
            </h1>
            <p className="font-body text-body-lg text-text-secondary">
              All members contribute{" "}
              <strong className="text-text-primary">
                £{COMMUNITY_DUES_AMOUNT_GBP}
              </strong>{" "}
              every rolling 30 days to NCP. Pay by card or transfer to the same
              NCP bank account used for donations, then upload your receipt.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-space-xl" aria-labelledby="dues-pay-heading">
        <div className="mx-auto max-w-container-max px-gutter-mobile pb-space-2xl lg:px-gutter-desktop">
          <h2 id="dues-pay-heading" className="sr-only">
            Pay community dues
          </h2>
          <div className="mx-auto max-w-2xl">
            <DuesPayForm
              duesStatus={duesStatus}
              checkoutAvailable={checkoutAvailable}
              bankDetails={bankDetails}
              memberEmail={profile.email}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
