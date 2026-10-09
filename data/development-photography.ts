import type { ImageAsset } from "@/types/media";

/**
 * DEVELOPMENT PHOTOGRAPHY: royalty-free stock images used until the school
 * supplies its own. They are not photographs of any real school.
 *
 * All are from Unsplash under the Unsplash License (free to use, no
 * attribution required); credits are kept for good practice. Files live in
 * /public/images/development and are optimised WebP at 2000px wide.
 *
 * To replace: add the school's photograph under /public/images, then point
 * the relevant entry in data/school.ts at it (src, alt, width, height,
 * optional blurDataURL). No component changes are needed.
 */
const unsplash = (author: string, id: string) => ({
  author,
  source: "Unsplash",
  url: `https://unsplash.com/photos/${id}`,
  license: "Unsplash License",
});

export const developmentPhotography = {
  graduation: {
    src: "/images/development/achievements/graduation.webp",
    alt: "Graduates in gowns throwing their caps into the air",
    width: 2000,
    height: 1333,
    blurDataURL:
      "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAAAwAgCdASoQAAsAA4BaJYgCdAYv1gH8uXypQAD+T+1J+6kpuF/ea6hb4J3T89dwxNjwebuPfmCfXM5s1SicOx4lGhexI43If9NEwVBBgjEZzDSCWKMcxiWYOqAAAA==",
    credit: unsplash("RUT MIIT", "hpRGrfOIybc"),
  },
  scienceExperiment: {
    src: "/images/development/achievements/science-experiment.webp",
    alt: "A student and teacher in lab coats carrying out a chemistry experiment",
    width: 2000,
    height: 1125,
    blurDataURL:
      "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAAAQAgCdASoQAAkAA4BaJYgC7AD8dSA7EmgAAP7kIf+uWylKZsJOBG/ZtspKO+ZSRztb47kHGofATab6cwncZDQAKlfSaIAA",
    credit: unsplash("Vitaly Gariev", "UStQpco0TWo"),
  },
  schoolAthletics: {
    src: "/images/development/achievements/school-athletics.webp",
    alt: "Pupils running a relay race on a school athletics track",
    width: 2000,
    height: 1333,
    blurDataURL:
      "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADwAQCdASoQAAsAA4BaJYgCdAEff0BFmgAA/uzFfzXsPRXAXxSgT6kicaByAdhGfdcWiwIn4RxX9pwg16m2jLIwpI+twkSXbLzc3WzQAAA=",
    credit: unsplash("Rosario Fernandes", "9Z3A9JLwY2E"),
  },
  studentOrchestra: {
    src: "/images/development/achievements/student-orchestra.webp",
    alt: "A student orchestra performing, seen from above, with violins and sheet music",
    width: 2000,
    height: 1333,
    blurDataURL:
      "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAADQAQCdASoQAAsAA4BaJQBOgBa4ZfPVUAD+9YEoQfBpPQVGaXF+aVGIx7kr5x7KPLIipiF8WK5adVwMH6lReez7U296WU+iezHGG38PmnYcq625GVyUMd/KSYp3/VzbBOWM9Tppo6pZXpK3Do8Ml5xy2ktAAA==",
    credit: unsplash("Samuel Sianipar", "4TNd3hsW3PM"),
  },
} satisfies Record<string, ImageAsset>;
