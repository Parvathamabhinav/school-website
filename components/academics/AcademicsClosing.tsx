import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import type { AcademicsPageContent } from "@/types/school";

interface AcademicsClosingProps {
  data: AcademicsPageContent["closing"];
}

/**
 * One clear next step before the footer, centred under a short brass rule:
 * a large heading, a sentence, the primary action and a quieter text link.
 */
export function AcademicsClosing({ data }: AcademicsClosingProps) {
  const { title, description, primaryAction, secondaryAction } = data;

  return (
    <Section aria-labelledby="academics-next-title" tone="muted">
      <Container width="content">
        <Reveal preset="stagger" target="children" className="mx-auto flex max-w-[48rem] flex-col items-center gap-lg text-center">
          <span aria-hidden="true" className="h-px w-xl bg-accent" />
          <h2 id="academics-next-title" className="type-h1 max-w-[16ch] text-balance">
            {title}
          </h2>
          {description && <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>}
          {/* Wrapped so the reveal never animates the links' own opacity transition. */}
          <div className="mt-xs flex flex-wrap items-center justify-center gap-x-xl gap-y-md">
            <ButtonLink href={primaryAction.href} icon={<ArrowRight aria-hidden="true" className="size-4" />}>
              {primaryAction.label}
            </ButtonLink>
            {secondaryAction && (
              <TextLink href={secondaryAction.href} variant="underline" className="type-body-sm font-medium">
                {secondaryAction.label}
              </TextLink>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
