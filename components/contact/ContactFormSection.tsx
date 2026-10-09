import { Reveal } from "@/components/animations/Reveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TextLink } from "@/components/ui/TextLink";
import type { EnquiryContent, LinkAction, SchoolContact } from "@/types/school";

interface ContactFormSectionProps {
  data: EnquiryContent;
  contact: SchoolContact;
  /** Signposts admissions questions to their own form. */
  admissionsLink?: LinkAction;
}

/**
 * General enquiries (#message): an introduction beside the shared enquiry
 * form, posting as a "contact" enquiry so the provider can tell it apart
 * from admissions enquiries.
 */
export function ContactFormSection({ data, contact, admissionsLink }: ContactFormSectionProps) {
  const { eyebrow, title, description, form } = data;

  return (
    <Section id="message" aria-labelledby="message-title" tone="surface">
      <Container width="wide">
        <div className="grid-editorial gap-y-2xl">
          <Reveal preset="stagger" target="children" className="col-span-12 flex flex-col items-start gap-lg lg:col-span-4">
            {eyebrow && (
              <p className="type-label flex items-center gap-sm text-text-muted">
                <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
                {eyebrow}
              </p>
            )}
            <h2 id="message-title" className="type-h2">
              {title}
            </h2>
            {description && <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>}
            {/* Wrapped so the reveal never animates the link's own opacity transition. */}
            {admissionsLink && (
              <div>
                <TextLink href={admissionsLink.href} variant="underline" className="type-body-sm font-medium">
                  {admissionsLink.label}
                </TextLink>
              </div>
            )}
          </Reveal>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <EnquiryForm
              kind="contact"
              content={form}
              contact={{ email: contact.email, phone: contact.phone }}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
