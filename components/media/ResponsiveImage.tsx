import Image, { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import type { ImageAsset } from "@/types/media";
import {
  aspectRatios,
  imageSizes,
  type AspectRatio,
  type ImageSizes,
} from "@/lib/media/presets";
import { cn } from "@/lib/utils/cn";

/** Below Tailwind's md breakpoint, where art-directed mobile assets apply. */
const MOBILE_MEDIA = "(max-width: 47.99rem)";

interface ResponsiveImageProps {
  image: ImageAsset;
  /** Layout context, used to generate an accurate `sizes` attribute. */
  sizes: ImageSizes;
  /**
   * Crop to a preset ratio (object-cover). Omit to keep the image's
   * intrinsic ratio. Responsive ratios: pass a base ratio here and
   * breakpoint overrides in className (e.g. "lg:aspect-portrait").
   */
  aspectRatio?: AspectRatio;
  /**
   * Focal point for cropped images, as a CSS object-position
   * (e.g. "50% 30%" keeps faces in a portrait crop). Defaults to centre.
   */
  objectPosition?: string;
  /**
   * Art-directed asset for small screens (cropped images only). Rendered via
   * <picture>, so each device downloads just one of the two.
   */
  mobileImage?: ImageAsset;
  /** Focal point for the mobile crop; falls back to objectPosition. */
  mobileObjectPosition?: string;
  /**
   * The page's primary above-the-fold image (e.g. hero): loads eagerly at
   * high fetch priority. Everything else lazy-loads.
   */
  priority?: boolean;
  className?: string;
}

/**
 * Standard image primitive. Reserves space from known dimensions or a preset
 * ratio (no layout shift), lazy-loads by default and always renders the
 * asset's alt text. For full-bleed media, place it in
 * <Container width="bleed"> with sizes="full".
 *
 * When cropped, the image (or its <picture>) is the frame's first child,
 * which the imageReveal motion preset relies on.
 */
export function ResponsiveImage({
  image,
  sizes,
  aspectRatio,
  objectPosition,
  mobileImage,
  mobileObjectPosition,
  priority = false,
  className,
}: ResponsiveImageProps) {
  const placeholder = image.blurDataURL ? "blur" : "empty";
  const loading = priority ? ({ loading: "eager", fetchPriority: "high" } as const) : {};

  if (!aspectRatio) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={imageSizes[sizes]}
        placeholder={placeholder}
        blurDataURL={image.blurDataURL}
        className={cn("h-auto w-full", className)}
        {...loading}
      />
    );
  }

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-surface", aspectRatios[aspectRatio].className, className)}
    >
      {mobileImage ? (
        <ArtDirectedImage
          image={image}
          mobileImage={mobileImage}
          sizes={imageSizes[sizes]}
          objectPosition={objectPosition}
          mobileObjectPosition={mobileObjectPosition ?? objectPosition}
          loading={loading}
        />
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={imageSizes[sizes]}
          placeholder={placeholder}
          blurDataURL={image.blurDataURL}
          className="object-cover"
          style={objectPosition ? { objectPosition } : undefined}
          {...loading}
        />
      )}
    </div>
  );
}

interface ArtDirectedImageProps {
  image: ImageAsset;
  mobileImage: ImageAsset;
  sizes: string;
  objectPosition?: string;
  mobileObjectPosition?: string;
  loading: { loading?: "eager"; fetchPriority?: "high" };
}

function ArtDirectedImage({
  image,
  mobileImage,
  sizes,
  objectPosition = "50% 50%",
  mobileObjectPosition = "50% 50%",
  loading,
}: ArtDirectedImageProps) {
  const common = { alt: image.alt, sizes, fill: true, ...loading };
  const { props: desktop } = getImageProps({ ...common, src: image.src });
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({ ...common, src: mobileImage.src });

  // Each crop keeps its own focal point; the breakpoint matches MOBILE_MEDIA.
  const focal = {
    "--focal": objectPosition,
    "--focal-mobile": mobileObjectPosition,
  } as CSSProperties;

  return (
    <picture className="absolute inset-0 block">
      <source media={MOBILE_MEDIA} srcSet={mobileSrcSet} sizes={sizes} />
      <img
        {...desktop}
        alt={image.alt}
        className="object-cover object-(--focal-mobile) md:object-(--focal)"
        style={{ ...desktop.style, ...focal }}
      />
    </picture>
  );
}
