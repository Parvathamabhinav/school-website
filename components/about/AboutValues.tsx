import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import type { AboutPageContent } from "@/types/school";

interface AboutValuesProps {
  data: AboutPageContent["values"];
}

/**
 * Values and community: an introduction, then a photograph of school life
 * beside the values as a two-column list, each a serif name over a brass
 * rule and a sentence of explanation. No icons or cards.
 *
 * Phones: introduction, photograph, then the values.
 */
export function AboutValues({ data }: AboutValuesProps) {
  const { eyebrow, title, description, items, media, note } = data;

  return (
    <Section aria-labelledby="values-title" className="overflow-x-clip">
      <Container width="wide">
        <div className="grid-editorial">
          <Reveal preset="stagger" target="children" className="col-span-12 flex flex-col gap-lg md:col-span-10 lg:col-span-6">
            {eyebrow && (
              <p className="type-label flex items-center gap-sm text-text-muted">
                <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
                {eyebrow}
              </p>
            )}
            <h2 id="values-title" className="type-h2">
              {title}
            </h2>
            {description && <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>}
          </Reveal>
        </div>

        <div className="grid-editorial mt-2xl items-center gap-y-2xl lg:mt-section-sm">
          {media && (
            <Reveal
              preset="imageReveal"
              className="col-span-12 -mx-gutter md:col-span-8 md:mx-0 lg:col-span-4"
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

          <div className={media ? "col-span-12 lg:col-span-7 lg:col-start-6" : "col-span-12 lg:col-span-10"}>
            <Reveal as="ul" preset="stagger" target="children" className="grid gap-x-grid gap-y-2xl md:grid-cols-2">
              {items.map((value) => (
                <li key={value.id} className="flex flex-col gap-sm">
                  <span aria-hidden="true" className="h-px w-xl bg-accent" />
                  <h3 className="type-h3">{value.title}</h3>
                  <p className="type-body max-w-narrow text-text-muted">{value.description}</p>
                </li>
              ))}
            </Reveal>
            {note && <p className="type-meta mt-2xl text-text-muted">{note}</p>}
          </div>
        </div>
      </Container>
    </Section>
  );
}
