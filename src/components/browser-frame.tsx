import Image from "next/image";
import type { ProjectImage } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/** A screenshot in a plain window frame, with the live host in the title bar. */
export function BrowserFrame({
  image,
  host,
  sizes,
  priority = false,
  className,
}: {
  image: ProjectImage;
  host?: string | null;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-card shadow-[0_1px_0_rgb(0_0_0/0.04),0_18px_40px_-24px_rgb(0_0_0/0.35)]",
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
}

export function hostOf(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}
