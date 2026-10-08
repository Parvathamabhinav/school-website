import type { School } from "@/types/school";
import { placeholderPortrait } from "./placeholders";

const establishedYear = 1965;

/**
 * Active school data. This is the only file that should change when the
 * platform is configured for a new school (later: replaced by a CMS fetch).
 *
 * All values below are generic placeholders, not a real institution.
 */
export const school: School = {
  name: "Example Academy",
  shortName: "Example",
  tagline: "A place for curious minds.",
  establishedYear,
  brand: {
    favicon: "/icons/favicon.svg",
    colors: {
      primary: "#10263D", // Deep Ink Navy
      secondary: "#40566B", // Slate Blue
      background: "#F7F5EF", // Warm Ivory
      surface: "#EAE7DF", // Soft Stone
      text: "#17212B", // Ink
      textMuted: "#5F6974", // Slate (deepened from #68727D for WCAG AA)
      accent: "#B5965A", // Antique Brass
      accentAlt: "#526B5B", // Academic Green
    },
  },
  location: {
    streetAddress: "1 School Lane",
    locality: "City",
    region: "Region",
    postalCode: "00000",
    country: "Country",
  },
  contact: {
    email: "office@example.com",
    phone: "+00 000 000 0000",
  },
  socialLinks: [],
  seo: {
    description:
      "Example Academy is an independent school committed to academic excellence and character.",
  },
  announcement: {
    enabled: true,
    text: "Admissions for the 2027–28 academic year are now open.",
    href: "/admissions",
    linkLabel: "Find out more",
  },
  hero: {
    eyebrow: "An education for what comes next",
    title: ["Where curiosity", "becomes", "possibility."],
    description: "A place to learn deeply, explore boldly and grow with purpose.",
    primaryAction: { label: "Explore our school", href: "/about" },
    secondaryAction: { label: "Discover our story", href: "/about#story" },
    media: {
      // Supply photography close to the desktop portrait crop (4:5): cover
      // crops scale to fill, so a much wider source would be upscaled.
      image: {
        ...placeholderPortrait,
        alt: "Placeholder for a photograph of the school campus",
      },
      focalPoint: "50% 60%",
    },
    meta: [`Est. ${establishedYear}`, "Curiosity · Rigour · Care"],
  },
  // DEVELOPMENT PLACEHOLDERS: illustrative figures, not facts about any real
  // school. Replace every value with verified figures before launch.
  impact: {
    eyebrow: "A legacy of learning",
    statement: [
      "Education is more than preparation for examinations.",
      "It is preparation for life.",
    ],
    stats: [
      { value: "25+", label: "Years of excellence" },
      { value: "5,000+", label: "Students" },
      { value: "98%", label: "Academic success" },
      { value: "12", label: "Learning spaces" },
    ],
    note: "Illustrative figures for development only.",
  },
  programs: [],
  facilities: [],
  achievements: [],
  testimonials: [],
  events: [],
  gallery: [],
  videos: [],
};
