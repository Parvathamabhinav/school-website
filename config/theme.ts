import type { CSSProperties } from "react";
import type { BrandPalette } from "@/types/school";

/**
 * Bridges a school's brand palette (data) to the design-token system (CSS).
 *
 * The root layout applies these as `--brand-*` custom properties on <html>.
 * app/globals.css maps them to semantic tokens (`--color-primary`, …), which
 * are the only colors components may use. Swapping a palette therefore needs
 * no component or stylesheet changes.
 *
 * Contrast notes for the default palette (WCAG AA body text needs 4.5:1):
 * - text, primary, secondary: pass on background and surface.
 * - textMuted (#5F6974): 5.12:1 on background, 4.52:1 on surface.
 * - accent: 2.6:1 on background, 2.3:1 on surface; decorative only there
 *   (rules, icons). It passes as text on primary (5.5:1).
 */
export function getBrandCssVariables(palette: BrandPalette): CSSProperties {
  return {
    "--brand-primary": palette.primary,
    "--brand-secondary": palette.secondary,
    "--brand-background": palette.background,
    "--brand-surface": palette.surface,
    "--brand-text": palette.text,
    "--brand-text-muted": palette.textMuted,
    "--brand-accent": palette.accent,
    "--brand-accent-alt": palette.accentAlt ?? palette.secondary,
  } as CSSProperties;
}
