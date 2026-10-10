import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectFeature } from "@/components/project-feature";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { featuredProjects, publishedProjects, sectionCopy } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Projects({ index }: { index: string }) {
  if (featuredProjects.length === 0) return null;

  const hasMore = publishedProjects.length > featuredProjects.length;

  return (
    <Section
      id="projects"
      index={index}
      title="Featured projects"
      lede={sectionCopy.projects}
    >
      <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-28">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug}>
            <ProjectFeature project={project} index={i} flip={i % 2 === 1} />
          </Reveal>
        ))}
      </div>

      {hasMore ? (
        <Reveal className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule pt-10 lg:mt-24">
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "group h-12 rounded-md bg-transparent px-6 text-base",
            )}
          >
            View all projects
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform motion-safe:group-hover:translate-x-1"
            />
          </Link>
          <p className="text-sm text-muted-foreground">
            {publishedProjects.length} in total, including my thesis and group work.
          </p>
        </Reveal>
      ) : null}
    </Section>
  );
}
