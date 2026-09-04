"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { CommunityCarousel } from "@/components/CommunityCarousel";
import {
  communityPhotos,
  type PixabayCredit,
} from "@/data/pixabay-credits";

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
    <section className="hero-panel-stage" aria-labelledby="home3-heading">
      <div className="hero-panel-stage-bgs" aria-hidden="true">
        {slides.map((slide, slideIndex) => (
          <div
            key={`stage-${slide.background}`}
            className={
              slideIndex === index
                ? "hero-panel-bg is-active"
                : "hero-panel-bg"
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.background} alt="" className="hero-panel-bg-img" />
          </div>
        ))}
      </div>

      <div className="hero-panel-glow" aria-hidden="true" />
      <div className="hero-panel-glow hero-panel-glow--two" aria-hidden="true" />

      <div className="hero-panel">
        <div className="hero-panel-bgs" aria-hidden="true">
          {slides.map((slide, slideIndex) => (
            <div
              key={slide.background}
              className={
                slideIndex === index
                  ? "hero-panel-bg is-active"
                  : "hero-panel-bg"
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={slide.background} alt="" className="hero-panel-bg-img" />
            </div>
          ))}
          <div className="hero-panel-bg-blur" />
        </div>

        <div className="hero-panel-top">
          <div className="hero-panel-headline">
            <p className="hero-panel-kicker">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="hero-panel-kicker-logo"
                src="/images/ncp-logo-transparent.png"
                alt=""
                width={36}
                height={18}
              />
              <span>Nigerian Community Peterborough</span>
            </p>
            <h1 id="home3-heading">
              Building a proud home for Nigerians in{" "}
              <span className="hero-panel-brand">Peterborough</span>
            </h1>
          </div>
          <p className="hero-panel-aside">
            Modern families, professionals, and friends living in the UK —
            connected through culture, welcome, and shared ambition.
          </p>
        </div>

        <div className="hero-panel-center">
          <p className="hero-panel-watermark" aria-hidden="true">
            NCP
          </p>
          <div className="hero-panel-orbit" aria-hidden="true" />
          <CommunityCarousel
            slides={slides.map((slide) => slide.photo)}
            className="hero-panel-carousel"
            intervalMs={2625}
            priorityFirst
            showCaptions
            onIndexChange={onIndexChange}
          />
        </div>

        <div className="hero-panel-bottom">
          <div className="hero-panel-dock">
            <Link
              className="hero-panel-dock-logo"
              href="/"
              aria-label="NCP home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ncp-logo-transparent.png"
                alt=""
                width={72}
                height={37}
              />
            </Link>

            <nav className="hero-panel-dock-nav" aria-label="Primary">
              <Link href="/about">About</Link>
              <Link href="/events">Events</Link>
              <Link href="/get-involved">Join</Link>
            </nav>

            <Link className="btn btn-primary hero-panel-dock-cta" href="/get-involved">
              Get involved
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
