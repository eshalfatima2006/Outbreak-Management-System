"use client";
import { cn } from "@/lib/utils";

interface DisclaimerBannerProps {
  children: React.ReactNode;
  className?: string;
}

export function DisclaimerBanner({ children, className }: DisclaimerBannerProps) {
  return (
    <div className={cn("disclaimer-banner", className)}>
      {/* Alert triangle - sage-dark per spec 4.4 */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--sage-dark)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 17, height: 17, flexShrink: 0, marginTop: 1 }}
      >
        <path d="M10.3 3.9L2.5 17a2 2 0 001.7 3h15.6a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
        <path d="M12 9v4M12 16.5h.01" />
      </svg>
      <span>{children}</span>
    </div>
  );
}
