"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNavLinks, searchNav } from "@/data/primary-nav";
import { cn } from "@/lib/cn";
import { MaterialIcon } from "./MaterialIcon";
import { SiteLogo } from "./SiteLogo";

function isCurrentPath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);
  const searchCurrent = isCurrentPath(pathname, searchNav.href);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 w-full bg-surface/90 shadow-header backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-container-max items-center justify-between gap-space-sm px-gutter-mobile md:px-gutter-desktop">
        <Link
          href="/"
          aria-label="NCP — Nigerian Community Peterborough, home"
          onClick={closeMenu}
          className="flex items-center gap-space-xs"
        >
          <SiteLogo />
          <span className="font-headline text-headline-sm font-bold tracking-tight text-primary sm:hidden">
            NCP
          </span>
        </Link>

        <button
          className="inline-flex items-center justify-center rounded-lg p-space-2xs text-primary md:hidden"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <MaterialIcon name={open ? "close" : "menu"} className="text-[28px]" />
        </button>

        <nav
          id="site-nav"
          aria-label="Primary"
          className={cn(
            "absolute top-20 right-0 left-0 border-t border-border-subtle bg-surface px-gutter-mobile py-space-sm shadow-elevated md:static md:flex md:items-center md:gap-space-2xs md:border-0 md:bg-transparent md:p-0 md:shadow-none",
            open ? "block" : "hidden md:flex",
          )}
        >
          <ul className="flex flex-col gap-space-3xs md:flex-row md:items-center md:gap-space-2xs">
            {primaryNavLinks.map((link) => {
              const current = isCurrentPath(pathname, link.href);
              if (link.cta) {
                return (
                  <li key={link.href} className="md:ml-space-2xs">
                    <Link
                      href={link.href}
                      aria-current={current ? "page" : undefined}
                      prefetch
                      onClick={closeMenu}
                      className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary shadow-sm transition-all hover:bg-primary-container md:w-auto"
                    >
                      Join Community
                    </Link>
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    prefetch
                    onClick={closeMenu}
                    className={cn(
                      "block rounded-lg px-space-xs py-space-3xs font-label text-label-lg transition-colors",
                      current
                        ? "bg-surface-tinted font-bold text-primary"
                        : "text-on-surface-variant hover:bg-surface-tinted hover:text-primary",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href={searchNav.href}
                aria-label={searchNav.label}
                aria-current={searchCurrent ? "page" : undefined}
                prefetch
                onClick={closeMenu}
                className={cn(
                  "flex items-center gap-space-3xs rounded-lg px-space-xs py-space-3xs font-label text-label-lg transition-colors",
                  searchCurrent
                    ? "bg-surface-tinted font-bold text-primary"
                    : "text-on-surface-variant hover:bg-surface-tinted hover:text-primary",
                )}
              >
                <MaterialIcon name="search" className="text-[20px]" />
                <span className="md:sr-only">{searchNav.label}</span>
              </Link>
            </li>
            <li className="hidden md:block">
              <Link
                href="/login"
                aria-label="Account"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary"
              >
                <MaterialIcon name="person" className="text-[18px]" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
