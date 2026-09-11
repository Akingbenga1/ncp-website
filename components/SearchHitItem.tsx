import Link from "next/link";
import { searchHitKindLabel, type SearchHit } from "@/lib/domain/search";

type SearchHitItemProps = {
  hit: SearchHit;
};

export function SearchHitItem({ hit }: SearchHitItemProps) {
  const moreLabel =
    hit.kind === "event"
      ? "View event"
      : hit.kind === "news"
        ? "View article"
        : "View listing";

  return (
    <Link
      className="group flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-card p-space-md shadow-sm transition hover:shadow-card"
      href={hit.href}
    >
      <span className="flex flex-1 flex-col gap-space-2xs">
        <span className="font-label text-label-md text-text-muted">
          {searchHitKindLabel(hit.kind)}
        </span>
        <span className="font-headline text-headline-sm font-bold text-primary">
          {hit.title}
        </span>
        {hit.summary ? (
          <span className="font-body text-body-md text-text-secondary">
            {hit.summary}
          </span>
        ) : null}
        <span className="mt-auto pt-space-2xs font-label text-label-lg text-brand-emerald">
          {moreLabel}
        </span>
      </span>
    </Link>
  );
}
