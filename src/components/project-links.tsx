import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import type { Project } from "@/data/portfolio";

/** Repository and live-demo links. Renders only the links that exist. */
export function ProjectLinks({ project }: { project: Project }) {
  if (!project.repoUrl && !project.liveUrl) return null;

  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
      {project.liveUrl ? (
        <li>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="link inline-flex items-center gap-1.5 py-1"
          >
            Live demo
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only">of {project.title} (opens in a new tab)</span>
          </a>
        </li>
      ) : null}
      {project.repoUrl ? (
        <li>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="link inline-flex items-center gap-1.5 py-1"
          >
            <GitHubIcon className="size-4" />
            Source
            <span className="sr-only">code for {project.title} on GitHub (opens in a new tab)</span>
          </a>
        </li>
      ) : null}
    </ul>
  );
}
