"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { ButtonLink, buttonStyles } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { isCurrentPath, type NavAction, type NavItem } from "@/config/navigation";
import { gsap } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";
import { distances, durations, staggers, type Easing } from "@/lib/animations/tokens";
import { lockScroll, unlockScroll } from "@/lib/dom/scroll-lock";
import type { SchoolContact } from "@/types/school";

/** Matches Tailwind's xl breakpoint, where the desktop navigation takes over. */
const DESKTOP_QUERY = "(min-width: 80rem)";
const emphasized: Easing = "emphasized";

interface MobileNavProps {
  items: NavItem[];
  action: NavAction;
  /** School identity shown at the top of the open menu. */
  brand: ReactNode;
  contact: Pick<SchoolContact, "email" | "phone">;
}

/**
 * Menu trigger plus a full-screen editorial navigation panel.
 *
 * Built on a native modal <dialog>: the browser contains focus, makes the
 * page behind it inert and handles Escape (intercepted so the exit can
 * animate). Page scroll is locked while open. With reduced motion the panel
 * appears and disappears instantly.
 */
export function MobileNav({ items, action, brand, contact }: MobileNavProps) {
  const menuId = useId();
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const lockedRef = useRef(false);
  const [open, setOpen] = useState(false);

  /** Runs once the dialog has actually closed, however that happened. */
  const handleClosed = useCallback(() => {
    if (!lockedRef.current) return;
    lockedRef.current = false;
    unlockScroll();
    setOpen(false);

    timelineRef.current?.kill();
    timelineRef.current = null;
    const dialog = dialogRef.current;
    if (dialog) {
      gsap.set(dialog, { clearProps: "clipPath" });
      gsap.set(dialog.querySelectorAll("[data-menu-item], [data-menu-cta]"), { clearProps: "all" });
    }
    triggerRef.current?.focus();
  }, []);

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Re-opened mid-exit: play the entrance forward again.
    if (dialog.open) {
      timelineRef.current?.timeScale(1).play();
      return;
    }

    lockedRef.current = true;
    lockScroll();
    dialog.showModal();
    // Start keyboard users on Close, the one control they may need right away.
    closeRef.current?.focus();
    setOpen(true);

    if (prefersReducedMotion()) return;

    const select = gsap.utils.selector(dialog);
    timelineRef.current = gsap
      .timeline({ defaults: { ease: emphasized, duration: durations.normal } })
      .fromTo(dialog, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)" })
      .from(select("[data-menu-item]"), { autoAlpha: 0, y: distances.md, stagger: staggers.tight }, durations.fast)
      .from(select("[data-menu-cta]"), { autoAlpha: 0, y: distances.sm }, "-=0.35");
  };

  const closeMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;

    const timeline = timelineRef.current;
    if (!timeline || prefersReducedMotion()) {
      dialog.close();
      return;
    }

    timeline.eventCallback("onReverseComplete", () => dialog.close());
    timeline.timeScale(1.6).reverse();
  };

  // Close when any link inside the menu is followed.
  const handlePanelClick = (event: MouseEvent<HTMLDialogElement>) => {
    if ((event.target as HTMLElement).closest("a")) closeMenu();
  };

  // If the viewport grows to desktop while open, close without animation.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      if (query.matches && dialogRef.current?.open) dialogRef.current.close();
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Never leave the page scroll-locked or a timeline running after unmount.
  useEffect(
    () => () => {
      timelineRef.current?.kill();
      if (lockedRef.current) unlockScroll();
    },
    [],
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={openMenu}
        className={buttonStyles({ variant: "ghost", size: "sm", className: "-mr-md" })}
      >
        Menu
        <Menu aria-hidden="true" className="size-5" />
      </button>

      <dialog
        ref={dialogRef}
        id={menuId}
        aria-label="Site menu"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={handleClosed}
        onClick={handlePanelClick}
        className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain border-0 bg-background p-0 text-text backdrop:bg-transparent"
      >
        <div className="flex min-h-full flex-col">
          <Container width="wide" className="flex items-center justify-between gap-lg py-lg">
            {brand}
            <button
              ref={closeRef}
              type="button"
              onClick={closeMenu}
              className={buttonStyles({ variant: "ghost", size: "sm", className: "-mr-md" })}
            >
              Close
              <X aria-hidden="true" className="size-5" />
            </button>
          </Container>

          <Container width="wide" className="flex flex-1 flex-col justify-between gap-2xl pt-lg pb-xl">
            <nav aria-label="Main">
              <ul className="border-t border-border-subtle">
                {items.map((item, index) => (
                  <li
                    key={item.href}
                    data-menu-item
                    className="flex items-baseline gap-md border-b border-border-subtle py-xs"
                  >
                    <span aria-hidden="true" className="type-meta w-lg shrink-0 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <TextLink
                      href={item.href}
                      external={item.external}
                      variant="reveal"
                      aria-current={isCurrentPath(pathname, item) ? "page" : undefined}
                      className="type-h2 aria-[current=page]:[--link-line:100%]"
                    >
                      {item.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div data-menu-cta className="flex flex-col gap-lg">
              <ButtonLink
                href={action.href}
                icon={<ArrowRight aria-hidden="true" className="size-4" />}
                className="w-full sm:w-auto sm:self-start"
              >
                {action.label}
              </ButtonLink>
              <ul className="type-body-sm flex flex-wrap gap-x-xl gap-y-xs text-text-muted">
                <li>
                  <TextLink href={`mailto:${contact.email}`} variant="reveal">
                    {contact.email}
                  </TextLink>
                </li>
                <li>
                  <TextLink href={`tel:${contact.phone.replace(/\s+/g, "")}`} variant="reveal">
                    {contact.phone}
                  </TextLink>
                </li>
              </ul>
            </div>
          </Container>
        </div>
      </dialog>
    </>
  );
}
