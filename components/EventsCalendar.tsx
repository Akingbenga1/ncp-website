"use client";

import { useMemo, useState } from "react";
import { EventDetailModal } from "@/components/EventDetailModal";
import { MaterialIcon } from "@/components/MaterialIcon";
import { cn } from "@/lib/cn";
import type { EventSummary } from "@/lib/domain/content";
import {
  formatEventTime,
  formatMonthTitle,
  londonDayKey,
} from "@/lib/format/event-ui";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

type EventsCalendarProps = {
  events: EventSummary[];
};

function startOfMonthParts(iso?: string): { year: number; month: number } {
  const base = iso ? new Date(iso) : new Date();
  const key = londonDayKey(base.toISOString());
  const [y, m] = key.split("-").map(Number);
  return { year: y, month: m - 1 };
}

/** Monday-based weekday index for a UTC calendar date in London. */
function mondayIndex(year: number, month: number, day: number): number {
  const utc = new Date(Date.UTC(year, month, day, 12));
  const key = londonDayKey(utc.toISOString());
  const [yy, mm, dd] = key.split("-").map(Number);
  const d = new Date(Date.UTC(yy, mm - 1, dd));
  const js = d.getUTCDay(); // 0 Sun … 6 Sat
  return js === 0 ? 6 : js - 1;
}

function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

export function EventsCalendar({ events }: EventsCalendarProps) {
  const initial = startOfMonthParts(events[0]?.startsAt);
  const [cursor, setCursor] = useState(initial);
  const [activeEvent, setActiveEvent] = useState<EventSummary | null>(null);

  const byDay = useMemo(() => {
    const map = new Map<string, EventSummary[]>();
    for (const event of events) {
      const key = londonDayKey(event.startsAt);
      if (!key) continue;
      const list = map.get(key) ?? [];
      list.push(event);
      map.set(key, list);
    }
    return map;
  }, [events]);

  const cells = useMemo(() => {
    const { year, month } = cursor;
    const dim = daysInMonth(year, month);
    const firstIdx = mondayIndex(year, month, 1);
    const prevDim = daysInMonth(year, month - 1);
    const out: {
      day: number;
      inMonth: boolean;
      key: string;
      events: EventSummary[];
    }[] = [];

    for (let i = 0; i < firstIdx; i++) {
      const day = prevDim - firstIdx + i + 1;
      const d = new Date(Date.UTC(year, month - 1, day, 12));
      out.push({
        day,
        inMonth: false,
        key: londonDayKey(d.toISOString()),
        events: [],
      });
    }
    for (let day = 1; day <= dim; day++) {
      const d = new Date(Date.UTC(year, month, day, 12));
      const key = londonDayKey(d.toISOString());
      out.push({
        day,
        inMonth: true,
        key,
        events: byDay.get(key) ?? [],
      });
    }
    while (out.length % 7 !== 0) {
      const day = out.length - (firstIdx + dim) + 1;
      const d = new Date(Date.UTC(year, month + 1, day, 12));
      out.push({
        day,
        inMonth: false,
        key: londonDayKey(d.toISOString()),
        events: [],
      });
    }
    return out;
  }, [byDay, cursor]);

  const shiftMonth = (delta: number) => {
    setCursor((c) => {
      const d = new Date(Date.UTC(c.year, c.month + delta, 1));
      return { year: d.getUTCFullYear(), month: d.getUTCMonth() };
    });
  };

  const goToday = () => setCursor(startOfMonthParts());

  const openEvent = (event: EventSummary) => setActiveEvent(event);

  return (
    <section
      id="calendar-view"
      className="mb-space-3xl scroll-mt-24"
      aria-labelledby="calendar-heading"
    >
      <div className="rounded-3xl bg-surface-card p-space-md shadow-md md:p-space-xl">
        <div className="mb-space-md flex flex-col justify-between gap-space-md pb-space-md lg:flex-row lg:items-center">
          <div>
            <span className="font-label text-label-eyebrow font-bold tracking-wider text-secondary uppercase">
              Plan Ahead
            </span>
            <h2
              id="calendar-heading"
              className="font-headline text-headline-lg font-bold text-on-surface"
            >
              Community Event Calendar
            </h2>
            <p className="mt-1 font-body text-body-sm text-text-secondary">
              Click highlighted event dates to view schedules, venue details,
              and RSVP.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-space-xs">
            <div className="flex items-center rounded-xl bg-surface-container-low p-1">
              <button
                type="button"
                className="rounded-lg p-2 text-on-surface transition-colors hover:bg-surface"
                title="Previous month"
                onClick={() => shiftMonth(-1)}
              >
                <MaterialIcon name="chevron_left" className="text-[20px]" />
              </button>
              <span className="px-space-xs font-headline text-headline-sm font-bold text-primary">
                {formatMonthTitle(cursor.year, cursor.month)}
              </span>
              <button
                type="button"
                className="rounded-lg p-2 text-on-surface transition-colors hover:bg-surface"
                title="Next month"
                onClick={() => shiftMonth(1)}
              >
                <MaterialIcon name="chevron_right" className="text-[20px]" />
              </button>
            </div>
            <button
              type="button"
              onClick={goToday}
              className="rounded-xl bg-surface-tinted px-space-xs py-space-2xs font-label text-label-md font-bold text-primary transition-colors hover:bg-secondary-container"
            >
              Today
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="mb-2 grid grid-cols-7 gap-2 text-center">
              {WEEKDAYS.map((d, i) => (
                <div
                  key={d}
                  className={cn(
                    "py-2 font-label text-label-eyebrow font-bold text-text-muted uppercase",
                    i >= 5 && "text-primary",
                  )}
                >
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {cells.map((cell) => {
                const hasEvents = cell.inMonth && cell.events.length > 0;
                const primary = cell.events[0];
                return (
                  <div
                    key={`${cell.key}-${cell.inMonth}`}
                    role={hasEvents ? "button" : undefined}
                    tabIndex={hasEvents ? 0 : undefined}
                    onClick={() => {
                      if (primary) openEvent(primary);
                    }}
                    onKeyDown={(e) => {
                      if (!primary) return;
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openEvent(primary);
                      }
                    }}
                    className={cn(
                      "flex min-h-[100px] flex-col justify-between rounded-xl p-2 font-body text-body-sm transition-colors",
                      !cell.inMonth &&
                        "bg-surface-container-low/40 text-text-muted/40",
                      cell.inMonth &&
                        !hasEvents &&
                        "bg-surface-container-lowest text-text-muted hover:bg-surface-tinted/30",
                      hasEvents &&
                        "cursor-pointer bg-surface-tinted/60 text-on-surface shadow-sm hover:bg-surface-tinted",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "font-bold",
                          hasEvents && "text-primary",
                        )}
                      >
                        {cell.day}
                      </span>
                      {hasEvents ? (
                        <span className="h-2 w-2 rounded-full bg-accent-gold" />
                      ) : null}
                    </div>
                    {primary ? (
                      <span className="truncate rounded bg-primary p-1 text-[11px] leading-tight font-bold text-on-primary shadow-sm">
                        {formatEventTime(primary.startsAt)} {primary.title}
                      </span>
                    ) : (
                      <span />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <EventDetailModal
        event={activeEvent}
        open={Boolean(activeEvent)}
        onClose={() => setActiveEvent(null)}
      />
    </section>
  );
}
