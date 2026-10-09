import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import { prefersReducedMotion } from "./reduced-motion";

/**
 * Animates the change between stacked, class-toggled layers (one visible at
 * a time) when `active` changes.
 *
 * Contract: layers show/hide through classes, so with reduced motion (or no
 * JS) switching is instant and correct. `build` returns a timeline that only
 * embellishes the switch. The hook runs before paint, kills an interrupted
 * timeline and resets every target to its class-driven state before and
 * after each transition, so rapid switching never leaves stale inline
 * styles behind.
 */
export function useLayerTransition(
  active: number,
  getTargets: () => Element[],
  build: (from: number, to: number) => gsap.core.Timeline | null,
) {
  const previous = useRef(active);
  const transition = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const from = previous.current;
      previous.current = active;
      if (from === active) return;

      const targets = getTargets();
      const reset = () => gsap.set(targets, { clearProps: "opacity,visibility,clipPath,zIndex,transform" });

      transition.current?.kill();
      reset();
      if (prefersReducedMotion()) return;

      transition.current = build(from, active)?.eventCallback("onComplete", reset) ?? null;
    },
    { dependencies: [active] },
  );
}
