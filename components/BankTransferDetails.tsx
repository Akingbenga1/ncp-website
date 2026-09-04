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
      <div className="bank-transfer-block" role="status">
        <h2 id="bank-transfer-heading">Bank transfer</h2>
        <p>
          Bank account details for offline giving will appear here once NCP
          confirms the account name, sort code, and account number to publish.
        </p>
        <p className="form-note">
          Meanwhile, contact{" "}
          <a href={siteContact.emailHref}>{siteContact.contactName}</a> (
          <a href={siteContact.emailHref}>{siteContact.email}</a>) for transfer
          instructions.
        </p>
      </div>
    );
  }

  return (
    <div className="bank-transfer-block">
      <h2 id="bank-transfer-heading">Bank transfer</h2>
      <p>
        Prefer to give offline? Use these details and include a clear payment
        reference (for example your name).
      </p>
      <dl className="bank-transfer-dl">
        <div>
          <dt>Account name</dt>
          <dd>{details.accountName}</dd>
        </div>
        {details.bankName ? (
          <div>
            <dt>Bank</dt>
            <dd>{details.bankName}</dd>
          </div>
        ) : null}
        <div>
          <dt>Sort code</dt>
          <dd>
            <code>{details.sortCode}</code>
          </dd>
        </div>
        <div>
          <dt>Account number</dt>
          <dd>
            <code>{details.accountNumber}</code>
          </dd>
        </div>
      </dl>
    </div>
  );
}
