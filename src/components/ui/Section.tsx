import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  container?: boolean;
};

export function Section({
  id,
  className,
  containerClassName,
  children,
  container = true,
}: SectionProps) {
  return (
    <section id={id} className={cn("relative py-24 sm:py-28 lg:py-36", className)}>
      {container ? <div className={cn("shell", containerClassName)}>{children}</div> : children}
    </section>
  );
}
