import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/RegisterForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Create your free Nigerian Community Peterborough membership — active immediately.",
};

export default function RegisterPage() {
  return (
    <main id="main">
      <header className="page-hero page-hero--banner">
        <div className="wrap">
          <p className="hero-kicker">Membership</p>
          <h1>Create your free account</h1>
          <p className="hero-lead hero-lead-inline">
            Join Nigerian Community Peterborough. Registration is free and your
            account is active straight away — no approval wait.
          </p>
        </div>
      </header>

      <section
        className="section section-overlap"
        aria-labelledby="register-heading"
      >
        <div className="wrap content-detail">
          <h2 id="register-heading" className="visually-hidden">
            Registration form
          </h2>
          <Reveal className="home2-glass content-detail-panel" variant="up">
            <RegisterForm />
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
