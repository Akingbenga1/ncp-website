import Link from "next/link";

type ContentEmptyStateProps = {
  kicker: string;
  title: string;
  lead: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export function ContentEmptyState({
  kicker,
  title,
  lead,
  primaryHref = "/get-involved",
  primaryLabel = "Get involved",
}: ContentEmptyStateProps) {
  return (
    <div
      className="rounded-2xl border border-border-subtle bg-surface-card p-space-lg shadow-sm"
      role="status"
    >
      <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
        {kicker}
      </p>
      <h2 className="mt-space-2xs font-headline text-headline-lg font-bold text-primary">
        {title}
      </h2>
      <p className="mt-space-sm max-w-2xl font-body text-body-lg text-text-secondary">
        {lead}
      </p>
      <p className="mt-space-md">
        <Link
          className="inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
          href={primaryHref}
        >
          {primaryLabel}
        </Link>
      </p>
    </div>
  );
}
