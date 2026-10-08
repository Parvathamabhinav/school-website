/**
 * Shared media presets so images across the site use consistent ratios and
 * accurate `sizes` hints (which keep downloaded image widths minimal).
 */

/**
 * Ratio values live in globals.css as --aspect-* tokens; this maps each name
 * to its utility class and a human-readable label.
 */
export const aspectRatios = {
  /** Portraits of people, gallery tiles. */
  square: { className: "aspect-square", label: "1:1" },
  /** Editorial portrait crop: faculty, student stories. */
  portrait: { className: "aspect-portrait", label: "4:5" },
  /** Default for campus and facility photography. */
  landscape: { className: "aspect-landscape", label: "3:2" },
  /** Wide, atmospheric bands and full-bleed media. */
  cinematic: { className: "aspect-cinematic", label: "21:9" },
} as const;

export type AspectRatio = keyof typeof aspectRatios;

/** `sizes` values matched to the layout containers in globals.css. */
export const imageSizes = {
  /** Edge-to-edge imagery (Container width="bleed" or "full"). */
  full: "100vw",
  /** Inside the wide container (max 90rem). */
  wide: "(min-width: 90rem) 90rem, 100vw",
  /** Inside the content container (max 76rem). */
  content: "(min-width: 76rem) 76rem, 100vw",
  /** Half of a split layout (side by side from md). */
  half: "(min-width: 48rem) 50vw, 100vw",
  /** Narrow column of a 4/8 or 3/9 split, or a three-up grid. */
  third: "(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw",
} as const;

export type ImageSizes = keyof typeof imageSizes;
