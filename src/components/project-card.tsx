import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrowserFrame, caseStudyTransition, hostOf } from "@/components/browser-frame";
import { ProjectLinks } from "@/components/project-links";
import { TechList } from "@/components/tech-list";
import { projectKindLabel, type Project } from "@/data/portfolio";

/** "Group project · Not yet deployed · 2025" — whichever parts exist. */
export function projectMeta(project: Project): string[] {
  return [projectKindLabel(project.kind), project.status, project.year].filter(
    (part): part is string => Boolean(part),
  );
}

/** One project on the all-projects page: screenshot, credit line, summary and links. */
export function ProjectCard({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`;
  const meta = projectMeta(project);

  return (
    <article aria-labelledby={`card-${project.slug}`} className="flex h-full flex-col">
      <Link
        href={href}
        transitionTypes={caseStudyTransition}
        aria-label={`${project.title} case study`}
        className="group/shot block"
      >
        {project.cover ? (
          <BrowserFrame
            image={project.cover}
            host={hostOf(project.liveUrl)}
            morph={project.slug}
            sizes="(min-width: 1152px) 480px, (min-width: 768px) 50vw, 100vw"
          />
        ) : (
          // No screenshot yet: a plain title panel in the same shape as the others.
          <div className="grid aspect-[2400/1580] place-items-center rounded-lg border border-border bg-card px-6 transition-colors group-hover/shot:border-ink">
            <span className="text-center">
              <span className="block font-poster text-5xl uppercase leading-none text-muted-foreground sm:text-6xl">
                {project.title}
              </span>
              <span className="label mt-4 block">No screenshot yet</span>
            </span>
          </div>
        )}
      </Link>

      <div className="mt-6 flex flex-1 flex-col">
        {meta.length > 0 ? (
          <p className="label">
            {meta.map((part, i) => (
              <span key={part}>
                {i > 0 ? <span aria-hidden="true"> · </span> : null}
                <span className={i === 0 && meta.length > 1 ? "text-ink" : undefined}>{part}</span>
              </span>
            ))}
          </p>
        ) : null}
        <h2 id={`card-${project.slug}`} className="mt-3 font-display text-3xl leading-none">
          <Link
            href={href}
            transitionTypes={caseStudyTransition}
            className="transition-colors hover:text-ink"
          >
            {project.title}
          </Link>
        </h2>
        <p className="mt-2 font-medium">{project.tagline}</p>
        <p className="mt-3 leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="mt-5">
          <TechList items={project.technologies} label={`Technologies used in ${project.title}`} />
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 text-sm">
          <Link
            href={href}
            transitionTypes={caseStudyTransition}
            className="group inline-flex items-center gap-1.5 py-1 font-medium text-ink"
          >
            Read case study
            <span className="sr-only">: {project.title}</span>
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform motion-safe:group-hover:translate-x-1"
            />
          </Link>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
