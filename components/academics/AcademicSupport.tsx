import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { AcademicsPageContent } from "@/types/school";

interface AcademicSupportProps {
  data: NonNullable<AcademicsPageContent["support"]>;
}

/**
 * Assessment and student support: a heading beside a two-column list of
 * short entries. Rendered only when the school supplies verified details.
 */
export function AcademicSupport({ data }: AcademicSupportProps) {
  const { eyebrow, title, items } = data;

  return (
    <Section aria-labelledby="support-title" className="border-t border-border-subtle">
      <Container width="wide">
        <div className="grid-editorial gap-y-2xl">
          <Reveal preset="stagger" target="children" className="col-span-12 flex flex-col gap-lg lg:col-span-4">
            {eyebrow && (
              <p className="type-label flex items-center gap-sm text-text-muted">
                <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
                {eyebrow}
              </p>
            )}
            <h2 id="support-title" className="type-h2">
              {title}
            </h2>
          </Reveal>

          <Reveal
            as="ul"
            preset="stagger"
            target="children"
            className="col-span-12 grid gap-x-grid gap-y-xl md:grid-cols-2 lg:col-span-7 lg:col-start-6"
          >
            {items.map((item) => (
              <li key={item.id} className="flex flex-col gap-xs border-t border-border pt-lg">
                <h3 className="type-h4">{item.title}</h3>
                <p className="type-body max-w-narrow text-text-muted">{item.description}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
