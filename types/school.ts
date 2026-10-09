import type { AspectRatio } from "@/lib/media/presets";
import type { ImageAsset, VideoSource, VideoAsset } from "./media";

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
  announcement?: Announcement;
  hero: HeroContent;
  impact?: ImpactContent;
  story?: StoryContent;
  learning?: LearningContent;
  campus?: CampusContent;
  principal?: PrincipalMessage;
  programs: AcademicProgram[];
  facilities: Facility[];
  achievements?: AchievementsContent;
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
  /**
   * Full logo lockup (ideally SVG, with alt text naming the school). When
   * omitted, the site renders a typographic wordmark from the school name.
   */
  logo?: ImageAsset;
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

/** Site-wide notice shown above the navbar. Remove or disable to hide it. */
export interface Announcement {
  enabled: boolean;
  text: string;
  href?: string;
  /** Visible link text; required for the link to render. */
  linkLabel?: string;
}

export interface LinkAction {
  label: string;
  href: string;
}

export interface HeroContent {
  /** Short institutional label above the headline. */
  eyebrow?: string;
  /**
   * Headline as deliberate lines. Each entry starts a new line and reveals
   * as one group; long lines may still wrap on narrow screens.
   * e.g. ["Where curiosity", "becomes", "possibility."]
   */
  title: string[];
  description?: string;
  primaryAction?: LinkAction;
  secondaryAction?: LinkAction;
  media?: HeroMedia;
  /** Small editorial facts shown along the foot of the hero, e.g. "Est. 1965". */
  meta?: string[];
}

/**
 * A single editorial image with optional art direction. Shared by sections;
 * supply photography close to the crop ratio, since cover crops scale to
 * fill and a much wider source would be upscaled.
 */
export interface EditorialMedia {
  /** Use alt: "" for a purely decorative image. */
  image: ImageAsset;
  /** Art-directed asset for small screens; falls back to `image`. */
  mobileImage?: ImageAsset;
  /** CSS object-position focal point for cropping, e.g. "50% 30%". */
  focalPoint?: string;
  /** Focal point for the mobile crop; falls back to `focalPoint`. */
  mobileFocalPoint?: string;
}

export interface HeroMedia extends EditorialMedia {
  /**
   * Optional muted ambient video. `image` is its poster and the fallback
   * for reduced motion or load failure.
   */
  video?: { sources: VideoSource[]; title: string };
  /** Tint the media with the primary colour (for text placed over it). */
  overlay?: boolean;
}

/** Evidence section after the hero: a statement backed by a few figures. */
export interface ImpactContent {
  eyebrow?: string;
  /**
   * The section heading, as sentence parts rendered inline. Parts after the
   * first are set in the muted tone, e.g.
   * ["Education is more than preparation for examinations.", "It is preparation for life."]
   */
  statement: string[];
  /** Two to four figures read best; more wrap onto further rows. */
  stats: ImpactStat[];
  /** Qualifier shown under the figures, e.g. a source or "as of" date. */
  note?: string;
}

export interface ImpactStat {
  /** Display value, kept as written: "25+", "5,000+", "98%". */
  value: string;
  label: string;
}

/** "Who we are": an image-led introduction to the school's character. */
export interface StoryContent {
  eyebrow?: string;
  title: string;
  body: string;
  link?: LinkAction;
  media: StoryMedia;
}

export interface StoryMedia extends EditorialMedia {
  /** Crop from tablet up. Defaults to "landscape". */
  aspectRatio?: AspectRatio;
  /** Crop on phones. Defaults to "portrait". */
  mobileAspectRatio?: AspectRatio;
  caption?: string;
}

/** "How we educate": a set of principles, each paired with an image. */
export interface LearningContent {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Three to five read best; any number is supported. */
  principles: LearningPrinciple[];
}

export interface LearningPrinciple {
  /** Stable, URL-safe identifier, unique within the section. */
  id: string;
  title: string;
  description: string;
  /** Landscape (3:2) photography suits every layout this is shown in. */
  media: EditorialMedia;
}

/** "Where it happens": the places that make up the school experience. */
export interface CampusContent {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Three to six read best; any number is supported. */
  experiences: CampusExperience[];
  /** Crop of the large desktop media frame. Defaults to "landscape". */
  aspectRatio?: AspectRatio;
}

export interface CampusExperience {
  /** Stable, URL-safe identifier, unique within the section. */
  id: string;
  /** Display number; defaults to the position ("01", "02", …). */
  number?: string;
  title: string;
  description: string;
  /** Landscape photography suits every layout this is shown in. */
  media: EditorialMedia;
  /** Small caption for the photograph, e.g. "Science laboratory". */
  caption?: string;
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

/** Evidence of excellence: a ledger of achievements beside a lead photograph. */
export interface AchievementsContent {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Lead photograph; also shown for any item without its own media. */
  media: EditorialMedia;
  /** Two to six read best; any number is supported. */
  items: AchievementItem[];
}

export interface AchievementItem {
  /** Stable, URL-safe identifier, unique within the section. */
  id: string;
  /** Free text, e.g. "Academic", "Innovation", "University placement". */
  category: string;
  title: string;
  description?: string;
  /** e.g. "National finalist". Only verified facts. */
  result?: string;
  year?: string;
  /** Supporting photograph (landscape); falls back to the section media. */
  media?: EditorialMedia;
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
