import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  strong?: boolean;
};

export function GlassPanel({ children, className, strong = false }: GlassPanelProps) {
  return (
    <div className={cn(strong ? "glass-strong" : "glass", "rounded-[24px]", className)}>
      {children}
    </div>
  );
}
