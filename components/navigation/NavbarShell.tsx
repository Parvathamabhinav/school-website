"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Sticky header frame that knows whether the page has scrolled.
 *
 * A sentinel sits just above the header; once it leaves the viewport the
 * header is stuck and `data-scrolled="true"` switches it to its compact,
 * elevated state. IntersectionObserver means no scroll listeners, and the
 * sentinel is outside the header so the header shrinking can't flip the
 * state back (no flicker at the threshold).
 *
 * Children style themselves with `group-data-[scrolled=true]/header:*`.
 */
export function NavbarShell({ children }: { children: ReactNode }) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div aria-hidden="true" className="relative">
        {/* Threshold: the header compacts after scrolling this far past its resting position. */}
        <div ref={sentinelRef} className="pointer-events-none absolute inset-x-0 top-0 h-md" />
      </div>
      <header
        data-scrolled={scrolled}
        className="group/header sticky top-0 z-40 border-b border-transparent transition-[background-color,border-color] duration-(--motion-duration-normal) ease-standard data-[scrolled=true]:border-border-subtle data-[scrolled=true]:bg-background/95 data-[scrolled=true]:backdrop-blur-sm"
      >
        {children}
      </header>
    </>
  );
}
