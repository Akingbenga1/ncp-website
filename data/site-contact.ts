/**
 * Public contact + social for chrome and trust pages.
 * Static config until optional SiteSettingsPort / CMS single-type is wired.
 * Do not invent social URLs — fill `href` only when NH-8 is confirmed.
 */

export type SocialLink = {
  id: string;
  label: string;
  /** Absolute profile URL, or null until NH-8. */
  href: string | null;
};

export const siteContact = {
  organisation: "Nigerian Community Peterborough",
  tagline: "Community. Culture. Connection.",
  contactName: "Theresa Okogwa",
  email: "theresa.okogwa@naijacp.co.uk",
  emailHref: "mailto:theresa.okogwa@naijacp.co.uk",
  excoLabel: "NCP EXCO LINE",
  phoneDisplay: "+44 7737 742387",
  phoneHref: "tel:+447737742387",
} as const;

/**
 * Social slots for the footer. Links render only when `href` is set.
 * Put confirmed URLs here (or later via SiteSettingsPort) — never hardcode
 * Facebook/WhatsApp SDKs in the UI.
 */
export const siteSocial: SocialLink[] = [
  { id: "facebook", label: "Facebook", href: null },
  { id: "whatsapp", label: "WhatsApp", href: null },
];

export function publishedSocialLinks(
  links: SocialLink[] = siteSocial,
): Array<SocialLink & { href: string }> {
  return links.filter(
    (link): link is SocialLink & { href: string } =>
      typeof link.href === "string" && link.href.trim().length > 0,
  );
}
