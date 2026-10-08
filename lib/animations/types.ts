/**
 * Contract for reusable animation presets (fade-up, text stagger, clip
 * reveal, scale reveal, …), to be added under lib/animations/presets/.
 *
 * A preset receives the element(s) to animate and returns the GSAP
 * animation it created, so callers (usually useGSAP inside a component in
 * components/animations/) can control or clean it up. Presets read timing
 * from `motion` in ./config and must be invoked within a reduced-motion
 * aware gsap.matchMedia() context.
 */
export type AnimationTarget = Element | Element[] | string;

export interface AnimationPresetOptions {
  delay?: number;
  duration?: number;
  /** Trigger on scroll into view instead of immediately. */
  scroll?: boolean;
}

export type AnimationPreset<
  TOptions extends AnimationPresetOptions = AnimationPresetOptions,
> = (target: AnimationTarget, options?: TOptions) => gsap.core.Animation;
