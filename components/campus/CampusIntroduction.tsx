import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { CampusPageContent } from "@/types/school";

interface CampusIntroductionProps {
  data: CampusPageContent["introduction"];
}

/**
 * A typographic pause after the full-bleed hero: a large statement, then the
 * narrative set further right, stepping down the page. No photograph here,
 * so the spaces that follow land with more scale.
 */
export function CampusIntroduction({ data }: CampusIntroductionProps) {
  const { eyebrow, title, paragraphs, note } = data;
  const [lead, ...rest] = paragraphs;

  return (
    <Section aria-labelledby="campus-intro-title" spacing="none" className="pb-section-md">
      <Container width="wide">
        <div className="grid-editorial gap-y-xl">
          <Reveal preset="stagger" target="children" className="col-span-12 flex flex-col gap-lg lg:col-span-9">
            {eyebrow && (
              <p className="type-label flex items-center gap-sm text-text-muted">
                <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
                {eyebrow}
              </p>
            )}
            <h2 id="campus-intro-title" className="type-h1 max-w-[20ch]">
              {title}
            </h2>
          </Reveal>

          <div className="col-span-12 md:col-span-10 md:col-start-3 lg:col-span-6 lg:col-start-6">
            <Reveal preset="stagger" target="children" className="flex flex-col gap-lg">
              {lead && <p className="type-body-lg max-w-narrow">{lead}</p>}
              {rest.map((paragraph) => (
                <p key={paragraph} className="type-body max-w-narrow text-text-muted">
                  {paragraph}
                </p>
              ))}
            </Reveal>
            {note && <p className="type-meta mt-xl text-text-muted">{note}</p>}
          </div>
        </div>
      </Container>
    </Section>
  );
}
