import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import type { CampusExperience as CampusExperienceData } from "@/types/school";

interface CampusExperienceProps {
  experience: CampusExperienceData;
  number: string;
}

/**
 * One campus experience as a stand-alone block, used where the interactive
 * index doesn't fit: everything is visible, nothing waits for an interaction.
 *
 * - Phones: number and title, description, then the photograph edge to edge.
 * - Tablets: title and description side by side above a full-width image.
 */
export function CampusExperience({ experience, number }: CampusExperienceProps) {
  const { title, description, media, caption } = experience;

  return (
    <Reveal preset="stagger" target="children" className="grid-editorial gap-y-lg border-t border-border pt-lg">
      <div className="col-span-12 flex flex-col gap-sm md:col-span-5">
        <p className="type-meta tabular-nums">{number}</p>
        <h3 className="type-h3">{title}</h3>
      </div>
      <p className="type-body col-span-12 text-text-muted md:col-span-7 md:pt-lg">{description}</p>
      <figure className="col-span-12 -mx-gutter md:mx-0">
        <ResponsiveImage
          image={media.image}
          mobileImage={media.mobileImage}
          sizes="wide"
          aspectRatio="landscape"
          objectPosition={media.focalPoint}
          mobileObjectPosition={media.mobileFocalPoint}
        />
        {caption && <figcaption className="type-label mt-sm px-gutter text-text-muted md:px-0">{caption}</figcaption>}
      </figure>
    </Reveal>
  );
}
