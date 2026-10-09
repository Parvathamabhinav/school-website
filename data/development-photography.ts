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
  friendsCourtyard: {
    src: "/images/development/student-life/friends-courtyard.webp",
    alt: "Four students in school uniform talking together beside a column in a sunlit school courtyard",
    width: 2000,
    height: 1635,
    blurDataURL:
      "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAABQAgCdASoQAA0AA4BaJZACdAYvrgcGn4vcw7AA/epB9tB+dYkgnud4imBr+bUCwxtuY6GAhhr471T4qGgz8B/9LIs115UlHNdY54SxvTcuoYBDgJiDMFAuxF9wq6IbWERzxXkvR97f0z+mIAA=",
    credit: unsplash("Trần Văn Sơn", "Nr2iTbrEIFc"),
  },
  footballMatch: {
    src: "/images/development/student-life/football-match.webp",
    alt: "Two pupils competing for the ball during a football match on a grass pitch",
    width: 1200,
    height: 1795,
    blurDataURL:
      "data:image/webp;base64,UklGRpAAAABXRUJQVlA4IIQAAACwAwCdASoQABgAPu1iqU2ppaOiMAgBMB2JQBYdg8duBeP9NEDpYAD8Jo9uO3ck3FgSa3yd1G+7MeckHsn8jmems1XJTVivv/OSb/FoPw2n8F5X27njYXF6OVcCbzbvQUC+b0vfkYJya2rcTUXcfVXKqEpK4P3eevAvis2uvsPVk6IAAAA=",
    credit: unsplash("Emilio Geremia", "7NlTUtJutUU"),
  },
  groupProject: {
    src: "/images/development/student-life/group-project.webp",
    alt: "A group of students gathered around a laptop, working through a project together",
    width: 2000,
    height: 1125,
    blurDataURL:
      "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADQAQCdASoQAAkAA4BaJZACdADpJNyn+AD9aaW/THjQfY0vqJtOnz4JNROS3HONwQ7HVXumUrM3eChBgsjxNn/tfa1V1wTjTEMz0H/1FDUFXJ9ejmEXzAAA",
    credit: unsplash("Vitaly Gariev", "EA0-iajPYFE"),
  },
  paintingStudio: {
    src: "/images/development/student-life/painting-studio.webp",
    alt: "A student painting at an easel while a teacher offers guidance in an art studio",
    width: 2000,
    height: 1125,
    blurDataURL:
      "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAACQAQCdASoQAAkAA4BaJZwC7ABf5EgA/u+RTLYnvvtRAxttfGBmAcBBYFOTG5sGbPPndBZ13Fuvw9UHVMduGGZJUcfHK76Of7uj+x71qHAKYbAH8AAAAA==",
    credit: unsplash("Vitaly Gariev", "120NQoMNpeA"),
  },
  libraryStudy: {
    src: "/images/development/hero/library-study.webp",
    alt: "A student studying at a long desk in a library lined with bookshelves",
    width: 1600,
    height: 1600,
    blurDataURL:
      "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAAAQAgCdASoQABAAA4BaJbACdAEORej15VnAAP55BpQUN42X1agnN9SLf/f24D1TsneZLmEPASbwP7fZmtq6sWV/J2fZg573IfPnILnlR2SSXxfpwX6FVjYu0t+1zBbwjPf7nXLIxGkN8la8Uz2AAAAA",
    credit: unsplash("Zoshua Colah", "klbApl9mxr0"),
  },
  campusWalk: {
    src: "/images/development/story/campus-walk.webp",
    alt: "Students walking and cycling past an ivy-covered stone school building",
    width: 2000,
    height: 1333,
    blurDataURL:
      "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAADQAQCdASoQAAsAA4BaJbACdACjfFvcAADOOm/ubrcIlhqiVarAHWmd4ocAlBYJqqqxl/2v4cM6ptVFbYXO0fxjiwnhKAXrSCt9dJFX5Ph8TAT86sDXxXmX4p+8TXDS4YmFBQAA",
    credit: unsplash("Joss Broward", "ev3Xqhr_0pI"),
  },
  campusWalkPortrait: {
    src: "/images/development/story/campus-walk-portrait.webp",
    alt: "Students walking and cycling past an ivy-covered stone school building",
    width: 1200,
    height: 1500,
    blurDataURL:
      "data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAADwAwCdASoQABQAPu1iqU2ppaOiMAgBMB2JbACdMoADaxX/VIUaSKUAAPZPJH+Pa0xXfTkSBTbTkA14hpBKRvxuq3vdI7MeHvLbczTZJRpbNeyIDjnByNmSlIRvFvRj2CGJyNOmTzTWli19ra3+5wO4yHp9wHCyP/hh/fHjAnwAAA==",
    credit: unsplash("Joss Broward", "ev3Xqhr_0pI"),
  },
  microscope: {
    src: "/images/development/learning/microscope.webp",
    alt: "A young student looking closely through a microscope",
    width: 2000,
    height: 1333,
    blurDataURL:
      "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAADQAQCdASoQAAsAA4BaJQBOgCK1S8ByAAD+9CtKPhbI+izaMzhzZoXzUyxHAvzTOJorMjXkOFWPZaIgNEAeGWumijVPjOS3eKyR3lNI+qY2QnfYDvWyzpKwfTAw4AAA",
    credit: unsplash("Anna Khromova", "ttJsGr4fF2A"),
  },
  classDiscussion: {
    src: "/images/development/learning/class-discussion.webp",
    alt: "A teacher leading a lively discussion with students seated at desks",
    width: 2000,
    height: 1125,
    blurDataURL:
      "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAAAwAgCdASoQAAkAA4BaJZACdAYtVbStFuSPfAD+6HyooqAAYCXS+e11/MaU+MrJaxRDVo/Yh1vFU8ihktFMIQpp5zEtIak45CKQeVMMQIW7gbbOd5CuAAAA",
    credit: unsplash("Vitaly Gariev", "RDf6Cvns88Q"),
  },
  designMaking: {
    src: "/images/development/learning/design-making.webp",
    alt: "A 3D printer beside a laptop and printed models, including a terrain map and a gear",
    width: 2000,
    height: 1333,
    blurDataURL:
      "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAACwAgCdASoQAAsAA4BaJZQC7H8AgqjLktstLWG76qAA/u2NRWZ1eCQlzJuX2AUF+k1/Etel+/APq6HZzxNLz1B5h2H02ETJ8F0wvfv6At7sti2iDK56+4ZlM/x27HSD8iNvLwIzbbNFVSEf02g26geyATZgAA==",
    credit: unsplash("ZMorph All-in-One 3D Printers", "FB1vd3XT_zQ"),
  },
  classroomCollaboration: {
    src: "/images/development/learning/classroom-collaboration.webp",
    alt: "Students gathered around shared tables in a busy, colourful classroom",
    width: 2000,
    height: 1245,
    blurDataURL:
      "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAAAwAgCdASoQAAoAA4BaJZQCw7EVcbhpPmLZwAD5LG2xHnPANxV/S8gvkrnwuXEUCnsFEPk4I8xtL/SjxBlUGNLTDvlH7bHeQcGUkXaWgNAAAA==",
    credit: unsplash("Quilia", "zFSo6bnZJTw"),
  },
  classroom: {
    src: "/images/development/campus/classroom.webp",
    alt: "A sunlit classroom with wooden desks and tall windows",
    width: 2000,
    height: 1333,
    blurDataURL:
      "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAAAwAgCdASoQAAsAA4BaJQBOgMXwyXnH460+AADOPU4lr66YKoLeuidmUzhHehqscB0YeeQSKa0CfTj/bPaSvKM6YX/MZjOu7AnmH6bIGgwf34QXoMKudV+o/aJByXwXfzy4t01bVgQAAA==",
    credit: unsplash("2y.kang", "dFohf_GUZJ0"),
  },
  laboratory: {
    src: "/images/development/campus/laboratory.webp",
    alt: "A science laboratory bench with glassware, samples and equipment",
    width: 2000,
    height: 1333,
    blurDataURL:
      "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAAAwAgCdASoQAAsAA4BaJYwC7ADcqgn0q49DAAD5d2pZL1fAhjimb+F0ywzW9mbDAbtUzMnwk1hETtgM2lybqrRuAjcqdppHNxfjxkbW9ddfS8HgAAA=",
    credit: unsplash("Adam Bezer", "z_w9KovAwYk"),
  },
  sportsField: {
    src: "/images/development/campus/sports-field.webp",
    alt: "An athletics track and playing field with students training in the distance",
    width: 2000,
    height: 1333,
    blurDataURL:
      "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADwAQCdASoQAAsAA4BaJagCdAD0OpNtkCgA/liWZP9Y841dtLJQub4UqnBpvTwgEKPh2qPLw8wJACW3FrPU/lmnqFKdY7BZt3P87AAA",
    credit: unsplash("Sincerely Media", "5lmm-rZ207I"),
  },
  artStudio: {
    src: "/images/development/campus/art-studio.webp",
    alt: "A bright art studio with wooden easels and stools",
    width: 2000,
    height: 1338,
    blurDataURL:
      "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAAAQAgCdASoQAAsAA4BaJZACdADcYs8AZNcAAP5rLC+Nn0RDMi20FcZxvl/WrbQ+ZzhhyL9S+qiDmD2ip2fBxrUfIbfgpW6NlpfGguwwJtAAAA==",
    credit: unsplash("Cat Guffin", "0Ip-dmYYIcI"),
  },
  welcomingClass: {
    src: "/images/development/admissions/welcoming-class.webp",
    alt: "A smiling teacher talking with a class of students seated at desks",
    width: 2000,
    height: 1125,
    blurDataURL:
      "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAAAQAgCdASoQAAkAA4BaJYgCsADicEjd9roAAP7m5T/fRG0pnkdXYXySx57tl42jRhdgdVQLMTrg8jRT+XT+GmtD3w1ungbR5LJwIEHmhfGiIlUthAR5iUG6aJTgAA==",
    credit: unsplash("Vitaly Gariev", "14jNrPntbgk"),
  },
  campusArrival: {
    src: "/images/development/admissions/campus-arrival.webp",
    alt: "Students walking along a sunny path towards a stone archway on campus",
    width: 1600,
    height: 1602,
    blurDataURL:
      "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAABwAgCdASoQABAAA4BaJZQCxC8AGZ/hip9muvMgAP2ao7ECpYOV8VFp/sMhOYDI4c9rIcVdePO8x1Gmni5sLNx/ghzpL3jkZs+Gb1Za7aydt5Di2drEbdGn7QAAAA==",
    credit: unsplash("Brelyn Bashrum", "MUiv880yORo"),
  },
  readingLibrary: {
    src: "/images/development/about/reading-library.webp",
    alt: "A young boy reading a large picture book at a table in a library",
    width: 2400,
    height: 1600,
    blurDataURL:
      "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAAAQAgCdASoQAAsAA4BaJbACdAED+ZG5R0gAAP7RRKyX8LTvR/XpSuIqf1Bbh6d2KIlfLF2w6/v7fgvKszfl/E+ktvb6JUv8mOw8vxzLU6oTf7+tUbzGgAAA",
    credit: unsplash("Anita Jankovic", "162ppyjclxM"),
  },
  classroomPupils: {
    src: "/images/development/about/classroom-pupils.webp",
    alt: "Pupils in school uniform at their desks in a classroom, one girl standing and smiling",
    width: 1400,
    height: 1750,
    blurDataURL:
      "data:image/webp;base64,UklGRqgAAABXRUJQVlA4IJwAAACwBACdASoQABQAPu1iqU2ppaOiMAgBMB2JZgC7G1/DyLIZ8LsUb3aFrVy0LmcAAP7jEmUhqlTC7Sd/pZogeiGWED6EUaH58ohX5nu7pW3Kro7pXoHmRfzhYR172B4NKc09w1E8OHAaBE4MI6orfhly578f5dF8Cqf2pt374mWxN49HfFKKMfmCN+Ftok7GhQGgnLGQiaDwPsO7wAA=",
    credit: unsplash("Sushanta Rokka", "LYL31WBHynQ"),
  },
  earlyYearsTable: {
    src: "/images/development/about/early-years-table.webp",
    alt: "Young children sitting around a small classroom table, one raising a hand",
    width: 1400,
    height: 1750,
    blurDataURL:
      "data:image/webp;base64,UklGRp4AAABXRUJQVlA4IJIAAABwBACdASoQABQAPu1iqU2ppaOiMAgBMB2JZgCdMoAlwRes5EWos32QXdM0AAD+6sgcTvuPmD94ACgthq+f/leJqPR7LazstXokAAx+bobrLvRiPqb6y3F2p75swbk3tRsC8Cl1DRzSAsOGt6ZVKRCkEIpNHwWtv195CZauT+AJgtYqZeDJJpiNgEotECLYgQ8AAA==",
    credit: unsplash("Anna Zwiefel", "eg63-okc-yg"),
  },
  playground: {
    src: "/images/development/about/playground.webp",
    alt: "Children climbing a rope frame together in a playground while an adult looks on",
    width: 1400,
    height: 1750,
    blurDataURL:
      "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAABQAwCdASoQABQAPu1iqU2ppaOiMAgBMB2JZQDE2Bh49eUlkAD+p4Jj6RNDy1S0oKZgmekLCm/dGFnfUBcKujq+KQL/HFEzPVY794dRvyOm1c9984oRVG/6aSAwDpLAV+h8pEWn1hgAAA==",
    credit: unsplash("Ahmet Yüksek", "-NuteFHjL3s"),
  },
  youngScientist: {
    src: "/images/development/academics/young-scientist.webp",
    alt: "A young girl in a lab coat and safety goggles smiling as she watches a science experiment",
    width: 2000,
    height: 1500,
    blurDataURL:
      "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAAAwAgCdASoQAAwAA4BaJZQCw7EDqa7NwozcUAD+ZlB/42c4P2e/ZlmwpUx1mSOFBKMxnyoUu8K9oMxjU4bUd38URLTL0Qzr6dTHQvjxHY+WcHlzmad1AfnXsqMAAA==",
    credit: unsplash("YY TEOH", "WAEqUyi5CZQ"),
  },
  teacherGuidance: {
    src: "/images/development/academics/teacher-guidance.webp",
    alt: "A teacher leaning over a pupil's desk to guide her written work in a classroom",
    width: 2000,
    height: 1333,
    blurDataURL:
      "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAAAwAgCdASoQAAsAA4BaJbACdAD0mDX7UfOtQAD+tqoTSspPlmEpSi1/4ECnUfQBRVRZgi3zaz3GusjeHkVlexDxohShMUFdgOF0K+QX+aBD4SaEmmJONIt5r2adVSuVBJ2N4B4gAAA=",
    credit: unsplash("Storyzangu Hub", "Ix-axXotEg0"),
  },
  raisedHands: {
    src: "/images/development/academics/raised-hands.webp",
    alt: "A full classroom of pupils in school uniform raising their hands to answer a question",
    width: 2000,
    height: 1335,
    blurDataURL:
      "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAADQAQCdASoQAAsAA4BaJQBOgCHZu1EoIAD+7NKHSi8x2xMzTOUivpkMhQ0Gn+w5Cz0GkuGNqc61yrjjqvAe3jRUHKXmVb4ebFcUpkrHqESisvxgFfFnDXCdtr/3UTfS8AgAAA==",
    credit: unsplash("Emmanuel Ikwuegbu", "M-4lFg1Xfag"),
  },
  readingTogether: {
    src: "/images/development/academics/reading-together.webp",
    alt: "Three children in school uniform reading books together on a large green net, seen from above",
    width: 2000,
    height: 1323,
    blurDataURL:
      "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAAAwAgCdASoQAAsAA4BaJbACdADG8Zfqhcj2AAD+5fE26rReRBio36z1mi/vT4hCHn0GqpYjGemwGU+XFFqBfeqmh4aX2loDg1TBNEjsIMyKbs1WlmR/wAjA/BdfBfrV4OiHmlMZnz6f1ZCwAAA=",
    credit: unsplash("Shivani Tibrewal", "xXzA1BxdCe4"),
  },
  makingTogether: {
    src: "/images/development/academics/making-together.webp",
    alt: "A group of children gathered around a 3D printer, watching a model being made",
    width: 2000,
    height: 1223,
    blurDataURL:
      "data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAAAQAgCdASoQAAoAA4BaJaACdAEQ4fjQeZgAAP7s2rS5PPPh7GDgVQTN/h7tXFu7r3NdE9M0TlKJmNrrhgX5q5gbYY7hOhjY/1nuWuBBu2AKSV95X1YbCD+/NI1qm5p1FhCjDwzituyL4Cn8dEzNmrwAAAA=",
    credit: unsplash("Adam Winger", "2fr56H6rgJk"),
  },
  workbookFeedback: {
    src: "/images/development/academics/workbook-feedback.webp",
    alt: "A teacher sitting beside a young pupil, talking him through the work in his exercise book",
    width: 2000,
    height: 1293,
    blurDataURL:
      "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAABQAgCdASoQAAoAA4BaJYgCdH8AguBsTf+/W9AA/oO5Q9/hWJ0hTZNWpA06eyvVMnWaWWxGs4PBquqL9beerptmAk7mdqbu5lYf40LChYjRUjzzbIW8fwVdLHbNjD0gEiEgAA==",
    credit: unsplash("Ronald Felton", "6c86TCPmNRQ"),
  },
} satisfies Record<string, ImageAsset>;
