/**
 * Canonical public origin for absolute URLs (sitemap, robots, metadataBase).
 * Trailing slashes stripped. Falls back to local Next default port.
 */
export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ||
    "http://localhost:3001"
  );
}
