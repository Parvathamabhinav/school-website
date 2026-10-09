import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import type { AdmissionsCtaContent } from "@/types/school";

interface AdmissionsCtaSectionProps {
  data: AdmissionsCtaContent;
}

/**
 * The homepage's closing call to action: type and colour only, on the
 * inverse surface, after the photographic Student Life section.
 *
 * The heading takes the hero's display size, so the page ends where it
 * began. Below a hairline, the description and the actions share one row
 * from desktop: one primary button, an optional quieter text link. Phones
 * stack everything in reading order.
 */
export function AdmissionsCtaSection({ data }: AdmissionsCtaSectionProps) {
  const { eyebrow, title, description, primaryAction, secondaryAction } = data;
  const headingId = "admissions-cta-title";

  return (
    // Less space below: the footer continues on the same navy, after a hairline.
    <Section aria-labelledby={headingId} tone="inverse" spacing="none" className="pt-section-lg pb-section-md">
      <Container width="wide">
        <Reveal preset="stagger" target="children" className="flex flex-col gap-lg md:gap-xl">
          {eyebrow && (
            <p className="type-label flex items-center gap-sm text-text-muted">
              <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
              {eyebrow}
            </p>
          )}
          <h2 id={headingId} className="type-display max-w-[14ch] text-balance">
            {title}
          </h2>
        </Reveal>

        <div className="grid-editorial mt-2xl gap-y-xl border-t border-border pt-xl lg:mt-section-sm lg:items-end">
          {description && (
            <Reveal preset="fadeUp" className="col-span-12 md:col-span-8 lg:col-span-5">
              <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>
            </Reveal>
          )}

          <Reveal
            preset="stagger"
            target="children"
            className="col-span-12 flex flex-wrap items-center gap-x-xl gap-y-md lg:col-span-6 lg:col-start-7 lg:justify-end"
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
