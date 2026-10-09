import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import type { AboutPageContent } from "@/types/school";

interface AboutClosingProps {
  data: AboutPageContent["closing"];
}

/**
 * An understated next step before the footer: heading and description on the
 * left, one primary action and an optional text link on the right, under a
 * hairline. Quieter than the homepage's navy call to action on purpose.
 */
export function AboutClosing({ data }: AboutClosingProps) {
  const { title, description, primaryAction, secondaryAction } = data;

  return (
    <Section aria-labelledby="about-next-title" spacing="none" className="pb-section-md">
      <Container width="wide">
        <div className="grid-editorial items-end gap-y-xl border-t border-border pt-section-sm">
          <Reveal preset="stagger" target="children" className="col-span-12 flex flex-col gap-lg lg:col-span-7">
            <h2 id="about-next-title" className="type-h2">
              {title}
            </h2>
            {description && <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>}
          </Reveal>

          <Reveal
            preset="stagger"
            target="children"
            className="col-span-12 flex flex-wrap items-center gap-x-xl gap-y-md lg:col-span-5 lg:justify-end"
          >
            {/* Wrapped so the reveal never animates the links' own opacity transition. */}
            <div>
              <ButtonLink href={primaryAction.href} icon={<ArrowRight aria-hidden="true" className="size-4" />}>
                {primaryAction.label}
              </ButtonLink>
            </div>
            {secondaryAction && (
              <div>
                <TextLink href={secondaryAction.href} variant="underline" className="type-body-sm font-medium">
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
