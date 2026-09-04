import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getAppServices } from "@/lib/composition";
import { formatContentDate } from "@/lib/format/content-dates";

type NewsArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getAppServices().content.getNewsBySlug(slug);
  if (!article) {
    return { title: "Article not found" };
  }
  return {
    title: article.title,
    description: article.summary ?? article.title,
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = await getAppServices().content.getNewsBySlug(slug);
  if (!article) notFound();

  const when = formatContentDate(article.publishedAt);

  return (
    <main id="main">
      <header className="page-hero page-hero--banner">
        <div className="wrap">
          <p className="hero-kicker">News</p>
          <h1>{article.title}</h1>
          <p className="hero-lead hero-lead-inline content-detail-hero-meta">
            {when}
          </p>
        </div>
      </header>

      <article
        className="section section-overlap"
        aria-labelledby="news-article-title"
      >
        <div className="wrap content-detail">
          <h2 id="news-article-title" className="visually-hidden">
            {article.title}
          </h2>
          <Reveal className="home2-glass content-detail-panel" variant="up">
            {article.imageUrl ? (
              <figure className="content-detail-figure">
                <img
                  src={article.imageUrl}
                  alt={article.imageAlt ?? article.title}
                  className="content-detail-img"
                  width={1200}
                  height={750}
                  loading="eager"
                  decoding="async"
                />
              </figure>
            ) : null}
            {article.summary ? (
              <p className="content-detail-summary">{article.summary}</p>
            ) : null}
            <div className="content-prose">{article.body}</div>
            <p className="content-detail-back">
              <Link className="btn btn-solid" href="/news">
                All news
              </Link>
            </p>
          </Reveal>
        </div>
      </article>
    </main>
  );
}
