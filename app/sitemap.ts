import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** Lists only published routes; add each page to siteConfig.publishedRoutes as it ships. */
export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.publishedRoutes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
  }));
}
