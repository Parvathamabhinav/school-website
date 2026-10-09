"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent, type MouseEvent } from "react";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { TextLink } from "@/components/ui/TextLink";
import { buttonStyles } from "@/components/ui/Button";
import { lockScroll, unlockScroll } from "@/lib/dom/scroll-lock";
import { cn } from "@/lib/utils/cn";
import type { GalleryCategory, GalleryItem } from "@/types/school";
import { composeGallery, gallerySlots } from "./gallery-layout";

interface GalleryCollectionProps {
  items: GalleryItem[];
  /** Only themes that have photographs, in filter order. */
  categories: GalleryCategory[];
  allLabel: string;
  showFilters: boolean;
}

const ALL = "all";

// True only once hydrated: the filters do nothing without JavaScript, so
// they are not shown until they work.
const subscribeNever = () => () => {};
const useHydrated = () => useSyncExternalStore(subscribeNever, () => true, () => false);

/**
 * The gallery itself: optional theme filters, the photographs in an
 * orientation-aware editorial grid (gallery-layout.ts), and a viewer.
 *
 * - Filters are toggle buttons (aria-pressed) with a live count; changing
 *   them re-flows the grid without animation.
 * - Each photograph links to its image file, so it opens larger even
 *   without JavaScript. With it, the link opens a modal viewer instead: a
 *   native <dialog> (focus contained, Escape closes, page inert), with
 *   previous/next buttons and arrow keys, page scroll locked, and focus
 *   returned to the photograph last shown. Nothing in it animates.
 */
