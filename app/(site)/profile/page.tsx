import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MaterialIcon } from "@/components/MaterialIcon";
import {
  ProfileForm,
  ProfileHeroActions,
  ProfileSignOut,
} from "@/components/ProfileForm";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { communityPhotos } from "@/data/pixabay-credits";
import { siteContact } from "@/data/site-contact";
import { getAppServices } from "@/lib/composition";
import { involvementInterestLabel } from "@/lib/domain/member";
import {
  formatMemberCode,
  initialsFromName,
} from "@/lib/format/member-ui";

export const metadata: Metadata = {
  title: "Your profile",
  description:
    "Manage your Nigerian Community Peterborough membership details and digital member pass.",
};

const PERKS = [
  {
    title: "10% Off Groceries",
    badge: "Local stores",
    body: "Ask participating Afro-Caribbean markets to honour your NCP member status at the counter.",
  },
  {
    title: "Community Hub Access",
    badge: "Members",
    body: "Priority booking for fellowship rooms and newcomer welcome sessions when announced.",
  },
  {
    title: "AGM Voting Rights",
    badge: "Verified",
    body: "Constitutional voting for EXCO elections once your membership record is active.",
  },
] as const;

const ENGAGE = [
  {
    href: "/market",
    icon: "storefront",
    title: "Browse the Market",
    body: "Find verified diaspora traders, caterers, and services across Peterborough.",
  },
  {
    href: "/events",
    icon: "event",
    title: "Upcoming events",
    body: "RSVP to Cultural Day, meet & greets, and youth programmes.",
  },
  {
    href: "/market/suggest",
    icon: "add_business",
    title: "List your business",
    body: "Suggest a Market directory listing for EXCO review and approval.",
  },
  {
    href: "/get-involved",
    icon: "volunteer_activism",
    title: "Volunteer with NCP",
    body: "Join welfare, events, and mentorship teams supporting local families.",
  },
] as const;

