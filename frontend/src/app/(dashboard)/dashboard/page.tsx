"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ScoreCard } from "@/components/shared/score-card";
import { mockDashboard } from "@/lib/mock-data";
import Link from "next/link";
import { Search, UtensilsCrossed, Zap, TrendingUp, ArrowRight, CheckCircle, Sun } from "lucide-react";

const quickLinks = [
  { name: "Self-exam guides",    href: "/dashboard/self-exam",  Icon: Search },
  { name: "This week's diet",    href: "/dashboard/diet",       Icon: UtensilsCrossed },
  { name: "Exercise library",    href: "/dashboard/exercise",   Icon: Zap },
  { name: "Progress & badges",   href: "/dashboard/progress",   Icon: TrendingUp },
];

const activityIcons = [
  <CheckCircle key="check" className="w-4 h-4" strokeWidth={1.8} />,
  <Sun         key="sun"   className="w-4 h-4" strokeWidth={1.8} />,
  <Zap         key="zap"   className="w-4 h-4" strokeWidth={1.8} />,
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function formatTime(timestamp: string) {
  const date = new Date(timestamp);
  const diffHours = Math.floor((Date.now() - date.getTime()) / 3_600_000);
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffHours < 48) return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const tintPairs = [
  { bg: "var(--sage-tint)",  color: "var(--sage-dark)" },
  { bg: "var(--coral-tint)", color: "var(--coral-dark)" },
  { bg: "var(--sand-tint)",  color: "#a8944f" },
];

export default function DashboardPage() {
  const { user, scores, todayFocus, recentActivity } = mockDashboard;

  return (
    <DashboardShell title="Dashboard">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="font-display text-[30px] font-medium" style={{ color: "var(--ink)" }}>
          {getGreeting()}, {user.name}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--ink-soft)" }}>
          Here&apos;s where things stand today.
        </p>
      </div>

      {/* Score Cards - use shared ScoreCard component */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <ScoreCard
          label="Activity"
          value={`${scores.activity}%`}
          description="4 of 5 goals hit"
          progress={scores.activity / 100}
          color="sage"
        />
        <ScoreCard
          label="Diet"
          value={`${scores.diet}%`}
          description="Log dinner to catch up"
          progress={scores.diet / 100}
          color="coral"
        />
        {/* Risk Indicator - word label only, no percentage per spec 7.3 */}
        <ScoreCard
          label="Risk indicator"
          value={scores.riskIndicator}
          description="Awareness only"
          progress={0.15}
          color="sand"
        />
      </div>

      {/* Today's Focus */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-display font-medium" style={{ color: "var(--ink)" }}>
          Today&apos;s focus
        </h2>
        <Link href="/dashboard/progress" className="text-xs font-semibold" style={{ color: "var(--sage-dark)" }}>
          View all 
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {todayFocus.map((item, idx) => {
          const tint = tintPairs[idx % 3];
          return (
            <Link
              key={idx}
              href={item.link}
              className="group block p-5 rounded-[20px] border cursor-pointer"
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
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: tint.bg, color: tint.color }}>
                {activityIcons[idx % 3]}
              </div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--ink)" }}>{item.title}</h3>
              <p className="text-xs mb-3" style={{ color: "var(--ink-soft)" }}>{item.description}</p>
              {item.duration && (
                <span className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: "var(--bg)", color: "var(--ink-soft)" }}>
                  {item.duration}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Recent Activity + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 p-6 rounded-[20px] border" style={{ background: "var(--surface)", borderColor: "var(--line)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold" style={{ color: "var(--ink)" }}>Recent activity</h3>
            <Link href="/dashboard/progress" className="text-xs font-semibold" style={{ color: "var(--sage-dark)" }}>View history </Link>
          </div>
          {recentActivity.map((item, idx) => {
            const tint = tintPairs[idx % 3];
            return (
              <div key={idx} className="flex items-center gap-3 py-3 border-b last:border-b-0" style={{ borderColor: "var(--line)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: tint.bg, color: tint.color }}>
                  {activityIcons[idx % 3]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: "var(--ink)" }}>{item.title}</div>
                  <div className="text-xs" style={{ color: "var(--ink-soft)" }}>{item.detail}</div>
                </div>
                <div className="text-[10px] flex-shrink-0" style={{ color: "var(--ink-soft)" }}>{formatTime(item.timestamp)}</div>
              </div>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="p-6 rounded-[20px] border" style={{ background: "var(--surface)", borderColor: "var(--line)" }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--ink)" }}>Quick links</h3>
          <div className="flex flex-col gap-1">
            {quickLinks.map(({ name, href, Icon }) => (
              <Link
                key={name}
                href={href}
                className="group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors"
                style={{ color: "var(--ink)", textDecoration: "none" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--sage-tint)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <span className="flex items-center gap-3">
                  <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.7} style={{ color: "var(--ink-soft)" }} />
                  {name}
                </span>
                <ArrowRight
                  className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={1.7}
                  style={{ color: "var(--ink-soft)" }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
