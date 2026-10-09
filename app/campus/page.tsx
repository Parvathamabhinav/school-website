import { notFound } from "next/navigation";
import { CampusClosing } from "@/components/campus/CampusClosing";
import { CampusIntroduction } from "@/components/campus/CampusIntroduction";
import { CampusPageHero } from "@/components/campus/CampusPageHero";
import { CampusPractical } from "@/components/campus/CampusPractical";
import { CampusSpaces } from "@/components/campus/CampusSpaces";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { school } from "@/data/school";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: school.campusPage?.seo.title ?? "Campus",
  description: school.campusPage?.seo.description,
  path: "/campus",
});

/**
 * Campus: a full-bleed opening, a short introduction, the spaces (#spaces),
 * practical information when supplied, and a next step. Statically rendered.
 */
export default function CampusPage() {
  const data = school.campusPage;
  if (!data) notFound();

  return (
    <main id={MAIN_CONTENT_ID}>
      <CampusPageHero data={data.hero} />
      <CampusIntroduction data={data.introduction} />
      <CampusSpaces data={data.spaces} />
      {data.practical && <CampusPractical data={data.practical} />}
      <CampusClosing data={data.closing} />
    </main>
  );
}
