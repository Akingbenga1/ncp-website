import {
  noopAuthAdapter,
  noopContentAdapter,
  noopDirectoryAdapter,
  noopMailAdapter,
  noopMemberAdapter,
  noopPaymentAdapter,
  noopSearchAdapter,
} from "@/lib/adapters/noop";
import type {
  AuthPort,
  ContentPort,
  DirectoryPort,
  MailPort,
  MemberPort,
  PaymentPort,
  SearchPort,
} from "@/lib/ports";

/**
 * Application services bound at the composition root.
 * UI and use-cases depend on these ports only — never on adapters.
 */
export type AppServices = {
  content: ContentPort;
  directory: DirectoryPort;
  auth: AuthPort;
  members: MemberPort;
  payments: PaymentPort;
  search: SearchPort;
  mail: MailPort;
};

export type CreateAppServicesOptions = Partial<AppServices>;

/**
 * Factory Method: build the service graph.
 * Default adapters are no-ops; later sprints inject Strapi/Stripe/mail.
 */
export function createAppServices(
  overrides: CreateAppServicesOptions = {},
): AppServices {
  return {
    content: overrides.content ?? noopContentAdapter,
    directory: overrides.directory ?? noopDirectoryAdapter,
    auth: overrides.auth ?? noopAuthAdapter,
    members: overrides.members ?? noopMemberAdapter,
    payments: overrides.payments ?? noopPaymentAdapter,
    search: overrides.search ?? noopSearchAdapter,
    mail: overrides.mail ?? noopMailAdapter,
  };
}

/** Default singleton for server-side callers until DI is needed. */
let cached: AppServices | null = null;

export function getAppServices(): AppServices {
  if (!cached) {
    cached = createAppServices();
  }
  return cached;
}
