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
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <header className="py-space-xl">
        <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
          Membership
        </p>
        <h1 className="mt-space-2xs font-display text-display-lg-mobile font-extrabold tracking-tight text-primary md:text-headline-xl">
          Sign in
        </h1>
        <p className="mt-space-sm max-w-2xl font-body text-body-lg text-text-secondary">
          Access your free NCP membership account to stay connected with the
          community in Peterborough.
        </p>
      </header>

      <section className="pb-space-2xl" aria-labelledby="login-heading">
        <h2 id="login-heading" className="sr-only">
          Sign in form
        </h2>
        <Reveal
          className="mx-auto max-w-lg rounded-2xl border border-border-subtle bg-surface-card p-space-lg shadow-sm"
          variant="up"
        >
          <LoginForm signedInAs={session?.displayName ?? null} />
          <p className="mt-space-lg">
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
              href="/get-involved"
            >
              Back to Get involved
            </Link>
          </p>
        </Reveal>
      </section>
    </main>
  );
}
