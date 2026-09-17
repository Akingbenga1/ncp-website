import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/MaterialIcon";
import { RegisterForm } from "@/components/RegisterForm";
import { siteContact } from "@/data/site-contact";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Create your free Nigerian Community Peterborough membership — active immediately.",
};

const BENEFITS = [
  {
    icon: "storefront",
    title: "Manage & Post Market Offerings",
    body: "List your food, catering, tailoring, or professional services in the verified NCP Directory with direct inquiries.",
  },
  {
    icon: "confirmation_number",
    title: "1-Click Event RSVPs",
    body: "Reserve member seats for Independence Day celebrations, family picnics, and youth mentorship workshops.",
  },
  {
    icon: "loyalty",
    title: "Exclusive Member Perks",
    body: "Access community discounts at participating African food stores and registered partner businesses.",
  },
  {
    icon: "campaign",
    title: "Community Voice & Governance",
    body: "Read official EXCO updates, cast votes during general elections, and access AGM minutes directly.",
  },
] as const;

export default function RegisterPage() {
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
              href="/get-involved"
              className="font-medium transition-colors hover:text-primary"
            >
              Membership
            </Link>
            <MaterialIcon
              name="chevron_right"
              className="text-[14px] text-outline"
            />
            <span className="font-semibold text-primary">Register</span>
          </nav>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-surface-tinted px-3 py-1 font-label text-label-eyebrow tracking-wider text-primary uppercase">
            <MaterialIcon
              name="verified_user"
              className="text-[16px] text-brand-emerald"
            />
            <span>Member Portal</span>
          </div>

          <h1 className="max-w-2xl font-headline text-headline-xl-mobile font-bold tracking-tight text-on-surface md:text-headline-xl">
            Create your free NCP membership
          </h1>
          <p className="mt-3 max-w-3xl font-body text-body-md leading-relaxed text-text-secondary md:text-body-lg">
            Join Nigerian Community Peterborough. Registration is free and your
            account is active straight away — no approval wait. Stay connected
            with 1,400+ Nigerian families across Peterborough &amp;
            Cambridgeshire.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <RegisterForm />

          <aside className="flex flex-col gap-6 lg:col-span-5">
            <div className="rounded-2xl bg-surface-tinted p-6 shadow-sm sm:p-8">
              <div className="mb-2 flex items-center gap-2">
                <MaterialIcon
                  name="diversity_3"
                  className="text-[22px] text-brand-emerald"
                />
                <h2 className="font-headline text-headline-sm font-bold text-primary">
                  Why join NCP?
                </h2>
              </div>
              <p className="mb-6 font-body text-xs text-text-secondary sm:text-sm">
                Your single account opens the entire diaspora ecosystem across
                Cambridgeshire.
              </p>
              <ul className="space-y-4">
                {BENEFITS.map((item) => (
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

              <div className="mt-6 rounded-xl bg-surface-card/70 p-4 pt-5 shadow-sm">
                <div className="mb-2 flex items-center gap-1 text-accent-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <MaterialIcon
                      key={i}
                      name="star"
                      filled
                      className="text-[16px]"
                    />
                  ))}
                </div>
                <p className="font-body text-xs leading-relaxed text-on-surface italic sm:text-sm">
                  “Being part of NCP made relocating to Peterborough feel like
                  coming home. The directory and events kept our family plugged
                  in from day one.”
                </p>
                <div className="mt-3 flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-emerald text-xs font-bold text-on-primary">
                    TO
                  </div>
                  <div>
                    <p className="font-label text-xs leading-none font-bold text-on-surface">
                      {siteContact.contactName}
                    </p>
                    <p className="mt-0.5 font-body text-[11px] text-text-muted">
                      Peterborough Resident &amp; Community Member
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-surface-card p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-tinted text-primary">
                  <MaterialIcon name="support_agent" className="text-[18px]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline text-sm font-bold text-on-surface">
                    Questions about joining?
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