export default async function ProfilePage() {
  const { auth, members, dues } = getAppServices();
  const session = await auth.getSession();
  if (!session) {
    redirect("/login");
  }

  const profile = await members.getOwnProfile();
  if (!profile) {
    redirect("/login");
  }

  const duesStatus = await dues.getStatusForMember(profile.id, profile.email);

  const memberCode = formatMemberCode(profile.id);
  const initials = initialsFromName(profile.displayName);
  const involvementLabel = profile.involvement
    ? involvementInterestLabel(profile.involvement)
    : "Community member";
  const localityLabel = profile.locality?.trim() || "Peterborough";

  return (
    <main id="main" className="min-h-screen w-full flex-grow bg-surface pt-20">
      <div className="flex w-full flex-col">
        <section className="mx-auto w-full max-w-container-max px-gutter-mobile pt-space-lg pb-space-md md:px-gutter-desktop">
          <div className="relative overflow-hidden rounded-xl bg-surface-card shadow-sm">
            <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
            <div className="pointer-events-none absolute top-1/2 -left-20 h-80 w-80 rounded-full bg-accent-gold/10 blur-2xl" />
            <div className="h-3 w-full bg-gradient-to-r from-primary via-brand-emerald to-accent-gold" />

            <div className="p-space-lg md:p-space-xl">
              <div className="flex flex-col items-start justify-between gap-space-lg lg:flex-row lg:items-center">
                <div className="flex flex-col items-start gap-space-md sm:flex-row sm:items-center">
                  <div className="relative shrink-0">
                    <div className="h-28 w-28 rounded-full bg-surface-card p-1 shadow-md sm:h-32 sm:w-32">
                      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-surface-tinted">
                        <span className="font-headline text-headline-lg font-bold text-primary">
                          {initials}
                        </span>
                      </div>
                    </div>
                    <span
                      className="absolute right-1 bottom-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-emerald text-on-primary shadow-sm"
                      title="Verified member"
                    >
                      <MaterialIcon name="verified" className="text-[18px]" />
                    </span>
                  </div>

                  <div className="space-y-space-2xs">
                    <div className="flex flex-wrap items-center gap-space-2xs">
                      <h1 className="font-headline text-headline-xl tracking-tight text-text-primary">
                        {profile.displayName}
                      </h1>
                      <span className="inline-flex items-center gap-1 rounded-full bg-surface-tinted px-space-xs py-1 font-label text-label-eyebrow text-primary uppercase">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-brand-emerald" />
                        NCP Verified
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-space-2xs font-body text-body-sm text-text-secondary">
                      <span className="inline-flex items-center gap-1">
                        <MaterialIcon
                          name="location_on"
                          className="text-[18px] text-primary"
                        />
                        {localityLabel}
                      </span>
                      <span className="text-outline-variant">•</span>
                      <span className="font-label text-label-md text-primary">
                        {involvementLabel}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-space-2xs pt-space-3xs">
                      <span className="inline-flex items-center gap-1 rounded-full bg-surface-container px-space-2xs py-1 font-label text-label-md text-on-surface-variant">
                        <MaterialIcon
                          name="badge"
                          className="text-[16px] text-primary"
                        />
                        {memberCode}
                      </span>
                      {profile.consentGiven ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container px-space-2xs py-1 font-label text-label-md text-on-secondary-container">
                          <MaterialIcon
                            name="shield"
                            className="text-[16px]"
                          />
                          GDPR recorded
                        </span>
                      ) : null}
                      <span className="inline-flex items-center gap-1 rounded-full bg-surface-tinted px-space-2xs py-1 font-label text-label-md text-primary">
                        <MaterialIcon name="mail" className="text-[16px]" />
                        {profile.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-auto">
                  <ProfileHeroActions
                    displayName={profile.displayName}
                    memberCode={memberCode}
                    email={profile.email}
                    duesStatus={duesStatus.status}
                    duesPeriodEndsAt={duesStatus.periodEndsAt}
                  />
                </div>
              </div>

              <div className="mt-space-md flex items-start gap-space-sm rounded-xl bg-surface-container-low p-space-md pt-space-md">
                <MaterialIcon
                  name="format_quote"
                  className="shrink-0 text-[32px] text-primary opacity-80"
                />
                <p className="font-body text-body-md text-on-surface italic">
                  Welcome to your NCP membership hub. Keep your contact details
                  current so EXCO can reach you about events, welfare support,
                  and community opportunities across Peterborough &amp;
                  Cambridgeshire.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-container-max px-gutter-mobile pb-space-3xl md:px-gutter-desktop">
          <div className="grid grid-cols-1 items-start gap-space-lg lg:grid-cols-12">
            <aside className="space-y-space-md lg:col-span-4">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary-container to-secondary p-space-md text-on-primary shadow-md">
                <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-brand-mint/15 blur-xl" />
                <div className="flex items-center justify-between pb-space-sm">
                  <div className="flex items-center gap-space-2xs">
                    <MaterialIcon
                      name="shield_person"
                      className="text-[24px] text-brand-mint"
                    />
                    <span className="font-label text-label-lg tracking-wide uppercase">
                      NCP Digital Identity
                    </span>
                  </div>
                  <span className="rounded bg-on-primary/10 px-space-2xs py-0.5 font-label text-label-eyebrow text-brand-mint">
                    ACTIVE
                  </span>
                </div>
                <div className="flex items-center justify-between py-space-xs">
                  <div>
                    <p className="font-label text-label-eyebrow tracking-wider text-brand-mint uppercase">
                      Cardholder
                    </p>
                    <p className="font-headline text-headline-sm text-on-primary">
                      {profile.displayName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-label text-label-eyebrow tracking-wider text-brand-mint uppercase">
                      Member ID
                    </p>
                    <p className="font-mono text-sm font-semibold tracking-wider text-accent-gold">
                      {memberCode}
                    </p>
                  </div>
                </div>
                <div className="mt-space-xs flex items-center justify-between rounded-lg bg-on-primary/10 p-space-xs pt-space-xs">
                  <div>
                    <span className="block font-label text-[10px] text-on-primary/70 uppercase">
                      Status
                    </span>
                    <span className="font-body text-body-sm font-medium">
                      Free community membership
                    </span>
                  </div>
                  <div className="flex items-center gap-space-3xs text-xs text-brand-mint">
                    <MaterialIcon name="verified" className="text-[16px]" />
                    <span className="font-label text-label-md">Verified</span>
                  </div>
                </div>
                <a
                  href="#edit-profile"
                  className="mt-space-sm flex w-full items-center justify-center gap-space-2xs rounded-lg bg-surface-card py-space-2xs font-label text-label-md text-primary transition-all hover:bg-surface-stone"
                >
                  <MaterialIcon name="edit_note" className="text-[18px]" />
                  <span>Update membership details</span>
                </a>
              </div>

              <div className="space-y-space-sm rounded-xl bg-surface-card p-space-md shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="font-headline text-headline-sm text-text-primary">
                    Membership focus
                  </h2>
                  <MaterialIcon
                    name="workspace_premium"
                    className="text-[20px] text-primary"
                  />
                </div>
                <div className="flex flex-wrap gap-space-2xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface-stone px-space-xs py-1 font-label text-label-md text-on-surface-variant">
                    <MaterialIcon
                      name="check_circle"
                      className="text-[16px] text-brand-emerald"
                    />
                    {involvementLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface-stone px-space-xs py-1 font-label text-label-md text-on-surface-variant">
                    <MaterialIcon
                      name="check_circle"
                      className="text-[16px] text-brand-emerald"
                    />
                    Peterborough diaspora network
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface-stone px-space-xs py-1 font-label text-label-md text-on-surface-variant">
                    <MaterialIcon
                      name="check_circle"
                      className="text-[16px] text-brand-emerald"
                    />
                    Event &amp; welfare updates
                  </span>
                </div>
              </div>

              <div className="space-y-space-sm rounded-xl bg-surface-card p-space-md shadow-sm">
                <h2 className="font-headline text-headline-sm text-text-primary">
                  Preferred reachability
                </h2>
                <div className="space-y-space-xs font-body text-body-sm">
                  <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs">
                    <div className="flex items-center gap-space-2xs">
                      <MaterialIcon
                        name="mail"
                        className="text-primary"
                      />
                      <div>
                        <span className="block font-label text-label-md text-text-primary">
                          Member email
                        </span>
                        <span className="text-xs text-text-muted">
                          {profile.email}
                        </span>
                      </div>
                    </div>
                    <MaterialIcon
                      name="verified"
                      className="text-[18px] text-outline"
                    />
                  </div>
                  {profile.phone ? (
                    <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs">
                      <div className="flex items-center gap-space-2xs">
                        <MaterialIcon
                          name="call"
                          className="text-brand-emerald"
                        />
                        <div>
                          <span className="block font-label text-label-md text-text-primary">
                            Phone
                          </span>
                          <span className="text-xs text-text-muted">
                            {profile.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs">
                    <div className="flex items-center gap-space-2xs">
                      <MaterialIcon
                        name="visibility"
                        className="text-accent-warm-ochre"
                      />
                      <div>
                        <span className="block font-label text-label-md text-text-primary">
                          Directory status
                        </span>
                        <span className="text-xs text-text-muted">
                          Private account — Market listings stay EXCO-reviewed
                        </span>
                      </div>
                    </div>
                    <span className="rounded-full bg-secondary-container px-space-2xs py-0.5 text-[11px] font-semibold text-on-secondary-container">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-space-2xs rounded-xl bg-surface-tinted p-space-md">
                <div className="flex items-center gap-space-2xs text-primary">
                  <MaterialIcon name="home_pin" />
                  <span className="font-headline text-headline-sm">
                    {localityLabel}
                  </span>
                </div>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Keep your area up to date so NCP can share neighbourhood
                  welcomes, meal support, and local event notices.
                </p>
              </div>
            </aside>

            <div className="space-y-space-md lg:col-span-5">
              <div className="overflow-hidden rounded-xl bg-surface-card shadow-sm">
                <div className="relative h-36 w-full">
                  <CommunityPhoto
                    credit={communityPhotos.friendsBlackWomen}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                  <div className="absolute right-0 bottom-0 left-0 p-space-md">
                    <p className="font-label text-label-eyebrow tracking-wider text-brand-mint uppercase">
                      Account centre
                    </p>
                    <h2 className="font-headline text-headline-sm font-bold text-on-primary">
                      Edit your membership details
                    </h2>
                  </div>
                </div>
                <div className="p-space-md md:p-space-lg">
                  <ProfileForm profile={profile} />
                  <div className="mt-space-md border-t border-border-subtle pt-space-md">
                    <ProfileSignOut />
                  </div>
                </div>
              </div>

              <div className="space-y-space-sm">
                <h2 className="font-headline text-headline-sm text-text-primary">
                  Ways to engage
                </h2>
                <div className="grid gap-space-xs">
                  {ENGAGE.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-start gap-space-sm rounded-xl bg-surface-card p-space-md shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-tinted text-primary">
                        <MaterialIcon name={item.icon} className="text-[22px]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-label text-label-lg font-bold text-text-primary group-hover:text-primary">
                          {item.title}
                        </p>
                        <p className="font-body text-body-sm text-text-muted">
                          {item.body}
                        </p>
                      </div>
                      <MaterialIcon
                        name="arrow_forward"
                        className="mt-1 shrink-0 text-[18px] text-text-muted group-hover:text-primary"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-space-md lg:col-span-3">
              <div className="space-y-space-sm rounded-xl bg-surface-card p-space-md shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="font-headline text-headline-sm text-text-primary">
                    Perks wallet
                  </h2>
                  <MaterialIcon
                    name="redeem"
                    className="text-[20px] text-accent-warm-ochre"
                  />
                </div>
                <div className="space-y-space-xs">
                  {PERKS.map((perk, index) => (
                    <div
                      key={perk.title}
                      className={`space-y-1 rounded-lg p-space-xs ${
                        index === 0
                          ? "bg-surface-tinted"
                          : "bg-surface-container-low"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-space-2xs">
                        <span
                          className={`font-label text-label-md font-bold ${
                            index === 0 ? "text-primary" : "text-text-primary"
                          }`}
                        >
                          {perk.title}
                        </span>
                        <span className="rounded bg-surface-card px-1.5 py-0.5 text-[10px] font-semibold text-brand-emerald">
                          {perk.badge}
                        </span>
                      </div>
                      <p className="font-body text-xs text-on-surface-variant">
                        {perk.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-space-xs rounded-xl bg-surface-stone p-space-md">
                <div className="flex items-center gap-space-2xs text-primary">
                  <MaterialIcon
                    name="support_agent"
                    className="text-[20px]"
                  />
                  <h2 className="font-headline text-headline-sm">
                    EXCO Support Desk
                  </h2>
                </div>
                <p className="font-body text-xs text-on-surface-variant">
                  Questions about membership, venue booking, or community
                  welfare relief? Reach {siteContact.contactName}.
                </p>
                <a
                  href={siteContact.phoneHref}
                  className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-surface-card py-space-2xs font-label text-label-md text-primary shadow-sm transition-colors hover:bg-surface-tinted"
                >
                  <MaterialIcon name="call" className="text-[16px]" />
                  <span>Call EXCO Hotline</span>
                </a>
                <a
                  href={siteContact.emailHref}
                  className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-surface-card py-space-2xs font-label text-label-md text-primary shadow-sm transition-colors hover:bg-surface-tinted"
                >
                  <MaterialIcon name="mail" className="text-[16px]" />
                  <span>Email support</span>
                </a>
              </div>

              <div className="overflow-hidden rounded-xl bg-primary p-space-md text-on-primary shadow-sm">
                <p className="font-label text-label-eyebrow tracking-wider text-brand-mint uppercase">
                  Stay connected
                </p>
                <p className="mt-space-2xs font-headline text-headline-sm font-bold">
                  Explore community news &amp; stories
                </p>
                <p className="mt-space-2xs font-body text-body-sm text-on-primary-container">
                  Civic updates, student guides, and EXCO announcements.
                </p>
                <Link
                  href="/news"
                  className="mt-space-sm inline-flex w-full items-center justify-center gap-space-2xs rounded-lg bg-brand-mint px-space-md py-space-2xs font-label text-label-md font-bold text-primary transition-colors hover:bg-primary-fixed"
                >
                  Open News
                  <MaterialIcon name="arrow_forward" className="text-[16px]" />
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
