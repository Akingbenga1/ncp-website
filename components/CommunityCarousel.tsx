"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { PixabayCredit } from "@/data/pixabay-credits";
import { CommunityPhoto } from "./CommunityPhoto";

type CommunityCarouselProps = {
  slides: PixabayCredit[];
  className?: string;
  intervalMs?: number;
  variant?: "contain" | "cover";
  showCaptions?: boolean;
  priorityFirst?: boolean;
  onIndexChange?: (index: number) => void;
};

export function CommunityCarousel({
  slides,
  className = "",
  intervalMs = 5200,
  variant = "cover",
  showCaptions = false,
  priorityFirst = false,
  onIndexChange,
}: CommunityCarouselProps) {
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const count = slides.length;
  const active = slides[index] ?? slides[0];

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  useEffect(() => {
    if (count < 2 || paused) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [count, intervalMs, paused]);

  if (!active) return null;

  const go = (next: number) => {
    setIndex((next + count) % count);
  };

  return (
    <div
      className={`community-carousel community-carousel--${variant} ${className}`.trim()}
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
      <p id={labelId} className="visually-hidden">
        Community photo carousel
      </p>
      <div className="community-carousel-stage">
        {slides.map((slide, slideIndex) => {
          const offset = slideIndex - index;
          const state =
            slideIndex === index
              ? "is-active"
              : offset === 1 || (index === count - 1 && slideIndex === 0)
                ? "is-next"
                : offset === -1 || (index === 0 && slideIndex === count - 1)
                  ? "is-prev"
                  : "";
          return (
            <div
              key={slide.file}
              className={`community-carousel-slide ${state}`.trim()}
              aria-hidden={slideIndex !== index}
            >
              <CommunityPhoto
                credit={slide}
                priority={priorityFirst && slideIndex === 0}
                className="community-carousel-photo"
              />
            </div>
          );
        })}
      </div>

      {showCaptions ? (
        <p className="community-carousel-caption" aria-live="polite">
          {active.alt}
        </p>
      ) : null}

      {count > 1 ? (
        <div className="community-carousel-controls">
          <button
            type="button"
            className="community-carousel-nav"
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <div className="community-carousel-dots" role="tablist" aria-label="Slides">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.file}
                type="button"
                role="tab"
                aria-selected={slideIndex === index}
                aria-label={`Show slide ${slideIndex + 1}`}
                className={
                  slideIndex === index
                    ? "community-carousel-dot is-active"
                    : "community-carousel-dot"
                }
                onClick={() => go(slideIndex)}
              />
            ))}
          </div>
          <button
            type="button"
            className="community-carousel-nav"
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
