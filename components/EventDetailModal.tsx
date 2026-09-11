"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { MaterialIcon } from "@/components/MaterialIcon";
import { siteContact } from "@/data/site-contact";
import type { EventSummary } from "@/lib/domain/content";
import { formatContentDateTime } from "@/lib/format/content-dates";
import { eventCategoryBadge } from "@/lib/format/event-ui";

type EventDetailModalProps = {
  event: EventSummary | null;
  open: boolean;
  onClose: () => void;
};

export function EventDetailModal({
  event,
  open,
  onClose,
}: EventDetailModalProps) {
  const titleId = useId();
  const [rsvpConfirmed, setRsvpConfirmed] = useState(false);

  useEffect(() => {
    if (!open) return;
    setRsvpConfirmed(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, event?.id]);

  if (!open || !event) return null;

  const badge = eventCategoryBadge(event.title, event.summary);
  const when = formatContentDateTime(event.startsAt);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 p-gutter-mobile backdrop-blur-md md:p-gutter-desktop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[90vh] w-full max-w-xl flex-col gap-space-sm overflow-y-auto rounded-2xl bg-surface p-space-md shadow-2xl md:p-space-lg"
      >
        <button
          type="button"
          aria-label="Close modal"
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface transition-colors hover:bg-surface-container-highest"
          onClick={onClose}
        >
          <MaterialIcon name="close" className="text-[20px]" />
        </button>

        <div className="flex items-center gap-space-2xs pr-10">
          <span
            className={`rounded-full px-space-xs py-1 font-label text-label-eyebrow font-bold uppercase ${badge.className}`}
          >
            Free Admission
          </span>
          <span className="font-body text-body-sm text-text-muted">
            • Peterborough, UK
          </span>
        </div>

        <h3
          id={titleId}
          className="pr-8 font-headline text-headline-lg font-bold text-on-surface"
        >
          {event.title}
        </h3>

        <div className="flex flex-col gap-space-3xs rounded-xl bg-surface-container-low p-space-xs font-body text-body-sm text-on-surface-variant">
          {when ? (
            <div className="flex items-start gap-space-2xs">
              <MaterialIcon
                name="calendar_today"
                className="mt-0.5 flex-shrink-0 text-[20px] text-primary"
              />
              <span className="font-semibold text-on-surface">{when}</span>
            </div>
          ) : null}
          {event.venue ? (
            <div className="flex items-start gap-space-2xs">
              <MaterialIcon
                name="place"
                className="mt-0.5 flex-shrink-0 text-[20px] text-accent-warm-ochre"
              />
              <span className="text-on-surface">{event.venue}</span>
            </div>
          ) : null}
        </div>

        <div className="py-space-2xs">
          <h4 className="mb-1 font-headline text-headline-sm font-bold text-on-surface">
            About This Gathering
          </h4>
          <p className="font-body text-body-md leading-relaxed text-text-secondary">
            {event.summary?.trim() ||
              "Join this Nigerian Community Peterborough gathering. Full details and any updates are on the event page."}
          </p>
        </div>

        <div className="flex flex-col gap-space-2xs border-t border-border-subtle pt-space-xs">
          <div className="flex items-center justify-between text-body-sm">
            <span className="text-text-muted">Community Coordinator:</span>
            <span className="font-semibold text-primary">
              {siteContact.contactName} (NCP EXCO)
            </span>
          </div>
          <div className="flex items-center justify-between text-body-sm">
            <span className="text-text-muted">Phone / Inquiries:</span>
            <a
              className="font-semibold text-brand-emerald hover:underline"
              href={siteContact.phoneHref}
            >
              {siteContact.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-space-xs pt-space-xs">
          {!rsvpConfirmed ? (
            <button
              type="button"
              className="flex-grow rounded-xl bg-primary px-space-md py-space-2xs text-center font-label text-label-lg font-bold text-on-primary shadow-md transition-all hover:bg-primary-container"
              onClick={() => setRsvpConfirmed(true)}
            >
              Confirm Free RSVP
            </button>
          ) : null}
          <button
            type="button"
            className="rounded-xl bg-surface-container px-space-md py-space-2xs font-label text-label-lg text-on-surface transition-colors hover:bg-surface-container-high"
            onClick={onClose}
          >
            Close
          </button>
          <Link
            href={`/events/${event.slug}`}
            className="rounded-xl bg-surface-tinted px-space-md py-space-2xs font-label text-label-lg font-semibold text-primary transition-colors hover:bg-secondary-container"
            onClick={onClose}
          >
            Full page
          </Link>
        </div>

        {rsvpConfirmed ? (
          <div
            className="rounded-xl bg-surface-tinted p-space-xs text-center font-body text-body-sm font-semibold text-primary"
            role="status"
          >
            Thank you! You have been registered. A confirmation link has been
            prepared — see the{" "}
            <Link
              className="underline underline-offset-2"
              href={`/events/${event.slug}`}
              onClick={onClose}
            >
              full event page
            </Link>{" "}
            for details.
          </div>
        ) : null}
      </div>
    </div>
  );
}
