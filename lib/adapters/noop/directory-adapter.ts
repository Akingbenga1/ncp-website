import type { DirectoryPort } from "@/lib/ports/directory-port";

/** No-op DirectoryPort until Strapi Listing adapter is wired. */
export const noopDirectoryAdapter: DirectoryPort = {
  async listListings() {
    return [];
  },
  async getListingBySlug() {
    return null;
  },
  async suggestListing() {
    return { accepted: false };
  },
};
