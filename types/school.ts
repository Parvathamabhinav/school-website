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
  studentLife?: StudentLifeContent;
  admissionsCta?: AdmissionsCtaContent;
  footer?: FooterContent;
  testimonials: Testimonial[];
  events: SchoolEvent[];
  gallery: GalleryItem[];
  videos: VideoAsset[];
  admissions?: AdmissionsPageContent;
  contactPage?: ContactPageContent;
  about?: AboutPageContent;
  academics?: AcademicsPageContent;
  campusPage?: CampusPageContent;
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

/* ---------------------------------------------------------------- About -- */

/**
 * The /about page. Everything here is the school's own account of itself:
 * publish only what the school confirms, and use each section's `note` to
 * label illustrative development copy.
 */
export interface AboutPageContent {
  /** Page title and meta description. */
  seo: { title: string; description: string };
  hero: {
    eyebrow?: string;
    title: string;
    description?: string;
    /** Wide photograph; phones crop it to portrait. */
    media: EditorialMedia;
  };
  /** Rendered at #story (linked from the homepage). */
  story: {
    eyebrow?: string;
    title: string;
    /** The first paragraph is set larger, as the lead. */
    paragraphs: string[];
    /** Portrait photograph. */
    media: EditorialMedia;
    /** Verified milestones only; omit rather than estimate. */
    milestones?: { year: string; text: string }[];
    note?: string;
  };
  philosophy: {
    eyebrow?: string;
    /** One sentence summing up the approach; the section heading. */
    statement: string;
    paragraphs: string[];
    /** Portrait photograph. */
    media?: EditorialMedia;
    note?: string;
  };
  values: {
    eyebrow?: string;
    title: string;
    description?: string;
    /** Three to five read best. */
    items: SchoolValue[];
    /** Portrait photograph. */
    media?: EditorialMedia;
    note?: string;
  };
  closing: {
    title: string;
    description?: string;
    primaryAction: LinkAction;
    secondaryAction?: LinkAction;
  };
}

export interface SchoolValue {
  /** Stable, URL-safe identifier, unique within the list. */
  id: string;
  title: string;
  description: string;
}

/* ------------------------------------------------------------ Academics -- */

/**
 * The /academics page. Curriculum, stages, grade ranges, subjects and
 * teaching practice are policy: publish only what the school confirms, and
 * use each section's `note` to label illustrative development copy.
 */
export interface AcademicsPageContent {
  /** Page title and meta description. */
  seo: { title: string; description: string };
  hero: {
    eyebrow?: string;
    title: string;
    description?: string;
    /** Landscape photograph. */
    media: EditorialMedia;
  };
  philosophy: {
    eyebrow?: string;
    title: string;
    /** The first paragraph is set larger, as the lead. */
    paragraphs: string[];
    /** Short beliefs shown as a list; three read best. */
    principles?: { id: string; title: string; description: string }[];
    /** Landscape photograph. */
    media?: EditorialMedia;
    note?: string;
  };
  /** Rendered at #programmes. */
  programmes: {
    eyebrow?: string;
    title: string;
    description?: string;
    /**
     * The school's own stages, in order, however it groups them (phases,
     * year groups, divisions). Empty until confirmed: `pendingMessage` shows.
     */
    stages: AcademicStage[];
    /** Shown in place of the stages while there are none. */
    pendingMessage?: string;
    /** Broad areas of learning; render only when supplied. */
    subjects?: { title: string; items: string[] };
    note?: string;
  };
  /** "How learning happens": a few practices, each with a photograph. */
  approach: {
    eyebrow?: string;
    title: string;
    description?: string;
    /** Three to five read best. */
    practices: LearningPractice[];
    note?: string;
  };
  /** Assessment and student support. Omit until the school confirms it. */
  support?: {
    eyebrow?: string;
    title: string;
    items: { id: string; title: string; description: string }[];
  };
  closing: {
    title: string;
    description?: string;
    primaryAction: LinkAction;
    secondaryAction?: LinkAction;
  };
}

