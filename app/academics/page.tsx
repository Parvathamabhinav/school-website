import { notFound } from "next/navigation";
import { AcademicPhilosophy } from "@/components/academics/AcademicPhilosophy";
import { AcademicProgrammes } from "@/components/academics/AcademicProgrammes";
import { AcademicsClosing } from "@/components/academics/AcademicsClosing";
import { AcademicsHero } from "@/components/academics/AcademicsHero";
import { AcademicSupport } from "@/components/academics/AcademicSupport";
import { LearningApproach } from "@/components/academics/LearningApproach";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { school } from "@/data/school";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: school.academics?.seo.title ?? "Academics",
  description: school.academics?.seo.description,
  path: "/academics",
});

/**
 * Academics: the learning philosophy, how students progress through the
 * school (#programmes), what learning looks like (#approach), verified
 * support details when supplied, and a next step. Statically rendered.
 */
export default function AcademicsPage() {
  const data = school.academics;
  if (!data) notFound();

  return (
    <main id={MAIN_CONTENT_ID}>
      <AcademicsHero data={data.hero} />
      <AcademicPhilosophy data={data.philosophy} />
      <AcademicProgrammes data={data.programmes} />
      <LearningApproach data={data.approach} />
      {data.support && <AcademicSupport data={data.support} />}
      <AcademicsClosing data={data.closing} />
    </main>
  );
}
