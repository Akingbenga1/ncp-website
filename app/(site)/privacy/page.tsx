import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/MaterialIcon";
import { siteContact } from "@/data/site-contact";
import { getAppServices } from "@/lib/composition";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Nigerian Community Peterborough handles personal data for membership, directory, and donations.",
};

const proseClass =
  "rounded-2xl bg-surface-card p-6 shadow-sm sm:p-8 md:p-10 [&_a]:font-semibold [&_a]:text-brand-emerald [&_a]:underline-offset-2 hover:[&_a]:underline [&_h2]:mt-8 [&_h2]:scroll-mt-28 [&_h2]:font-headline [&_h2]:text-headline-sm [&_h2]:font-bold [&_h2]:text-on-surface [&_h2:first-child]:mt-0 [&_li]:mt-2 [&_p]:mt-3 [&_p]:font-body [&_p]:text-body-md [&_p]:leading-relaxed [&_p]:text-text-secondary [&_strong]:text-on-surface [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:font-body [&_ul]:text-body-md [&_ul]:text-text-secondary";

const TOC = [
  ["privacy-controller", "Who is responsible"],
  ["privacy-collect", "What we collect"],
  ["privacy-membership", "Membership"],
  ["privacy-market", "Market directory"],
  ["privacy-donations", "Donations"],
  ["privacy-cookies", "Cookies"],
  ["privacy-rights", "Your rights"],
  ["privacy-retention", "How long we keep data"],
] as const;

/**
 * Production privacy policy (Task 7.5).
 * Charity registration line fills when PaymentPort has NH-2 identity.
 */
