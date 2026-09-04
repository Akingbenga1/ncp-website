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
    <main id="main">
      <header className="page-hero page-hero--banner">
        <div className="wrap">
          <p className="hero-kicker">Membership</p>
          <h1>Your profile</h1>
          <p className="hero-lead hero-lead-inline">
            Update your own membership details. Only you can change this
            information — NCP admins manage accounts separately in the CMS.
          </p>
        </div>
      </header>

      <section
        className="section section-overlap"
        aria-labelledby="profile-heading"
      >
        <div className="wrap content-detail">
          <h2 id="profile-heading" className="visually-hidden">
            Edit profile
          </h2>
          <Reveal className="home2-glass content-detail-panel" variant="up">
            <ProfileForm profile={profile} />
            <div className="form">
              <ProfileSignOut />
            </div>
            <p className="content-detail-back">
              <Link className="btn btn-primary" href="/">
                Back to Home
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
