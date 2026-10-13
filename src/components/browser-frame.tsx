import Image from "next/image";
import { ViewTransition } from "react";
import type { ProjectImage } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/** A screenshot in a plain window frame, with the live host in the title bar. */
export function BrowserFrame({
  image,
  host,
  sizes,
  priority = false,
  className,
  transitionName,
}: {
  image: ProjectImage;
  host?: string | null;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Shared by a list and its case study so the frame morphs between them. */
  transitionName?: string;
}) {
  const frame = (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-card shadow-[0_24px_60px_-30px_rgb(0_0_0/0.3)] dark:shadow-[0_24px_60px_-30px_rgb(0_0_0/0.8)]",
        className,
      )}
    >
      <div className="flex h-8 items-center gap-3 border-b border-border px-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
        </span>
        {host ? (
          <span className="truncate font-mono text-[0.6875rem] text-muted-foreground">{host}</span>
        ) : null}
      </div>
      <div className="overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full transition-transform duration-700 ease-out motion-safe:group-hover/shot:scale-[1.02]"
        />
      </div>
    </div>
  );

  if (!transitionName) return frame;

  // `default="none"` keeps the frame still during unrelated transitions.
  return (
    <ViewTransition name={transitionName} share="morph" default="none">
      {frame}
    </ViewTransition>
  );
}

/** The transition name a project's screenshot carries on every page. */
export function shotTransitionName(slug: string): string {
  return `project-shot-${slug}`;
}

export function hostOf(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}
