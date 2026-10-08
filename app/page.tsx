import { Hero } from "@/components/hero/Hero";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { school } from "@/data/school";

export default function HomePage() {
  return (
    <main id={MAIN_CONTENT_ID}>
      <Hero data={school.hero} />
      {school.impact && <ImpactSection data={school.impact} />}
    </main>
  );
}
