"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { DisclaimerBanner } from "@/components/shared/disclaimer-banner";
import { Badge } from "@/components/ui/badge";
import { mockScreeningReminders } from "@/lib/mock-data";
import Link from "next/link";
import { Eyebrow } from "@/components/shared/eyebrow";

export default function ScreeningPage() {
  return (
    <DashboardShell title="Screening & awareness">
      <div className="mb-7">
        <Eyebrow className="mb-3">Prevention</Eyebrow>
        <h1 className="font-display text-[26px] font-medium mb-1.5" style={{ color: "var(--ink)" }}>
          Screening &amp; awareness
        </h1>
        <p className="text-[13.5px]" style={{ color: "var(--ink-soft)" }}>
          Age-based reminders for the checks that matter.
        </p>
      </div>

      <DisclaimerBanner className="mb-6">
        Not medical advice - always confirm with your provider. Always consult a qualified healthcare professional.
      </DisclaimerBanner>

      <div className="flex flex-col gap-3 mb-6">
        {mockScreeningReminders.map((reminder) => (
          <div
            key={reminder.id}
            className="rounded-[20px] border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            style={{ background: "var(--surface)", borderColor: "var(--line)" }}
          >
            <div>
              <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--ink)" }}>
                {reminder.type}
              </p>
              <p className="text-xs" style={{ color: "var(--ink-soft)" }}>
                Recommended from age {reminder.recommendedAge}. {reminder.description}
              </p>
            </div>
            <Badge
              variant={
                reminder.status === "due"
                  ? "due"
                  : reminder.status === "upcoming"
                  ? "soon"
                  : "ok"
              }
            >
              {reminder.status === "due"
                ? "Due now"
                : reminder.status === "upcoming"
                ? "Upcoming"
                : "Not yet due"}
            </Badge>
          </div>
        ))}
      </div>

      <Link href="/dashboard/screening/locator" className="btn-medbuddy-primary">
        Find screening centers near you
      </Link>
    </DashboardShell>
  );
}
