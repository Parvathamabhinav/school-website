import { cn } from "@/lib/utils/cn";
import { ShowcaseSection, Specimen } from "./ShowcaseSection";

const scale = [
  { token: "2xs", bar: "w-2xs", value: "4px", use: "Micro: icon to text" },
  { token: "xs", bar: "w-xs", value: "8px", use: "Micro: label to value" },
  { token: "sm", bar: "w-sm", value: "12px", use: "Component: tight groups" },
  { token: "md", bar: "w-md", value: "16px", use: "Component: default gap" },
  { token: "lg", bar: "w-lg", value: "24px", use: "Component: related blocks" },
  { token: "xl", bar: "w-xl", value: "32 → 48px", use: "Between groups" },
  { token: "2xl", bar: "w-2xl", value: "48 → 80px", use: "Editorial pause" },
];

const layout = [
  { token: "card", bar: "w-card", value: "20 → 36px", use: "Card and panel padding" },
  { token: "grid", bar: "w-grid", value: "16 → 40px", use: "Grid column gap" },
  { token: "gutter", bar: "w-gutter", value: "20 → 48px", use: "Page edge" },
];

const sections = [
  { token: "section-sm", bar: "h-section-sm", value: "48 → 80px" },
  { token: "section-md", bar: "h-section-md", value: "72 → 128px" },
  { token: "section-lg", bar: "h-section-lg", value: "96 → 176px" },
];

function ScaleRow({ token, bar, value, use }: { token: string; bar: string; value: string; use: string }) {
  return (
    <li className="grid grid-cols-[4.5rem_1fr] items-center gap-md border-b border-border-subtle py-sm sm:grid-cols-[4.5rem_6rem_1fr]">
      <code className="type-body-sm font-medium">{token}</code>
      <span className="flex items-center gap-sm">
        <span className={cn("h-sm shrink-0 bg-secondary", bar)} />
        <span className="type-meta sm:hidden">{value}</span>
      </span>
      <span className="type-meta col-span-2 sm:col-span-1">
        <span className="hidden sm:inline">{value} · </span>
        {use}
      </span>
    </li>
  );
}

export function SpacingSection() {
  return (
    <ShowcaseSection
      id="spacing"
      index={3}
      title="Spacing"
      description="A small named scale for rhythm inside components, fluid tokens for layout, and three section steps. Use the names (gap-md, p-card, py-section-md) rather than raw numbers."
    >
      <Specimen title="Scale: micro and component">
        <ul>{scale.map((step) => <ScaleRow key={step.token} {...step} />)}</ul>
      </Specimen>

      <Specimen title="Layout">
        <ul>{layout.map((step) => <ScaleRow key={step.token} {...step} />)}</ul>
      </Specimen>

      <Specimen title="Section rhythm">
        <ul className="grid grid-cols-3 items-end gap-md">
          {sections.map(({ token, bar, value }) => (
            <li key={token} className="flex flex-col gap-sm">
              <span className={cn("w-full bg-surface", bar)} />
              <code className="type-body-sm font-medium">py-{token}</code>
              <span className="type-meta">{value}</span>
            </li>
          ))}
        </ul>
        <p className="type-meta mt-md max-w-narrow">
          Most sections use md. Reserve lg for a few moments of emphasis, and sm for tightly related content.
        </p>
      </Specimen>
    </ShowcaseSection>
  );
}
