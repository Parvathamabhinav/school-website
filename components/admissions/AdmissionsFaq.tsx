import { Plus } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { AdmissionsFaqContent } from "@/types/school";

interface AdmissionsFaqProps {
  data: AdmissionsFaqContent;
}

/**
 * Frequently asked questions as native disclosure widgets (<details>): no
 * JavaScript, keyboard operable, and the browser exposes each question's
 * expanded or collapsed state to assistive technology. Answers stay
 * findable with in-page search even while closed.
 */
export function AdmissionsFaq({ data }: AdmissionsFaqProps) {
  const { eyebrow, title, items, note } = data;

  return (
    <Section aria-labelledby="faq-title">
      <Container width="wide">
        <div className="grid-editorial gap-y-2xl">
          <Reveal preset="stagger" target="children" className="col-span-12 flex flex-col gap-lg lg:col-span-4">
            {eyebrow && (
              <p className="type-label flex items-center gap-sm text-text-muted">
                <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
                {eyebrow}
              </p>
            )}
            <h2 id="faq-title" className="type-h2">
              {title}
            </h2>
          </Reveal>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <Reveal preset="fadeUp" className="border-b border-border">
              {items.map((item) => (
                <details key={item.id} id={`faq-${item.id}`} className="group border-t border-border">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-lg py-lg motion-colors hover:text-text-muted [&::-webkit-details-marker]:hidden">
                    <span className="type-h4">{item.question}</span>
                    <Plus
                      aria-hidden="true"
                      className="mt-2xs size-5 shrink-0 text-text-muted motion-transform group-open:rotate-45"
                    />
                  </summary>
                  <p className="type-body max-w-narrow pb-lg text-text-muted">{item.answer}</p>
                </details>
              ))}
            </Reveal>
            {note && <p className="type-meta mt-lg text-text-muted">{note}</p>}
          </div>
        </div>
      </Container>
    </Section>
  );
}
