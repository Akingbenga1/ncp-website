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
      className="cookie-notice"
      role="region"
      aria-label="Cookie notice"
      aria-live="polite"
    >
      <div className="wrap cookie-notice-inner">
        <p className="cookie-notice-text">
          We use essential cookies only — for example to keep you signed in.
          We do not set analytics or marketing cookies at launch.{" "}
          <Link href="/cookies">Cookie notice</Link>
          {" · "}
          <Link href="/privacy">Privacy</Link>
        </p>
        <button
          type="button"
          className="btn btn-primary cookie-notice-dismiss"
          onClick={dismiss}
        >
          OK
        </button>
      </div>
    </div>
  );
}
