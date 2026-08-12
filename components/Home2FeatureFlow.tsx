"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { communityPhotos } from "@/data/pixabay-credits";

type Feature = {
  id: string;
  kicker: string;
  title: string;
  lead: string;
  cta: { label: string; href: string };
  photo: (typeof communityPhotos)[keyof typeof communityPhotos];
  align: "left" | "right";
};

const features: Feature[] = [
  {
    id: "membership",
    kicker: "Membership",
    title: "Register and belong",
    lead:
      "Create your free NCP account, stay close to community life in Peterborough, and show up as a member, volunteer, or neighbour who wants to be part of what we build next.",
    cta: { label: "Start membership", href: "/get-involved" },
    photo: communityPhotos.handsUnity,
    align: "left",
  },
  {
    id: "directory",
    kicker: "Business & community directory",
    title: "Find your people — and local places",
    lead:
      "A living Market of Nigerian-owned and Nigerian-serving businesses, churches, associations, and services around Peterborough — so support, trade, and trust stay in the community.",
    cta: { label: "Explore the idea", href: "/about" },
    photo: communityPhotos.ukStreetMarket,
    align: "right",
  },
  {
    id: "donation",
    kicker: "Donation",
    title: "Give so the work continues",
    lead:
      "A secure donation facility to fund gatherings, welcome, and the everyday work of connecting Nigerian families and friends here — one gift at a time.",
    cta: { label: "Support NCP", href: "/get-involved" },
    photo: communityPhotos.claspedHands,
    align: "left",
  },
  {
    id: "events-news",
    kicker: "Events & news",
    title: "Stay informed. Stay together.",
    lead:
      "Community events, announcements, and stories in one place — so you never miss the gathering, the update, or the moment that brings us closer.",
    cta: { label: "Get involved", href: "/get-involved" },
    photo: communityPhotos.heritageCelebration,
    align: "right",
  },
];

function useStageInView(threshold = 0.22) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

function FeatureStage({
  feature,
  children,
}: {
  feature: Feature;
  children: ReactNode;
}) {
  const ref = useStageInView(0.28);

  return (
    <article
      ref={ref}
      id={feature.id}
      className={`home2-feature home2-feature--${feature.align}`}
      aria-labelledby={`${feature.id}-heading`}
    >
      {children}
    </article>
  );
}

export function Home2FeatureFlow() {
  const introRef = useStageInView(0.35);

  return (
    <section className="home2-features" aria-label="What you will find on NCP">
      <header ref={introRef} className="home2-features-intro wrap">
        <div className="home2-glass home2-features-intro-panel">
          <p className="kicker">On this digital home</p>
          <h2>Ways we connect, inform, and grow</h2>
          <p className="section-lead">
            Four parts of NCP you will meet on the site — introduced here, ready
            for the community to use.
          </p>
        </div>
      </header>

      <div className="home2-features-rail" aria-hidden="true">
        <div className="home2-features-rail-line" />
      </div>

      {features.map((feature) => (
        <FeatureStage key={feature.id} feature={feature}>
          <div className="wrap home2-feature-grid">
            <div className="home2-glass home2-feature-copy">
              <p className="kicker">{feature.kicker}</p>
              <h3 id={`${feature.id}-heading`}>{feature.title}</h3>
              <p>{feature.lead}</p>
              <Link className="btn btn-primary" href={feature.cta.href}>
                {feature.cta.label}
              </Link>
            </div>
            <div className="home2-feature-media">
              <div className="home2-feature-frame">
                <CommunityPhoto credit={feature.photo} />
              </div>
            </div>
          </div>
        </FeatureStage>
      ))}
    </section>
  );
}
