import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { TextLink } from "@/components/ui/TextLink";
import type { AspectRatio, ImageSizes } from "@/lib/media/presets";
import { cn } from "@/lib/utils/cn";
import type { CampusPageContent, CampusSpace } from "@/types/school";

interface CampusSpacesProps {
  data: CampusPageContent["spaces"];
}

/**
 * "Explore the spaces" (#spaces): an introduction with a short index of the
 * spaces (in-page links), then each space as a captioned photograph with its
 * text, in a repeating sequence of four compositions that change scale and
 * side: wide, portrait, bled to the edge, then small and inset.
 *
 * Everything is visible without interaction. Tablets keep the sequence in a
 * simpler stack; phones read photograph, caption, then text for each space.
 */
export function CampusSpaces({ data }: CampusSpacesProps) {
  const { eyebrow, title, description, items, note } = data;

  return (
    <Section id="spaces" aria-labelledby="spaces-title" tone="surface" className="overflow-x-clip">
      <Container width="wide">
        <div className="grid-editorial items-end gap-y-2xl">
          <Reveal preset="stagger" target="children" className="col-span-12 flex flex-col gap-lg lg:col-span-6">
            {eyebrow && (
              <p className="type-label flex items-center gap-sm text-text-muted">
                <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
                {eyebrow}
              </p>
            )}
            <h2 id="spaces-title" className="type-h2 max-w-[16ch]">
              {title}
            </h2>
            {description && <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>}
          </Reveal>

          {items.length > 1 && (
            <nav aria-label="Spaces on this page" className="col-span-12 lg:col-span-5 lg:col-start-8">
              <Reveal as="ol" preset="stagger" target="children" className="grid border-t border-border sm:grid-cols-2 sm:gap-x-grid">
                {items.map((space, index) => (
                  <li key={space.id} className="flex items-baseline gap-sm border-b border-border py-sm">
                    <span aria-hidden="true" className="type-label w-lg shrink-0 text-text-muted tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <TextLink href={`#space-${space.id}`} variant="reveal" className="type-body-sm font-medium">
                      {space.title}
                    </TextLink>
                  </li>
                ))}
              </Reveal>
            </nav>
          )}
        </div>

        <ol className="mt-section-sm flex flex-col gap-section-sm lg:mt-section-md lg:gap-section-md">
          {items.map((space, index) => (
            <CampusSpaceItem key={space.id} space={space} index={index} />
          ))}
        </ol>

        {note && <p className="type-meta mt-section-sm text-text-muted">{note}</p>}
      </Container>
    </Section>
  );
}

type Composition = "wide" | "portrait" | "bleed" | "inset";

const sequence: Composition[] = ["wide", "portrait", "bleed", "inset"];

const compositions: Record<
  Composition,
  {
    figure: string;
    text: string;
    aspectRatio: AspectRatio;
    aspectClass?: string;
    sizes: ImageSizes;
    heading: string;
    /** The photograph runs edge to edge on phones, so its caption needs the gutter. */
    edgeOnPhones?: boolean;
  }
> = {
  /** Full container width, text in two columns beneath. */
  wide: {
    figure: "col-span-12 -mx-gutter md:mx-0",
    text: "col-span-12 lg:grid lg:grid-cols-12 lg:gap-x-grid",
    aspectRatio: "landscape",
    aspectClass: "lg:aspect-cinematic",
    sizes: "wide",
    heading: "type-h2",
    edgeOnPhones: true,
  },
  /** Tall photograph left, text set low on the right. */
  portrait: {
    figure: "col-span-12 md:col-span-8 lg:col-span-5",
    text: "col-span-12 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:self-end lg:pb-2xl",
    aspectRatio: "portrait",
    sizes: "aside",
    heading: "type-h3",
  },
  /** Text left, photograph running off the right edge. */
  bleed: {
    figure: "col-span-12 -mx-gutter md:mx-0 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:bleed-right",
    text: "col-span-12 md:col-span-8 lg:col-span-4 lg:row-start-1 lg:self-center",
    aspectRatio: "landscape",
    sizes: "feature",
    heading: "type-h2",
    edgeOnPhones: true,
  },
  /** A smaller, square photograph set in from the right: a change of scale. */
  inset: {
    figure: "col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-8 lg:row-start-1",
    text: "col-span-12 md:col-span-8 lg:col-span-5 lg:col-start-2 lg:row-start-1 lg:self-center",
    aspectRatio: "landscape",
    aspectClass: "md:aspect-square",
    sizes: "third",
    heading: "type-h3",
  },
};

function CampusSpaceItem({ space, index }: { space: CampusSpace; index: number }) {
  const { id, category, title, description, media, caption, details } = space;
  const composition = sequence[index % sequence.length];
  const layout = compositions[composition];
  const number = String(index + 1).padStart(2, "0");

  const heading = (
    <Reveal preset="stagger" target="children" className="flex flex-col gap-sm lg:col-span-5">
      <p className="type-label flex items-center gap-sm text-text-muted">
        <span aria-hidden="true" className="text-accent tabular-nums">
          {number}
        </span>
        {category}
      </p>
      <h3 className={layout.heading}>{title}</h3>
    </Reveal>
  );

  const body = (
    <div className={cn("flex flex-col gap-md", composition === "wide" ? "mt-md lg:col-span-6 lg:col-start-7 lg:mt-0" : "mt-md")}>
      <Reveal preset="fadeUp">
        <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>
      </Reveal>
      {details && details.length > 0 && (
        <ul className="flex flex-col gap-2xs">
          {details.map((detail) => (
            <li key={detail} className="type-body-sm flex items-baseline gap-sm">
              <span aria-hidden="true" className="h-px w-sm shrink-0 translate-y-[-0.25em] bg-accent" />
              {detail}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <li id={`space-${id}`} className="grid-editorial items-start gap-y-lg">
      <figure className={layout.figure}>
        <Reveal preset="imageReveal">
          <ResponsiveImage
            image={media.image}
            mobileImage={media.mobileImage}
            sizes={layout.sizes}
            aspectRatio={layout.aspectRatio}
            className={layout.aspectClass}
            objectPosition={media.focalPoint}
            mobileObjectPosition={media.mobileFocalPoint}
          />
        </Reveal>
        {caption && (
          <figcaption className={cn("type-meta mt-sm text-text-muted", layout.edgeOnPhones && "px-gutter md:px-0")}>
            {caption}
          </figcaption>
        )}
      </figure>

      <div className={layout.text}>
        {heading}
        {body}
      </div>
    </li>
  );
}
