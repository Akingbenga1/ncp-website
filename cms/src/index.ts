import type { Core } from "@strapi/strapi";
import { createHmac, randomBytes } from "node:crypto";
import { seedLaunchContent } from "./bootstrap/seed-launch-content";

/**
 * Ensure Public role can find published Events, News Articles, and Listings.
 * Draft & Publish still keeps drafts off the public Content API.
 */
async function ensurePublicContentRead(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });

  if (!publicRole) return;

  const actions = [
    "api::event.event.find",
    "api::event.event.findOne",
    "api::news-article.news-article.find",
    "api::news-article.news-article.findOne",
    "api::listing.listing.find",
    "api::listing.listing.findOne",
  ] as const;

  for (const action of actions) {
    const existing = await strapi.db
      .query("plugin::users-permissions.permission")
      .findOne({ where: { action, role: publicRole.id } });

    if (!existing) {
      await strapi.db.query("plugin::users-permissions.permission").create({
        data: { action, role: publicRole.id },
      });
    }
  }
}

/**
 * Authenticated members can read/update their own profile via /users/me and PUT /users/:id.
 * Instant registration — no email-confirmation gate (project-answers §3).
 */
async function ensureMemberAuthPermissions(strapi: Core.Strapi) {
  const authenticatedRole = await strapi.db
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "authenticated" } });

  if (!authenticatedRole) return;

  const actions = [
    "plugin::users-permissions.user.me",
    "plugin::users-permissions.user.findOne",
    "plugin::users-permissions.user.update",
    "api::community-due.community-due.find",
    "api::community-due.community-due.findOne",
    "api::community-due.community-due.create",
    "plugin::upload.content-api.upload",
  ] as const;

  for (const action of actions) {
    const existing = await strapi.db
      .query("plugin::users-permissions.permission")
      .findOne({ where: { action, role: authenticatedRole.id } });

    if (!existing) {
      await strapi.db.query("plugin::users-permissions.permission").create({
        data: { action, role: authenticatedRole.id },
      });
    }
  }

  const pluginStore = strapi.store({
    type: "plugin",
    name: "users-permissions",
  });
  const advanced = (await pluginStore.get({ key: "advanced" })) as
    | Record<string, unknown>
    | null;

  if (advanced && advanced.email_confirmation !== false) {
    await pluginStore.set({
      key: "advanced",
      value: {
        ...advanced,
        email_confirmation: false,
      },
    });
  }
}

/**
 * Community dues are written by the Next.js DuesPort via STRAPI_API_TOKEN
 * (not public). No Public role access — keep payment records private.
 * Authenticated role also gets no open findAll; server uses the API token.
 */
async function ensureCommunityDuesPrivate(strapi: Core.Strapi) {
  // Intentionally no Public permissions for api::community-due.*.
  // Full-access API tokens cover create/find/update + upload for the web app.
  strapi.log.info(
    "Community dues: Content API is private (API token / admin only).",
  );
}

async function isValidApiToken(
  strapi: Core.Strapi,
  bearer: string,
): Promise<boolean> {
  if (!bearer) return false;
  try {
    const apiTokenCfg = strapi.config.get("admin.apiToken") as
      | { salt?: string }
      | undefined;
    const salt = apiTokenCfg?.salt;
    if (!salt) return false;

    const hashed = createHmac("sha512", salt).update(bearer).digest("hex");
    const found = await strapi.db.query("admin::api-token").findOne({
      where: { accessKey: hashed },
    });
    return Boolean(found);
  } catch {
    return false;
  }
}

/**
 * Trusted endpoint for Next AuthPort: issue a one-time reset token for MailPort.
 * POST /api/password-reset/issue  Authorization: Bearer <STRAPI_API_TOKEN>
 * Body: { email } → { token: string | null }
 */
function registerPasswordResetIssueRoute(strapi: Core.Strapi) {
  strapi.server.routes([
    {
      method: "POST",
      path: "/api/password-reset/issue",
      handler: async (ctx) => {
        const authHeader = ctx.request.header.authorization;
        const headerValue = Array.isArray(authHeader)
          ? authHeader[0]
          : authHeader;
        const bearer =
          typeof headerValue === "string" && headerValue.startsWith("Bearer ")
            ? headerValue.slice(7).trim()
            : "";

        if (!(await isValidApiToken(strapi, bearer))) {
          return ctx.unauthorized("API token required");
        }

        const body = ctx.request.body as { email?: unknown } | undefined;
        const email =
          typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
        if (!email) {
          return ctx.badRequest("email is required");
        }

        const user = await strapi.db
          .query("plugin::users-permissions.user")
          .findOne({ where: { email } });

        if (!user) {
          ctx.body = { token: null };
          return;
        }

        const token = randomBytes(32).toString("hex");
        await strapi.db.query("plugin::users-permissions.user").update({
          where: { id: user.id },
          data: { resetPasswordToken: token },
        });

        ctx.body = { token };
      },
      config: {
        auth: false,
      },
    },
  ]);
}

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    registerPasswordResetIssueRoute(strapi);
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensurePublicContentRead(strapi);
    await ensureMemberAuthPermissions(strapi);
    await ensureCommunityDuesPrivate(strapi);
    await seedLaunchContent(strapi);
  },
};
