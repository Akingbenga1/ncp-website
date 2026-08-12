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
      <svg viewBox="0 0 48 48" className="pillar-icon" aria-hidden="true">
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
      <svg viewBox="0 0 48 48" className="pillar-icon" aria-hidden="true">
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
      <svg viewBox="0 0 48 48" className="pillar-icon" aria-hidden="true">
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
    <div className={withArt ? "pillars pillars--illustrated" : "pillars"}>
      {items.map((item, index) => {
        const art = illustrations?.[index];
        return (
          <Reveal
            as="article"
            className={withArt ? "pillar pillar--illustrated" : "pillar"}
            delay={index * 110}
            key={item.title}
          >
            {!withArt ? (
              <span className="pillar-index">{item.index}</span>
            ) : null}
            {art ? (
              <figure className="pillar-art">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={art.src}
                  alt={art.alt}
                  width={640}
                  height={640}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ) : (
              item.icon
            )}
            <Heading>{item.title}</Heading>
            <p>{item.line}</p>
          </Reveal>
        );
      })}
    </div>
  );
}
