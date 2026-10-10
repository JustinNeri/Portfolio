"use client";

import { useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades content up once as it enters the viewport.
 *
 * The hidden state lives in CSS behind `prefers-reduced-motion: no-preference`
 * (see `.reveal` in globals.css), so content is simply visible for visitors
 * who prefer reduced motion or have JavaScript turned off.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <div
      ref={ref}
      data-in={inView}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={cn("reveal", className)}
    >
      {children}
    </div>
  );
}
