import type { Metadata } from "next";
import Link from "next/link";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { MaterialIcon } from "@/components/MaterialIcon";
import { Reveal } from "@/components/Reveal";
import { VolunteerInterestForm } from "@/components/VolunteerInterestForm";
import { communityPhotos } from "@/data/pixabay-credits";
import { publishedSocialLinks, siteContact } from "@/data/site-contact";
import { logoutAction } from "@/lib/actions/auth";
import { getAppServices } from "@/lib/composition";

export const metadata: Metadata = {
  title: "Get involved",
  description:
    "Join Nigerian Community Peterborough as a member, a volunteer, or a supporter — register free or donate.",
};

const pathways = [
  {
    badge: "01 / Member",
    badgeClass: "text-brand-emerald bg-surface-tinted",
    icon: "badge",
    iconClass: "text-primary",
    blob: "bg-surface-tinted",
    title: "Become a Member",
    body: "Create a free account and stay in the loop with what NCP is doing across Peterborough. Access community announcements, support channels, and civic events.",
    checks: [
      "Instant free access & no waiting list",
      "Townhall invitations & member forums",
      "Peterborough verified community directory",
    ],
    href: "#membership-portal",
    cta: "Register Free",
    ctaIcon: "arrow_forward",
    ctaClass:
      "bg-primary text-on-primary hover:bg-primary-container shadow-sm",
  },
  {
    badge: "02 / Volunteer",
    badgeClass: "text-accent-warm-ochre bg-amber-50",
    icon: "front_hand",
    iconClass: "text-accent-warm-ochre",
    blob: "bg-surface-stone",
    title: "Volunteer With Us",
    body: "Give time — events, welcome team, youth mentoring, and the vital community work that keeps people together and supported throughout Cambridgeshire.",
    checks: [
      "Flexible micro-volunteering roles",
      "Carnival, sports & picnic event crew",
      "Skill sharing & university student mentorship",
    ],
    href: "#volunteer-form-section",
    cta: "Offer to Help",
    ctaIcon: "volunteer_activism",
    ctaClass: "bg-surface-stone text-primary hover:bg-surface-tinted",
  },
  {
    badge: "03 / Support",
    badgeClass: "text-primary bg-surface-tinted",
    icon: "volunteer_activism",
    iconClass: "text-primary",
    blob: "bg-surface-tinted",
    title: "Support & Donate",
    body: "Donate so the organisation can keep a vibrant public home, welfare assistance fund, emergency family grants, and sustained cultural initiatives.",
    checks: [
      "100% reinvestment in Peterborough programmes",
      "Transparent EXCO governance & annual reporting",
      "One-off gift or recurring monthly backing",
    ],
    href: "#donation-spotlight",
    cta: "Go to Donation",
    ctaIcon: "payments",
    ctaClass:
      "bg-primary text-on-primary hover:bg-primary-container shadow-sm",
  },
] as const;

