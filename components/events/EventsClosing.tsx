import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TextLink } from "@/components/ui/TextLink";
import type { EventsPageContent } from "@/types/school";

interface EventsClosingProps {
  data: EventsPageContent["closing"];
}

/** A restrained next step on a muted band: heading and sentence, then two text links. */
export function EventsClosing({ data }: EventsClosingProps) {
  const { title, description, primaryAction, secondaryAction } = data;

  return (
    <Section aria-labelledby="events-next-title" tone="muted" spacing="sm">
      <Container width="wide">
        <div className="grid-editorial items-end gap-y-lg">
          <Reveal preset="stagger" target="children" className="col-span-12 flex flex-col gap-sm lg:col-span-7">
            <h2 id="events-next-title" className="type-h3">
              {title}
            </h2>
            {description && <p className="type-body max-w-narrow text-text-muted">{description}</p>}
          </Reveal>

          <Reveal
            preset="stagger"
            target="children"
            className="col-span-12 flex flex-wrap items-center gap-x-xl gap-y-sm lg:col-span-5 lg:justify-end"
          >
            {/* Wrapped so the reveal never animates the links' own opacity transition. */}
            <div>
              <TextLink href={primaryAction.href} variant="underline" className="type-body font-medium">
                {primaryAction.label}
                <ArrowRight aria-hidden="true" className="size-4" />
              </TextLink>
            </div>
            {secondaryAction && (
              <div>
                <TextLink href={secondaryAction.href} variant="underline" className="type-body-sm text-text-muted">
                  {secondaryAction.label}
                </TextLink>
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
