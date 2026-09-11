"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { TouchEvent } from "react";
import type { PixabayCredit } from "@/data/pixabay-credits";
import { cn } from "@/lib/cn";

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
      className="relative w-full"
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
      <p id={labelId} className="sr-only">
        Featured stories from Nigerian Community Peterborough
      </p>

      <div className="relative min-h-[70vh]" aria-live="polite" aria-atomic="true">
        {slides.map((slide, i) => {
          const isActive = i === index;

          return (
            <article
              key={slide.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-out",
                isActive ? "z-10 opacity-100" : "z-0 opacity-0",
              )}
              aria-hidden={!isActive}
              inert={!isActive ? true : undefined}
            >
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.photo.file}
                  alt={isActive ? slide.photo.alt : ""}
                  className="h-full w-full object-cover"
                  width={1200}
                  height={900}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "auto"}
                  draggable={false}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/20"
                  aria-hidden="true"
                />
              </div>

              <div className="relative z-10 flex h-full max-w-container-max flex-col justify-end px-gutter-mobile pb-space-3xl pt-space-3xl md:px-gutter-desktop">
                <p className="font-label text-label-eyebrow uppercase tracking-widest text-brand-mint">
                  {slide.kicker}
                </p>
                <h1
                  id={isActive ? "hero-heading" : undefined}
                  className="mt-space-2xs max-w-3xl font-display text-display-lg-mobile font-extrabold tracking-tight text-on-primary md:text-display-lg"
                >
                  {slide.title}
                </h1>
                <p className="mt-space-sm max-w-xl font-body text-body-lg text-surface-container-low">
                  {slide.lead}
                </p>
                <Link
                  className="mt-space-md inline-flex w-fit items-center justify-center rounded-lg bg-brand-mint px-space-md py-space-xs font-label text-label-lg text-primary hover:bg-primary-fixed"
                  href={slide.cta.href}
                  tabIndex={isActive ? 0 : -1}
                >
                  {slide.cta.label}
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <div className="absolute inset-x-0 bottom-space-md z-20 flex items-center justify-center gap-space-sm px-gutter-mobile md:px-gutter-desktop">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-card/90 text-primary shadow-sm backdrop-blur-sm hover:bg-surface-card"
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

        <div className="flex gap-space-3xs" role="tablist" aria-label="Choose story">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors",
                i === index ? "bg-brand-mint" : "bg-on-primary/40 hover:bg-on-primary/70",
              )}
              aria-selected={i === index}
              aria-label={`${slide.title} (${i + 1} of ${slides.length})`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-card/90 text-primary shadow-sm backdrop-blur-sm hover:bg-surface-card"
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

      <p className="sr-only">
        Showing story {index + 1} of {slides.length}: {active.title}
      </p>
    </div>
  );
}
