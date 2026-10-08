export interface NavItem {
  label: string;
  href: string;
  /** Opens in a new tab and is marked as leaving the site. */
  external?: boolean;
  /** Keep the item configured but out of the rendered navigation. */
  hidden?: boolean;
}

export interface NavAction {
  label: string;
  href: string;
}

/** Primary navigation, in display order. Flat by design: no dropdowns. */
export const mainNavigation: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Campus", href: "/campus" },
  { label: "Admissions", href: "/admissions" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

/** The single call to action shown in the navbar and mobile menu. */
export const primaryAction: NavAction = { label: "Enquire Now", href: "/admissions#enquire" };

export function getVisibleNavigation(items: NavItem[] = mainNavigation): NavItem[] {
  return items.filter((item) => !item.hidden);
}

/** True when the item points at the current page or one of its sub-pages. */
export function isCurrentPath(pathname: string, item: NavItem): boolean {
  if (item.external) return false;
  const path = item.href.split("#")[0];
  return pathname === path || pathname.startsWith(`${path}/`);
}
