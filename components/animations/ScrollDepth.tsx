"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { motionQueries } from "@/lib/animations/reduced-motion";

interface ScrollDepthProps {
  children: ReactNode;
  /** Maximum drift in percent of the image height, each way. */
  amount?: number;
  className?: string;
}

/**
 * Subtle depth for a cropped image: the image inside its frame drifts
 * against the scroll while the frame itself stays put, so nothing in the
 * layout moves. Scrubbed to scroll position (no pinning, no hijacking).
 *
 * Wrap a ResponsiveImage that has an aspectRatio (the frame clips the
 * overscan). Skipped entirely under reduced motion.
 */
export function ScrollDepth({ children, amount = 4, className }: ScrollDepthProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      const image = element?.querySelector("picture, img");
      if (!element || !image) return;

      const mm = gsap.matchMedia();
      mm.add(motionQueries.motionOk, () => {
        // Overscan just enough that the drift never exposes the frame edge.
        gsap.set(image, { scale: 1 + (amount * 2.5) / 100 });
        gsap.fromTo(
          image,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
