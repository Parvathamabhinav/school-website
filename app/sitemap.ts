import type { MetadataRoute } from "next";
import { mainNavigation, type NavItem } from "@/config/navigation";
import { siteConfig } from "@/config/site";

function flattenRoutes(items: NavItem[]): string[] {
  return items.flatMap((item) => [item.href, ...flattenRoutes(item.children ?? [])]);
}

/** Generated from the navigation config so new pages are listed automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = new Set(flattenRoutes(mainNavigation).filter((href) => href.startsWith("/")));

  return [...routes].map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
  }));
}
