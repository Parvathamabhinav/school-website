/**
 * Contract for reusable animation presets (see ./presets.ts).
 *
 * A preset receives the element(s) to animate and returns the GSAP animation
 * it created, so callers can replay or clean it up. Presets only describe
 * the motion; *when* it runs (on mount, on scroll) and *whether* it runs
 * (reduced motion) is decided by the caller, normally the <Reveal>
 * component in components/animations/.
 */
export type AnimationTarget = Element | Element[] | NodeListOf<Element> | string;

export interface AnimationPresetOptions {
  delay?: number;
  /** Override the preset's default token duration (seconds). */
  duration?: number;
  /** Stagger between multiple targets (seconds). */
  stagger?: number;
  /** Attach to a ScrollTrigger instead of playing immediately. */
  scrollTrigger?: ScrollTrigger.Vars;
}

export type AnimationPreset = (
  target: AnimationTarget,
  options?: AnimationPresetOptions,
) => gsap.core.Animation;
