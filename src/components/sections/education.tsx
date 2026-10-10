import {
  ArrowUpRight, Award, ChartNoAxesCombined, Cloud, Code2, Cpu,
  Database, GraduationCap, Network, PenTool, ShieldCheck, Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { certifications, education, sectionCopy } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/** Decorative subject icons; credential names and issuers remain the source of truth. */
function credentialIcon(name: string) {
  if (/cloud/i.test(name)) return Cloud;
  if (/database/i.test(name)) return Database;
  if (/security|threat/i.test(name)) return ShieldCheck;
  if (/analytics/i.test(name)) return ChartNoAxesCombined;
  if (/\bAI\b|intelligence/i.test(name)) return Sparkles;
  if (/network/i.test(name)) return Network;
  if (/figma/i.test(name)) return PenTool;
  if (/web|javascript/i.test(name)) return Code2;
  return Cpu;
}

export function EducationSection({ index }: { index: string }) {
  if (education.length === 0 && certifications.length === 0) return null;

  return (
    <Section id="education" index={index} title="Education" lede={sectionCopy.education}>
      {education.length > 0 ? (
        <Reveal className="mt-12">
          <h3 className="label mb-4">Academic background</h3>
          <ul className="space-y-4">
            {education.map((entry) => (
              <li
                key={`${entry.school}-${entry.degree}`}
                className="relative overflow-hidden rounded-2xl border border-ink/20 bg-linear-to-br from-ink/8 via-card to-card p-6 sm:p-8"
              >
                <div aria-hidden="true" className="absolute inset-y-6 left-0 w-0.5 rounded-full bg-ink/60" />
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-ink/15 bg-ink/8 text-ink">
                    <GraduationCap aria-hidden="true" className="size-6" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-xl leading-snug sm:text-2xl">{entry.degree}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{entry.school}</p>
                  </div>
                  <span className="label w-fit shrink-0 rounded-full border border-border bg-background/60 px-3 py-2">
                    {entry.period}
                  </span>
                </div>
                {entry.honors.length > 0 ? (
                  <ul className="mt-6 flex flex-wrap gap-3 border-t border-ink/10 pt-5 sm:ml-18">
                    {entry.honors.map((honor) => (
                      <li key={honor} className="flex items-center gap-2 text-sm text-ink">
                        <Award aria-hidden="true" className="size-4 shrink-0" />
                        {honor}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </Reveal>
      ) : null}

      {certifications.length > 0 ? (
        <div className="mt-12 sm:mt-14">
          <div className="mb-5 flex items-center gap-3">
            <h3 className="label text-foreground">Certifications &amp; badges</h3>
            <span className="rounded-full border border-ink/15 bg-ink/8 px-2.5 py-1 font-mono text-xs text-ink">
              {String(certifications.length).padStart(2, "0")}
              <span className="sr-only"> credentials</span>
            </span>
            <span aria-hidden="true" className="ml-1 h-px flex-1 bg-border" />
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
            {certifications.map((cert, i) => {
              const Icon = credentialIcon(cert.name);
              const cardClass = cn(
                "relative flex h-full min-h-52 flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6",
                cert.url && "group transition-[border-color,box-shadow,transform] duration-300 hover:border-ink/40 hover:shadow-[0_8px_30px_-12px_var(--hero-glow)] focus-visible:border-ink motion-safe:hover:-translate-y-1",
              );
              const content = (
                <>
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-br from-ink/5 via-transparent to-transparent" />
                  <span className="relative flex items-start justify-between gap-3">
                    <span className="grid size-10 place-items-center rounded-xl border border-ink/15 bg-ink/8 text-ink">
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                    </span>
                    <span aria-hidden="true" className="pt-1 font-mono text-[10px] tracking-widest text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <h4 className="relative mt-5 text-base font-medium leading-snug tracking-tight">{cert.name}</h4>
                  <span className="relative mt-auto flex items-end justify-between gap-3 pt-5">
                    {cert.issuer ? (
                      <span className="text-xs leading-relaxed text-muted-foreground">{cert.issuer}</span>
                    ) : <span />}
                    {cert.url ? (
                      <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-300 group-hover:border-ink/30 group-hover:bg-ink/10 group-hover:text-ink group-focus-visible:text-ink">
                        <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      </span>
                    ) : null}
                  </span>
                  {cert.url ? <span className="sr-only">View credential (opens in a new tab)</span> : null}
                </>
              );

              return (
                <li key={cert.name} className="min-w-0">
                  <Reveal className="h-full" delay={(i % 3) * 0.05}>
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noreferrer" className={cardClass}>
                        {content}
                      </a>
                    ) : (
                      <div className={cardClass}>{content}</div>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
