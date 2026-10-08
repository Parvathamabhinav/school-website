/**
 * Single GSAP entry point. Plugins are registered once here; every animated
 * client component imports gsap from this module, never from "gsap" directly.
 *
 * Import only from Client Components ("use client") so GSAP stays out of the
 * server bundle and off pages that don't animate.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
