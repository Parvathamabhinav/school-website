import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import type { AcademicsPageContent } from "@/types/school";

interface AcademicPhilosophyProps {
  data: AcademicsPageContent["philosophy"];
}

/**
 * Learning philosophy as an argument in two parts: the heading beside a
 * short narrative, then a photograph beside the principles that follow from
 * it, each a serif title over a brass rule. No cards or icons.
 *
 * Phones: heading, narrative, photograph, principles.
 */
export function AcademicPhilosophy({ data }: AcademicPhilosophyProps) {
  const { eyebrow, title, paragraphs, principles, media, note } = data;
  const [lead, ...rest] = paragraphs;

  return (
    <Section aria-labelledby="academic-philosophy-title" tone="muted" className="overflow-x-clip">
      <Container width="wide">
        <div className="grid-editorial items-start gap-y-xl">
          <Reveal preset="stagger" target="children" className="col-span-12 flex flex-col gap-lg lg:col-span-5">
            {eyebrow && (
              <p className="type-label flex items-center gap-sm text-text-muted">
                <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
                {eyebrow}
              </p>
            )}
            <h2 id="academic-philosophy-title" className="type-h2 max-w-[16ch]">
              {title}
            </h2>
          </Reveal>

          <Reveal
            preset="stagger"
            target="children"
            className="col-span-12 flex flex-col gap-lg lg:col-span-6 lg:col-start-7 lg:pt-2xl"
          >
            {lead && <p className="type-body-lg max-w-narrow">{lead}</p>}
            {rest.map((paragraph) => (
              <p key={paragraph} className="type-body max-w-narrow text-text-muted">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        {(media || (principles && principles.length > 0)) && (
          <div className="grid-editorial mt-2xl items-center gap-y-2xl lg:mt-section-sm">
            {media && (
              <Reveal preset="imageReveal" className="col-span-12 -mx-gutter md:mx-0 lg:col-span-6">
                <ResponsiveImage
                  image={media.image}
                  mobileImage={media.mobileImage}
                  sizes="half"
                  aspectRatio="landscape"
                  objectPosition={media.focalPoint}
                  mobileObjectPosition={media.mobileFocalPoint}
                />
              </Reveal>
            )}

            {principles && principles.length > 0 && (
              <Reveal
                as="ul"
                preset="stagger"
                target="children"
                className={
                  media
                    ? "col-span-12 flex flex-col gap-xl lg:col-span-5 lg:col-start-8"
                    : "col-span-12 grid gap-x-grid gap-y-xl md:grid-cols-3"
                }
              >
                {principles.map((principle) => (
                  <li key={principle.id} className="flex flex-col gap-sm">
                    <span aria-hidden="true" className="h-px w-xl bg-accent" />
                    <h3 className="type-h3">{principle.title}</h3>
                    <p className="type-body max-w-narrow text-text-muted">{principle.description}</p>
                  </li>
                ))}
              </Reveal>
            )}
          </div>
        )}

        {note && <p className="type-meta mt-2xl text-text-muted">{note}</p>}
      </Container>
    </Section>
  );
}