export default async function PrivacyPage() {
  const { payments } = getAppServices();
  const charityIdentity = await payments.getCharityIdentity();
  const controllerName =
    charityIdentity?.registeredName ?? siteContact.organisation;

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
              <span className="font-semibold text-primary">Privacy policy</span>
            </nav>
            <Link
              href="/cookies"
              className="inline-flex items-center gap-space-3xs font-label text-label-md font-semibold text-primary transition-colors hover:text-primary-container"
            >
              Cookie notice
              <MaterialIcon name="arrow_forward" className="text-[18px]" />
            </Link>
          </div>

          <div className="max-w-3xl">
            <div className="mb-space-2xs inline-flex items-center gap-space-2xs rounded-full bg-surface-tinted px-space-xs py-space-3xs font-label text-label-eyebrow tracking-wider text-primary uppercase">
              <MaterialIcon
                name="policy"
                className="text-[16px] text-brand-emerald"
              />
              Legal
            </div>
            <h1 className="mb-space-2xs font-headline text-headline-xl tracking-tight text-text-primary">
              Privacy policy
            </h1>
            <p className="font-body text-body-lg text-text-secondary">
              How {siteContact.organisation} collects and uses personal data for
              membership, the Market directory, and donations.
            </p>
          </div>
        </div>
      </section>

      <section
        className="w-full py-space-xl"
        aria-labelledby="privacy-controller"
      >
        <div className="mx-auto grid max-w-container-max grid-cols-1 items-start gap-8 px-gutter-mobile pb-space-2xl lg:grid-cols-12 lg:px-gutter-desktop">
          <article className={`${proseClass} lg:col-span-8`}>
            <h2 id="privacy-controller">Who is responsible</h2>
            <p>
              The data controller is <strong>{controllerName}</strong>
              {charityIdentity
                ? `, registered charity number ${charityIdentity.charityNumber}`
                : " (registered charity — number to be confirmed)"}
              . This page is the production privacy policy for the public
              website; charity registration details will be confirmed with NCP
              when available.
            </p>
            <p>
              For privacy questions or data requests (access, correction, or
              deletion), contact{" "}
              <a href={siteContact.emailHref}>{siteContact.contactName}</a> (
              <a href={siteContact.emailHref}>{siteContact.email}</a>) or the{" "}
              {siteContact.excoLabel} (
              <a href={siteContact.phoneHref}>{siteContact.phoneDisplay}</a>).
            </p>

            <h2 id="privacy-collect">What we collect</h2>
            <p>Depending on how you use the site, we may process:</p>
            <ul>
              <li>
                Membership details you provide when you register or update your
                profile (name, email, involvement preferences, and related
                account fields).
              </li>
              <li>
                Directory suggestions you submit for the Market (business or
                group details and optional contact information).
              </li>
              <li>
                Donation and Gift Aid details needed to complete a gift and keep
                financial records (amount, contact details you give, and Gift Aid
                declaration fields when you opt in).
              </li>
              <li>
                Technical session data needed to keep you signed in (essential
                cookies — see our <Link href="/cookies">cookie notice</Link>).
              </li>
            </ul>

            <h2 id="privacy-membership">Membership</h2>
            <p>
              Member accounts let you register, sign in, and edit your own
              profile. We process this data so we can run community programmes
              and communicate about your membership.
            </p>
            <p>
              <strong>Lawful basis:</strong> consent (recorded at registration)
              and legitimate interests in administering membership. You can
              update your profile when signed in. To delete your account or
              related data, contact {siteContact.contactName} or the{" "}
              {siteContact.excoLabel}; admins can remove member records in our
              systems.
            </p>

            <h2 id="privacy-market">Market directory and listings</h2>
            <p>
              Anyone can suggest a listing. Suggestions stay unpublished until
              an admin approves them. We use the details you send to review and,
              if approved, publish the listing for the community.
            </p>
            <p>
              <strong>Lawful basis:</strong> consent (required on the suggest
              form) and legitimate interests in maintaining a community
              directory. To change or remove a published listing, contact us
              using the details above.
            </p>

            <h2 id="privacy-donations">Donations</h2>
            <p>
              When you donate by card or bank transfer, we process payment and
              contact details as needed to complete the gift and keep accounting
              records. If you opt into Gift Aid, we also keep the name and
              address you provide so Gift Aid can be claimed where eligible.
            </p>
            <p>
              <strong>Lawful basis:</strong> legitimate interests and/or legal
              obligation for financial records, and consent where you opt into
              Gift Aid. Card payments are processed by our payment provider; we
              do not store full card numbers on this website.
            </p>

            <h2 id="privacy-cookies">Cookies</h2>
            <p>
              At launch we use essential cookies only (for example signed-in
              sessions). We do not set non-essential analytics or marketing
              cookies without a further consent step. Full details are in our{" "}
              <Link href="/cookies">cookie notice</Link>.
            </p>

            <h2 id="privacy-rights">Your rights</h2>
            <p>
              Under UK GDPR you can ask for a copy of your personal data, ask us
              to correct it, or ask us to delete it where applicable. You may
              also withdraw consent where processing is based on consent (for
              example Gift Aid opt-in or directory suggestions), without
              affecting the lawfulness of processing before withdrawal. Contact{" "}
              {siteContact.contactName} or the {siteContact.excoLabel} to make a
              request. You can also complain to the Information Commissioner’s
              Office (ICO) if you are unhappy with how we handle your data.
            </p>

            <h2 id="privacy-retention">How long we keep data</h2>
            <p>
              We keep membership and directory records while they are needed to
              run NCP programmes, and donation / Gift Aid records for as long as
              required for charity and tax accounting. When data is no longer
              needed, we delete or anonymise it where practical.
            </p>

            {!charityIdentity ? (
              <p className="!mt-6 rounded-xl bg-surface-stone px-4 py-3 !text-text-muted">
                Registered charity name and number (NH-2) are not yet confirmed.
                Controller wording above uses {siteContact.organisation} until
                those details are provided.
              </p>
            ) : null}
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
                  <MaterialIcon name="support_agent" className="text-[18px]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-headline text-sm font-bold text-on-surface">
                    Privacy questions
                  </h3>
                  <p className="font-body text-xs leading-relaxed text-text-secondary">
                    Contact{" "}
                    <a
                      className="font-semibold text-brand-emerald hover:underline"
                      href={siteContact.emailHref}
                    >
                      {siteContact.contactName}
                    </a>{" "}
                    or the {siteContact.excoLabel} (
                    <a
                      className="font-semibold text-brand-emerald hover:underline"
                      href={siteContact.phoneHref}
                    >
                      {siteContact.phoneDisplay}
                    </a>
                    ).
                  </p>
                  <Link
                    href="/cookies"
                    className="inline-flex items-center gap-1.5 font-label text-xs font-bold text-primary hover:text-brand-emerald"
                  >
                    Cookie notice
                    <MaterialIcon name="arrow_forward" className="text-[14px]" />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