export default async function GetInvolvedPage() {
  const session = await getAppServices().auth.getSession();
  const whatsapp = publishedSocialLinks().find((l) => l.id === "whatsapp");

  return (
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <div className="flex w-full flex-col">
        {/* Hero */}
        <section className="relative mb-space-2xl w-full overflow-hidden rounded-2xl bg-primary text-on-primary shadow-xl md:rounded-3xl">
          <div className="pointer-events-none absolute inset-0 opacity-15 mix-blend-overlay">
            <svg
              className="h-full w-full"
              preserveAspectRatio="none"
              viewBox="0 0 1000 600"
              aria-hidden
            >
              <path
                className="text-brand-mint"
                d="M-100,200 C300,50 600,350 1100,100 L1100,600 L-100,600 Z"
                fill="currentColor"
              />
              <circle
                className="text-accent-gold"
                cx="850"
                cy="120"
                fill="currentColor"
                r="180"
              />
            </svg>
          </div>
          <div className="relative z-10 grid grid-cols-1 items-center gap-space-xl p-space-lg md:p-space-2xl lg:grid-cols-12">
            <div className="flex flex-col gap-space-md lg:col-span-7">
              <div className="inline-flex w-fit items-center gap-space-2xs rounded-full bg-primary-container/80 px-space-sm py-space-3xs text-brand-mint shadow-sm">
                <MaterialIcon
                  name="stars"
                  className="text-[16px] text-accent-gold"
                  filled
                />
                <span className="font-label text-label-eyebrow font-bold tracking-wider text-on-primary uppercase">
                  Become part of NCP
                </span>
              </div>
              <h1 className="font-display text-display-lg-mobile leading-[1.08] font-extrabold tracking-tight text-on-primary md:text-display-lg">
                Get Involved. <br />
                <span className="text-accent-gold">Find Your People.</span>
              </h1>
              <p className="max-w-xl font-body text-body-lg leading-relaxed text-on-primary-container">
                Become part of NCP — as a member, a volunteer, or a neighbour who
                wants to stay close to community, culture, and connection across
                Peterborough and Cambridgeshire.
              </p>
              <div className="flex flex-wrap items-center gap-space-sm pt-space-2xs">
                <a
                  href="#membership-portal"
                  className="inline-flex items-center justify-center gap-space-3xs rounded-lg bg-brand-mint px-space-md py-space-2xs font-label text-label-lg text-primary shadow-md transition-all hover:bg-primary-fixed hover:shadow-lg"
                >
                  <MaterialIcon name="how_to_reg" className="text-[18px]" />
                  <span>Register as Member</span>
                </a>
                <a
                  href="#ways-to-help"
                  className="inline-flex items-center justify-center gap-space-3xs rounded-lg bg-primary-container px-space-md py-space-2xs font-label text-label-lg text-on-primary transition-colors hover:bg-primary-container/80"
                >
                  <MaterialIcon
                    name="volunteer_activism"
                    className="text-[18px]"
                  />
                  <span>Explore Ways to Help</span>
                </a>
              </div>
              <div className="grid max-w-md grid-cols-3 gap-space-sm pt-space-sm">
                <div className="flex flex-col">
                  <span className="font-headline text-headline-lg font-bold text-on-primary">
                    1,200+
                  </span>
                  <span className="font-body text-body-sm text-on-primary-container">
                    Cambridgeshire residents
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-headline-lg font-bold text-accent-gold">
                    100%
                  </span>
                  <span className="font-body text-body-sm text-on-primary-container">
                    Community driven
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-headline-lg font-bold text-brand-mint">
                    PE1–PE7
                  </span>
                  <span className="font-body text-body-sm text-on-primary-container">
                    Postal districts served
                  </span>
                </div>
              </div>
            </div>

            <div className="relative lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white to-surface-stone p-space-2xs shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-container">
                  <CommunityPhoto
                    credit={communityPhotos.handsUnity}
                    priority
                    className="transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between rounded-xl bg-primary/85 p-space-xs text-on-primary shadow-lg backdrop-blur-md">
                    <div className="flex items-center gap-space-2xs">
                      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-brand-mint" />
                      <span className="font-label text-label-md font-bold tracking-wide text-white">
                        Growing Together • PE1–PE7
                      </span>
                    </div>
                    <span className="rounded bg-primary-container px-space-3xs py-0.5 font-label text-label-eyebrow text-accent-gold uppercase">
                      All Welcome
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-space-sm">
                  <p className="font-body text-body-sm text-text-secondary">
                    Community Planning Hub — Central Peterborough
                  </p>
                  <div className="flex -space-x-2 overflow-hidden">
                    {["N", "C", "P"].map((letter, i) => (
                      <div
                        key={letter}
                        className={`inline-block h-7 w-7 rounded-full text-center text-xs leading-7 font-bold text-on-primary ring-2 ring-white ${
                          i === 0
                            ? "bg-primary"
                            : i === 1
                              ? "bg-accent-warm-ochre"
                              : "bg-brand-emerald"
                        }`}
                      >
                        {letter}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pathways */}
        <section
          id="ways-to-help"
          className="mb-space-3xl w-full scroll-mt-28"
          aria-labelledby="ways-heading"
        >
          <div className="mb-space-xl flex flex-col justify-between gap-space-sm md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="mb-space-3xs inline-flex items-center gap-space-3xs font-label text-label-eyebrow font-bold tracking-wider text-primary uppercase">
                <MaterialIcon
                  name="hub"
                  className="text-[16px] text-brand-emerald"
                />
                <span>Participation Pathways</span>
              </div>
              <h2
                id="ways-heading"
                className="font-headline text-headline-xl font-bold tracking-tight text-text-primary"
              >
                Three primary ways to belong and contribute
              </h2>
            </div>
            <p className="max-w-sm font-body text-body-md text-text-muted">
              Whether you have two hours a month, professional skills to share,
              or simply want community kinship, your presence matters.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-space-lg md:grid-cols-3">
            {pathways.map((path, i) => (
              <Reveal
                as="article"
                key={path.title}
                delay={i * 100}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-surface-card p-space-lg shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className={`pointer-events-none absolute top-0 right-0 -z-0 h-24 w-24 rounded-bl-full opacity-60 ${path.blob}`}
                />
                <div className="relative z-10">
                  <div className="mb-space-md flex items-center justify-between">
                    <span
                      className={`rounded-full px-space-xs py-space-3xs font-label text-label-eyebrow font-bold tracking-widest uppercase ${path.badgeClass}`}
                    >
                      {path.badge}
                    </span>
                    <MaterialIcon
                      name={path.icon}
                      className={`text-[28px] ${path.iconClass}`}
                    />
                  </div>
                  <h3 className="mb-space-2xs font-headline text-headline-lg font-bold text-text-primary">
                    {path.title}
                  </h3>
                  <p className="mb-space-md font-body text-body-md leading-relaxed text-text-secondary">
                    {path.body}
                  </p>
                  <div className="mb-space-lg space-y-space-2xs">
                    {path.checks.map((check) => (
                      <div
                        key={check}
                        className="flex items-center gap-space-2xs font-body text-body-sm text-text-primary"
                      >
                        <MaterialIcon
                          name="check_circle"
                          className="text-[18px] text-brand-emerald"
                        />
                        <span>{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative z-10 pt-space-xs">
                  <a
                    href={path.href}
                    className={`inline-flex w-full items-center justify-center gap-space-3xs rounded-lg py-space-xs font-label text-label-lg transition-colors ${path.ctaClass}`}
                  >
                    <span>{path.cta}</span>
                    <MaterialIcon name={path.ctaIcon} className="text-[18px]" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Showcase */}
        <section className="mb-space-3xl grid w-full grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-container shadow-lg">
              <CommunityPhoto credit={communityPhotos.familyInPark} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <div className="absolute right-4 bottom-4 left-4 text-on-primary">
                <div className="mb-space-3xs inline-flex items-center gap-1 rounded-full bg-accent-warm-ochre/90 px-space-xs py-0.5 font-label text-label-eyebrow text-white uppercase">
                  Annual Peterborough Picnic
                </div>
                <p className="font-headline text-headline-sm font-bold text-white">
                  Food, music, and shared ancestry in the park
                </p>
                <p className="font-body text-body-sm text-on-primary-container">
                  Bringing generational stories, laughter, and open arms to all
                  residents.
                </p>
              </div>
            </div>
            <div className="absolute -right-6 -bottom-6 hidden max-w-xs items-center gap-space-sm rounded-xl bg-surface-card p-space-sm shadow-xl sm:flex">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-tinted text-primary">
                <MaterialIcon name="diversity_1" className="text-[24px]" />
              </div>
              <div>
                <span className="block font-label text-label-md font-bold text-text-primary">
                  Active Camaraderie
                </span>
                <span className="font-body text-body-sm text-text-muted">
                  Monthly social meets across Central Park &amp; Ferry Meadows
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-space-md lg:col-span-6">
            <div className="inline-flex items-center gap-space-3xs font-label text-label-eyebrow font-bold tracking-wider text-brand-emerald uppercase">
              <MaterialIcon name="handshake" className="text-[16px]" />
              <span>A Welcoming Diasporic Circle</span>
            </div>
            <h2 className="font-headline text-headline-xl font-bold tracking-tight text-text-primary">
              You don&apos;t need an invitation to be part of what we are
              building.
            </h2>
            <p className="font-body text-body-md leading-relaxed text-text-secondary">
              Whether you just arrived in Peterborough to study at ARU
              Peterborough, started a healthcare posting at Peterborough City
              Hospital, or have lived here for thirty years, NCP is your
              community anchor.
            </p>
            <div className="grid grid-cols-1 gap-space-sm pt-space-2xs sm:grid-cols-2">
              <div className="rounded-xl bg-surface-stone p-space-md">
                <div className="mb-space-3xs flex items-center gap-space-2xs font-headline text-headline-sm font-bold text-primary">
                  <MaterialIcon name="calendar_month" className="text-[22px]" />
                  <span>Quarterly Townhalls</span>
                </div>
                <p className="font-body text-body-sm text-text-secondary">
                  Direct discussions with Peterborough council reps, education
                  leaders, and community elders.
                </p>
              </div>
              <div className="rounded-xl bg-surface-stone p-space-md">
                <div className="mb-space-3xs flex items-center gap-space-2xs font-headline text-headline-sm font-bold text-primary">
                  <MaterialIcon name="support_agent" className="text-[22px]" />
                  <span>Newcomer Liaison</span>
                </div>
                <p className="font-body text-body-sm text-text-secondary">
                  Practical advice on housing, schools, transport, and settling
                  peacefully into local life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Membership + Donate */}
        <section className="mb-space-3xl grid w-full grid-cols-1 gap-space-lg lg:grid-cols-12">
          <div
            id="membership-portal"
            className="flex scroll-mt-28 flex-col justify-between rounded-2xl bg-surface-card p-space-lg shadow-md md:p-space-xl lg:col-span-7"
          >
            <div>
              <div className="mb-space-sm flex items-center justify-between pb-space-xs">
                <div className="flex items-center gap-space-2xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-tinted text-primary">
                    <MaterialIcon name="how_to_reg" className="text-[22px]" />
                  </div>
                  <div>
                    <span className="font-label text-label-eyebrow font-bold text-brand-emerald uppercase">
                      Registration
                    </span>
                    <h3 className="font-headline text-headline-lg font-bold text-text-primary">
                      Membership
                    </h3>
                  </div>
                </div>
                <span className="rounded-full bg-secondary-container px-space-xs py-space-3xs font-label text-label-md font-bold text-on-secondary-container">
                  100% Free
                </span>
              </div>
              {session ? (
                <>
                  <p className="mb-space-md font-body text-body-lg leading-relaxed text-text-secondary">
                    You are signed in as{" "}
                    <strong className="text-text-primary">
                      {session.displayName}
                    </strong>
                    . Edit your membership details any time from your profile.
                  </p>
                  <div className="flex flex-col items-center gap-space-sm pt-space-2xs sm:flex-row">
                    <Link
                      href="/profile"
                      className="inline-flex w-full items-center justify-center gap-space-3xs rounded-lg bg-primary px-space-lg py-space-xs font-label text-label-lg text-on-primary shadow-sm transition-all hover:bg-primary-container sm:w-auto"
                    >
                      <span>Your profile</span>
                      <MaterialIcon name="person" className="text-[18px]" />
                    </Link>
                    <form action={logoutAction}>
                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center gap-space-3xs rounded-lg bg-surface-stone px-space-md py-space-xs font-label text-label-lg text-text-primary transition-colors hover:bg-surface-tinted sm:w-auto"
                      >
                        <MaterialIcon name="logout" className="text-[18px]" />
                        <span>Sign out</span>
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-space-md font-body text-body-lg leading-relaxed text-text-secondary">
                    Free registration — your account is active immediately. No
                    approval wait. Join our verified member roster to receive
                    critical announcements and participate in community voting.
                  </p>
                  <div className="flex flex-col items-center gap-space-sm pt-space-2xs sm:flex-row">
                    <Link
                      href="/register"
                      className="inline-flex w-full items-center justify-center gap-space-3xs rounded-lg bg-primary px-space-lg py-space-xs font-label text-label-lg text-on-primary shadow-sm transition-all hover:bg-primary-container sm:w-auto"
                    >
                      <span>Create Free Account</span>
                      <MaterialIcon name="verified" className="text-[18px]" />
                    </Link>
                    <Link
                      href="/login"
                      className="inline-flex w-full items-center justify-center gap-space-3xs rounded-lg bg-surface-stone px-space-md py-space-xs font-label text-label-lg text-text-primary transition-colors hover:bg-surface-tinted sm:w-auto"
                    >
                      <MaterialIcon name="login" className="text-[18px]" />
                      <span>Sign In</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
            <div className="mt-space-md flex items-center gap-space-2xs pt-space-xs font-body text-body-sm text-text-muted">
              <MaterialIcon
                name="lock"
                className="text-[16px] text-brand-emerald"
              />
              <span>
                Your information is guarded under UK GDPR guidelines and never
                sold to third parties.
              </span>
            </div>
          </div>

          <div
            id="donation-spotlight"
            className="relative flex scroll-mt-28 flex-col justify-between overflow-hidden rounded-2xl bg-primary p-space-lg text-on-primary shadow-md md:p-space-xl lg:col-span-5"
          >
            <div className="pointer-events-none absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-brand-emerald/40 blur-3xl" />
            <div>
              <div className="mb-space-sm flex items-center justify-between pb-space-xs">
                <div className="flex items-center gap-space-2xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-accent-gold">
                    <MaterialIcon name="savings" className="text-[22px]" />
                  </div>
                  <div>
                    <span className="font-label text-label-eyebrow font-bold text-accent-gold uppercase">
                      Sustain NCP
                    </span>
                    <h3 className="font-headline text-headline-lg font-bold text-on-primary">
                      Donate
                    </h3>
                  </div>
                </div>
                <span className="rounded-full bg-accent-warm-ochre/30 px-space-xs py-space-3xs font-label text-label-md font-bold text-accent-gold">
                  Direct Impact
                </span>
              </div>
              <p className="mb-space-md font-body text-body-md leading-relaxed text-on-primary-container">
                Support the work of Nigerian Community Peterborough with a
                one-off or monthly gift — card checkout or bank transfer on the
                donation page.
              </p>
              <div className="mb-space-md grid grid-cols-3 gap-space-2xs">
                {[
                  { amount: "£15", label: "Youth event", highlight: false },
                  { amount: "£35", label: "Family support", highlight: true },
                  { amount: "£75", label: "Cultural fund", highlight: false },
                ].map((preset) => (
                  <Link
                    key={preset.amount}
                    href="/donation"
                    className={`rounded-lg px-3 py-2.5 text-center font-label text-label-lg font-bold transition-all ${
                      preset.highlight
                        ? "bg-brand-mint text-primary shadow-sm"
                        : "bg-primary-container text-on-primary hover:bg-surface-tinted hover:text-primary"
                    }`}
                  >
                    {preset.amount}
                    <span className="block text-[11px] font-normal opacity-80">
                      {preset.label}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mb-space-md flex items-start gap-space-2xs rounded-xl bg-primary-container/60 p-space-sm">
                <MaterialIcon
                  name="account_balance"
                  className="mt-0.5 shrink-0 text-[20px] text-accent-gold"
                />
                <div className="font-body text-body-sm text-surface-container-high">
                  <span className="block font-semibold text-white">
                    Bank Transfer Option Available
                  </span>
                  Account: Nigerian Community Peterborough • Sort: Available on
                  donation page.
                </div>
              </div>
            </div>
            <div className="pt-space-xs">
              <Link
                href="/donation"
                className="inline-flex w-full items-center justify-center gap-space-3xs rounded-lg bg-accent-gold py-space-xs font-label text-label-lg font-bold text-text-primary shadow-md transition-all hover:bg-accent-gold/90"
              >
                <span>Make a Donation</span>
                <MaterialIcon name="favorite" className="text-[18px]" />
              </Link>
            </div>
          </div>
        </section>

        {/* Volunteer form */}
        <section
          id="volunteer-form-section"
          className="mb-space-3xl w-full scroll-mt-28 rounded-2xl bg-surface-card p-space-lg shadow-sm md:p-space-xl"
        >
          <div className="mx-auto max-w-3xl">
            <div className="mb-space-lg text-center">
              <div className="mb-space-3xs inline-flex items-center gap-1 rounded-full bg-surface-tinted px-space-xs py-space-3xs font-label text-label-eyebrow font-bold text-primary uppercase">
                <MaterialIcon
                  name="volunteer_activism"
                  className="text-[16px]"
                />
                <span>Lend Your Hand</span>
              </div>
              <h2 className="font-headline text-headline-xl font-bold tracking-tight text-text-primary">
                How would you like to help?
              </h2>
              <p className="mt-space-3xs font-body text-body-md text-text-secondary">
                Our volunteer coordinators match you with roles that fit your
                schedule, from an hour at the summer carnival to organizing
                winter workshops.
              </p>
            </div>
            <VolunteerInterestForm />
          </div>
        </section>

        {/* Talk to us */}
        <section className="mb-space-3xl w-full rounded-2xl bg-surface-stone p-space-lg md:p-space-xl">
          <div className="grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
            <div className="flex flex-col gap-space-xs lg:col-span-5">
              <div className="inline-flex items-center gap-space-3xs font-label text-label-eyebrow font-bold tracking-wider text-primary uppercase">
                <MaterialIcon name="forum" className="text-[16px]" />
                <span>Direct Contact</span>
              </div>
              <h2 className="font-headline text-headline-xl font-bold tracking-tight text-text-primary">
                Talk to us
              </h2>
              <p className="font-body text-body-md leading-relaxed text-text-secondary">
                Have a question, need community welfare assistance, or want to
                get involved in an executive committee or advisory capacity? We
                are ready to listen.
              </p>
              {whatsapp ? (
                <div className="pt-space-2xs">
                  <a
                    className="inline-flex items-center gap-space-3xs rounded-full bg-brand-emerald px-space-md py-space-2xs font-label text-label-lg text-white shadow-sm transition-all hover:bg-primary"
                    href={whatsapp.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <MaterialIcon name="forum" className="text-[18px]" />
                    <span>Join Official WhatsApp Group</span>
                  </a>
                </div>
              ) : null}
            </div>
            <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:col-span-7">
              <div className="flex flex-col justify-between rounded-xl bg-surface-card p-space-md shadow-sm">
                <div>
                  <div className="mb-space-xs flex h-10 w-10 items-center justify-center rounded-full bg-surface-tinted text-primary">
                    <MaterialIcon name="person" className="text-[20px]" />
                  </div>
                  <span className="block font-label text-label-eyebrow font-bold text-brand-emerald uppercase">
                    Community Co-ordinator
                  </span>
                  <h4 className="mb-space-3xs font-headline text-headline-sm font-bold text-text-primary">
                    {siteContact.contactName}
                  </h4>
                  <p className="mb-space-sm font-body text-body-sm text-text-muted">
                    EXCO Member &amp; Community Engagement Liaison
                  </p>
                </div>
                <a
                  className="inline-flex items-center gap-1.5 font-label text-label-md font-bold text-primary transition-colors hover:text-brand-emerald"
                  href={siteContact.emailHref}
                >
                  <MaterialIcon name="mail" className="text-[16px]" />
                  <span className="truncate">{siteContact.email}</span>
                </a>
              </div>
              <div className="flex flex-col justify-between rounded-xl bg-surface-card p-space-md shadow-sm">
                <div>
                  <div className="mb-space-xs flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-accent-warm-ochre">
                    <MaterialIcon name="phone_in_talk" className="text-[20px]" />
                  </div>
                  <span className="block font-label text-label-eyebrow font-bold text-accent-warm-ochre uppercase">
                    Urgent Line
                  </span>
                  <h4 className="mb-space-3xs font-headline text-headline-sm font-bold text-text-primary">
                    {siteContact.excoLabel}
                  </h4>
                  <p className="mb-space-sm font-body text-body-sm text-text-muted">
                    Available Monday to Saturday for Peterborough community
                    queries
                  </p>
                </div>
                <a
                  className="inline-flex items-center gap-1.5 font-label text-label-md font-bold text-primary transition-colors hover:text-brand-emerald"
                  href={siteContact.phoneHref}
                >
                  <MaterialIcon name="call" className="text-[16px]" />
                  <span>{siteContact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative mb-space-xl w-full overflow-hidden rounded-2xl bg-primary p-space-lg text-on-primary shadow-xl md:rounded-3xl md:p-space-2xl">
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-primary-container/40 to-transparent" />
          <div className="relative z-10 flex max-w-2xl flex-col gap-space-sm">
            <div className="inline-flex items-center gap-1.5 font-label text-label-eyebrow font-bold tracking-widest text-accent-gold uppercase">
              <span>Peterborough &amp; Cambridgeshire Diaspora</span>
            </div>
            <h2 className="font-headline text-headline-xl leading-tight font-bold tracking-tight text-on-primary">
              A seat at the table is waiting for you.
            </h2>
            <p className="font-body text-body-lg leading-relaxed text-on-primary-container">
              From newly arrived ARU students and NHS healthcare professionals
              to families who have called Peterborough home for decades — our
              strength is in our unity.
            </p>
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <Link
                href={session ? "/profile" : "/register"}
                className="inline-flex items-center justify-center gap-space-3xs rounded-lg bg-brand-mint px-space-lg py-space-xs font-label text-label-lg font-bold text-primary shadow-md transition-all hover:bg-primary-fixed"
              >
                <span>Join NCP Today</span>
                <MaterialIcon name="person_add" className="text-[18px]" />
              </Link>
              <a
                href={siteContact.emailHref}
                className="inline-flex items-center justify-center gap-space-3xs rounded-lg bg-primary-container px-space-md py-space-xs font-label text-label-lg text-on-primary transition-colors hover:bg-primary-container/80"
              >
                <MaterialIcon name="mail" className="text-[18px]" />
                <span>Contact EXCO</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
