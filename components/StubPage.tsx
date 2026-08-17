import type { Metadata } from "next";
import Link from "next/link";

type StubPageProps = {
  title: string;
  kicker: string;
  lead: string;
  metaTitle?: string;
};

export function StubPage({ title, kicker, lead, metaTitle }: StubPageProps) {
  return (
    <main id="main">
      <header className="page-hero">
        <div className="wrap">
          <p className="hero-kicker">{kicker}</p>
          <h1>{metaTitle ?? title}</h1>
          <p className="hero-lead hero-lead-inline">{lead}</p>
          <p>
            <Link className="btn btn-primary" href="/get-involved">
              Get involved
            </Link>
          </p>
        </div>
      </header>
    </main>
  );
}

export function stubMetadata(title: string, description: string): Metadata {
  return { title, description };
}
