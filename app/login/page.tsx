import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";
import { Reveal } from "@/components/Reveal";
import { getAppServices } from "@/lib/composition";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to your Nigerian Community Peterborough membership account.",
};

export default async function LoginPage() {
  const session = await getAppServices().auth.getSession();

  return (
    <main id="main">
      <header className="page-hero page-hero--banner">
        <div className="wrap">
          <p className="hero-kicker">Membership</p>
          <h1>Sign in</h1>
          <p className="hero-lead hero-lead-inline">
            Access your free NCP membership account to stay connected with the
            community in Peterborough.
          </p>
        </div>
      </header>

      <section
        className="section section-overlap"
        aria-labelledby="login-heading"
      >
        <div className="wrap content-detail">
          <h2 id="login-heading" className="visually-hidden">
            Sign in form
          </h2>
          <Reveal className="home2-glass content-detail-panel" variant="up">
            <LoginForm signedInAs={session?.displayName ?? null} />
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
