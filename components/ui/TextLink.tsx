import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

const variants = {
  /** Inside running text: always underlined, so it's identifiable without colour. */
  inline: "link-inline",
  /** Standalone links (lists, footers): underline draws in on hover/focus. */
  reveal: "link-reveal",
  /** Standalone call-to-action: underline at rest, redraws on hover. */
  underline: "link-underline",
} as const;

export type TextLinkVariant = keyof typeof variants;

interface TextLinkProps extends Omit<ComponentPropsWithoutRef<typeof Link>, "className"> {
  variant?: TextLinkVariant;
  /** Marks a link that leaves the site with an outward arrow. */
  external?: boolean;
  className?: string;
}

/**
 * The single text-link primitive. Underline behaviour lives in CSS utilities
 * (globals.css), driven by --link-line, so motion can be refined centrally.
 */
export function TextLink({ variant = "inline", external = false, className, children, ...props }: TextLinkProps) {
  return (
    <Link
      className={cn(
        variants[variant],
        variant !== "inline" && "inline-flex items-center gap-2xs",
        "motion-colors",
        className,
      )}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    >
      {children}
      {external && (
        <>
          <ArrowUpRight aria-hidden="true" className="size-[1em] shrink-0" />
          <span className="sr-only">(opens in a new tab)</span>
        </>
      )}
    </Link>
  );
}
