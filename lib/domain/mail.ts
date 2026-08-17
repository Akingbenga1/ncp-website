/** Domain types for transactional mail (MailPort). No vendor SDK types. */

export type MailAddress = {
  email: string;
  name?: string;
};

export type MailMessage = {
  to: MailAddress;
  subject: string;
  text: string;
  html?: string;
  replyTo?: MailAddress;
};

export type MailSendResult = {
  ok: boolean;
  /** Opaque provider message id when available. */
  messageId?: string;
  error?: string;
};
