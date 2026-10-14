/**
 * Remounts on every top-level route change, so each page fades in softly.
 * Opacity only — nothing moves — and none at all for reduced motion; see
 * `.page-in` in globals.css. Case studies get the same from projects/template.tsx.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
