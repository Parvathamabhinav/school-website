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
  /**
   * Routes that exist and should be indexed (drives app/sitemap.ts). Kept
   * separate from navigation, which may point at pages not yet built.
   */
  publishedRoutes: ["/"],
  features: {
    /**
     * Lenis smooth scrolling. Off by default; when off, no Lenis code is
     * shipped to the browser. Always disabled for prefers-reduced-motion.
     */
    smoothScroll: false,
    /**
     * Internal /design-system showcase for development and visual QA.
     * Always on in development; in production only when
     * ENABLE_DESIGN_SYSTEM=true (e.g. on a preview deployment).
     */
    designSystem:
      process.env.NODE_ENV !== "production" || process.env.ENABLE_DESIGN_SYSTEM === "true",
  },
} as const;
