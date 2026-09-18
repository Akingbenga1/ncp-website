import {
  noopAuthAdapter,
  noopContentAdapter,
  noopDirectoryAdapter,
  noopMemberAdapter,
  noopSearchAdapter,
} from "@/lib/adapters/noop";
import { createDuesAdapterFromEnv } from "@/lib/adapters/dues";
import { createMailAdapterFromEnv } from "@/lib/adapters/mail";
import { createPaymentAdapterFromEnv } from "@/lib/adapters/stripe";
import {
  createStrapiAuthAdapter,
  createStrapiContentAdapter,
  createStrapiDirectoryAdapter,
  createStrapiMemberAdapter,
  createStrapiSearchAdapter,
} from "@/lib/adapters/strapi";
import type {
  AuthPort,
  ContentPort,
  DirectoryPort,
  DuesPort,
  MailPort,
  MemberPort,
  PaymentPort,
  SearchPort,
} from "@/lib/ports";
import { createCookieCredentialStore } from "./cookie-credential-store";

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
  dues: DuesPort;
  search: SearchPort;
  mail: MailPort;
};

export type CreateAppServicesOptions = Partial<AppServices>;

/**
 * Default ContentPort: Strapi adapter (Sprint 3).
 * Set CONTENT_ADAPTER=noop to force the no-op (tests / CMS offline isolation).
 */
function defaultContentPort(): ContentPort {
  if (process.env.CONTENT_ADAPTER?.trim().toLowerCase() === "noop") {
    return noopContentAdapter;
  }
  return createStrapiContentAdapter();
}

/**
 * Default DirectoryPort: Strapi adapter (Sprint 4).
 * Set DIRECTORY_ADAPTER=noop to force the no-op (tests / CMS offline isolation).
 */
function defaultDirectoryPort(): DirectoryPort {
  if (process.env.DIRECTORY_ADAPTER?.trim().toLowerCase() === "noop") {
    return noopDirectoryAdapter;
  }
  return createStrapiDirectoryAdapter();
}

/**
 * Default AuthPort + MemberPort: Strapi adapters sharing one cookie store (Sprint 5).
 * Set AUTH_ADAPTER=noop to force no-ops (tests / CMS offline isolation).
 */
function defaultAuthAndMembers(): Pick<AppServices, "auth" | "members"> {
  if (process.env.AUTH_ADAPTER?.trim().toLowerCase() === "noop") {
    return { auth: noopAuthAdapter, members: noopMemberAdapter };
  }

  const credentials = createCookieCredentialStore();
  return {
    auth: createStrapiAuthAdapter({ credentials }),
    members: createStrapiMemberAdapter({ credentials }),
  };
}

/**
 * Default MailPort from env (Sprint 5.7).
 * Missing MAIL_FROM → noop (NH-6). See createMailAdapterFromEnv.
 */
function defaultMailPort(): MailPort {
  return createMailAdapterFromEnv();
}

/**
 * Default PaymentPort from env (Sprint 6.3).
 * Stripe when STRIPE_SECRET_KEY set; bank-only when BANK_* only; else noop.
 * Set PAYMENT_ADAPTER=noop to force no-op (tests / isolation).
 */
function defaultPaymentPort(): PaymentPort {
  return createPaymentAdapterFromEnv();
}

/**
 * Default DuesPort: file-backed Community Dues (separate from donations).
 * Set DUES_ADAPTER=noop to force no-op (tests / isolation).
 */
function defaultDuesPort(): DuesPort {
  return createDuesAdapterFromEnv();
}

/**
 * Default SearchPort: Strapi filter adapter (Sprint 7).
 * Set SEARCH_ADAPTER=noop to force the no-op (tests / CMS offline isolation).
 */
function defaultSearchPort(): SearchPort {
  if (process.env.SEARCH_ADAPTER?.trim().toLowerCase() === "noop") {
    return noopSearchAdapter;
  }
  return createStrapiSearchAdapter();
}

/**
 * Factory Method: build the service graph.
 * Content, Directory, Auth, Members, Mail, Payments, Dues, and Search are env-selected.
 */
export function createAppServices(
  overrides: CreateAppServicesOptions = {},
): AppServices {
  const authBundle = defaultAuthAndMembers();

  return {
    content: overrides.content ?? defaultContentPort(),
    directory: overrides.directory ?? defaultDirectoryPort(),
    auth: overrides.auth ?? authBundle.auth,
    members: overrides.members ?? authBundle.members,
    payments: overrides.payments ?? defaultPaymentPort(),
    dues: overrides.dues ?? defaultDuesPort(),
    search: overrides.search ?? defaultSearchPort(),
    mail: overrides.mail ?? defaultMailPort(),
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
