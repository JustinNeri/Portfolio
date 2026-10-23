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
  /** Your own repository, not a fork. Shown without a label. */
  | "original"
  /** Shown as "Individual project". */
  | "individual"
  /** Shown as "Group project". */
  | "group"
  /** Shown as "Thesis project". */
  | "thesis"
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
  /** Short status shown beside the kind, e.g. "Not yet deployed". Optional. */
  status?: string;
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
  title: "Frontend" | "Backend & Database" | "AI & Computer Vision" | "Tools";
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

  // The portfolio link on your CV.
  url: "https://justinneri.vercel.app",

  contact: {
    email: "justinneripangilinan2004@gmail.com",
    github: "https://github.com/JustinNeri",
    linkedin: "https://www.linkedin.com/in/justin-neri-pangilinan-564527398/",
  },

  // Your CV as a PDF, opened by the "View CV" links. To update it, replace the
  // file in public/cv/ (keep the same name, or change this path).
  cvUrl: "/cv/justin-neri-pangilinan-cv.pdf",

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
  lead: "I'm Justin, a fourth-year Computer Science student at Holy Angel University and a full-stack engineer and developer, focused on software engineering and generative AI.",

  paragraphs: [
    "I've built and deployed full-stack applications, including an OJT hours and expense tracker and a library discussion-room reservation system.",
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
      // Backed by TulongGuro, which uses a Gemini vision-language model with
      // teacher review (see its entry under projects).
      title: "Generative AI",
      description:
        "Building AI models into applications, such as Gemini vision-language models that draft feedback for a person to review and approve, and developing with AI coding tools such as Codex, Claude and Antigravity.",
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
    name: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    url: "https://www.credly.com/badges/bdfcaca7-15cf-479d-8099-384b34b2015a/linked_in_profile",
  },
  {
    // Part of the Cisco AI Business Practitioner (AIBIZ) learning collection.
    name: "Optimizing Generative AI",
    issuer: "Cisco Networking Academy",
    url: "https://www.credly.com/badges/2567e45b-1599-4f3b-bc56-83001ee42199/linked_in_profile",
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
  {
    name: "Claude 101",
    issuer: "Anthropic (Claude Academy)",
    url: "https://academy.claude.com/verify/9eea07a142bb412ace802e7e8e2b2fee",
  },
  {
    name: "Introduction to Claude Cowork",
    issuer: "Anthropic (Claude Academy)",
    url: "https://academy.claude.com/verify/449ca9ccebe9b7fe9f0249588c6e70a2",
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
  allProjects:
    "Everything I've built so far: my own applications, my thesis, and group and individual coursework.",
  skills: "What I work with. Where one of my projects uses it, the project is named.",
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
    featured: false,
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

  // ── More projects ──────────────────────────────────────────────────────
  // Every published project is listed on /projects; `featured` picks the
  // three shown on the home page.

  {
    slug: "tulongguro",
    title: "TulongGuro",
    tagline: "AI-Assisted Grading and Classroom Management System",
    description:
      "A thesis project for the Computer Science program at Holy Angel University. TulongGuro is a learning management system for teachers in which a vision-language model reads student work, including photos of handwritten essays, against the teacher's rubric and drafts a score and feedback. The teacher reviews, edits and approves every result before a student sees it.",
    problem:
      "Large classes and paper-based workloads make timely, personal feedback hard for Philippine public school teachers, and most learning management systems only record grades. TulongGuro drafts rubric-based feedback on Grade 6 English work so the teacher can spend their time reviewing it instead of writing it from scratch.",
    features: [
      "AI-assisted checking: the model reads handwritten or typed submissions and drafts rubric-aligned scores, strengths, areas for growth and next steps.",
      "Human-in-the-loop review: teachers validate and can edit every AI draft, and releasing grades to students is a separate step.",
      "Separate Teacher, Student and Admin interfaces; school admins manage sections, course shells and student rosters.",
      "Progress dashboards that track mastery of curriculum competencies across activities.",
      "Badges that students earn from performance and milestones.",
      "Delivered as a progressive web app, so it runs on desktop and phones without an app store.",
    ],
    decisions: [
      {
        title: "The AI drafts; the teacher decides",
        detail:
          "Validation and release are separate acts, so a grade reaches a learner only after the teacher has reviewed the set and published it. The thesis abstract reports that raw AI drafts matched teacher-set performance bands in only about a quarter of cases, which is why the system is positioned as decision support and not as an automatic grader.",
      },
      {
        title: "Images are prepared on the server before the model sees them",
        detail:
          "Photographed or uploaded work is optimised server-side, then read and scored against the rubric in a single model call.",
      },
      {
        title: "A fallback model keeps checking available",
        detail:
          "Checking rotates between a primary and a fallback Gemini Flash model, so a class is read to one standard whichever one answers.",
      },
    ],

    // From your CV's TulongGuro bullets (four contributors on GitHub; you
    // have the second-most commits).
    contribution:
      "I co-developed TulongGuro in a four-member thesis team: a learning management system in which a Gemini vision-language model reads typed or handwritten student work against the teacher's rubric and drafts scores and feedback. I kept teachers in control with a human-in-the-loop review flow, where every AI draft is validated and editable and releasing grades to students is a separate step, and delivered separate Teacher, Student and Admin interfaces as a progressive web app, with progress dashboards for curriculum competencies and student badges.",

    technologies: [
      "React 19",
      "Vite",
      "Tailwind CSS 4",
      "React Router",
      "Node.js",
      "Express 5",
      "Prisma",
      "PostgreSQL (Supabase)",
      "Supabase Storage",
      "Google Gemini (Generative AI SDK)",
      "PWA",
      "Vercel & Render",
    ],
    kind: "thesis",
    year: "2026",
    repoUrl: "https://github.com/Damudachi/TulongGuro",
    liveUrl: "https://tulong-guro.vercel.app",
    cover: {
      src: "/projects/tulongguro/cover.webp",
      alt: "TulongGuro landing page with the headline “Grading that gives you your evenings back.”",
      width: 2400,
      height: 1500,
    },
    // TODO(justin): add in-app screenshots (grading review, dashboards).
    gallery: [],
    featured: true,
    published: true,
    source: {
      repository: "https://github.com/Damudachi/TulongGuro",
      files: [
        "README.md",
        "docs/ABSTRACT-250.txt",
        "package.json",
        "server/package.json",
        "repository description",
      ],
      notes:
        "Owned by Damudachi, not you; four GitHub contributors (Damudachi 189 commits, JustinNeri 141, neriahv 19, ShawnUriel 7 on 2026-10-11). The repository description calls it a thesis project for the CS program at HAU. Live URL from the repository responded 200; the cover is a capture of that landing page. The abstract also reports evaluation scores (ISO/IEC 25010, SUS, grading time) that are NOT shown on the site — add them yourself if your panel has approved the final figures.",
    },
  },

  {
    slug: "carepanion",
    title: "Carepanion",
    tagline: "Voice-Driven Reminder App for Wellness and Daily Care",
    description:
      "A group project: a Flutter mobile app for wellness and daily-care reminders. One person sets tasks and reminders for someone they look after, and the app reads reminders aloud and raises alarms on the other person's phone. It has not been deployed yet.",
    problem:
      "People who need help keeping up with daily care, such as medication or routines, can miss reminders that are only text on a screen. Carepanion pairs them with a companion or guardian who manages their tasks, and speaks the reminders aloud.",
    features: [
      "Two roles with their own screens: an assisted user, and a regular user who acts as their companion or guardian.",
      "Tasks and reminders with daily and calendar views; companions can add and edit tasks.",
      "Spoken reminders using text-to-speech, with local notifications.",
      "Full-screen alarms on Android that are rescheduled after the phone restarts.",
      "An emergency screen that alerts guardians.",
      "Sign-up by email, phone or Google, with data stored in Supabase.",
    ],

    // TODO(justin): this is a group project (five contributors on GitHub; you
    // have the most commits). Say which parts were yours. Until then the
    // "My contribution" block stays hidden.
    contribution: null,

    technologies: [
      "Flutter",
      "Dart",
      "Supabase",
      "flutter_tts (text-to-speech)",
      "Local notifications",
      "Kotlin (Android alarms)",
    ],
    kind: "group",
    status: "Not yet deployed",
    year: "2025",
    repoUrl: "https://github.com/adriann47/Carepanion",
    liveUrl: null,
    // The cover is the app's logo artwork (supplied by you), not a screenshot.
    // TODO(justin): add phone screenshots to public/projects/carepanion/ for a gallery.
    cover: {
      src: "/projects/carepanion/cover.webp",
      alt: "CarePanion logo in orange with the tagline “A Voice-Driven Reminder App for Wellness and Daily Care”",
      width: 1920,
      height: 1200,
    },
    gallery: [],
    featured: false,
    published: true,
    source: {
      repository: "https://github.com/adriann47/Carepanion",
      files: ["pubspec.yaml", "lib/ (screen and service file names)", "android/app/src/main/kotlin/"],
      notes:
        "Owned by adriann47, not you; five GitHub contributors (JustinNeri 54 commits, neriahv 47, ShawnUriel 24, EnzoProg-ctrl 4, adriann47 2 on 2026-10-11). The README is the default Flutter template, so the features above are inferred from dependency and source file names, not from documentation or a running app — check them. You told me it is a group project and not yet deployed.",
    },
  },

  {
    slug: "intelsy-ppe",
    title: "INTELSY PPE Detection",
    tagline: "YOLOv8 Personal Protective Equipment Detection System",
    description:
      "A group final project for INTELSY by the MIGHT Team. A YOLOv8 object-detection model fine-tuned on a labelled worksite dataset finds hardhats, safety vests, masks, gloves and goggles in images and webcam video, as well as the people and missing equipment, and turns each result into a short plain-language summary.",
    problem:
      "Checking that everyone on a construction site or factory floor is wearing their protective equipment is usually done by eye, and it is easy to miss someone. The project explores automating that check with object detection, as decision support for a safety officer rather than automatic enforcement.",
    features: [
      "Detects 14 classes, including Hardhat, Safety Vest, Mask, Gloves and Goggles and their NO- counterparts, plus Person, Ladder, Safety Cone and falls.",
      "Runs on single images, folders of images and live webcam video, drawing bounding boxes with class labels and confidence.",
      "Classes can be kept or hidden at inference time, with adjustable confidence and IoU thresholds.",
      "Each run writes a plain-language summary of what was detected and whether required PPE is missing.",
      "A ready checkpoint is included, so the webcam demo runs without training.",
      "One-command reproducible training run, with a script that builds the ablation table.",
    ],
    decisions: [
      {
        title: "Measured against a baseline, not just reported",
        detail:
          "A non-deep-learning baseline that predicts the most common class for every box scores 0.41 accuracy and 0.04 macro-F1, which gives the detector's numbers something to be compared against. Short ablation runs on image size and data fraction are tabulated alongside.",
      },
      {
        title: "The final model was trained in Colab",
        detail:
          "Training continued from an earlier checkpoint for 30 epochs at 640px on Google Colab. The candidate checkpoint reached 0.79 mAP@0.5 and 0.52 mAP@0.5:0.95 on the test split, while short CPU runs stayed for quick reproducibility.",
      },
      {
        title: "Decision support, not enforcement",
        detail:
          "The release notes are explicit that detections vary with occlusion, motion blur and small objects, so output is framed as an aid for a person checking compliance.",
      },
    ],

    // TODO(justin): this is a group project (four contributors on GitHub:
    // Damudachi 24 commits, neriahv 3, you 2, ShawnUriel 1). Your two commits
    // were a large update touching the docs, Makefile, run.sh, data.yaml and
    // scripts/detect.py (27 Mar 2026), and adding the shared webcam
    // checkpoint models/team_webcam_best.pt (28 Mar 2026). Say which parts
    // were yours. Until then the "My contribution" block stays hidden.
    contribution: null,

    technologies: [
      "Python",
      "YOLOv8 (Ultralytics)",
      "PyTorch",
      "OpenCV",
      "Roboflow",
      "Jupyter",
      "Google Colab",
      "pandas & scikit-learn",
    ],
    kind: "group",
    year: "2026",
    repoUrl: "https://github.com/ShawnUriel/MIGHT-TEAM_INTELSY",
    liveUrl: null,
    // Both images are crops of runs/detect_colab/colab_ppe_v_final/val_batch2_pred.jpg
    // in the repository — the model's own predictions on validation images
    // from the Roboflow dataset (CC BY 4.0).
    cover: {
      src: "/projects/intelsy-ppe/cover.webp",
      alt: "Six worksite photos with the model's detections drawn on them: hardhats boxed and labelled with confidence scores, and one person flagged NO-Safety Vest.",
      width: 1440,
      height: 900,
    },
    gallery: [
      {
        src: "/projects/intelsy-ppe/validation-predictions.webp",
        alt: "A four-by-four grid of construction-site photos with the model's hardhat and safety-vest detections drawn as labelled boxes.",
        width: 1920,
        height: 1920,
        caption: "Predictions on a validation batch from the final Colab run.",
      },
    ],
    featured: false,
    published: true,
    source: {
      repository: "https://github.com/ShawnUriel/MIGHT-TEAM_INTELSY",
      files: [
        "README.md",
        "docs/release_notes_v1.0.md",
        "data/data.yaml",
        "requirements.txt",
        "scripts/detect.py",
        "scripts/nlp_component_stub.py",
        "scripts/non_dl_baseline.py",
        "runs/detect_colab/colab_ppe_v_final/ (args.yaml, results.csv, val_batch2_pred.jpg)",
      ],
      notes:
        "Owned by ShawnUriel, not you; four GitHub contributors (Damudachi 24 commits, neriahv 3, JustinNeri 2, ShawnUriel 1 on 2026-10-20). Repository description: \"Final Project for INTELSY\". The README's results table shows only the early short ablation runs (mAP@0.5 around 0.06–0.08); the 0.79 / 0.52 figures come from the release notes' v1.0 candidate checkpoint, and the final Colab run's results.csv ends at 0.78 / 0.52. The README also links a model card, final report draft and slides that are not in the repository. The NLP summary uses string templates (an optional transformers path exists), and the RL part is a small Q-learning experiment, so neither is described as a feature. Not deployed.",
    },
  },

  {
    slug: "yumiscipe",
    title: "Yumiscipe",
    tagline: "Recipe Website",
    description:
      "An individual project: a multi-page recipe website built with plain HTML and CSS. It presents Filipino and American dishes, a best-recipe page, a list of dishes and an about page, with a layout that adapts to phones.",
    problem:
      "An early front-end project for practising page layout, navigation between pages and responsive design without a framework.",
    features: [
      "Home page with a banner, navigation and a dish search box.",
      "Separate pages for Filipino and American cuisine, a best recipe, and a list of dishes.",
      "About and login pages.",
      "Responsive layout with a collapsible menu on small screens.",
    ],

    // CONFLICT: you told me this is an individual project, but the live home
    // page says "BY JNP/KCP", which reads like two authors. If someone else
    // worked on it, change `kind` to "group" and reword this.
    contribution: "I built this site as an individual project.",

    technologies: ["HTML", "CSS", "JavaScript", "Vercel"],
    kind: "individual",
    year: "2024",
    repoUrl: "https://github.com/JustinNeri/Yumiscipe",
    liveUrl: "https://yumiscipe.vercel.app",
    cover: {
      src: "/projects/yumiscipe/cover.webp",
      alt: "Yumiscipe home page with a pink header, navigation, and a banner reading “Ready to explore new dishes with Yumiscipe!”",
      width: 2400,
      height: 1500,
    },
    gallery: [],
    featured: false,
    published: true,
    source: {
      repository: "https://github.com/JustinNeri/Yumiscipe",
      files: ["index.html", "about1.html", "login.html", "file list"],
      notes:
        "Your repository, not a fork; you are the only GitHub contributor. No README. Live URL (supplied by you) responded 200 on 2026-10-11; the cover is a capture of that home page.",
    },
  },
];

// ── Skills ───────────────────────────────────────────────────────────────
// Taken from the Technical Skills section of your CV, regrouped into four
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
        usedIn: ["carepanion"],
        confirmed: true,
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
        usedIn: ["tulongguro"],
        confirmed: true,
      },
      {
        name: "Python",
        usedIn: ["intelsy-ppe"],
        confirmed: true,
        note: "On your CV. Also seen in OPSYS_FINAL, which isn't listed.",
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
    // The "AI & Computer Vision" line of your CV.
    title: "AI & Computer Vision",
    skills: [
      { name: "YOLOv8", usedIn: ["intelsy-ppe"], confirmed: true },
      { name: "PyTorch", usedIn: ["intelsy-ppe"], confirmed: true },
      { name: "OpenCV", usedIn: ["intelsy-ppe"], confirmed: true },
      { name: "Object detection", usedIn: ["intelsy-ppe"], confirmed: true },
      {
        name: "Model evaluation (mAP, precision & recall)",
        usedIn: ["intelsy-ppe"],
        confirmed: true,
      },
      { name: "Roboflow", usedIn: ["intelsy-ppe"], confirmed: true },
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
/**
 * The order of the featured projects on the home page ("Selected work" and
 * "Featured projects"). A featured project missing from this list goes last.
 */
const featuredOrder = ["workbud", "tulongguro", "libspace"];

const featuredRank = (slug: string) => {
  const i = featuredOrder.indexOf(slug);
  return i === -1 ? featuredOrder.length : i;
};

export const featuredProjects = publishedProjects
  .filter((p) => p.featured)
  .sort((x, y) => featuredRank(x.slug) - featuredRank(y.slug))
  .slice(0, 3);

/** "Thesis project", "Group project"… or null when there is nothing to say. */
export function projectKindLabel(kind: ProjectKind): string | null {
  switch (kind) {
    case "individual":
      return "Individual project";
    case "group":
      return "Group project";
    case "thesis":
      return "Thesis project";
    case "fork":
      return "Fork";
    case "tutorial":
      return "Tutorial project";
    default:
      return null;
  }
}

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
