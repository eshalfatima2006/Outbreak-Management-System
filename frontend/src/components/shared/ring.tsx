"use client";
import { cn } from "@/lib/utils";

interface RingProps {
  size?: number;
  strokeWidth?: number;
  progress: number;
  color?: string;
  bgColor?: string;
  value?: string | React.ReactNode;
  className?: string;
  /** If true, the fill transition animates on mount (600ms). Default: true */
  animated?: boolean;
  /** If "dashed", the foreground stroke uses a dashed pattern (for locked badges). */
  dashed?: boolean;
}

export function Ring({
  size = 56,
  strokeWidth = 5,
  progress,
  color = "#517E70",
  bgColor = "#EFF5F2",
  value,
  className,
  animated = true,
  dashed = false,
}: RingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(1, Math.max(0, progress)));

  return (
    <div
      className={cn("relative flex-shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full"
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        {/* Foreground fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={
            dashed
              ? `${(circumference / 20).toFixed(1)} ${(circumference / 30).toFixed(1)}`
              : circumference
          }
          strokeDashoffset={dashed ? 0 : offset}
          style={
            animated && !dashed
              ? { transition: "stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }
              : undefined
          }
        />
      </svg>
      {value !== undefined && (
        <div className="absolute inset-0 flex items-center justify-center font-display font-semibold text-xs">
          {value}
        </div>
      )}
    </div>
  );
}
