"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

export type RevealVariant = "up" | "left" | "right" | "scale" | "clip";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  as?: "div" | "section" | "article" | "header";
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }

    const rect = el.getBoundingClientRect();
    const alreadyInView =
      rect.top < window.innerHeight - 12 && rect.bottom > 12;

    if (alreadyInView) {
      el.classList.add("is-in");
      return;
    }

    el.classList.add("reveal-armed");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("reveal-armed");
          el.classList.add("is-in");
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "80px 0px -32px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as ElementType;
  const style: CSSProperties = { transitionDelay: `${delay}ms` };

  return (
    <Component
      ref={ref}
      className={`reveal reveal-${variant} ${className}`.trim()}
      style={style}
    >
      {children}
    </Component>
  );
}
