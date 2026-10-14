import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { certifications, education, sectionCopy, type Certification } from "@/data/portfolio";
import { revealOrder } from "@/lib/reveal";

/** One certification as a compact tile; a link when it has a credential URL. */
function CertificationTile({ cert }: { cert: Certification }) {
  const body = (
    <>
      <span className="min-w-0 flex-1">
        {cert.issuer ? <span className="label block">{cert.issuer}</span> : null}
        <span className="mt-1.5 block font-medium leading-snug transition-colors group-hover:text-ink">
          {cert.name}
        </span>
      </span>
      {cert.url ? (
        <span
          aria-hidden="true"
          className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-background motion-safe:group-hover:rotate-45"
        >
          <ArrowUpRight className="size-3.5" />
        </span>
      ) : null}
    </>
  );

  const shape = "flex h-full items-start gap-3 rounded-lg border border-border p-4";

  return cert.url ? (
    <a
      href={cert.url}
      target="_blank"
      rel="noreferrer"
      className={`group ${shape} transition-colors duration-200 hover:border-ink hover:bg-muted/60`}
    >
      {body}
      <span className="sr-only">(opens the credential in a new tab)</span>
    </a>
  ) : (
    <div className={`${shape} border-dashed`}>{body}</div>
  );
}

/** The degree as one compact strip, then certifications and badges as a tile grid. */
export function EducationSection({ index }: { index: string }) {
  if (education.length === 0 && certifications.length === 0) return null;

  return (
    <Section id="education" index={index} title="Education" lede={sectionCopy.education}>
      {education.length > 0 ? (
        <Reveal className="mt-14">
          <h3 className="label pb-3 text-foreground">Degree</h3>
          <ul className="border-t border-border">
            {education.map((entry, i) => (
              <li
                key={`${entry.school}-${entry.degree}`}
                style={revealOrder(i)}
                className="reveal-item flex flex-col gap-4 border-b border-rule py-5 md:flex-row md:items-end md:justify-between md:gap-10"
              >
                <div>
                  <p className="font-display text-2xl leading-snug">{entry.degree}</p>
                  <p className="mt-1 text-muted-foreground">{entry.school}</p>
                </div>
                <div className="md:text-right">
                  {entry.honors.map((honor) => (
                    <p key={honor} className="font-medium text-ink">
                      {honor}
                    </p>
                  ))}
                  <p className="label mt-1.5">{entry.period}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      ) : null}

      {certifications.length > 0 ? (
        <Reveal className="mt-14">
          <div className="flex items-baseline justify-between gap-6 pb-4">
            <h3 className="label text-foreground">Certifications &amp; badges</h3>
            <p className="label">
              <span className="text-ink">{certifications.length}</span> total
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <li key={cert.name} className="reveal-item" style={revealOrder(i)}>
                <CertificationTile cert={cert} />
              </li>
            ))}
          </ul>
        </Reveal>
      ) : null}
    </Section>
  );
}
