"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

// Premium intro: a gold ring draws around the monogram, then the curtain lifts.
export function Loader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduce ? 150 : 1600);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative flex h-28 w-28 items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="2"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="url(#loaderGold)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduce ? 0.2 : 1.3, ease: [0.16, 1, 0.3, 1] }}
              />
              <defs>
                <linearGradient id="loaderGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--color-gold-bright)" />
                  <stop offset="100%" stopColor="var(--color-bronze)" />
                </linearGradient>
              </defs>
            </svg>
            <motion.span
              className="font-display text-2xl font-semibold text-gold-gradient"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: reduce ? 0 : 0.45, duration: 0.6 }}
            >
              Æ
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
