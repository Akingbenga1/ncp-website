import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <header className="py-space-xl">
        <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
          Page not found
        </p>
        <h1 className="mt-space-2xs font-display text-display-lg-mobile font-extrabold tracking-tight text-primary md:text-headline-xl">
          This path is not on our map
        </h1>
        <p className="mt-space-sm max-w-2xl font-body text-body-lg text-text-secondary">
          The page you asked for is missing or has moved. Head home, or reach
          the community through About or Get involved.
        </p>
      </header>

      <section className="pb-space-2xl" aria-label="Helpful links">
        <div className="rounded-2xl border border-border-subtle bg-surface-card p-space-lg shadow-sm">
          <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
            Where next
          </p>
          <h2 className="mt-space-2xs font-headline text-headline-lg font-bold text-primary">
            Back to NCP
          </h2>
          <p className="mt-space-sm max-w-2xl font-body text-body-lg text-text-secondary">
            Nigerian Community Peterborough — community, culture, and
            connection in Peterborough and beyond.
          </p>
          <div className="mt-space-md flex flex-wrap gap-space-2xs">
            <Link
              className="inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
              href="/"
            >
              Home
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
              href="/about"
            >
              About
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
              href="/get-involved"
            >
              Get involved
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
