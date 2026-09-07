"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";

const dietTabs = [
  { label: "Plan",    href: "/dashboard/diet" },
  { label: "Foods",  href: "/dashboard/diet/foods" },
  { label: "Meals",  href: "/dashboard/diet/meals" },
  { label: "Grocery", href: "/dashboard/diet/grocery" },
];

const mealSlots = ["Breakfast", "Lunch", "Dinner"] as const;

interface LoggedMeal {
  slot: string;
  name: string;
}

export default function MealsPage() {
  const pathname = usePathname();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [logged, setLogged] = useState<LoggedMeal[]>([]);
  const [adding, setAdding] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const addMeal = (slot: string) => {
    if (!draft.trim()) return;
    setLogged((prev) => [...prev, { slot, name: draft.trim() }]);
    setDraft("");
    setAdding(null);
  };

  return (
    <DashboardShell title="Meal log">
      <div className="mb-7">
        <h1 className="font-display text-[26px] font-medium mb-1.5" style={{ color: "var(--ink)" }}>
          Meal log
        </h1>
        <p className="text-[13.5px]" style={{ color: "var(--ink-soft)" }}>
          Track what you ate today.
        </p>
      </div>

      {/* Sub-nav */}
      <div className="flex gap-6 mb-6 border-b" style={{ borderColor: "var(--line)" }}>
        {dietTabs.map((tab) => {
          const active = tab.href === "/dashboard/diet"
            ? pathname === "/dashboard/diet"
            : pathname?.startsWith(tab.href);
          return (
            <Link key={tab.label} href={tab.href}
              className="pb-3 pt-1 text-[13.5px] font-medium border-b-2 transition-colors"
              style={{ color: active ? "var(--sage-dark)" : "var(--ink-soft)", fontWeight: active ? 600 : 500, borderColor: active ? "var(--coral-dark)" : "transparent", textDecoration: "none" }}
            >{tab.label}</Link>
          );
        })}
      </div>

      {/* Date picker */}
      <div className="flex items-center gap-3 mb-6">
        <label className="text-xs font-semibold" style={{ color: "var(--ink)" }}>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input-medbuddy"
          style={{ width: "auto" }}
        />
      </div>

      {/* Meal slots */}
      <div className="space-y-4 mb-6">
        {mealSlots.map((slot) => {
          const slotMeals = logged.filter((m) => m.slot === slot);
          const isAdding = adding === slot;
          return (
            <div key={slot} className="rounded-[20px] border p-5" style={{ background: "var(--surface)", borderColor: "var(--line)" }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-medium text-[15px]" style={{ color: "var(--ink)" }}>{slot}</h3>
                {!isAdding && (
                  <button
                    onClick={() => setAdding(slot)}
                    className="btn-medbuddy-ghost btn-sm text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                    Add meal
                  </button>
                )}
              </div>

              {slotMeals.map((m, i) => (
                <p key={i} className="text-sm py-1 border-b last:border-b-0" style={{ color: "var(--ink)", borderColor: "var(--line)" }}>
                  {m.name}
                </p>
              ))}

              {isAdding && (
                <div className="flex gap-2 mt-2">
                  <input
                    autoFocus
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") addMeal(slot); if (e.key === "Escape") { setAdding(null); setDraft(""); } }}
                    className="input-medbuddy flex-1"
                    placeholder="What did you eat?"
                  />
                  <button onClick={() => addMeal(slot)} className="btn-medbuddy-primary btn-sm text-xs">Add</button>
                  <button onClick={() => { setAdding(null); setDraft(""); }} className="btn-medbuddy-ghost btn-sm text-xs">Cancel</button>
                </div>
              )}

              {slotMeals.length === 0 && !isAdding && (
                <p className="text-xs" style={{ color: "var(--ink-soft)" }}>Nothing logged yet.</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Suggestion panel */}
      <div className="rounded-[20px] p-5" style={{ background: "var(--sage-tint)" }}>
        <p className="text-xs font-semibold mb-1" style={{ color: "var(--sage-dark)" }}>Today&apos;s tip</p>
        <p className="text-[13px]" style={{ color: "var(--ink)" }}>
          Aim for at least two servings of cruciferous vegetables today - broccoli, Brussels sprouts, or cauliflower are great picks.
        </p>
      </div>
    </DashboardShell>
  );
}
