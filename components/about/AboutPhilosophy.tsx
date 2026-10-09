import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import type { AboutPageContent } from "@/types/school";

interface AboutPhilosophyProps {
  data: AboutPageContent["philosophy"];
}

/**
 * Educational philosophy: one large statement as the section heading, then
 * a short narrative beside a portrait photograph (mirroring the story above,
 * so the page alternates). Text, not cards: the approach is an argument,
 * not a feature list.
 */
export function AboutPhilosophy({ data }: AboutPhilosophyProps) {
  const { eyebrow, statement, paragraphs, media, note } = data;

  return (
    <Section aria-labelledby="philosophy-title" tone="muted" className="overflow-x-clip">
      <Container width="wide">
        <Reveal preset="stagger" target="children" className="flex flex-col gap-lg">
          {eyebrow && (
            <p className="type-label flex items-center gap-sm text-text-muted">
              <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
              {eyebrow}
            </p>
          )}
          <h2 id="philosophy-title" className="type-h1 max-w-[22ch]">
            {statement}
          </h2>
        </Reveal>

        <div className="grid-editorial mt-2xl items-start gap-y-2xl lg:mt-section-sm">
          <div className="col-span-12 lg:col-span-6">
            <Reveal preset="stagger" target="children" className="flex flex-col gap-lg">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? "type-body-lg max-w-narrow" : "type-body max-w-narrow text-text-muted"}
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
            {note && <p className="type-meta mt-xl text-text-muted">{note}</p>}
          </div>

          {media && (
            <Reveal
              preset="imageReveal"
              className="col-span-12 -mx-gutter md:col-span-8 md:col-start-5 md:mx-0 lg:col-span-4 lg:col-start-9"
            >
              <ResponsiveImage
                image={media.image}
                mobileImage={media.mobileImage}
                sizes="third"
                aspectRatio="portrait"
                objectPosition={media.focalPoint}
                mobileObjectPosition={media.mobileFocalPoint}
              />
            </Reveal>
          )}
        </div>
      </Container>
    </Section>
  );
}
