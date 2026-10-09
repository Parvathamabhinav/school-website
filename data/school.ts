import type { School } from "@/types/school";
import { developmentPhotography as photo } from "./development-photography";
import { placeholderLandscape, placeholderLandscapeSet, placeholderPortrait } from "./placeholders";

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
  story: {
    eyebrow: "Our story",
    title: "Education with purpose, curiosity and character.",
    body: "We create an environment where students are encouraged to think deeply, discover confidently and grow into capable, thoughtful people.",
    link: { label: "Discover our story", href: "/about" },
    media: {
      image: {
        ...placeholderLandscape,
        alt: "Placeholder for a photograph of students and teachers together",
      },
      // Phones crop to portrait, so give them a portrait source.
      mobileImage: {
        ...placeholderPortrait,
        alt: "Placeholder for a photograph of students and teachers together",
      },
      focalPoint: "70% 55%",
      caption: "Placeholder image: replace with school photography.",
    },
  },
  // DEVELOPMENT PLACEHOLDERS: illustrative principles, not an official
  // curriculum. Replace copy and imagery with the school's own.
  learning: {
    eyebrow: "How we learn",
    title: "Learning that goes deeper than the lesson.",
    description:
      "A few principles shape how teachers teach and how students learn, from the first year to the last.",
    principles: [
      {
        id: "discover",
        title: "Discover",
        description: "Students learn to observe, question and explore beyond the obvious.",
        media: { image: { ...placeholderLandscapeSet[0], alt: "Placeholder for a photograph of students exploring" } },
      },
      {
        id: "think",
        title: "Think",
        description: "Learning becomes deeper when students connect ideas and reason independently.",
        media: { image: { ...placeholderLandscapeSet[1], alt: "Placeholder for a photograph of a seminar discussion" } },
      },
      {
        id: "create",
        title: "Create",
        description: "Students turn knowledge into ideas, projects and meaningful work.",
        media: { image: { ...placeholderLandscapeSet[2], alt: "Placeholder for a photograph of students making something" } },
      },
      {
        id: "lead",
        title: "Lead",
        description: "Confidence grows through responsibility, collaboration and purposeful action.",
        media: { image: { ...placeholderLandscapeSet[3], alt: "Placeholder for a photograph of students leading an activity" } },
      },
    ],
  },
  // DEVELOPMENT PLACEHOLDERS: illustrative spaces, not claims about any real
  // campus. Replace copy, captions and imagery with the school's own.
  campus: {
    eyebrow: "Life on campus",
    title: "Spaces designed for discovery.",
    description: "The environments around us shape the way we learn, connect and grow.",
    experiences: [
      {
        id: "learning-spaces",
        title: "Learning Spaces",
        description: "Thoughtfully designed environments that give students room to focus, question and explore.",
        media: { image: { ...placeholderLandscapeSet[0], alt: "Placeholder for a photograph of a classroom" } },
        caption: "Placeholder · Classroom",
      },
      {
        id: "science-innovation",
        title: "Science & Innovation",
        description: "Spaces where ideas move from curiosity to experimentation.",
        media: { image: { ...placeholderLandscapeSet[2], alt: "Placeholder for a photograph of a science laboratory" } },
        caption: "Placeholder · Science laboratory",
      },
      {
        id: "sport-wellbeing",
        title: "Sport & Wellbeing",
        description: "Room to build confidence, discipline and a healthy sense of competition.",
        media: { image: { ...placeholderLandscapeSet[1], alt: "Placeholder for a photograph of the sports grounds" } },
        caption: "Placeholder · Sports grounds",
      },
      {
        id: "arts-expression",
        title: "Arts & Expression",
        description: "Creative spaces where students discover new ways to communicate and imagine.",
        media: { image: { ...placeholderLandscapeSet[3], alt: "Placeholder for a photograph of an art studio" } },
        caption: "Placeholder · Art studio",
      },
    ],
  },
  // DEVELOPMENT CONTENT: generic statements and stock photography, not claims
  // about any real school. Replace with the school's own achievements and
  // photographs (see data/development-photography.ts).
  achievements: {
    eyebrow: "Excellence in action",
    title: "Ambition becomes achievement.",
    description:
      "We encourage students to pursue ideas deeply, challenge themselves boldly and take pride in the work they create.",
    media: { image: photo.graduation, focalPoint: "45% 45%" },
    items: [
      {
        id: "academic",
        category: "Academic excellence",
        title: "Rigour, pursued with confidence",
        description: "Students are encouraged to pursue rigorous academic goals with confidence.",
      },
      {
        id: "innovation",
        category: "Innovation",
        title: "Ideas given room to become real",
        description: "From experiments to original projects, ideas are given room to become real.",
        media: { image: photo.scienceExperiment, focalPoint: "55% 50%" },
      },
      {
        id: "sport",
        category: "Sport",
        title: "Competition that builds character",
        description: "Competition becomes an opportunity to build discipline, resilience and teamwork.",
        media: { image: photo.schoolAthletics, focalPoint: "60% 50%" },
      },
      {
        id: "creative-arts",
        category: "Creative arts",
        title: "New ways to express ideas",
        description: "Students discover new ways to express ideas, imagination and identity.",
        media: { image: photo.studentOrchestra, focalPoint: "50% 40%" },
      },
    ],
  },
  // DEVELOPMENT CONTENT: generic copy and stock photography, not claims
  // about any real school. Replace with the school's own moments and
  // photographs (see data/development-photography.ts).
  studentLife: {
    eyebrow: "Beyond the classroom",
    title: "A place to grow, discover, and belong.",
    description:
      "The moments between lessons matter too. Shared experiences help students build confidence, friendships, curiosity, and a lasting sense of community.",
    moments: [
      {
        id: "community",
        category: "Community",
        title: "Friendships that last",
        description: "Time shared between lessons builds the trust, kindness and belonging students carry with them.",
        media: { image: photo.friendsCourtyard, focalPoint: "55% 45%", mobileFocalPoint: "60% 40%" },
      },
      {
        id: "sport-outdoors",
        category: "Sport & outdoors",
        title: "Energy, teamwork and fresh air",
        description: "On the pitch and outdoors, students learn to commit to a team, compete fairly and try again.",
        media: { image: photo.footballMatch, focalPoint: "60% 50%" },
      },
      {
        id: "collaboration",
        category: "Collaboration",
        title: "Ideas, shared and stretched",
        description: "Working together, students learn to listen, question one another and build something better.",
        media: { image: photo.groupProject, focalPoint: "50% 40%" },
      },
      {
        id: "creative-exploration",
        category: "Creative exploration",
        title: "Room to make and imagine",
        description: "Studios and rehearsals give students space to experiment, take creative risks and find their voice.",
        media: { image: photo.paintingStudio, focalPoint: "35% 45%" },
      },
    ],
  },
  // DEVELOPMENT CONTENT. /admissions and /contact are planned routes (the
  // same ones the navigation uses); neither page exists yet.
  admissionsCta: {
    eyebrow: "Your next chapter",
    title: "A great journey begins with a conversation.",
    description:
      "Discover a learning community where every student is encouraged to grow, explore, and find their potential.",
    primaryAction: { label: "Explore admissions", href: "/admissions" },
    secondaryAction: { label: "Arrange a visit", href: "/contact" },
  },
  // DEVELOPMENT CONTENT. Add legalLinks once those pages exist.
  footer: {
    description: "A place for curious minds to learn deeply, explore boldly and grow with purpose.",
  },
  programs: [],
  facilities: [],
  testimonials: [],
  events: [],
  gallery: [],
  videos: [],
};
