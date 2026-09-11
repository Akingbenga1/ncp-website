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
    <main
      id="main"
      className="mx-auto w-full max-w-container-max flex-grow bg-surface px-gutter-mobile pt-20 md:px-gutter-desktop"
    >
      <header className="py-space-xl">
        <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
          Membership
        </p>
        <h1 className="mt-space-2xs font-display text-display-lg-mobile font-extrabold tracking-tight text-primary md:text-headline-xl">
          Create your free account
        </h1>
        <p className="mt-space-sm max-w-2xl font-body text-body-lg text-text-secondary">
          Join Nigerian Community Peterborough. Registration is free and your
          account is active straight away — no approval wait.
        </p>
      </header>

      <section className="pb-space-2xl" aria-labelledby="register-heading">
        <h2 id="register-heading" className="sr-only">
          Registration form
        </h2>
        <Reveal
          className="mx-auto max-w-lg rounded-2xl border border-border-subtle bg-surface-card p-space-lg shadow-sm"
          variant="up"
        >
          <RegisterForm />
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
