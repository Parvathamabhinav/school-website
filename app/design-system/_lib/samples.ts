import type { ImageAsset } from "@/types/media";

/**
 * Neutral, abstract placeholder media for the design-system showcase only.
 * Not school content; real imagery comes from data/school.ts.
 */
export const placeholderLandscape: ImageAsset = {
  src: "/images/placeholders/landscape.jpg",
  alt: "Abstract placeholder: a slate block standing in a pale stone room",
  width: 2400,
  height: 1600,
  blurDataURL:
    "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAIAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMG/8QAHBAAAQQDAQAAAAAAAAAAAAAAAgABAwQFESKx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAVEQEBAAAAAAAAAAAAAAAAAAAAQf/aAAwDAQACEQMRAD8A0tq6MVWQxLoR2ynRyDT1RkkLp3f1EUw1/9k=",
};

export const placeholderPortrait: ImageAsset = {
  src: "/images/placeholders/portrait.jpg",
  alt: "Abstract placeholder: a tall slate form beneath a brass line",
  width: 1600,
  height: 2000,
  blurDataURL:
    "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAPAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgMF/8QAHxAAAgEDBQEAAAAAAAAAAAAAAQIDAAQFBhEhMbFB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAXEQEBAQEAAAAAAAAAAAAAAAABACER/9oADAMBAAIRAxEAPwBVcX9vAxSRyGHfFTjnSdBJGd1bo0W1DemPKzIN+AvgrYwkhfEwMfoPpqJnYO3/2Q==",
};

/** Generic sample copy, deliberately free of any school's identity. */
export const sampleCopy = {
  headline: "Curiosity, rigour and care, in equal measure.",
  standfirst:
    "A rounded education asks as much of character as it does of intellect. Teachers know every student by name, and every student is known for more than their grades.",
  body: "Classes are small enough for real conversation. Mornings are spent on core disciplines; afternoons open onto laboratories, studios, playing fields and the library. Students leave with the habits of mind to keep learning long after they have gone.",
};
