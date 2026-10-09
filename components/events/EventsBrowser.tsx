"use client";

import { useId, useState, useSyncExternalStore, type ReactNode } from "react";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { buttonStyles } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { hasEnded, todayIn, type EventView } from "@/lib/dates/events";
import { cn } from "@/lib/utils/cn";
import type { EventCategory, EventsPageContent } from "@/types/school";

interface EventsBrowserProps {
  /** Published events: dated ones in date order, then undated. */
  events: EventView[];
  /** Only categories that have events, in filter order. */
  categories: EventCategory[];
  labels: EventsPageContent["listing"];
  timeZone: string;
  /** Shown without its photograph here, since it already leads the page. */
  featuredId?: string;
}

const ALL = "all";
/** Fewer events than this and filtering adds nothing. */
const MIN_EVENTS_FOR_FILTERS = 6;

const subscribeNever = () => () => {};

/**
 * The event listing.
 *
 * The page is static, so "today" is only known in the browser: until then
 * (and without JavaScript) every event is listed by date under a neutral
 * calendar heading, never as "upcoming". Once today's date in the school's
 * time zone is known, events split into upcoming (soonest first), dates to
 * be confirmed, and past (most recent first).
 *
 * Category filters (toggle buttons) appear only when they work and are
 * worthwhile; "Coming up" offers a way back to all events when a category
 * has nothing upcoming.
 */
