import type { MailMessage, MailSendResult } from "@/lib/domain/mail";

/** Port: transactional mail. Concrete: env-selected provider. */
export interface MailPort {
  send(message: MailMessage): Promise<MailSendResult>;
}
