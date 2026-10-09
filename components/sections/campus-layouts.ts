// Shared by the server-rendered CampusSection and the client CampusExplorer.
// Kept out of the "use client" module: a Server Component importing a plain
// value from a client module receives a client reference, not the value.

/**
 * Classes per interactive breakpoint. Up to four experiences fit the
 * horizontal index from lg; five or more wait for xl so the index never
 * crowds the media. CampusSection hides its stacked list at the same point.
 */
export const campusLayouts = {
  lg: {
    intro: "lg:col-span-4",
    detail: "lg:block",
    media: "lg:col-span-8 lg:col-start-5 lg:block",
    bleed: "lg:bleed-right",
    stacked: "lg:hidden",
  },
  xl: {
    intro: "xl:col-span-4",
    detail: "xl:block",
    media: "xl:col-span-8 xl:col-start-5 xl:block",
    bleed: "xl:bleed-right",
    stacked: "xl:hidden",
  },
} as const;

export type CampusLayout = keyof typeof campusLayouts;
