import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { publishedProjects, sectionCopy, skillGroups } from "@/data/portfolio";

const titleBySlug = new Map(publishedProjects.map((p) => [p.slug, p.title]));

/** "WorkBud, ConsultTrack" — where a skill was actually used. */
function usedInLabel(slugs: string[]): string | null {
  const titles = slugs.map((slug) => titleBySlug.get(slug)).filter(Boolean);
  return titles.length > 0 ? titles.join(", ") : null;
}

export function Skills({ index }: { index: string }) {
  const groups = skillGroups
    .map((group) => ({ ...group, skills: group.skills.filter((skill) => skill.confirmed) }))
    .filter((group) => group.skills.length > 0);

  if (groups.length === 0) return null;

  return (
    <Section
      id="skills"
      index={index}
      title="Skills"
      lede={sectionCopy.skills}
    >
      <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-3">
        {groups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.08}>
            <h3 className="label pb-3 text-foreground">{group.title}</h3>
            <ul className="border-t border-border">
              {group.skills.map((skill) => {
                const usedIn = usedInLabel(skill.usedIn);
                return (
                  <li key={skill.name} className="border-b border-rule py-3">
                    <span className="block font-medium">{skill.name}</span>
                    {usedIn ? (
                      <span className="mt-0.5 block text-sm text-muted-foreground">
                        <span className="sr-only">Used in </span>
                        {usedIn}
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
