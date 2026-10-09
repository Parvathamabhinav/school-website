import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { TextLink } from "@/components/ui/TextLink";
import type { EventView } from "@/lib/dates/events";

interface FeaturedEventProps {
  event: EventView;
}

/**
 * The featured event: a large photograph beside a big date, the title and
 * the details. Labelled "Featured", never "upcoming": the page is static,
 * so it cannot know whether the date has passed (the listing below does).
 * Without a photograph the text spans the row.
 */
export function FeaturedEvent({ event }: FeaturedEventProps) {
  const { media } = event;

  return (
    <Section aria-labelledby="featured-event-title" spacing="none" className="overflow-x-clip pb-section-md">
      <Container width="wide">
        <div className="grid-editorial items-center gap-y-xl">
          {media && (
            <Reveal preset="imageReveal" className="col-span-12 -mx-gutter md:mx-0 lg:col-span-7">
              <ResponsiveImage
                image={media.image}
                mobileImage={media.mobileImage}
                sizes="feature"
                aspectRatio="landscape"
                objectPosition={media.focalPoint}
                mobileObjectPosition={media.mobileFocalPoint}
                priority
              />
            </Reveal>
          )}

          <Reveal
            preset="stagger"
            target="children"
            className={media ? "col-span-12 flex flex-col gap-md lg:col-span-4 lg:col-start-9" : "col-span-12 flex flex-col gap-md lg:col-span-8"}
          >
            <p className="type-label flex items-center gap-sm text-text-muted">
              <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
              Featured
              {event.categoryLabel && (
                <span className="text-accent">
                  <span className="sr-only">: </span>
                  {event.categoryLabel}
                </span>
              )}
              {event.statusLabel && (
                <span className="rounded-xs border border-current px-2xs text-text">
                  <span className="sr-only">, </span>
                  {event.statusLabel}
                </span>
              )}
            </p>
            {event.day && (
              <p aria-hidden="true" className="flex items-baseline gap-md">
                <span className="type-display tabular-nums">{event.day}</span>
                <span className="type-label text-text-muted">{event.monthYear}</span>
              </p>
            )}
            <h2 id="featured-event-title" className="type-h2">
              {event.title}
            </h2>
            {event.summary && <p className="type-body-lg max-w-narrow text-text-muted">{event.summary}</p>}
            <dl className="type-body-sm grid grid-cols-[auto_1fr] gap-x-lg gap-y-2xs border-t border-border pt-md">
              <dt className="text-text-muted">Date</dt>
              <dd>{event.dateLabel ? <time dateTime={event.start}>{event.dateLabel}</time> : "To be confirmed"}</dd>
              {event.timeLabel && (
                <>
                  <dt className="text-text-muted">Time</dt>
                  <dd>{event.timeLabel}</dd>
                </>
              )}
              {event.location && (
                <>
                  <dt className="text-text-muted">Place</dt>
                  <dd>{event.location}</dd>
                </>
              )}
            </dl>
            {(event.registration || event.link) && (
              <div className="flex flex-wrap gap-x-lg gap-y-xs">
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
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
