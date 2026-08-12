export function SiteLogo() {
  return (
    <span className="site-logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="site-logo-mark"
        src="/images/ncp-logo-transparent.png"
        alt=""
        width={245}
        height={127}
        decoding="async"
      />
      <span className="site-logo-wordmark">
        <span className="site-logo-name">Nigerian Community</span>
        <span className="site-logo-place">Peterborough</span>
      </span>
    </span>
  );
}
