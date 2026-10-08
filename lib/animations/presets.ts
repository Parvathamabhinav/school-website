import { gsap } from "./gsap";
import { distances, durations, staggers, type Easing } from "./tokens";
import type { AnimationPreset } from "./types";

/**
 * Motion vocabulary. Each preset has one job and a direction that carries
 * meaning:
 * - fadeIn:      quiet appearance, no direction (supporting content)
 * - fadeUp:      content arriving into reading order (the default reveal)
 * - fadeDown:    content dropping in from above (overlays, announcements)
 * - stagger:     a group read in sequence (lists, card rows, words)
 * - imageReveal: a wipe that frames large editorial imagery
 * - scaleReveal: a gentle settle for focal media
 *
 * hoverLift is CSS-only (the `hover-lift` utility) since hover feedback
 * must be instant and needs no JavaScript.
 *
 * Presets never check reduced motion themselves; callers run them inside
 * gsap.matchMedia() with motionQueries (see <Reveal>).
 */

const emphasized: Easing = "emphasized";
const standard: Easing = "standard";

export const fadeIn: AnimationPreset = (target, options = {}) =>
  gsap.from(target, {
    autoAlpha: 0,
    duration: options.duration ?? durations.normal,
    ease: standard,
    delay: options.delay,
    stagger: options.stagger,
    scrollTrigger: options.scrollTrigger,
  });

export const fadeUp: AnimationPreset = (target, options = {}) =>
  gsap.from(target, {
    autoAlpha: 0,
    y: distances.md,
    duration: options.duration ?? durations.normal,
    ease: emphasized,
    delay: options.delay,
    stagger: options.stagger,
    scrollTrigger: options.scrollTrigger,
  });

export const fadeDown: AnimationPreset = (target, options = {}) =>
  gsap.from(target, {
    autoAlpha: 0,
    y: -distances.sm,
    duration: options.duration ?? durations.normal,
    ease: emphasized,
    delay: options.delay,
    stagger: options.stagger,
    scrollTrigger: options.scrollTrigger,
  });

export const stagger: AnimationPreset = (target, options = {}) =>
  gsap.from(target, {
    autoAlpha: 0,
    y: distances.sm,
    duration: options.duration ?? durations.normal,
    ease: emphasized,
    delay: options.delay,
    stagger: options.stagger ?? staggers.normal,
    scrollTrigger: options.scrollTrigger,
  });

/** Target is the image frame; its first child (the image) settles in scale. */
export const imageReveal: AnimationPreset = (target, options = {}) => {
  const duration = options.duration ?? durations.slow;
  const frames = gsap.utils.toArray<HTMLElement>(target);
  const timeline = gsap.timeline({
    delay: options.delay,
    scrollTrigger: options.scrollTrigger,
  });

  timeline.fromTo(
    frames,
    { clipPath: "inset(100% 0% 0% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", duration, ease: emphasized, stagger: options.stagger },
  );
  timeline.from(
    frames.map((frame) => frame.firstElementChild).filter(Boolean),
    { scale: 1.12, duration, ease: emphasized, stagger: options.stagger },
    0,
  );

  return timeline;
};

export const scaleReveal: AnimationPreset = (target, options = {}) =>
  gsap.from(target, {
    autoAlpha: 0,
    scale: 0.96,
    duration: options.duration ?? durations.slow,
    ease: emphasized,
    delay: options.delay,
    stagger: options.stagger,
    scrollTrigger: options.scrollTrigger,
  });

export const presets = { fadeIn, fadeUp, fadeDown, stagger, imageReveal, scaleReveal };

export type PresetName = keyof typeof presets;
