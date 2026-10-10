/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — the one file to edit.
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  Everything the site says about you lives here: identity, contact links,
 *  the About text, projects and skills. Components only read from this file.
 *
 *  Conventions
 *  - `null` means "not supplied yet". The site hides anything that is null
 *    (a link, a section, a button) instead of showing a placeholder.
 *  - Search this file for `TODO(justin)` to find everything waiting on you.
 *  - Personal details, education, certifications and skills come from your
 *    CV. Project facts were checked against the public GitHub repositories
 *    on 2026-10-10; each project's `source` block records which repository
 *    and files support its description.
 *  - Search for `CONFLICT` to find places where the CV and a repository
 *    (or your earlier brief) disagree and you should decide which is right.
 */

// ── Types ────────────────────────────────────────────────────────────────

export type SiteConfig = {
  name: string;
  /** Short form used in the header mark. */
  initials: string;
  role: string;
  school: string;
  location: string;
  intro: string;
  /** Used for page titles, meta description and social cards. */
  seoDescription: string;
  /** Production URL, no trailing slash. Falls back to Vercel's own URL. */
  url: string | null;
  contact: {
    email: string | null;
    github: string | null;
    linkedin: string | null;
  };
  /** Path under /public (e.g. "/cv/my-cv.pdf") or a full URL. */
  cvUrl: string | null;
  /** Hero photo. Set to null to show the hero without a picture. */
  portrait: ProjectImage | null;
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  /** Honours or distinctions, exactly as you would state them. */
  honors: string[];
};

export type Certification = {
  name: string;
  /** Leave "" if unknown; the issuer line is then hidden. */
  issuer: string;
  /** Link to the credential, if you have one. Hidden while null. */
  url: string | null;
};

