import { Reveal } from "@/components/animations/Reveal";
import { ScrollDepth } from "@/components/animations/ScrollDepth";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { staggers } from "@/lib/animations/tokens";
import type { AspectRatio, ImageSizes } from "@/lib/media/presets";
import { cn } from "@/lib/utils/cn";
import type { StudentLifeContent, StudentLifeMoment } from "@/types/school";

interface Slot {
  /** Grid placement from tablet up; phones stack every moment full width. */
  className: string;
  aspectRatio: AspectRatio;
  sizes: ImageSizes;
}

/**
 * The collage, one slot per moment in data order. Desktop (lg):
 *
 *   intro ............        [1: tall, rising
 *   [0: lead photograph ...]   beside the intro]
 *     [2: landscape]       [3: square, set lower]
 *
 * Tablet keeps the lead full width and pairs the rest. Moments beyond the
 * fourth continue as half-width landscapes; explicit rows keep the first
 * four in place, and the extras are too wide to fill their gaps.
 */
const slots: Slot[] = [
  {
    className: "-mx-gutter md:col-span-12 md:mx-0 lg:col-span-8 lg:row-start-2",
    aspectRatio: "landscape",
    sizes: "feature",
  },
  {
    className: "md:col-span-5 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:mt-xl lg:self-start",
    aspectRatio: "portrait",
    sizes: "third",
  },
  {
    className: "md:col-span-6 md:col-start-7 md:self-end lg:col-span-5 lg:col-start-2 lg:row-start-3 lg:self-start",
    aspectRatio: "landscape",
    sizes: "half",
  },
  {
    className: "md:col-span-7 md:col-start-3 lg:col-span-4 lg:col-start-8 lg:row-start-3 lg:mt-section-md",
    aspectRatio: "square",
    sizes: "half",
  },
];
const extraSlot: Slot = { className: "md:col-span-6", aspectRatio: "landscape", sizes: "half" };

interface StudentLifeSectionProps {
  data: StudentLifeContent;
}

/**
 * "Beyond the classroom": the homepage's human, photographic pause after
 * Achievements. A static editorial collage (no interaction to learn) of
 * photographs at deliberately different scales, each captioned with its
 * category, title and description, set on the warmer muted surface.
 *
 * Phones read it as one sequence: introduction, the lead photograph edge to
 * edge, then each moment with its caption. Everything is server-rendered;
 * only the reveal and depth effects run on the client.
 */
export function StudentLifeSection({ data }: StudentLifeSectionProps) {
  const { eyebrow, title, description, moments } = data;
  const headingId = "student-life-title";

  return (
    <Section aria-labelledby={headingId} tone="muted" className="overflow-x-clip">
      <Container width="wide">
        <div className="grid-editorial gap-y-2xl md:gap-y-xl lg:gap-y-2xl">
          <Reveal
            preset="stagger"
            target="children"
            className="col-span-12 flex max-w-narrow flex-col gap-lg md:col-span-10 lg:col-span-6 lg:row-start-1 lg:self-start"
          >
            {eyebrow && (
              <p className="type-label flex items-center gap-sm text-text-muted">
                <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
                {eyebrow}
              </p>
            )}
            <h2 id={headingId} className="type-h2">
              {title}
            </h2>
            {description && <p className="type-body-lg text-text-muted">{description}</p>}
          </Reveal>

          {moments.map((moment, index) => (
            <Moment key={moment.id} moment={moment} slot={slots[index] ?? extraSlot} lead={index === 0} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

interface MomentProps {
  moment: StudentLifeMoment;
  slot: Slot;
  lead: boolean;
  index: number;
}

/** One photograph and its caption. The lead photograph also drifts gently with scroll. */
function Moment({ moment, slot, lead, index }: MomentProps) {
  const { category, title, description, media } = moment;

  const image = (
    <ResponsiveImage
      image={media.image}
      mobileImage={media.mobileImage}
      sizes={slot.sizes}
      aspectRatio={slot.aspectRatio}
      objectPosition={media.focalPoint}
      mobileObjectPosition={media.mobileFocalPoint}
    />
  );

  return (
    <figure className={cn("col-span-12 flex flex-col gap-md", slot.className)}>
      {/* The second photograph shares the lead's row on desktop, so it follows a beat later. */}
      <Reveal preset="imageReveal" delay={index === 1 ? staggers.loose : undefined}>
        {lead ? <ScrollDepth amount={3}>{image}</ScrollDepth> : image}
      </Reveal>
      <figcaption className={cn("max-w-narrow", lead && "px-gutter md:px-0")}>
        <Reveal preset="stagger" target="children" className="flex flex-col gap-2xs">
          {category && <p className="type-label text-text-muted">{category}</p>}
          <h3 className="type-h4">{title}</h3>
          {description && <p className="type-body-sm text-text-muted">{description}</p>}
        </Reveal>
      </figcaption>
    </figure>
  );
}
