import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { MaterialIcon } from "@/components/MaterialIcon";
import { NewsBulletinForm } from "@/components/NewsBulletinForm";
import { ShareArticleActions } from "@/components/ShareArticleActions";
import { communityPhotos } from "@/data/pixabay-credits";
import type { PixabayCredit } from "@/data/pixabay-credits";
import { siteContact } from "@/data/site-contact";
import { getAppServices } from "@/lib/composition";
import type { NewsSummary } from "@/lib/domain/content";
import {
  estimateReadMinutes,
  formatNewsArticleDate,
  formatNewsCardDate,
  inferNewsCategory,
  newsCategoryLabel,
  newsReleaseLabel,
  splitNewsBody,
  type NewsCategoryId,
} from "@/lib/format/news-ui";

type NewsArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const civicPillars = [
  {
    n: "01",
    title: "Fast-Track NHS Nurse & Medic Relocation Support",
    tag: "North West Anglia NHS",
    tagClass: "bg-surface-tinted text-brand-emerald",
    body: "A dedicated volunteer welcoming corps will partner directly with HR onboarding at Peterborough City Hospital. Services encompass airport arrival welcomes, immediate emergency accommodation checks, and orientation into local transit, schooling, and banking channels.",
  },
  {
    n: "02",
    title: "ARU International Student Orientation & Housing Protection",
    tag: "Education & Welfare",
    tagClass: "bg-surface-container text-on-surface",
    body: "Collaborative liaison with student unions and local tenancy regulators to safeguard postgraduate scholars against rogue landlords, excessive guarantor constraints, and isolated pastoral wellbeing challenges.",
  },
  {
    n: "03",
    title: "Community Health Advocacy & Sickle Cell Blood Drives",
    tag: "Public Health UK",
    tagClass: "bg-secondary-container text-on-secondary-container",
    body: "Quarterly community health screenings, mental wellness webinars free from cultural stigma, and an expanded civic campaign in conjunction with NHS Blood and Transplant to increase Ro-subtype blood donations.",
  },
  {
    n: "04",
    title: "Bi-Monthly Council Townhall Liaison & Ward Surgeries",
    tag: "Civic Representation",
    tagClass: "bg-surface-container-high text-on-surface",
    body: "Direct access surgeries with local ward councillors, planning authorities, and community police liaisons held at central Peterborough venues, enabling diaspora residents to raise grassroots neighbourhood concerns seamlessly.",
  },
] as const;

function heroCredit(category: Exclude<NewsCategoryId, "all">): PixabayCredit {
  if (category === "health") return communityPhotos.handsUnity;
  if (category === "education") return communityPhotos.friendsOnBench;
  if (category === "culture") return communityPhotos.heritageCelebration;
  if (category === "civic") return communityPhotos.proBusinessman;
  return communityPhotos.familyInPark;
}

function relatedCredit(article: NewsSummary): PixabayCredit {
  return heroCredit(inferNewsCategory(article.title, article.summary));
}

function secondaryPills(
  category: Exclude<NewsCategoryId, "all">,
): string[] {
  if (category === "civic") return ["NHS & Healthcare", "Student Welfare"];
  if (category === "health") return ["Community Welfare", "Public Health"];
  if (category === "education") return ["Youth", "ARU Peterborough"];
  if (category === "culture") return ["Heritage", "Celebration"];
  return ["Community Update", "Peterborough"];
}

function hostInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

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
  const content = getAppServices().content;
  const article = await content.getNewsBySlug(slug);
  if (!article) notFound();

  const allNews = await content.listNews({ limit: 24 });
  const related = allNews.filter((item) => item.slug !== article.slug).slice(0, 3);

  const category = inferNewsCategory(article.title, article.summary);
  const showCivicExtras = category === "civic";
  const minutes = estimateReadMinutes(
    `${article.summary ?? ""} ${article.body}`,
  );
  const published = formatNewsArticleDate(article.publishedAt);
  const paragraphs = splitNewsBody(article.body);
  const breadcrumbLabel =
    article.title.length > 42
      ? `${article.title.slice(0, 40).trim()}…`
      : article.title;
  const submitMailto = `${siteContact.emailHref}?subject=${encodeURIComponent("Community story submission")}`;
  const contactMailto = `${siteContact.emailHref}?subject=${encodeURIComponent("EXCO secretariat inquiry")}`;
  const resourceMailto = `${siteContact.emailHref}?subject=${encodeURIComponent(`Request documents: ${article.title}`)}`;
  const getInvolvedWhatsApp = "/get-involved";

  return (
    <main id="main" className="w-full flex-grow bg-surface pt-20">
      <div className="flex w-full flex-col">
        <section className="w-full bg-surface pt-space-md pb-space-lg">
          <div className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop">
            <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-xs">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-space-2xs font-body text-body-sm text-text-muted"
              >
                <Link
                  href="/"
                  className="flex items-center gap-1 transition-colors hover:text-primary"
                >
                  <MaterialIcon name="home" className="text-[16px]" />
                  Home
                </Link>
                <MaterialIcon
                  name="chevron_right"
                  className="text-[14px] opacity-40"
                />
                <Link
                  href="/news"
                  className="transition-colors hover:text-primary"
                >
                  News
                </Link>
                <MaterialIcon
                  name="chevron_right"
                  className="text-[14px] opacity-40"
                />
                <span className="font-medium text-secondary">
                  {breadcrumbLabel}
                </span>
              </nav>
              <Link
                href="/news"
                className="inline-flex items-center gap-space-3xs rounded-full bg-surface-container-low px-space-xs py-1 font-label text-label-md text-secondary transition-colors hover:text-primary"
              >
                <MaterialIcon name="arrow_back" className="text-[16px]" />
                <span>Back to News &amp; Announcements</span>
              </Link>
            </div>

            <div className="mb-space-sm flex flex-wrap items-center gap-space-2xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-tinted px-space-xs py-1 font-label text-label-eyebrow tracking-wider text-brand-emerald uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald" />
                {newsCategoryLabel(category)}
              </span>
              {secondaryPills(category).map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center rounded-full bg-surface-container-high px-space-xs py-1 font-label text-label-eyebrow tracking-wider text-on-surface uppercase"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="max-w-4xl">
              <h1 className="font-headline text-headline-xl-mobile leading-tight font-extrabold tracking-tight text-balance text-on-surface md:text-headline-xl lg:font-display lg:text-display-lg">
                {article.title}
              </h1>
              {article.summary ? (
                <p className="mt-space-xs max-w-3xl font-body text-body-lg leading-relaxed text-text-secondary">
                  {article.summary}
                </p>
              ) : null}
            </div>

            <div className="mt-space-lg rounded-xl bg-surface-card p-space-sm shadow-sm">
              <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-space-xs">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                    <MaterialIcon name="calendar_today" className="text-[20px]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-label text-label-eyebrow text-text-muted uppercase">
                      Published Date
                    </p>
                    <p className="truncate font-label text-label-md font-semibold text-on-surface">
                      {published || "Date TBC"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                    <MaterialIcon name="timer" className="text-[20px]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-label text-label-eyebrow text-text-muted uppercase">
                      Read &amp; Archive
                    </p>
                    <p className="truncate font-label text-label-md font-semibold text-on-surface">
                      {minutes} min read • {newsReleaseLabel(article.publishedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                    <MaterialIcon
                      name="account_balance"
                      className="text-[20px]"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-label text-label-eyebrow text-text-muted uppercase">
                      {showCivicExtras ? "Signing Venue" : "Coverage"}
                    </p>
                    <p className="truncate font-label text-label-md font-semibold text-on-surface">
                      {showCivicExtras
                        ? "Peterborough Town Hall, PE1 1HG"
                        : "Peterborough & Cambridgeshire"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                    <MaterialIcon name="verified_user" className="text-[20px]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-label text-label-eyebrow text-text-muted uppercase">
                      Editorial Desk
                    </p>
                    <p className="truncate font-label text-label-md font-semibold text-on-surface">
                      {siteContact.contactName} (Liaison Lead)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-surface pb-space-xl">
          <div className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop">
            <div className="relative overflow-hidden rounded-2xl bg-surface-container shadow-md">
              {article.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={article.imageUrl}
                  alt={article.imageAlt ?? article.title}
                  className="h-[380px] w-full object-cover sm:h-[480px] lg:h-[560px]"
                  width={1240}
                  height={560}
                  fetchPriority="high"
                />
              ) : (
                <CommunityPhoto
                  credit={heroCredit(category)}
                  priority
                  className="h-[380px] w-full object-cover sm:h-[480px] lg:h-[560px]"
                  width={1240}
                  height={560}
                />
              )}
              <div className="flex items-start justify-between gap-space-xs bg-surface-card p-space-sm font-body text-body-sm text-text-secondary sm:items-center sm:p-space-md">
                <div className="flex items-start gap-space-2xs">
                  <MaterialIcon
                    name="photo_camera"
                    className="mt-0.5 shrink-0 text-[18px] text-primary"
                  />
                  <p>
                    {article.imageAlt ??
                      `${siteContact.organisation} community archives — ${article.title}.`}{" "}
                    <span className="text-text-muted">
                      Photo: NCP Archives.
                    </span>
                  </p>
                </div>
                <span className="hidden shrink-0 rounded bg-surface-container px-2.5 py-0.5 text-xs font-semibold text-on-surface md:inline-flex">
                  Press Clearance A-1
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-surface pb-space-3xl">
          <div className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop">
            <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
              <article className="flex min-w-0 flex-col gap-space-xl lg:col-span-8">
                <div
                  id="summary"
                  className="relative overflow-hidden rounded-2xl bg-surface-tinted p-space-md shadow-sm lg:p-space-lg"
                >
                  <div className="pointer-events-none absolute -right-8 -bottom-8 text-primary opacity-10">
                    <MaterialIcon name="handshake" className="text-[160px]" />
                  </div>
                  <div className="mb-space-xs flex items-center gap-space-2xs">
                    <MaterialIcon
                      name="mark_chat_read"
                      className="text-[20px] text-brand-emerald"
                    />
                    <span className="font-label text-label-eyebrow tracking-wider text-brand-emerald uppercase">
                      Executive Summary
                    </span>
                  </div>
                  <p className="font-headline text-headline-sm leading-relaxed font-semibold text-primary">
                    {article.summary
                      ? `“${article.summary}”`
                      : `“${siteContact.organisation} shares verified community updates so families, students, and professionals across Peterborough stay informed.”`}
                  </p>
                </div>

                <section
                  id="background"
                  className="flex flex-col gap-space-sm text-on-surface"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-emerald" />
                    <h2 className="font-headline text-headline-lg font-bold tracking-tight text-on-surface">
                      {showCivicExtras
                        ? "A Milestone for Diasporic Civic Voice"
                        : "Full Story"}
                    </h2>
                  </div>
                  {paragraphs.length > 0 ? (
                    paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 64)}
                        className="font-body text-body-md leading-relaxed whitespace-pre-wrap text-text-secondary"
                      >
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="font-body text-body-md leading-relaxed text-text-secondary">
                      Full details for this bulletin will appear here as the
                      editorial desk publishes the complete release.
                    </p>
                  )}

                  {showCivicExtras ? (
                    <div className="my-space-xs rounded-xl bg-surface-stone p-space-md">
                      <div className="grid grid-cols-1 gap-space-md text-center sm:grid-cols-3 sm:text-left">
                        <div>
                          <p className="font-headline text-headline-xl font-bold text-primary">
                            1,400+
                          </p>
                          <p className="mt-0.5 font-body text-body-sm text-text-muted">
                            Diaspora families represented
                          </p>
                        </div>
                        <div>
                          <p className="font-headline text-headline-xl font-bold text-secondary">
                            380
                          </p>
                          <p className="mt-0.5 font-body text-body-sm text-text-muted">
                            NHS Healthcare professionals settled
                          </p>
                        </div>
                        <div>
                          <p className="font-headline text-headline-xl font-bold text-accent-warm-ochre">
                            6
                          </p>
                          <p className="mt-0.5 font-body text-body-sm text-text-muted">
                            Dedicated joint council surgeries yearly
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </section>

                {showCivicExtras ? (
                  <>
                    <section
                      id="four-pillars"
                      className="flex flex-col gap-space-md"
                    >
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-accent-gold" />
                          <span className="font-label text-label-eyebrow tracking-wider text-text-muted uppercase">
                            Framework Structure
                          </span>
                        </div>
                        <h2 className="font-headline text-headline-lg font-bold tracking-tight text-on-surface">
                          Structured Pillars of the New Accord
                        </h2>
                        <p className="mt-1 font-body text-body-sm text-text-secondary">
                          Four operational commitments codifying community
                          empowerment and service integration.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-space-sm">
                        {civicPillars.map((pillar) => (
                          <div
                            key={pillar.n}
                            className="rounded-xl bg-surface-card p-space-md shadow-sm transition-shadow hover:shadow-md"
                          >
                            <div className="flex items-start gap-space-sm">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface-stone font-headline text-headline-sm font-bold text-primary">
                                {pillar.n}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="mb-1 flex flex-wrap items-center justify-between gap-space-2xs">
                                  <h3 className="font-headline text-headline-sm font-bold text-on-surface">
                                    {pillar.title}
                                  </h3>
                                  <span
                                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${pillar.tagClass}`}
                                  >
                                    {pillar.tag}
                                  </span>
                                </div>
                                <p className="font-body text-body-sm leading-relaxed text-text-secondary">
                                  {pillar.body}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section
                      id="leadership-quotes"
                      className="flex flex-col gap-space-md"
                    >
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-brand-emerald" />
                          <span className="font-label text-label-eyebrow tracking-wider text-text-muted uppercase">
                            Voices of the Agreement
                          </span>
                        </div>
                        <h2 className="font-headline text-headline-lg font-bold tracking-tight text-on-surface">
                          Key Quotes from Leadership
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
                        <div className="flex flex-col justify-between rounded-xl bg-surface-card p-space-md shadow-sm">
                          <div className="flex flex-col gap-space-2xs">
                            <MaterialIcon
                              name="format_quote"
                              className="text-[28px] text-brand-emerald"
                            />
                            <p className="font-body text-body-md leading-relaxed text-on-surface italic">
                              &ldquo;When our nurses and engineers arrive in
                              Peterborough, their drive to serve the city is
                              immense. Having an official channel means our
                              community&apos;s needs are heard, respected, and
                              addressed as institutional equals.&rdquo;
                            </p>
                          </div>
                          <div className="mt-space-md flex items-center gap-space-xs pt-space-xs">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-emerald font-headline text-headline-sm font-bold text-on-primary">
                              {hostInitials(siteContact.contactName)}
                            </div>
                            <div>
                              <h4 className="font-label text-label-lg font-bold text-on-surface">
                                {siteContact.contactName}
                              </h4>
                              <p className="font-body text-body-sm text-text-muted">
                                Head of Communications &amp; Civic Liaison, NCP
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between rounded-xl bg-surface-card p-space-md shadow-sm">
                          <div className="flex flex-col gap-space-2xs">
                            <MaterialIcon
                              name="format_quote"
                              className="text-[28px] text-secondary"
                            />
                            <p className="font-body text-body-md leading-relaxed text-on-surface italic">
                              &ldquo;The contribution of the Nigerian diaspora to
                              our NHS, our higher education institutions, and our
                              local commerce is invaluable. This accord is not
                              merely symbolic; it is a working framework that
                              makes Peterborough stronger.&rdquo;
                            </p>
                          </div>
                          <div className="mt-space-md flex items-center gap-space-xs pt-space-xs">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary font-headline text-headline-sm font-bold text-on-secondary">
                              DH
                            </div>
                            <div>
                              <h4 className="font-label text-label-lg font-bold text-on-surface">
                                Cllr. David H.
                              </h4>
                              <p className="font-body text-body-sm text-text-muted">
                                Executive Member for Communities, PCC
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section id="resources" className="flex flex-col gap-space-sm">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-accent-warm-ochre" />
                          <span className="font-label text-label-eyebrow tracking-wider text-text-muted uppercase">
                            Official Documentation
                          </span>
                        </div>
                        <h2 className="font-headline text-headline-lg font-bold tracking-tight text-on-surface">
                          Download Official Documents &amp; Resources
                        </h2>
                      </div>
                      <div className="mt-1 grid grid-cols-1 gap-space-sm sm:grid-cols-2">
                        <div className="flex items-center justify-between gap-space-xs rounded-xl bg-surface-card p-space-sm shadow-sm transition-colors hover:bg-surface-stone">
                          <div className="flex min-w-0 items-center gap-space-xs">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-error-container text-error">
                              <MaterialIcon
                                name="picture_as_pdf"
                                className="text-[22px]"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-label text-label-md font-bold text-on-surface">
                                Accord Agreement Summary.pdf
                              </p>
                              <p className="font-body text-body-sm text-text-muted">
                                Official Release • Request via EXCO
                              </p>
                            </div>
                          </div>
                          <a
                            className="p-2 text-primary transition-colors hover:text-brand-emerald"
                            href={resourceMailto}
                            title="Request Accord Agreement"
                          >
                            <MaterialIcon name="download" className="text-[22px]" />
                          </a>
                        </div>
                        <div className="flex items-center justify-between gap-space-xs rounded-xl bg-surface-card p-space-sm shadow-sm transition-colors hover:bg-surface-stone">
                          <div className="flex min-w-0 items-center gap-space-xs">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-tinted text-brand-emerald">
                              <MaterialIcon
                                name="description"
                                className="text-[22px]"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-label text-label-md font-bold text-on-surface">
                                Healthcare &amp; Housing Guidance.pdf
                              </p>
                              <p className="font-body text-body-sm text-text-muted">
                                Community Resource • Request via EXCO
                              </p>
                            </div>
                          </div>
                          <a
                            className="p-2 text-primary transition-colors hover:text-brand-emerald"
                            href={resourceMailto}
                            title="Request Guidance Leaflet"
                          >
                            <MaterialIcon name="download" className="text-[22px]" />
                          </a>
                        </div>
                      </div>
                    </section>
                  </>
                ) : null}
              </article>

              <aside className="flex flex-col gap-space-md lg:sticky lg:top-24 lg:col-span-4">
                <ShareArticleActions title={article.title} />

                <div className="flex flex-col gap-space-sm rounded-2xl bg-primary p-space-md text-on-primary shadow-sm">
                  <div className="flex items-center gap-space-2xs text-accent-gold">
                    <MaterialIcon name="badge" className="text-[20px]" />
                    <span className="font-label text-label-eyebrow font-semibold tracking-wider uppercase">
                      Civic Press Secretariat
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline text-headline-sm font-bold text-on-primary">
                      {siteContact.contactName}
                    </h3>
                    <p className="font-body text-body-sm text-surface-container-highest/80">
                      Head of Communications &amp; Civic Engagement
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 font-body text-body-sm text-surface-container-highest/90">
                    <a
                      className="flex items-center gap-2 hover:underline"
                      href={siteContact.emailHref}
                    >
                      <MaterialIcon
                        name="mail"
                        className="text-[18px] text-brand-mint"
                      />
                      <span className="truncate">{siteContact.email}</span>
                    </a>
                    <a
                      className="flex items-center gap-2 hover:underline"
                      href={siteContact.phoneHref}
                    >
                      <MaterialIcon
                        name="call"
                        className="text-[18px] text-brand-mint"
                      />
                      <span>{siteContact.phoneDisplay}</span>
                    </a>
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        name="location_on"
                        className="text-[18px] text-brand-mint"
                      />
                      <span>Town Hall Liaison Desk, Peterborough</span>
                    </div>
                  </div>
                  <Link
                    href={getInvolvedWhatsApp}
                    className="mt-space-2xs inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-mint px-space-md py-space-2xs font-label text-label-lg font-bold text-on-primary-fixed transition-colors hover:bg-primary-fixed"
                  >
                    <MaterialIcon name="forum" className="text-[20px]" />
                    Direct Inquiries via Get Involved
                  </Link>
                </div>

                <div className="flex flex-col gap-space-xs rounded-2xl bg-surface-card p-space-md shadow-sm">
                  <h3 className="font-label text-label-eyebrow font-bold tracking-wider text-text-muted uppercase">
                    On This Page
                  </h3>
                  <nav className="flex flex-col gap-1 font-body text-body-sm">
                    <a
                      href="#summary"
                      className="flex items-center gap-2 py-1 text-on-surface transition-colors hover:text-primary"
                    >
                      <MaterialIcon
                        name="arrow_right"
                        className="text-[14px] text-brand-emerald"
                      />
                      Executive Summary
                    </a>
                    <a
                      href="#background"
                      className="flex items-center gap-2 py-1 text-on-surface transition-colors hover:text-primary"
                    >
                      <MaterialIcon
                        name="arrow_right"
                        className="text-[14px] text-brand-emerald"
                      />
                      {showCivicExtras
                        ? "Background & Healthcare Link"
                        : "Full Story"}
                    </a>
                    {showCivicExtras ? (
                      <>
                        <a
                          href="#four-pillars"
                          className="flex items-center gap-2 py-1 text-on-surface transition-colors hover:text-primary"
                        >
                          <MaterialIcon
                            name="arrow_right"
                            className="text-[14px] text-brand-emerald"
                          />
                          The 4 Core Accord Pillars
                        </a>
                        <a
                          href="#leadership-quotes"
                          className="flex items-center gap-2 py-1 text-on-surface transition-colors hover:text-primary"
                        >
                          <MaterialIcon
                            name="arrow_right"
                            className="text-[14px] text-brand-emerald"
                          />
                          Leadership Quotations
                        </a>
                        <a
                          href="#resources"
                          className="flex items-center gap-2 py-1 text-on-surface transition-colors hover:text-primary"
                        >
                          <MaterialIcon
                            name="arrow_right"
                            className="text-[14px] text-brand-emerald"
                          />
                          Official PDF Downloads
                        </a>
                      </>
                    ) : null}
                  </nav>
                </div>

                <div className="flex flex-col gap-space-xs rounded-2xl bg-surface-tinted p-space-md shadow-sm">
                  <div className="flex items-center gap-2 text-primary">
                    <MaterialIcon
                      name="notifications_active"
                      className="text-[20px]"
                    />
                    <h3 className="font-headline text-headline-sm font-bold">
                      Stay Informed
                    </h3>
                  </div>
                  <p className="font-body text-body-sm text-text-secondary">
                    Get real-time civic bulletins, student housing alerts, and NHS
                    job relocations.
                  </p>
                  <NewsBulletinForm />
                </div>
              </aside>
            </div>
          </div>
        </section>

        {related.length > 0 ? (
          <section className="w-full bg-surface-stone py-space-2xl">
            <div className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop">
              <div className="mb-space-lg flex flex-wrap items-end justify-between gap-space-sm">
                <div>
                  <span className="font-label text-label-eyebrow font-bold tracking-wider text-brand-emerald uppercase">
                    Connected Coverage
                  </span>
                  <h2 className="mt-1 font-headline text-headline-lg font-extrabold tracking-tight text-on-surface">
                    Related Community Stories
                  </h2>
                </div>
                <Link
                  href="/news"
                  className="flex items-center gap-1 font-label text-label-lg font-semibold text-secondary transition-colors hover:text-primary"
                >
                  View all stories{" "}
                  <MaterialIcon name="east" className="text-[18px]" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-space-md md:grid-cols-3">
                {related.map((item) => {
                  const itemCat = inferNewsCategory(item.title, item.summary);
                  return (
                    <article
                      key={item.id}
                      className="group flex flex-col overflow-hidden rounded-2xl bg-surface-card shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="relative h-48 w-full overflow-hidden bg-surface-container">
                        {item.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.imageUrl}
                            alt={item.imageAlt ?? item.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            width={640}
                            height={360}
                            loading="lazy"
                          />
                        ) : (
                          <CommunityPhoto
                            credit={relatedCredit(item)}
                            className="transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
                        <span className="absolute top-3 left-3 rounded-full bg-surface-card px-2.5 py-1 text-xs font-semibold text-on-surface shadow-sm">
                          {newsCategoryLabel(itemCat)}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-space-md">
                        <div>
                          <p className="mb-1 font-body text-body-sm text-text-muted">
                            {formatNewsCardDate(item.publishedAt)} •{" "}
                            {newsCategoryLabel(itemCat)}
                          </p>
                          <h3 className="font-headline text-headline-sm leading-snug font-bold text-on-surface transition-colors group-hover:text-primary">
                            <Link href={`/news/${item.slug}`}>{item.title}</Link>
                          </h3>
                          {item.summary ? (
                            <p className="mt-2 line-clamp-2 font-body text-body-sm text-text-secondary">
                              {item.summary}
                            </p>
                          ) : null}
                        </div>
                        <Link
                          href={`/news/${item.slug}`}
                          className="flex items-center pt-space-sm font-label text-label-md font-semibold text-primary transition-transform group-hover:translate-x-1"
                        >
                          Read announcement{" "}
                          <MaterialIcon
                            name="arrow_forward"
                            className="ml-1 text-[16px]"
                          />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        <section className="w-full bg-surface-canvas py-space-xl">
          <div className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop">
            <div className="flex flex-col items-center justify-between gap-space-md rounded-2xl bg-surface-tinted p-space-lg shadow-sm md:flex-row lg:p-space-xl">
              <div className="max-w-2xl text-center md:text-left">
                <span className="font-label text-label-eyebrow font-bold tracking-wider text-brand-emerald uppercase">
                  Have a Voice
                </span>
                <h2 className="mt-1 font-headline text-headline-lg font-bold text-primary">
                  Have a story, civic proposal, or community question?
                </h2>
                <p className="mt-2 font-body text-body-md text-text-secondary">
                  The NCP secretariat actively reviews neighbourhood suggestions,
                  collaborative partnership inquiries, and diasporic welfare
                  matters.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center justify-center gap-space-xs">
                <a
                  href={submitMailto}
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg font-bold text-on-primary shadow-sm transition-all hover:bg-primary-container"
                >
                  Submit Community News
                </a>
                <a
                  href={contactMailto}
                  className="inline-flex items-center justify-center rounded-lg bg-surface-card px-space-md py-space-2xs font-label text-label-lg font-bold text-primary shadow-sm transition-all hover:bg-surface-stone"
                >
                  Contact EXCO Secretariat
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
