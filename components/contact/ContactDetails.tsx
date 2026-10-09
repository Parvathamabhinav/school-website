import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TextLink } from "@/components/ui/TextLink";
import type { ContactPageContent, SchoolContact, SchoolLocation, SocialLink, SocialPlatform } from "@/types/school";
import { telHref } from "@/lib/utils/tel";

const platformNames: Record<SocialPlatform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  x: "X",
};

interface ContactDetailsProps {
  data: ContactPageContent["details"];
  contact: SchoolContact;
  location: SchoolLocation;
  socialLinks: SocialLink[];
}

/**
 * The school's contact details as an editorial directory: one column per
 * way of getting in touch, separated by hairlines. Every entry is optional
 * and disappears when its data is missing.
 *
 * - The directions link appears only when `location.mapUrl` is configured
 *   (a verified address); it is never generated from the address.
 * - Admissions has its own entry, pointing to its own email or form.
 *
 * Columns: four from desktop, two on tablets, stacked on phones.
 */
export function ContactDetails({ data, contact, location, socialLinks }: ContactDetailsProps) {
  const { title, labels, directionsLabel, admissionsLink } = data;
  const addressLines = [
    location.streetAddress,
    [location.locality, location.region, location.postalCode].filter(Boolean).join(", "),
    location.country,
  ].filter(Boolean);
  const hasAdmissions = Boolean(admissionsLink || contact.admissionsEmail);

  return (
    <Section spacing="none" aria-labelledby="contact-details-title" className="pb-section-md">
      <Container width="wide">
        <h2 id="contact-details-title" className="sr-only">
          {title}
        </h2>
        <Reveal as="dl" preset="stagger" target="children" className="grid-editorial border-t border-border">
          {addressLines.length > 0 && (
            <Entry label={labels.address}>
              <address className="type-body-lg not-italic">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              {location.mapUrl && (
                <TextLink href={location.mapUrl} variant="underline" external className="type-body-sm mt-md font-medium">
                  {directionsLabel}
                </TextLink>
              )}
            </Entry>
          )}

          {contact.phone && (
            <Entry label={labels.phone}>
              <TextLink href={telHref(contact.phone)} variant="reveal" className="type-h4">
                {contact.phone}
              </TextLink>
              {contact.officeHours && (
                <p className="type-body-sm mt-sm text-text-muted">
                  <span className="font-medium text-text">{labels.hours}: </span>
                  {contact.officeHours}
                </p>
              )}
            </Entry>
          )}

          {contact.email && (
            <Entry label={labels.email}>
              <TextLink href={`mailto:${contact.email}`} variant="reveal" className="type-h4 [overflow-wrap:anywhere]">
                {contact.email}
              </TextLink>
            </Entry>
          )}

          {hasAdmissions && (
            <Entry label={labels.admissions}>
              {contact.admissionsEmail && (
                <TextLink
                  href={`mailto:${contact.admissionsEmail}`}
                  variant="reveal"
                  className="type-h4 [overflow-wrap:anywhere]"
                >
                  {contact.admissionsEmail}
                </TextLink>
              )}
              {admissionsLink && (
                <TextLink
                  href={admissionsLink.href}
                  variant="underline"
                  className={contact.admissionsEmail ? "type-body-sm mt-md font-medium" : "type-body-lg"}
                >
                  {admissionsLink.label}
                </TextLink>
              )}
            </Entry>
          )}

          {socialLinks.length > 0 && (
            <Entry label={labels.social}>
              <ul className="flex flex-wrap gap-x-lg gap-y-xs">
                {socialLinks.map((link) => (
                  <li key={link.url}>
                    <TextLink href={link.url} variant="reveal" external className="type-body-lg">
                      {platformNames[link.platform]}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </Entry>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}

function Entry({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="col-span-12 flex flex-col items-start border-b border-border py-lg md:col-span-6 md:pr-lg lg:col-span-3 lg:border-b-0 lg:py-xl">
      <dt className="type-label text-text-muted">{label}</dt>
      <dd className="mt-sm flex flex-col items-start">{children}</dd>
    </div>
  );
}
