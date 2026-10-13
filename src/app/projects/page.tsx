import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { ProjectCard } from "@/components/project-card";
import { publishedProjects, sectionCopy, site } from "@/data/portfolio";

const title = "Projects";

export const metadata: Metadata = {
  title,
  description: sectionCopy.allProjects,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: "/projects",
    siteName: site.name,
    title: `${title} — ${site.name}`,
    description: sectionCopy.allProjects,
  },
};

/** Every published project: the featured ones first, then the rest. */
export default function ProjectsPage() {
  const projects = [...publishedProjects].sort(
    (a, b) => Number(b.featured) - Number(a.featured),
  );

  return (
    <PageTransition>
      <div className="page-grid">
        <div aria-hidden="true" className="hidden lg:block" />
        <div className="min-w-0 pb-20 pt-10 lg:pb-28 lg:pt-16">
          <Link href="/#projects" className="link inline-flex items-center gap-1.5 py-1 text-sm">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to home
          </Link>

          <header className="mt-10 max-w-2xl">
            <p className="label">
              <span className="text-ink">{String(projects.length).padStart(2, "0")}</span> projects
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,8vw,4.5rem)] leading-[0.95]">
              All projects
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {sectionCopy.allProjects}
            </p>
          </header>

          <ul className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:mt-20">
            {projects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageTransition>
  );
}
