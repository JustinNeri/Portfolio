import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { certifications, education, sectionCopy } from "@/data/portfolio";

/** Degree and honours, then certifications and badges as a plain list. */
export function EducationSection({ index }: { index: string }) {
  if (education.length === 0 && certifications.length === 0) return null;

  return (
    <Section id="education" index={index} title="Education" lede={sectionCopy.education}>
      <Reveal className="mt-14 grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {education.length > 0 ? (
          <div>
            <h3 className="label pb-3 text-foreground">Degree</h3>
            <ul className="border-t border-border">
              {education.map((entry) => (
                <li key={`${entry.school}-${entry.degree}`} className="border-b border-rule py-4">
                  <p className="font-display text-xl leading-snug">{entry.degree}</p>
                  <p className="mt-1.5 text-muted-foreground">{entry.school}</p>
                  <p className="label mt-3">{entry.period}</p>
                  {entry.honors.length > 0 ? (
                    <ul className="mt-4 space-y-1.5">
                      {entry.honors.map((honor) => (
                        <li key={honor} className="flex items-center gap-3">
                          <span aria-hidden="true" className="h-px w-4 shrink-0 bg-ink" />
                          {honor}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {certifications.length > 0 ? (
          <div>
            <h3 className="label pb-3 text-foreground">Certifications &amp; badges</h3>
            <ul className="border-t border-border">
              {certifications.map((cert, i) => {
                const row = (
                  <>
                    <span aria-hidden="true" className="label w-6 shrink-0 pt-1 transition-colors group-hover:text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium transition-colors group-hover:text-ink">
                        {cert.name}
                      </span>
                      {cert.issuer ? (
                        <span className="mt-0.5 block text-sm text-muted-foreground">
                          {cert.issuer}
                        </span>
                      ) : null}
                    </span>
                  </>
                );

                return (
                  <li key={cert.name} className="border-b border-rule">
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group -mx-3 flex items-start gap-4 rounded-md px-3 py-3.5 transition-[background-color,padding] duration-200 hover:bg-muted/70 motion-safe:hover:pl-5"
                      >
                        {row}
                        <span className="sr-only">(opens the credential in a new tab)</span>
                        <span
                          aria-hidden="true"
                          className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-background motion-safe:group-hover:rotate-45"
                        >
                          <ArrowUpRight className="size-4" />
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 py-3.5">{row}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </Reveal>
    </Section>
  );
}
