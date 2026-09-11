import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProfileForm, ProfileSignOut } from "@/components/ProfileForm";
import { Reveal } from "@/components/Reveal";
import { getAppServices } from "@/lib/composition";

export const metadata: Metadata = {
  title: "Your profile",
  description:
    "View and update your Nigerian Community Peterborough membership details.",
};

export default async function ProfilePage() {
  const { auth, members } = getAppServices();
  const session = await auth.getSession();
  if (!session) {
    redirect("/login");
  }

  const profile = await members.getOwnProfile();
  if (!profile) {
    redirect("/login");
  }

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
          Your profile
        </h1>
        <p className="mt-space-sm max-w-2xl font-body text-body-lg text-text-secondary">
          Update your own membership details. Only you can change this
          information — NCP admins manage accounts separately in the CMS.
        </p>
      </header>

      <section className="pb-space-2xl" aria-labelledby="profile-heading">
        <h2 id="profile-heading" className="sr-only">
          Edit profile
        </h2>
        <Reveal
          className="mx-auto max-w-lg rounded-2xl border border-border-subtle bg-surface-card p-space-lg shadow-sm"
          variant="up"
        >
          <ProfileForm profile={profile} />
          <ProfileSignOut />
          <p className="mt-space-lg">
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
              href="/"
            >
              Back to Home
            </Link>
          </p>
        </Reveal>
      </section>
    </main>
  );
}
