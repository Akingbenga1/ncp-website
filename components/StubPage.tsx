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
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <header className="py-space-xl">
        <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
          {kicker}
        </p>
        <h1 className="mt-space-2xs font-display text-display-lg-mobile font-extrabold tracking-tight text-primary md:text-headline-xl">
          {metaTitle ?? title}
        </h1>
        <p className="mt-space-sm max-w-2xl font-body text-body-lg text-text-secondary">
          {lead}
        </p>
        <p className="mt-space-md">
          <Link
            className="inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
            href="/get-involved"
          >
            Get involved
          </Link>
        </p>
      </header>
    </main>
  );
}

export function stubMetadata(title: string, description: string): Metadata {
  return { title, description };
}
