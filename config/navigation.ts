export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/**
 * Primary navigation. Also the source of truth for app/sitemap.ts, so add
 * routes here as pages are built.
 */
export const mainNavigation: NavItem[] = [{ label: "Home", href: "/" }];
