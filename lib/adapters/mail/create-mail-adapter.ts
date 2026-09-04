import { noopMailAdapter } from "@/lib/adapters/noop";
import type { MailPort } from "@/lib/ports/mail-port";
import { createConsoleMailAdapter } from "./console-mail-adapter";
import { createResendMailAdapter } from "./resend-mail-adapter";

/**
 * Factory Method: pick a MailPort from env.
 * - Missing MAIL_FROM → noop (NH-6)
 * - MAIL_PROVIDER=console → console transport (dev/smoke)
 * - MAIL_PROVIDER=resend → Resend HTTP (needs RESEND_API_KEY)
 * - Anything else / unset provider → noop
 */
export function createMailAdapterFromEnv(): MailPort {
  const from = process.env.MAIL_FROM?.trim() ?? "";
  const provider = process.env.MAIL_PROVIDER?.trim().toLowerCase() ?? "";

  if (!from) {
    return noopMailAdapter;
  }

  if (provider === "console") {
    return createConsoleMailAdapter(from);
  }

  if (provider === "resend") {
    const apiKey = process.env.RESEND_API_KEY?.trim() ?? "";
    if (!apiKey) {
      return noopMailAdapter;
    }
    return createResendMailAdapter({ fromEmail: from, apiKey });
  }

  return noopMailAdapter;
}

/** True when a transactional from-address is configured (NH-6 resolved). */
export function isMailFromConfigured(): boolean {
  return Boolean(process.env.MAIL_FROM?.trim());
}
