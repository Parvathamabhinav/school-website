import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TextLink } from "@/components/ui/TextLink";
import type { CampusPageContent } from "@/types/school";

interface CampusPracticalProps {
  data: NonNullable<CampusPageContent["practical"]>;
}

/**
 * Practical information (accessibility, visiting and similar): a heading and
 * optional link beside a hairline list. Rendered only when the school
 * supplies it.
 */
export function CampusPractical({ data }: CampusPracticalProps) {
  const { eyebrow, title, items, action } = data;

  return (
    <Section aria-labelledby="campus-practical-title">
      <Container width="wide">
        <div className="grid-editorial gap-y-2xl">
          <Reveal preset="stagger" target="children" className="col-span-12 flex flex-col items-start gap-lg lg:col-span-4">
            {eyebrow && (
              <p className="type-label flex items-center gap-sm text-text-muted">
                <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
                {eyebrow}
              </p>
            )}
            <h2 id="campus-practical-title" className="type-h2">
              {title}
            </h2>
            {/* Wrapped so the reveal never animates the link's own opacity transition. */}
            {action && (
              <div>
                <TextLink href={action.href} variant="underline" className="type-body-sm font-medium">
                  {action.label}
                </TextLink>
              </div>
            )}
          </Reveal>

          <Reveal as="dl" preset="stagger" target="children" className="col-span-12 border-b border-border lg:col-span-7 lg:col-start-6">
            {items.map((item) => (
              <div key={item.id} className="grid gap-x-grid gap-y-xs border-t border-border py-lg md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <dt className="type-h4">{item.title}</dt>
                <dd className="type-body max-w-narrow text-text-muted">{item.description}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
