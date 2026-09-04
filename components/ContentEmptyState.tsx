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
    <div className="home2-glass content-empty" role="status">
      <p className="kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
      <p className="section-lead">{lead}</p>
      <p>
        <Link className="btn btn-primary" href={primaryHref}>
          {primaryLabel}
        </Link>
      </p>
    </div>
  );
}
