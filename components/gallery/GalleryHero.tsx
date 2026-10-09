import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { GalleryPageContent } from "@/types/school";

interface GalleryHeroProps {
  data: GalleryPageContent["hero"];
}

/**
 * Gallery opening: a centred, purely typographic introduction (the only
 * centred page heading on the site), so the photographs that follow carry
 * the page.
 */
export function GalleryHero({ data }: GalleryHeroProps) {
  const { eyebrow, title, description } = data;

  return (
    <Section spacing="none" aria-labelledby="gallery-title" className="pt-section-md pb-section-sm">
      <Container width="content">
        <Reveal preset="stagger" target="children" className="flex flex-col items-center gap-lg text-center">
          {eyebrow && (
            <p className="type-label flex items-center gap-sm text-text-muted">
              <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
              {eyebrow}
              <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
            </p>
          )}
          <h1 id="gallery-title" className="type-display max-w-[14ch] text-balance">
            {title}
          </h1>
          {description && <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>}
        </Reveal>
      </Container>
    </Section>
  );
}
