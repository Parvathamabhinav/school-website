import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { AdmissionsCtaSection } from "@/components/sections/AdmissionsCtaSection";
import { CampusSection } from "@/components/sections/CampusSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { LearningSection } from "@/components/sections/LearningSection";
import { SchoolStorySection } from "@/components/sections/SchoolStorySection";
import { StudentLifeSection } from "@/components/sections/StudentLifeSection";
import { school } from "@/data/school";
import { rootMetadata } from "@/lib/seo/metadata";

/**
 * The title and description come from the root layout. Open Graph is
 * replaced, not merged, by a page's own, so it carries the root values.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...rootMetadata.openGraph, url: "/" },
};

export default function HomePage() {
  return (
    <main id={MAIN_CONTENT_ID}>
      <Hero data={school.hero} />
      {school.impact && <ImpactSection data={school.impact} />}
      {school.story && <SchoolStorySection data={school.story} />}
      {school.learning && <LearningSection data={school.learning} />}
      {school.campus && <CampusSection data={school.campus} />}
      {school.achievements && <AchievementsSection data={school.achievements} />}
      {school.studentLife && <StudentLifeSection data={school.studentLife} />}
      {school.admissionsCta && <AdmissionsCtaSection data={school.admissionsCta} />}
    </main>
  );
}
