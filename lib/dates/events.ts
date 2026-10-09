import type { EditorialMedia, EventCategory, LinkAction, SchoolEvent } from "@/types/school";

/**
 * Event dates are calendar dates in the school's time zone, written in data
 * as "YYYY-MM-DD" (times as "HH:MM"). Formatting treats them as plain dates
 * (formatted in UTC so the day never shifts) and never reads the clock, so
 * it is safe during static rendering. Only `todayIn` reads the clock, and
 * only in the browser.
 */
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^\d{2}:\d{2}$/;

/** Everything a component needs to show an event; plain data, safe to pass to the client. */
export interface EventView {
  id: string;
  title: string;
  summary?: string;
  categoryId?: string;
  categoryLabel?: string;
  /** First and last day, ISO dates; absent while the date is unconfirmed. */
  start?: string;
  end?: string;
  /** Full date, e.g. "Saturday, November 14, 2026" or "October 22 – 24, 2026". */
  dateLabel?: string;
  /** For the large date block: "14" (or "22–24" within one month) and "Nov 2026". */
  day?: string;
  monthYear?: string;
  timeLabel?: string;
  location?: string;
  media?: EditorialMedia;
  link?: LinkAction;
  registration?: LinkAction;
  statusLabel?: string;
}

const statusLabels: Record<NonNullable<SchoolEvent["status"]>, string> = {
  postponed: "Postponed",
  cancelled: "Cancelled",
};

const asDate = (iso: string) => new Date(`${iso}T00:00:00Z`);
const asTime = (time: string) => new Date(`1970-01-01T${time}:00Z`);

function check(value: string | undefined, pattern: RegExp, field: string, id: string) {
  if (value !== undefined && !pattern.test(value)) {
    throw new Error(`Event "${id}": ${field} "${value}" must be written as ${pattern === TIME ? "HH:MM" : "YYYY-MM-DD"}.`);
  }
}

/** Prepares one event for display. Malformed dates or times fail the build rather than mislead. */
export function toEventView(event: SchoolEvent, categories: EventCategory[], locale: string): EventView {
  const { id, date, endDate, startTime, endTime } = event;
  check(date, ISO_DATE, "date", id);
  check(endDate, ISO_DATE, "endDate", id);
  check(startTime, TIME, "startTime", id);
  check(endTime, TIME, "endTime", id);
  if (date && endDate && endDate < date) throw new Error(`Event "${id}": endDate is before date.`);

  const end = date && endDate && endDate !== date ? endDate : undefined;
  const utc = { timeZone: "UTC" } as const;

  let dateLabel: string | undefined;
  let day: string | undefined;
  let monthYear: string | undefined;
  if (date) {
    const first = asDate(date);
    dateLabel = end
      ? new Intl.DateTimeFormat(locale, { ...utc, day: "numeric", month: "long", year: "numeric" }).formatRange(first, asDate(end))
      : new Intl.DateTimeFormat(locale, { ...utc, weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(first);
    const dayOf = (iso: string) => new Intl.DateTimeFormat(locale, { ...utc, day: "numeric" }).format(asDate(iso));
    day = end && end.slice(0, 7) === date.slice(0, 7) ? `${dayOf(date)}–${dayOf(end)}` : dayOf(date);
    monthYear = new Intl.DateTimeFormat(locale, { ...utc, month: "short", year: "numeric" }).format(first);
  }

  const timeFormat = new Intl.DateTimeFormat(locale, { ...utc, hour: "numeric", minute: "2-digit" });
  const timeLabel = startTime
    ? endTime
      ? timeFormat.formatRange(asTime(startTime), asTime(endTime))
      : timeFormat.format(asTime(startTime))
    : undefined;

  return {
    id,
    title: event.title,
    summary: event.summary,
    categoryId: event.category,
    categoryLabel: categories.find((category) => category.id === event.category)?.label,
    start: date,
    end,
    dateLabel,
    day,
    monthYear,
    timeLabel,
    location: event.location,
    media: event.media,
    link: event.link,
    registration: event.registration,
    statusLabel: event.status ? statusLabels[event.status] : undefined,
  };
}

/** Today's date ("YYYY-MM-DD") in the given time zone. Reads the clock: browser only. */
export function todayIn(timeZone: string): string {
  // en-CA formats dates as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

/** True once an event's last day is before today. Undated events are never past (or upcoming). */
export function hasEnded(event: EventView, today: string): boolean {
  const last = event.end ?? event.start;
  return last !== undefined && last < today;
}
