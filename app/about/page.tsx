import { notFound } from "next/navigation";
import { AboutClosing } from "@/components/about/AboutClosing";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutPhilosophy } from "@/components/about/AboutPhilosophy";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutValues } from "@/components/about/AboutValues";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { school } from "@/data/school";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: school.about?.seo.title ?? "About",
  description: school.about?.seo.description,
  path: "/about",
});

/**
 * About: who the school is (#story), how it approaches learning, what it
 * values, and a quiet next step. Statically rendered.
 */
export default function AboutPage() {
  const data = school.about;
  if (!data) notFound();

  return (
    <main id={MAIN_CONTENT_ID}>
      <AboutHero data={data.hero} />
      <AboutStory data={data.story} />
      <AboutPhilosophy data={data.philosophy} />
      <AboutValues data={data.values} />
      <AboutClosing data={data.closing} />
    </main>
  );
}
