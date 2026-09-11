"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ncp_cookie_notice_dismissed";

/**
 * Informational essential-cookies notice (Task 7.6).
 * Dismiss preference is localStorage only — no non-essential cookie.
 */
export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      // Private mode / blocked storage — still show the notice.
    }
    setVisible(true);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore; notice simply stays dismissed for this page view.
    }
    setVisible(false);
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border-subtle bg-surface-card/95 shadow-elevated backdrop-blur-md"
      role="region"
      aria-label="Cookie notice"
      aria-live="polite"
    >
      <div className="mx-auto flex max-w-container-max flex-col items-start gap-space-sm px-gutter-mobile py-space-md sm:flex-row sm:items-center sm:justify-between md:px-gutter-desktop">
        <p className="font-body text-body-sm text-text-secondary">
          We use essential cookies only — for example to keep you signed in. We
          do not set analytics or marketing cookies at launch.{" "}
          <Link className="font-semibold text-primary hover:underline" href="/cookies">
            Cookie notice
          </Link>
          {" · "}
          <Link className="font-semibold text-primary hover:underline" href="/privacy">
            Privacy
          </Link>
        </p>
        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary shadow-sm transition-all hover:bg-primary-container"
          onClick={dismiss}
        >
          OK
        </button>
      </div>
    </div>
  );
}
