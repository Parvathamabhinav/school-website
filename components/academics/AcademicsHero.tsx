import { Reveal } from "@/components/animations/Reveal";
import { ScrollDepth } from "@/components/animations/ScrollDepth";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import type { AcademicsPageContent } from "@/types/school";

interface AcademicsHeroProps {
  data: AcademicsPageContent["hero"];
}

/**
 * Academics page opening: a display headline across the page, then a
 * stepped composition below it: the introduction in a narrow column under a
 * brass rule, and a landscape photograph running off the right edge.
 *
 * - Phones: headline, introduction, then the photograph edge to edge (portrait).
 * - Desktop: introduction left (four columns, three from xl), photograph
 *   right (eight columns, bled).
 */
export function AcademicsHero({ data }: AcademicsHeroProps) {
  const { eyebrow, title, description, media } = data;

  return (
    <Section spacing="none" aria-labelledby="academics-title" className="overflow-x-clip pt-section-sm pb-section-md">
      <Container width="wide">
        <Reveal preset="stagger" target="children" className="flex flex-col gap-lg">
          {eyebrow && (
            <p className="type-label flex items-center gap-sm text-text-muted">
              <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
              {eyebrow}
            </p>
          )}
          <h1 id="academics-title" className="type-display max-w-[13ch] text-balance">
            {title}
          </h1>
        </Reveal>

        <div className="grid-editorial mt-2xl items-start gap-y-2xl lg:mt-section-sm">
          {description && (
            <Reveal preset="fadeUp" className="col-span-12 md:col-span-8 lg:col-span-4 xl:col-span-3">
              <span aria-hidden="true" className="mb-lg block h-px w-xl bg-accent" />
              <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>
            </Reveal>
          )}

          <Reveal
            preset="imageReveal"
            className="col-span-12 -mx-gutter md:mx-0 lg:col-span-8 lg:col-start-5 lg:bleed-right"
          >
            <ScrollDepth amount={3}>
              <ResponsiveImage
                image={media.image}
                mobileImage={media.mobileImage}
                sizes="feature"
                aspectRatio="portrait"
                className="md:aspect-landscape"
                objectPosition={media.focalPoint}
                mobileObjectPosition={media.mobileFocalPoint}
                priority
              />
            </ScrollDepth>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
