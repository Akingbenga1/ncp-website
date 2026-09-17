import Link from "next/link";
import { MaterialIcon } from "@/components/MaterialIcon";
import { siteContact } from "@/data/site-contact";

type SearchSidebarProps = {
  popularSearches?: string[];
};

export function SearchSidebar({ popularSearches = [] }: SearchSidebarProps) {
  return (
    <aside className="flex flex-col gap-space-lg lg:col-span-4">
      <div className="flex flex-col gap-space-md rounded-xl bg-surface-card p-space-md shadow-sm">
        <div className="flex items-center gap-space-2xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-tinted text-primary">
            <MaterialIcon name="support_agent" className="text-[22px]" />
          </div>
          <div>
            <h2 className="font-headline text-headline-sm text-text-primary">
              Can’t find what you need?
            </h2>
            <p className="font-body text-body-sm text-text-muted">
              Direct community assistance is available.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-space-2xs">
          <Link
            href="/market/suggest"
            className="group flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs transition-colors hover:bg-surface-container"
          >
            <div className="flex items-center gap-space-xs">
              <MaterialIcon
                name="add_business"
                className="text-[20px] text-primary"
              />
              <div className="flex flex-col">
                <span className="font-label text-label-lg font-bold text-text-primary group-hover:text-primary">
                  List Your Business
                </span>
                <span className="font-body text-body-sm text-text-muted">
                  Free directory submission for diaspora owners
                </span>
              </div>
            </div>
            <MaterialIcon
              name="chevron_right"
              className="text-[18px] text-text-muted group-hover:text-primary"
            />
          </Link>
          <Link
            href="/get-involved"
            className="group flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs transition-colors hover:bg-surface-container"
          >
            <div className="flex items-center gap-space-xs">
              <MaterialIcon
                name="edit_calendar"
                className="text-[20px] text-accent-warm-ochre"
              />
              <div className="flex flex-col">
                <span className="font-label text-label-lg font-bold text-text-primary group-hover:text-primary">
                  Submit Community Event
                </span>
                <span className="font-body text-body-sm text-text-muted">
                  Promote your fellowship, workshop or meetup
                </span>
              </div>
            </div>
            <MaterialIcon
              name="chevron_right"
              className="text-[18px] text-text-muted group-hover:text-primary"
            />
          </Link>
        </div>

        <div className="flex flex-col gap-space-xs rounded-lg bg-surface-tinted p-space-sm">
          <div className="flex items-center gap-space-xs">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary">
              TO
            </div>
            <div>
              <span className="block font-label text-label-lg font-bold text-primary">
                {siteContact.contactName}
              </span>
              <span className="block font-body text-body-sm text-text-secondary">
                Community Liaison &amp; General Inquiries
              </span>
            </div>
          </div>
          <a
            href={siteContact.phoneHref}
            className="inline-flex items-center justify-center gap-space-3xs rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg font-bold text-on-primary shadow-sm transition-colors hover:bg-primary-container"
          >
            <MaterialIcon name="call" className="text-[18px]" />
            <span>Call {siteContact.phoneDisplay}</span>
          </a>
        </div>
      </div>

      {popularSearches.length > 0 ? (
        <div className="flex flex-col gap-space-sm rounded-xl bg-surface-card p-space-md shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-headline-sm text-text-primary">
              Popular Searches
            </h2>
            <MaterialIcon name="trending_up" className="text-[20px] text-primary" />
          </div>
          <p className="font-body text-body-sm text-text-muted">
            Live events, news, and Market listings from this site.
          </p>
          <div className="flex flex-wrap gap-space-2xs pt-space-3xs">
            {popularSearches.map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="rounded-full bg-surface-container px-space-xs py-space-3xs font-label text-label-md text-on-surface-variant transition-colors hover:bg-surface-tinted hover:text-primary"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-space-xs rounded-xl bg-surface-card p-space-md shadow-sm">
        <div className="flex items-center gap-space-2xs text-primary">
          <MaterialIcon name="lightbulb" className="text-[20px]" />
          <h2 className="font-headline text-headline-sm">Search Tips</h2>
        </div>
        <ul className="flex flex-col gap-space-2xs pt-space-3xs font-body text-body-sm text-text-secondary">
          <li className="flex items-start gap-space-2xs">
            <MaterialIcon
              name="check_circle"
              className="mt-0.5 shrink-0 text-[16px] text-brand-emerald"
            />
            <span>
              <strong>Filter by postal code:</strong> Add “PE1”, “PE2”, or “PE7”
              to focus on neighbourhood venues and traders.
            </span>
          </li>
          <li className="flex items-start gap-space-2xs">
            <MaterialIcon
              name="check_circle"
              className="mt-0.5 shrink-0 text-[16px] text-brand-emerald"
            />
            <span>
              <strong>Market directory:</strong> Open a listing for direct
              contact details once you find a verified vendor.
            </span>
          </li>
          <li className="flex items-start gap-space-2xs">
            <MaterialIcon
              name="check_circle"
              className="mt-0.5 shrink-0 text-[16px] text-brand-emerald"
            />
            <span>
              <strong>Use what’s published:</strong> Search an event title, news
              headline, or Market listing name.
            </span>
          </li>
        </ul>
      </div>

      <div className="relative flex flex-col gap-space-sm overflow-hidden rounded-xl bg-primary p-space-md text-on-primary shadow-sm">
        <div className="relative z-10 flex flex-col gap-space-xs">
          <span className="font-label text-label-eyebrow font-bold tracking-wider text-brand-mint uppercase">
            Join 1,200+ members
          </span>
          <h2 className="font-headline text-headline-sm font-bold">
            Register as an Official NCP Member
          </h2>
          <p className="font-body text-body-sm text-on-primary-container">
            Priority entry for the Cultural Gala, verified member discounts, and
            monthly legal welfare clinics.
          </p>
          <div className="pt-space-2xs">
            <Link
              href="/register"
              className="inline-flex w-full items-center justify-center gap-space-3xs rounded-lg bg-brand-mint px-space-md py-space-2xs text-center font-label text-label-lg font-bold text-primary transition-colors hover:bg-primary-fixed"
            >
              <span>Complete Registration</span>
              <MaterialIcon name="arrow_forward" className="text-[18px]" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
