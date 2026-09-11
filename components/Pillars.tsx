import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type HeadingTag = "h2" | "h3";

export type PillarIllustration = {
  src: string;
  alt: string;
};

const items = [
  {
    index: "01",
    title: "Community",
    line: "Building together in Peterborough — a place to belong, not a brochure.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-12 w-12 text-brand-emerald"
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="32" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path
          d="M8 36c1.2-6 4.8-9 8-9s6.8 3 8 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M24 36c1.2-6 4.8-9 8-9s6.8 3 8 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    index: "02",
    title: "Culture",
    line: "Celebrating heritage — language, food, faith, and the stories we carry.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-12 w-12 text-brand-emerald"
        aria-hidden="true"
      >
        <path
          d="M24 8c8 6 12 12 12 20a12 12 0 0 1-24 0c0-8 4-14 12-20z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M24 16v20M18 24h12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    index: "03",
    title: "Connection",
    line: "Stronger together — families, friends, and neighbours looking out for each other.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-12 w-12 text-brand-emerald"
        aria-hidden="true"
      >
        <circle cx="14" cy="24" r="7" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="34" cy="24" r="7" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path
          d="M21 24h6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

type PillarsProps = {
  heading?: HeadingTag;
  illustrations?: PillarIllustration[];
};

export function Pillars({ heading = "h2", illustrations }: PillarsProps) {
  const Heading = heading;
  const withArt = Boolean(illustrations?.length);

  return (
    <div
      className={cn(
        "grid gap-space-md",
        withArt ? "md:grid-cols-3" : "md:grid-cols-3",
      )}
    >
      {items.map((item, index) => {
        const art = illustrations?.[index];
        return (
          <Reveal
            as="article"
            className={cn(
              "flex flex-col gap-space-sm rounded-2xl border border-border-subtle bg-surface-card p-space-md shadow-sm",
              withArt && "overflow-hidden p-0",
            )}
            delay={index * 110}
            key={item.title}
          >
            {!withArt ? (
              <span className="font-label text-label-eyebrow tracking-widest text-brand-mint">
                {item.index}
              </span>
            ) : null}
            {art ? (
              <figure className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={art.src}
                  alt={art.alt}
                  width={640}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </figure>
            ) : (
              item.icon
            )}
            <div className={cn(withArt && "flex flex-col gap-space-2xs p-space-md pt-0")}>
              <Heading className="font-headline text-headline-sm font-bold text-primary">
                {item.title}
              </Heading>
              <p className="font-body text-body-md text-text-secondary">{item.line}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
