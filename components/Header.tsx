"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNavLinks, searchNav } from "@/data/primary-nav";
import { SiteLogo } from "./SiteLogo";

function isCurrentPath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const immersive =
    pathname === "/" ||
    pathname === "/home-2" ||
    pathname.startsWith("/home-2/");
  const panelHome =
    pathname === "/home-3" || pathname.startsWith("/home-3/");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (panelHome) {
    return null;
  }

  const searchCurrent = isCurrentPath(pathname, searchNav.href);
  const closeMenu = () => setOpen(false);

  return (
    <header className={immersive ? "site-header site-header--immersive" : "site-header"}>
      <div className="wrap header-inner">
        <Link
          className="logo-link"
          href="/"
          aria-label="NCP — Nigerian Community Peterborough, home"
          onClick={closeMenu}
        >
          <SiteLogo />
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="visually-hidden">Menu</span>
          <span className="nav-toggle-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
        <nav
          id="site-nav"
          className={open ? "site-nav is-open" : "site-nav"}
          aria-label="Primary"
        >
          <ul className="nav-list">
            {primaryNavLinks.map((link) => {
              const current = isCurrentPath(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={link.cta ? "nav-cta" : undefined}
                    aria-current={current ? "page" : undefined}
                    prefetch
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="nav-search-item">
              <Link
                href={searchNav.href}
                className="nav-search"
                aria-label={searchNav.label}
                aria-current={searchCurrent ? "page" : undefined}
                prefetch
                onClick={closeMenu}
              >
                <svg
                  className="nav-search-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="6.5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16.5 16.5L21 21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="nav-search-label">{searchNav.label}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
