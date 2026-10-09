import { notFound } from "next/navigation";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactHero } from "@/components/contact/ContactHero";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { school } from "@/data/school";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: school.contactPage?.seo.title ?? "Contact",
  description: school.contactPage?.seo.description,
  path: "/contact",
});

/**
 * Contact: an introduction, the school's contact details and a general
 * enquiry form (#message). Statically rendered; the form posts to a server
 * action (lib/enquiries).
 */
export default function ContactPage() {
  const data = school.contactPage;
  if (!data) notFound();

  return (
    <main id={MAIN_CONTENT_ID}>
      <ContactHero data={data.hero} />
      <ContactDetails
        data={data.details}
        contact={school.contact}
        location={school.location}
        socialLinks={school.socialLinks}
      />
      <ContactFormSection data={data.enquiry} contact={school.contact} admissionsLink={data.details.admissionsLink} />
    </main>
  );
}
