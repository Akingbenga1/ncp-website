/**
 * community-due controller — members may only read/create their own rows.
 * API-token / admin callers (no ctx.state.user) pass through unchanged.
 */

import { factories } from "@strapi/strapi";

function memberIdFromUser(user: {
  documentId?: string;
  id?: number | string;
}): string | null {
  if (user.documentId) return String(user.documentId);
  if (user.id !== undefined && user.id !== null) return String(user.id);
  return null;
}

export default factories.createCoreController(
  "api::community-due.community-due",
  () => ({
    async find(ctx) {
      const user = ctx.state.user;
      if (user) {
        const memberId = memberIdFromUser(user);
        if (!memberId) {
          return ctx.unauthorized("Authentication required");
        }
        const existingFilters =
          ctx.query.filters && typeof ctx.query.filters === "object"
            ? ctx.query.filters
            : {};
        ctx.query = {
          ...ctx.query,
          filters: {
            ...existingFilters,
            memberId: { $eq: memberId },
          },
        };
      }
      return super.find(ctx);
    },

    async findOne(ctx) {
      const user = ctx.state.user;
      const response = await super.findOne(ctx);
      if (!user) return response;

      const memberId = memberIdFromUser(user);
      const body = response as { data?: { memberId?: string } | null };
      const row = body?.data;
      if (
        memberId &&
        row?.memberId &&
        row.memberId !== memberId
      ) {
        return ctx.notFound();
      }
      return response;
    },

    async create(ctx) {
      const user = ctx.state.user;
      if (user) {
        const memberId = memberIdFromUser(user);
        if (!memberId) {
          return ctx.unauthorized("Authentication required");
        }
        const incoming =
          ctx.request.body &&
          typeof ctx.request.body === "object" &&
          "data" in ctx.request.body
            ? ((ctx.request.body as { data?: Record<string, unknown> }).data ??
              {})
            : {};
        ctx.request.body = {
          data: {
            ...incoming,
            memberId,
            email: String(user.email ?? incoming.email ?? "")
              .trim()
              .toLowerCase(),
          },
        };
      }
      return super.create(ctx);
    },
  }),
);
