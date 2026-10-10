import { ProjectFeature } from "@/components/project-feature";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { featuredProjects, sectionCopy } from "@/data/portfolio";

export function Projects({ index }: { index: string }) {
  if (featuredProjects.length === 0) return null;

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
    </Section>
  );
}
