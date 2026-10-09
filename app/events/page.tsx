import { notFound } from "next/navigation";
import { EventsBrowser } from "@/components/events/EventsBrowser";
import { EventsClosing } from "@/components/events/EventsClosing";
import { EventsHero } from "@/components/events/EventsHero";
import { FeaturedEvent } from "@/components/events/FeaturedEvent";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { siteConfig } from "@/config/site";
import { school } from "@/data/school";
import { toEventView } from "@/lib/dates/events";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: school.eventsPage?.seo.title ?? "Events",
  description: school.eventsPage?.seo.description,
  path: "/events",
});

/** The school's time zone, checked at build time so a typo can't break the page in the browser. */
function schoolTimeZone(): string {
  const timeZone = school.location.timeZone ?? "UTC";
  try {
    new Intl.DateTimeFormat("en", { timeZone });
  } catch {
    throw new Error(`school.location.timeZone "${timeZone}" is not a valid IANA time zone.`);
  }
  return timeZone;
}

/**
 * Events: a masthead-style opening, an optional featured event, the listing
 * (grouped into upcoming, to be confirmed and past in the browser, where
 * today's date is known), and a quiet next step. Statically rendered; dates
 * are formatted at build time without reading the clock.
 */
export default function EventsPage() {
  const data = school.eventsPage;
  if (!data) notFound();

  const locale = siteConfig.locale.replace("_", "-");
  // Dated events by first day, then undated ones in data order.
  const events = school.events
    .filter((event) => event.published !== false)
    .map((event) => toEventView(event, data.categories, locale))
    .sort((a, b) => (a.start && b.start ? a.start.localeCompare(b.start) : a.start ? -1 : b.start ? 1 : 0));
  const featured = events.find((event) => event.id === data.featuredId);
  const categories = data.categories.filter((category) => events.some((event) => event.categoryId === category.id));

  return (
    <main id={MAIN_CONTENT_ID}>
      <EventsHero data={data.hero} />
      {featured && <FeaturedEvent event={featured} />}
      {events.length > 0 && (
        <Section aria-label="Event listing" tone="surface">
          <Container width="wide">
            <EventsBrowser
              events={events}
              categories={categories}
              labels={data.listing}
              timeZone={schoolTimeZone()}
              featuredId={featured?.id}
            />
            {data.note && <p className="type-meta mt-section-sm text-text-muted">{data.note}</p>}
          </Container>
        </Section>
      )}
      <EventsClosing data={data.closing} />
    </main>
  );
}
