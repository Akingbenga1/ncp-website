import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MaterialIcon } from "@/components/MaterialIcon";
import { getAppServices } from "@/lib/composition";
import { COMMUNITY_DUES_AMOUNT_GBP } from "@/lib/domain/dues";

export const metadata: Metadata = {
  title: "Dues payment successful",
  description: "Your community dues card payment was received.",
};

type DuesSuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function DuesSuccessPage({
  searchParams,
}: DuesSuccessPageProps) {
  const { auth, members, dues } = getAppServices();
  const session = await auth.getSession();
  if (!session) {
    redirect("/login?next=/dues");
  }

  const profile = await members.getOwnProfile();
  if (!profile) {
    redirect("/login?next=/dues");
  }

  const params = await searchParams;
  const sessionId = params.session_id?.trim();

  let confirmError: string | null = null;
  if (sessionId && dues.isCardCheckoutConfigured()) {
    try {
      await dues.confirmCardCheckout({
        memberId: profile.id,
        email: profile.email,
        sessionId,
      });
    } catch (error) {
      console.error("DuesPort.confirmCardCheckout failed", error);
      confirmError =
        error instanceof Error && error.message
          ? error.message
          : "We could not confirm this payment yet.";
    }
  } else if (!sessionId) {
    confirmError = "Missing checkout session. If you paid, contact NCP with your receipt.";
  }

  const duesStatus = await dues.getStatusForMember(profile.id, profile.email);
  const paid = duesStatus.status === "paid";

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
            <Link href="/dues" className="transition-colors hover:text-primary">
              Community dues
            </Link>
            <MaterialIcon name="chevron_right" className="text-[16px]" />
            <span className="font-semibold text-primary">
              {paid ? "Thank you" : "Confirmation"}
            </span>
          </nav>

          <div className="mb-space-2xs inline-flex items-center gap-space-2xs rounded-full bg-surface-tinted px-space-xs py-space-3xs font-label text-label-eyebrow tracking-wider text-primary uppercase">
            <MaterialIcon name="payments" className="text-[16px] text-secondary" />
            Members
          </div>
          <h1 className="max-w-2xl font-headline text-headline-xl tracking-tight text-text-primary">
            {paid ? "Community dues received" : "Payment confirmation"}
          </h1>
          <p className="mt-space-2xs max-w-2xl font-body text-body-lg text-text-secondary">
            {paid
              ? `Your £${COMMUNITY_DUES_AMOUNT_GBP} card payment covers the next rolling 30 days.`
              : confirmError ||
                "We could not confirm your payment automatically. Your profile status will update once payment is verified."}
          </p>
        </div>
      </section>

      <section className="w-full py-space-xl">
        <div className="mx-auto flex max-w-container-max flex-wrap gap-space-sm px-gutter-mobile pb-space-2xl lg:px-gutter-desktop">
          <Link
            href="/profile"
            className="inline-flex items-center gap-space-2xs rounded-lg bg-primary px-space-md py-space-xs font-label text-label-lg text-on-primary"
          >
            Back to profile
          </Link>
          <Link
            href="/dues"
            className="inline-flex items-center gap-space-2xs rounded-lg bg-surface-container px-space-md py-space-xs font-label text-label-lg text-on-surface"
          >
            Community dues
          </Link>
        </div>
      </section>
    </main>
  );
}
