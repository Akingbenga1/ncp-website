import type { Metadata } from "next";
import Link from "next/link";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { MaterialIcon } from "@/components/MaterialIcon";
import { NewsArchives } from "@/components/NewsArchives";
import { NewsBrowse } from "@/components/NewsBrowse";
import { communityPhotos } from "@/data/pixabay-credits";
import { siteContact } from "@/data/site-contact";
import { getAppServices } from "@/lib/composition";
import {
  estimateReadMinutes,
  formatNewsFeaturedDate,
  inferNewsCategory,
  newsCategoryLabel,
} from "@/lib/format/news-ui";

export const metadata: Metadata = {
  title: "News",
  description:
    "Stories, official updates, and community announcements from Nigerian Community Peterborough.",
};

export default async function NewsPage() {
  const { content } = getAppServices();
  const articles = await content.listNews();
  const featured = articles[0];
  const gridArticles = featured ? articles.slice(1) : articles;
  /** Compact archive rows for stories beyond featured + first grid page. */
  const archiveArticles = articles.slice(6);

  const submitMailto = `${siteContact.emailHref}?subject=${encodeURIComponent("Community story submission")}&body=${encodeURIComponent("Hi Theresa,\n\nI'd like to share a community story or tip:\n\n")}`;
  const subscribeMailto = `${siteContact.emailHref}?subject=${encodeURIComponent("NCP news email updates")}&body=${encodeURIComponent("Hi Theresa,\n\nPlease add me to NCP news email updates.\n\nName:\nEmail:\n")}`;
  const pressKitMailto = `${siteContact.emailHref}?subject=${encodeURIComponent("Press kit & media pack request")}`;

  const featuredCategory = featured
    ? inferNewsCategory(featured.title, featured.summary)
    : null;
  const featuredMinutes = featured
    ? estimateReadMinutes(featured.summary)
    : 4;

  return (
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <div className="flex w-full flex-col gap-space-2xl pb-space-2xl">
        <section className="relative w-full pt-space-lg">
          <div className="pointer-events-none absolute -top-10 -right-12 -z-10 h-96 w-96 rounded-full bg-secondary-fixed/30 blur-3xl" />
          <div className="pointer-events-none absolute top-48 left-1/3 -z-10 h-80 w-80 rounded-full bg-surface-tinted blur-2xl" />
          <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
            <div className="flex flex-col gap-space-md lg:col-span-7">
              <div className="inline-flex w-fit items-center gap-space-3xs rounded-full bg-surface-tinted px-space-xs py-space-3xs">
                <MaterialIcon name="campaign" className="text-[18px] text-primary" />
                <span className="font-label text-label-eyebrow tracking-wider text-primary uppercase">
                  Community Voice &amp; Updates
                </span>
              </div>
              <div className="flex flex-col gap-space-2xs">
                <h1 className="font-display text-display-lg-mobile font-extrabold tracking-tight text-primary md:text-display-lg">
                  News &amp; Announcements
                </h1>
                <p className="max-w-2xl font-body text-body-lg leading-relaxed text-text-secondary">
                  Stories, official community updates, local civic partnerships,
                  and celebratory milestones of Nigerian families and
                  professionals across Peterborough and Cambridgeshire.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-space-xs pt-space-2xs">
                <a
                  href="#latest-news"
                  className="inline-flex items-center gap-space-3xs rounded-xl bg-primary px-space-md py-space-xs font-label text-label-lg text-on-primary shadow-sm transition-all duration-200 hover:bg-primary-container"
                >
                  <MaterialIcon name="newspaper" className="text-[20px]" />
                  <span>Browse Latest News</span>
                </a>
                <a
                  href="#press-inquiries"
                  className="inline-flex items-center gap-space-3xs rounded-xl bg-surface-card px-space-md py-space-xs font-label text-label-lg text-primary shadow-sm transition-all duration-200 hover:bg-surface-stone"
                >
                  <MaterialIcon name="post_add" className="text-[20px]" />
                  <span>Submit a Story / Tip</span>
                </a>
                <a
                  href={subscribeMailto}
                  className="inline-flex items-center gap-space-3xs rounded-xl px-space-xs py-space-xs font-label text-label-lg text-secondary transition-colors hover:text-primary"
                >
                  <MaterialIcon name="rss_feed" className="text-[20px]" />
                  <span>Subscribe (email)</span>
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
                <div className="flex items-center gap-space-3xs rounded-lg bg-surface-card px-space-xs py-space-3xs shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-brand-emerald" />
                  <span className="font-label text-label-md text-text-primary">
                    {articles.length > 0
                      ? `${articles.length}+ Community Bulletins`
                      : "Community Bulletins"}
                  </span>
                </div>
                <div className="flex items-center gap-space-3xs rounded-lg bg-surface-card px-space-xs py-space-3xs shadow-sm">
                  <MaterialIcon
                    name="verified"
                    className="text-[16px] text-brand-emerald"
                  />
                  <span className="font-label text-label-md text-text-primary">
                    Verified EXCO Updates
                  </span>
                </div>
                <div className="flex items-center gap-space-3xs rounded-lg bg-surface-card px-space-xs py-space-3xs shadow-sm">
                  <MaterialIcon
                    name="location_on"
                    className="text-[16px] text-accent-warm-ochre"
                  />
                  <span className="font-label text-label-md text-text-primary">
                    Cambridgeshire Wide
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full lg:col-span-5">
              {featured ? (
                <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface-card shadow-md transition-all duration-300 hover:shadow-xl">
                  <div className="relative h-64 w-full overflow-hidden bg-surface-container sm:h-72">
                    {featured.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={featured.imageUrl}
                        alt={featured.imageAlt ?? featured.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        width={800}
                        height={480}
                        fetchPriority="high"
                      />
                    ) : (
                      <CommunityPhoto
                        credit={communityPhotos.proBusinessman}
                        priority
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-space-3xs rounded-full bg-accent-gold px-space-xs py-space-3xs font-label text-label-eyebrow font-bold tracking-wider text-on-surface uppercase shadow-sm">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-error" />
                        Featured Story
                      </span>
                    </div>
                    <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between font-body text-body-sm text-on-primary">
                      <span className="flex items-center gap-1 opacity-90">
                        <MaterialIcon
                          name="calendar_today"
                          className="text-[16px]"
                        />
                        {formatNewsFeaturedDate(featured.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1 opacity-90">
                        <MaterialIcon name="schedule" className="text-[16px]" />
                        {featuredMinutes} min read
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-space-xs bg-surface-card p-space-md sm:p-space-lg">
                    {featuredCategory ? (
                      <span className="font-label text-label-eyebrow tracking-wider text-brand-emerald uppercase">
                        {newsCategoryLabel(featuredCategory)}
                      </span>
                    ) : null}
                    <h2 className="font-headline text-headline-md leading-snug text-text-primary transition-colors group-hover:text-primary">
                      {featured.title}
                    </h2>
                    {featured.summary ? (
                      <p className="line-clamp-3 font-body text-body-sm leading-relaxed text-text-secondary">
                        {featured.summary}
                      </p>
                    ) : null}
                    <div className="flex items-center justify-between pt-space-2xs">
                      <Link
                        href={`/news/${featured.slug}`}
                        className="inline-flex items-center gap-space-3xs font-label text-label-lg font-bold text-primary transition-all duration-200 group-hover:translate-x-1 hover:text-brand-emerald"
                      >
                        <span>Read Featured Story</span>
                        <MaterialIcon
                          name="arrow_forward"
                          className="text-[18px]"
                        />
                      </Link>
                      <span className="font-body text-body-sm text-text-muted">
                        NCP Desk
                      </span>
                    </div>
                  </div>
                </article>
              ) : (
                <article className="flex flex-col overflow-hidden rounded-2xl bg-surface-card shadow-md">
                  <div className="h-64 sm:h-72">
                    <CommunityPhoto
                      credit={communityPhotos.friendsOnBench}
                      priority
                    />
                  </div>
                  <div className="flex flex-col gap-space-xs p-space-md sm:p-space-lg">
                    <h2 className="font-headline text-headline-md text-text-primary">
                      Community updates coming soon
                    </h2>
                    <p className="font-body text-body-sm text-text-secondary">
                      When NCP publishes verified bulletins, the latest story
                      will be featured here.
                    </p>
                    <Link
                      href="/get-involved"
                      className="inline-flex items-center gap-space-3xs font-label text-label-lg font-bold text-primary hover:text-brand-emerald"
                    >
                      <span>Stay close via Get involved</span>
                      <MaterialIcon name="arrow_forward" className="text-[18px]" />
                    </Link>
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>

        <NewsBrowse
          articles={gridArticles}
          emptyBecauseFeatured={Boolean(featured) && gridArticles.length === 0}
        />

        {archiveArticles.length > 0 ? (
          <NewsArchives articles={archiveArticles} />
        ) : null}

        <section
          id="press-inquiries"
          className="relative w-full overflow-hidden rounded-2xl bg-primary p-space-lg text-on-primary shadow-lg sm:p-space-xl"
        >
          <div className="pointer-events-none absolute -top-16 -right-16 h-80 w-80 rounded-full bg-brand-emerald/30 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-secondary-container/20 blur-xl" />
          <div className="relative z-10 grid grid-cols-1 items-center gap-space-lg lg:grid-cols-12">
            <div className="flex flex-col gap-space-xs lg:col-span-7">
              <div className="inline-flex items-center gap-space-3xs text-brand-mint">
                <MaterialIcon name="send" className="text-[18px]" />
                <span className="font-label text-label-eyebrow font-bold tracking-wider uppercase">
                  Press Desk &amp; Submissions
                </span>
              </div>
              <h2 className="font-headline text-headline-xl font-bold tracking-tight text-on-primary">
                Have a story to share or media inquiry?
              </h2>
              <p className="font-body text-body-md leading-relaxed text-on-primary-container">
                Whether you are a local journalist, community member with an
                achievement, or partner organisation, our communications team
                welcomes your submission. We elevate grassroots stories that
                inspire.
              </p>
              <div className="flex items-center gap-space-xs pt-space-xs font-body text-body-sm text-surface-container-high">
                <MaterialIcon
                  name="account_circle"
                  className="text-[18px] text-brand-mint"
                />
                <span>
                  Lead Coordinator: <strong>{siteContact.contactName}</strong> •{" "}
                  <a
                    className="text-brand-mint hover:underline"
                    href={siteContact.emailHref}
                  >
                    {siteContact.email}
                  </a>
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-space-xs sm:flex-row sm:items-stretch lg:col-span-5 lg:flex-col lg:items-end">
              <a
                href={submitMailto}
                className="inline-flex items-center justify-center gap-space-2xs rounded-xl bg-brand-mint px-space-lg py-space-xs text-center font-label text-label-lg font-bold text-primary shadow-md transition-all duration-200 hover:bg-primary-fixed"
              >
                <MaterialIcon name="edit_note" className="text-[20px]" />
                <span>Submit Community News</span>
              </a>
              <a
                href={pressKitMailto}
                className="inline-flex items-center justify-center gap-space-2xs rounded-xl bg-primary-container px-space-lg py-space-xs text-center font-label text-label-lg font-semibold text-on-primary transition-all duration-200 hover:bg-primary/80"
              >
                <MaterialIcon name="mail" className="text-[20px]" />
                <span>Request Press Kit</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
