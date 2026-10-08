"use client";

import { useRef, type ReactNode } from "react";
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
  className?: string;
}

/**
 * Applies a motion preset to its content.
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
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const mm = gsap.matchMedia();
      mm.add(motionQueries.motionOk, () => {
        presets[preset](target === "children" ? Array.from(element.children) : element, {
          delay,
          stagger,
          scrollTrigger:
            trigger === "scroll" ? { trigger: element, start: revealScrollStart, once: true } : undefined,
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [replayKey], revertOnUpdate: true },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
