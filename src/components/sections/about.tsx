import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { about } from "@/data/portfolio";
import { revealOrder } from "@/lib/reveal";

/**
 * About: an opening statement and short bio beside the quick facts, then the
 * focus areas as a numbered row, ending with a way to get in touch.
 */
export function About({ index }: { index: string }) {
  return (
    <Section id="about" index={index} title="About">
      <Reveal className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-20">
        <div className="max-w-2xl">
          <p className="font-display text-2xl leading-snug sm:text-3xl sm:leading-snug">
            {about.lead}
          </p>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link
            href="/#contact"
            className="group mt-8 inline-flex items-center gap-1.5 py-1 font-medium text-ink"
          >
            Get in touch
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform motion-safe:group-hover:translate-x-1"
            />
          </Link>
        </div>

        <dl className="self-start border-t border-border">
          {about.facts.map((fact, i) => (
            <div
              key={fact.label}
              className="reveal-item border-b border-border py-3.5"
              style={revealOrder(i + 1)}
            >
              <dt className="label">{fact.label}</dt>
              <dd className="mt-1">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {about.focusAreas.length > 0 ? (
        <Reveal className="mt-16 lg:mt-20">
          <h3 className="label pb-4 text-foreground">What I focus on</h3>
          <ol className="grid border-t border-border md:grid-cols-3 md:gap-x-10">
            {about.focusAreas.map((area, i) => (
              <li
                key={area.title}
                className="reveal-item border-b border-rule py-6 md:border-b-0 md:pb-0"
                style={revealOrder(i)}
              >
                <span aria-hidden="true" className="label text-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-display text-xl leading-snug">{area.title}</p>
                <p className="mt-2 leading-relaxed text-muted-foreground">{area.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      ) : null}
    </Section>
  );
}
