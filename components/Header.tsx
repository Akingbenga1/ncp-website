"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SiteLogo } from "./SiteLogo";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/get-involved", label: "Get involved", cta: true },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const immersive =
    pathname === "/" ||
    pathname === "/home-2" ||
    pathname.startsWith("/home-2/");
  const panelHome =
    pathname === "/home-3" || pathname.startsWith("/home-3/");

  if (panelHome) {
    return null;
  }

  return (
    <header className={immersive ? "site-header site-header--immersive" : "site-header"}>
      <div className="wrap header-inner">
        <Link
          className="logo-link"
          href="/"
          aria-label="NCP — Nigerian Community Peterborough, home"
          onClick={() => setOpen(false)}
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
            {links.map((link) => {
              const current =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={link.cta ? "nav-cta" : undefined}
                    aria-current={current ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
