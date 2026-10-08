import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import type { LearningPrinciple as LearningPrincipleData } from "@/types/school";

interface LearningPrincipleProps {
  principle: LearningPrincipleData;
  index: number;
}

/**
 * One principle as a stand-alone editorial block, used below the desktop
 * breakpoint where hover makes no sense: everything is visible, nothing is
 * behind an interaction.
 *
 * - Phones: number, title, description, then the image.
 * - Tablets: text and image side by side, like a ledger row.
 */
export function LearningPrinciple({ principle, index }: LearningPrincipleProps) {
  const { title, description, media } = principle;

  return (
    <Reveal preset="stagger" target="children" className="grid-editorial gap-y-lg border-t border-border pt-lg">
      <div className="col-span-12 flex flex-col gap-sm md:col-span-5">
        <p className="type-meta tabular-nums">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="type-h3">{title}</h3>
        <p className="type-body text-text-muted">{description}</p>
      </div>
      <div className="col-span-12 md:col-span-7">
        <ResponsiveImage
          image={media.image}
          mobileImage={media.mobileImage}
          sizes="feature"
          aspectRatio="landscape"
          objectPosition={media.focalPoint}
          mobileObjectPosition={media.mobileFocalPoint}
        />
      </div>
    </Reveal>
  );
}
