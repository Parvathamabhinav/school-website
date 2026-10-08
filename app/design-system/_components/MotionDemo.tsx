"use client";

import { RotateCcw } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import type { PresetName } from "@/lib/animations/presets";
import { usePrefersReducedMotion } from "@/lib/animations/use-reduced-motion";
import { placeholderPortrait } from "../_lib/samples";

const tiles: { preset: PresetName; use: string }[] = [
  { preset: "fadeIn", use: "Supporting content, no direction" },
  { preset: "fadeUp", use: "Default reveal into reading order" },
  { preset: "fadeDown", use: "Overlays and announcements" },
  { preset: "stagger", use: "Lists and groups, read in sequence" },
  { preset: "imageReveal", use: "Large editorial imagery" },
  { preset: "scaleReveal", use: "Focal media settling into place" },
];

function Stage({ preset, replayKey }: { preset: PresetName; replayKey: number }) {
  if (preset === "imageReveal") {
    return (
      <Reveal preset="imageReveal" replayKey={replayKey} className="w-1/2">
        <ResponsiveImage image={placeholderPortrait} sizes="third" aspectRatio="portrait" />
      </Reveal>
    );
  }

  if (preset === "stagger") {
    return (
      <Reveal preset="stagger" target="children" replayKey={replayKey} className="flex w-3/4 flex-col gap-xs">
        {["w-full", "w-5/6", "w-2/3", "w-1/2"].map((width) => (
          <span key={width} className={`h-sm bg-secondary ${width}`} />
        ))}
      </Reveal>
    );
  }

  return (
    <Reveal preset={preset} replayKey={replayKey} className="w-3/4">
      <div className="bg-background p-md">
        <p className="type-h4">Open Morning</p>
        <p className="type-meta">Saturday · 10am</p>
      </div>
    </Reveal>
  );
}

function Tile({ title, use, children }: { title: string; use: string; children: ReactNode }) {
  return (
    <li className="flex flex-col gap-sm">
      <div className="flex aspect-landscape items-center justify-center overflow-hidden bg-surface sm:aspect-square">{children}</div>
      <code className="type-body-sm font-medium">{title}</code>
      <span className="type-meta">{use}</span>
    </li>
  );
}

export function MotionDemo() {
  const [replayKey, setReplayKey] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex flex-wrap items-center justify-between gap-md">
        <p className="type-body-sm text-text-muted" role="status">
          {reducedMotion
            ? "Reduced motion is on: presets are skipped and content appears in its final state."
            : "Presets play once as each tile scrolls into view."}
        </p>
        <Button
          variant="secondary"
          size="sm"
          icon={<RotateCcw aria-hidden="true" className="size-4" />}
          onClick={() => setReplayKey((key) => key + 1)}
        >
          Replay
        </Button>
      </div>

      <ul className="grid grid-cols-1 gap-x-lg gap-y-xl sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map(({ preset, use }) => (
          <Tile key={preset} title={preset} use={use}>
            <Stage preset={preset} replayKey={replayKey} />
          </Tile>
        ))}
        <Tile title="hover-lift (CSS)" use="Pointer hover on interactive cards">
          <div className="hover-lift w-3/4 bg-background p-md">
            <p className="type-h4">Hover me</p>
            <p className="type-meta">Lift of 2px with shadow-lift</p>
          </div>
        </Tile>
      </ul>
    </div>
  );
}
