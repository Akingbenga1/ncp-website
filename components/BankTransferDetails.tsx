import type { BankTransferDetails as BankDetails } from "@/lib/domain/payment";
import { siteContact } from "@/data/site-contact";

type BankTransferDetailsProps = {
  details: BankDetails | null;
};

/**
 * Public bank transfer block — data from PaymentPort only (never Stripe).
 */
export function BankTransferDetailsBlock({ details }: BankTransferDetailsProps) {
  if (!details) {
    return (
      <div className="flex flex-col gap-space-sm" role="status">
        <h2
          id="bank-transfer-heading"
          className="font-headline text-headline-md font-bold text-primary"
        >
          Bank transfer
        </h2>
        <p className="font-body text-body-md text-text-secondary">
          Bank account details for offline giving will appear here once NCP
          confirms the account name, sort code, and account number to publish.
        </p>
        <p className="font-body text-body-sm text-text-muted">
          Meanwhile, contact{" "}
          <a
            className="text-brand-emerald underline-offset-2 hover:underline"
            href={siteContact.emailHref}
          >
            {siteContact.contactName}
          </a>{" "}
          (
          <a
            className="text-brand-emerald underline-offset-2 hover:underline"
            href={siteContact.emailHref}
          >
            {siteContact.email}
          </a>
          ) for transfer instructions.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-space-sm">
      <h2
        id="bank-transfer-heading"
        className="font-headline text-headline-md font-bold text-primary"
      >
        Bank transfer
      </h2>
      <p className="font-body text-body-md text-text-secondary">
        Prefer to give offline? Use these details and include a clear payment
        reference (for example your name).
      </p>
      <dl className="grid gap-space-sm sm:grid-cols-2">
        <div className="rounded-xl bg-surface-stone p-space-sm">
          <dt className="font-label text-label-md text-text-muted">Account name</dt>
          <dd className="mt-space-3xs font-body text-body-md font-semibold text-on-surface">
            {details.accountName}
          </dd>
        </div>
        {details.bankName ? (
          <div className="rounded-xl bg-surface-stone p-space-sm">
            <dt className="font-label text-label-md text-text-muted">Bank</dt>
            <dd className="mt-space-3xs font-body text-body-md font-semibold text-on-surface">
              {details.bankName}
            </dd>
          </div>
        ) : null}
        <div className="rounded-xl bg-surface-stone p-space-sm">
          <dt className="font-label text-label-md text-text-muted">Sort code</dt>
          <dd className="mt-space-3xs font-body text-body-md font-semibold text-on-surface">
            <code>{details.sortCode}</code>
          </dd>
        </div>
        <div className="rounded-xl bg-surface-stone p-space-sm">
          <dt className="font-label text-label-md text-text-muted">Account number</dt>
          <dd className="mt-space-3xs font-body text-body-md font-semibold text-on-surface">
            <code>{details.accountNumber}</code>
          </dd>
        </div>
      </dl>
    </div>
  );
}
