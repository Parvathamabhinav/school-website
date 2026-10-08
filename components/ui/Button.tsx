import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

const variants = {
  /** The single most important action in a region. */
  primary:
    "rounded-xs bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active disabled:bg-disabled disabled:text-on-disabled",
  /** Alternative actions alongside a primary. */
  secondary:
    "rounded-xs border border-border-strong text-text hover:border-text hover:bg-overlay-hover active:bg-overlay-active disabled:border-border disabled:bg-transparent disabled:text-on-disabled",
  /** Low-emphasis actions in dense UI (filters, toolbars). */
  ghost:
    "rounded-xs text-text hover:bg-overlay-hover active:bg-overlay-active disabled:bg-transparent disabled:text-on-disabled",
  /** Reads as an underlined text action. */
  text: "link-underline text-text disabled:text-on-disabled",
} as const;

const sizes = {
  sm: "min-h-10 px-md",
  md: "min-h-12 px-lg",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/** Shared by <Button> and <ButtonLink> so both stay visually identical. */
export function buttonStyles({ variant = "primary", size = "md", className }: ButtonStyleOptions = {}) {
  return cn(
    "group type-body-sm inline-flex items-center justify-center gap-xs font-medium whitespace-nowrap motion-colors disabled:cursor-not-allowed",
    variant === "text" ? "min-h-10" : sizes[size],
    variants[variant],
    className,
  );
}

interface ButtonContentProps {
  children: ReactNode;
  /** Optional trailing icon (e.g. a Lucide arrow); nudges forward on hover. */
  icon?: ReactNode;
}

function ButtonContent({ children, icon }: ButtonContentProps) {
  return (
    <>
      <span>{children}</span>
      {icon && (
        <span className="motion-transform group-hover:translate-x-2xs group-disabled:translate-x-0">
          {icon}
        </span>
      )}
    </>
  );
}

type ButtonProps = ButtonStyleOptions &
  ButtonContentProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

/** An action on the current page (submit, open, toggle). */
export function Button({ variant, size, className, icon, children, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={buttonStyles({ variant, size, className })} {...props}>
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </button>
  );
}

type ButtonLinkProps = ButtonStyleOptions &
  ButtonContentProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children">;

/**
 * Navigation styled as a button. Links cannot be disabled; render plain
 * text or a disabled <Button> instead.
 */
export function ButtonLink({ variant, size, className, icon, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props}>
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </Link>
  );
}
