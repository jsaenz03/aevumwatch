import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: () => void;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
};

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform active:translate-y-[1px] focus-visible:outline-2 focus-visible:outline-offset-3 disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "text-ink bg-[linear-gradient(120deg,var(--color-gold-bright),var(--color-gold)_45%,var(--color-bronze))] shadow-[0_14px_44px_-14px_rgba(201,162,75,0.55)] hover:-translate-y-0.5 hover:shadow-[0_22px_56px_-14px_rgba(201,162,75,0.7)]",
  secondary:
    "glass text-bone hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold-bright",
  ghost: "text-mist hover:text-gold-bright",
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if ("href" in props && props.href) {
    const external = props.href.startsWith("http");
    if (external) {
      return (
        <a
          href={props.href}
          className={classes}
          onClick={props.onClick}
          rel="noreferrer"
          target="_blank"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes} onClick={props.onClick}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick } = props as ButtonAsButton;
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
