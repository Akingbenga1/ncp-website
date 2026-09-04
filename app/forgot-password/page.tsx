import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Forgot password",
  description:
    "Request a password reset link for your Nigerian Community Peterborough membership.",
};

export default function ForgotPasswordPage() {
  return (
    <main id="main">
      <header className="page-hero page-hero--banner">
        <div className="wrap">
          <p className="hero-kicker">Membership</p>
          <h1>Forgot password</h1>
          <p className="hero-lead hero-lead-inline">
            Request a one-time link to choose a new password for your free NCP
            membership account.
          </p>
        </div>
      </header>

      <section
        className="section section-overlap"
        aria-labelledby="forgot-heading"
      >
        <div className="wrap content-detail">
          <h2 id="forgot-heading" className="visually-hidden">
            Forgot password form
          </h2>
          <Reveal className="home2-glass content-detail-panel" variant="up">
            <ForgotPasswordForm />
            <p className="content-detail-back">
              <Link className="btn btn-primary" href="/get-involved">
                Back to Get involved
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
