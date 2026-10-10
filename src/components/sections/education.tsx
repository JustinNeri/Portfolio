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
              {certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="flex flex-col gap-0.5 border-b border-rule py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="link inline-flex items-center gap-1.5 font-medium"
                    >
                      {cert.name}
                      <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <span className="font-medium">{cert.name}</span>
                  )}
                  {cert.issuer ? (
                    <span className="shrink-0 text-sm text-muted-foreground">{cert.issuer}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Reveal>
    </Section>
  );
}
