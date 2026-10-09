import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { EventsPageContent } from "@/types/school";

interface EventsHeroProps {
  data: EventsPageContent["hero"];
}

/**
 * Events opening, set like a publication's masthead: the eyebrow on a full
 * hairline, the headline across most of the page, and the introduction
 * stepped to the right beneath a second rule. Typographic only; the
 * featured event below carries the first photograph.
 */
export function EventsHero({ data }: EventsHeroProps) {
  const { eyebrow, title, description } = data;

  return (
    <Section spacing="none" aria-labelledby="events-title" className="pt-section-sm pb-section-sm">
      <Container width="wide">
        <Reveal preset="stagger" target="children" className="flex flex-col">
          {eyebrow && <p className="type-label border-b border-border pb-sm text-text-muted">{eyebrow}</p>}
          <h1 id="events-title" className="type-display mt-xl max-w-[16ch] text-balance lg:mt-2xl">
            {title}
          </h1>
          {description && (
            <div className="mt-xl grid-editorial border-t border-border pt-lg lg:mt-2xl">
              <p className="type-body-lg col-span-12 max-w-narrow text-text-muted md:col-span-8 md:col-start-5 lg:col-span-5 lg:col-start-8">
                {description}
              </p>
            </div>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
