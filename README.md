# Justin Neri Pangilinan — Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS 4,
shadcn/ui, Motion and Lucide.

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check (run `npm run build` once first so route types exist) |

## Edit your content

**Everything about you lives in one file: [`src/data/portfolio.ts`](src/data/portfolio.ts).**
Components only read from it.

| To change | Edit |
| --- | --- |
| Name, role, intro, email, GitHub, LinkedIn, résumé, site URL | `site` |
| About paragraphs and the fact list | `about` |
| The line under each section heading | `sectionCopy` |
| Projects (text, links, screenshots, case-study content) | `projects` |
| Skills | `skillGroups` |

Rules the site follows:

- **`null` hides things.** A missing email, LinkedIn, résumé, live demo or
  repository link is simply not rendered — there are no placeholder links.
- **`published: false`** keeps a project off the site entirely (no card, no
  page, not in the sitemap). **`featured: true`** puts it on the home page;
  only the first three featured projects are shown.
- **`confirmed: false`** keeps a skill hidden until you confirm it.
- **`contribution: null`** hides the "My contribution" block on a case study.
- Search the file for **`TODO(justin)`** to find everything waiting on you.

### Adding a screenshot

1. Put the image in `public/projects/<slug>/` (WebP or PNG, 1600px wide or more).
2. Reference it from the project's `cover` or `gallery` with its real pixel
   `width` and `height` and a descriptive `alt`.

### Adding your résumé

Save it as `public/resume.pdf` and set `site.resumeUrl` to `"/resume.pdf"`. A
Résumé link then appears in the navigation and the Contact section.

## What you still need to supply

- [ ] **Email address** — `site.contact.email`
- [ ] **LinkedIn URL** — `site.contact.linkedin`
- [ ] **Résumé file** — `public/resume.pdf` + `site.resumeUrl`
- [ ] **Production URL** — `site.url` (only needed for a custom domain; on
      Vercel the project's production URL is used automatically)
- [ ] **Your contribution to each project** — `contribution` on WorkBud,
      ConsultTrack and LibSpace. Notes beside each field say what to confirm.
- [ ] **In-app screenshots** — the three covers are captures of each app's
      live sign-in page. ConsultTrack and LibSpace have no other screenshots;
      WorkBud's gallery uses the small images from its repository.
- [ ] **Skills to confirm** — TypeScript, Next.js, Flutter, Python, VLM
      integration, Bash and Figma are listed with `confirmed: false`.
- [ ] **TulongGuro and Carepanion** — draft entries exist but are unpublished,
      because no public code was available to describe them from.

## Where the project descriptions come from

Project facts were taken from the public repositories at
[github.com/JustinNeri](https://github.com/JustinNeri) on 2026-10-10. Each
project's `source` block in the data file lists the repository and the files
its description is based on (README, dependency manifests, docs). Features
are as documented there; the signed-in flows of the live apps were not tested.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the defaults (framework preset: Next.js). No environment variables
   are required.
4. Deploy.

For a custom domain, add it under **Project → Settings → Domains** and set
`site.url` in the data file to match, so canonical URLs, the sitemap and
social-sharing cards point at it.

## Structure

```
src/
├── app/
│   ├── layout.tsx              fonts, metadata, header and footer
│   ├── page.tsx                home page: hero, about, projects, skills, contact
│   ├── projects/[slug]/page.tsx  case-study page for each published project
│   ├── not-found.tsx
│   ├── opengraph-image.tsx     social-sharing card
│   ├── sitemap.ts, robots.ts, icon.svg
│   └── globals.css             colour tokens (light and dark) and shared styles
├── components/
│   ├── sections/               one file per home-page section
│   ├── ui/                     shadcn/ui components (button, sheet)
│   └── …                       header, mobile menu, footer, project pieces
└── data/
    └── portfolio.ts            ← your content
public/projects/<slug>/         project screenshots
```

## Design notes

- **Palette** — paper, ink and one accent (ledger red), defined as CSS
  variables at the top of `globals.css`. The theme follows the visitor's
  light or dark system setting.
- **Type** — Instrument Serif for display, Geist for text, Geist Mono for labels.
- **Motion** — sections fade up once as they scroll in and the underline
  beneath the name draws on load. Both are disabled under
  `prefers-reduced-motion`.
