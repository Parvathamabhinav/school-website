"use client";

import { useId, useRef, type ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollDepth } from "@/components/animations/ScrollDepth";
import { gsap } from "@/lib/animations/gsap";
import { durations, type Easing } from "@/lib/animations/tokens";
import { useLayerTransition } from "@/lib/animations/use-layer-transition";
import { useTablist } from "@/lib/interaction/use-tablist";
import { cn } from "@/lib/utils/cn";

const emphasized: Easing = "emphasized";
const standard: Easing = "standard";

interface ExplorerItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description?: string;
  meta: string;
}

interface AchievementsExplorerProps {
  /** id of the section heading, which labels the ledger. */
  labelledBy: string;
  items: ExplorerItem[];
  /** Server-rendered photograph for each item (its own or the lead image). */
  media: ReactNode[];
}

/**
 * Desktop (lg+) achievements ledger: a sticky lead photograph on the left,
 * an annual-report style ledger on the right (ARIA tabs via useTablist).
 * Every entry shows its full text at all times; activating one only brings
 * its photograph forward and marks it with the accent rule.
 *
 * Switch: the current photograph fades back slightly while the next is
 * unveiled upward. Fixed slots, so nothing in the layout moves; reduced
 * motion switches instantly.
 */
export function AchievementsExplorer({ labelledBy, items, media }: AchievementsExplorerProps) {
  const { active, getTabProps, tablistProps, panelProps } = useTablist(items.length, "vertical");
  const baseId = useId();
  const partId = (index: number, part: string) => `${baseId}-${index}-${part}`;
  const layers = useRef<(HTMLDivElement | null)[]>([]);

  const present = () => layers.current.filter((layer): layer is HTMLDivElement => layer !== null);

  useLayerTransition(
    active,
    () => [
      ...present(),
      ...present()
        .map((layer) => layer.querySelector("picture, img"))
        .filter((el): el is Element => el !== null),
    ],
    (from, to) => {
      const outgoing = layers.current[from];
      const incoming = layers.current[to];
      if (!outgoing || !incoming) return null;

      return gsap
        .timeline({ defaults: { ease: emphasized } })
        .set(outgoing, { visibility: "visible", zIndex: 1 })
        .to(outgoing, { opacity: 0, scale: 0.97, duration: durations.normal, ease: standard }, 0)
        .fromTo(
          incoming,
          { zIndex: 2, opacity: 0.4, clipPath: "inset(100% 0% 0% 0%)" },
          { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: durations.normal },
          0,
        )
        .fromTo(incoming.querySelector("picture, img"), { scale: 1.05 }, { scale: 1, duration: durations.slow }, 0)
        .set(outgoing, { clearProps: "visibility,zIndex,opacity,transform" }, durations.normal);
    },
  );

  return (
    <div className="hidden lg:block">
      <div className="grid-editorial items-start">
        {/* Tabs precede the panel in reading and Tab order; the grid puts the photograph on the left. */}
        <Reveal preset="fadeUp" className="col-span-5 col-start-8 row-start-1 xl:col-span-4 xl:col-start-9">
          <div {...tablistProps} aria-labelledby={labelledBy} className="border-b border-border">
            {items.map((item, index) => {
              const selected = index === active;
              const describedBy = [item.description && partId(index, "description"), item.meta && partId(index, "meta")]
                .filter(Boolean)
                .join(" ");
              return (
                <button
                  key={item.id}
                  {...getTabProps(index)}
                  // Name the tab by category and title; the rest is its description.
                  aria-labelledby={`${partId(index, "category")} ${partId(index, "title")}`}
                  aria-describedby={describedBy || undefined}
                  className="group relative grid w-full grid-cols-[2rem_1fr] gap-x-md border-t border-border py-lg text-left"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 -top-px h-0.5 origin-left bg-accent motion-transform",
                      selected ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                  <span className={cn("type-meta pt-2xs tabular-nums motion-colors", selected && "text-text")}>
                    {item.number}
                  </span>
                  <span className="flex min-w-0 flex-col gap-xs">
                    <span id={partId(index, "category")} className="type-label text-text-muted">
                      {item.category}
                    </span>
                    <span
                      id={partId(index, "title")}
                      className={cn(
                        "type-h3 motion-colors",
                        selected ? "text-text" : "text-text-muted group-hover:text-text",
                      )}
                    >
                      {item.title}
                    </span>
                    {item.description && (
                      <span id={partId(index, "description")} className="type-body-sm text-text-muted">
                        {item.description}
                      </span>
                    )}
                    {item.meta && (
                      <span id={partId(index, "meta")} className="type-meta">
                        {item.meta}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div {...panelProps} className="col-span-7 col-start-1 row-start-1 lg:sticky lg:top-24">
          <Reveal preset="imageReveal">
            <div className="relative aspect-landscape overflow-hidden bg-surface">
              <ScrollDepth target="[data-depth]" amount={3} className="absolute inset-0">
                <div data-depth className="absolute inset-0">
                  {media.map((node, index) => (
                    <div
                      key={items[index]?.id ?? index}
                      ref={(element) => {
                        layers.current[index] = element;
                      }}
                      aria-hidden={index !== active}
                      className={cn("absolute inset-0", index === active ? "visible" : "invisible")}
                    >
                      {node}
                    </div>
                  ))}
                </div>
              </ScrollDepth>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
