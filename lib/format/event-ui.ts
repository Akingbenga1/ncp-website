/** Card / calendar date chips for Events UI (Europe/London). */

const cardWhenFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Europe/London",
});

const monthTitleFmt = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "Europe/London",
});

const dayKeyFmt = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "Europe/London",
});

const timeOnlyFmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Europe/London",
});

export function formatEventCardWhen(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return cardWhenFmt.format(d).replace(",", " •");
}

export function formatMonthTitle(year: number, monthIndex: number): string {
  return monthTitleFmt.format(new Date(Date.UTC(year, monthIndex, 15)));
}

export function londonDayKey(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return dayKeyFmt.format(d);
}

export function formatEventTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return timeOnlyFmt.format(d);
}

const detailDateFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Europe/London",
});

const relatedChipFmt = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  day: "numeric",
  timeZone: "Europe/London",
});

/** e.g. "Tuesday, 15 Sept 2026" for event-detail meta strip. */
export function formatEventDetailDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return detailDateFmt.format(d);
}

/** e.g. "19:00 – 21:30" (London). */
export function formatEventTimeRange(startsAt: string, endsAt?: string): string {
  const start = formatEventTime(startsAt);
  if (!start) return "";
  if (!endsAt || endsAt === startsAt) return start;
  const end = formatEventTime(endsAt);
  return end ? `${start} – ${end}` : start;
}

/** Card chip like "OCT 11". */
export function formatEventDayChip(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const parts = relatedChipFmt.formatToParts(d);
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const day = parts.find((p) => p.type === "day")?.value ?? "";
  return `${month.toUpperCase()} ${day}`;
}

function toGoogleCalendarUtc(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

export function googleCalendarUrl(opts: {
  title: string;
  startsAt: string;
  endsAt?: string;
  venue?: string;
  details?: string;
}): string {
  const start = toGoogleCalendarUtc(opts.startsAt);
  if (!start) return "https://calendar.google.com";
  const endIso = opts.endsAt ?? opts.startsAt;
  let end = toGoogleCalendarUtc(endIso);
  if (!opts.endsAt || opts.endsAt === opts.startsAt) {
    const endDate = new Date(opts.startsAt);
    endDate.setUTCHours(endDate.getUTCHours() + 2);
    end = toGoogleCalendarUtc(endDate.toISOString());
  }
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: opts.title,
    dates: `${start}/${end}`,
  });
  if (opts.details) params.set("details", opts.details);
  if (opts.venue) params.set("location", opts.venue);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function eventIcsDataUrl(opts: {
  title: string;
  startsAt: string;
  endsAt?: string;
  venue?: string;
  description?: string;
  uid: string;
}): string {
  const start = toGoogleCalendarUtc(opts.startsAt);
  let end = opts.endsAt ? toGoogleCalendarUtc(opts.endsAt) : "";
  if (!end || end === start) {
    const endDate = new Date(opts.startsAt);
    endDate.setUTCHours(endDate.getUTCHours() + 2);
    end = toGoogleCalendarUtc(endDate.toISOString());
  }
  const escape = (value: string) =>
    value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NCP//Events//EN",
    "BEGIN:VEVENT",
    `UID:${opts.uid}@naijacp.co.uk`,
    `DTSTAMP:${toGoogleCalendarUtc(new Date().toISOString())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escape(opts.title)}`,
  ];
  if (opts.venue) lines.push(`LOCATION:${escape(opts.venue)}`);
  if (opts.description) lines.push(`DESCRIPTION:${escape(opts.description)}`);
  lines.push("END:VEVENT", "END:VCALENDAR");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

export type EventFilterId = "all" | "cultural" | "welcome" | "sports";

export function inferEventFilter(title: string, summary?: string): EventFilterId {
  const t = `${title} ${summary ?? ""}`.toLowerCase();
  if (/football|sport|tournament|cup|pitch|youth independence/.test(t)) {
    return "sports";
  }
  if (
    /cultural|barbecue|bbq|carnival|picnic|family day|independence day|heritage|jollof|dance/.test(
      t,
    )
  ) {
    return "cultural";
  }
  if (/meet|townhall|town hall|welcome|newcomer|social|orientation|civic/.test(t)) {
    return "welcome";
  }
  return "all";
}

export function eventCategoryBadge(
  title: string,
  summary?: string,
): { label: string; className: string } {
  const filter = inferEventFilter(title, summary);
  switch (filter) {
    case "sports":
      return {
        label: "Sports & Youth",
        className: "bg-surface-tinted text-primary",
      };
    case "cultural":
      return {
        label: "Cultural Celebration",
        className: "bg-secondary-container text-on-secondary-container",
      };
    case "welcome":
      return {
        label: "Townhalls & Meetups",
        className: "bg-surface-tinted text-primary",
      };
    default:
      return {
        label: "Community Gathering",
        className: "bg-surface-tinted text-primary",
      };
  }
}
