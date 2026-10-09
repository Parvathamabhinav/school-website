import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { cn } from "@/lib/utils/cn";
import type { AchievementItem as AchievementItemData } from "@/types/school";

interface AchievementItemProps {
  item: AchievementItemData;
  number: string;
}

/** Result and year as one quiet line of metadata. */
export function achievementMeta({ result, year }: Pick<AchievementItemData, "result" | "year">) {
  return [result, year].filter(Boolean).join(" · ");
}

/**
 * One achievement as a stand-alone ledger entry, used below the desktop
 * breakpoint: all text visible, and its own photograph (if any) in the flow.
 *
 * - Phones: text, then the photograph.
 * - Tablets: text and photograph side by side.
 */
export function AchievementItem({ item, number }: AchievementItemProps) {
  const { category, title, description, media } = item;
  const meta = achievementMeta(item);

  return (
    <Reveal preset="stagger" target="children" className="grid-editorial gap-y-lg border-t border-border pt-lg">
      <div className={cn("col-span-12 flex flex-col gap-xs", media ? "md:col-span-6" : "md:col-span-8")}>
        <p className="type-label flex gap-md text-text-muted">
          <span className="tabular-nums">{number}</span>
          <span>{category}</span>
        </p>
        <h3 className="type-h3">{title}</h3>
        {description && <p className="type-body text-text-muted">{description}</p>}
        {meta && <p className="type-meta">{meta}</p>}
      </div>
      {media && (
        <div className="col-span-12 md:col-span-6">
          <ResponsiveImage
            image={media.image}
            mobileImage={media.mobileImage}
            sizes="half"
            aspectRatio="landscape"
            objectPosition={media.focalPoint}
            mobileObjectPosition={media.mobileFocalPoint}
          />
        </div>
      )}
    </Reveal>
  );
}
