import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils/cn";
import type { AcademicsPageContent } from "@/types/school";

interface AcademicProgrammesProps {
  data: AcademicsPageContent["programmes"];
}

/**
 * The school's stages as a progression on the dark band (#programmes): a
 * rule runs through them with a brass marker at each stage, horizontal from
 * desktop (up to four across) and vertical on phones and tablets. Any number
 * of stages and any naming; ranges and emphases show only when supplied.
 *
 * With no stages yet, a short pending message stands in for the list.
 * Optional areas of learning follow as a quiet typographic list.
 */
export function AcademicProgrammes({ data }: AcademicProgrammesProps) {
  const { eyebrow, title, description, stages, pendingMessage, subjects, note } = data;
  const across = stages.length <= 4;

  return (
    <Section id="programmes" aria-labelledby="programmes-title" tone="inverse">
      <Container width="wide">
        <div className="grid-editorial items-end gap-y-lg">
          <Reveal preset="stagger" target="children" className="col-span-12 flex flex-col gap-lg lg:col-span-6">
            {eyebrow && (
              <p className="type-label flex items-center gap-sm text-text-muted">
                <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
                {eyebrow}
              </p>
            )}
            <h2 id="programmes-title" className="type-h2 max-w-[18ch]">
              {title}
            </h2>
          </Reveal>
          {description && (
            <Reveal preset="fadeUp" className="col-span-12 lg:col-span-5 lg:col-start-8">
              <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>
            </Reveal>
          )}
        </div>

        {stages.length > 0 ? (
          <Reveal
            as="ol"
            preset="stagger"
            target="children"
            className={cn(
              "mt-2xl grid gap-x-grid lg:mt-section-sm",
              across ? "lg:auto-cols-fr lg:grid-flow-col" : "lg:grid-cols-3 lg:gap-y-2xl",
            )}
          >
            {stages.map((stage, index) => (
              <li
                key={stage.id}
                className={cn(
                  "relative flex flex-col gap-sm border-l border-border pb-xl pl-lg last:pb-0",
                  "lg:border-t lg:border-l-0 lg:pt-xl lg:pb-0 lg:pl-0",
                )}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 -left-[5px] size-[9px] rounded-full bg-accent lg:-top-[5px] lg:left-0"
                />
                <span aria-hidden="true" className="type-label -mt-[3px] text-text-muted tabular-nums lg:mt-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="type-h3">{stage.name}</h3>
                {stage.range && <p className="type-label text-accent">{stage.range}</p>}
                <p className="type-body max-w-narrow text-text-muted">{stage.summary}</p>
                {stage.focus && stage.focus.length > 0 && (
                  <ul className="mt-xs flex flex-col gap-2xs">
                    {stage.focus.map((item) => (
                      <li key={item} className="type-body-sm flex items-baseline gap-sm">
                        <span aria-hidden="true" className="h-px w-sm shrink-0 translate-y-[-0.25em] bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </Reveal>
        ) : (
          pendingMessage && (
            <p className="type-body-lg mt-2xl max-w-narrow border-t border-border pt-xl text-text-muted lg:mt-section-sm">
              {pendingMessage}
            </p>
          )
        )}

        {subjects && subjects.items.length > 0 && (
          <div className="grid-editorial mt-2xl gap-y-md border-t border-border pt-xl lg:mt-section-sm">
            <h3 className="type-label col-span-12 text-text-muted lg:col-span-3">{subjects.title}</h3>
            <Reveal
              as="ul"
              preset="stagger"
              target="children"
              className="col-span-12 flex flex-wrap gap-x-xl gap-y-sm lg:col-span-9"
            >
              {subjects.items.map((item) => (
                <li key={item} className="type-h3">
                  {item}
                </li>
              ))}
            </Reveal>
          </div>
        )}

        {note && <p className="type-meta mt-2xl text-text-muted">{note}</p>}
      </Container>
    </Section>
  );
}
