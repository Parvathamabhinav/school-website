import { notFound } from "next/navigation";
import { GalleryClosing } from "@/components/gallery/GalleryClosing";
import { GalleryFeatured } from "@/components/gallery/GalleryFeatured";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GallerySection } from "@/components/gallery/GallerySection";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { school } from "@/data/school";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: school.galleryPage?.seo.title ?? "Gallery",
  description: school.galleryPage?.seo.description,
  path: "/gallery",
});

/**
 * Gallery: a typographic opening, featured photographs, the collection
 * (#collection: school.gallery, with theme filters and a viewer), and a
 * quiet next step. Statically rendered.
 */
export default function GalleryPage() {
  const data = school.galleryPage;
  if (!data || school.gallery.length === 0) notFound();

  return (
    <main id={MAIN_CONTENT_ID}>
      <GalleryHero data={data.hero} />
      {data.featured && data.featured.length > 0 && <GalleryFeatured data={data.featured} />}
      <GallerySection data={data.collection} items={school.gallery} />
      <GalleryClosing data={data.closing} />
    </main>
  );
}
