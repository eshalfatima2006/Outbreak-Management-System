"use client";
import { cn } from "@/lib/utils";

const variantStyles = {
  due:  { bg: "var(--coral-tint)", color: "var(--coral-dark)" },
  soon: { bg: "var(--sand-tint)",  color: "#a8944f" },
  ok:   { bg: "var(--sage-tint)",  color: "var(--sage-dark)" },
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: "due" | "soon" | "ok";
  className?: string;
}

export function Badge({ children, variant = "ok", className }: BadgeProps) {
  const s = variantStyles[variant];
  return (
    <span
      className={cn("inline-block text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap", className)}
      style={{ background: s.bg, color: s.color }}
    >
      {children}
    </span>
  );
}