export type Experience = {
  role: string;
  organization: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type ProjectImage = {
  /** Path under /public. */
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type ProjectKind =
  /** Your own repository, not a fork. Team size / course context may still need confirming. */
  | "original"
  | "group"
  | "fork"
  | "tutorial";

export type Project = {
  slug: string;
  title: string;
  /** One line, shown under the title. */
  tagline: string;
  description: string;
  problem: string;
  /** Verified features, written as short sentences. */
  features: string[];
  /** Engineering decisions worth a recruiter's time. Optional. */
  decisions?: { title: string; detail: string }[];
  /**
   * Your specific contribution. Leave null until you have confirmed it —
   * the "My contribution" block stays hidden while this is null.
   */
  contribution: string | null;
  /** Honest, short list of what you would do next. Optional. */
  nextSteps?: string[];
  technologies: string[];
  kind: ProjectKind;
  year: string;
  repoUrl: string | null;
  liveUrl: string | null;
  cover: ProjectImage | null;
  gallery: ProjectImage[];
  /** Shown on the home page. Keep this to three or fewer. */
  featured: boolean;
  /** false = draft: no card, no page, not in the sitemap. */
  published: boolean;
  /** Where the description above comes from. Not rendered except the repo link. */
  source: {
    repository: string | null;
    files: string[];
    notes: string;
  };
};

export type SkillGroup = {
  title: "Frontend" | "Backend & Database" | "Tools";
  skills: Skill[];
};

export type Skill = {
  name: string;
  /** Project slugs where this technology is verifiably used. */
  usedIn: string[];
  /** false = hidden from the site until you confirm it. */
  confirmed: boolean;
  /** Private note for you; never rendered. */
  note?: string;
};

// ── Identity & contact ───────────────────────────────────────────────────

export const site: SiteConfig = {
  // The CV gives the name as "Justin Neri A. Pangilinan"; the site uses the
  // form without the middle initial. Change it here if you prefer the other.
  name: "Justin Neri Pangilinan",
  initials: "JNP",

  // CONFLICT: your first brief asked for "Computer Science Student & Aspiring
  // Software Engineer"; the CV headline is "Software Engineering Student |
  // Full-Stack Developer", while the degree is BS Computer Science. The CV
  // headline is used here — edit if you want the other.
  role: "Software Engineering Student & Full-Stack Developer",
  school: "Holy Angel University",
  // Province-level only, on purpose. The town on the CV is left out.
  location: "Pampanga, Philippines",
  intro:
    "I'm a fourth-year Computer Science student who has built and deployed three full-stack web applications — for OJT tracking, library room reservations and capstone consultations.",
  seoDescription:
    "Portfolio of Justin Neri Pangilinan, a fourth-year Computer Science student at Holy Angel University who builds full-stack web applications with React, Node.js and PostgreSQL.",

  // TODO(justin): set your production URL once deployed, e.g. "https://justinneri.dev".
  url: null,

  contact: {
    email: "justinneripangilinan2004@gmail.com",
    github: "https://github.com/JustinNeri",
    linkedin: "https://www.linkedin.com/in/justin-neri-pangilinan-564527398/",
  },

  // TODO(justin): this is the PNG image of your CV that you attached. Replace
  // it with a PDF (e.g. public/cv/justin-neri-pangilinan-cv.pdf) and update
  // this path — a PDF is sharper, searchable and readable by screen readers.
  cvUrl: "/cv/justin-neri-pangilinan-cv.png",

  // The hero photo: your studio portrait with the grey backdrop removed, so it
  // can sit on the purple glow (the untouched original is kept at
  // public/profile/portrait-original.png).
  // The source photo was only 414px wide, so it was enlarged 4x with an AI
  // super-resolution model. That sharpens edges but also invents fine detail.
  // TODO(justin): for a true-to-life result, supply a larger original (1500px+).
  portrait: {
    src: "/profile/portrait-cutout-v3.webp",
    alt: "Portrait of Justin Neri Pangilinan",
    width: 1624,
    height: 1620,
  },
};

// ── About ────────────────────────────────────────────────────────────────
// Who you are, what you focus on, and how you work. Based on your CV summary
// and what you told me.

export const about = {
  /** The large opening statement. */
  lead: "I'm Justin, a fourth-year Computer Science student at Holy Angel University focused on full-stack web development, software engineering and generative AI.",

  paragraphs: [
    "I've built and deployed three full-stack applications: an OJT hours and expense tracker, a library discussion-room reservation system, and a capstone consultation system.",
    "What draws me to software engineering is the problem-solving — taking something tedious or easy to get wrong and working out a clear, dependable way to handle it. I'm working toward a career as a software engineer.",
  ],

  /** The three things you do, shown as a row under the introduction. */
  focusAreas: [
    {
      title: "Full-stack web development",
      description:
        "React front ends, Node.js and Express APIs, and PostgreSQL databases, taken from schema design through to a deployed app.",
    },
    {
      title: "Software engineering",
      description:
        "The parts users never see: secure APIs, role-based workflows, and rules enforced in the database, like preventing two groups from booking the same room.",
    },
    {
      // TODO(justin): you asked for generative AI to be included. This line is
      // based on your TulongGuro description (a vision-language model drafting
      // feedback that a teacher reviews). No public code backs it up yet, so
      // adjust it to describe the generative AI work you have actually done.
      title: "Generative AI",
      description:
        "Building AI models into applications, such as vision-language models that draft feedback for a person to review and approve.",
    },
  ],

  facts: [
    { label: "Degree", value: "BS Computer Science" },
    { label: "University", value: "Holy Angel University" },
    { label: "Year", value: "Fourth year" },
    { label: "Based in", value: "Pampanga, Philippines" },
  ],
};

// ── Education, certifications, experience ────────────────────────────────

export const education: Education[] = [
  {
    school: "Holy Angel University",
    degree: "Bachelor of Science in Computer Science",
    period: "2023 – Present",
    honors: ["Consistent President's Lister"],
  },
];

// Names are the titles shown on each credential page. An entry with a `url`
// is a link on the site; `url: null` renders as plain text.
// TODO(justin): add dates if you want them shown.
export const certifications: Certification[] = [
  {
    name: "CompTIA IT Fundamentals+ (ITF+) Certification",
    issuer: "CompTIA",
    url: "https://www.credly.com/badges/136f2975-91ae-4e7f-b335-e2ad50deff54/linked_in_profile",
  },
  {
    name: "AWS Academy Graduate – Cloud Foundations",
    issuer: "AWS Academy",
    url: "https://www.credly.com/badges/fca3ea65-69d2-446c-aefa-5038709cf841/linked_in_profile",
  },
  {
    name: "Legacy Responsive Web Design V8",
    issuer: "freeCodeCamp",
    url: "https://www.freecodecamp.org/certification/justinneri/responsive-web-design",
  },
  {
    name: "Relational Database V8",
    issuer: "freeCodeCamp",
    url: "https://www.freecodecamp.org/certification/justinneri/relational-database-v8",
  },
  {
    name: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy",
    url: "https://www.credly.com/badges/122e6818-e233-4365-8240-b96beba82ac3/linked_in_profile",
  },
  {
    name: "Data Analytics Essentials",
    issuer: "Cisco Networking Academy",
    url: "https://www.credly.com/badges/644ae1f9-9d54-4af9-bb43-35160cc78b04/linked_in_profile",
  },
  {
    name: "Endpoint Security",
    issuer: "Cisco Networking Academy",
    url: "https://www.credly.com/badges/871d556d-e01e-4e89-83ed-f2fd2d6770ae/linked_in_profile",
  },
  {
    name: "Cyber Threat Management",
    issuer: "Cisco Networking Academy",
    url: "https://www.credly.com/badges/9c6ce74a-8eee-443b-bd61-01550cab6278/linked_in_profile",
  },
  {
    name: "AI Fundamentals with IBM SkillsBuild",
    issuer: "Cisco Networking Academy",
    url: "https://www.credly.com/badges/0859cf9d-9505-4c99-aaf7-a1bd2d0026d5/linked_in_profile",
  },
  {
    // TODO(justin): confirm the issuer — the credential page didn't state it
    // in the part I could read; IBM SkillsBuild is my assumption.
    name: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    url: "https://www.credly.com/badges/3b155683-a2eb-4d87-ad3d-02a3a0f014e7/linked_in_profile",
  },
  {
    name: "Introduction to Figma Basics",
    issuer: "Simplilearn SkillUp",
    url: "https://simpli-web.app.link/e/xOdnjJ6Z76b",
  },

  // These have no public credential page. To link one to a PDF: save the file in public/certificates/ and set `url`
  // to its path, e.g. "/certificates/generative-ai-literacy.pdf".
  {
    // Title and issuer as printed on the certificate (No. 26025510, 10 Oct 2026).
    name: "SkillQuest – Generative AI Literacy",
    issuer: "Simplilearn SkillUp",
    url: "/certificates/generative-ai-literacy.pdf",
  },
  {
    // Course completed; no Credly badge was issued, so this isn't called a badge.
    name: "CCNA: Introduction to Networks (course completion)",
    issuer: "Cisco Networking Academy",
    url: null,
  },
];

// Your CV lists no work experience, so this is empty and the Experience
// section stays hidden. TODO(justin): add entries here (your OJT placement,
// for example) and the section appears automatically.
export const experience: Experience[] = [];

/** Short introductions shown under each section heading. */
export const sectionCopy = {
  projects: "Three full-stack applications, each built, deployed and documented.",
  skills: "What I work with. Where a featured project uses it, the project is named.",
  education: "My degree, and the certifications and badges I've completed.",
  experience: "Where I've worked.",
  contact:
    "I'm pursuing a career as a software engineer. If you'd like to talk about a role, or about any of the projects here, I'd be glad to hear from you.",
};

// ── Projects ─────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: "workbud",
    title: "WorkBud",
    tagline: "OJT Hours and Expense Tracker",
    description:
      "A mobile-first, installable web app for tracking on-the-job-training hours and what a placement costs. You log each day's time in, time out, break and expenses, and it keeps a running hour total, an itemised view of spending, and an export to hand to a coordinator.",
    problem:
      "OJT hours are usually tracked on paper or in a notes app, and the out-of-pocket cost of commuting and meals often isn't tracked at all until the money is gone. Students need to know how many required hours are left, whether they will finish before the deadline, and what the placement is costing them.",
    features: [
      "Daily log with time in, time out, unpaid break, a work note and itemised expenses by category.",
      "Dashboard with a progress ring, deadline countdown, required daily pace and an expected finish date.",
      "Daily and monthly budget meters, plus a catch-up figure that spreads an overspend across the days left in the month.",
      "Several jobs at once, each with its own target hours, deadline, budgets and logs.",
      "Milestones with due dates, and automatic hour badges at 25, 50, 75 and 100 percent of the target.",
      "Export of any date range as a printable time log or CSV.",
      "Email-and-password accounts verified by an emailed code, with password reset and profile pictures.",
      "Installable as a PWA; the app shell loads offline.",
    ],
    decisions: [
      {
        title: "Row Level Security stays on behind the API",
        detail:
          "All app data goes through an Express API, but the server queries Postgres as the signed-in user rather than with an admin key. Even if a route had a bug, the database would still refuse to show or change another user's rows.",
      },
      {
        title: "A day and its expenses save in one transaction",
        detail:
          "A database function saves a daily log together with its expense rows and computes the day's total from the rows it stored. Any total sent by the browser is ignored.",
      },
      {
        title: "Shift maths handles real shifts",
        detail:
          "Hours are derived from the times entered, a shift in progress counts up live, and an overnight shift such as 10pm to 6am is 8 hours rather than a negative number.",
      },
      {
        title: "Stale data never comes from the service worker",
        detail:
          "API and Supabase requests bypass the service worker (network-only), so the offline app shell can never serve an old login or old data.",
      },
    ],

    // From your CV's WorkBud bullets.
    // CONFLICT: the CV says you built the Express REST API; the repository's
    // AI-USAGE.md (entry 1.16) says the Express server was written by Claude
    // and reviewed by you, and section 3 lists the parts you wrote yourself.
    // The last sentence below acknowledges that. Reword this so it matches
    // what you are comfortable explaining in an interview.
    contribution:
      "I built and deployed WorkBud as an installable web app with a React interface, an Express REST API and a PostgreSQL database on Supabase. I designed the five-table schema with Row Level Security to isolate each user's data, secured API requests with token authentication, server-side validation and rate limiting, and documented the setup, deployment and security controls for the Vercel release. The project was built with AI assistance, which is documented in the repository.",

    nextSteps: [
      "Unit tests for the shift and date maths before adding new features.",
      "A save queue so a day logged offline syncs when the connection returns.",
      "Finish editing and deleting individual expense rows.",
    ],
    technologies: [
      "React 19",
      "Vite",
      "Tailwind CSS 4",
      "React Router",
      "Node.js",
      "Express 5",
      "Supabase (Postgres, Auth, Storage)",
      "Row Level Security",
      "vite-plugin-pwa",
      "Vercel",
    ],
    kind: "original",
    year: "2026",
    repoUrl: "https://github.com/JustinNeri/WorkBud",
    liveUrl: "https://workbud-ph.vercel.app",
    cover: {
      src: "/projects/workbud/cover.webp",
      alt: "WorkBud sign-in screen: a headline reading “Every hour and every peso, in one place” beside the sign-in form.",
      width: 2400,
      height: 1500,
    },
    // These five come from docs/assets/ in the repository (small, ~700px wide).
    // TODO(justin): replace with full-resolution captures of the signed-in app
    // when you can — 1600px wide or more looks best.
    gallery: [
      {
        src: "/projects/workbud/dashboard.webp",
        alt: "WorkBud dashboard on phone and desktop, showing the hours progress ring, expected finish date, budget and milestones.",
        width: 684,
        height: 422,
        caption: "Dashboard — hours progress, pace, budget and milestones.",
      },
      {
        src: "/projects/workbud/log-sheet.webp",
        alt: "WorkBud log-a-day sheet with date, time in, time out, break minutes and an itemised expense.",
        width: 701,
        height: 452,
        caption: "Logging a day — shift times and itemised expenses.",
      },
      {
        src: "/projects/workbud/export.webp",
        alt: "WorkBud export sheet for choosing a date range and export type.",
        width: 687,
        height: 409,
        caption: "Export — a time log or full record for any date range.",
      },
      {
        src: "/projects/workbud/onboarding.webp",
        alt: "WorkBud onboarding screens for setting up a profile and first job.",
        width: 716,
        height: 388,
        caption: "Onboarding — profile and first job.",
      },
      {
        src: "/projects/workbud/settings.webp",
        alt: "WorkBud settings sheet with profile details.",
        width: 745,
        height: 495,
        caption: "Settings — profile, currency and account.",
      },
    ],
    featured: true,
    published: true,
    source: {
      repository: "https://github.com/JustinNeri/WorkBud",
      files: [
        "README.md",
        "AI-USAGE.md",
        "docs/01-proposal.md",
        "client/package.json",
        "server/package.json",
        "docs/assets/*.png (gallery screenshots)",
      ],
      notes:
        "Not a fork; you are the only listed GitHub contributor. The README says the layout follows a course template and that the project was built with AI assistance (documented in AI-USAGE.md). Live URL responded 200 on 2026-10-10; the cover is a capture of that live sign-in page. Features are as documented in the README — the signed-in flows were not exercised.",
    },
  },

  {
    slug: "consulttrack",
    title: "ConsultTrack",
    tagline: "Capstone Consultation Management System",
    description:
      "A consultation system for a university capstone program, built for Holy Angel University. A thesis group books time from the hours their adviser has published; the adviser approves, offers another time, or declines with a reason. After the session, minutes, attendance and action items are recorded.",
    problem:
      "Capstone programs ask each group for a signed record of the consultations they held, and it tends to be reconstructed from memory in the last week of term. ConsultTrack assembles that record from sessions as they happen.",
    features: [
      "Advisers publish recurring weekly consultation hours; students book from a slot picker showing which times are open or taken.",
      "A student's booking is a request: the adviser approves it, declines with a reason, or makes one counter-offer the group can accept.",
      "Either side can ask to move or cancel a scheduled session.",
      "A message thread per consultation, with unread counts.",
      "Session wrap-up records minutes, optional attendance and action items with assignees and due dates.",
      "A printable consultation record listing every session a group has held.",
      "Student or adviser role is decided by the email domain at sign-up, verified with a 6-digit emailed code.",
    ],
    decisions: [
      {
        title: "Booking rules are enforced on the server",
        detail:
          "The API checks that a requested time sits on a slot boundary inside a published block and that the slot isn't already held by a pending or scheduled session — the slot picker alone isn't trusted.",
      },
      {
        title: "A counter-offer never moves the meeting by itself",
        detail:
          "An offered time is stored separately from the meeting date and only replaces it when the group accepts. A live offer holds its slot, and it stops counting once its time has passed, so nothing has to sweep the table.",
      },
      {
        title: "Wrap-up is one transaction",
        detail:
          "Closing a session and writing its action items happen together, so a session can't end up closed with its tasks lost.",
      },
      {
        title: "Password reset doesn't reveal who is registered",
        detail:
          "The forgot-password reply is identical whether or not the address has an account, and a successful reset revokes every other session.",
      },
    ],

    // From your CV's ConsultTrack bullets (14 migrations verified in the repo).
    // TODO(justin): the CV calls this a capstone consultation system — if it
    // was built with a group, say which parts were yours.
    contribution:
      "I built and deployed the system, covering adviser schedules, booking approvals, counter-proposals and cancellations. I implemented 14 PostgreSQL schema migrations with Row Level Security, added email OTP registration, role assignment and rate-limited account recovery, and brought consultation follow-ups into one place with message threads, unread tracking and printable records of minutes, attendance and action items.",

    nextSteps: [
      "Email notifications and reminders — notices are in-app only today.",
      "Refresh expiring sessions instead of returning to the sign-in screen.",
    ],
    technologies: [
      "React 18",
      "Vite",
      "Tailwind CSS 4",
      "Node.js",
      "Express",
      "PostgreSQL (parameterized SQL via pg)",
      "Supabase Auth (email OTP)",
      "Vercel",
    ],
    kind: "original",
    year: "2026",
    repoUrl: "https://github.com/JustinNeri/ConsultTrack",
    liveUrl: "https://consult-track.vercel.app",
    cover: {
      src: "/projects/consulttrack/cover.webp",
      alt: "ConsultTrack sign-in screen with the sign-in form centred over a photograph of the Holy Angel University campus.",
      width: 2400,
      height: 1500,
    },
    // TODO(justin): the repository has no screenshots. Add captures of the
    // signed-in app (dashboard, slot picker, consultation record) to
    // public/projects/consulttrack/ and list them here.
    gallery: [],
    featured: true,
    published: true,
    source: {
      repository: "https://github.com/JustinNeri/ConsultTrack",
      files: [
        "README.md",
        "client/package.json",
        "server/package.json",
        "supabase/migrations/ (file list)",
      ],
      notes:
        "Not a fork; you are the only listed GitHub contributor. Whether this is your own capstone, a course project or a group effort is not stated in the repository. Live URL responded 200 on 2026-10-10; the cover is a capture of that live sign-in page. Features are as documented in the README — the signed-in flows were not exercised.",
    },
  },

  {
    slug: "libspace",
    title: "LibSpace",
    tagline: "Library Discussion Room Reservation System",
    description:
      "A room-reservation app for the Holy Angel University library. Students check real-time availability of the discussion rooms and request one remotely; front-desk staff approve requests, check groups in and manage rooms and opening hours.",
    problem:
      "Discussion rooms were reserved through a physical logbook at the library, so students couldn't see what was free without going there. LibSpace replaces the logbook with a live availability grid and a request-and-approve flow.",
    features: [
      "Rooms-by-half-hour availability grid for the chosen day, updated in real time.",
      "Booking requests with group size and a photo of each member's student ID; staff approve or decline and the student is notified in the app.",
      "Front-desk check-in and check-out, with rooms nobody claims within the grace period released to other students.",
      "Staff tools to add, edit and retire rooms, set opening hours per room and weekday, and block time for maintenance.",
      "Library rules — grace period, booking limits, hours per day, how far ahead booking opens — editable by staff.",
      "One layout for phone and desktop: a tab bar on small screens, a side rail on large ones.",
    ],
    decisions: [
      {
        title: "Double-booking is rejected by the database",
        detail:
          "A GiST exclusion constraint in Postgres refuses overlapping reservations for the same room. Two requests racing for a slot can't both win, which the UI alone could not guarantee.",
      },
      {
        title: "Rules live in triggers, not the client",
        detail:
          "The library's booking rules are enforced by a database trigger, and the student email restriction is a check constraint, so a forged client can't skip them.",
      },
      {
        title: "ID photos stay private",
        detail:
          "Student ID photos go to a private storage bucket where each user can only write to their own folder, and they are shown through short-lived signed URLs rather than public links.",
      },
      {
        title: "Staff accounts can't be self-assigned",
        detail:
          "Everyone signs up as a student. An account becomes staff only when the role is changed directly in the database.",
      },
      {
        title: "One declared list drives both navigations",
        detail:
          "Every view is declared once and rendered as a side rail on desktop and a tab bar on phones, so a view can't appear in one and go missing in the other.",
      },
    ],

    // From your CV's LibSpace bullets (exclusion constraint, private ID-photo
    // bucket and signed URLs verified in the repo).
    // TODO(justin): if this was a group project, say which parts were yours.
    contribution:
      "I developed the reservation system for the library's 10 discussion rooms, including live availability, student bookings and staff approvals. I prevented overlapping bookings with a PostgreSQL exclusion constraint, automated booking limits, notifications, check-in/check-out and no-show releases, and protected student ID photos with private storage, per-user access policies and signed URLs.",

    technologies: [
      "React 19",
      "Vite",
      "Tailwind CSS 4",
      "Supabase (Postgres, Auth, Realtime, Storage)",
      "Row Level Security",
      "Vercel",
    ],
    kind: "original",
    year: "2026",
    repoUrl: "https://github.com/JustinNeri/LibSpace",
    liveUrl: "https://libspace-flax.vercel.app",
    cover: {
      src: "/projects/libspace/cover.webp",
      alt: "LibSpace sign-in screen with the sign-in form centred over a green-tinted photograph of the Holy Angel University library.",
      width: 2400,
      height: 1500,
    },
    // TODO(justin): the repository has no screenshots. Add captures of the
    // availability grid, booking sheet and staff panel to
    // public/projects/libspace/ and list them here.
    gallery: [],
    featured: true,
    published: true,
    source: {
      repository: "https://github.com/JustinNeri/LibSpace",
      files: ["README.md", "package.json", "supabase/schema.sql", "src/components/IdPhotoStrip.jsx"],
      notes:
        "Not a fork; you are the only listed GitHub contributor. Team size and course context are not stated in the repository. Live URL responded 200 on 2026-10-10; the cover is a capture of that live sign-in page. Features are as documented in the README — the signed-in flows were not exercised.",
    },
  },

  // ── Drafts ─────────────────────────────────────────────────────────────
  // These two came from your brief but have no usable public repository yet
  // (TulongGuro: none found; Carepanion: the public repos are empty). They are
  // unpublished, so nothing renders. To publish one: fill in the TODOs, set
  // `published: true`, and set `featured: true` if it should replace one of
  // the three above on the home page.

  {
    slug: "tulongguro",
    title: "TulongGuro",
    tagline: "VLM-integrated LMS gradebook",
    description:
      "A VLM-integrated LMS gradebook designed to support automated feedback on Grade 6 English assessments, with teacher review and final approval.",
    problem: "TODO(justin): describe the problem this addresses.",
    features: [], // TODO(justin)
    contribution: null, // TODO(justin)
    technologies: [], // TODO(justin)
    kind: "original", // TODO(justin): confirm — solo, group or thesis project?
    year: "", // TODO(justin)
    repoUrl: null, // TODO(justin)
    liveUrl: null, // TODO(justin)
    cover: null, // TODO(justin): add public/projects/tulongguro/cover.webp
    gallery: [],
    featured: false,
    published: false,
    source: {
      repository: null,
      files: [],
      notes: "Starter description from your brief. No public repository found on 2026-10-10.",
    },
  },
  {
    slug: "carepanion",
    title: "Carepanion",
    tagline: "Voice-driven reminder app",
    description: "A voice-driven reminder app for wellness and daily care.",
    problem: "TODO(justin): describe the problem this addresses.",
    features: [], // TODO(justin)
    contribution: null, // TODO(justin)
    technologies: [], // TODO(justin)
    kind: "original", // TODO(justin): confirm
    year: "", // TODO(justin)
    repoUrl: null, // TODO(justin)
    liveUrl: null, // TODO(justin)
    cover: null, // TODO(justin): add public/projects/carepanion/cover.webp
    gallery: [],
    featured: false,
    published: false,
    source: {
      repository: null,
      files: [],
      notes:
        "Starter description from your brief. The public Carepanion repositories (UPDATED_CAREPANION, CarePanionTest and similar) contained no code on 2026-10-10.",
    },
  },
];

