import { useSyncExternalStore } from "react";
import { motionQueries } from "./reduced-motion";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(motionQueries.reduceMotion);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Live prefers-reduced-motion state for Client Components that need to
 * render differently (not just skip a GSAP preset). Server render assumes
 * motion is allowed; the value corrects itself on hydration.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(motionQueries.reduceMotion).matches,
    () => false,
  );
}
