import type { BankTransferDetails as BankDetails } from "@/lib/domain/payment";
import { MaterialIcon } from "@/components/MaterialIcon";
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
      <div className="flex flex-col gap-4" role="status">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-card text-primary">
            <MaterialIcon name="account_balance" className="text-[20px]" />
          </div>
          <h2
            id="bank-transfer-heading"
            className="font-headline text-headline-sm font-bold text-primary"
          >
            Bank transfer
          </h2>
        </div>
        <p className="font-body text-sm text-text-secondary">
          Bank account details for offline giving will appear here once NCP
          confirms the account name, sort code, and account number to publish.
        </p>
        <p className="font-body text-xs text-text-muted">
          Meanwhile, contact{" "}
          <a
            className="font-semibold text-brand-emerald hover:underline"
            href={siteContact.emailHref}
          >
            {siteContact.contactName}
          </a>{" "}
          (
          <a
            className="font-semibold text-brand-emerald hover:underline"
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-card text-primary">
          <MaterialIcon name="account_balance" className="text-[20px]" />
        </div>
        <h2
          id="bank-transfer-heading"
          className="font-headline text-headline-sm font-bold text-primary"
        >
          Bank transfer
        </h2>
      </div>
      <p className="font-body text-sm text-text-secondary">
        Prefer to give offline? Use these details and include a clear payment
        reference (for example your name).
      </p>
      <dl className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-surface-card p-4 shadow-sm">
          <dt className="font-label text-xs tracking-wider text-text-muted uppercase">
            Account name
          </dt>
          <dd className="mt-1 font-body text-sm font-semibold text-on-surface">
            {details.accountName}
          </dd>
        </div>
        {details.bankName ? (
          <div className="rounded-xl bg-surface-card p-4 shadow-sm">
            <dt className="font-label text-xs tracking-wider text-text-muted uppercase">
              Bank
            </dt>
            <dd className="mt-1 font-body text-sm font-semibold text-on-surface">
              {details.bankName}
            </dd>
          </div>
        ) : null}
        <div className="rounded-xl bg-surface-card p-4 shadow-sm">
          <dt className="font-label text-xs tracking-wider text-text-muted uppercase">
            Sort code
          </dt>
          <dd className="mt-1 font-body text-sm font-semibold text-on-surface">
            <code>{details.sortCode}</code>
          </dd>
        </div>
        <div className="rounded-xl bg-surface-card p-4 shadow-sm">
          <dt className="font-label text-xs tracking-wider text-text-muted uppercase">
            Account number
          </dt>
          <dd className="mt-1 font-body text-sm font-semibold text-on-surface">
            <code>{details.accountNumber}</code>
          </dd>
        </div>
      </dl>
    </div>
  );
}
