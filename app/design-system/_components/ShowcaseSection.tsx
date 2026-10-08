import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Split } from "@/components/layout/Grid";
import { Section, type SectionTone } from "@/components/layout/Section";

interface ShowcaseSectionProps {
  id: string;
  index: number;
  title: string;
  description: string;
  tone?: SectionTone;
  children: ReactNode;
  /** Content rendered below the 3/9 split, outside the content column. */
  after?: ReactNode;
}

/** One numbered chapter of the showcase, laid out on a 3/9 editorial split. */
export function ShowcaseSection({ id, index, title, description, tone, children, after }: ShowcaseSectionProps) {
  return (
    <Section id={id} tone={tone} className="border-t border-border-subtle">
      <Container>
        <Split ratio="3/9" align="stretch">
          <header className="flex flex-col gap-sm xl:sticky xl:top-xl">
            <p className="type-label flex items-center gap-sm text-text-muted">
              <span aria-hidden="true" className="h-px w-lg bg-accent" />
              {String(index).padStart(2, "0")}
            </p>
            <h2 className="type-h2">{title}</h2>
            <p className="type-body-sm max-w-narrow text-text-muted">{description}</p>
          </header>
          <div className="flex flex-col gap-2xl">{children}</div>
        </Split>
      </Container>
      {after && <div className="mt-2xl">{after}</div>}
    </Section>
  );
}

interface SpecimenProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/** A titled group inside a showcase section. */
export function Specimen({ title, children, className }: SpecimenProps) {
  return (
    <div className={className}>
      <h3 className="type-label mb-lg border-b border-border-subtle pb-sm text-text-muted">{title}</h3>
      {children}
    </div>
  );
}
