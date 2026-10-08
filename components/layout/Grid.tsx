import { Children, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface EditorialGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

/**
 * 12-column grid. Children place themselves with col-span / col-start
 * utilities, e.g. `col-span-12 lg:col-span-7 lg:col-start-6`.
 */
export function EditorialGrid({ className, ...props }: EditorialGridProps) {
  return <div className={cn("grid-editorial gap-y-xl", className)} {...props} />;
}

/**
 * Asymmetric two-column ratios on the 12-column grid.
 *
 * Responsive rules: the narrower the small column, the later the split
 * opens, so it is never too cramped to hold a heading.
 * - 6/6, 5/7, 7/5: side by side from tablet (md, 768px)
 * - 4/8, 8/4:      from desktop (lg, 1024px)
 * - 3/9, 9/3:      from large desktop (xl, 1280px)
 * Below that, both columns stack at full width.
 */
const ratios = {
  "6/6": ["md:col-span-6", "md:col-span-6"],
  "5/7": ["md:col-span-5", "md:col-span-7"],
  "7/5": ["md:col-span-7", "md:col-span-5"],
  "4/8": ["lg:col-span-4", "lg:col-span-8"],
  "8/4": ["lg:col-span-8", "lg:col-span-4"],
  "3/9": ["xl:col-span-3", "xl:col-span-9"],
  "9/3": ["xl:col-span-9", "xl:col-span-3"],
} as const;

export type SplitRatio = keyof typeof ratios;

const alignments = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
} as const;

interface SplitProps {
  /** Exactly two children: the first and second column. */
  children: [ReactNode, ReactNode];
  ratio?: SplitRatio;
  align?: keyof typeof alignments;
  className?: string;
}

export function Split({ children, ratio = "6/6", align = "start", className }: SplitProps) {
  const [first, second] = Children.toArray(children);
  const [firstSpan, secondSpan] = ratios[ratio];

  return (
    <EditorialGrid className={cn(alignments[align], className)}>
      <div className={cn("col-span-12", firstSpan)}>{first}</div>
      <div className={cn("col-span-12", secondSpan)}>{second}</div>
    </EditorialGrid>
  );
}
