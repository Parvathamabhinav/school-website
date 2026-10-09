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
    // Set to the school's own IANA time zone, e.g. "Europe/London".
    timeZone: "UTC",
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
  // DEVELOPMENT CONTENT. Links to the /admissions and /contact pages.
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
  // DEVELOPMENT CONTENT for /about: illustrative copy and stock photography,
  // not any real school's history, philosophy or values. Replace with the
  // school's own account; add story.milestones only once verified.
  about: {
    seo: {
      title: "About",
      description: "The ideas, values and community that shape our school, and how we approach learning.",
    },
    hero: {
      eyebrow: "About our school",
      title: "Education that helps every student grow.",
      description: "Discover the ideas, relationships, and everyday experiences that shape our learning community.",
      media: { image: photo.readingLibrary, focalPoint: "35% 38%" },
    },
    story: {
      eyebrow: "Our story",
      title: "A school shaped by its people.",
      paragraphs: [
        "Every school is shaped by the people who learn, teach and belong to it. Ours is a community where students are known, encouraged and given room to become themselves.",
        "Teachers take time to understand each learner. Families are welcomed as partners. Across classrooms, corridors and playing fields, everyday moments add up to an education that lasts.",
        "As the school grows, it holds on to what matters most: curiosity, high expectations and genuine care for one another.",
      ],
      media: { image: photo.classroomPupils, focalPoint: "45% 40%" },
      note: "Illustrative story for development. Replace with the school's own history and identity.",
    },
    philosophy: {
      eyebrow: "Our approach",
      statement: "Learning is deepest when students are curious, challenged and supported.",
      paragraphs: [
        "We want students to understand ideas, not just remember them. Lessons invite questions, discussion and practice, so that knowledge becomes something students can use.",
        "High expectations go hand in hand with support. Students are stretched when they are ready and helped when they are not, so that each can make real progress.",
        "Learning does not stop at the classroom door. Creative work, sport, service and friendship all help students grow in confidence and character.",
      ],
      media: { image: photo.earlyYearsTable, focalPoint: "55% 50%" },
      note: "Illustrative approach for development. Replace with the school's own educational philosophy.",
    },
    values: {
      eyebrow: "What we value",
      title: "Values you can see in everyday school life.",
      description: "Our values guide how we learn, how we treat one another and how we take part in the wider world.",
      items: [
        {
          id: "curiosity",
          title: "Curiosity",
          description: "Asking questions, exploring ideas and enjoying the work of finding things out.",
        },
        {
          id: "rigour",
          title: "Rigour",
          description: "Taking learning seriously: careful thinking, honest effort and pride in work done well.",
        },
        {
          id: "care",
          title: "Care",
          description: "Kindness, respect and attention to each person, so that everyone can feel they belong.",
        },
        {
          id: "community",
          title: "Community",
          description: "Learning with and from others, and contributing to the life of the school and beyond.",
        },
      ],
      media: { image: photo.playground, focalPoint: "45% 45%" },
      note: "Illustrative values for development. Replace with the school's own.",
    },
    closing: {
      title: "Come and see for yourself.",
      description:
        "The best way to understand a school is to meet its people. Find out how admissions work, or get in touch with any question.",
      primaryAction: { label: "Explore admissions", href: "/admissions" },
      secondaryAction: { label: "Contact us", href: "/contact" },
    },
  },
  // DEVELOPMENT CONTENT for /academics: illustrative copy and stock
  // photography. No curriculum, board, grade range, subject list or
  // teaching method here is a claim about any real school. Replace the
  // stages with the school's own (add `range` only once confirmed), and add
  // `support` only when assessment and support arrangements are verified.
  academics: {
    seo: {
      title: "Academics",
      description: "How our school approaches learning: the ideas behind it, how students progress, and what learning looks like day to day.",
    },
    hero: {
      eyebrow: "Academic life",
      title: "Curiosity is where learning begins.",
      description:
        "Explore an approach to learning that encourages students to ask questions, develop understanding, and put ideas into practice.",
      media: { image: photo.youngScientist, focalPoint: "30% 40%", mobileFocalPoint: "28% 45%" },
    },
    philosophy: {
      eyebrow: "Our learning philosophy",
      title: "Understanding matters more than memorising.",
      paragraphs: [
        "We want students to leave each lesson knowing a little more and understanding it a little better. Knowledge matters; so does the ability to explain it, question it and use it.",
        "Learning builds over time. Ideas met early are revisited, connected and deepened, so that students gain both secure foundations and the confidence to go further.",
      ],
      principles: [
        {
          id: "foundations",
          title: "Secure foundations",
          description: "Reading, writing and number are the base everything else rests on, and they are given time.",
        },
        {
          id: "questions",
          title: "Room for questions",
          description: "Students are encouraged to ask why and how, and to treat not yet knowing as part of learning.",
        },
        {
          id: "application",
          title: "Ideas put to use",
          description: "Knowledge is applied in problems, projects and discussion, so that it lasts beyond the test.",
        },
      ],
      media: { image: photo.teacherGuidance, focalPoint: "60% 45%" },
      note: "Illustrative philosophy for development. Replace with the school's own approach to learning.",
    },
    programmes: {
      eyebrow: "Programmes",
      title: "A path that grows with each student.",
      description:
        "Learning is organised in stages, each building on the one before, so that students move on with the knowledge and habits they need.",
      stages: [
        {
          id: "early-years",
          name: "Early years",
          summary: "Play, language and early number, in a setting where young children feel safe to explore.",
          focus: ["Language and communication", "Early number", "Social confidence"],
        },
        {
          id: "primary",
          name: "Primary",
          summary: "Strong foundations in reading, writing and mathematics, alongside a broad introduction to the world.",
          focus: ["Literacy", "Numeracy", "Enquiry across subjects"],
        },
        {
          id: "middle-years",
          name: "Middle years",
          summary: "Deeper subject knowledge and growing independence, with more choice and responsibility.",
          focus: ["Subject depth", "Study habits", "Independence"],
        },
        {
          id: "senior-years",
          name: "Senior years",
          summary: "Specialised study and preparation for what comes next, with guidance along the way.",
          focus: ["Specialisation", "Independent research", "Next steps"],
        },
      ],
      pendingMessage: "Details of each stage will be published here once confirmed by the school.",
      subjects: {
        title: "Areas of learning",
        items: ["Languages", "Mathematics", "Sciences", "Humanities", "The arts", "Physical education"],
      },
      note: "Illustrative stages and areas of learning for development. They are not this school's programmes, grade ranges or subject offer.",
    },
    approach: {
      eyebrow: "How learning happens",
      title: "Learning that is active, shared and guided.",
      description: "A few of the ways students might engage with learning across a school day.",
      practices: [
        {
          id: "questioning",
          title: "Questioning and discussion",
          description:
            "Students explain their thinking, listen to others and test ideas aloud. Good questions are valued as much as good answers.",
          media: { image: photo.raisedHands, focalPoint: "50% 55%", mobileFocalPoint: "35% 55%" },
        },
        {
          id: "reading",
          title: "Reading and research",
          description: "Reading widely, finding things out and weighing up sources builds knowledge and independence.",
          media: { image: photo.readingTogether, focalPoint: "52% 50%" },
        },
        {
          id: "making",
          title: "Making and collaborating",
          description: "Projects ask students to plan, build and refine together, turning ideas into something real.",
          media: { image: photo.makingTogether, focalPoint: "45% 40%" },
        },
        {
          id: "feedback",
          title: "Guidance and feedback",
          description: "Teachers work alongside students, noticing what each one needs and helping them take the next step.",
          media: { image: photo.workbookFeedback, focalPoint: "55% 45%" },
        },
      ],
      note: "Illustrative practices for development, not a confirmed description of teaching at this school.",
    },
    closing: {
      title: "See learning for yourself.",
      description:
        "Find out how to join the school, or get in touch with any question about learning here.",
      primaryAction: { label: "Explore admissions", href: "/admissions" },
      secondaryAction: { label: "Contact the school", href: "/contact" },
    },
  },
  // DEVELOPMENT CONTENT for /campus: illustrative copy and stock photography
  // of other places, not this school's campus. No space listed here is a
  // claim that the school has that facility. Replace each space with the
  // school's own (and its own photographs), keep `details` to verified
  // facts, and add `practical` (accessibility, visits) only when supplied.
  campusPage: {
    seo: {
      title: "Campus",
      description: "The places where students learn, read, play, create and spend their school days.",
    },
    hero: {
      eyebrow: "Our campus",
      title: "Spaces that inspire discovery.",
      description: "Explore the environments where students learn, collaborate, create, and spend their school days.",
      media: { image: photo.gardenPlayground, focalPoint: "50% 62%", mobileFocalPoint: "46% 60%" },
      caption: "Illustrative photograph of school grounds, for development.",
      action: { label: "Explore the spaces", href: "#spaces" },
    },
    introduction: {
      eyebrow: "The learning environment",
      title: "The places around us shape the way we learn.",
      paragraphs: [
        "A good school building does more than keep the weather out. Light, room to move and a place for everything help students settle, concentrate and feel at home.",
        "Students spend their days in many kinds of space: quiet ones for reading and focused work, busy ones for making and experimenting, and open ones for play and sport. Moving between them is part of the rhythm of a school day.",
      ],
      note: "Illustrative introduction for development. Replace with the school's own description of its site.",
    },
    spaces: {
      eyebrow: "Explore the spaces",
      title: "Where the school day happens.",
      description: "A few of the kinds of space a school campus can bring together.",
      items: [
        {
          id: "classrooms",
          category: "Learning spaces",
          title: "Classrooms",
          description: "Calm, well-lit rooms where lessons begin, with space to work alone, in pairs or as a whole class.",
          media: { image: photo.emptyClassroom, focalPoint: "50% 60%" },
          caption: "Illustrative photograph: a classroom.",
        },
        {
          id: "music",
          category: "Creative activities",
          title: "Music and the arts",
          description: "Rooms for practising, rehearsing and performing, where students find their own ways to express ideas.",
          media: { image: photo.youngMusicians, focalPoint: "50% 35%" },
          caption: "Illustrative photograph: a music lesson.",
        },
        {
          id: "library",
          category: "Reading and research",
          title: "The library",
          description: "A quiet place to read, browse and research, and to discover books students might not have chosen otherwise.",
          media: { image: photo.glassLibrary, focalPoint: "55% 55%" },
          caption: "Illustrative photograph: a library reading room.",
        },
        {
          id: "science",
          category: "Science and practical learning",
          title: "Laboratories",
          description: "Practical spaces where students observe, measure and test ideas for themselves.",
          media: { image: photo.laboratory, focalPoint: "50% 50%" },
          caption: "Illustrative photograph: a laboratory bench.",
        },
        {
          id: "sport",
          category: "Sport and movement",
          title: "Sports grounds",
          description: "Room to run, train and compete, and to learn teamwork, persistence and fair play.",
          media: { image: photo.footballPitch, focalPoint: "50% 62%", mobileFocalPoint: "75% 60%" },
          caption: "Illustrative photograph: a football pitch.",
        },
        {
          id: "outdoors",
          category: "Outdoor environments",
          title: "Gardens and grounds",
          description: "Outdoor spaces for growing, exploring and taking a breath of fresh air between lessons.",
          media: { image: photo.schoolGarden, focalPoint: "30% 50%" },
          caption: "Illustrative photograph: a garden with raised beds.",
        },
      ],
      note: "Illustrative spaces and stock photographs for development. They do not show this school or confirm that it has these facilities.",
    },
    closing: {
      title: "See the campus for yourself.",
      description: "Find out how admissions work, or discover more about learning at the school.",
      primaryAction: { label: "Explore admissions", href: "/admissions" },
      secondaryAction: { label: "Discover academic life", href: "/academics" },
    },
  },
  // DEVELOPMENT CONTENT for /gallery: illustrative copy. The photographs
  // (`gallery` below and `featured` here) are stock images of other places,
  // not this school. Replace them with the school's own; themes with no
  // photographs are hidden automatically.
  galleryPage: {
    seo: {
      title: "Gallery",
      description: "Photographs of learning, creativity, sport, the outdoors and community in school life.",
    },
    hero: {
      eyebrow: "Life at our school",
      title: "A closer look at learning and life.",
      description: "Explore the moments, spaces, and shared experiences that shape a school community.",
    },
    featured: [
      {
        media: { image: photo.forestBallGame, focalPoint: "50% 55%", mobileFocalPoint: "55% 55%" },
        caption: "Play in the open air.",
      },
      {
        media: { image: photo.drawingTogether, focalPoint: "55% 50%" },
        caption: "Drawing side by side.",
      },
    ],
    collection: {
      eyebrow: "The collection",
      title: "Moments from the school year.",
      description: "Choose a theme, or browse everything. Select a photograph to see it larger.",
      categories: [
        { id: "learning", label: "Learning" },
        { id: "science", label: "Science and discovery" },
        { id: "arts", label: "Arts and music" },
        { id: "sport", label: "Sport and play" },
        { id: "outdoors", label: "Outdoors" },
        { id: "community", label: "Community" },
      ],
      allLabel: "All",
      note: "Illustrative stock photographs for development. They do not show this school, its pupils or its facilities.",
    },
    closing: {
      title: "There is more to see in person.",
      description: "Explore the spaces where these moments happen, or find out how to join the school.",
      primaryAction: { label: "Explore the campus", href: "/campus" },
      secondaryAction: { label: "Explore admissions", href: "/admissions" },
    },
  },
  // DEVELOPMENT CONTENT for /events: illustrative copy around the
  // illustrative entries in `events` below.
  eventsPage: {
    seo: {
      title: "Events",
      description: "Events, activities and gatherings across the school year, from performances to sport and community days.",
    },
    hero: {
      eyebrow: "What's happening",
      title: "Moments that bring our community together.",
      description: "Explore the activities, gatherings, and experiences that make school life memorable.",
    },
    featuredId: "sports-day",
    listing: {
      calendarTitle: "The school calendar",
      upcomingTitle: "Coming up",
      pastTitle: "Recently",
      undatedTitle: "Dates to be confirmed",
      noUpcoming: "New dates will be published here.",
      allLabel: "All",
    },
    categories: [
      { id: "learning", label: "Learning" },
      { id: "arts", label: "Arts and music" },
      { id: "sport", label: "Sport" },
      { id: "community", label: "Community" },
      { id: "admissions", label: "Admissions" },
    ],
    note: "Illustrative events for development, not this school's calendar. Dates, places and photographs are examples only.",
    closing: {
      title: "See school life in pictures.",
      description: "Browse photographs from across the school year, or get in touch with a question.",
      primaryAction: { label: "View the gallery", href: "/gallery" },
      secondaryAction: { label: "Contact the school", href: "/contact" },
    },
  },
  programs: [],
  facilities: [],
  testimonials: [],
  // DEVELOPMENT CONTENT (see eventsPage above): illustrative events, not this
  // school's calendar. Dates, times, places and photographs are examples;
  // none of these events is confirmed. Replace with verified entries, and
  // add `registration` only when registration is genuinely open.
  events: [
    {
      id: "sports-day",
      title: "Sports day",
      summary: "A day of races, team games and dance on the playing fields, with every year group taking part.",
      category: "sport",
      date: "2026-11-14",
      startTime: "09:00",
      endTime: "15:00",
      location: "School playing fields",
      media: { image: photo.ribbonDance, focalPoint: "50% 45%" },
    },
    {
      id: "art-exhibition",
      title: "Autumn art exhibition",
      summary: "Paintings, drawings and models from across the school, displayed for families to explore.",
      category: "arts",
      date: "2026-10-22",
      endDate: "2026-10-24",
      location: "Main hall",
      media: { image: photo.drawingsWall },
    },
    {
      id: "winter-concert",
      title: "Winter concert",
      summary: "Choirs, ensembles and soloists perform music they have been rehearsing through the term.",
      category: "arts",
      date: "2026-12-10",
      startTime: "18:00",
      endTime: "19:30",
      media: { image: photo.stageTrumpet, focalPoint: "45% 50%" },
    },
    {
      id: "open-morning",
      title: "Open morning for families",
      summary: "A chance to see lessons, meet teachers and ask questions about joining the school.",
      category: "admissions",
      date: "2027-01-16",
      startTime: "09:30",
      endTime: "12:00",
      link: { label: "About admissions", href: "/admissions" },
    },
    {
      id: "kite-afternoon",
      title: "Kite-flying afternoon",
      summary: "Families and students make and fly kites together on the field.",
      category: "community",
      status: "postponed",
      media: { image: photo.kiteField },
    },
    {
      id: "science-week",
      title: "Science week",
      summary: "Experiments, demonstrations and investigations across every year group.",
      category: "learning",
    },
    {
      id: "cultural-day",
      title: "Cultural celebration day",
      summary: "Students and families shared music, dress and food from the many cultures in the school community.",
      category: "community",
      date: "2026-09-19",
      media: { image: photo.culturalDay, focalPoint: "50% 35%" },
    },
    {
      id: "athletics",
      title: "Athletics meet",
      summary: "Track and field events, from sprints and relays to the long jump.",
      category: "sport",
      date: "2026-06-12",
    },
    {
      id: "museum-visit",
      title: "Museum visit",
      summary: "Younger students spent a morning exploring a local museum.",
      category: "learning",
      date: "2026-05-21",
      media: { image: photo.yellowHats, focalPoint: "50% 40%" },
    },
    {
      id: "spring-fair",
      title: "Spring fair",
      summary: "An example of an entry kept in the data but not yet published.",
      category: "community",
      published: false,
    },
  ],
  // DEVELOPMENT PHOTOGRAPHY (see galleryPage above): stock images, in display
  // order. `category` is a galleryPage.collection.categories id.
  gallery: [
    { id: "reading-at-desks", image: photo.brightClassroom, caption: "Reading in a bright classroom.", category: "learning" },
    {
      id: "pipette",
      image: photo.pipetteExperiment,
      caption: "A careful drop at a time.",
      category: "science",
      link: { label: "How learning happens", href: "/academics#approach" },
    },
    { id: "hoops", image: photo.hoopJump, caption: "Through the hoops.", category: "sport", focalPoint: "50% 60%" },
    { id: "ceramics", image: photo.ceramicPainting, caption: "Painting ceramic figures.", category: "arts" },
    { id: "heart-hands", image: photo.heartHands, caption: "Friends, together.", category: "community" },
    { id: "choir", image: photo.youngChoir, caption: "Voices in harmony.", category: "arts", focalPoint: "50% 35%" },
    { id: "classroom-friends", image: photo.classroomFriends, caption: "Between lessons.", category: "learning", focalPoint: "50% 40%" },
    { id: "plant-study", image: photo.plantStudy, caption: "Looking closely at living things.", category: "science" },
    {
      id: "tug-of-war",
      image: photo.tugOfWar,
      caption: "Pulling together.",
      category: "sport",
      link: { label: "Sports grounds", href: "/campus#space-sport" },
    },
    { id: "two-friends", image: photo.twoFriends, caption: "A conversation between friends.", category: "community", focalPoint: "50% 40%" },
    { id: "tall-grass", image: photo.tallGrass, caption: "Time outdoors.", category: "outdoors", focalPoint: "45% 70%" },
    { id: "plasma-ball", image: photo.plasmaBall, caption: "Seeing electricity at work.", category: "science", focalPoint: "45% 55%" },
    { id: "shared-desk", image: photo.sharedDesk, caption: "Working it out together.", category: "learning" },
    { id: "playground-game", image: photo.playgroundGame, caption: "A game on the playground.", category: "sport" },
    { id: "steps", image: photo.stepsTogether, caption: "Sitting out in the sun.", category: "community" },
  ],
  videos: [],
};
