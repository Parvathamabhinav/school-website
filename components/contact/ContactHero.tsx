import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TextLink } from "@/components/ui/TextLink";
import type { ContactPageContent } from "@/types/school";

interface ContactHeroProps {
  data: ContactPageContent["hero"];
}

/**
 * Contact page opening: type only. A short, display-size statement with the
 * description and one quiet link beside it. No photograph: on a page whose
 * job is to be practical, the contact details directly below are the
 * visual focus.
 */
export function ContactHero({ data }: ContactHeroProps) {
  const { eyebrow, title, description, action } = data;

  return (
    <Section spacing="none" aria-labelledby="contact-title" className="pt-section-sm pb-section-sm">
      <Container width="wide">
        <Reveal preset="stagger" target="children" className="grid-editorial items-end gap-y-lg">
          {eyebrow && (
            <p className="type-label col-span-12 flex items-center gap-sm text-text-muted">
              <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
              {eyebrow}
            </p>
          )}
          <h1 id="contact-title" className="type-display col-span-12 max-w-[12ch] lg:col-span-7">
            {title}
          </h1>
          {(description || action) && (
            <div className="col-span-12 flex max-w-narrow flex-col items-start gap-lg lg:col-span-4 lg:col-start-9">
              {description && <p className="type-body-lg text-text-muted">{description}</p>}
              {action && (
                <TextLink href={action.href} variant="underline" className="type-body-sm font-medium">
                  {action.label}
                </TextLink>
              )}
            </div>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
