import Link from "next/link";
import {
  publishedSocialLinks,
  siteContact,
} from "@/data/site-contact";

export function Footer() {
  const socialLinks = publishedSocialLinks();

  return (
    <footer className="site-footer">
      <div
        className={`wrap footer-grid${socialLinks.length > 0 ? " footer-grid--with-social" : ""}`}
      >
        <div>
          <p className="footer-label">Organisation</p>
          <p>
            <strong>{siteContact.organisation}</strong>
          </p>
          <p>{siteContact.tagline}</p>
        </div>
        <div>
          <p className="footer-label">Contact</p>
          <p>{siteContact.contactName}</p>
          <p>
            <a href={siteContact.emailHref}>{siteContact.email}</a>
          </p>
        </div>
        <div>
          <p className="footer-label">{siteContact.excoLabel}</p>
          <p>
            <a href={siteContact.phoneHref}>{siteContact.phoneDisplay}</a>
          </p>
        </div>
        {socialLinks.length > 0 ? (
          <div>
            <p className="footer-label">Follow</p>
            <ul className="footer-social">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
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
            {" · "}
            <Link href="/privacy">Privacy</Link>
            {" · "}
            <Link href="/cookies">Cookies</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
