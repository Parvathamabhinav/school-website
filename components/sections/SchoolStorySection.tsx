import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { EditorialGrid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { TextLink } from "@/components/ui/TextLink";
import type { StoryContent } from "@/types/school";
import { SchoolStoryMedia } from "./SchoolStoryMedia";

interface SchoolStorySectionProps {
  data: StoryContent;
}

/**
 * "Who we are": the homepage's first image-led section.
 *
 * - Phones/tablets: text, then the image running edge to edge.
 * - Desktop: a narrow text column against a seven-column image that breaks
 *   out of the container to the viewport's right edge. The eyebrow keeps
 *   the left alignment of the sections above it.
 */
export function SchoolStorySection({ data }: SchoolStorySectionProps) {
  const { eyebrow, title, body, link, media } = data;

  return (
    <Section aria-labelledby="story-title" className="overflow-x-clip">
      <Container width="wide">
        <EditorialGrid className="items-center gap-y-2xl">
          <Reveal
            preset="stagger"
            target="children"
            className="col-span-12 flex max-w-narrow flex-col gap-lg md:col-span-10 lg:col-span-5 xl:col-span-4"
          >
            {eyebrow && (
              <p className="type-label flex items-center gap-sm text-text-muted">
                <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
                {eyebrow}
              </p>
            )}
            <h2 id="story-title" className="type-h2">
              {title}
            </h2>
            <p className="type-body-lg text-text-muted">{body}</p>
            {link && (
              <div>
                <TextLink href={link.href} variant="underline" className="type-body-sm font-medium">
                  {link.label}
                </TextLink>
              </div>
            )}
          </Reveal>

          <SchoolStoryMedia
            media={media}
            className="col-span-12 -mx-gutter lg:col-span-7 lg:col-start-6 lg:mx-0 lg:bleed-right"
          />
        </EditorialGrid>
      </Container>
    </Section>
  );
}
