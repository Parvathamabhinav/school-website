/**
 * Motion tokens: the single source of truth for timing across the site.
 *
 * - GSAP presets read these values directly (see ./presets.ts).
 * - CSS transitions read the same values as --motion-* custom properties,
 *   applied on <html> by the root layout via `motionCssVariables`.
 *
 * Vocabulary:
 * - fast:   immediate feedback (hover, press, colour changes)
 * - normal: component-level change (reveal of a single element)
 * - slow:   large, editorial movement (image reveals, section entrances)
 *
 * Eases are cubic-bezier control points so CSS and GSAP share one curve.
 */

export const durations = {
  fast: 0.2,
  normal: 0.6,
  slow: 1.1,
} as const;

export const easings = {
  /** General UI transitions. */
  standard: [0.4, 0, 0.2, 1],
  /** Entrances: quick start, long calm settle. The signature curve. */
  emphasized: [0.22, 1, 0.36, 1],
  /** Exits: gentle start, decisive finish. */
  exit: [0.7, 0, 0.84, 0],
} as const;

/** Travel distances in px. Small on purpose: motion hints, it doesn't fly. */
export const distances = {
  xs: 2,
  sm: 12,
  md: 32,
} as const;

/** Delay between items in a staggered group, in seconds. */
export const staggers = {
  tight: 0.04,
  normal: 0.08,
  loose: 0.14,
} as const;

/** Scroll-triggered reveals start when the element's top reaches 85% down the viewport. */
export const revealScrollStart = "top 85%";

export type Duration = keyof typeof durations;
export type Easing = keyof typeof easings;

const toCubicBezier = (points: readonly number[]) => `cubic-bezier(${points.join(", ")})`;

/** CSS custom properties consumed by transition utilities in globals.css. */
export const motionCssVariables = {
  "--motion-duration-fast": `${durations.fast * 1000}ms`,
  "--motion-duration-normal": `${durations.normal * 1000}ms`,
  "--motion-duration-slow": `${durations.slow * 1000}ms`,
  "--motion-ease-standard": toCubicBezier(easings.standard),
  "--motion-ease-emphasized": toCubicBezier(easings.emphasized),
  "--motion-ease-exit": toCubicBezier(easings.exit),
  "--motion-distance-xs": `${distances.xs}px`,
} as const;
