import type { MailPort } from "@/lib/ports/mail-port";

/** No-op MailPort until a mail provider adapter is wired. */
export const noopMailAdapter: MailPort = {
  async send() {
    return { ok: false, error: "MailPort: send not configured" };
  },
};
