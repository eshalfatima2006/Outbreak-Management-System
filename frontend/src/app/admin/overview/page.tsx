"use client";

import { AdminShell } from "@/components/layout/admin-shell";
import { Eyebrow } from "@/components/shared/eyebrow";
import { mockAdminStats } from "@/lib/mock-data";

function AvatarChip({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
      style={{ background: "linear-gradient(135deg, var(--sage), var(--sand))" }}
    >
      {initials}
    </div>
  );
}

export default function AdminOverviewPage() {
  const stats = mockAdminStats;

  return (
    <AdminShell>
      <div className="mb-7">
        <Eyebrow className="mb-3">System metrics</Eyebrow>
        <h1 className="font-display text-[26px] font-medium mb-1.5" style={{ color: "var(--ink)" }}>
          Overview
        </h1>
        <p className="text-[13.5px]" style={{ color: "var(--ink-soft)" }}>
          Platform health at a glance.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total users",    value: stats.totalUsers.toLocaleString() },
          { label: "Active (7d)",    value: stats.active7d.toLocaleString() },
          { label: "New signups (7d)", value: stats.newSignups7d.toLocaleString() },
          { label: "Self-exams (7d)", value: stats.selfExams7d.toLocaleString() },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-[20px] border p-5"
            style={{ background: "var(--surface)", borderColor: "var(--line)" }}
          >
            <p className="text-xs mb-1" style={{ color: "var(--ink-soft)" }}>{stat.label}</p>
            <p className="font-display text-[26px] font-medium" style={{ color: "var(--ink)" }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Region breakdown */}
      <h2 className="font-display font-medium text-[17px] mb-4" style={{ color: "var(--ink)" }}>
        Region breakdown
      </h2>
      <div
        className="rounded-[20px] border p-6 space-y-4 mb-8"
        style={{ background: "var(--surface)", borderColor: "var(--line)" }}
      >
        {stats.regionBreakdown.map((region) => (
          <div key={region.region}>
            <div className="flex justify-between text-sm mb-1.5">
              <span style={{ color: "var(--ink)" }}>{region.region}</span>
              <span className="font-semibold" style={{ color: "var(--ink)" }}>{region.percentage}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--line)" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${region.percentage}%`, background: region.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recent signups - with avatar initial chip per spec */}
      <h2 className="font-display font-medium text-[17px] mb-4" style={{ color: "var(--ink)" }}>
        Recent signups
      </h2>
      <div
        className="rounded-[20px] border overflow-hidden"
        style={{ background: "var(--surface)", borderColor: "var(--line)" }}
      >
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--line)" }}>
              <th className="text-left text-xs font-semibold px-5 py-3" style={{ color: "var(--ink-soft)" }}>User</th>
              <th className="text-left text-xs font-semibold px-5 py-3" style={{ color: "var(--ink-soft)" }}>Region</th>
              <th className="text-left text-xs font-semibold px-5 py-3" style={{ color: "var(--ink-soft)" }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentSignups?.map((user, i) => (
              <tr key={i} className="border-b last:border-b-0" style={{ borderColor: "var(--line)" }}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <AvatarChip name={user.name} />
                    <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>{user.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm" style={{ color: "var(--ink-soft)" }}>{user.region}</td>
                <td className="px-5 py-3 text-sm" style={{ color: "var(--ink-soft)" }}>{user.joinedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
