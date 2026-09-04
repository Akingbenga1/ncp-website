import type { Metadata } from "next";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { ContentEmptyState } from "@/components/ContentEmptyState";
import { NewsListItem } from "@/components/NewsListItem";
import { Reveal } from "@/components/Reveal";
import { communityPhotos } from "@/data/pixabay-credits";
import { getAppServices } from "@/lib/composition";

export const metadata: Metadata = {
  title: "News",
  description:
    "News and updates from Nigerian Community Peterborough.",
};

export default async function NewsPage() {
  const { content } = getAppServices();
  const articles = await content.listNews();

  return (
    <main id="main">
      <header className="page-hero page-hero--banner page-hero--photo">
        <div className="wrap page-hero-grid page-hero-grid-photo">
          <div>
            <p className="hero-kicker">Updates</p>
            <h1>News</h1>
            <p className="hero-lead hero-lead-inline">
              Announcements and stories from Nigerian Community Peterborough —
              published by the team, not forwarded threads.
            </p>
          </div>
          <Reveal className="page-hero-photo" variant="clip" delay={180}>
            <CommunityPhoto credit={communityPhotos.friendsOnBench} priority />
          </Reveal>
        </div>
      </header>

      <section
        className="section section-overlap"
        aria-labelledby="news-list-heading"
      >
        <div className="wrap">
          <h2 id="news-list-heading" className="visually-hidden">
            Latest news
          </h2>
          {articles.length === 0 ? (
            <ContentEmptyState
              kicker="Coming soon"
              title="No news published yet"
              lead="When NCP shares updates, they will appear here. Stay close through Get involved for now."
            />
          ) : (
            <ul className="content-feed">
              {articles.map((article) => (
                <li key={article.id}>
                  <NewsListItem article={article} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
