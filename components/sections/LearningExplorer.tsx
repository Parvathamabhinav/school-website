"use client";

import { useRef, type ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { gsap } from "@/lib/animations/gsap";
import { distances, durations, type Easing } from "@/lib/animations/tokens";
import { useLayerTransition } from "@/lib/animations/use-layer-transition";
import { useTablist } from "@/lib/interaction/use-tablist";
import { cn } from "@/lib/utils/cn";

const emphasized: Easing = "emphasized";
const standard: Easing = "standard";

interface ExplorerPrinciple {
  id: string;
  title: string;
  description: string;
}

interface LearningExplorerProps {
  /** Server-rendered section intro (eyebrow, heading, description). */
  intro: ReactNode;
  /** id of the section heading, which labels the principle list. */
  labelledBy: string;
  principles: ExplorerPrinciple[];
  /** Server-rendered image for each principle, in the same order. */
  media: ReactNode[];
}

/**
 * Desktop (lg+) principle explorer: an editorial index on the left controls
 * a media panel on the right (ARIA tabs via useTablist).
 *
 * Every image and description is rendered and stacked in a fixed-size slot;
 * only visibility changes. The layout therefore never moves, reduced motion
 * switches instantly via classes, and GSAP only adds the cross-transition.
 *
 * Below lg only the intro shows here; LearningSection renders the principles
 * as a stacked sequence instead.
 */
export function LearningExplorer({ intro, labelledBy, principles, media }: LearningExplorerProps) {
  const { active, getTabProps, descriptionId, tablistProps, panelProps } = useTablist(principles.length, "vertical");
  const mediaLayers = useRef<(HTMLDivElement | null)[]>([]);
  const textLayers = useRef<(HTMLDivElement | null)[]>([]);

  const layers = () =>
    [...mediaLayers.current, ...textLayers.current].filter((layer): layer is HTMLDivElement => layer !== null);

  // Wipe the new image in from the left with a slight settle; cross-fade text.
  useLayerTransition(
    active,
    () => [...layers(), ...layers().map((layer) => layer.querySelector("picture, img")).filter((el): el is Element => el !== null)],
    (from, to) => {
      const outgoing = mediaLayers.current[from];
      const incoming = mediaLayers.current[to];
      const outText = textLayers.current[from];
      const inText = textLayers.current[to];
      if (!outgoing || !incoming || !outText || !inText) return null;

      return gsap
        .timeline({ defaults: { ease: emphasized } })
        .set(outgoing, { visibility: "visible", zIndex: 1 })
        .fromTo(
          incoming,
          { zIndex: 2, clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: durations.normal },
          0,
        )
        // Once the wipe has covered it, the outgoing image can go.
        .set(outgoing, { clearProps: "visibility,zIndex" }, durations.normal)
        .fromTo(incoming.querySelector("picture, img"), { scale: 1.06 }, { scale: 1, duration: durations.slow }, 0)
        .fromTo(outText, { visibility: "visible", opacity: 1 }, { opacity: 0, duration: durations.fast, ease: standard }, 0)
        .fromTo(inText, { opacity: 0, y: distances.sm }, { opacity: 1, y: 0, duration: durations.normal }, durations.fast / 2);
    },
  );

  return (
    <div className="grid-editorial gap-y-2xl">
      <div className="col-span-12 flex flex-col lg:col-span-5">
        {intro}

        <Reveal preset="fadeUp" className="mt-2xl hidden lg:block">
          <div {...tablistProps} aria-labelledby={labelledBy} className="border-b border-border">
            {principles.map((principle, index) => {
              const selected = index === active;
              return (
                <button
                  key={principle.id}
                  {...getTabProps(index)}
                  className="group flex w-full items-baseline gap-md border-t border-border py-md text-left"
                >
                  <span className="type-meta w-lg shrink-0 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  <span
                    className={cn(
                      "type-h3 motion-colors",
                      selected ? "text-text" : "text-text-muted group-hover:text-text",
                    )}
                  >
                    {principle.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "ml-auto h-px w-xl shrink-0 origin-left self-center bg-accent motion-transform",
                      selected ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      <div {...panelProps} className="hidden lg:col-span-7 lg:col-start-6 lg:block">
        <Reveal preset="imageReveal">
          <div className="relative aspect-landscape overflow-hidden bg-surface">
            {media.map((node, index) => (
              <div
                key={principles[index]?.id ?? index}
                ref={(element) => {
                  mediaLayers.current[index] = element;
                }}
                aria-hidden={index !== active}
                className={cn("absolute inset-0", index === active ? "visible" : "invisible")}
              >
                {node}
              </div>
            ))}
          </div>
        </Reveal>

        {/* All descriptions share one grid cell, so the slot is as tall as the longest. */}
        <Reveal preset="fadeUp" className="mt-lg grid">
          {principles.map((principle, index) => (
            <div
              key={principle.id}
              ref={(element) => {
                textLayers.current[index] = element;
              }}
              aria-hidden={index !== active}
              className={cn(
                "col-start-1 row-start-1 flex max-w-narrow flex-col gap-xs",
                index === active ? "visible" : "invisible",
              )}
            >
              <p className="type-label text-text-muted">
                {String(index + 1).padStart(2, "0")} · {principle.title}
              </p>
              <p id={descriptionId(index)} className="type-body-lg">
                  {principle.description}
                </p>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
