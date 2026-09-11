import Link from "next/link";
import {
  publishedSocialLinks,
  siteContact,
} from "@/data/site-contact";
import { SiteLogo } from "./SiteLogo";

export function Footer() {
  const socialLinks = publishedSocialLinks();

  return (
    <footer className="mt-space-3xl w-full bg-primary text-on-primary">
      <div className="mx-auto max-w-container-max px-gutter-mobile py-space-2xl md:px-gutter-desktop">
        <div className="grid grid-cols-1 gap-space-xl md:grid-cols-12">
          <div className="flex flex-col gap-space-xs md:col-span-5">
            <div className="flex items-center gap-space-xs">
              <SiteLogo inverted />
            </div>
            <p className="font-body text-body-md leading-relaxed text-on-primary-container">
              Community. Culture. Connection. Empowering Nigerian individuals,
              families, students, and businesses across Peterborough and
              Cambridgeshire.
            </p>
            {socialLinks.length > 0 ? (
              <ul className="flex flex-wrap gap-space-sm pt-space-2xs">
                {socialLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="font-label text-label-md text-brand-mint hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="flex flex-col gap-space-xs md:col-span-4">
            <h4 className="font-headline text-headline-sm font-semibold text-accent-gold">
              Contact &amp; Leadership
            </h4>
            <div className="flex flex-col gap-space-3xs font-body text-body-sm text-surface-container-high">
              <div>
                <span className="block font-semibold text-on-primary">
                  {siteContact.contactName}
                </span>
                <a
                  className="text-brand-mint hover:underline"
                  href={siteContact.emailHref}
                >
                  {siteContact.email}
                </a>
              </div>
              <div className="pt-space-3xs">
                <span className="block font-semibold text-on-primary">
                  EXCO Line
                </span>
                <a
                  className="text-brand-mint hover:underline"
                  href={siteContact.phoneHref}
                >
                  {siteContact.phoneDisplay}
                </a>
              </div>
              <div className="pt-space-3xs">
                <span className="text-on-primary-container">
                  Peterborough, Cambridgeshire, United Kingdom
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-space-xs md:col-span-3">
            <h4 className="font-headline text-headline-sm font-semibold text-accent-gold">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-space-2xs font-body text-body-sm text-surface-container-high">
              <li>
                <Link className="transition-colors hover:text-brand-mint" href="/">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-brand-mint"
                  href="/about"
                >
                  About NCP
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-brand-mint"
                  href="/get-involved"
                >
                  Get Involved
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-brand-mint"
                  href="/register"
                >
                  Membership Registration
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-brand-mint"
                  href="/donation"
                >
                  Donation
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-brand-mint"
                  href="/privacy"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-brand-mint"
                  href="/cookies"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-space-2xl flex flex-col items-center justify-between gap-space-sm border-t border-primary-container pt-space-md font-body text-body-sm text-on-primary-container sm:flex-row">
          <div>
            © {new Date().getFullYear()} Nigerian Community Peterborough (NCP).
            All rights reserved.
          </div>
          <div className="text-center text-surface-container-high/80 sm:text-right">
            Community photography credits acknowledged in page content.
          </div>
        </div>
      </div>
    </footer>
  );
}
