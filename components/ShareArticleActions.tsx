"use client";

import { MaterialIcon } from "@/components/MaterialIcon";

type ShareArticleActionsProps = {
  title: string;
};

export function ShareArticleActions({ title }: ShareArticleActionsProps) {
  const shareWhatsApp = () => {
    const url = window.location.href;
    const text = encodeURIComponent(`${title}\n${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // ignore
    }
  };

  const saveForLater = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: window.location.href });
        return;
      }
    } catch {
      // fall through
    }
    await copyLink();
  };

  return (
    <div className="flex flex-col gap-space-sm rounded-2xl bg-surface-card p-space-md shadow-sm">
      <h3 className="font-headline text-headline-sm font-bold text-on-surface">
        Share &amp; Spread Word
      </h3>
      <p className="font-body text-body-sm text-text-secondary">
        Circulate this announcement through our diaspora channels and personal
        networks.
      </p>
      <div className="grid grid-cols-2 gap-space-2xs">
        <button
          type="button"
          onClick={shareWhatsApp}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-mint/20 px-space-xs py-2.5 font-label text-label-md font-semibold text-primary transition-colors hover:bg-brand-mint/30"
        >
          <MaterialIcon name="chat" className="text-[18px]" />
          WhatsApp
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-surface-stone px-space-xs py-2.5 font-label text-label-md font-semibold text-on-surface transition-colors hover:bg-surface-container"
        >
          <MaterialIcon name="link" className="text-[18px]" />
          Copy Link
        </button>
      </div>
      <div className="flex items-center justify-between pt-space-xs font-body text-body-sm text-text-muted">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-1 transition-colors hover:text-on-surface"
        >
          <MaterialIcon name="print" className="text-[16px]" />
          Print Release
        </button>
        <button
          type="button"
          onClick={saveForLater}
          className="flex items-center gap-1 transition-colors hover:text-primary"
        >
          <MaterialIcon name="bookmark_border" className="text-[16px]" />
          Save for Later
        </button>
      </div>
    </div>
  );
}
