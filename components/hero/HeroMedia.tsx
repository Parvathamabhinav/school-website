import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import type { HeroMedia as HeroMediaContent } from "@/types/school";
import { HeroVideo } from "./HeroVideo";

interface HeroMediaProps {
  media: HeroMediaContent;
}

/**
 * The hero's media frame: an editorial crop that changes with the layout
 * (square on phones, landscape on tablets, portrait beside the headline on
 * desktop). The image always renders, as LCP candidate, video poster and
 * fallback; video and overlay are optional layers on top.
 *
 * The outer element is the reveal frame (clipped by HeroMotion); the image
 * inside drifts on scroll.
 */
export function HeroMedia({ media }: HeroMediaProps) {
  return (
    <div data-hero-media data-motion-item className="relative">
      <ResponsiveImage
        image={media.image}
        mobileImage={media.mobileImage}
        sizes="aside"
        aspectRatio="square"
        className="md:aspect-landscape lg:aspect-portrait"
        objectPosition={media.focalPoint}
        mobileObjectPosition={media.mobileFocalPoint}
        priority
      />
      {media.video && <HeroVideo video={media.video} focalPoint={media.focalPoint} />}
      {media.overlay && <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-primary/25" />}
    </div>
  );
}
