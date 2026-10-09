import { Reveal } from "@/components/animations/Reveal";
import { ScrollDepth } from "@/components/animations/ScrollDepth";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import type { AboutPageContent } from "@/types/school";

interface AboutHeroProps {
  data: AboutPageContent["hero"];
}

/**
 * About page opening: a statement first, then one wide photograph across the
 * full container (unlike the side-by-side homepage and Admissions heroes),
 * unveiled and drifting gently on scroll.
 *
 * The frame is portrait on phones, landscape on tablets and cinematic from
 * desktop, so the image reads well at every size.
 */
export function AboutHero({ data }: AboutHeroProps) {
  const { eyebrow, title, description, media } = data;

  return (
    <Section spacing="none" aria-labelledby="about-title" className="overflow-x-clip pt-section-sm pb-section-md">
      <Container width="wide">
        <Reveal preset="stagger" target="children" className="grid-editorial items-end gap-y-lg">
          {eyebrow && (
            <p className="type-label col-span-12 flex items-center gap-sm text-text-muted">
              <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
              {eyebrow}
            </p>
          )}
          <h1 id="about-title" className="type-h1 col-span-12 max-w-[18ch] lg:col-span-8">
            {title}
          </h1>
          {description && (
            <p className="type-body-lg col-span-12 max-w-narrow text-text-muted lg:col-span-4 lg:col-start-9">
              {description}
            </p>
          )}
        </Reveal>

        <Reveal preset="imageReveal" className="-mx-gutter mt-2xl md:mx-0 lg:mt-section-sm">
          <ScrollDepth amount={3}>
            <ResponsiveImage
              image={media.image}
              mobileImage={media.mobileImage}
              sizes="wide"
              aspectRatio="portrait"
              className="md:aspect-landscape lg:aspect-cinematic"
              objectPosition={media.focalPoint}
              mobileObjectPosition={media.mobileFocalPoint}
              priority
            />
          </ScrollDepth>
        </Reveal>
      </Container>
    </Section>
  );
}
