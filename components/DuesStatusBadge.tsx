import Link from "next/link";
import type { DuesPeriodStatus } from "@/lib/domain/dues";
import { MaterialIcon } from "@/components/MaterialIcon";

type DuesStatusBadgeProps = {
  status: Exclude<DuesPeriodStatus, "due">;
  periodEndsAt?: string | null;
};

function formatPeriodEnd(iso: string | null | undefined): string | null {
  if (!iso) return null;
  // Stable UTC date string — avoids locale hydration mismatches.
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

/**
 * Stylish profile/dues status for Paid or Pending (not Due — that uses the CTA).
 */
export function DuesStatusBadge({ status, periodEndsAt }: DuesStatusBadgeProps) {
  const until = formatPeriodEnd(periodEndsAt);
  const isPaid = status === "paid";

  return (
    <span
      className={
        isPaid
          ? "inline-flex items-center gap-space-2xs rounded-lg border border-brand-emerald/30 bg-brand-emerald/10 px-space-md py-space-xs font-label text-label-lg text-brand-emerald"
          : "inline-flex items-center gap-space-2xs rounded-lg border border-accent-gold/40 bg-accent-gold/15 px-space-md py-space-xs font-label text-label-lg text-primary"
      }
      title={until ? `Current period until ${until}` : undefined}
    >
      <MaterialIcon
        name={isPaid ? "verified" : "hourglass_top"}
        className="text-[18px]"
      />
      <span>{isPaid ? "Dues paid" : "Dues pending"}</span>
    </span>
  );
}

type PayDuesCtaProps = {
  href?: string;
  className?: string;
};

/** Peer-sized profile CTA — distinct colour, not larger than other profile buttons. */
export function PayDuesCta({
  href = "/dues",
  className = "",
}: PayDuesCtaProps) {
  return (
    <Link
      href={href}
      className={`inline-flex flex-1 items-center justify-center gap-space-2xs rounded-lg bg-secondary px-space-md py-space-xs font-label text-label-lg text-on-secondary shadow-sm transition-colors hover:bg-secondary-container hover:text-on-secondary-container lg:flex-none ${className}`}
    >
      <MaterialIcon name="payments" className="text-[18px]" />
      <span>Pay your dues</span>
    </Link>
  );
}
