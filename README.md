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
| Name, headline, intro, email, GitHub, LinkedIn, CV link, site URL | `site` |
| About paragraphs and the fact list | `about` |
| Degree and honours | `education` |
| Certifications and badges | `certifications` |
| Work experience (empty for now, so the section is hidden) | `experience` |
| The line under each section heading | `sectionCopy` |
| Projects (text, links, screenshots, case-study content) | `projects` |
| Skills | `skillGroups` |

Rules the site follows:

- **`null` or an empty list hides things.** A missing link, an empty
  `experience` list or a certification without a `url` is simply not rendered —
  there are no placeholder links.
- **`published: false`** keeps a project off the site entirely. **`featured: true`**
  puts it on the home page; only the first three featured projects are shown.
- **`confirmed: false`** keeps a skill hidden.
- Search the file for **`TODO(justin)`** to find what is waiting on you, and
  for **`CONFLICT`** to find places where your CV, your repositories and your
  earlier brief disagree.

### Replacing the CV

The "View CV" links point at `public/cv/justin-neri-pangilinan-cv.png`, the
image you supplied. To use a PDF instead, put it in `public/cv/` and change
`site.cvUrl` to its path, for example `"/cv/justin-neri-pangilinan-cv.pdf"`.

### Adding a screenshot

1. Put the image in `public/projects/<slug>/` (WebP or PNG, 1600px wide or more).
2. Reference it from the project's `cover` or `gallery` with its real pixel
   `width` and `height` and a descriptive `alt`.

## What you still need to supply

- [ ] **A PDF of your CV** — the current file is a 588×801 image: small, not
      searchable and not readable by screen readers.
- [ ] **In-app screenshots** — the three covers are captures of each app's
      live sign-in page. ConsultTrack and LibSpace have no other screenshots;
      WorkBud's gallery uses the small images from its repository.
- [ ] **Review the three "My contribution" statements** — they are taken from
      your CV. See the `CONFLICT` note on WorkBud.
- [ ] **Work experience** — none is on the CV; add entries to `experience`
      (for example your OJT placement) to show the section.
- [ ] **Certification details** — issuer of the Figma certification, plus
      dates and credential links if you want them shown.
- [ ] **Production URL** — `site.url` (only needed for a custom domain).
- [ ] **TulongGuro and Carepanion** — draft entries exist but are unpublished,
      because no public code was available to describe them from.

## Where the content comes from

- Personal details, education, certifications and skills: your CV.
- Project facts: the public repositories at
  [github.com/JustinNeri](https://github.com/JustinNeri), checked on
  2026-10-10. Each project's `source` block lists the repository and files its
  description is based on. Features are as documented there; the signed-in
  flows of the live apps were not tested.

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
│   ├── page.tsx                home page: the ordered list of sections
│   ├── projects/[slug]/page.tsx  case-study page for each published project
│   ├── not-found.tsx
│   ├── opengraph-image.tsx     social-sharing card
│   ├── sitemap.ts, robots.ts, icon.svg
│   └── globals.css             colour tokens and shared styles
├── components/
│   ├── sections/               one file per home-page section
│   ├── ui/                     shadcn/ui components (button, sheet)
│   └── …                       header, mobile menu, footer, project pieces
└── data/
    └── portfolio.ts            ← your content
public/
├── cv/                         your CV
└── projects/<slug>/            project screenshots
```

## Design notes

- **Palette** — charcoal background, off-white text and one quiet purple
  accent, defined as CSS variables at the top of `globals.css`. The site has a
  single dark theme.
- **Type** — Geist for headings and text, Geist Mono for small labels.
- **Motion** — sections fade up once as they scroll in. This is disabled under
  `prefers-reduced-motion`, and content still appears if scripts fail to load.
