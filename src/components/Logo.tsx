import { cn } from "@/lib/cn";

// Geometric mark: a watch case (ring), the 12 index, and a meridian arc.
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
        className="text-gold"
      >
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.3" opacity="0.5" />
        <circle cx="16" cy="16" r="10.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M16 5.5 V 9.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path
          d="M9.5 22.5 A 9 9 0 0 1 22.5 9.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.85"
        />
        <circle cx="16" cy="16" r="1.6" fill="currentColor" />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight text-bone">
        Aevum
      </span>
    </span>
  );
}
