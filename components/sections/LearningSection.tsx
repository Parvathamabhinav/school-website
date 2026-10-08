import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import type { LearningContent } from "@/types/school";
import { LearningExplorer } from "./LearningExplorer";
import { LearningPrinciple } from "./LearningPrinciple";

interface LearningSectionProps {
  data: LearningContent;
}

/**
 * "How we educate": an educational philosophy told through a few principles.
 *
 * - Desktop (lg+): an interactive editorial index beside a large media
 *   panel (LearningExplorer, the only client code here).
 * - Below lg: the same principles as a stacked sequence of blocks, with
 *   nothing hidden behind hover.
 *
 * Each layout is display:none at the other's breakpoints, so it is absent
 * from the accessibility tree and its lazy images never load there.
 */
export function LearningSection({ data }: LearningSectionProps) {
  const { eyebrow, title, description, principles } = data;
  const headingId = "learning-title";

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
    <Section aria-labelledby={headingId}>
      <Container width="wide">
        <LearningExplorer
          intro={intro}
          labelledBy={headingId}
          principles={principles.map(({ id, title, description }) => ({ id, title, description }))}
          media={principles.map(({ id, media }) => (
            <ResponsiveImage
              key={id}
              image={media.image}
              sizes="half"
              aspectRatio="landscape"
              objectPosition={media.focalPoint}
            />
          ))}
        />

        <ol className="mt-2xl flex flex-col gap-2xl lg:hidden">
          {principles.map((principle, index) => (
            <li key={principle.id}>
              <LearningPrinciple principle={principle} index={index} />
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
