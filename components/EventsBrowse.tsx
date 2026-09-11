"use client";

import { useMemo, useState } from "react";
import { ContentEmptyState } from "@/components/ContentEmptyState";
import { EventListItem } from "@/components/EventListItem";
import { cn } from "@/lib/cn";
import type { EventSummary } from "@/lib/domain/content";
import {
  inferEventFilter,
  type EventFilterId,
} from "@/lib/format/event-ui";

const FILTERS: { id: EventFilterId; label: string }[] = [
  { id: "all", label: "All Events" },
  { id: "cultural", label: "Cultural" },
  { id: "welcome", label: "Townhalls & Meetups" },
  { id: "sports", label: "Sports & Youth" },
];

type EventsBrowseProps = {
  events: EventSummary[];
};

export function EventsBrowse({ events }: EventsBrowseProps) {
  const [filter, setFilter] = useState<EventFilterId>("all");

  const visible = useMemo(() => {
    if (filter === "all") return events;
    return events.filter((event) => {
      const inferred = inferEventFilter(event.title, event.summary);
      return inferred === filter || inferred === "all";
    });
  }, [events, filter]);

  return (
    <section className="mb-space-2xl" aria-labelledby="events-list-heading">
      <div className="mb-space-md flex flex-col justify-between gap-space-xs md:flex-row md:items-end">
        <div>
          <span className="font-label text-label-eyebrow font-bold tracking-wider text-secondary uppercase">
            Scheduled Gatherings
          </span>
          <h2
            id="events-list-heading"
            className="font-headline text-headline-lg font-bold tracking-tight text-on-surface"
          >
            Upcoming Community Gatherings
          </h2>
        </div>
        <div
          className="flex flex-wrap items-center gap-space-3xs rounded-xl bg-surface-container-low p-1.5"
          role="tablist"
          aria-label="Filter events"
        >
          {FILTERS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={filter === tab.id}
              onClick={() => setFilter(tab.id)}
              className={cn(
                "rounded-lg px-space-xs py-space-3xs font-label text-label-md transition-all",
                filter === tab.id
                  ? "bg-primary font-bold text-on-primary"
                  : "text-on-surface-variant hover:text-primary",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {events.length === 0 ? (
        <ContentEmptyState
          kicker="Coming soon"
          title="No upcoming events yet"
          lead="When NCP publishes dates and venues, they will appear here. In the meantime, stay close through Get involved."
        />
      ) : visible.length === 0 ? (
        <ContentEmptyState
          kicker="No matches"
          title="Nothing in this category right now"
          lead="Try another filter, or check back when more gatherings are published."
          primaryHref="#calendar-view"
          primaryLabel="Browse calendar"
        />
      ) : (
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          {visible.map((event) => (
            <EventListItem key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
