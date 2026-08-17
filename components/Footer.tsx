import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-label">Organisation</p>
          <p>
            <strong>Nigerian Community Peterborough</strong>
          </p>
          <p>Community. Culture. Connection.</p>
        </div>
        <div>
          <p className="footer-label">Contact</p>
          <p>Theresa Okogwa</p>
          <p>
            <a href="mailto:theresa.okogwa@naijacp.co.uk">
              theresa.okogwa@naijacp.co.uk
            </a>
          </p>
        </div>
        <div>
          <p className="footer-label">EXCO line</p>
          <p>
            <a href="tel:+447737742387">+44 7737 742387</a>
          </p>
        </div>
        <div className="footer-credits">
          <p className="footer-label">Imagery</p>
          <p>
            Community photos from{" "}
            <a
              href="https://pixabay.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Pixabay
            </a>{" "}
            (Content License).
          </p>
          <p className="footer-nav-note">
            <Link href="/about">About</Link>
            {" · "}
            <Link href="/get-involved">Get involved</Link>
            {" · "}
            <Link href="/donation">Donation</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
