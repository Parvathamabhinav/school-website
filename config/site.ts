import { school } from "@/data/school";

/**
 * Site-level configuration: deployment and platform settings that are not
 * school content. School content lives in data/school.ts.
 */
export const siteConfig = {
  name: school.name,
  description: school.seo.description,
  /** Canonical origin. Set NEXT_PUBLIC_SITE_URL per deployment. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  language: "en",
  features: {
    /**
     * Lenis smooth scrolling. Off by default; when off, no Lenis code is
     * shipped to the browser. Always disabled for prefers-reduced-motion.
     */
    smoothScroll: false,
  },
} as const;