// ── Skills ───────────────────────────────────────────────────────────────
// Taken from the Technical Skills section of your CV, regrouped into three
// lists. `usedIn` names the featured projects whose code or dependency files
// show the skill. `confirmed: false` entries are hidden from the site.

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      { name: "JavaScript", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      { name: "HTML & CSS", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      { name: "Tailwind CSS", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      { name: "Vite", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      {
        name: "Flutter & Dart",
        usedIn: [],
        confirmed: true,
        note: "On your CV. Seen in FINAL_CLOUDCOM and CLOUDCOM_pokemon, which aren't featured.",
      },
      {
        name: "TypeScript",
        usedIn: [],
        confirmed: false,
        note: "TODO(justin): not on your CV and not in the featured repos. This portfolio is TypeScript — list it only if you're comfortable with it.",
      },
      {
        name: "Next.js",
        usedIn: [],
        confirmed: false,
        note: "TODO(justin): same as TypeScript.",
      },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js & Express", usedIn: ["workbud", "consulttrack"], confirmed: true },
      { name: "REST API development", usedIn: ["workbud", "consulttrack"], confirmed: true },
      {
        name: "Authentication & role-based access",
        usedIn: ["workbud", "consulttrack", "libspace"],
        confirmed: true,
      },
      { name: "PostgreSQL & SQL", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      { name: "Row Level Security", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      {
        name: "SQL functions, triggers & constraints",
        usedIn: ["workbud", "libspace"],
        confirmed: true,
      },
      { name: "Rate limiting", usedIn: ["workbud", "consulttrack"], confirmed: true },
      {
        name: "Generative AI integration",
        usedIn: [],
        confirmed: true,
        note: "You told me you do generative AI (TulongGuro integrates a vision-language model). Not verifiable from a public repo yet.",
      },
      {
        name: "Python",
        usedIn: [],
        confirmed: true,
        note: "On your CV. Seen in OPSYS_FINAL, which isn't featured.",
      },
      {
        name: "Java",
        usedIn: [],
        confirmed: true,
        note: "On your CV. CONFLICT (minor): none of your public repositories contain Java — fine to keep, just be ready to talk about it.",
      },
    ],
  },
  {
    title: "Tools",
    skills: [
      {
        name: "Supabase (Auth, Realtime, Storage)",
        usedIn: ["workbud", "consulttrack", "libspace"],
        confirmed: true,
      },
      { name: "Vercel", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      { name: "Git & GitHub", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      {
        name: "Figma",
        usedIn: [],
        confirmed: true,
        note: "Not in the CV's skills list, but you hold an Introduction to Figma certification. Set to false to hide.",
      },
    ],
  },
];

// ── Helpers (no need to edit) ────────────────────────────────────────────

export const publishedProjects = projects.filter((p) => p.published);
export const featuredProjects = publishedProjects.filter((p) => p.featured).slice(0, 3);

export function getProject(slug: string): Project | undefined {
  return publishedProjects.find((p) => p.slug === slug);
}

export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Education", href: "/#education" },
  { label: "Contact", href: "/#contact" },
] as const;

/** Absolute site URL for metadata. Works on Vercel without configuration. */
export const siteUrl =
  site.url ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
