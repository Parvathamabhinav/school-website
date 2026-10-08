"use client";

import { usePathname } from "next/navigation";
import { TextLink } from "@/components/ui/TextLink";
import { isCurrentPath, type NavItem } from "@/config/navigation";

/**
 * Inline primary navigation for large screens. Hovering the list quietly
 * dims the other links so the hovered one leads; the underline draws in
 * via the shared link-reveal treatment and stays on the current page.
 */
export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="group/nav flex items-center gap-x-lg">
        {items.map((item) => (
          <li key={item.href}>
            <TextLink
              href={item.href}
              external={item.external}
              variant="reveal"
              aria-current={isCurrentPath(pathname, item) ? "page" : undefined}
              className="type-body-sm font-medium text-text group-hover/nav:text-text-muted hover:text-text! focus-visible:text-text! aria-[current=page]:[--link-line:100%]"
            >
              {item.label}
            </TextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
