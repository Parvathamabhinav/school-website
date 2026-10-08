"use client";

import dynamic from "next/dynamic";

/**
 * Code-split entry for SmoothScroll. Server Components can't lazy-load a
 * Client Component, so this boundary keeps Lenis and GSAP in a separate
 * chunk that is only fetched when the root layout actually renders it.
 */
export const LazySmoothScroll = dynamic(
  () => import("./SmoothScroll").then((mod) => mod.SmoothScroll),
  { ssr: false },
);
