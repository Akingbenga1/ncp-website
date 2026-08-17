import type { SearchPort } from "@/lib/ports/search-port";

/** No-op SearchPort until Strapi/index adapter is wired. */
export const noopSearchAdapter: SearchPort = {
  async search(query) {
    return { query: query.q, hits: [], total: 0 };
  },
};
