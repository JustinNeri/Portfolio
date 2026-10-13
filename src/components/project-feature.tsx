import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrowserFrame, hostOf, shotTransitionName } from "@/components/browser-frame";
import { projectMeta } from "@/components/project-card";
import { ProjectLinks } from "@/components/project-links";
import { TechList } from "@/components/tech-list";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/** One featured project on the home page: a large screenshot beside its summary. */
export function ProjectFeature({
  project,
  index,
  flip = false,
}: {
  project: Project;
  index: number;
  flip?: boolean;
}) {
  const href = `/projects/${project.slug}`;
  const number = String(index + 1).padStart(2, "0");
  const meta = projectMeta(project);

  return (
    <article
      aria-labelledby={`project-${project.slug}`}
      className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
    >
      {project.cover ? (
        <Link
          href={href}
          aria-label={`${project.title} case study`}
          className={cn("group/shot block lg:col-span-7", flip && "lg:order-2")}
        >
          <BrowserFrame
            image={project.cover}
            host={hostOf(project.liveUrl)}
            sizes="(min-width: 1152px) 560px, (min-width: 1024px) 50vw, 100vw"
            transitionName={shotTransitionName(project.slug)}
          />
        </Link>
      ) : null}

      <div className={cn("min-w-0", project.cover ? "lg:col-span-5" : "lg:col-span-12")}>
        <p className="label">
          <span className="text-ink">{number}</span>
          {meta.map((part) => (
            <span key={part}> · {part}</span>
          ))}
        </p>
        <h3
          id={`project-${project.slug}`}
          className="mt-3 font-display text-3xl leading-none sm:text-4xl"
        >
          <Link href={href} className="transition-colors hover:text-ink">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 font-medium">{project.tagline}</p>
        <p className="mt-4 leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="mt-6">
          <TechList items={project.technologies} label={`Technologies used in ${project.title}`} />
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link
            href={href}
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
