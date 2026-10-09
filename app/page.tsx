import { Hero } from "@/components/hero/Hero";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { CampusSection } from "@/components/sections/CampusSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { LearningSection } from "@/components/sections/LearningSection";
import { SchoolStorySection } from "@/components/sections/SchoolStorySection";
import { school } from "@/data/school";

export default function HomePage() {
  return (
    <main id={MAIN_CONTENT_ID}>
      <Hero data={school.hero} />
      {school.impact && <ImpactSection data={school.impact} />}
      {school.story && <SchoolStorySection data={school.story} />}
      {school.learning && <LearningSection data={school.learning} />}
      {school.campus && <CampusSection data={school.campus} />}
    </main>
  );
}
