import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { TextLink } from "@/components/ui/TextLink";
import type { AdmissionsGuidanceContent, SchoolContact } from "@/types/school";

interface AdmissionsGuidanceProps {
  data: AdmissionsGuidanceContent;
  contact: SchoolContact;
}

/**
 * "What parents need to know". Deliberately concise: verified documents and
 * dates render only when the school supplies them; otherwise the section
 * points parents to the admissions team rather than inventing requirements.
 */
export function AdmissionsGuidance({ data, contact }: AdmissionsGuidanceProps) {
  const { eyebrow, title, description, documents, dates, media } = data;
  const email = contact.admissionsEmail ?? contact.email;

  return (
    <Section aria-labelledby="guidance-title" tone="muted" className="overflow-x-clip">
      <Container width="wide">
        <div className="grid-editorial items-center gap-y-2xl">
          {media && (
            <Reveal preset="imageReveal" className="col-span-12 -mx-gutter md:mx-0 lg:col-span-5">
              <ResponsiveImage
                image={media.image}
                mobileImage={media.mobileImage}
                sizes="aside"
                aspectRatio="landscape"
                className="lg:aspect-square"
                objectPosition={media.focalPoint}
                mobileObjectPosition={media.mobileFocalPoint}
              />
            </Reveal>
          )}

          <div className={media ? "col-span-12 lg:col-span-6 lg:col-start-7" : "col-span-12 lg:col-span-8"}>
            <Reveal preset="stagger" target="children" className="flex flex-col gap-lg">
              {eyebrow && (
                <p className="type-label flex items-center gap-sm text-text-muted">
                  <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
                  {eyebrow}
                </p>
              )}
              <h2 id="guidance-title" className="type-h2">
                {title}
              </h2>
              {description && <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>}
            </Reveal>

            {documents && documents.items.length > 0 && (
              <div className="mt-xl">
                <h3 className="type-h4">{documents.title}</h3>
                <ul className="type-body mt-sm flex list-disc flex-col gap-xs pl-lg text-text-muted">
                  {documents.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {dates && dates.items.length > 0 && (
              <div className="mt-xl">
                <h3 className="type-h4">{dates.title}</h3>
                <dl className="mt-sm border-b border-border">
                  {dates.items.map((item) => (
                    <div key={item.label} className="flex flex-wrap justify-between gap-x-lg gap-y-2xs border-t border-border py-sm">
                      <dt className="type-body">{item.label}</dt>
                      <dd className="type-body text-text-muted">{item.date}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="mt-xl border-t border-border pt-lg">
              <h3 className="type-label text-text-muted">Contact the admissions team</h3>
              <address className="type-body mt-sm flex flex-col items-start gap-xs not-italic">
                {email && (
                  <TextLink href={`mailto:${email}`} variant="reveal">
                    {email}
                  </TextLink>
                )}
                {contact.phone && (
                  <TextLink href={`tel:${contact.phone.replace(/\s+/g, "")}`} variant="reveal">
                    {contact.phone}
                  </TextLink>
                )}
                {contact.officeHours && <span className="type-body-sm text-text-muted">{contact.officeHours}</span>}
              </address>
              <TextLink href="#enquire" variant="underline" className="type-body-sm mt-lg font-medium">
                Or send an enquiry online
              </TextLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
