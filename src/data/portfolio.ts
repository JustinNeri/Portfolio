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
 *  - Project facts were taken from the public GitHub repositories on
 *    2026-10-10. Each project's `source` block records which repository and
 *    which files support its description.
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
  /** Path under /public (e.g. "/resume.pdf") or a full URL. */
  resumeUrl: string | null;
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
  name: "Justin Neri Pangilinan",
  initials: "JNP",
  role: "Computer Science Student & Aspiring Software Engineer",
  school: "Holy Angel University",
  location: "Philippines",
  intro:
    "I build useful web applications — tools that take everyday paperwork like time logs, consultation records and room logbooks, and make them easier to keep.",
  seoDescription:
    "Portfolio of Justin Neri Pangilinan, a fourth-year Computer Science student at Holy Angel University building practical web applications.",

  // TODO(justin): set your production URL once deployed, e.g. "https://justinneri.dev".
  url: null,

  contact: {
    // TODO(justin): add the email address you want recruiters to use.
    email: null,
    github: "https://github.com/JustinNeri",
    // TODO(justin): add your LinkedIn profile URL.
    linkedin: null,
  },

  // TODO(justin): put your résumé at public/resume.pdf and set this to "/resume.pdf".
  resumeUrl: null,
};

// ── About ────────────────────────────────────────────────────────────────
// Written only from what you told me plus what your repositories show.
// No experience, awards or certifications are claimed here.

export const about = {
  paragraphs: [
    "I'm Justin, a fourth-year Computer Science student at Holy Angel University in the Philippines, working toward a career as a software engineer.",
    "What draws me to software engineering is the problem-solving: taking something tedious or easy to get wrong, and working out a clear, dependable way to handle it.",
    "Most of what I build starts from a practical need close to student life — logging internship hours, booking a thesis consultation, reserving a library room — and I like carrying an idea through to an application people can open and use.",
  ],
  facts: [
    { label: "Studying", value: "Computer Science, fourth year" },
    { label: "At", value: "Holy Angel University" },
    { label: "Based in", value: "Philippines" },
    { label: "Focus", value: "Practical web applications" },
  ],
};

/** Short introductions shown under each section heading. */
export const sectionCopy = {
  projects: "Web applications built around records people used to keep on paper.",
  skills: "What I've worked with, listed beside the projects that used it.",
  contact:
    "I'm pursuing a career as a software engineer. If you'd like to talk about a role, or about any of the projects here, I'd be glad to hear from you.",
};

// ── Projects ─────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: "workbud",
    title: "WorkBud",
    tagline: "OJT hours and expense tracker",
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

    // TODO(justin): confirm and write your contribution in your own words.
    // Source material: AI-USAGE.md in the repository, section "3. Who wrote what",
    // where you describe the parts you wrote yourself (the jobs table and
    // multi-job design, logo, visual design and colour tokens, routing and route
    // guards, the activity feed, Supabase and Vercel setup) and the parts that
    // were drafted with AI assistance. If you publish a contribution statement,
    // keep it consistent with that document.
    contribution: null,

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
    tagline: "Thesis consultation booking and records",
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

    // TODO(justin): confirm your role. You are the only listed GitHub
    // contributor, but that alone doesn't establish whether this was solo work,
    // part of a capstone group, or built with outside help.
    contribution: null,

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
    tagline: "Library discussion-room reservations",
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

    // TODO(justin): confirm your role (solo or group, course or personal project).
    contribution: null,

    technologies: [
      "React 19",
      "Vite",
      "Tailwind CSS 4",
      "Supabase (Postgres, Auth, Realtime)",
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
      files: ["README.md", "package.json", "supabase/schema.sql (file list)"],
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
// Confirmed skills are backed by a dependency file or README in one of the
// featured repositories. `confirmed: false` entries are hidden from the site;
// flip them to true if they're accurate, or delete them.

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      { name: "JavaScript", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      { name: "Tailwind CSS", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      { name: "HTML & CSS", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      { name: "React Router", usedIn: ["workbud"], confirmed: true },
      { name: "Progressive Web Apps", usedIn: ["workbud"], confirmed: true },
      {
        name: "TypeScript",
        usedIn: [],
        confirmed: false,
        note: "TODO(justin): this portfolio is TypeScript, but none of the three featured repos are. Confirm before listing.",
      },
      {
        name: "Next.js",
        usedIn: [],
        confirmed: false,
        note: "TODO(justin): same as TypeScript — confirm before listing.",
      },
      {
        name: "Flutter",
        usedIn: [],
        confirmed: false,
        note: "TODO(justin): seen in FINAL_CLOUDCOM and CLOUDCOM_pokemon (Dart). Confirm your role in those before listing.",
      },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js", usedIn: ["workbud", "consulttrack"], confirmed: true },
      { name: "Express", usedIn: ["workbud", "consulttrack"], confirmed: true },
      { name: "REST APIs", usedIn: ["workbud", "consulttrack"], confirmed: true },
      { name: "PostgreSQL", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      { name: "Supabase", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      { name: "Row Level Security", usedIn: ["workbud", "libspace"], confirmed: true },
      {
        name: "Python",
        usedIn: [],
        confirmed: false,
        note: "TODO(justin): seen in OPSYS_FINAL. Confirm before listing.",
      },
      {
        name: "Vision-language model integration",
        usedIn: [],
        confirmed: false,
        note: "TODO(justin): from your TulongGuro description; no public code to verify.",
      },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git & GitHub", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      { name: "Vercel", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      { name: "Vite", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      { name: "npm", usedIn: ["workbud", "consulttrack", "libspace"], confirmed: true },
      { name: "oxlint", usedIn: ["workbud", "libspace"], confirmed: true },
      {
        name: "Bash",
        usedIn: [],
        confirmed: false,
        note: "TODO(justin): seen in several small shell-script repos. Confirm before listing.",
      },
      {
        name: "Figma",
        usedIn: [],
        confirmed: false,
        note: "TODO(justin): not verified anywhere — delete if you don't use it.",
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
  { label: "Contact", href: "/#contact" },
] as const;

/** Absolute site URL for metadata. Works on Vercel without configuration. */
export const siteUrl =
  site.url ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