export interface AcademicStage {
  /** Stable, URL-safe identifier, unique within the list. */
  id: string;
  name: string;
  /** e.g. "Ages 3–5" or "Grades 6–8". Omit rather than estimate. */
  range?: string;
  summary: string;
  /** A few short emphases for this stage. */
  focus?: string[];
}

export interface LearningPractice {
  /** Stable, URL-safe identifier, unique within the list. */
  id: string;
  title: string;
  description: string;
  /** Cropped landscape or portrait depending on its place in the layout. */
  media: EditorialMedia;
}

/* --------------------------------------------------------------- Campus -- */

/**
 * The /campus page (the homepage's short campus section is `campus`).
 * Facilities, sizes, provisions and arrangements are facts: publish only
 * what the school confirms. Until the school's own photographs are in
 * place, say so in each `caption` and the section `note`s.
 */
export interface CampusPageContent {
  /** Page title and meta description. */
  seo: { title: string; description: string };
  hero: {
    eyebrow?: string;
    title: string;
    description?: string;
    /** Wide photograph shown edge to edge; phones crop it to portrait. */
    media: EditorialMedia;
    /** Shown under the photograph, e.g. what it shows. */
    caption?: string;
    /** Optional in-page link, usually "#spaces". */
    action?: LinkAction;
  };
  introduction: {
    eyebrow?: string;
    /** A short statement; the section heading. */
    title: string;
    paragraphs: string[];
    note?: string;
  };
  /** Rendered at #spaces. */
  spaces: {
    eyebrow?: string;
    title: string;
    description?: string;
    /** In display order; the layout varies with each position. */
    items: CampusSpace[];
    note?: string;
  };
  /** Accessibility, visiting and similar. Omit until the school supplies it. */
  practical?: {
    eyebrow?: string;
    title: string;
    items: { id: string; title: string; description: string }[];
    action?: LinkAction;
  };
  closing: {
    title: string;
    description?: string;
    primaryAction: LinkAction;
    secondaryAction?: LinkAction;
  };
}

