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
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <header className="py-space-xl">
        <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
          Something went wrong
        </p>
        <h1 className="mt-space-2xs font-display text-display-lg-mobile font-extrabold tracking-tight text-primary md:text-headline-xl">
          We hit a snag
        </h1>
        <p className="mt-space-sm max-w-2xl font-body text-body-lg text-text-secondary">
          That request did not finish cleanly. You can try again, or return
          home and continue from there.
        </p>
      </header>

      <section className="pb-space-2xl" aria-label="Recovery options">
        <div className="rounded-2xl border border-border-subtle bg-surface-card p-space-lg shadow-sm">
          <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
            Try again
          </p>
          <h2 className="mt-space-2xs font-headline text-headline-lg font-bold text-primary">
            Recover and continue
          </h2>
          <p className="mt-space-sm max-w-2xl font-body text-body-lg text-text-secondary">
            If the problem keeps happening, contact Theresa or the EXCO line
            from the About page.
          </p>
          <div className="mt-space-md flex flex-wrap gap-space-2xs">
            <button
              className="inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
              type="button"
              onClick={retry}
            >
              Try again
            </button>
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
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
          </div>
        </div>
      </section>
    </main>
  );
}
