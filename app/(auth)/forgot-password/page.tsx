import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import { MaterialIcon } from "@/components/MaterialIcon";
import { siteContact } from "@/data/site-contact";

export const metadata: Metadata = {
  title: "Forgot password",
  description:
    "Request a password reset link for your Nigerian Community Peterborough membership.",
};

const STEPS = [
  {
    icon: "mail",
    title: "Enter your membership email",
    body: "Use the same address you registered with. We only send a link if an account exists.",
  },
  {
    icon: "link",
    title: "Open the one-time link",
    body: "Check your inbox and spam folder. The link works once and then expires.",
  },
  {
    icon: "password",
    title: "Choose a new password",
    body: "Pick at least 6 characters, then sign in to manage your profile and RSVP to events.",
  },
] as const;

export default function ForgotPasswordPage() {
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
            <span className="font-semibold text-primary">Forgot password</span>
          </nav>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-surface-tinted px-3 py-1 font-label text-label-eyebrow tracking-wider text-primary uppercase">
            <MaterialIcon
              name="verified_user"
              className="text-[16px] text-brand-emerald"
            />
            <span>Member Portal</span>
          </div>

          <h1 className="max-w-2xl font-headline text-headline-xl-mobile font-bold tracking-tight text-on-surface md:text-headline-xl">
            Forgot your NCP password?
          </h1>
          <p className="mt-3 max-w-3xl font-body text-body-md leading-relaxed text-text-secondary md:text-body-lg">
            Request a one-time link to choose a new password for your free NCP
            membership account.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <ForgotPasswordForm />

          <aside className="flex flex-col gap-6 lg:col-span-5">
            <div className="rounded-2xl bg-surface-tinted p-6 shadow-sm sm:p-8">
              <div className="mb-2 flex items-center gap-2">
                <MaterialIcon
                  name="shield"
                  className="text-[22px] text-brand-emerald"
                />
                <h2 className="font-headline text-headline-sm font-bold text-primary">
                  How a reset works
                </h2>
              </div>
              <p className="mb-6 font-body text-xs text-text-secondary sm:text-sm">
                We never reveal whether an email is registered. The message is
                the same either way.
              </p>
              <ul className="space-y-4">
                {STEPS.map((item) => (
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
                    Trouble receiving the email?
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
