import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/MaterialIcon";

export const metadata: Metadata = {
  title: "Dues checkout cancelled",
  description: "Your community dues card payment was cancelled — nothing was charged.",
};

export default function DuesCancelPage() {
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
            <span className="font-semibold text-primary">Cancelled</span>
          </nav>

          <div className="mb-space-2xs inline-flex items-center gap-space-2xs rounded-full bg-surface-tinted px-space-xs py-space-3xs font-label text-label-eyebrow tracking-wider text-primary uppercase">
            <MaterialIcon name="payments" className="text-[16px] text-secondary" />
            Members
          </div>
          <h1 className="max-w-2xl font-headline text-headline-xl tracking-tight text-text-primary">
            Checkout cancelled
          </h1>
          <p className="mt-space-2xs max-w-2xl font-body text-body-lg text-text-secondary">
            No card payment was taken. You can return to Community dues when you
            are ready, or pay by bank transfer and upload a receipt.
          </p>
        </div>
      </section>

      <section className="w-full py-space-xl">
        <div className="mx-auto flex max-w-container-max flex-wrap gap-space-sm px-gutter-mobile pb-space-2xl lg:px-gutter-desktop">
          <Link
            href="/dues"
            className="inline-flex items-center gap-space-2xs rounded-lg bg-primary px-space-md py-space-xs font-label text-label-lg text-on-primary"
          >
            Return to Community dues
          </Link>
          <Link
            href="/profile"
            className="inline-flex items-center gap-space-2xs rounded-lg bg-surface-container px-space-md py-space-xs font-label text-label-lg text-on-surface"
          >
            Profile
          </Link>
        </div>
      </section>
    </main>
  );
}
