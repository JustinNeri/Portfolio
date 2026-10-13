"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

const MAX_DEGREES = 5;
const spring = { stiffness: 180, damping: 20, mass: 0.5 };

/**
 * Leans its content toward the mouse and slides a soft accent-coloured
 * highlight under the cursor. Still for touch, pen and reduced motion.
 */
export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const hover = useMotionValue(0);

  const rotateY = useSpring(useTransform(x, [0, 1], [-MAX_DEGREES, MAX_DEGREES]), spring);
  const rotateX = useSpring(useTransform(y, [0, 1], [MAX_DEGREES, -MAX_DEGREES]), spring);
  const glareOpacity = useSpring(hover, spring);
  const glareX = useTransform(x, (value) => `${value * 100}%`);
  const glareY = useTransform(y, (value) => `${value * 100}%`);
  const glare = useMotionTemplate`radial-gradient(26rem circle at ${glareX} ${glareY}, color-mix(in srgb, var(--ink) 22%, transparent), transparent 65%)`;

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - box.left) / box.width);
    y.set((event.clientY - box.top) / box.height);
    hover.set(1);
  }

  function onPointerLeave() {
    x.set(0.5);
    y.set(0.5);
    hover.set(0);
  }

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg"
        style={{ background: glare, opacity: glareOpacity }}
      />
    </motion.div>
  );
}
