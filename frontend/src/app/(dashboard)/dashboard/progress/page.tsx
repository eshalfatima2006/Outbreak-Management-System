"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Ring } from "@/components/shared/ring";
import { Toast } from "@/components/shared/toast";
import { mockProgress } from "@/lib/mock-data";
import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ProgressPage() {
  const { currentStreak, longestStreak, achievements, selfExamHistory } = mockProgress;
  const [showToast, setShowToast] = useState(false);

  const handleExport = () => {
    setShowToast(true);
  };

  return (
    <DashboardShell title="Progress & achievements">
      <div className="mb-7">
        <div className="eyebrow mb-3">Your journey</div>
        <h1 className="font-display text-[26px] font-medium mb-1.5" style={{ color: "var(--ink)" }}>
          Progress &amp; achievements
        </h1>
        <p className="text-[13.5px]" style={{ color: "var(--ink-soft)" }}>
          Your history, streaks, and milestones.
        </p>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="mb-5">
          <Toast
            message="Health report downloaded successfully."
            show={showToast}
            onDismiss={() => setShowToast(false)}
          />
        </div>
      )}

      {/* Streak counters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-6 rounded-[20px] border flex items-center gap-5" style={{ background: "var(--surface)", borderColor: "var(--line)" }}>
          <Ring
            size={56}
            strokeWidth={5}
            progress={currentStreak / 30}
            color="var(--coral-dark)"
            bgColor="var(--coral-tint)"
            animated
          />
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: "var(--ink-soft)" }}>Current streak</p>
            <p className="font-display font-medium" style={{ fontSize: 34, color: "var(--ink)", lineHeight: 1 }}>
              {currentStreak} <span className="text-lg" style={{ color: "var(--ink-soft)" }}>days</span>
            </p>
          </div>
        </div>
        <div className="p-6 rounded-[20px] border flex items-center gap-5" style={{ background: "var(--surface)", borderColor: "var(--line)" }}>
          <Ring
            size={56}
            strokeWidth={5}
            progress={longestStreak / 365}
            color="var(--sage-dark)"
            bgColor="var(--sage-tint)"
            animated
          />
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: "var(--ink-soft)" }}>Longest streak</p>
            <p className="font-display font-medium" style={{ fontSize: 34, color: "var(--ink)", lineHeight: 1 }}>
              {longestStreak} <span className="text-lg" style={{ color: "var(--ink-soft)" }}>days</span>
            </p>
          </div>
        </div>
      </div>

      {/* Achievement badges */}
      <h2 className="font-display font-medium text-[17px] mb-4" style={{ color: "var(--ink)" }}>
        Achievement badges
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {achievements.map((badge) => (
          <div
            key={badge.id}
            className={cn(
              "p-5 rounded-[20px] border text-center flex flex-col items-center",
              !badge.unlocked && "opacity-40"
            )}
            style={{ background: "var(--surface)", borderColor: "var(--line)" }}
          >
            {/* Ring-based badge per spec 4.1 */}
            <div className="relative mb-3">
              {badge.unlocked ? (
                <Ring
                  size={44}
                  strokeWidth={4}
                  progress={1}
                  color="var(--sage-dark)"
                  bgColor="var(--sage-tint)"
                  animated
                  value={
                    <Check className="w-4 h-4" strokeWidth={2.5} style={{ color: "var(--sage-dark)" }} />
                  }
                />
              ) : (
                <Ring
                  size={44}
                  strokeWidth={3}
                  progress={1}
                  color="var(--line)"
                  bgColor="transparent"
                  animated={false}
                  dashed
                  value={
                    <Lock className="w-3.5 h-3.5" strokeWidth={1.5} style={{ color: "var(--ink-soft)" }} />
                  }
                />
              )}
            </div>
            <p className="text-xs font-semibold" style={{ color: "var(--ink)" }}>{badge.label}</p>
            {badge.unlockedAt && (
              <p className="text-[10px] mt-0.5" style={{ color: "var(--ink-soft)" }}>
                Earned {badge.unlockedAt}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Self-exam history */}
      <h2 className="font-display font-medium text-[17px] mb-4" style={{ color: "var(--ink)" }}>
        Self-exam history
      </h2>
      <div className="rounded-[20px] border overflow-hidden mb-8" style={{ background: "var(--surface)", borderColor: "var(--line)" }}>
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--line)" }}>
              <th className="text-left text-xs font-semibold px-5 py-3" style={{ color: "var(--ink-soft)" }}>Date</th>
              <th className="text-left text-xs font-semibold px-5 py-3" style={{ color: "var(--ink-soft)" }}>Type</th>
            </tr>
          </thead>
          <tbody>
            {selfExamHistory.map((exam, idx) => (
              <tr key={idx} className="border-b last:border-b-0" style={{ borderColor: "var(--line)" }}>
                <td className="px-5 py-3 text-sm" style={{ color: "var(--ink)" }}>{exam.date}</td>
                <td className="px-5 py-3 text-sm" style={{ color: "var(--ink)" }}>{exam.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export PDF */}
      <h2 className="font-display font-medium text-[17px] mb-4" style={{ color: "var(--ink)" }}>
        Health report
      </h2>
      <div
        className="rounded-[20px] border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ background: "var(--surface)", borderColor: "var(--line)" }}
      >
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--ink)" }}>Export your summary</p>
          <p className="text-xs" style={{ color: "var(--ink-soft)" }}>
            A PDF of your activity, diet, and risk indicators to share with your provider.
          </p>
        </div>
        <button onClick={handleExport} className="btn-medbuddy-primary btn-sm whitespace-nowrap">
          Export PDF
        </button>
      </div>
    </DashboardShell>
  );
}
