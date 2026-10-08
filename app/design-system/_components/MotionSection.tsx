import { distances, durations, easings, staggers, type Easing } from "@/lib/animations/tokens";
import { MotionDemo } from "./MotionDemo";
import { ShowcaseSection, Specimen } from "./ShowcaseSection";

const durationUses: Record<keyof typeof durations, string> = {
  fast: "Hover, press, colour",
  normal: "Single element reveal",
  slow: "Image and section entrances",
};

const easingUses: Record<Easing, string> = {
  standard: "General UI transitions",
  emphasized: "Entrances: the signature curve",
  exit: "Leaving the screen",
};

function EasingCurve({ points }: { points: readonly number[] }) {
  const [x1, y1, x2, y2] = points.map((value) => value * 100);
  return (
    <svg viewBox="-4 -4 108 108" aria-hidden="true" className="size-16 shrink-0 overflow-visible">
      <rect x="0" y="0" width="100" height="100" className="fill-none stroke-border" strokeWidth="1" />
      <path d={`M0 100 C ${x1} ${100 - y1} ${x2} ${100 - y2} 100 0`} className="fill-none stroke-text" strokeWidth="3" />
    </svg>
  );
}

export function MotionSection() {
  return (
    <ShowcaseSection
      id="motion"
      index={11}
      title="Motion"
      description="Motion explains hierarchy and direction: content rises into reading order, imagery is framed, nothing bounces. One token file drives both GSAP and CSS transitions, and every preset is skipped under reduced motion."
    >
      <div className="grid gap-xl md:grid-cols-2">
        <Specimen title="Durations">
          <ul>
            {Object.entries(durations).map(([name, seconds]) => (
              <li key={name} className="flex items-baseline justify-between gap-md border-b border-border-subtle py-sm">
                <code className="type-body-sm font-medium">{name}</code>
                <span className="type-meta text-right">
                  {seconds * 1000}ms · {durationUses[name as keyof typeof durations]}
                </span>
              </li>
            ))}
          </ul>
          <p className="type-meta mt-md">
            Distances: {Object.values(distances).join(" / ")}px · Staggers: {Object.values(staggers).join(" / ")}s
          </p>
        </Specimen>

        <Specimen title="Easing">
          <ul className="flex flex-col gap-md">
            {(Object.keys(easings) as Easing[]).map((name) => (
              <li key={name} className="flex items-center gap-md">
                <EasingCurve points={easings[name]} />
                <span className="flex flex-col">
                  <code className="type-body-sm font-medium">{name}</code>
                  <span className="type-meta">{easingUses[name]}</span>
                </span>
              </li>
            ))}
          </ul>
        </Specimen>
      </div>

      <Specimen title="Presets">
        <MotionDemo />
      </Specimen>
    </ShowcaseSection>
  );
}
