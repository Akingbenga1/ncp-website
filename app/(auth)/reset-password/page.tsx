import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/MaterialIcon";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { siteContact } from "@/data/site-contact";

export const metadata: Metadata = {
  title: "Reset password",
  description:
    "Choose a new password for your Nigerian Community Peterborough membership.",
};

type ResetPasswordPageProps = {
  searchParams: Promise<{ token?: string | string[] }>;
};

const TIPS = [
  {
    icon: "pin",
    title: "At least 6 characters",
    body: "Pick something you will remember, and avoid reusing a password from another site.",
  },
  {
    icon: "vpn_key",
    title: "One-time link",
    body: "This page only works from the email we sent. If the link is old, request a new one.",
  },
  {
    icon: "login",
    title: "Sign in afterwards",
    body: "Once the password is updated you can sign in and manage your profile as usual.",
  },
] as const;

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;
  const raw = params.token;
  const token = typeof raw === "string" ? raw.trim() : "";

  return (
    <main id="main" className="w-full flex-1">
      <div className="relative mx-auto w-full max-w-container-max px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="pointer-events-none absolute top-12 left-1/4 -z-10 h-96 w-96 rounded-full bg-secondary-fixed/30 blur-3xl" />
        <div className="pointer-events-none absolute right-10 bottom-10 -z-10 h-80 w-80 rounded-full bg-surface-tinted blur-2xl" />

        <div className="mb-8 md:mb-12">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-2 font-body text-body-sm text-text-muted"
          >
            <Link
              href="/"
              className="flex items-center gap-1 font-medium transition-colors hover:text-primary"
            >
              <MaterialIcon name="home" className="text-[18px]" />
              <span>Home</span>
            </Link>
            <MaterialIcon
              name="chevron_right"
              className="text-[14px] text-outline"
            />
            <Link
              href="/login"
              className="font-medium transition-colors hover:text-primary"
            >
              Sign In
            </Link>
            <MaterialIcon
              name="chevron_right"
              className="text-[14px] text-outline"
            />
            <span className="font-semibold text-primary">Reset password</span>
          </nav>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-surface-tinted px-3 py-1 font-label text-label-eyebrow tracking-wider text-primary uppercase">
            <MaterialIcon
              name="verified_user"
              className="text-[16px] text-brand-emerald"
            />
            <span>Member Portal</span>
          </div>

          <h1 className="max-w-2xl font-headline text-headline-xl-mobile font-bold tracking-tight text-on-surface md:text-headline-xl">
            Choose a new NCP password
          </h1>
          <p className="mt-3 max-w-3xl font-body text-body-md leading-relaxed text-text-secondary md:text-body-lg">
            Choose a new password for your free NCP membership account.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <ResetPasswordForm token={token} />

          <aside className="flex flex-col gap-6 lg:col-span-5">
            <div className="rounded-2xl bg-surface-tinted p-6 shadow-sm sm:p-8">
              <div className="mb-2 flex items-center gap-2">
                <MaterialIcon
                  name="shield"
                  className="text-[22px] text-brand-emerald"
                />
                <h2 className="font-headline text-headline-sm font-bold text-primary">
                  Keep your account safe
                </h2>
              </div>
              <p className="mb-6 font-body text-xs text-text-secondary sm:text-sm">
                A strong password protects your profile, RSVPs, and directory
                listings.
              </p>
              <ul className="space-y-4">
                {TIPS.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary-fixed text-on-secondary-fixed">
                      <MaterialIcon
                        name={item.icon}
                        className="text-[15px] font-bold"
                      />
                    </div>
                    <div>
                      <p className="font-label text-sm font-semibold text-on-surface">
                        {item.title}
                      </p>
                      <p className="mt-0.5 font-body text-xs leading-relaxed text-text-secondary">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-surface-card p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-tinted text-primary">
                  <MaterialIcon name="support_agent" className="text-[18px]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline text-sm font-bold text-on-surface">
                    Link not working?
                  </h3>
                  <p className="font-body text-xs leading-relaxed text-text-secondary">
                    Contact our community support team at{" "}
                    <a
                      className="font-semibold text-brand-emerald hover:underline"
                      href={siteContact.emailHref}
                    >
                      {siteContact.email}
                    </a>{" "}
                    or message the EXCO Helpline:
                  </p>
                  <div className="pt-2">
                    <a
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-colors hover:text-brand-emerald"
                      href={siteContact.phoneHref}
                    >
                      <MaterialIcon name="call" className="text-[16px]" />
                      <span>
                        {siteContact.phoneDisplay} (Mon–Sat 9am–6pm)
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-surface-stone px-4 py-3 font-body text-xs text-text-muted">
                <MaterialIcon
                  name="shield"
                  className="text-[16px] text-brand-emerald"
                />
                <span>
                  We respect UK GDPR. Your details are never sold or shared
                  outside NCP.
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
