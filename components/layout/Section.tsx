import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

const spacings = {
  sm: "py-section-sm",
  md: "py-section-md",
  lg: "py-section-lg",
  none: "",
} as const;

const tones = {
  default: "bg-background text-text",
  surface: "bg-surface text-text",
  muted: "bg-surface-muted text-text",
  /** Dark section: re-maps all semantic tokens (see theme-inverse). */
  inverse: "theme-inverse",
} as const;

export type SectionSpacing = keyof typeof spacings;
export type SectionTone = keyof typeof tones;

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  spacing?: SectionSpacing;
  tone?: SectionTone;
}

/** Page section with token-based vertical rhythm and surface tone. */
export function Section({ spacing = "md", tone = "default", className, ...props }: SectionProps) {
  return <section className={cn(spacings[spacing], tones[tone], className)} {...props} />;
}
