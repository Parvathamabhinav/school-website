"use client";

import { useRef, type ReactNode, type Ref } from "react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { presets, type PresetName } from "@/lib/animations/presets";
import { motionQueries } from "@/lib/animations/reduced-motion";
import { revealScrollStart } from "@/lib/animations/tokens";

interface RevealProps {
  children: ReactNode;
  preset?: PresetName;
  /** Animate the wrapper itself, or each direct child (for staggers). */
  target?: "self" | "children";
  /** Play when scrolled into view (default) or immediately on mount. */
  trigger?: "scroll" | "mount";
  delay?: number;
  stagger?: number;
  /** Change this value to replay the animation (used by the showcase). */
  replayKey?: number;
  /** Element to render, so the wrapper can carry semantics (e.g. a <dl>). */
  as?: "div" | "dl" | "ul" | "ol";
  className?: string;
}

/**
 * Applies a motion preset to its content.
 *
 * Before hydration, the animated content is hidden by CSS (only when motion
 * is allowed) so content already on screen at load doesn't flash visible and
 * then jump back to its starting state. A CSS failsafe reveals it if
 * JavaScript is slow or absent; in that case the preset is skipped.
 *
 * Reduced motion: the preset only runs under (prefers-reduced-motion:
 * no-preference). Otherwise nothing is animated and content stays in its
 * final, fully visible state. gsap.matchMedia also reverts the animation if
 * the preference changes mid-session.
 */
export function Reveal({
  children,
  preset = "fadeUp",
  target = "self",
  trigger = "scroll",
  delay,
  stagger,
  replayKey,
  as: Element = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const targets = target === "children" ? Array.from(element.children) : [element];
      // Pre-hydration hiding still in place but the failsafe already showed
      // the content: leave it visible rather than hide and replay it.
      const failsafeFired =
        element.hasAttribute("data-motion-pending") &&
        targets.length > 0 &&
        getComputedStyle(targets[0]).opacity !== "0";

      const mm = gsap.matchMedia();
      if (!failsafeFired) {
        mm.add(motionQueries.motionOk, () => {
          presets[preset](target === "children" ? targets : element, {
            delay,
            stagger,
            scrollTrigger:
              trigger === "scroll" ? { trigger: element, start: revealScrollStart, once: true } : undefined,
          });
        });
      }

      // GSAP owns the initial state now (or nothing animates).
      element.removeAttribute("data-motion-pending");

      return () => mm.revert();
    },
    { scope: ref, dependencies: [replayKey], revertOnUpdate: true },
  );

  return (
    <Element
      ref={ref as Ref<never>}
      data-motion-pending=""
      data-motion-reveal={target}
      className={className}
    >
      {children}
    </Element>
  );
}
