/**
 * Application boundary: domain types, ports, adapters, composition root.
 *
 * UI and server actions import ports / `getAppServices()` only.
 * Never import Strapi, Stripe, or mail SDK types from pages/components.
 */
export * from "./domain";
export * from "./ports";
export { createAppServices, getAppServices } from "./composition";
export type { AppServices, CreateAppServicesOptions } from "./composition";
