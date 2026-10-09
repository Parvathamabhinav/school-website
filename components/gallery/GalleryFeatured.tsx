import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { cn } from "@/lib/utils/cn";
import type { GalleryPageContent } from "@/types/school";

interface GalleryFeaturedProps {
  data: NonNullable<GalleryPageContent["featured"]>;
}

/**
 * The opening photographs. With two: a large landscape, and a portrait set
 * lower beside it (on phones, three-quarters wide on the right) so the pair
 * reads as one composition. With one: a single wide photograph.
 */
export function GalleryFeatured({ data }: GalleryFeaturedProps) {
  const [lead, second] = data;
  if (!lead) return null;

  return (
    <Section spacing="none" aria-label="Featured photographs" className="overflow-x-clip pb-section-md">
      <Container width="wide">
        <div className="grid-editorial items-start gap-y-xl">
          <figure className={cn("col-span-12", second && "md:col-span-8")}>
            <Reveal preset="imageReveal" className="-mx-gutter md:mx-0">
              <ResponsiveImage
                image={lead.media.image}
                mobileImage={lead.media.mobileImage}
                sizes={second ? "feature" : "wide"}
                aspectRatio="landscape"
                className={second ? undefined : "lg:aspect-cinematic"}
                objectPosition={lead.media.focalPoint}
                mobileObjectPosition={lead.media.mobileFocalPoint}
                priority
              />
            </Reveal>
            {lead.caption && <figcaption className="type-meta mt-sm text-text-muted">{lead.caption}</figcaption>}
          </figure>

          {second && (
            <figure className="col-span-9 col-start-4 md:col-span-4 md:col-start-9 md:mt-section-sm lg:mt-section-md">
              <Reveal preset="imageReveal">
                <ResponsiveImage
                  image={second.media.image}
                  mobileImage={second.media.mobileImage}
                  sizes="third"
                  aspectRatio="portrait"
                  objectPosition={second.media.focalPoint}
                  mobileObjectPosition={second.media.mobileFocalPoint}
                />
              </Reveal>
              {second.caption && <figcaption className="type-meta mt-sm text-text-muted">{second.caption}</figcaption>}
            </figure>
          )}
        </div>
      </Container>
    </Section>
  );
}
