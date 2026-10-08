import Image from "next/image";
import type { ImageAsset } from "@/types/media";
import {
  aspectRatios,
  imageSizes,
  type AspectRatio,
  type ImageSizes,
} from "@/lib/media/presets";
import { cn } from "@/lib/utils/cn";

interface ResponsiveImageProps {
  image: ImageAsset;
  /** Layout context, used to generate an accurate `sizes` attribute. */
  sizes: ImageSizes;
  /**
   * Crop to a preset ratio (object-cover). Omit to keep the image's
   * intrinsic ratio.
   */
  aspectRatio?: AspectRatio;
  /**
   * Focal point for cropped images, as a CSS object-position
   * (e.g. "50% 30%" keeps faces in a portrait crop). Defaults to centre.
   */
  objectPosition?: string;
  /** Only for the above-the-fold image of a page (e.g. hero). Lazy otherwise. */
  preload?: boolean;
  className?: string;
}

/**
 * Standard image primitive. Reserves space from known dimensions or a preset
 * ratio (no layout shift), lazy-loads by default and always renders the
 * asset's alt text. For full-bleed media, place it in
 * <Container width="bleed"> with sizes="full".
 *
 * When cropped, the image is the frame's first child, which the imageReveal
 * motion preset relies on.
 */
export function ResponsiveImage({
  image,
  sizes,
  aspectRatio,
  objectPosition,
  preload = false,
  className,
}: ResponsiveImageProps) {
  const placeholder = image.blurDataURL ? "blur" : "empty";

  if (!aspectRatio) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={imageSizes[sizes]}
        preload={preload}
        placeholder={placeholder}
        blurDataURL={image.blurDataURL}
        className={cn("h-auto w-full", className)}
      />
    );
  }

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-surface", aspectRatios[aspectRatio].className, className)}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={imageSizes[sizes]}
        preload={preload}
        placeholder={placeholder}
        blurDataURL={image.blurDataURL}
        className="object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}
