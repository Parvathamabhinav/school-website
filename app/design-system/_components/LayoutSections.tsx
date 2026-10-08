import type { ReactNode } from "react";
import { Container, type ContainerWidth } from "@/components/layout/Container";
import { EditorialGrid, Split, type SplitRatio } from "@/components/layout/Grid";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { placeholderLandscape, sampleCopy } from "../_lib/samples";
import { ShowcaseSection, Specimen } from "./ShowcaseSection";

const containers: { width: ContainerWidth; note: string }[] = [
  { width: "narrow", note: "max 672px: long-form reading" },
  { width: "content", note: "max 1216px: the default column" },
  { width: "wide", note: "max 1440px: large imagery" },
  { width: "full", note: "viewport, keeps the gutter" },
  { width: "bleed", note: "edge to edge, no gutter" },
];

export function ContainersSection() {
  return (
    <ShowcaseSection
      id="containers"
      index={4}
      title="Containers"
      description="Every region sits in a Container. Widths are capped and the gutter scales with the viewport, so edges line up at every breakpoint."
      after={
        <div className="flex flex-col gap-xs">
          {containers.map(({ width, note }) => (
            <Container key={width} width={width}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-md bg-surface px-md py-sm">
                <code className="type-body-sm font-medium">width=&quot;{width}&quot;</code>
                <span className="type-meta">{note}</span>
              </div>
            </Container>
          ))}
        </div>
      }
    >
      <p className="type-body max-w-narrow text-text-muted">
        Resize the window: narrow, content and wide stop growing at their caps, while the page gutter grows from 20px on
        phones to 48px on desktop.
      </p>
    </ShowcaseSection>
  );
}

function Block({ children }: { children: ReactNode }) {
  return (
    <div className="type-meta flex min-h-24 items-end border-t border-border-strong bg-surface-muted p-sm">{children}</div>
  );
}

const splits: { ratio: SplitRatio; note: string }[] = [
  { ratio: "6/6", note: "side by side from tablet" },
  { ratio: "5/7", note: "side by side from tablet" },
  { ratio: "4/8", note: "side by side from desktop" },
  { ratio: "3/9", note: "side by side from large desktop" },
];

export function GridSection() {
  return (
    <ShowcaseSection
      id="grid"
      index={5}
      title="Editorial grid"
      description="A 12-column grid with fluid gaps. Splits stack on phones and open up as space allows: the narrower the small column, the later it opens, so it is never too cramped for a heading."
      after={
        <Container className="flex flex-col gap-2xl">
          <Specimen title="12 columns">
            <EditorialGrid>
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="type-meta col-span-1 flex h-16 items-end justify-center bg-surface pb-xs">
                  {i + 1}
                </div>
              ))}
            </EditorialGrid>
          </Specimen>

          <Specimen title="Asymmetric splits">
            <div className="flex flex-col gap-lg">
              {splits.map(({ ratio, note }) => (
                <Split key={ratio} ratio={ratio} className="gap-y-xs">
                  <Block>{ratio.split("/")[0]} columns</Block>
                  <Block>
                    {ratio.split("/")[1]} columns · {note}
                  </Block>
                </Split>
              ))}
            </div>
          </Specimen>

          <Specimen title="In composition: offset asymmetric layout">
            <EditorialGrid className="items-end">
              <div className="col-span-12 flex flex-col gap-md md:col-span-5 lg:col-span-4">
                <p className="type-label text-text-muted">Campus</p>
                <p className="type-h3">Space to think, and room to grow.</p>
                <p className="type-body-sm text-text-muted">{sampleCopy.body}</p>
              </div>
              <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6">
                <ResponsiveImage image={placeholderLandscape} sizes="half" aspectRatio="landscape" />
              </div>
            </EditorialGrid>
          </Specimen>
        </Container>
      }
    >
      <p className="type-body max-w-narrow text-text-muted">
        Use the Split component for two-column ratios, or place children on EditorialGrid directly with col-span and
        col-start for offsets and overlaps.
      </p>
    </ShowcaseSection>
  );
}
