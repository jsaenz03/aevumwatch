import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

// USE SPARINGLY. The taste skill caps eyebrows at 1 per 3 sections. Most
// sections should let the headline stand alone. Hero counts as 1.
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.24em] text-gold",
        className,
      )}
    >
      <span className="h-px w-6 bg-gold/60" aria-hidden />
      {children}
    </span>
  );
}
