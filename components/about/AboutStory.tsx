import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import type { AboutPageContent } from "@/types/school";

interface AboutStoryProps {
  data: AboutPageContent["story"];
}

/**
 * "Our story" (#story, linked from the homepage): a portrait photograph
 * beside a longer narrative than the homepage can hold. The first paragraph
 * leads at a larger size; verified milestones, when supplied, follow as a
 * short timeline.
 *
 * Text comes first in reading order (and on phones and tablets, so the page
 * doesn't open with two photographs in a row); from desktop the grid places
 * the photograph on the left.
 */
export function AboutStory({ data }: AboutStoryProps) {
  const { eyebrow, title, paragraphs, media, milestones, note } = data;
  const [lead, ...rest] = paragraphs;

  return (
    <Section id="story" aria-labelledby="story-title" className="overflow-x-clip">
      <Container width="wide">
        <div className="grid-editorial items-start gap-y-2xl">
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:pt-section-sm">
            <Reveal preset="stagger" target="children" className="flex flex-col gap-lg">
              {eyebrow && (
                <p className="type-label flex items-center gap-sm text-text-muted">
                  <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
                  {eyebrow}
                </p>
              )}
              <h2 id="story-title" className="type-h2">
                {title}
              </h2>
              {lead && <p className="type-body-lg max-w-narrow">{lead}</p>}
              {rest.map((paragraph) => (
                <p key={paragraph} className="type-body max-w-narrow text-text-muted">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            {milestones && milestones.length > 0 && (
              <dl className="mt-xl max-w-narrow border-b border-border">
                {milestones.map((milestone) => (
                  <div key={milestone.year + milestone.text} className="grid grid-cols-[5rem_1fr] gap-x-md border-t border-border py-sm">
                    <dt className="type-body font-medium tabular-nums">{milestone.year}</dt>
                    <dd className="type-body text-text-muted">{milestone.text}</dd>
                  </div>
                ))}
              </dl>
            )}
            {note && <p className="type-meta mt-xl text-text-muted">{note}</p>}
          </div>

          <Reveal
            preset="imageReveal"
            className="col-span-12 -mx-gutter md:col-span-8 md:mx-0 lg:col-span-5 lg:col-start-1 lg:row-start-1"
          >
            <ResponsiveImage
              image={media.image}
              mobileImage={media.mobileImage}
              sizes="aside"
              aspectRatio="portrait"
              objectPosition={media.focalPoint}
              mobileObjectPosition={media.mobileFocalPoint}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
