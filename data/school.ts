import type { School } from "@/types/school";
import { developmentPhotography as photo } from "./development-photography";

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
      image: photo.libraryStudy,
      focalPoint: "40% 60%",
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
      image: photo.campusWalk,
      // Phones crop to portrait, so give them a portrait source.
      mobileImage: photo.campusWalkPortrait,
      focalPoint: "50% 60%",
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
        media: { image: photo.microscope, focalPoint: "60% 40%" },
      },
      {
        id: "think",
        title: "Think",
        description: "Learning becomes deeper when students connect ideas and reason independently.",
        media: { image: photo.classDiscussion, focalPoint: "60% 50%" },
      },
      {
        id: "create",
        title: "Create",
        description: "Students turn knowledge into ideas, projects and meaningful work.",
        media: { image: photo.designMaking },
      },
      {
        id: "lead",
        title: "Lead",
        description: "Confidence grows through responsibility, collaboration and purposeful action.",
        media: { image: photo.classroomCollaboration, focalPoint: "45% 55%" },
      },
    ],
  },
  // DEVELOPMENT CONTENT: illustrative spaces and stock photography, not
  // claims about any real campus. Replace copy, captions and imagery.
  campus: {
    eyebrow: "Life on campus",
    title: "Spaces designed for discovery.",
    description: "The environments around us shape the way we learn, connect and grow.",
    experiences: [
      {
        id: "learning-spaces",
        title: "Learning Spaces",
        description: "Thoughtfully designed environments that give students room to focus, question and explore.",
        media: { image: photo.classroom },
        caption: "Classroom",
      },
      {
        id: "science-innovation",
        title: "Science & Innovation",
        description: "Spaces where ideas move from curiosity to experimentation.",
        media: { image: photo.laboratory },
        caption: "Science laboratory",
      },
      {
        id: "sport-wellbeing",
        title: "Sport & Wellbeing",
        description: "Room to build confidence, discipline and a healthy sense of competition.",
        media: { image: photo.sportsField, focalPoint: "50% 40%" },
        caption: "Sports grounds",
      },
      {
        id: "arts-expression",
        title: "Arts & Expression",
        description: "Creative spaces where students discover new ways to communicate and imagine.",
        media: { image: photo.artStudio },
        caption: "Art studio",
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
  // DEVELOPMENT CONTENT for /admissions. The process, FAQ answers and year
  // groups are illustrative, not any school's policy: replace them with the
  // school's confirmed admissions information before launch. Add
  // guidance.documents and guidance.dates only once verified.
  admissions: {
    seo: {
      title: "Admissions",
      description:
        "Find out how admissions work, ask the admissions team a question and take the first step towards joining the school.",
    },
    hero: {
      eyebrow: "Admissions",
      title: "Begin your family's journey with us.",
      description:
        "We would love to get to know you. Find out how admissions work, ask us anything and take the first step whenever you are ready.",
      media: { image: photo.welcomingClass, focalPoint: "45% 40%" },
      primaryAction: { label: "Make an enquiry", href: "#enquire" },
      secondaryAction: { label: "How admissions work", href: "#process" },
    },
    process: {
      eyebrow: "The admissions journey",
      title: "Five simple steps.",
      description: "Every family's journey is a little different. The admissions team will guide you at each stage.",
      steps: [
        {
          id: "enquire",
          title: "Make an enquiry",
          description: "Share a few details and the questions on your mind, using the form below or by contacting the school.",
        },
        {
          id: "conversation",
          title: "Speak with the school",
          description: "A conversation with the admissions team about your child, your hopes and anything you would like to know.",
        },
        {
          id: "visit",
          title: "Visit and learn more",
          description: "Ask about visiting the school to see learning in action and get a feel for everyday life.",
        },
        {
          id: "apply",
          title: "Follow the application instructions",
          description: "The admissions team will explain how the school's application works and what it involves.",
        },
        {
          id: "next-steps",
          title: "Receive your next steps",
          description: "You will hear from the admissions team about what happens next for your family.",
        },
      ],
      note: "Illustrative process for development. Replace with the school's confirmed admissions procedure.",
    },
    guidance: {
      eyebrow: "What parents need to know",
      title: "Clear answers, from the people who know.",
      description:
        "Requirements, key dates and any documents needed can vary by year group and from year to year. Rather than guess, the admissions team will confirm everything that applies to your family.",
      media: { image: photo.campusArrival, focalPoint: "35% 55%" },
    },
    faq: {
      eyebrow: "Questions",
      title: "Frequently asked questions.",
      items: [
        {
          id: "when-to-apply",
          question: "When can we apply?",
          answer:
            "Timings depend on the year group and the time of year. Make an enquiry and the admissions team will confirm what applies to your child.",
        },
        {
          id: "year-groups",
          question: "Which year groups have places available?",
          answer:
            "Availability changes from year to year. Tell us the year group you are interested in and the admissions team will let you know.",
        },
        {
          id: "visits",
          question: "Can we visit the school?",
          answer: "Please ask about visits when you enquire. The admissions team will explain the options available.",
        },
        {
          id: "after-enquiry",
          question: "What happens after we make an enquiry?",
          answer:
            "A member of the admissions team will reply using the contact details you provide, to answer your questions and talk about next steps.",
        },
      ],
      note: "Illustrative answers for development. Replace with the school's own.",
    },
    enquiry: {
      eyebrow: "Make an enquiry",
      title: "Start a conversation.",
      description:
        "Tell us a little about your family and what you would like to know. A member of the admissions team will reply.",
      form: {
        labels: {
          name: "Parent or guardian name",
          email: "Email address",
          phone: "Phone number",
          grade: "Year group of interest",
          message: "Your message or question",
          consent: "I agree to the school contacting me about this enquiry.",
          submit: "Send enquiry",
        },
        // Illustrative stages; replace with the school's own year groups.
        gradeOptions: ["Early years", "Primary", "Secondary", "Not sure yet"],
        successTitle: "Enquiry sent",
        successMessage: "Thank you. Your enquiry has been received, and the admissions team will be in touch.",
      },
    },
  },
  // DEVELOPMENT CONTENT for /contact. The contact details it shows come from
  // `contact` and `location` above, which are placeholders: replace them
  // with the school's verified details. Add location.mapUrl only for a
  // verified address; until then no directions link is shown.
  contactPage: {
    seo: {
      title: "Contact",
      description: "Contact details for the school, and a form for general questions.",
    },
    hero: {
      eyebrow: "Let's connect",
      title: "We're here to help.",
      description:
        "Have a question about our school, programmes, or next steps? Get in touch and we'll help you find the right information.",
      action: { label: "Send us a message", href: "#message" },
    },
    details: {
      title: "Contact details",
      labels: {
        address: "Visit",
        phone: "Call",
        email: "Email",
        hours: "Office hours",
        social: "Follow",
        admissions: "Admissions",
      },
      directionsLabel: "Get directions",
      admissionsLink: { label: "Make an admissions enquiry", href: "/admissions#enquire" },
    },
    enquiry: {
      eyebrow: "Send a message",
      title: "Ask us anything.",
      description:
        "For general questions, use the form and the right person at the school will reply. Thinking about joining? The admissions enquiry form reaches the admissions team directly.",
      form: {
        labels: {
          name: "Your name",
          email: "Email address",
          phone: "Phone number",
          subject: "What is your message about?",
          message: "Your message",
          consent: "I agree to the school contacting me about this message.",
          submit: "Send message",
        },
        // Illustrative topics; replace with the school's own.
        subjectOptions: ["General question", "Visiting the school", "Community and partnerships", "Something else"],
        requireMessage: true,
        successTitle: "Message sent",
        successMessage: "Thank you. Your message has been received, and the school will reply as soon as it can.",
      },
    },
  },
  programs: [],
  facilities: [],
  testimonials: [],
  events: [],
  gallery: [],
  videos: [],
};
