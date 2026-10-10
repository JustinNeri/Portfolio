/**
 * The pen stroke under the surname: drawn once on load, like signing a ledger.
 * The drawing animation is CSS (`.ink-stroke` in globals.css) and only runs
 * when the visitor hasn't asked for reduced motion.
 */
export function InkUnderline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 24"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 15.5C58 6 121 4.5 189 9.5c66 4.8 131 9.5 208-2.5"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className="ink-stroke"
      />
    </svg>
  );
}
