import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { revealOrder } from "@/lib/reveal";
import { cn } from "@/lib/utils";

/**
 * Page section: the section number sits in a narrow margin column on large
 * screens and above the heading on small ones.
 */
export function Section({
  id,
  index,
  title,
  lede,
  children,
  className,
}: {
  id: string;
  index: string;
  title: string;
  lede?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="page-grid">
      <div aria-hidden="true" className="hidden pt-[7.9rem] lg:block">
        <span className="label sticky top-24 text-ink">{index}</span>
      </div>
      <div className={cn("min-w-0 border-t border-rule py-20 lg:py-28", className)}>
        <Reveal>
          <header className="max-w-2xl">
            <p aria-hidden="true" className="label mb-4 text-ink lg:hidden">
              {index}
            </p>
            <h2
              id={`${id}-title`}
              className="font-display text-4xl leading-[1.05] sm:text-5xl"
            >
              {title}
            </h2>
            {lede ? (
              <p
                className="reveal-item mt-5 text-lg leading-relaxed text-muted-foreground"
                style={revealOrder(1)}
              >
                {lede}
              </p>
            ) : null}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
