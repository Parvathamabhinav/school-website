import type { CSSProperties } from "react";
import { motionCssVariables } from "@/lib/animations/tokens";
import type { BrandPalette } from "@/types/school";

/**
 * Bridges data and TypeScript tokens to the CSS design system.
 *
 * The root layout applies the result as custom properties on <html>:
 * - `--brand-*` from the school's palette. app/globals.css maps them to
 *   semantic tokens (`--color-primary`, …), the only colours components may
 *   use. Swapping a palette needs no component or stylesheet changes.
 * - `--motion-*` from lib/animations/tokens.ts, so CSS transitions and GSAP
 *   share the same durations and curves.
 *
 * Contrast notes for the default palette (WCAG AA body text needs 4.5:1):
 * - text, primary, secondary: pass on background and surface.
 * - textMuted (#5F6974): 5.12:1 on background, 4.52:1 on surface.
 * - accent: 2.6:1 on background, 2.3:1 on surface; decorative only there
 *   (rules, icons). It passes as text on primary (5.5:1).
 */
export function getThemeCssVariables(palette: BrandPalette): CSSProperties {
  return {
    "--brand-primary": palette.primary,
    "--brand-secondary": palette.secondary,
    "--brand-background": palette.background,
    "--brand-surface": palette.surface,
    "--brand-text": palette.text,
    "--brand-text-muted": palette.textMuted,
    "--brand-accent": palette.accent,
    "--brand-accent-alt": palette.accentAlt ?? palette.secondary,
    ...motionCssVariables,
  } as CSSProperties;
}
