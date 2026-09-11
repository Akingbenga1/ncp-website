import type { Metadata } from "next";
import Link from "next/link";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Reset password",
  description:
    "Choose a new password for your Nigerian Community Peterborough membership.",
};

type ResetPasswordPageProps = {
  searchParams: Promise<{ token?: string | string[] }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;
  const raw = params.token;
  const token = typeof raw === "string" ? raw.trim() : "";

  return (
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <header className="py-space-xl">
        <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
          Membership
        </p>
        <h1 className="mt-space-2xs font-display text-display-lg-mobile font-extrabold tracking-tight text-primary md:text-headline-xl">
          Reset password
        </h1>
        <p className="mt-space-sm max-w-2xl font-body text-body-lg text-text-secondary">
          Choose a new password for your free NCP membership account.
        </p>
      </header>

      <section className="pb-space-2xl" aria-labelledby="reset-heading">
        <h2 id="reset-heading" className="sr-only">
          Reset password form
        </h2>
        <Reveal
          className="mx-auto max-w-lg rounded-2xl border border-border-subtle bg-surface-card p-space-lg shadow-sm"
          variant="up"
        >
          <ResetPasswordForm token={token} />
          <p className="mt-space-lg">
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
              href="/forgot-password"
            >
              Request a new link
            </Link>
          </p>
        </Reveal>
      </section>
    </main>
  );
}
