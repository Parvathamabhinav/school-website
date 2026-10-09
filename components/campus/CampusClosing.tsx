import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import type { CampusPageContent } from "@/types/school";

interface CampusClosingProps {
  data: CampusPageContent["closing"];
}

/**
 * The next step: a large heading across most of the page with the
 * description and actions stepped in beneath it, under a hairline.
 */
export function CampusClosing({ data }: CampusClosingProps) {
  const { title, description, primaryAction, secondaryAction } = data;

  return (
    <Section aria-labelledby="campus-next-title">
      <Container width="wide">
        <div className="grid-editorial gap-y-xl border-t border-border pt-section-sm">
          <Reveal preset="fadeUp" className="col-span-12 lg:col-span-9">
            <h2 id="campus-next-title" className="type-display max-w-[14ch] text-balance">
              {title}
            </h2>
          </Reveal>

          <Reveal
            preset="stagger"
            target="children"
            className="col-span-12 flex flex-col items-start gap-lg md:col-span-8 md:col-start-5 lg:col-span-5 lg:col-start-8"
          >
            {description && <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>}
            {/* Wrapped so the reveal never animates the links' own opacity transition. */}
            <div className="flex flex-wrap items-center gap-x-xl gap-y-md">
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
        </div>
      </Container>
    </Section>
  );
}
