import type { MailPort } from "@/lib/ports/mail-port";
import type { MailMessage, MailSendResult } from "@/lib/domain/mail";

export type CreateResendMailAdapterOptions = {
  fromEmail: string;
  apiKey: string;
};

/**
 * Concrete MailPort over Resend HTTP API.
 * Bound only at the composition root — no Resend SDK types leak into ports/UI.
 */
export function createResendMailAdapter(
  options: CreateResendMailAdapterOptions,
): MailPort {
  const from = options.fromEmail.trim();
  const apiKey = options.apiKey.trim();

  return {
    async send(message: MailMessage): Promise<MailSendResult> {
      if (!from) {
        return { ok: false, error: "MAIL_FROM is not configured" };
      }
      if (!apiKey) {
        return { ok: false, error: "RESEND_API_KEY is not configured" };
      }

      const body: Record<string, unknown> = {
        from,
        to: [message.to.email],
        subject: message.subject,
        text: message.text,
      };
      if (message.html) body.html = message.html;
      if (message.replyTo?.email) body.reply_to = message.replyTo.email;

      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const payload = (await response.json().catch(() => ({}))) as {
          id?: string;
          message?: string;
          error?: { message?: string };
        };

        if (!response.ok) {
          return {
            ok: false,
            error:
              payload.error?.message ||
              payload.message ||
              `Resend HTTP ${response.status}`,
          };
        }

        return { ok: true, messageId: payload.id };
      } catch (error) {
        return {
          ok: false,
          error:
            error instanceof Error ? error.message : "Mail send failed",
        };
      }
    },
  };
}
