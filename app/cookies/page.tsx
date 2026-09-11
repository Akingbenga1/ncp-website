import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { siteContact } from "@/data/site-contact";

export const metadata: Metadata = {
  title: "Cookie notice",
  description:
    "How Nigerian Community Peterborough uses essential cookies on this website.",
};

/**
 * Essential-only cookie notice (Task 7.6).
 * Non-essential analytics would need consent (NH-10) — not enabled at launch.
 */
export default function CookiesPage() {
  return (
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <header className="py-space-xl">
        <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
          Legal
        </p>
        <h1 className="mt-space-2xs font-display text-display-lg-mobile font-extrabold tracking-tight text-primary md:text-headline-xl">
          Cookie notice
        </h1>
        <p className="mt-space-sm max-w-2xl font-body text-body-lg text-text-secondary">
          {siteContact.organisation} uses essential cookies only at launch —
          no analytics or marketing cookies without a further consent step.
        </p>
      </header>

      <section className="pb-space-2xl" aria-labelledby="cookies-body">
        <Reveal
          className="rounded-2xl border border-border-subtle bg-surface-card p-space-lg shadow-sm [&_a]:text-brand-emerald [&_a]:underline-offset-2 hover:[&_a]:underline [&_h2]:mt-space-lg [&_h2]:font-headline [&_h2]:text-headline-sm [&_h2]:font-bold [&_h2]:text-primary [&_h2:first-child]:mt-0 [&_p]:mt-space-sm [&_p]:font-body [&_p]:text-body-md [&_p]:text-text-secondary"
          variant="up"
        >
          <h2 id="cookies-body">Essential cookies</h2>
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

          <h2>What we do not use at launch</h2>
          <p>
            We do not set non-essential cookies for analytics, advertising, or
            social tracking on this website at launch. If NCP later chooses
            analytics (NH-10), we will update this notice and only enable
            non-essential cookies after an accessible consent choice.
          </p>

          <h2>Managing cookies</h2>
          <p>
            You can clear cookies in your browser settings at any time. Clearing
            the session cookie will sign you out. For how we use personal data
            more broadly, see our{" "}
            <Link href="/privacy">privacy policy</Link>.
          </p>

          <p className="!mt-space-md rounded-lg bg-surface-stone px-space-sm py-space-2xs !text-text-muted">
            Questions about cookies or privacy:{" "}
            <a href={siteContact.emailHref}>{siteContact.contactName}</a> or
            the {siteContact.excoLabel} (
            <a href={siteContact.phoneHref}>{siteContact.phoneDisplay}</a>).
          </p>

          <p className="mt-space-lg flex flex-wrap gap-space-2xs">
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
              href="/privacy"
            >
              Privacy policy
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
              href="/"
            >
              Home
            </Link>
          </p>
        </Reveal>
      </section>
    </main>
  );
}
