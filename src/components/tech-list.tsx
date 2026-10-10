/** Technologies as a quiet, wrapping mono list — no pills, no ratings. */
export function TechList({ items, label }: { items: string[]; label: string }) {
  if (items.length === 0) return null;

  return (
    <ul
      aria-label={label}
      className="flex flex-wrap gap-x-2 gap-y-1.5 font-mono text-xs text-muted-foreground"
    >
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-2">
          {item}
          {i < items.length - 1 ? (
            <span aria-hidden="true" className="text-border">
              /
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
