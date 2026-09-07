"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { mockDietPlan } from "@/lib/mock-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/shared/eyebrow";

const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const dayLabels: Record<string, string> = {
  mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun",
};

// Highlight today's day by default (0=Sun, 1=Mon ... shift)
function getTodayKey() {
  const jsDay = new Date().getDay(); // 0=Sun
  const mapped = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return (mapped[jsDay] as typeof days[number]) || "mon";
}

const dietTabs = [
  { label: "Plan",    href: "/dashboard/diet" },
  { label: "Foods",  href: "/dashboard/diet/foods" },
  { label: "Meals",  href: "/dashboard/diet/meals" },
  { label: "Grocery", href: "/dashboard/diet/grocery" },
];

export default function DietPage() {
  const pathname = usePathname();
  const [selectedDay, setSelectedDay] = useState<keyof typeof mockDietPlan.meals>(
    days.includes(getTodayKey() as typeof days[number]) ? getTodayKey() as typeof days[number] : "mon"
  );
  const dayPlan = mockDietPlan.meals[selectedDay];

  return (
    <DashboardShell title="Diet plan">
      <div className="mb-7">
        <Eyebrow className="mb-3">Nutrition</Eyebrow>
        <h1 className="font-display text-[26px] font-medium mb-1.5" style={{ color: "var(--ink)" }}>
          Diet plan
        </h1>
        <p className="text-[13.5px]" style={{ color: "var(--ink-soft)" }}>
          Your 7-day plan, built for your profile.
        </p>
      </div>

      {/* Sub-nav tabs - active state driven by pathname */}
      <div className="flex gap-6 mb-6 border-b" style={{ borderColor: "var(--line)" }}>
        {dietTabs.map((tab) => {
          const active =
            tab.href === "/dashboard/diet"
              ? pathname === "/dashboard/diet"
              : pathname?.startsWith(tab.href);
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className="pb-3 pt-1 text-[13.5px] font-medium border-b-2 transition-colors"
              style={{
                color: active ? "var(--sage-dark)" : "var(--ink-soft)",
                fontWeight: active ? 600 : 500,
                borderColor: active ? "var(--coral-dark)" : "transparent",
                textDecoration: "none",
              }}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Day pills */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={cn("pill", selectedDay === day && "selected")}
          >
            {dayLabels[day]}
          </button>
        ))}
      </div>

      {/* Meals grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {(["breakfast", "lunch", "dinner", "snacks"] as const).map((meal) => (
          <div key={meal} className="rounded-[20px] border p-5" style={{ background: "var(--surface)", borderColor: "var(--line)" }}>
            <Eyebrow className="mb-2">{meal}</Eyebrow>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--ink)" }}>
              {dayPlan[meal].name}
            </p>
            {dayPlan[meal].description && (
              <p className="text-xs" style={{ color: "var(--ink-soft)" }}>
                {dayPlan[meal].description}
              </p>
            )}
          </div>
        ))}
      </div>

      <Link href="/dashboard/diet/grocery" className="btn-medbuddy-primary btn-sm text-xs">
        View grocery list
      </Link>
    </DashboardShell>
  );
}
