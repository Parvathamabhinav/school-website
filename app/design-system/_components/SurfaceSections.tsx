import { cn } from "@/lib/utils/cn";
import { ShowcaseSection, Specimen } from "./ShowcaseSection";

const borders = [
  { token: "border-border-subtle", className: "border-border-subtle", use: "Dividers inside lists and tables" },
  { token: "border-border", className: "border-border", use: "Default rule between blocks" },
  { token: "border-border-strong", className: "border-border-strong", use: "Interactive outlines (secondary button)" },
];

export function BordersSection() {
  return (
    <ShowcaseSection
      id="borders"
      index={8}
      tone="surface"
      title="Borders and elevation"
      description="Hairlines, not boxes. Borders separate content quietly; brass appears only as a short editorial rule. Shadows are reserved for things that genuinely float."
    >
      <Specimen title="Border tokens">
        <ul className="flex flex-col gap-lg">
          {borders.map(({ token, className, use }) => (
            <li key={token} className={cn("border-t pt-sm", className)}>
              <code className="type-body-sm font-medium">{token}</code>
              <p className="type-meta">{use}</p>
            </li>
          ))}
          <li className="flex flex-col gap-sm">
            <span aria-hidden="true" className="h-0.5 w-xl bg-accent" />
            <code className="type-body-sm font-medium">bg-accent rule</code>
            <p className="type-meta">Editorial marker above a label or numeral. Never a full-width line.</p>
          </li>
        </ul>
      </Specimen>

      <Specimen title="Elevation">
        <ul className="grid gap-lg sm:grid-cols-3">
          <li className="bg-background p-card">
            <code className="type-body-sm font-medium">none</code>
            <p className="type-meta">The default. Separate with space and tone.</p>
          </li>
          <li className="bg-background p-card shadow-sm">
            <code className="type-body-sm font-medium">shadow-sm</code>
            <p className="type-meta">Controls that sit on imagery.</p>
          </li>
          <li className="bg-background p-card shadow-overlay">
            <code className="type-body-sm font-medium">shadow-overlay</code>
            <p className="type-meta">Menus, dialogs, floating panels.</p>
          </li>
        </ul>
        <p className="type-meta mt-md">shadow-lift is applied by the hover-lift utility (see Motion).</p>
      </Specimen>
    </ShowcaseSection>
  );
}

const radii = [
  { token: "rounded-none", className: "rounded-none", use: "Images, sections, cards (default)" },
  { token: "rounded-xs", className: "rounded-xs", use: "Buttons, inputs" },
  { token: "rounded-sm", className: "rounded-sm", use: "Tags, small chips" },
  { token: "rounded-md", className: "rounded-md", use: "Menus, dialogs" },
  { token: "rounded-full", className: "rounded-full", use: "Avatars and dots only" },
];

export function RadiusSection() {
  return (
    <ShowcaseSection
      id="radius"
      index={9}
      title="Corner radius"
      description="Square by default. A barely-there radius softens controls; full rounding is limited to avatars and indicators."
    >
      <ul className="grid grid-cols-2 gap-lg sm:grid-cols-3 lg:grid-cols-5">
        {radii.map(({ token, className, use }) => (
          <li key={token} className="flex flex-col gap-sm">
            <span className={cn("aspect-square w-full max-w-32 bg-secondary", className)} />
            <code className="type-body-sm font-medium">{token}</code>
            <span className="type-meta">{use}</span>
          </li>
        ))}
      </ul>
    </ShowcaseSection>
  );
}
