import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/MaterialIcon";
import { siteContact } from "@/data/site-contact";

export const metadata: Metadata = {
  title: "Cookie notice",
  description:
    "How Nigerian Community Peterborough uses essential cookies on this website.",
};

const proseClass =
  "rounded-2xl bg-surface-card p-6 shadow-sm sm:p-8 md:p-10 [&_a]:font-semibold [&_a]:text-brand-emerald [&_a]:underline-offset-2 hover:[&_a]:underline [&_h2]:mt-8 [&_h2]:scroll-mt-28 [&_h2]:font-headline [&_h2]:text-headline-sm [&_h2]:font-bold [&_h2]:text-on-surface [&_h2:first-child]:mt-0 [&_p]:mt-3 [&_p]:font-body [&_p]:text-body-md [&_p]:leading-relaxed [&_p]:text-text-secondary";

const TOC = [
  ["cookies-essential", "Essential cookies"],
  ["cookies-not-used", "What we do not use"],
  ["cookies-managing", "Managing cookies"],
] as const;

/**
 * Essential-only cookie notice (Task 7.6).
 * Non-essential analytics would need consent (NH-10) — not enabled at launch.
 */
export default function CookiesPage() {
  return (
    <main id="main" className="w-full flex-grow bg-surface pt-20">
      <section className="w-full bg-surface-stone/60 py-space-md">
        <div className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop">
          <div className="mb-space-sm flex flex-wrap items-center justify-between gap-space-xs">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-space-3xs font-label text-label-md text-text-muted"
            >
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <MaterialIcon name="chevron_right" className="text-[16px]" />
              <Link
                href="/privacy"
                className="transition-colors hover:text-primary"
              >
                Privacy
              </Link>
              <MaterialIcon name="chevron_right" className="text-[16px]" />
              <span className="font-semibold text-primary">Cookie notice</span>
            </nav>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-space-3xs font-label text-label-md font-semibold text-primary transition-colors hover:text-primary-container"
            >
              Privacy policy
              <MaterialIcon name="arrow_forward" className="text-[18px]" />
            </Link>
          </div>

          <div className="max-w-3xl">
            <div className="mb-space-2xs inline-flex items-center gap-space-2xs rounded-full bg-surface-tinted px-space-xs py-space-3xs font-label text-label-eyebrow tracking-wider text-primary uppercase">
              <MaterialIcon
                name="cookie"
                className="text-[16px] text-brand-emerald"
              />
              Legal
            </div>
            <h1 className="mb-space-2xs font-headline text-headline-xl tracking-tight text-text-primary">
              Cookie notice
            </h1>
            <p className="font-body text-body-lg text-text-secondary">
              {siteContact.organisation} uses essential cookies only at launch —
              no analytics or marketing cookies without a further consent step.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-space-xl" aria-labelledby="cookies-essential">
        <div className="mx-auto grid max-w-container-max grid-cols-1 items-start gap-8 px-gutter-mobile pb-space-2xl lg:grid-cols-12 lg:px-gutter-desktop">
          <article className={`${proseClass} lg:col-span-8`}>
            <h2 id="cookies-essential">Essential cookies</h2>
            <p>
              Essential cookies are needed for the site to work as you expect.
              We set an httpOnly session cookie when you sign in so we can keep
              you logged in securely across pages. That cookie is not readable
              by scripts in the browser.
            </p>
            <p>
              Without that cookie, membership features (sign-in, profile, and
              related account actions) cannot work.
            </p>

            <h2 id="cookies-not-used">What we do not use at launch</h2>
            <p>
              We do not set non-essential cookies for analytics, advertising, or
              social tracking on this website at launch. If NCP later chooses
              analytics (NH-10), we will update this notice and only enable
              non-essential cookies after an accessible consent choice.
            </p>

            <h2 id="cookies-managing">Managing cookies</h2>
            <p>
              You can clear cookies in your browser settings at any time. Clearing
              the session cookie will sign you out. For how we use personal data
              more broadly, see our <Link href="/privacy">privacy policy</Link>.
            </p>

            <p className="!mt-6 rounded-xl bg-surface-stone px-4 py-3 !text-text-muted">
              Questions about cookies or privacy:{" "}
              <a href={siteContact.emailHref}>{siteContact.contactName}</a> or
              the {siteContact.excoLabel} (
              <a href={siteContact.phoneHref}>{siteContact.phoneDisplay}</a>).
            </p>
          </article>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:col-span-4">
            <nav
              aria-label="On this page"
              className="rounded-2xl bg-surface-tinted p-6 shadow-sm"
            >
              <p className="mb-4 font-label text-label-eyebrow tracking-wider text-primary uppercase">
                On this page
              </p>
              <ul className="space-y-2">
                {TOC.map(([id, label]) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="font-label text-sm font-semibold text-on-surface transition-colors hover:text-brand-emerald"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="rounded-2xl bg-surface-card p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-tinted text-primary">
                  <MaterialIcon name="shield" className="text-[18px]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-headline text-sm font-bold text-on-surface">
                    Essential only
                  </h3>
                  <p className="font-body text-xs leading-relaxed text-text-secondary">
                    We do not set analytics or marketing cookies at launch. See
                    the full{" "}
                    <Link
                      className="font-semibold text-brand-emerald hover:underline"
                      href="/privacy"
                    >
                      privacy policy
                    </Link>{" "}
                    for how personal data is used.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
