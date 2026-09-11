"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { PixabayCredit } from "@/data/pixabay-credits";
import { cn } from "@/lib/cn";
import { CommunityPhoto } from "./CommunityPhoto";

type CommunityCarouselProps = {
  slides: PixabayCredit[];
  className?: string;
  intervalMs?: number;
  variant?: "contain" | "cover";
  /** Stretch stage to fill parent height (hero backgrounds). */
  fill?: boolean;
  showCaptions?: boolean;
  priorityFirst?: boolean;
  onIndexChange?: (index: number) => void;
};

export function CommunityCarousel({
  slides,
  className = "",
  intervalMs = 5200,
  variant = "cover",
  fill = false,
  showCaptions = false,
  priorityFirst = false,
  onIndexChange,
}: CommunityCarouselProps) {
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchX = useRef<number | null>(null);

  const count = slides.length;
  const active = slides[index] ?? slides[0];

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (count < 2 || paused || reducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [count, intervalMs, paused, reducedMotion]);

  if (!active) return null;

  const go = (next: number) => {
    setIndex((next + count) % count);
  };

  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl", className)}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      onTouchStart={(event) => {
        touchX.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchX.current == null) return;
        const delta = (event.changedTouches[0]?.clientX ?? 0) - touchX.current;
        touchX.current = null;
        if (Math.abs(delta) < 48) return;
        go(delta < 0 ? index + 1 : index - 1);
      }}
    >
      <p id={labelId} className="sr-only">
        Community photo carousel
      </p>
      <div
        className={cn(
          "relative w-full bg-surface-stone",
          fill ? "absolute inset-0 aspect-auto h-full" : "aspect-[4/3]",
        )}
      >
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.file}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              slideIndex === index ? "z-10 opacity-100" : "z-0 opacity-0",
            )}
            aria-hidden={slideIndex !== index}
          >
            <CommunityPhoto
              credit={slide}
              priority={priorityFirst && slideIndex === 0}
              className={variant === "contain" ? "object-contain" : "object-cover"}
            />
          </div>
        ))}
      </div>

      {showCaptions ? (
        <p
          className="absolute right-space-sm bottom-space-sm left-space-sm z-20 rounded-lg bg-surface-card/90 px-space-sm py-space-2xs font-body text-body-sm text-on-surface shadow-sm backdrop-blur-sm"
          aria-live="polite"
        >
          {active.alt}
        </p>
      ) : null}

      {count > 1 ? (
        <div className="absolute inset-x-0 bottom-space-sm z-20 flex items-center justify-center gap-space-2xs px-space-sm">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-card/90 text-primary shadow-sm backdrop-blur-sm hover:bg-surface-card"
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <div className="flex gap-space-3xs" role="tablist" aria-label="Slides">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.file}
                type="button"
                role="tab"
                aria-selected={slideIndex === index}
                aria-label={`Show slide ${slideIndex + 1}`}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-colors",
                  slideIndex === index ? "bg-brand-mint" : "bg-on-primary/50 hover:bg-on-primary/80",
                )}
                onClick={() => go(slideIndex)}
              />
            ))}
          </div>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-card/90 text-primary shadow-sm backdrop-blur-sm hover:bg-surface-card"
            aria-label="Next slide"
            onClick={() => go(index + 1)}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
