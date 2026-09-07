"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { DisclaimerBanner } from "@/components/shared/disclaimer-banner";
import { mockWarningSigns } from "@/lib/mock-data";
import { useState } from "react";
import { Eyebrow } from "@/components/shared/eyebrow";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const types = ["All", "Breast", "Skin", "Colorectal", "Prostate", "Lung"];

export default function WarningSignsPage() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = mockWarningSigns.filter(
    (sign) => filter === "All" || sign.type === filter
  );

  return (
    <DashboardShell title="Warning signs">
      <div className="mb-7">
        <Eyebrow className="mb-3">Awareness</Eyebrow>
        <h1 className="font-display text-[26px] font-medium mb-1.5" style={{ color: "var(--ink)" }}>
          Warning signs
        </h1>
        <p className="text-[13.5px]" style={{ color: "var(--ink-soft)" }}>
          Organized by type, age, and gender.
        </p>
      </div>

      <DisclaimerBanner className="mb-6">
        For awareness only. Does not detect or diagnose cancer. Always consult a qualified healthcare professional.
      </DisclaimerBanner>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={cn("pill", filter === type && "selected")}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Expandable panels */}
      <div className="space-y-3">
        {filtered.map((sign) => {
          const isOpen = expanded === sign.id;
          return (
            <div
              key={sign.id}
              className="rounded-[20px] border overflow-hidden"
              style={{ background: "var(--surface)", borderColor: "var(--line)" }}
            >
              <button
                className="w-full flex items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-sage-50"
                onClick={() => setExpanded(isOpen ? null : sign.id)}
                aria-expanded={isOpen}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-medium text-[14.5px]" style={{ color: "var(--ink)" }}>
                      {sign.title}
                    </h3>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "var(--sage-tint)", color: "var(--sage-dark)" }}
                  >
                    {sign.type} - {sign.ageRelevance}
                  </span>
                </div>
                <ChevronDown
                  className="w-4 h-4 flex-shrink-0 mt-1 transition-transform duration-200"
                  style={{
                    color: "var(--ink-soft)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  strokeWidth={1.8}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 border-t" style={{ borderColor: "var(--line)" }}>
                  <p className="text-xs leading-relaxed mt-4 mb-3" style={{ color: "var(--ink-soft)" }}>
                    {sign.description}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                    <span className="font-semibold" style={{ color: "var(--ink)" }}>
                      When to see a doctor:
                    </span>{" "}
                    {sign.whenToSeeDoctor}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DashboardShell>
  );
}
