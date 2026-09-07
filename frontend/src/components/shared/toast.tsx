"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  show: boolean;
  onDismiss?: () => void;
  variant?: "default" | "success";
  className?: string;
}

export function Toast({ message, show, onDismiss, variant = "success", className }: ToastProps) {
  useEffect(() => {
    if (!show || !onDismiss) return;
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [show, onDismiss]);

  if (!show) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-5 py-3.5 rounded-[14px] text-sm font-medium shadow-elev-3",
        variant === "success"
          ? "bg-sage-tint text-sage-dark border border-sage-50"
          : "bg-surface text-ink border border-medbuddy-line",
        className
      )}
      style={{ borderColor: variant === "success" ? "rgba(81,126,112,0.25)" : "var(--line)" }}
    >
      {variant === "success" && (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, flexShrink: 0 }}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )}
      {message}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-auto opacity-50 hover:opacity-100 transition-opacity"
          aria-label="Dismiss"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 14, height: 14 }}>
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
