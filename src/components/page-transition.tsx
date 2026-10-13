import { ViewTransition, type ReactNode } from "react";

/**
 * Wraps a page so route changes fade the old page out and lift the new one in.
 *
 * It belongs in each `page.tsx`, not the layout: layouts persist across
 * navigations, so enter and exit never fire there. The animation itself is
 * `.page` in globals.css.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      {children}
    </ViewTransition>
  );
}
