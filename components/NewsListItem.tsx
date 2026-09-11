import Link from "next/link";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { MaterialIcon } from "@/components/MaterialIcon";
import { communityPhotos } from "@/data/pixabay-credits";
import type { PixabayCredit } from "@/data/pixabay-credits";
import type { NewsSummary } from "@/lib/domain/content";
import {
  estimateReadMinutes,
  formatNewsCardDate,
  inferNewsCategory,
  newsCategoryLabel,
  newsCategoryPillClass,
} from "@/lib/format/news-ui";

type NewsListItemProps = {
  article: NewsSummary;
  /** Image card vs text-first layout from the prototype. */
  variant?: "image" | "text";
};

function fallbackCredit(article: NewsSummary): PixabayCredit {
  const cat = inferNewsCategory(article.title, article.summary);
  if (cat === "health") return communityPhotos.handsUnity;
  if (cat === "education") return communityPhotos.friendsOnBench;
  if (cat === "culture") return communityPhotos.heritageCelebration;
  if (cat === "civic") return communityPhotos.proBusinessman;
  return communityPhotos.familyInPark;
}

export function NewsListItem({
  article,
  variant = "image",
}: NewsListItemProps) {
  const when = formatNewsCardDate(article.publishedAt);
  const category = inferNewsCategory(article.title, article.summary);
  const label = newsCategoryLabel(category);
  const minutes = estimateReadMinutes(article.summary);
  const href = `/news/${article.slug}`;

  if (variant === "text") {
    return (
      <article className="flex transform flex-col justify-between gap-space-md rounded-2xl bg-surface-card p-space-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center justify-between gap-space-2xs">
            <span
              className={`inline-flex items-center rounded-full px-space-xs py-space-3xs font-label text-label-eyebrow font-bold uppercase ${newsCategoryPillClass(category)}`}
            >
              {label}
            </span>
            {when ? (
              <span className="font-body text-body-sm text-text-muted">
                {when}
              </span>
            ) : null}
          </div>
          <div className="flex items-center gap-1 pt-1 font-body text-body-sm text-text-muted">
            <MaterialIcon name="schedule" className="text-[14px]" />
            <span>{minutes} min read</span>
          </div>
          <h3 className="mt-1 font-headline text-headline-sm leading-snug font-bold text-text-primary transition-colors hover:text-primary">
            <Link href={href}>{article.title}</Link>
          </h3>
          {article.summary ? (
            <p className="line-clamp-4 font-body text-body-sm leading-relaxed text-text-secondary">
              {article.summary}
            </p>
          ) : null}
        </div>
        <div className="mt-auto pt-space-xs">
          <Link
            href={href}
            className="inline-flex items-center gap-space-3xs font-label text-label-lg font-semibold text-primary transition-colors hover:text-brand-emerald"
          >
            <span>Read Full Story</span>
            <MaterialIcon name="arrow_forward" className="text-[16px]" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex transform flex-col overflow-hidden rounded-2xl bg-surface-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 w-full overflow-hidden bg-surface-container">
        {article.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.imageUrl}
            alt={article.imageAlt ?? ""}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            width={640}
            height={400}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <CommunityPhoto
            credit={fallbackCredit(article)}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div className="absolute top-3 left-3 rounded-full bg-surface-card/95 px-space-xs py-space-3xs shadow-sm backdrop-blur-md">
          <span className="font-label text-label-eyebrow text-primary uppercase">
            {label}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-space-sm p-space-md">
        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center gap-space-2xs font-body text-body-sm text-text-muted">
            {when ? <span>{when}</span> : null}
            {when ? <span>•</span> : null}
            <span className="flex items-center gap-1">
              <MaterialIcon name="schedule" className="text-[14px]" />
              {minutes} min read
            </span>
          </div>
          <h3 className="font-headline text-headline-sm leading-snug font-bold text-text-primary transition-colors group-hover:text-primary">
            <Link href={href}>{article.title}</Link>
          </h3>
          {article.summary ? (
            <p className="line-clamp-3 font-body text-body-sm leading-relaxed text-text-secondary">
              {article.summary}
            </p>
          ) : null}
        </div>
        <div className="mt-auto pt-space-xs">
          <Link
            href={href}
            className="inline-flex items-center gap-space-3xs font-label text-label-lg font-semibold text-primary transition-colors hover:text-brand-emerald"
          >
            <span>Read Full Story</span>
            <MaterialIcon name="arrow_forward" className="text-[16px]" />
          </Link>
        </div>
      </div>
    </article>
  );
}
