import type { School } from "@/types/school";

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
  establishedYear: 1965,
  brand: {
    logo: {
      src: "/icons/logo-placeholder.svg",
      alt: "Example Academy",
      width: 160,
      height: 40,
    },
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
  hero: {
    title: "A place for curious minds.",
  },
  programs: [],
  facilities: [],
  achievements: [],
  testimonials: [],
  events: [],
  gallery: [],
  videos: [],
};
