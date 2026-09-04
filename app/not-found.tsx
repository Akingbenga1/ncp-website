import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="status-page">
      <header className="page-hero page-hero--banner status-page-hero">
        <div className="wrap">
          <p className="hero-kicker">Page not found</p>
          <h1>This path is not on our map</h1>
          <p className="hero-lead hero-lead-inline">
            The page you asked for is missing or has moved. Head home, or reach
            the community through About or Get involved.
          </p>
        </div>
      </header>

      <section className="section section-overlap" aria-label="Helpful links">
        <div className="wrap">
          <div className="home2-glass status-page-panel">
            <p className="kicker">Where next</p>
            <h2 className="section-title">Back to NCP</h2>
            <p className="section-lead">
              Nigerian Community Peterborough — community, culture, and
              connection in Peterborough and beyond.
            </p>
            <div className="status-page-actions">
              <Link className="btn btn-primary" href="/">
                Home
              </Link>
              <Link className="btn btn-solid" href="/about">
                About
              </Link>
              <Link className="btn btn-solid" href="/get-involved">
                Get involved
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