export interface CampusSpace {
  /** Stable, URL-safe identifier, unique within the list (used as an anchor). */
  id: string;
  /** Short label, e.g. "Reading and research". */
  category: string;
  title: string;
  description: string;
  /**
   * Cropped to its place in the sequence (wide, portrait or landscape);
   * set focalPoint to keep the subject in frame.
   */
  media: EditorialMedia;
  /** Shown under the photograph. */
  caption?: string;
  /** Verified facts only, e.g. "Open to students before and after lessons". */
  details?: string[];
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

/** "Beyond the classroom": the people and moments that make up school life. */
export interface StudentLifeContent {
  eyebrow?: string;
  title: string;
  description?: string;
  /**
   * Shown as an editorial collage, in order: a large lead photograph, a
   * tall portrait, then smaller supporting photographs. Three or four read
   * best; any number is supported.
   */
  moments: StudentLifeMoment[];
}

export interface StudentLifeMoment {
  /** Stable, URL-safe identifier, unique within the section. */
  id: string;
  /** Short label, e.g. "Community", "Sport & outdoors". */
  category?: string;
  title: string;
  description?: string;
  /** Cropped to its place in the collage; set focalPoint to keep faces in frame. */
  media: EditorialMedia;
}

/** The homepage's closing call to action: the next step towards joining. */
export interface AdmissionsCtaContent {
  eyebrow?: string;
  title: string;
  description?: string;
  /** The one main action, e.g. the admissions page. */
  primaryAction: LinkAction;
  /** A quieter alternative, e.g. arranging a visit. */
  secondaryAction?: LinkAction;
}

/**
 * Footer content that lives nowhere else. Navigation, contact details,
 * address and social links come from their existing sources.
 */
export interface FooterContent {
  /** A sentence or two introducing the school. */
  description?: string;
  /** e.g. privacy policy, accessibility statement. Shown in the bottom row. */
  legalLinks?: LinkAction[];
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

/* ----------------------------------------------------------- Admissions -- */

/**
 * The /admissions page. Contact details come from `school.contact`.
 *
 * Only publish facts the school has confirmed: steps, documents, dates and
 * FAQ answers are policy. Optional lists render only when supplied.
 */
export interface AdmissionsPageContent {
  /** Page title and meta description. */
  seo: { title: string; description: string };
  hero: AdmissionsHeroContent;
  process: AdmissionsProcessContent;
  guidance?: AdmissionsGuidanceContent;
  faq?: AdmissionsFaqContent;
  enquiry: EnquiryContent;
}

export interface AdmissionsHeroContent {
  eyebrow?: string;
  title: string;
  description?: string;
  media: EditorialMedia;
  /** Usually "#enquire" (the enquiry section on this page). */
  primaryAction: LinkAction;
  /** e.g. "#process". */
  secondaryAction?: LinkAction;
}

export interface AdmissionsProcessContent {
  eyebrow?: string;
  title: string;
  description?: string;
  steps: AdmissionsStep[];
  /** Small print under the steps, e.g. that they are illustrative. */
  note?: string;
}

export interface AdmissionsStep {
  /** Stable, URL-safe identifier, unique within the list. */
  id: string;
  title: string;
  description: string;
}

/** "What parents need to know": short guidance plus any verified lists. */
export interface AdmissionsGuidanceContent {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Verified documents to prepare. Omit until the school confirms them. */
  documents?: { title: string; items: string[] };
  /** Verified dates or deadlines. Omit until the school confirms them. */
  dates?: { title: string; items: { label: string; date: string }[] };
  media?: EditorialMedia;
}

export interface AdmissionsFaqContent {
  eyebrow?: string;
  title: string;
  items: FaqItem[];
  note?: string;
}

export interface FaqItem {
  /** Stable, URL-safe identifier, unique within the list. */
  id: string;
  question: string;
  answer: string;
}

export interface EnquiryContent {
  eyebrow?: string;
  title: string;
  description?: string;
  form: EnquiryFormContent;
}

/** Content of an enquiry form; shared by the Admissions and Contact pages. */
export interface EnquiryFormContent {
  labels: {
    name: string;
    email: string;
    phone: string;
    /** With `gradeOptions`, shows an optional year-group select. */
    grade?: string;
    /** With `subjectOptions`, shows a required "what is this about" select. */
    subject?: string;
    message: string;
    /** When set, a required consent checkbox with this label is shown. */
    consent?: string;
    submit: string;
  };
  gradeOptions?: string[];
  subjectOptions?: string[];
  /** Require a message (e.g. general enquiries, where it is the point). */
  requireMessage?: boolean;
  /** Heading of the confirmation; defaults to "Thank you". */
  successTitle?: string;
  /** Shown only after the delivery provider confirms the enquiry was received. */
  successMessage: string;
  /** Optional privacy statement; it must match the school's actual policy. */
  privacyNote?: string;
}

/* -------------------------------------------------------------- Contact -- */

/**
 * The /contact page. Contact details, address and social links come from
 * `school.contact`, `school.location` and `school.socialLinks`.
 */
export interface ContactPageContent {
  /** Page title and meta description. */
  seo: { title: string; description: string };
  hero: {
    eyebrow?: string;
    title: string;
    description?: string;
    /** One optional, quiet action, e.g. to the form further down. */
    action?: LinkAction;
  };
  details: {
    /** Visually hidden heading for the contact directory. */
    title: string;
    labels: {
      address: string;
      phone: string;
      email: string;
      hours: string;
      social: string;
      admissions: string;
    };
    /** Shown only when `school.location.mapUrl` is set (a verified address). */
    directionsLabel: string;
    /** Where admissions questions should go, e.g. "/admissions#enquire". */
    admissionsLink?: LinkAction;
  };
  enquiry: EnquiryContent;
}
