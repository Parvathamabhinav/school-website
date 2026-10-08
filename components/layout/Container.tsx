import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

const widths = {
  narrow: "max-w-narrow",
  content: "max-w-content",
  wide: "max-w-wide",
  full: "max-w-none",
} as const;

interface ContainerProps {
  children: ReactNode;
  width?: keyof typeof widths;
  className?: string;
}

/** Horizontally centred content column with the responsive page gutter. */
export function Container({ children, width = "content", className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-gutter", widths[width], className)}>
      {children}
    </div>
  );
}
