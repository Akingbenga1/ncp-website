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
    <main id="main">
      <header className="page-hero page-hero--banner">
        <div className="wrap">
          <p className="hero-kicker">Membership</p>
          <h1>Reset password</h1>
          <p className="hero-lead hero-lead-inline">
            Choose a new password for your free NCP membership account.
          </p>
        </div>
      </header>

      <section
        className="section section-overlap"
        aria-labelledby="reset-heading"
      >
        <div className="wrap content-detail">
          <h2 id="reset-heading" className="visually-hidden">
            Reset password form
          </h2>
          <Reveal className="home2-glass content-detail-panel" variant="up">
            <ResetPasswordForm token={token} />
            <p className="content-detail-back">
              <Link className="btn btn-primary" href="/forgot-password">
                Request a new link
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
