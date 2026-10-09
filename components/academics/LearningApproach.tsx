import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import type { AspectRatio, ImageSizes } from "@/lib/media/presets";
import { cn } from "@/lib/utils/cn";
import type { AcademicsPageContent, LearningPractice } from "@/types/school";

interface LearningApproachProps {
  data: AcademicsPageContent["approach"];
}

/**
 * "How learning happens" (#approach): each practice with its photograph, in
 * a sequence of changing compositions so the section reads as an editorial
 * spread rather than a grid. Everything is visible at once: no tabs, hover
 * states or pinned scrolling.
 *
 * From desktop: the first practice wide (photograph left, text right), the
 * second mirrored around a portrait, then the rest in staggered pairs.
 * Phones and tablets: photograph then text for each, in order.
 */
export function LearningApproach({ data }: LearningApproachProps) {
  const { eyebrow, title, description, practices, note } = data;

  return (
    <Section id="approach" aria-labelledby="approach-title" className="overflow-x-clip">
      <Container width="wide">
        <Reveal preset="stagger" target="children" className="flex max-w-[44rem] flex-col gap-lg">
          {eyebrow && (
            <p className="type-label flex items-center gap-sm text-text-muted">
              <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
              {eyebrow}
            </p>
          )}
          <h2 id="approach-title" className="type-h2">
            {title}
          </h2>
          {description && <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>}
        </Reveal>

        <ol className="grid-editorial mt-2xl gap-y-section-sm lg:mt-section-sm lg:gap-y-section-md">
          {practices.map((practice, index) => (
            <PracticeItem key={practice.id} practice={practice} index={index} />
          ))}
        </ol>

        {note && <p className="type-meta mt-2xl text-text-muted lg:mt-section-sm">{note}</p>}
      </Container>
    </Section>
  );
}

interface Layout {
  item: string;
  media: string;
  text: string;
  aspectRatio: AspectRatio;
  /** Desktop override of the crop, as a utility class. */
  aspectClass?: string;
  sizes: ImageSizes;
}

/** The composition for each position: wide, mirrored portrait, then pairs. */
function layoutFor(index: number): Layout {
  if (index === 0) {
    return {
      item: "col-span-12 grid-editorial items-center gap-y-xl",
      media: "col-span-12 -mx-gutter md:mx-0 lg:col-span-7",
      text: "col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9",
      aspectRatio: "landscape",
      sizes: "feature",
    };
  }
  if (index === 1) {
    return {
      item: "col-span-12 grid-editorial items-center gap-y-xl",
      media: "col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-8 lg:row-start-1",
      text: "col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-3 lg:row-start-1",
      aspectRatio: "landscape",
      aspectClass: "lg:aspect-portrait",
      sizes: "third",
    };
  }
  // Pairs: the second of each pair sits lower, so the two never align flatly.
  const second = (index - 2) % 2 === 1;
  return {
    item: cn("col-span-12 flex flex-col gap-lg md:col-span-6", second && "md:mt-section-sm"),
    media: "",
    text: "",
    aspectRatio: "landscape",
    sizes: "half",
  };
}

function PracticeItem({ practice, index }: { practice: LearningPractice; index: number }) {
  const { title, description, media } = practice;
  const layout = layoutFor(index);

  return (
    <li className={layout.item}>
      <Reveal preset="imageReveal" className={layout.media}>
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

      <Reveal preset="stagger" target="children" className={cn("flex flex-col gap-sm", layout.text)}>
        <span aria-hidden="true" className="type-label text-accent tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className={index < 2 ? "type-h2" : "type-h3"}>
          {title}
        </h3>
        <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>
      </Reveal>
    </li>
  );
}
