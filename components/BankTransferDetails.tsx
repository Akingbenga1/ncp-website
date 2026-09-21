import type { BankTransferDetails as BankDetails } from "@/lib/domain/payment";
import { MaterialIcon } from "@/components/MaterialIcon";

type BankTransferDetailsProps = {
  details: BankDetails | null;
};

/** Shown until BANK_* env values are published (NH bank details). */
const PLACEHOLDER_BANK_DETAILS: BankDetails = {
  accountName: "********",
  sortCode: "**-**-**",
  accountNumber: "********",
  bankName: "********",
};

type DetailRow = {
  label: string;
  value: string;
  mono?: boolean;
};

/**
 * Public bank transfer block — data from PaymentPort / DuesPort only (never Stripe).
 * When live account details are not configured, UK fields still render with asterisks.
 */
export function BankTransferDetailsBlock({ details }: BankTransferDetailsProps) {
  const resolved = details ?? PLACEHOLDER_BANK_DETAILS;
  const isPlaceholder = !details;

  const rows: DetailRow[] = [
    { label: "Account name", value: resolved.accountName },
    ...(resolved.bankName
      ? [{ label: "Bank", value: resolved.bankName } satisfies DetailRow]
      : []),
    { label: "Sort code", value: resolved.sortCode, mono: true },
    { label: "Account number", value: resolved.accountNumber, mono: true },
  ];

  return (
    <div
      className="flex flex-col gap-4"
      role={isPlaceholder ? "status" : undefined}
    >
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
      {isPlaceholder ? (
        <p className="font-body text-sm text-text-secondary">
          UK bank details for offline transfers are reserved below. Asterisks
          will be replaced when NCP publishes the live account name, sort code,
          and account number.
        </p>
      ) : (
        <p className="font-body text-sm text-text-secondary">
          Prefer to give offline? Use these details and include a clear payment
          reference (for example your name).
        </p>
      )}
      <div className="overflow-hidden rounded-xl border border-border-subtle bg-surface-card">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">UK bank account details</caption>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.label}
                className={
                  index < rows.length - 1
                    ? "border-b border-border-subtle"
                    : undefined
                }
              >
                <th
                  scope="row"
                  className="w-[40%] px-4 py-3 font-label text-xs font-medium tracking-wider text-text-muted uppercase sm:w-44"
                >
                  {row.label}
                </th>
                <td className="px-4 py-3 font-body text-sm font-semibold tracking-wide text-on-surface">
                  {row.mono ? <code>{row.value}</code> : row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
