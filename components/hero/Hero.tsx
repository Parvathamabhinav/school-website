import { ArrowRight } from "lucide-react";
import { Fragment } from "react";
import { Container } from "@/components/layout/Container";
import { EditorialGrid } from "@/components/layout/Grid";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import type { HeroContent } from "@/types/school";
import { HeroMedia } from "./HeroMedia";
import { HeroMotion } from "./HeroMotion";

interface HeroProps {
  data: HeroContent;
}

/**
 * Page-opening hero: an asymmetric editorial composition with the headline
 * as the centrepiece and a large media crop beside it.
 *
 * Layout:
 * - Phones: stacked (eyebrow, headline, statement, actions, square media).
 * - Tablets: stacked, media widens to a landscape crop under the text.
 * - Desktop (lg+): 7/5 split; text bottom-aligned with a portrait crop.
 *
 * Server Component: all content is in the HTML. HeroMotion (client) only
 * choreographs the entrance and scroll depth.
 */
export function Hero({ data }: HeroProps) {
  const { eyebrow, title, description, primaryAction, secondaryAction, media, meta } = data;

  return (
    <section aria-labelledby="hero-title" className="overflow-x-clip">
      <HeroMotion>
        <Container width="wide" className="pt-xl pb-lg md:pt-2xl lg:pt-xl">
          <EditorialGrid className="items-end">
            <div data-hero-content className="col-span-12 flex flex-col lg:col-span-7">
              {eyebrow && (
                <p data-hero-eyebrow data-motion-item className="type-label flex items-center gap-sm text-text-muted">
                  <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
                  {eyebrow}
                </p>
              )}

              {/* Each line is a block, separated by real spaces so the heading reads as one sentence. */}
              <h1 id="hero-title" className="type-display mt-lg lg:type-h1 xl:type-display">
                {title.map((line, index) => (
                  <Fragment key={line}>
                    {index > 0 && " "}
                    <span data-hero-line data-motion-item className="block">
                      {line}
                    </span>
                  </Fragment>
                ))}
              </h1>

              {description && (
                <p data-hero-description data-motion-item className="type-body-lg mt-lg max-w-narrow text-text-muted md:mt-xl">
                  {description}
                </p>
              )}

              {(primaryAction || secondaryAction) && (
                <div data-hero-actions data-motion-item className="mt-xl flex flex-wrap items-center gap-x-xl gap-y-md">
                  {primaryAction && (
                    <ButtonLink href={primaryAction.href} icon={<ArrowRight aria-hidden="true" className="size-4" />}>
                      {primaryAction.label}
                    </ButtonLink>
                  )}
                  {secondaryAction && (
                    <TextLink href={secondaryAction.href} variant="underline" className="type-body-sm font-medium">
                      {secondaryAction.label}
                    </TextLink>
                  )}
                </div>
              )}
            </div>

            {media && (
              <div className="col-span-12 mt-2xl lg:col-span-5 lg:col-start-8 lg:mt-0">
                <HeroMedia media={media} />
              </div>
            )}
          </EditorialGrid>

          {meta && meta.length > 0 && (
            <div
              data-hero-meta
              data-motion-item
              className="mt-xl flex items-center justify-between gap-lg border-t border-border-subtle pt-md"
            >
              <ul className="type-label flex flex-wrap gap-x-xl gap-y-xs text-text-muted">
                {meta.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ScrollCue />
            </div>
          )}
        </Container>
      </HeroMotion>
    </section>
  );
}

/** Decorative cue that more follows; hidden from assistive tech and on phones. */
function ScrollCue() {
  return (
    <div aria-hidden="true" className="type-label hidden items-center gap-sm text-text-muted md:flex">
      Scroll
      <span className="relative h-lg w-px overflow-hidden bg-border">
        <span className="absolute inset-0 bg-text motion-safe:animate-scroll-cue" />
      </span>
    </div>
  );
}
