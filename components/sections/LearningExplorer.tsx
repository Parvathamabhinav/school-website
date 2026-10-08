"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";
import { distances, durations, type Easing } from "@/lib/animations/tokens";
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
 * a media panel on the right. Built as ARIA tabs with automatic activation,
 * so hover, focus, click and arrow keys all select the same principle.
 *
 * Every image and description is rendered and stacked in a fixed-size slot;
 * only visibility changes. The layout therefore never moves, reduced motion
 * switches instantly via classes, and GSAP only adds the cross-transition.
 *
 * Below lg only the intro shows here; LearningSection renders the principles
 * as a stacked sequence instead.
 */
export function LearningExplorer({ intro, labelledBy, principles, media }: LearningExplorerProps) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const previous = useRef(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const mediaLayers = useRef<(HTMLDivElement | null)[]>([]);
  const textLayers = useRef<(HTMLDivElement | null)[]>([]);

  const transition = useRef<gsap.core.Timeline | null>(null);

  // Cross-transition from the previous principle to the new one, as a single
  // timeline. Runs before paint, so the outgoing layers are held visible
  // before their classes hide them. When interrupted (rapid hovering), the
  // old timeline is killed and every layer is reset to its class-driven
  // state, so no stale inline style can outlive a transition.
  useGSAP(
    () => {
      const from = previous.current;
      previous.current = active;
      if (from === active) return;

      const layers = [...mediaLayers.current, ...textLayers.current].filter(
        (layer): layer is HTMLDivElement => layer !== null,
      );
      const images = layers.map((layer) => layer.querySelector("picture, img")).filter(Boolean);
      const reset = () => gsap.set([...layers, ...images], { clearProps: "opacity,visibility,clipPath,zIndex,transform" });

      transition.current?.kill();
      reset();
      if (prefersReducedMotion()) return;

      const outgoing = mediaLayers.current[from];
      const incoming = mediaLayers.current[active];
      const outText = textLayers.current[from];
      const inText = textLayers.current[active];
      if (!outgoing || !incoming || !outText || !inText) return;

      transition.current = gsap
        .timeline({ defaults: { ease: emphasized }, onComplete: reset })
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
        .fromTo(
          outText,
          { visibility: "visible", opacity: 1 },
          { opacity: 0, duration: durations.fast, ease: standard },
          0,
        )
        .fromTo(inText, { opacity: 0, y: distances.sm }, { opacity: 1, y: 0, duration: durations.normal }, durations.fast / 2);
    },
    { dependencies: [active] },
  );

  const focusTab = (index: number) => {
    const next = (index + principles.length) % principles.length;
    tabs.current[next]?.focus(); // focusing activates it
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowDown: () => focusTab(active + 1),
      ArrowRight: () => focusTab(active + 1),
      ArrowUp: () => focusTab(active - 1),
      ArrowLeft: () => focusTab(active - 1),
      Home: () => focusTab(0),
      End: () => focusTab(principles.length - 1),
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  const panelId = `${baseId}-panel`;
  const tabId = (index: number) => `${baseId}-tab-${index}`;

  return (
    <div className="grid-editorial gap-y-2xl">
      <div className="col-span-12 flex flex-col lg:col-span-5">
        {intro}

        <Reveal preset="fadeUp" className="mt-2xl hidden lg:block">
          <div role="tablist" aria-orientation="vertical" aria-labelledby={labelledBy} className="border-b border-border">
            {principles.map((principle, index) => {
              const selected = index === active;
              return (
                <button
                  key={principle.id}
                  ref={(element) => {
                    tabs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={tabId(index)}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onFocus={() => setActive(index)}
                  onPointerEnter={(event) => event.pointerType === "mouse" && setActive(index)}
                  onClick={() => setActive(index)}
                  onKeyDown={onKeyDown}
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

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId(active)}
        tabIndex={0}
        className="hidden lg:col-span-7 lg:col-start-6 lg:block"
      >
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
              <p className="type-body-lg">{principle.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
