import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { AdmissionsProcessContent } from "@/types/school";

interface AdmissionsProcessProps {
  data: AdmissionsProcessContent;
}

/**
 * The admissions journey as a numbered sequence: an introduction beside an
 * ordered list of steps separated by hairlines. Any number of steps; the
 * optional note keeps illustrative content honest.
 */
export function AdmissionsProcess({ data }: AdmissionsProcessProps) {
  const { eyebrow, title, description, steps, note } = data;

  return (
    <Section id="process" aria-labelledby="process-title" className="border-t border-border-subtle">
      <Container width="wide">
        <div className="grid-editorial gap-y-2xl">
          <Reveal preset="stagger" target="children" className="col-span-12 flex flex-col gap-lg lg:col-span-4">
            {eyebrow && (
              <p className="type-label flex items-center gap-sm text-text-muted">
                <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
                {eyebrow}
              </p>
            )}
            <h2 id="process-title" className="type-h2">
              {title}
            </h2>
            {description && <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>}
          </Reveal>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <Reveal as="ol" preset="stagger" target="children" className="border-b border-border">
              {steps.map((step, index) => (
                <li
                  key={step.id}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-md border-t border-border py-lg md:grid-cols-[4rem_1fr]"
                >
                  <span aria-hidden="true" className="type-h3 text-accent tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-xs">
                    <h3 className="type-h4">{step.title}</h3>
                    <p className="type-body max-w-narrow text-text-muted">{step.description}</p>
                  </div>
                </li>
              ))}
            </Reveal>
            {note && <p className="type-meta mt-lg text-text-muted">{note}</p>}
          </div>
        </div>
      </Container>
    </Section>
  );
}
