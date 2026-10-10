import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Page section laid out like a ledger page: the entry number sits in the
 * margin, and a red margin line runs down the left of the content.
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
      <div aria-hidden="true" className="hidden pt-[7.6rem] lg:block">
        <span className="label sticky top-24 text-ink">{index}</span>
      </div>
      <div className={cn("margin-line min-w-0 py-20 lg:py-28", className)}>
        <header className="max-w-2xl">
          <p aria-hidden="true" className="label mb-4 text-ink lg:hidden">
            {index}
          </p>
          <h2
            id={`${id}-title`}
            className="font-serif text-[2.75rem] leading-[1.02] tracking-tight sm:text-6xl"
          >
            {title}
          </h2>
          {lede ? (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{lede}</p>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  );
}
