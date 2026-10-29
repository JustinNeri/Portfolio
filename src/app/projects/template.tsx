import { ViewTransition } from "react";

/**
 * The root template stays mounted between /projects and its case studies,
 * so this one supplies the same page transition for moves within this section.
 */
export default function ProjectsTemplate({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
