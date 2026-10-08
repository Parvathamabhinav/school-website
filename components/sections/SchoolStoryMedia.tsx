import { Reveal } from "@/components/animations/Reveal";
import { ScrollDepth } from "@/components/animations/ScrollDepth";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import type { AspectRatio } from "@/lib/media/presets";
import type { StoryMedia } from "@/types/school";

// md+ ratio classes, written out so Tailwind can detect them.
const fromTablet: Record<AspectRatio, string> = {
  square: "md:aspect-square",
  portrait: "md:aspect-portrait",
  landscape: "md:aspect-landscape",
  cinematic: "md:aspect-cinematic",
};

interface SchoolStoryMediaProps {
  media: StoryMedia;
  className?: string;
}

/**
 * The story image as a figure: unveiled on scroll (clip reveal with a
 * gentle scale settle), then drifting slightly within its frame for depth.
 * The frame's ratio is fixed per breakpoint, so the layout never shifts and
 * a failed image leaves a correctly sized surface.
 */
export function SchoolStoryMedia({ media, className }: SchoolStoryMediaProps) {
  const { aspectRatio = "landscape", mobileAspectRatio = "portrait", caption } = media;

  return (
    <figure className={className}>
      <Reveal preset="imageReveal">
        <ScrollDepth>
          <ResponsiveImage
            image={media.image}
            mobileImage={media.mobileImage}
            sizes="feature"
            aspectRatio={mobileAspectRatio}
            className={fromTablet[aspectRatio]}
            objectPosition={media.focalPoint}
            mobileObjectPosition={media.mobileFocalPoint}
          />
        </ScrollDepth>
      </Reveal>
      {caption && <figcaption className="type-meta mt-sm px-gutter lg:px-0">{caption}</figcaption>}
    </figure>
  );
}
