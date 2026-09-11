export function SiteLogo({
  inverted = false,
  compact = false,
}: {
  inverted?: boolean;
  compact?: boolean;
}) {
  return (
    <span className="flex items-center gap-space-xs">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`h-8 w-auto object-contain ${inverted ? "brightness-0 invert" : ""}`}
        src="/images/ncp-logo-transparent.png"
        alt=""
        width={245}
        height={127}
        decoding="async"
      />
      {compact ? (
        <span className="font-headline text-headline-sm font-bold tracking-tight text-primary sm:hidden">
          NCP
        </span>
      ) : (
        <span
          className={`hidden font-headline text-headline-sm font-bold tracking-tight sm:inline-block ${
            inverted ? "text-on-primary" : "text-primary"
          }`}
        >
          Nigerian Community Peterborough
        </span>
      )}
    </span>
  );
}
