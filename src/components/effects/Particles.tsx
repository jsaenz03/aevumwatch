"use client";

import { cn } from "@/lib/cn";

// Deterministic floating gold motes for the hero. Deterministic seeding avoids
// SSR hydration mismatch; CSS reduced-motion rules freeze them when requested.
function rand(i: number, salt: number): number {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

type ParticlesProps = {
  count?: number;
  className?: string;
};

export function Particles({ count = 28, className }: ParticlesProps) {
  const dots = Array.from({ length: count }, (_, i) => ({
    left: rand(i, 1) * 100,
    top: rand(i, 2) * 100,
    size: 2 + rand(i, 3) * 4,
    delay: rand(i, 4) * 7,
    duration: 6 + rand(i, 5) * 9,
    opacity: 0.12 + rand(i, 6) * 0.4,
  }));

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gold blur-[1px]"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            opacity: d.opacity,
            animation: `float ${d.duration}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
