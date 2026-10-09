// Shared by the gallery components. Kept out of the "use client" module so
// it stays a plain function (see campus-layouts.ts for the same reason).
import type { AspectRatio, ImageSizes } from "@/lib/media/presets";

/**
 * Places in the collection's 12-column desktop grid. Each pairs a column span
 * with a crop; the spans in a row always add up to twelve.
 *
 * Phones show every photograph full width (portraits upright, the rest
 * landscape); tablets show two square-cropped columns, with each panorama
 * across both. Every row is a pair or a single panorama, so neither layout
 * leaves a gap mid-way.
 */
export const gallerySlots = {
  /** Eight columns, landscape: beside a portrait. */
  wide: { item: "md:col-span-6 lg:col-span-8", aspectRatio: "landscape", aspect: "md:aspect-square lg:aspect-landscape", sizes: "feature" },
  /** Four columns, portrait: beside a wide landscape. */
  tall: { item: "md:col-span-6 lg:col-span-4", aspectRatio: "portrait", aspect: "md:aspect-square lg:aspect-portrait", sizes: "third" },
  /** Seven columns, landscape: beside a square. */
  major: { item: "md:col-span-6 lg:col-span-7", aspectRatio: "landscape", aspect: "md:aspect-square lg:aspect-landscape", sizes: "feature" },
  /** Five columns, square: beside a seven-column landscape. */
  minor: { item: "md:col-span-6 lg:col-span-5", aspectRatio: "landscape", aspect: "md:aspect-square lg:aspect-square", sizes: "aside" },
  /** The full row, cinematic: a change of scale every few rows (full width on tablets too). */
  panorama: { item: "md:col-span-12", aspectRatio: "landscape", aspect: "lg:aspect-cinematic", sizes: "wide" },
  /** Two portraits sharing a row, set in from the edges. */
  pairStart: { item: "md:col-span-6 lg:col-span-5 lg:col-start-2", aspectRatio: "portrait", aspect: "md:aspect-square lg:aspect-portrait", sizes: "aside" },
  pairEnd: { item: "md:col-span-6 lg:col-span-5 lg:col-start-8", aspectRatio: "portrait", aspect: "md:aspect-square lg:aspect-portrait", sizes: "aside" },
  /** A portrait left on its own at the end: centred. */
  tallAlone: { item: "md:col-span-6 lg:col-span-4 lg:col-start-5", aspectRatio: "portrait", aspect: "md:aspect-square lg:aspect-portrait", sizes: "third" },
} as const satisfies Record<string, { item: string; aspectRatio: AspectRatio; aspect: string; sizes: ImageSizes }>;

export type GallerySlot = keyof typeof gallerySlots;

/**
 * Assigns each photograph a place, row by row, from its orientation, so the
 * composition works for any number of photographs and any filtered subset:
 * a portrait sits beside a wide landscape, two landscapes alternate between
 * 7/5 and 5/7, and every third landscape row becomes a single panorama.
 */
export function composeGallery(portrait: boolean[]): GallerySlot[] {
  const slots: GallerySlot[] = [];
  let landscapeRows = 0;
  let i = 0;

  while (i < portrait.length) {
    const current = portrait[i];
    const next = portrait[i + 1];

    if (next === undefined) {
      slots.push(current ? "tallAlone" : "panorama");
      i += 1;
    } else if (current && next) {
      slots.push("pairStart", "pairEnd");
      i += 2;
    } else if (current) {
      slots.push("tall", "wide");
      i += 2;
    } else if (next) {
      slots.push("wide", "tall");
      i += 2;
    } else if (landscapeRows % 3 === 2) {
      slots.push("panorama");
      landscapeRows += 1;
      i += 1;
    } else {
      slots.push(...(landscapeRows % 2 === 0 ? (["major", "minor"] as const) : (["minor", "major"] as const)));
      landscapeRows += 1;
      i += 2;
    }
  }

  return slots;
}
