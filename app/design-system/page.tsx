import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Split } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { TextLink } from "@/components/ui/TextLink";
import { siteConfig } from "@/config/site";
import { ButtonsSection } from "./_components/ButtonsSection";
import { ColorSection } from "./_components/ColorSection";
import { ContainersSection, GridSection } from "./_components/LayoutSections";
import { LinksSection } from "./_components/LinksSection";
import { MediaSection } from "./_components/MediaSection";
import { MotionSection } from "./_components/MotionSection";
import { SpacingSection } from "./_components/SpacingSection";
import { BordersSection, RadiusSection } from "./_components/SurfaceSections";
import { TypographySection } from "./_components/TypographySection";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

const chapters = [
  { id: "color", title: "Colour" },
  { id: "typography", title: "Typography" },
  { id: "spacing", title: "Spacing" },
  { id: "containers", title: "Containers" },
  { id: "grid", title: "Editorial grid" },
  { id: "buttons", title: "Buttons" },
  { id: "links", title: "Links" },
  { id: "borders", title: "Borders and elevation" },
  { id: "radius", title: "Corner radius" },
  { id: "media", title: "Image ratios" },
  { id: "motion", title: "Motion" },
];

/**
 * Internal design-system showcase for development and visual QA.
 * Not linked from navigation, excluded from the sitemap, and noindex.
 */
export default function DesignSystemPage() {
  if (!siteConfig.features.designSystem) notFound();

  return (
    <main id={MAIN_CONTENT_ID}>
      <Section spacing="lg">
        <Container>
          <Split ratio="7/5" align="end" className="gap-y-2xl">
            <div className="flex flex-col gap-lg">
              <p className="type-label text-text-muted">Internal · Version 1</p>
              <h1 className="type-display">Design system</h1>
              <p className="type-body-lg max-w-narrow text-text-muted">
                The tokens and primitives every page is built from. If something here changes, it changes everywhere,
                which is the point.
              </p>
            </div>
            <nav aria-label="Design system contents">
              <ol className="grid grid-cols-2 gap-x-lg gap-y-xs border-t border-border pt-md md:grid-cols-1 lg:grid-cols-2">
                {chapters.map(({ id, title }, index) => (
                  <li key={id} className="type-body-sm flex items-baseline gap-sm">
                    <span className="type-meta tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                    <TextLink href={`#${id}`} variant="reveal">
                      {title}
                    </TextLink>
                  </li>
                ))}
              </ol>
            </nav>
          </Split>
        </Container>
      </Section>

      <ColorSection />
      <TypographySection />
      <SpacingSection />
      <ContainersSection />
      <GridSection />
      <ButtonsSection />
      <LinksSection />
      <BordersSection />
      <RadiusSection />
      <MediaSection />
      <MotionSection />
    </main>
  );
}
