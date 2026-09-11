"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { CommunityCarousel } from "@/components/CommunityCarousel";
import {
  communityPhotos,
  type PixabayCredit,
} from "@/data/pixabay-credits";
import { cn } from "@/lib/cn";

type Home3Slide = {
  photo: PixabayCredit;
  background: string;
};

const slides: Home3Slide[] = [
  {
    photo: communityPhotos.friendsBlackWomen,
    background: "/images/home-3/bg-friends-women.jpg",
  },
  {
    photo: communityPhotos.jollofPlate,
    background: "/images/home-3/bg-jollof.jpg",
  },
  {
    photo: communityPhotos.friendsOnBench,
    background: "/images/home-3/bg-friends-bench.jpg",
  },
  {
    photo: communityPhotos.womenTogether,
    background: "/images/home-3/bg-women-laughing.jpg",
  },
  {
    photo: communityPhotos.proBusinessman,
    background: "/images/home-3/bg-businessman.jpg",
  },
];

export function Home3Hero() {
  const [index, setIndex] = useState(0);
  const onIndexChange = useCallback((next: number) => {
    setIndex(next);
  }, []);

  return (
    <section
      className="relative min-h-[85vh] overflow-hidden bg-primary text-on-primary"
      aria-labelledby="home3-heading"
    >
      <div className="absolute inset-0" aria-hidden="true">
        {slides.map((slide, slideIndex) => (
          <div
            key={`stage-${slide.background}`}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              slideIndex === index ? "opacity-100" : "opacity-0",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.background}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-primary/70" />
      </div>

      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-brand-emerald/30 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-brand-mint/20 blur-2xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[85vh] w-full max-w-container-max flex-col justify-between gap-space-lg px-gutter-mobile py-space-2xl pt-28 md:px-gutter-desktop">
        <div className="grid gap-space-lg lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="inline-flex items-center gap-space-2xs font-label text-label-eyebrow uppercase tracking-widest text-brand-mint">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="h-5 w-auto"
                src="/images/ncp-logo-transparent.png"
                alt=""
                width={36}
                height={18}
              />
              <span>Nigerian Community Peterborough</span>
            </p>
            <h1
              id="home3-heading"
              className="mt-space-sm font-display text-display-lg-mobile font-extrabold tracking-tight text-on-primary md:text-display-lg"
            >
              Building a proud home for Nigerians in{" "}
              <span className="text-brand-mint">Peterborough</span>
            </h1>
          </div>
          <p className="font-body text-body-lg text-surface-container-low lg:col-span-4">
            Modern families, professionals, and friends living in the UK —
            connected through culture, welcome, and shared ambition.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <p
            className="pointer-events-none absolute inset-x-0 -top-8 text-center font-display text-6xl font-extrabold tracking-widest text-on-primary/10 md:text-8xl"
            aria-hidden="true"
          >
            NCP
          </p>
          <CommunityCarousel
            slides={slides.map((slide) => slide.photo)}
            className="shadow-elevated"
            intervalMs={2625}
            priorityFirst
            showCaptions
            onIndexChange={onIndexChange}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-space-sm rounded-2xl bg-primary-container/80 p-space-sm backdrop-blur-md">
          <Link
            className="shrink-0"
            href="/"
            aria-label="NCP home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ncp-logo-transparent.png"
              alt=""
              width={72}
              height={37}
              className="h-8 w-auto"
            />
          </Link>

          <nav className="flex flex-wrap gap-space-md font-label text-label-lg text-surface-container-low" aria-label="Primary">
            <Link className="hover:text-brand-mint" href="/about">About</Link>
            <Link className="hover:text-brand-mint" href="/events">Events</Link>
            <Link className="hover:text-brand-mint" href="/get-involved">Join</Link>
          </nav>

          <Link
            className="inline-flex items-center justify-center rounded-lg bg-brand-mint px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-primary-fixed"
            href="/get-involved"
          >
            Get involved
          </Link>
        </div>
      </div>
    </section>
  );
}
