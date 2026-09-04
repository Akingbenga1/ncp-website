import Link from "next/link";
import {
  searchHitKindLabel,
  type SearchHit,
} from "@/lib/domain/search";

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
    <Link className="content-entry home2-glass" href={hit.href}>
      <span className="content-entry-body">
        <span className="content-entry-meta">{searchHitKindLabel(hit.kind)}</span>
        <span className="content-entry-title">{hit.title}</span>
        {hit.summary ? (
          <span className="content-entry-summary">{hit.summary}</span>
        ) : null}
        <span className="content-entry-more">{moreLabel}</span>
      </span>
    </Link>
  );
}
