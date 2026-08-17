/** Production primary IA — labels locked to project-answers / jira-task. */

export type PrimaryNavLink = {
  href: string;
  label: string;
  cta?: boolean;
};

export const primaryNavLinks: PrimaryNavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/market", label: "Market" },
  { href: "/donation", label: "Donation" },
  { href: "/get-involved", label: "Get involved", cta: true },
];

export const searchNav = {
  href: "/search",
  label: "Search",
} as const;
