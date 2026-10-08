/**
 * Reduced-motion handling.
 *
 * Presets should run inside gsap.matchMedia() with these conditions so that
 * motion is skipped (content shown in its final state) for users who ask
 * for less motion, and reverted automatically if the preference changes.
 */
export const motionQueries = {
  motionOk: "(prefers-reduced-motion: no-preference)",
  reduceMotion: "(prefers-reduced-motion: reduce)",
} as const;

/** One-off check for non-GSAP code paths (e.g. Lenis). Client-only. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia(motionQueries.reduceMotion).matches;
}
