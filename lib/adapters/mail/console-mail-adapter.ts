import type { MailPort } from "@/lib/ports/mail-port";
import type { MailMessage, MailSendResult } from "@/lib/domain/mail";

/**
 * Dev / staging MailPort: logs the message and reports success.
 * Use when MAIL_PROVIDER=console and MAIL_FROM is set (smoke without SMTP).
 */
export function createConsoleMailAdapter(fromEmail: string): MailPort {
  const from = fromEmail.trim();

  return {
    async send(message: MailMessage): Promise<MailSendResult> {
      if (!from) {
        return { ok: false, error: "MAIL_FROM is not configured" };
      }

      console.info("[MailPort:console]", {
        from,
        to: message.to.email,
        subject: message.subject,
        textPreview: message.text.slice(0, 160),
      });

      return { ok: true, messageId: `console-${Date.now()}` };
    },
  };
}
