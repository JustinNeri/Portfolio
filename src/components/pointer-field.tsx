"use client";

import { motion, useMotionValue, useSpring, type MotionStyle } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

const spring = { stiffness: 90, damping: 18, mass: 0.6 };

/**
 * Tracks the mouse across its area and exposes the position to CSS as
 * `--px` and `--py`, each easing between -1 and 1 (0 is the centre).
 *
 * Children decide how far to move; see the hero rules in globals.css, which
 * only apply when motion is welcome. Touch and pen input are ignored.
 */
export function PointerField({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, spring);
  const py = useSpring(y, spring);

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - box.left) / box.width) * 2 - 1);
    y.set(((event.clientY - box.top) / box.height) * 2 - 1);
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={className}
      style={{ "--px": px, "--py": py } as MotionStyle}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.div>
  );
}
