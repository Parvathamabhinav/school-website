import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

const widths = {
  /** Long-form reading (~70 characters per line). */
  narrow: "max-w-narrow px-gutter",
  /** Default page column. */
  content: "max-w-content px-gutter",
  /** Large imagery and wide editorial compositions. */
  wide: "max-w-wide px-gutter",
  /** Full viewport width, keeping the page gutter. */
  full: "px-gutter",
  /** Edge to edge, no gutter: full-bleed media. */
  bleed: "",
} as const;

export type ContainerWidth = keyof typeof widths;

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  width?: ContainerWidth;
}

/**
 * The standard horizontal layout primitive. Every page region sits in one,
 * so edges and maximum widths stay consistent at every breakpoint.
 */
export function Container({ width = "content", className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full", widths[width], className)} {...props} />;
}
