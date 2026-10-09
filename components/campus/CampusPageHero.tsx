import { ArrowDown } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollDepth } from "@/components/animations/ScrollDepth";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { TextLink } from "@/components/ui/TextLink";
import type { CampusPageContent } from "@/types/school";

interface CampusPageHeroProps {
  data: CampusPageContent["hero"];
}

/**
 * Campus page opening: the headline beside a short introduction and an
 * optional in-page link, then one photograph edge to edge across the
 * viewport (the only full-bleed hero on the site), with a caption beneath.
 *
 * The frame is portrait on phones, landscape on tablets and cinematic from
 * desktop.
 */
export function CampusPageHero({ data }: CampusPageHeroProps) {
  const { eyebrow, title, description, media, caption, action } = data;

  return (
    <Section spacing="none" aria-labelledby="campus-page-title" className="overflow-x-clip pt-section-sm pb-section-md">
      <Container width="wide">
        <div className="grid-editorial items-end gap-y-lg">
          <Reveal preset="stagger" target="children" className="col-span-12 flex flex-col gap-lg lg:col-span-7">
            {eyebrow && (
              <p className="type-label flex items-center gap-sm text-text-muted">
                <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
                {eyebrow}
              </p>
            )}
            <h1 id="campus-page-title" className="type-display max-w-[12ch] text-balance">
              {title}
            </h1>
          </Reveal>

          {(description || action) && (
            <Reveal
              preset="stagger"
              target="children"
              className="col-span-12 flex flex-col items-start gap-lg md:col-span-8 lg:col-span-4 lg:col-start-9 lg:pb-sm"
            >
              {description && <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>}
              {/* Wrapped so the reveal never animates the link's own opacity transition. */}
              {action && (
                <div>
                  <TextLink href={action.href} variant="underline" className="type-body-sm font-medium">
                    {action.label}
                    <ArrowDown aria-hidden="true" className="size-4" />
                  </TextLink>
                </div>
              )}
            </Reveal>
          )}
        </div>
      </Container>

      <Reveal preset="imageReveal" className="mt-2xl lg:mt-section-sm">
        <ScrollDepth amount={3}>
          <ResponsiveImage
            image={media.image}
            mobileImage={media.mobileImage}
            sizes="full"
            aspectRatio="portrait"
            className="md:aspect-landscape lg:aspect-cinematic"
            objectPosition={media.focalPoint}
            mobileObjectPosition={media.mobileFocalPoint}
            priority
          />
        </ScrollDepth>
      </Reveal>

      {caption && (
        <Container width="wide">
          <p className="type-meta mt-sm text-text-muted">{caption}</p>
        </Container>
      )}
    </Section>
  );
}
