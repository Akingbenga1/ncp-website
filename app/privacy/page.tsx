import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { siteContact } from "@/data/site-contact";
import { getAppServices } from "@/lib/composition";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Nigerian Community Peterborough handles personal data for membership, directory, and donations.",
};

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
    <main id="main">
      <header className="page-hero page-hero--banner">
        <div className="wrap">
          <p className="hero-kicker">Legal</p>
          <h1>Privacy policy</h1>
          <p className="hero-lead hero-lead-inline">
            How {siteContact.organisation} collects and uses personal data for
            membership, the Market directory, and donations.
          </p>
        </div>
      </header>

      <section className="section section-overlap" aria-labelledby="privacy-body">
        <div className="wrap content-detail">
          <Reveal className="home2-glass content-detail-panel" variant="up">
            <h2 id="privacy-body">Who is responsible</h2>
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

            <h2>What we collect</h2>
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
                cookies — see our{" "}
                <Link href="/cookies">cookie notice</Link>).
              </li>
            </ul>

            <h2>Membership</h2>
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

            <h2>Market directory and listings</h2>
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

            <h2>Donations</h2>
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

            <h2>Cookies</h2>
            <p>
              At launch we use essential cookies only (for example signed-in
              sessions). We do not set non-essential analytics or marketing
              cookies without a further consent step. Full details are in our{" "}
              <Link href="/cookies">cookie notice</Link>.
            </p>

            <h2>Your rights</h2>
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

            <h2>How long we keep data</h2>
            <p>
              We keep membership and directory records while they are needed to
              run NCP programmes, and donation / Gift Aid records for as long as
              required for charity and tax accounting. When data is no longer
              needed, we delete or anonymise it where practical.
            </p>

            {!charityIdentity ? (
              <p className="form-note">
                Registered charity name and number (NH-2) are not yet confirmed.
                Controller wording above uses {siteContact.organisation} until
                those details are provided.
              </p>
            ) : null}

            <p className="content-detail-back">
              <Link className="btn btn-primary" href="/cookies">
                Cookie notice
              </Link>
              <Link className="btn btn-primary" href="/">
                Home
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
