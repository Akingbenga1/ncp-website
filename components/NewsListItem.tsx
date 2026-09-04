import Link from "next/link";
import type { NewsSummary } from "@/lib/domain/content";
import { formatContentDate } from "@/lib/format/content-dates";

type NewsListItemProps = {
  article: NewsSummary;
};

export function NewsListItem({ article }: NewsListItemProps) {
  const when = formatContentDate(article.publishedAt);

  return (
    <Link
      className={
        article.imageUrl
          ? "content-entry content-entry--with-media home2-glass"
          : "content-entry home2-glass"
      }
      href={`/news/${article.slug}`}
    >
      {article.imageUrl ? (
        <span className="content-entry-media">
          <img
            src={article.imageUrl}
            alt={article.imageAlt ?? ""}
            className="content-entry-img"
            width={640}
            height={400}
            loading="lazy"
            decoding="async"
          />
        </span>
      ) : null}
      <span className="content-entry-body">
        <span className="content-entry-meta">{when}</span>
        <span className="content-entry-title">{article.title}</span>
        {article.summary ? (
          <span className="content-entry-summary">{article.summary}</span>
        ) : null}
        <span className="content-entry-more">Read article</span>
      </span>
    </Link>
  );
}
