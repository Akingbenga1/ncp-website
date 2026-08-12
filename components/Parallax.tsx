"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Parallax({
  children,
  factor = 0.14,
  className = "",
}: {
  children: ReactNode;
  factor?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const offset = (rect.top - window.innerHeight * 0.45) * factor;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [factor]);

  return (
    <div ref={ref} className={`parallax ${className}`.trim()}>
      {children}
    </div>
  );
}
