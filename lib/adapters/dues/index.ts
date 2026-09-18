export {
  createFileDuesAdapter,
  createNoopDuesAdapter,
} from "./dues-adapter";
export type { CreateFileDuesAdapterOptions } from "./dues-adapter";
export { createStrapiDuesAdapter } from "./strapi-dues-adapter";
export type { CreateStrapiDuesAdapterOptions } from "./strapi-dues-adapter";

import type { AuthCredentialStore } from "@/lib/adapters/strapi/auth-session";
import { resolveStrapiConfig } from "@/lib/adapters/strapi/client";
import type { DuesPort } from "@/lib/ports/dues-port";
import {
  createFileDuesAdapter,
  createNoopDuesAdapter,
} from "./dues-adapter";
import { createStrapiDuesAdapter } from "./strapi-dues-adapter";

export type CreateDuesAdapterFromEnvOptions = {
  credentials?: AuthCredentialStore;
};

/**
 * Default DuesPort:
 * - DUES_ADAPTER=noop → noop
 * - DUES_ADAPTER=file → local .data store
 * - otherwise Strapi (API token and/or member JWT via credentials)
 */
export function createDuesAdapterFromEnv(
  env: NodeJS.ProcessEnv = process.env,
  options: CreateDuesAdapterFromEnvOptions = {},
): DuesPort {
  const mode = env.DUES_ADAPTER?.trim().toLowerCase();
  if (mode === "noop") return createNoopDuesAdapter();
  if (mode === "file") return createFileDuesAdapter({ env });

  const config = resolveStrapiConfig(env);
  const canUseStrapi = Boolean(config.apiToken || options.credentials);

  if (mode === "strapi" || canUseStrapi) {
    return createStrapiDuesAdapter({
      env,
      config,
      credentials: options.credentials,
    });
  }

  console.warn(
    "DuesPort: no STRAPI_API_TOKEN or auth credentials — falling back to file store",
  );
  return createFileDuesAdapter({ env });
}
