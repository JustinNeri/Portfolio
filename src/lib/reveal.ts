import type { CSSProperties } from "react";

/**
 * Style for one `.reveal-item` inside a `<Reveal>`: its place in the list,
 * which staggers it slightly after the items before it (see globals.css).
 */
export function revealOrder(index: number): CSSProperties {
  return { "--i": index } as CSSProperties;
}
