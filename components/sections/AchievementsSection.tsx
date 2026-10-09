import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import type { AchievementsContent } from "@/types/school";
import { AchievementItem, achievementMeta } from "./AchievementItem";
import { AchievementsExplorer } from "./AchievementsExplorer";

interface AchievementsSectionProps {
  data: AchievementsContent;
}

/**
 * "Proof of excellence", composed like an annual report: a masthead-style
 * introduction, then a lead photograph beside a ledger of achievements.
 *
 * - Desktop (lg+): AchievementsExplorer, the only client code here. The
 *   photograph sits left and stays in view while the ledger is read.
 * - Below lg: lead photograph, then each achievement with its own
 *   photograph in the flow.
 *
 * Each layout is display:none at the other's breakpoints, so it is absent
 * from the accessibility tree and its lazy images never load there.
 */
export function AchievementsSection({ data }: AchievementsSectionProps) {
  const { eyebrow, title, description, media, items } = data;
  const headingId = "achievements-title";
  const numberOf = (index: number) => String(index + 1).padStart(2, "0");

  return (
    <Section aria-labelledby={headingId} className="overflow-x-clip">
      <Container width="wide">
        <Reveal preset="stagger" target="children" className="grid-editorial items-end gap-y-lg">
          {eyebrow && (
            <p className="type-label col-span-12 flex items-center gap-sm text-text-muted">
              <span aria-hidden="true" className="h-px w-lg shrink-0 bg-accent" />
              {eyebrow}
            </p>
          )}
          <h2 id={headingId} className="type-h1 col-span-12 lg:col-span-7">
            {title}
          </h2>
          {description && (
            <p className="type-body-lg col-span-12 max-w-narrow text-text-muted lg:col-span-4 lg:col-start-9">
              {description}
            </p>
          )}
        </Reveal>

        <div className="mt-2xl lg:mt-section-sm">
          <AchievementsExplorer
            labelledBy={headingId}
            items={items.map(({ id, category, title, description, result, year }, index) => ({
              id,
              number: numberOf(index),
              category,
              title,
              description,
              meta: achievementMeta({ result, year }),
            }))}
            media={items.map((item) => {
              const itemMedia = item.media ?? media;
              return (
                <ResponsiveImage
                  key={item.id}
                  image={itemMedia.image}
                  sizes="feature"
                  aspectRatio="landscape"
                  className="h-full"
                  objectPosition={itemMedia.focalPoint}
                />
              );
            })}
          />

          <div className="lg:hidden">
            <Reveal preset="imageReveal" className="-mx-gutter md:mx-0">
              <ResponsiveImage
                image={media.image}
                mobileImage={media.mobileImage}
                sizes="wide"
                aspectRatio="landscape"
                objectPosition={media.focalPoint}
                mobileObjectPosition={media.mobileFocalPoint}
              />
            </Reveal>
            <ol className="mt-2xl flex flex-col gap-2xl">
              {items.map((item, index) => (
                <li key={item.id}>
                  {/* The lead photograph is already shown above; items reuse it only on desktop. */}
                  <AchievementItem item={item} number={numberOf(index)} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
