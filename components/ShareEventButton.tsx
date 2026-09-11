"use client";

import { MaterialIcon } from "@/components/MaterialIcon";

export function ShareEventButton({ title }: { title: string }) {
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
    } catch {
      // fall through to clipboard
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      title="Copy event link"
      onClick={share}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container text-primary transition-colors hover:bg-brand-mint/30"
    >
      <MaterialIcon name="share" className="text-[18px]" />
    </button>
  );
}
