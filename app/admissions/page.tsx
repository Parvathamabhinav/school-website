import { notFound } from "next/navigation";
import { AdmissionsFaq } from "@/components/admissions/AdmissionsFaq";
import { AdmissionsGuidance } from "@/components/admissions/AdmissionsGuidance";
import { AdmissionsHero } from "@/components/admissions/AdmissionsHero";
import { AdmissionsProcess } from "@/components/admissions/AdmissionsProcess";
import { EnquirySection } from "@/components/admissions/EnquirySection";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { school } from "@/data/school";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: school.admissions?.seo.title ?? "Admissions",
  description: school.admissions?.seo.description,
  path: "/admissions",
});

/**
 * Admissions: hero, the admissions journey, what parents need to know, FAQ
 * and the enquiry form (#enquire). Statically rendered; the form posts to a
 * server action (lib/enquiries).
 */
export default function AdmissionsPage() {
  const data = school.admissions;
  if (!data) notFound();

  return (
    <main id={MAIN_CONTENT_ID}>
      <AdmissionsHero data={data.hero} />
      <AdmissionsProcess data={data.process} />
      {data.guidance && <AdmissionsGuidance data={data.guidance} contact={school.contact} />}
      {data.faq && <AdmissionsFaq data={data.faq} />}
      <EnquirySection data={data.enquiry} contact={school.contact} />
    </main>
  );
}
