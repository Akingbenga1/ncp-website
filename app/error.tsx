"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="status-page">
      <header className="page-hero page-hero--banner status-page-hero">
        <div className="wrap">
          <p className="hero-kicker">Something went wrong</p>
          <h1>We hit a snag</h1>
          <p className="hero-lead hero-lead-inline">
            That request did not finish cleanly. You can try again, or return
            home and continue from there.
          </p>
        </div>
      </header>

      <section className="section section-overlap" aria-label="Recovery options">
        <div className="wrap">
          <div className="home2-glass status-page-panel">
            <p className="kicker">Try again</p>
            <h2 className="section-title">Recover and continue</h2>
            <p className="section-lead">
              If the problem keeps happening, contact Theresa or the EXCO line
              from the About page.
            </p>
            <div className="status-page-actions">
              <button className="btn btn-primary" type="button" onClick={retry}>
                Try again
              </button>
              <Link className="btn btn-solid" href="/">
                Home
              </Link>
              <Link className="btn btn-solid" href="/about">
                About
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
