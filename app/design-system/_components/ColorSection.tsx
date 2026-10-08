import { school } from "@/data/school";
import { cn } from "@/lib/utils/cn";
import { contrastRatio, rateContrast } from "../_lib/contrast";
import { ShowcaseSection, Specimen } from "./ShowcaseSection";

const palette = school.brand.colors;

// Class names are written out in full so Tailwind can detect them.
const brandSwatches = [
  { name: "Primary", token: "--color-primary", swatch: "bg-primary", hex: palette.primary },
  { name: "Secondary", token: "--color-secondary", swatch: "bg-secondary", hex: palette.secondary },
  { name: "Background", token: "--color-background", swatch: "bg-background", hex: palette.background },
  { name: "Surface", token: "--color-surface", swatch: "bg-surface", hex: palette.surface },
  { name: "Text", token: "--color-text", swatch: "bg-text", hex: palette.text },
  { name: "Text muted", token: "--color-text-muted", swatch: "bg-text-muted", hex: palette.textMuted },
  { name: "Accent", token: "--color-accent", swatch: "bg-accent", hex: palette.accent },
  { name: "Accent alt", token: "--color-accent-alt", swatch: "bg-accent-alt", hex: palette.accentAlt ?? "Falls back to secondary" },
];

const derivedTokens = [
  { token: "--color-primary-hover", swatch: "bg-primary-hover", use: "Primary button hover" },
  { token: "--color-primary-active", swatch: "bg-primary-active", use: "Primary button pressed" },
  { token: "--color-surface-muted", swatch: "bg-surface-muted", use: "Quiet alternate section" },
  { token: "--color-overlay-hover", swatch: "bg-overlay-hover", use: "Ghost / row hover" },
  { token: "--color-overlay-active", swatch: "bg-overlay-active", use: "Ghost / row pressed" },
  { token: "--color-disabled", swatch: "bg-disabled", use: "Disabled fill" },
  { token: "--color-on-disabled", swatch: "bg-on-disabled", use: "Disabled text" },
  { token: "--color-focus", swatch: "bg-focus", use: "Focus outline" },
];

const contrastPairs = [
  { label: "Text on background", fg: palette.text, bg: palette.background },
  { label: "Text on surface", fg: palette.text, bg: palette.surface },
  { label: "Muted on background", fg: palette.textMuted, bg: palette.background },
  { label: "Muted on surface", fg: palette.textMuted, bg: palette.surface },
  { label: "Primary on background", fg: palette.primary, bg: palette.background },
  { label: "Background on primary", fg: palette.background, bg: palette.primary },
  { label: "Accent on primary", fg: palette.accent, bg: palette.primary },
  { label: "Accent on background", fg: palette.accent, bg: palette.background },
  { label: "Accent on surface", fg: palette.accent, bg: palette.surface },
];

export function ColorSection() {
  return (
    <ShowcaseSection
      id="color"
      index={1}
      title="Colour"
      description="Raw brand colours come from the school's data and are only ever used through semantic tokens. States are derived, so a new palette brings its own hover, pressed and disabled colours."
    >
      <Specimen title="Brand palette">
        <ul className="grid grid-cols-2 gap-x-lg gap-y-xl sm:grid-cols-4">
          {brandSwatches.map(({ name, token, swatch, hex }) => (
            <li key={token} className="flex flex-col gap-sm">
              <span className={cn("h-24 w-full border border-border-subtle", swatch)} />
              <span className="flex flex-col">
                <span className="type-body-sm font-medium">{name}</span>
                <span className="type-meta">{hex}</span>
                <code className="type-meta">{token}</code>
              </span>
            </li>
          ))}
        </ul>
      </Specimen>

      <Specimen title="Derived states">
        <ul className="grid grid-cols-1 gap-y-md sm:grid-cols-2 sm:gap-x-lg">
          {derivedTokens.map(({ token, swatch, use }) => (
            <li key={token} className="flex items-center gap-md">
              <span className={cn("size-12 shrink-0 border border-border-subtle", swatch)} />
              <span className="flex min-w-0 flex-col">
                <span className="type-body-sm">{use}</span>
                <code className="type-meta break-all">{token}</code>
              </span>
            </li>
          ))}
        </ul>
      </Specimen>

      <Specimen title="Contrast (WCAG 2.2)">
        <div className="overflow-x-auto">
          <table className="type-body-sm w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="type-label py-sm pr-md font-semibold text-text-muted">Pair</th>
                <th scope="col" className="type-label py-sm pr-md font-semibold text-text-muted">Sample</th>
                <th scope="col" className="type-label py-sm pr-md font-semibold text-text-muted">Ratio</th>
                <th scope="col" className="type-label py-sm font-semibold text-text-muted">Use</th>
              </tr>
            </thead>
            <tbody>
              {contrastPairs.map(({ label, fg, bg }) => {
                const ratio = contrastRatio(fg, bg);
                return (
                  <tr key={label} className="border-b border-border-subtle">
                    <th scope="row" className="py-sm pr-md font-normal">{label}</th>
                    <td className="py-sm pr-md">
                      {/* Inline style is intentional: this cell renders the raw pair being measured. */}
                      <span className="type-body-sm inline-block px-sm py-2xs font-medium" style={{ color: fg, backgroundColor: bg }}>
                        Aa
                      </span>
                    </td>
                    <td className="py-sm pr-md tabular-nums">{ratio.toFixed(2)}:1</td>
                    <td className="py-sm">{rateContrast(ratio)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="type-meta mt-md max-w-narrow">
          Brass is decorative on light surfaces: rules, icons and numerals beside real text. It may carry text only on
          the primary colour.
        </p>
      </Specimen>
    </ShowcaseSection>
  );
}
