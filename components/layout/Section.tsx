import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

const spacing = {
  sm: "py-section-sm",
  md: "py-section",
  lg: "py-section-lg",
  none: "",
} as const;

const tones = {
  default: "bg-background text-text",
  surface: "bg-surface text-text",
  muted: "bg-surface-muted text-text",
  primary: "bg-primary text-on-primary [--color-focus:var(--color-on-primary)]",
} as const;

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  spacing?: keyof typeof spacing;
  tone?: keyof typeof tones;
}

/** Page section with consistent vertical rhythm and a token-based tone. */
export function Section({
  spacing: space = "md",
  tone = "default",
  className,
  ...props
}: SectionProps) {
  return <section className={cn(spacing[space], tones[tone], className)} {...props} />;
}
