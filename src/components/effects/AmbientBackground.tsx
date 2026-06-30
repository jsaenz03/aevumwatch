"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

// Drifting mesh gradient + a soft gold pointer light that follows the cursor.
// The pointer light is a highlight, NOT a replacement for the OS cursor.
function MouseGlow() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-1200);
  const y = useMotionValue(-1200);
  const sx = useSpring(x, { stiffness: 80, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 80, damping: 22, mass: 0.4 });
  const background = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, rgba(201,162,75,0.07), transparent 65%)`;

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const handler = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
  }, [reduce, x, y]);

  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
      style={{ background }}
    />
  );
}

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="absolute -top-1/4 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.10),transparent_62%)] blur-3xl animate-drift" />
      <div className="absolute top-1/3 -left-40 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(168,118,62,0.08),transparent_62%)] blur-3xl animate-drift [animation-delay:-9s]" />
      <div className="absolute -bottom-32 right-0 h-[65vh] w-[65vh] rounded-full bg-[radial-gradient(circle,rgba(159,232,255,0.045),transparent_62%)] blur-3xl animate-drift [animation-delay:-17s]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(0,0,0,0.65))]" />
      <MouseGlow />
    </div>
  );
}
