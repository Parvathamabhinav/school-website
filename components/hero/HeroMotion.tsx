"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { motionQueries } from "@/lib/animations/reduced-motion";
import { distances, durations, staggers, type Easing } from "@/lib/animations/tokens";

const emphasized: Easing = "emphasized";
const standard: Easing = "standard";

interface HeroMotionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Client boundary for the hero's motion. The hero's markup stays
 * server-rendered (children); this only choreographs it, by data attribute:
 *
 * data-hero-eyebrow → data-hero-line (stagger) → data-hero-description →
 * data-hero-actions, with data-hero-media unveiling alongside, then
 * data-hero-meta. Scroll: the media image drifts within its frame and the
 * text column eases upward, both scrubbed to scroll, never pinned.
 *
 * Reduced motion: nothing runs; the server-rendered final state stands.
 */
export function HeroMotion({ children, className }: HeroMotionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const select = gsap.utils.selector(root);
      const media = select("[data-hero-media]")[0];
      const mediaImage = media?.querySelector("picture, img");
      const content = select("[data-hero-content]")[0];

      // If the CSS failsafe already revealed the content (slow script), don't
      // hide it again just to animate it in.
      const firstItem = select("[data-motion-item]")[0];
      const alreadyVisible = !firstItem || getComputedStyle(firstItem).opacity !== "0";

      const mm = gsap.matchMedia();
      mm.add(motionQueries.motionOk, () => {
        if (!alreadyVisible) {
          gsap
            .timeline({ defaults: { ease: emphasized, duration: durations.normal } })
            .from(select("[data-hero-eyebrow]"), { opacity: 0, y: distances.sm })
            .from(select("[data-hero-line]"), { opacity: 0, y: distances.md, stagger: staggers.loose }, 0.08)
            .fromTo(
              media,
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: durations.slow },
              0.15,
            )
            .fromTo(mediaImage, { scale: 1.16 }, { scale: 1.08, duration: durations.slow }, 0.15)
            .from(select("[data-hero-description]"), { opacity: 0, y: distances.sm }, 0.42)
            .from(select("[data-hero-actions]"), { opacity: 0, y: distances.sm }, 0.52)
            .from(select("[data-hero-meta]"), { opacity: 0, ease: standard }, 0.85);
        } else if (mediaImage) {
          gsap.set(mediaImage, { scale: 1.08 });
        }

        // Depth on scroll: subtle, scrubbed, and ends when the hero leaves.
        const scrollTrigger = { trigger: root, start: "top top", end: "bottom top", scrub: true };
        if (mediaImage) {
          gsap.fromTo(mediaImage, { yPercent: -3 }, { yPercent: 3, ease: "none", scrollTrigger });
        }
        if (content) {
          gsap.to(content, { y: -distances.md, ease: "none", scrollTrigger });
        }
      });

      // GSAP now owns the initial state (or there is no motion): release the
      // CSS pre-hydration hiding.
      root.removeAttribute("data-motion-pending");

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} data-motion-pending="" className={className}>
      {children}
    </div>
  );
}
