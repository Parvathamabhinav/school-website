/**
 * Shared media presets so images across the site use consistent ratios and
 * accurate `sizes` hints (which keep downloaded image widths minimal).
 */

export const aspectRatios = {
  square: "1 / 1",
  portrait: "4 / 5",
  landscape: "3 / 2",
  video: "16 / 9",
  cinema: "21 / 9",
} as const;

export type AspectRatio = keyof typeof aspectRatios;

/** `sizes` values matched to the layout containers in globals.css. */
export const imageSizes = {
  /** Edge-to-edge imagery. */
  full: "100vw",
  /** Inside the wide container (max 90rem). */
  wide: "(min-width: 90rem) 90rem, 100vw",
  /** Inside the content container (max 76rem). */
  content: "(min-width: 76rem) 76rem, 100vw",
  /** Two-column layouts. */
  half: "(min-width: 48rem) 50vw, 100vw",
  /** Three-column grids. */
  third: "(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw",
} as const;

export type ImageSizes = keyof typeof imageSizes;
