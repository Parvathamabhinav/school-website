import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { GalleryItem, GalleryPageContent } from "@/types/school";
import { GalleryCollection } from "./GalleryCollection";

interface GallerySectionProps {
  data: GalleryPageContent["collection"];
  items: GalleryItem[];
}

/**
 * The collection (#collection): an introduction, then the interactive
 * gallery. Themes without photographs are dropped here, so neither the
 * filters nor the viewer ever offer an empty theme.
 */
export function GallerySection({ data, items }: GallerySectionProps) {
  const { eyebrow, title, description, categories, allLabel, filters = true, note } = data;
  const used = categories.filter((category) => items.some((item) => item.category === category.id));

  return (
    <Section id="collection" aria-labelledby="collection-title" tone="surface" className="overflow-x-clip">
      <Container width="wide">
        <Reveal preset="stagger" target="children" className="mb-2xl flex max-w-[44rem] flex-col gap-lg">
          {eyebrow && (
            <p className="type-label flex items-center gap-sm text-text-muted">
              <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
              {eyebrow}
            </p>
          )}
          <h2 id="collection-title" className="type-h2">
            {title}
          </h2>
          {description && <p className="type-body-lg max-w-narrow text-text-muted">{description}</p>}
        </Reveal>

        <GalleryCollection items={items} categories={used} allLabel={allLabel} showFilters={filters} />

        {note && <p className="type-meta mt-section-sm text-text-muted">{note}</p>}
      </Container>
    </Section>
  );
}
