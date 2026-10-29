import Image from "next/image";
import { ViewTransition } from "react";
import type { ProjectImage } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/**
 * A screenshot in a plain window frame, with the live host in the title bar.
 *
 * Frames sharing a `morph` key glide into one another when a link tagged
 * `nav-forward` (see `caseStudyTransition`) opens the case study; any other
 * navigation leaves them to the page's own fade.
 */
export function BrowserFrame({
  image,
  host,
  sizes,
  priority = false,
  morph,
  className,
}: {
  image: ProjectImage;
  host?: string | null;
  sizes: string;
  priority?: boolean;
  morph?: string;
  className?: string;
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

  if (!morph) return frame;
  return (
    <ViewTransition
      name={`shot-${morph}`}
      share={{ "nav-forward": "morph", default: "none" }}
      default="none"
    >
      {frame}
    </ViewTransition>
  );
}

/** Transition type for links that open a case study from its own card. */
export const caseStudyTransition = ["nav-forward"];

export function hostOf(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}
