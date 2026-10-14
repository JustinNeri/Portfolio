/**
 * The root template stays mounted between /projects and its case studies,
 * so this one supplies the same soft fade for moves within this section.
 */
export default function ProjectsTemplate({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
