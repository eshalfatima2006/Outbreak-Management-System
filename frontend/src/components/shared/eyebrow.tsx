import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  centered?: boolean;
  className?: string;
}

export function Eyebrow({ children, centered = false, className }: EyebrowProps) {
  return (
    <div
      className={cn(
        "font-mono text-[10.5px] font-medium uppercase tracking-[0.13em] flex items-center gap-2",
        centered && "justify-center",
        className
      )}
      style={{ color: "var(--sage-dark)" }}
    >
      <span className="h-px flex-shrink-0" style={{ width: 14, background: "var(--sage-dark)" }} />
      {children}
      {centered && <span className="h-px flex-shrink-0" style={{ width: 14, background: "var(--sage-dark)" }} />}
    </div>
  );
}
