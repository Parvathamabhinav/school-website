"use client";

import { useRef, type ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollDepth } from "@/components/animations/ScrollDepth";
import { gsap } from "@/lib/animations/gsap";
import { distances, durations, type Easing } from "@/lib/animations/tokens";
import { useLayerTransition } from "@/lib/animations/use-layer-transition";
import { useTablist } from "@/lib/interaction/use-tablist";
import { cn } from "@/lib/utils/cn";
import { campusLayouts, type CampusLayout } from "./campus-layouts";

const emphasized: Easing = "emphasized";
const standard: Easing = "standard";

interface ExplorerExperience {
  id: string;
  number: string;
  title: string;
  description: string;
  caption?: string;
}

interface CampusExplorerProps {
  /** Server-rendered section intro (eyebrow, heading, description). */
  intro: ReactNode;
  /** id of the section heading, which labels the index. */
  labelledBy: string;
  experiences: ExplorerExperience[];
  /** Server-rendered image for each experience, in the same order. */
  media: ReactNode[];
  /** Ratio class for the media frame, e.g. "aspect-landscape". */
  frameClassName: string;
  layout: CampusLayout;
}

/**
 * Interactive campus explorer: the intro and the active experience's text
 * on the left, a large photograph breaking out to the right edge, and a
 * horizontal numbered index beneath it (ARIA tabs via useTablist).
 *
 * Switching is directional: the outgoing photograph eases back while the
 * incoming one is unmasked from the side you're moving toward, drifting
 * slightly as it settles. All layers live in fixed-size slots, so nothing
 * in the layout moves; reduced motion switches instantly.
 */
export function CampusExplorer({ intro, labelledBy, experiences, media, frameClassName, layout }: CampusExplorerProps) {
  const { active, getTabProps, descriptionId, tablistProps, panelProps } = useTablist(experiences.length, "horizontal");
  const mediaLayers = useRef<(HTMLDivElement | null)[]>([]);
  const textLayers = useRef<(HTMLDivElement | null)[]>([]);
  const captionLayers = useRef<(HTMLParagraphElement | null)[]>([]);
  const classes = campusLayouts[layout];

  const present = <T,>(list: (T | null)[]) => list.filter((item): item is T => item !== null);

  useLayerTransition(
    active,
    () => {
      const layers = [...present(mediaLayers.current), ...present(textLayers.current), ...present(captionLayers.current)];
      const images = present(mediaLayers.current.map((layer) => layer?.querySelector("picture, img") ?? null));
      return [...layers, ...images];
    },
    (from, to) => {
      const outgoing = mediaLayers.current[from];
      const incoming = mediaLayers.current[to];
      if (!outgoing || !incoming) return null;

      const forward = to > from;
      const timeline = gsap
        .timeline({ defaults: { ease: emphasized } })
        // 1. The current photograph eases back…
        .set(outgoing, { visibility: "visible", zIndex: 1 })
        .to(outgoing, { scale: 0.94, duration: durations.normal }, 0)
        // 2. …while the next is unmasked from the direction of travel…
        .fromTo(
          incoming,
          { zIndex: 2, clipPath: forward ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: durations.normal },
          0.05,
        )
        // 3. …and settles into place.
        .fromTo(
          incoming.querySelector("picture, img"),
          { scale: 1.12, xPercent: forward ? 3 : -3 },
          { scale: 1, xPercent: 0, duration: durations.slow },
          0.05,
        )
        .set(outgoing, { clearProps: "visibility,zIndex,transform" }, 0.05 + durations.normal);

      const fadeAcross = (out: Element | null | undefined, into: Element | null | undefined, rise: number) => {
        if (!out || !into) return;
        timeline
          .fromTo(out, { visibility: "visible", opacity: 1 }, { opacity: 0, duration: durations.fast, ease: standard }, 0)
          .fromTo(into, { opacity: 0, y: rise }, { opacity: 1, y: 0, duration: durations.normal }, durations.fast / 2);
      };
      fadeAcross(textLayers.current[from], textLayers.current[to], distances.sm);
      fadeAcross(captionLayers.current[from], captionLayers.current[to], 0);

      return timeline;
    },
  );

  const stackedState = (index: number) => (index === active ? "visible" : "invisible");

  return (
    <div className="grid-editorial gap-y-2xl">
      <div className={cn("col-span-12 flex flex-col justify-between gap-2xl", classes.intro)}>
        {intro}

        {/* The tab panel: the active experience. Every text layer shares one
            grid cell, so the slot is as tall as the longest and never resizes. */}
        <Reveal preset="fadeUp" className={cn("hidden", classes.detail)}>
          <div {...panelProps} className="grid">
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                ref={(element) => {
                  textLayers.current[index] = element;
                }}
                aria-hidden={index !== active}
                className={cn("col-start-1 row-start-1 flex flex-col gap-xs", stackedState(index))}
              >
                <p className="type-label text-text-muted">
                  {experience.number} · {experience.title}
                </p>
                <p id={descriptionId(index)} className="type-body-lg">
                  {experience.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className={cn("col-span-12 hidden", classes.media)}>
        <div className={classes.bleed}>
          <Reveal preset="imageReveal">
            <div className={cn("relative overflow-hidden bg-surface", frameClassName)}>
              <ScrollDepth target="[data-depth]" amount={3} className="absolute inset-0">
                <div data-depth className="absolute inset-0">
                  {media.map((node, index) => (
                    <div
                      key={experiences[index]?.id ?? index}
                      ref={(element) => {
                        mediaLayers.current[index] = element;
                      }}
                      aria-hidden={index !== active}
                      className={cn("absolute inset-0", stackedState(index))}
                    >
                      {node}
                    </div>
                  ))}
                </div>
              </ScrollDepth>
            </div>
          </Reveal>
        </div>

        {experiences.some((experience) => experience.caption) && (
          <div className="mt-sm grid" aria-hidden="true">
            {experiences.map((experience, index) => (
              <p
                key={experience.id}
                ref={(element) => {
                  captionLayers.current[index] = element;
                }}
                className={cn("type-label col-start-1 row-start-1 text-text-muted", stackedState(index))}
              >
                {experience.caption}
              </p>
            ))}
          </div>
        )}

        <Reveal preset="fadeUp" className="mt-xl">
          <div {...tablistProps} aria-labelledby={labelledBy} className="grid auto-cols-fr grid-flow-col gap-x-md">
            {experiences.map((experience, index) => {
              const selected = index === active;
              return (
                <button
                  key={experience.id}
                  {...getTabProps(index)}
                  className="group relative flex flex-col gap-xs border-t border-border pt-md pr-sm text-left"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 -top-px h-0.5 origin-left bg-accent motion-transform",
                      selected ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                  <span className={cn("type-meta tabular-nums motion-colors", selected && "text-text")}>
                    {experience.number}
                  </span>
                  <span
                    className={cn(
                      "type-body-sm font-medium motion-colors",
                      selected ? "text-text" : "text-text-muted group-hover:text-text",
                    )}
                  >
                    {experience.title}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
