import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { experience, sectionCopy } from "@/data/portfolio";
import { revealOrder } from "@/lib/reveal";

/** Work experience. Renders nothing until `experience` in the data file has entries. */
export function ExperienceSection({ index }: { index: string }) {
  if (experience.length === 0) return null;

  return (
    <Section id="experience" index={index} title="Experience" lede={sectionCopy.experience}>
      <Reveal className="mt-14">
        <ul className="max-w-3xl border-t border-border">
          {experience.map((entry, i) => (
            <li
              key={`${entry.organization}-${entry.role}`}
              style={revealOrder(i)}
              className="reveal-item grid gap-2 border-b border-rule py-6 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10"
            >
              <p className="label pt-1.5">{entry.period}</p>
              <div>
                <h3 className="font-display text-xl leading-snug">{entry.role}</h3>
                <p className="mt-1 text-muted-foreground">{entry.organization}</p>
                {entry.summary ? <p className="mt-4 leading-relaxed">{entry.summary}</p> : null}
                {entry.highlights.length > 0 ? (
                  <ul className="mt-4 space-y-2.5">
                    {entry.highlights.map((item) => (
                      <li key={item} className="flex gap-4 leading-relaxed">
                        <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-ink" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
