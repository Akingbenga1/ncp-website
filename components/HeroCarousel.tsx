"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { TouchEvent } from "react";
import type { PixabayCredit } from "@/data/pixabay-credits";

const INTERVAL_MS = 7000;

export type HeroSlide = {
  id: string;
  kicker: string;
  title: string;
  lead: string;
  cta: { label: string; href: string };
  photo: PixabayCredit;
};

type HeroCarouselProps = {
  slides: readonly HeroSlide[];
};

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      const len = slides.length;
      setIndex(((next % len) + len) % len);
    },
    [slides.length],
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || slides.length < 2) return;
    const id = window.setInterval(goNext, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, slides.length, goNext]);

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 56) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  const active = slides[index];

  return (
    <div
      className="hero-carousel hero-carousel--full"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <p id={labelId} className="visually-hidden">
        Featured stories from Nigerian Community Peterborough
      </p>

      <div className="hero-carousel-track" aria-live="polite" aria-atomic="true">
        {slides.map((slide, i) => {
          const isActive = i === index;

          return (
            <article
              key={slide.id}
              className={`hero-carousel-item${isActive ? " is-active" : ""}`}
              aria-hidden={!isActive}
              inert={!isActive ? true : undefined}
              data-reduced={reducedMotion ? "true" : undefined}
            >
              <div className="hero-grid hero-grid-photo">
                <div className="hero-copy">
                  <p className="hero-kicker">{slide.kicker}</p>
                  <h1 id={isActive ? "hero-heading" : undefined}>{slide.title}</h1>
                  <p className="hero-lead">{slide.lead}</p>
                  <Link className="btn btn-primary" href={slide.cta.href} tabIndex={isActive ? 0 : -1}>
                    {slide.cta.label}
                  </Link>
                </div>

                <div className="hero-photo-wrap">
                  <div className="hero-photo hero-photo-frame">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.photo.file}
                      alt={isActive ? slide.photo.alt : ""}
                      className="hero-carousel-image"
                      width={1200}
                      height={900}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={i === 0 ? "high" : "auto"}
                      draggable={false}
                    />
                    <div className="hero-carousel-veil" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="hero-carousel-controls hero-carousel-controls--bar">
        <button
          type="button"
          className="hero-carousel-nav"
          onClick={goPrev}
          aria-label="Previous story"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
            />
          </svg>
        </button>

        <div className="hero-carousel-dots" role="tablist" aria-label="Choose story">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              className={`hero-carousel-dot${i === index ? " is-active" : ""}`}
              aria-selected={i === index}
              aria-label={`${slide.title} (${i + 1} of ${slides.length})`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className="hero-carousel-nav"
          onClick={goNext}
          aria-label="Next story"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z"
            />
          </svg>
        </button>
      </div>

      <p className="visually-hidden">
        Showing story {index + 1} of {slides.length}: {active.title}
      </p>
    </div>
  );
}
