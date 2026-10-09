import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { aspectRatios } from "@/lib/media/presets";
import type { CampusContent } from "@/types/school";
import { CampusExperience } from "./CampusExperience";
import { campusLayouts } from "./campus-layouts";
import { CampusExplorer } from "./CampusExplorer";

interface CampusSectionProps {
  data: CampusContent;
}

/**
 * "Where it happens": the homepage's most immersive section.
 *
 * - Desktop: an interactive explorer (CampusExplorer, the only client code
 *   here) with a large photograph breaking out to the right edge. Up to four
 *   experiences go interactive from lg; five or more from xl, so the index
 *   never crowds the image.
 * - Below that: every experience as its own stacked block.
 *
 * Each layout is display:none at the other's breakpoints, so it is absent
 * from the accessibility tree and its lazy images never load there.
 */
export function CampusSection({ data }: CampusSectionProps) {
  const { eyebrow, title, description, experiences, aspectRatio = "landscape" } = data;
  const headingId = "campus-title";
  const layout = experiences.length > 4 ? "xl" : "lg";
  const numberOf = (index: number) => experiences[index].number ?? String(index + 1).padStart(2, "0");

  const intro = (
    <Reveal preset="stagger" target="children" className="flex flex-col gap-lg">
      {eyebrow && (
        <p className="type-label flex items-center gap-sm text-text-muted">
          <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
          {eyebrow}
        </p>
      )}
      <h2 id={headingId} className="type-h2">
        {title}
      </h2>
      {description && <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>}
    </Reveal>
  );

  return (
    <Section aria-labelledby={headingId} className="overflow-x-clip">
      <Container width="wide">
        <CampusExplorer
          intro={intro}
          labelledBy={headingId}
          layout={layout}
          frameClassName={aspectRatios[aspectRatio].className}
          experiences={experiences.map(({ id, title, description, caption }, index) => ({
            id,
            number: numberOf(index),
            title,
            description,
            caption,
          }))}
          media={experiences.map(({ id, media }) => (
            <ResponsiveImage
              key={id}
              image={media.image}
              sizes="feature"
              aspectRatio={aspectRatio}
              className="h-full"
              objectPosition={media.focalPoint}
            />
          ))}
        />

        <ol className={`mt-2xl flex flex-col gap-2xl ${campusLayouts[layout].stacked}`}>
          {experiences.map((experience, index) => (
            <li key={experience.id}>
              <CampusExperience experience={experience} number={numberOf(index)} />
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
