import { Container } from "@/components/layout/Container";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { aspectRatios, type AspectRatio } from "@/lib/media/presets";
import { placeholderLandscape, placeholderPortrait } from "../_lib/samples";
import { ShowcaseSection, Specimen } from "./ShowcaseSection";

const ratioUses: Record<AspectRatio, string> = {
  square: "Portraits, gallery tiles",
  portrait: "Faculty and student stories",
  landscape: "Campus and facilities",
  cinematic: "Atmospheric bands",
};

export function MediaSection() {
  return (
    <ShowcaseSection
      id="media"
      index={10}
      title="Image ratios"
      description="Four ratios cover the site. Images lazy-load, reserve their space before loading, carry alt text from data, and crop around a focal point when a ratio cuts them."
      after={
        <Container width="bleed">
          <figure>
            <ResponsiveImage image={placeholderLandscape} sizes="full" aspectRatio="cinematic" objectPosition="50% 70%" />
            {/* Content-column alignment applied directly: figcaption must be a direct child of figure. */}
            <figcaption className="type-meta mx-auto max-w-content px-gutter pt-sm">
              Full bleed: Container width=&quot;bleed&quot; · cinematic · sizes=&quot;full&quot;
            </figcaption>
          </figure>
        </Container>
      }
    >
      <Specimen title="Aspect ratios">
        <ul className="grid grid-cols-2 items-end gap-lg lg:grid-cols-4">
          {(Object.keys(aspectRatios) as AspectRatio[]).map((ratio) => (
            <li key={ratio} className="flex flex-col gap-sm">
              <ResponsiveImage
                image={ratio === "portrait" ? placeholderPortrait : placeholderLandscape}
                sizes="third"
                aspectRatio={ratio}
              />
              <span className="flex flex-col">
                <code className="type-body-sm font-medium">
                  {ratio} · {aspectRatios[ratio].label}
                </code>
                <span className="type-meta">{ratioUses[ratio]}</span>
              </span>
            </li>
          ))}
        </ul>
      </Specimen>

      <Specimen title="Editorial crops: one image, three focal points">
        <ul className="grid grid-cols-3 gap-md">
          {["0% 50%", "50% 50%", "85% 50%"].map((position) => (
            <li key={position} className="flex flex-col gap-sm">
              <ResponsiveImage image={placeholderLandscape} sizes="third" aspectRatio="portrait" objectPosition={position} />
              <code className="type-meta">{position}</code>
            </li>
          ))}
        </ul>
      </Specimen>
    </ShowcaseSection>
  );
}
