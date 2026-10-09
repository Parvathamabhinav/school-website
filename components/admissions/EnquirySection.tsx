import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TextLink } from "@/components/ui/TextLink";
import type { EnquiryContent, SchoolContact } from "@/types/school";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

interface EnquirySectionProps {
  data: EnquiryContent;
  contact: SchoolContact;
}

/**
 * The enquiry destination (#enquire, linked from the navbar, footer and
 * homepage). An introduction and the school's direct contact details beside
 * the form, which is the only client code on the page.
 */
export function EnquirySection({ data, contact }: EnquirySectionProps) {
  const { eyebrow, title, description, form } = data;
  const email = contact.admissionsEmail ?? contact.email;
  const phone = contact.phone;

  return (
    <Section id="enquire" aria-labelledby="enquire-title" tone="surface">
      <Container width="wide">
        <div className="grid-editorial gap-y-2xl">
          <div className="col-span-12 lg:col-span-4">
            <Reveal preset="stagger" target="children" className="flex flex-col gap-lg">
              {eyebrow && (
                <p className="type-label flex items-center gap-sm text-text-muted">
                  <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
                  {eyebrow}
                </p>
              )}
              <h2 id="enquire-title" className="type-h2">
                {title}
              </h2>
              {description && <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>}
            </Reveal>

            {(email || phone) && (
              <div className="mt-xl border-t border-border pt-lg">
                <h3 className="type-label text-text-muted">Prefer to talk?</h3>
                <address className="type-body mt-sm flex flex-col items-start gap-xs not-italic">
                  {email && (
                    <TextLink href={`mailto:${email}`} variant="reveal">
                      {email}
                    </TextLink>
                  )}
                  {phone && (
                    <TextLink href={`tel:${phone.replace(/\s+/g, "")}`} variant="reveal">
                      {phone}
                    </TextLink>
                  )}
                </address>
              </div>
            )}
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <EnquiryForm kind="admissions" content={form} contact={{ email, phone }} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
