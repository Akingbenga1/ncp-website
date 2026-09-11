export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-space-2xs focus:left-space-2xs focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-space-md focus:py-space-2xs focus:font-label focus:text-label-lg focus:text-on-primary"
    >
      Skip to main content
    </a>
  );
}