export function EventsBrowser({ events, categories, labels, timeZone, featuredId }: EventsBrowserProps) {
  const today = useSyncExternalStore(subscribeNever, () => todayIn(timeZone), () => null);
  const filterLabelId = useId();
  const [active, setActive] = useState(ALL);

  const activeLabel = categories.find((category) => category.id === active)?.label;
  const shown = active === ALL ? events : events.filter((event) => event.categoryId === active);
  const filters =
    today !== null && labels.filters !== false && categories.length > 1 && events.length >= MIN_EVENTS_FOR_FILTERS;

  // Under a filter, "Coming up" says so when the category has nothing
  // upcoming; the other groups simply appear only when they have entries.
  const noUpcoming = activeLabel ? (
    <p className="type-body text-text-muted">
      No upcoming events in {activeLabel}.{" "}
      <button type="button" onClick={() => setActive(ALL)} className="link-underline font-medium text-text">
        Show all events
      </button>
    </p>
  ) : (
    <p className="type-body text-text-muted">{labels.noUpcoming}</p>
  );

  if (today === null) {
    return (
      <EventGroup id="calendar" title={labels.calendarTitle}>
        <EventList events={shown} featuredId={featuredId} />
      </EventGroup>
    );
  }

  const upcoming = shown.filter((event) => event.start && !hasEnded(event, today));
  const undated = shown.filter((event) => !event.start);
  const past = shown.filter((event) => hasEnded(event, today)).reverse();

  return (
    <>
      {filters && (
        <div className="mb-section-sm flex flex-col gap-md">
          <div role="group" aria-labelledby={filterLabelId} className="flex flex-wrap items-center gap-xs">
            <span id={filterLabelId} className="type-label mr-sm text-text-muted">
              Category
            </span>
            {[{ id: ALL, label: labels.allLabel }, ...categories].map((category) => (
              <button
                key={category.id}
                type="button"
                aria-pressed={active === category.id}
                onClick={() => setActive(category.id)}
                className={buttonStyles({
                  variant: "ghost",
                  size: "sm",
                  className:
                    "border border-border aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary aria-pressed:hover:bg-primary-hover",
                })}
              >
                {category.label}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="type-meta text-text-muted">
            {activeLabel ? `Showing ${shown.length} of ${events.length} events: ${activeLabel}.` : `Showing all ${events.length} events.`}
          </p>
        </div>
      )}

      <EventGroup id="upcoming" title={labels.upcomingTitle}>
        {upcoming.length > 0 ? <EventList events={upcoming} featuredId={featuredId} /> : noUpcoming}
      </EventGroup>

      {undated.length > 0 && (
        <EventGroup id="undated" title={labels.undatedTitle}>
          <EventList events={undated} featuredId={featuredId} />
        </EventGroup>
      )}

      {past.length > 0 && (
        <EventGroup id="past" title={labels.pastTitle}>
          <PastList events={past} />
        </EventGroup>
      )}
    </>
  );
}

function EventGroup({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const headingId = `events-${id}-title`;
  return (
    <section aria-labelledby={headingId} className="mt-section-sm first-of-type:mt-0">
      <h2 id={headingId} className="type-label mb-lg flex items-center gap-sm text-text-muted">
        <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Upcoming and undated events: a full editorial row each, under a hairline. */
function EventList({ events, featuredId }: { events: EventView[]; featuredId?: string }) {
  return (
    <ol className="border-b border-border">
      {events.map((event) => (
        <EventRow key={event.id} event={event} showMedia={event.id !== featuredId} />
      ))}
    </ol>
  );
}

function EventRow({ event, showMedia }: { event: EventView; showMedia: boolean }) {
  const media = showMedia ? event.media : undefined;

  return (
    <li className="grid-editorial items-start gap-y-lg border-t border-border py-xl">
      <div className="col-span-3 md:col-span-2">
        {event.day ? (
          <>
            {/* Visual date block; the full date is read from the details below. */}
            <p aria-hidden="true" className="type-h3 whitespace-nowrap tabular-nums md:type-h2">
              {event.day}
            </p>
            <p aria-hidden="true" className="type-label mt-2xs text-text-muted">
              {event.monthYear}
            </p>
          </>
        ) : (
          <p className="type-label pt-xs text-text-muted">
            <span aria-hidden="true">TBC</span>
            <span className="sr-only">Date to be confirmed</span>
          </p>
        )}
      </div>

      <div className={cn("col-span-9 flex flex-col gap-sm md:col-span-10", media ? "lg:col-span-6" : "lg:col-span-7")}>
        <EventLabels event={event} />
        <h3 className="type-h3">{event.title}</h3>
        {event.summary && <p className="type-body max-w-narrow text-text-muted">{event.summary}</p>}
        <EventMeta event={event} />
        {(event.link || event.registration) && (
          <div className="mt-xs flex flex-wrap gap-x-lg gap-y-xs">
            {event.registration && (
              <TextLink href={event.registration.href} variant="underline" className="type-body-sm font-medium">
                {event.registration.label}
              </TextLink>
            )}
            {event.link && (
              <TextLink href={event.link.href} variant="underline" className="type-body-sm font-medium">
                {event.link.label}
              </TextLink>
            )}
          </div>
        )}
      </div>

      {media && (
        <div className="col-span-12 md:col-span-10 md:col-start-3 lg:col-span-4 lg:col-start-9">
          <ResponsiveImage
            image={media.image}
            mobileImage={media.mobileImage}
            sizes="third"
            aspectRatio="landscape"
            objectPosition={media.focalPoint}
            mobileObjectPosition={media.mobileFocalPoint}
          />
        </div>
      )}
    </li>
  );
}

/** Past events: a quieter two-column archive with small photographs. */
function PastList({ events }: { events: EventView[] }) {
  return (
    <ol className="grid gap-x-grid border-t border-border md:grid-cols-2">
      {events.map((event) => (
        <li key={event.id} className="flex gap-lg border-b border-border py-lg">
          {event.media && (
            <div className="w-24 shrink-0 md:w-28">
              <ResponsiveImage
                image={event.media.image}
                sizes="third"
                aspectRatio="square"
                objectPosition={event.media.focalPoint}
              />
            </div>
          )}
          <div className="flex min-w-0 flex-col gap-2xs">
            <EventLabels event={event} />
            <h3 className="type-h4">{event.title}</h3>
            {event.summary && <p className="type-body-sm text-text-muted">{event.summary}</p>}
            <EventMeta event={event} compact />
          </div>
        </li>
      ))}
    </ol>
  );
}

function EventLabels({ event }: { event: EventView }) {
  if (!event.categoryLabel && !event.statusLabel) return null;
  return (
    <p className="type-label flex flex-wrap items-center gap-x-sm gap-y-2xs text-accent">
      {event.categoryLabel}
      {event.categoryLabel && event.statusLabel && <span className="sr-only">, </span>}
      {event.statusLabel && (
        <span className="rounded-xs border border-current px-2xs text-text">{event.statusLabel}</span>
      )}
    </p>
  );
}

function EventMeta({ event, compact = false }: { event: EventView; compact?: boolean }) {
  const parts = [
    event.dateLabel && (
      <time key="date" dateTime={event.start}>
        {event.dateLabel}
      </time>
    ),
    !compact && event.timeLabel && <span key="time">{event.timeLabel}</span>,
    !compact && event.location && <span key="place">{event.location}</span>,
  ].filter(Boolean);

  if (parts.length === 0) return null;
  return (
    <p className={cn("flex flex-wrap gap-x-md gap-y-2xs text-text", compact ? "type-meta" : "type-body-sm")}>
      {parts.map((part, index) => (
        <span key={index}>
          {index > 0 && <span className="sr-only">, </span>}
          {part}
        </span>
      ))}
    </p>
  );
}
