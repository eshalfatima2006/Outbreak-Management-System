"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { mockExercises, mockUser } from "@/lib/mock-data";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Zap, Clock, Dumbbell } from "lucide-react";

const tintGradients = [
  "linear-gradient(135deg, var(--sage-tint), var(--sand-tint))",
  "linear-gradient(135deg, var(--coral-tint), var(--sand-tint))",
  "linear-gradient(135deg, var(--sand-tint), var(--coral-tint))",
];

export default function ExercisePage() {
  const [mode, setMode] = useState<"standard" | "low-impact">("standard");

  const filtered = mockExercises.filter((ex) =>
    mode === "low-impact" ? ex.type === "low-impact" : ex.type !== "low-impact"
  );

  return (
    <DashboardShell title="Exercise">
      <div className="mb-7">
        <Eyebrow className="mb-3">Movement</Eyebrow>
        <h1 className="font-display text-[26px] font-medium mb-1.5" style={{ color: "var(--ink)" }}>
          Exercise plans
        </h1>
        <p className="text-[13.5px]" style={{ color: "var(--ink-soft)" }}>
          Routine-adapted workouts for your goals.
        </p>
      </div>

      {/* Toggle */}
      <div className="flex gap-2 mb-6">
        {(["standard", "low-impact"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn("pill capitalize", mode === m && "selected")}
          >
            {m === "low-impact" ? "Low-impact" : "Standard"}
          </button>
        ))}
      </div>

      {/* Workout cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {filtered.map((ex, idx) => (
          <Link
            key={ex.id}
            href={`/dashboard/exercise/${ex.slug}`}
            className="group block rounded-[20px] border p-5 cursor-pointer"
            style={{
              background: "var(--surface)",
              borderColor: "var(--line)",
              textDecoration: "none",
              transition: "transform 300ms cubic-bezier(0.2,0.9,0.3,1), box-shadow 300ms ease, border-color 300ms ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-4px)";
              el.style.boxShadow = "var(--elev-2)";
              el.style.borderColor = "transparent";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "";
              el.style.boxShadow = "";
              el.style.borderColor = "var(--line)";
            }}
          >
            {/* Thumbnail gradient */}
            <div
              className="w-full aspect-[16/9] rounded-xl mb-3.5 flex items-center justify-center"
              style={{ background: tintGradients[idx % 3] }}
            >
              <Zap className="w-8 h-8 opacity-30" strokeWidth={1.5} style={{ color: "var(--sage-dark)" }} />
            </div>

            <h3 className="font-display font-medium text-[15px] mb-2" style={{ color: "var(--ink)" }}>
              {ex.title}
            </h3>

            {/* Meta row */}
            <div className="flex items-center gap-3 text-[11px] mb-3" style={{ color: "var(--ink-soft)" }}>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" strokeWidth={1.7} />
                {ex.duration} min
              </span>
              <span className="flex items-center gap-1">
                <Dumbbell className="w-3.5 h-3.5" strokeWidth={1.7} />
                {ex.difficulty}
              </span>
              {ex.equipment?.length > 0 && (
                <span>{ex.equipment.join(", ")}</span>
              )}
            </div>

            <span className="text-xs font-semibold flex items-center gap-1.5 transition-all group-hover:gap-2.5" style={{ color: "var(--sage-dark)" }}>
              View workout
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      {/* Cycle phase callout - female users only, per spec 8.3 */}
      {mockUser.gender === "female" && (
        <div
          className="rounded-[20px] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ background: "var(--coral-tint)" }}
        >
          <p className="text-[13.5px]" style={{ color: "var(--ink)" }}>
            Cycle phase: <strong>Follicular</strong> - today&apos;s plan is adjusted accordingly.
          </p>
          <button className="btn-medbuddy-ghost btn-sm text-xs">Change</button>
        </div>
      )}
    </DashboardShell>
  );
}
