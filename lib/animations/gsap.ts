/**
 * Single GSAP entry point. Plugins are registered once here; every animated
 * client component imports gsap from this module, never from "gsap" directly.
 *
 * Import only from Client Components ("use client") so GSAP stays out of the
 * server bundle and off pages that don't animate.
 */
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { easings } from "./tokens";

gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);

// Register the token curves under their token names, so GSAP tweens use the
// exact same easing as CSS transitions: `ease: "emphasized"`.
for (const [name, points] of Object.entries(easings)) {
  CustomEase.create(name, points.join(","));
}

export { gsap, ScrollTrigger, useGSAP };
