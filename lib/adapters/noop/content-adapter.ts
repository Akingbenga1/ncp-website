import type { ContentPort } from "@/lib/ports/content-port";

/** No-op ContentPort until Strapi adapter is wired (Sprint 3). */
export const noopContentAdapter: ContentPort = {
  async listEvents() {
    return [];
  },
  async getEventBySlug() {
    return null;
  },
  async listNews() {
    return [];
  },
  async getNewsBySlug() {
    return null;
  },
};