export function GalleryCollection({ items, categories, allLabel, showFilters }: GalleryCollectionProps) {
  const hydrated = useHydrated();
  const filterLabelId = useId();
  const [active, setActive] = useState(ALL);
  const [viewing, setViewing] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggers = useRef(new Map<string, HTMLAnchorElement>());
  const shownId = useRef<string | null>(null);
  const lockedRef = useRef(false);

  const visible = active === ALL ? items : items.filter((item) => item.category === active);
  const slots = composeGallery(visible.map((item) => item.image.height > item.image.width));
  const labelOf = (id?: string) => categories.find((category) => category.id === id)?.label;
  const current = viewing === null ? null : visible[viewing];

  const open = (index: number) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    shownId.current = visible[index].id;
    setViewing(index);
    if (!dialog.open) {
      lockedRef.current = true;
      lockScroll();
      dialog.showModal();
      closeRef.current?.focus();
    }
  };

  /** Steps through the photographs currently shown, wrapping at either end. */
  const show = (step: number) => {
    if (viewing === null) return;
    const next = (viewing + step + visible.length) % visible.length;
    shownId.current = visible[next].id;
    setViewing(next);
  };

  /** Runs once the dialog has closed, however that happened. */
  const handleClosed = () => {
    if (lockedRef.current) {
      lockedRef.current = false;
      unlockScroll();
    }
    setViewing(null);
    const id = shownId.current;
    if (id) triggers.current.get(id)?.focus();
  };

  const handleOpen = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    // Let modified clicks (new tab, download) behave as ordinary links.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    open(index);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") show(1);
    else if (event.key === "ArrowLeft") show(-1);
  };

  // Clicking the backdrop area (the dialog itself, not its content) closes.
  const handleDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) dialogRef.current?.close();
  };

  // Never leave the page scroll-locked after unmount.
  useEffect(
    () => () => {
      if (lockedRef.current) unlockScroll();
    },
    [],
  );

  const filters = showFilters && categories.length > 1 && hydrated;
  const activeLabel = active === ALL ? null : labelOf(active);

  return (
    <>
      {filters && (
        <div className="mb-2xl flex flex-col gap-md lg:mb-section-sm">
          <div role="group" aria-labelledby={filterLabelId} className="flex flex-wrap items-center gap-xs">
            <span id={filterLabelId} className="type-label mr-sm text-text-muted">
              Theme
            </span>
            {[{ id: ALL, label: allLabel }, ...categories].map((category) => (
              <button
                key={category.id}
                type="button"
                aria-pressed={active === category.id}
                onClick={() => setActive(category.id)}
                className={buttonStyles({
                  variant: "ghost",
                  size: "sm",
                  className:
                    "border border-border aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary aria-pressed:hover:bg-primary-hover",
                })}
              >
                {category.label}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="type-meta text-text-muted">
            {activeLabel
              ? `Showing ${visible.length} of ${items.length} photographs: ${activeLabel}.`
              : `Showing all ${items.length} photographs.`}
          </p>
        </div>
      )}

      <ul className="grid-editorial items-end gap-y-xl lg:gap-y-2xl">
        {visible.map((item, index) => {
          const slot = gallerySlots[slots[index]];
          return (
            <li key={item.id} className={cn("col-span-12", slot.item)}>
              <figure>
                <a
                  ref={(node) => {
                    if (node) triggers.current.set(item.id, node);
                    else triggers.current.delete(item.id);
                  }}
                  href={item.image.src}
                  aria-haspopup="dialog"
                  onClick={(event) => handleOpen(event, index)}
                  className="group block"
                >
                  <ResponsiveImage
                    image={item.image}
                    sizes={slot.sizes}
                    aspectRatio={slot.aspectRatio}
                    objectPosition={item.focalPoint}
                    className={cn(
                      slot.aspect,
                      "[&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-out motion-safe:group-hover:[&_img]:scale-[1.03]",
                    )}
                  />
                  <span className="sr-only">(view larger)</span>
                </a>
                {(item.caption || item.link) && (
                  <figcaption className="type-meta mt-sm flex flex-wrap items-baseline gap-x-md gap-y-2xs text-text-muted">
                    {item.caption && <span>{item.caption}</span>}
                    {item.link && (
                      <TextLink href={item.link.href} variant="reveal" className="text-text">
                        {item.link.label}
                      </TextLink>
                    )}
                  </figcaption>
                )}
              </figure>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Photograph viewer"
        onClose={handleClosed}
        onKeyDown={handleKeyDown}
        onClick={handleDialogClick}
        className="theme-inverse m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain border-0 bg-background p-0 text-text backdrop:bg-transparent"
      >
        <div className="mx-auto flex min-h-full max-w-wide flex-col px-gutter py-md">
          <div className="flex items-center justify-between gap-md">
            <p className="type-meta tabular-nums text-text-muted">
              {current && `${(viewing ?? 0) + 1} / ${visible.length}`}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => dialogRef.current?.close()}
              className={buttonStyles({ variant: "ghost", size: "sm", className: "-mr-md" })}
            >
              Close
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          {current && (
            <figure className="flex flex-1 flex-col items-center justify-center gap-md py-md">
              <Image
                key={current.id}
                src={current.image.src}
                alt={current.image.alt}
                width={current.image.width}
                height={current.image.height}
                sizes="(min-width: 90rem) 90rem, 100vw"
                placeholder={current.image.blurDataURL ? "blur" : "empty"}
                blurDataURL={current.image.blurDataURL}
                className="h-auto max-h-[72dvh] w-auto max-w-full object-contain"
              />
              <figcaption aria-live="polite" className="type-body-sm text-center text-text-muted">
                {current.caption ?? current.image.alt}
                {labelOf(current.category) && (
                  <>
                    {" "}
                    <span className="type-label ml-xs text-accent">{labelOf(current.category)}</span>
                  </>
                )}
              </figcaption>
            </figure>
          )}

          {visible.length > 1 && (
            <div className="flex items-center justify-between gap-md">
              <button type="button" onClick={() => show(-1)} className={buttonStyles({ variant: "ghost", size: "sm", className: "-ml-md" })}>
                <ChevronLeft aria-hidden="true" className="size-5" />
                Previous
              </button>
              <button type="button" onClick={() => show(1)} className={buttonStyles({ variant: "ghost", size: "sm", className: "-mr-md" })}>
                Next
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
