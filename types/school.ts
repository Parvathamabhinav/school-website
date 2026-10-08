import type { ImageAsset, MediaAsset, VideoAsset } from "./media";

/**
 * The complete description of one school. Presentation components receive
 * slices of this object; they never contain school-specific content.
 *
 * Shaped so it can later be served by a CMS without changing components.
 */
export interface School {
  name: string;
  shortName: string;
  tagline: string;
  establishedYear: number;
  brand: SchoolBrand;
  location: SchoolLocation;
  contact: SchoolContact;
  socialLinks: SocialLink[];
  seo: SchoolSeo;
  hero: HeroContent;
  principal?: PrincipalMessage;
  programs: AcademicProgram[];
  facilities: Facility[];
  achievements: Achievement[];
  testimonials: Testimonial[];
  events: SchoolEvent[];
  gallery: GalleryItem[];
  videos: VideoAsset[];
  admissions?: AdmissionsInfo;
}

/* ---------------------------------------------------------------- Brand -- */

/**
 * Raw brand palette. These values are mapped to semantic design tokens in
 * app/globals.css; components only ever use the semantic tokens.
 */
export interface BrandPalette {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  accent: string;
  /** Optional secondary accent for sparing use (tags, data highlights). */
  accentAlt?: string;
}

export interface SchoolBrand {
  logo: ImageAsset;
  /** Path to the favicon under /public. */
  favicon: string;
  colors: BrandPalette;
}

/* -------------------------------------------------------------- Contact -- */

export interface SchoolLocation {
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
  mapUrl?: string;
}

export interface SchoolContact {
  email: string;
  phone: string;
  admissionsEmail?: string;
  officeHours?: string;
}

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "x";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface SchoolSeo {
  /** Default meta description used when a page provides none. */
  description: string;
  /** Default Open Graph image (1200×630 recommended). */
  ogImage?: ImageAsset;
  keywords?: string[];
}

/* -------------------------------------------------------------- Content -- */

export interface LinkAction {
  label: string;
  href: string;
}

export interface HeroContent {
  eyebrow?: string;
  title: string;
  description?: string;
  media?: MediaAsset;
  actions?: LinkAction[];
}

export interface PrincipalMessage {
  name: string;
  title: string;
  portrait: ImageAsset;
  message: string;
}

export interface AcademicProgram {
  id: string;
  name: string;
  /** e.g. "Grades 1–5" or "Ages 3–5". */
  stage: string;
  summary: string;
  image?: ImageAsset;
}

export interface Facility {
  id: string;
  name: string;
  summary: string;
  image?: ImageAsset;
}

export interface Achievement {
  id: string;
  title: string;
  year: number;
  description?: string;
  /** Optional headline figure, e.g. "98%". */
  metric?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  /** e.g. "Parent, Class of 2027". */
  role: string;
  portrait?: ImageAsset;
}

export interface SchoolEvent {
  id: string;
  title: string;
  /** ISO 8601 date, e.g. "2026-11-14". */
  date: string;
  location?: string;
  summary?: string;
  image?: ImageAsset;
}

export interface GalleryItem {
  id: string;
  image: ImageAsset;
  caption?: string;
  category?: string;
}

export interface AdmissionsInfo {
  summary: string;
  steps: { title: string; description: string }[];
  applicationUrl?: string;
}
