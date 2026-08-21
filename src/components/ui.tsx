import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-indigo">
      <span className="h-px w-6 bg-indigo" />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-ink-soft">{description}</p> : null}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
  icon = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
  icon?: boolean;
}) {
  const base =
    "group inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap";
  const variants = {
    primary: "bg-indigo text-white hover:brightness-110 shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset]",
    secondary: "border border-line bg-paper-raised text-ink hover:border-indigo",
    ghost: "text-ink hover:text-indigo",
  };
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(base, variants[variant], className)}
    >
      {children}
      {icon ? <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> : null}
    </Link>
  );
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-line bg-paper-raised px-3 py-1 text-xs font-medium text-ink-soft", className)}>
      {children}
    </span>
  );
}
