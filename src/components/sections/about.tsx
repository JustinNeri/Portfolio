import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { about } from "@/data/portfolio";

export function About() {
  const [lead, ...rest] = about.paragraphs;

  return (
    <Section id="about" index="01" title="About">
      <Reveal className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-20">
        <div className="max-w-2xl">
          <p className="font-serif text-[1.75rem] leading-[1.2] sm:text-4xl sm:leading-[1.15]">
            {lead}
          </p>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            {rest.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <dl className="self-start border-t border-border">
          {about.facts.map((fact) => (
            <div key={fact.label} className="border-b border-border py-3.5">
              <dt className="label">{fact.label}</dt>
              <dd className="mt-1">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
