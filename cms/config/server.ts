import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // Public HTTPS origin in production (admin + absolute media URLs). Local: leave unset.
  url: env('PUBLIC_URL'),
  /**
   * When Strapi sits behind TLS termination (nginx, ALB, Azure, Coolify, etc.),
   * Koa must trust X-Forwarded-Proto or Secure session cookies fail with:
   * "Cannot send secure cookie over unencrypted connection".
   * Default true in production; set IS_PROXIED=false only for direct local HTTPS.
   */
  proxy: {
    koa: env.bool('IS_PROXIED', env('NODE_ENV') === 'production'),
  },
  app: {
    keys: env.array('APP_KEYS')!,
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});

export default config;
