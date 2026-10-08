/**
 * Shared motion language for GSAP. Presets read from here so the whole site
 * moves with one consistent, restrained rhythm.
 */
export const motion = {
  duration: {
    fast: 0.4,
    base: 0.8,
    slow: 1.2,
  },
  ease: {
    /** Default for reveals: quick start, long gentle settle. */
    editorial: "expo.out",
    soft: "power2.out",
    inOut: "power3.inOut",
  },
  distance: {
    /** Vertical travel for fade-up reveals, in px. */
    reveal: 32,
  },
  stagger: {
    text: 0.06,
    items: 0.1,
  },
  scroll: {
    /** ScrollTrigger start position for reveal-on-enter. */
    revealStart: "top 85%",
  },
} as const;
