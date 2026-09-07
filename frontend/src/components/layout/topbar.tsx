"use client";
import { mockUser } from "@/lib/mock-data";
import { Bell } from "lucide-react";
import Link from "next/link";
import { Ring } from "@/components/shared/ring";

interface TopbarProps {
  title?: string;
}

// Streak ring chip using the Ring component at 22px
function StreakChip({ streak }: { streak: number }) {
  // progress = streak / 30 (30-day max for visual)
  const progress = Math.min(streak / 30, 1);
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
      style={{ background: "var(--coral-tint)", color: "var(--coral-dark)" }}
    >
      <Ring
        size={20}
        strokeWidth={3}
        progress={progress}
        color="var(--coral-dark)"
        bgColor="rgba(211,128,110,0.15)"
        animated={false}
      />
      {/* Flame SVG icon - no emoji */}
      <svg viewBox="0 0 24 24" fill="var(--coral-dark)" strokeWidth="0" className="w-3.5 h-3.5">
        <path d="M12 2C9.5 5 7 8 7 12a5 5 0 0 0 10 0c0-4-2.5-7-5-10z" />
      </svg>
      {streak} day streak
    </div>
  );
}

export function Topbar({ title }: TopbarProps) {
  return (
    <header
      className="sticky top-0 z-10 flex justify-between items-center px-8 py-4 border-b"
      style={{
        background: "rgba(250,247,242,0.86)",
        borderColor: "var(--line)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: "var(--z-sticky)",
      }}
    >
      <div className="flex items-center gap-4">
        {title && (
          <h2 className="font-semibold text-sm hidden sm:block" style={{ color: "var(--ink)" }}>
            {title}
          </h2>
        )}
      </div>

      <div className="flex items-center gap-3">
        <StreakChip streak={14} />

        {/* Notification bell */}
        <Link
          href="/dashboard/notifications"
          className="relative p-1.5 rounded-lg border transition-colors hover:border-ink"
          style={{ borderColor: "var(--line)" }}
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" strokeWidth={1.7} style={{ color: "var(--ink)" }} />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ background: "var(--coral-dark)" }}
          />
        </Link>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0"
          style={{ background: "linear-gradient(135deg, var(--sage), var(--coral))" }}
        >
          {mockUser.fullName.split(" ").map((n) => n[0]).join("")}
        </div>
      </div>
    </header>
  );
}
