import { ViewTransition } from "react";

/**
 * Remounts on every top-level route change, so the old page fades out and the
 * new one settles in (see `.page` in globals.css). Browsers without view
 * transitions, and reduced motion, simply swap pages. Case studies get the
 * same from projects/template.tsx.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
