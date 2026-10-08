import { Fragment } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils/cn";
import type { ImpactContent } from "@/types/school";
import { ImpactStat } from "./ImpactStat";

// Columns per number of figures, so 2, 3 or 4 always fill the row evenly.
// Four sit 2 × 2 on tablets, where four columns would crowd the numbers.
const columns: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

interface ImpactSectionProps {
  data: ImpactContent;
}

/**
 * The step from aspiration to evidence: an editorial statement, then a few
 * figures given room to carry their own weight. No cards, only hairlines.
 *
 * Desktop: eyebrow in a narrow label column, statement across the rest, and
 * the figures as an even row of ruled columns beneath.
 */
export function ImpactSection({ data }: ImpactSectionProps) {
  const { eyebrow, statement, stats, note } = data;

  return (
    <Section aria-labelledby="impact-title">
      <Container width="wide">
        {/* Baseline-aligned so the eyebrow sits on the statement's first line at any size. */}
        <Reveal preset="stagger" target="children" className="grid-editorial items-baseline gap-y-md">
          {eyebrow && (
            <p className="type-label col-span-12 flex items-baseline gap-sm text-text-muted lg:col-span-3">
              <span aria-hidden="true" className="h-px w-lg shrink-0 self-center bg-accent" />
              {eyebrow}
            </p>
          )}
          <h2 id="impact-title" className="type-h2 col-span-12 lg:col-span-8 lg:col-start-4">
            {statement.map((part, index) => (
              <Fragment key={part}>
                {index > 0 && " "}
                <span className={index > 0 ? "text-text-muted" : undefined}>{part}</span>
              </Fragment>
            ))}
          </h2>
        </Reveal>

        <Reveal
          as="dl"
          preset="stagger"
          target="children"
          className={cn(
            "mt-2xl grid border-b border-border md:gap-x-grid md:gap-y-xl md:border-b-0 lg:mt-section-sm",
            columns[stats.length] ?? "md:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {stats.map((stat) => (
            <ImpactStat key={stat.label} {...stat} />
          ))}
        </Reveal>

        {note && <p className="type-meta mt-lg md:mt-xl">{note}</p>}
      </Container>
    </Section>
  );
}
