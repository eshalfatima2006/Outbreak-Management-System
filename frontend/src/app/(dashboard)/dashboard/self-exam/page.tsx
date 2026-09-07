"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { DisclaimerBanner } from "@/components/shared/disclaimer-banner";
import { mockSelfExamGuides, mockUser } from "@/lib/mock-data";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/shared/eyebrow";

const tintGradients = [
  "linear-gradient(135deg, var(--sage-tint), var(--sand-tint))",
  "linear-gradient(135deg, var(--coral-tint), var(--sand-tint))",
  "linear-gradient(135deg, var(--sand-tint), var(--sage-tint))",
];

export default function SelfExamPage() {
  const filteredGuides = mockSelfExamGuides.filter((guide) => {
    if (guide.genderTarget !== "all" && guide.genderTarget !== mockUser.gender) return false;
    if (!guide.ageGroups.includes(mockUser.ageGroup)) return false;
    return true;
  });

  return (
    <DashboardShell title="Self-exam guides">
      <div className="mb-7">
        <Eyebrow className="mb-3">Self-exam</Eyebrow>
        <h1 className="font-display text-[26px] font-medium mb-1.5" style={{ color: "var(--ink)" }}>
          Self-exam guides
        </h1>
        <p className="text-[13.5px]" style={{ color: "var(--ink-soft)" }}>
          Choose a guide appropriate to your profile.
        </p>
      </div>

      <DisclaimerBanner className="mb-6">
        For awareness only. These guides do not detect or diagnose cancer. Always consult a qualified healthcare professional.
      </DisclaimerBanner>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredGuides.map((guide, idx) => (
          <Link
            key={guide.id}
            href={`/dashboard/self-exam/${guide.slug}`}
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
            {/* Thumbnail - gradient rotates by position */}
            <div
              className="w-full aspect-[16/10] rounded-xl mb-3.5"
              style={{ background: tintGradients[idx % 3] }}
            />
            <div className="flex items-center gap-2 mb-2">
              <span
                className={cn(
                  "text-[10px] font-bold px-2.5 py-1 rounded-full",
                  guide.genderTarget === "all"
                    ? "bg-sand-50 text-sand-dark"
                    : "bg-sage-50 text-sage-dark"
                )}
              >
                {guide.genderTarget === "all" ? "All genders" : guide.genderTarget}
              </span>
              {guide.dueInDays != null && guide.dueInDays <= 7 && (
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: "var(--coral-tint)", color: "var(--coral-dark)" }}>
                  Due in {guide.dueInDays} days
                </span>
              )}
            </div>
            <h3 className="font-display font-medium text-[15.5px] mb-1.5" style={{ color: "var(--ink)" }}>
              {guide.title}
            </h3>
            <p className="text-xs mb-3" style={{ color: "var(--ink-soft)" }}>{guide.description}</p>
            <span className="text-xs font-semibold flex items-center gap-1.5 transition-all group-hover:gap-2.5" style={{ color: "var(--sage-dark)" }}>
              Start guide
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </DashboardShell>
  );
}
