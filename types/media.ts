/**
 * Media asset types shared by school data and media components.
 *
 * Every asset carries its intrinsic dimensions so layouts can reserve space
 * (no layout shift) and every image carries alt text so accessibility is
 * enforced at the data layer rather than remembered at render time.
 */

export interface ImageAsset {
  /** Path under /public (e.g. "/images/campus/quad.jpg") or an allowed remote URL. */
  src: string;
  /**
   * Describes the image for screen readers. Use an empty string only for
   * purely decorative images.
   */
  alt: string;
  width: number;
  height: number;
  /** Optional low-quality placeholder (base64 data URL). */
  blurDataURL?: string;
}

export interface VideoSource {
  src: string;
  /** MIME type, e.g. "video/mp4" or "video/webm". */
  type: string;
}

export interface VideoAsset {
  /** Ordered by preference; browsers pick the first supported source. */
  sources: VideoSource[];
  /** Shown before playback and as the reduced-motion fallback. */
  poster: ImageAsset;
  /** Short description of the video's content. */
  title: string;
  /** WebVTT captions file. Required for videos with speech. */
  captionsSrc?: string;
  width: number;
  height: number;
}
