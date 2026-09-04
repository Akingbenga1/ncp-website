import type { ContentPort } from "@/lib/ports/content-port";

/** No-op ContentPort for tests / CONTENT_ADAPTER=noop isolation. */
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
