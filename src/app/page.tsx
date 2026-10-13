import type { ComponentType } from "react";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { EducationSection } from "@/components/sections/education";
import { ExperienceSection } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { experience } from "@/data/portfolio";

type NumberedSection = ComponentType<{ index: string }>;

export default function HomePage() {
  // Sections are numbered in order; Experience joins only once it has entries.
  const sections: NumberedSection[] = [
    About,
    Projects,
    ...(experience.length > 0 ? [ExperienceSection] : []),
    Skills,
    EducationSection,
    Contact,
  ];

  return (
    <>
      <Hero />
      {sections.map((SectionComponent, i) => (
        <SectionComponent key={i} index={String(i + 1).padStart(2, "0")} />
      ))}
    </>
  );
}
