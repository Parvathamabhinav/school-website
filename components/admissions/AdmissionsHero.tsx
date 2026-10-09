import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import type { AdmissionsHeroContent } from "@/types/school";

interface AdmissionsHeroProps {
  data: AdmissionsHeroContent;
}

/**
 * Admissions page opening: the page's h1 and its two in-page actions beside a
 * landscape photograph. Quieter than the homepage hero (no full-height
 * composition or entrance timeline): parents arrive here with a purpose.
 *
 * - Phones: text, then the photograph edge to edge.
 * - Desktop: text left, photograph right, aligned to the text's baseline.
 */
export function AdmissionsHero({ data }: AdmissionsHeroProps) {
  const { eyebrow, title, description, media, primaryAction, secondaryAction } = data;

  return (
    <Section spacing="none" aria-labelledby="admissions-title" className="overflow-x-clip pt-section-sm pb-section-md">
      <Container width="wide">
        <div className="grid-editorial items-end gap-y-2xl">
          <Reveal preset="stagger" target="children" className="col-span-12 flex flex-col gap-lg lg:col-span-6 lg:pb-xl">
            {eyebrow && (
              <p className="type-label flex items-center gap-sm text-text-muted">
                <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
                {eyebrow}
              </p>
            )}
            <h1 id="admissions-title" className="type-h1 max-w-[16ch]">
              {title}
            </h1>
            {description && <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>}
            {/* Wrapped so the reveal never animates the links' own opacity transition. */}
            <div className="mt-xs flex flex-wrap items-center gap-x-xl gap-y-md">
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

          <Reveal preset="imageReveal" className="col-span-12 -mx-gutter md:mx-0 lg:col-span-6">
            <ResponsiveImage
              image={media.image}
              mobileImage={media.mobileImage}
              sizes="half"
              aspectRatio="landscape"
              objectPosition={media.focalPoint}
              mobileObjectPosition={media.mobileFocalPoint}
              priority
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
