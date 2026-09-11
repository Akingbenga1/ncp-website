"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { communityPhotos } from "@/data/pixabay-credits";
import { cn } from "@/lib/cn";

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
    cta: { label: "Get involved", href: "/get-involved" },
    photo: communityPhotos.handsUnity,
    align: "left",
  },
  {
    id: "directory",
    kicker: "Market directory",
    title: "Find your people — and local places",
    lead:
      "Browse Nigerian-owned and Nigerian-serving businesses, churches, associations, and services around Peterborough — so support, trade, and trust stay in the community.",
    cta: { label: "Browse the Market", href: "/market" },
    photo: communityPhotos.ukStreetMarket,
    align: "right",
  },
  {
    id: "donation",
    kicker: "Donation",
    title: "Give so the work continues",
    lead:
      "Support gatherings, welcome, and the everyday work of connecting Nigerian families and friends here — one gift at a time, securely and transparently.",
    cta: { label: "Donate", href: "/donation" },
    photo: communityPhotos.claspedHands,
    align: "left",
  },
  {
    id: "events-news",
    kicker: "Events & news",
    title: "Stay informed. Stay together.",
    lead:
      "Community events, announcements, and stories in one place — so you never miss the gathering, the update, or the moment that brings us closer.",
    cta: { label: "See events", href: "/events" },
    photo: communityPhotos.heritageCelebration,
    align: "right",
  },
];

function useStageInView(threshold = 0.22) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function FeatureStage({
  feature,
  children,
}: {
  feature: Feature;
  children: ReactNode;
}) {
  const { ref, visible } = useStageInView(0.28);

  return (
    <article
      ref={ref}
      id={feature.id}
      className={cn(
        "py-space-xl transition duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      )}
      aria-labelledby={`${feature.id}-heading`}
    >
      {children}
    </article>
  );
}

export function Home2FeatureFlow() {
  const { ref: introRef, visible: introVisible } = useStageInView(0.35);

  return (
    <section className="py-space-xl" aria-label="What you will find on NCP">
      <header
        ref={introRef}
        className={cn(
          "mb-space-xl transition duration-700 ease-out",
          introVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        <div className="rounded-2xl border border-border-subtle bg-surface-card p-space-lg shadow-sm">
          <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
            On this digital home
          </p>
          <h2 className="mt-space-2xs font-headline text-headline-lg font-bold text-primary">
            Ways we connect, inform, and engage
          </h2>
          <p className="mt-space-sm max-w-2xl font-body text-body-lg text-text-secondary">
            Membership, Market, Donation, and Events &amp; news — the core of
            NCP online, ready for the community to use.
          </p>
        </div>
      </header>

      {features.map((feature) => (
        <FeatureStage key={feature.id} feature={feature}>
          <div
            className={cn(
              "grid items-center gap-space-lg md:grid-cols-2",
              feature.align === "right" && "md:[&>*:first-child]:order-2",
            )}
          >
            <div className="rounded-2xl border border-border-subtle bg-surface-card p-space-lg shadow-sm">
              <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-emerald">
                {feature.kicker}
              </p>
              <h3
                id={`${feature.id}-heading`}
                className="mt-space-2xs font-headline text-headline-md font-bold text-primary"
              >
                {feature.title}
              </h3>
              <p className="mt-space-sm font-body text-body-md text-text-secondary">
                {feature.lead}
              </p>
              <Link
                className="mt-space-md inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
                href={feature.cta.href}
              >
                {feature.cta.label}
              </Link>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-card">
              <div className="aspect-[4/3]">
                <CommunityPhoto credit={feature.photo} />
              </div>
            </div>
          </div>
        </FeatureStage>
      ))}
    </section>
  );
}
