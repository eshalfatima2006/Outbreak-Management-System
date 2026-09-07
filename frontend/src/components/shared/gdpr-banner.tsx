"use client";
import { useState } from "react";
import { mockUser } from "@/lib/mock-data";

/**
 * GDPR consent banner - shows fixed-bottom for EU users on first visit.
 * Per spec 7.2: no pre-ticked behaviour, explicit Accept action only.
 */
export function GdprBanner() {
  const [dismissed, setDismissed] = useState(false);

  // Only show for EU region users
  if (mockUser.region !== "eu" || dismissed) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4"
      style={{ zIndex: "var(--z-toast)" }}
    >
      <div
        className="max-w-[1180px] mx-auto disclaimer-banner flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{ boxShadow: "var(--elev-4)" }}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Alert triangle icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--sage-dark)"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: 17, height: 17, flexShrink: 0, marginTop: 1 }}
          >
            <path d="M10.3 3.9L2.5 17a2 2 0 001.7 3h15.6a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
            <path d="M12 9v4M12 16.5h.01" />
          </svg>
          <span>
            <strong>Cookie & data notice:</strong> MedBuddy uses essential cookies only. We store
            your wellness data to personalise your experience. By continuing, you agree to our{" "}
            <a href="/privacy" className="underline" style={{ color: "var(--sage-dark)" }}>
              Privacy Policy
            </a>
            . No marketing cookies, no data selling.
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="btn-medbuddy-primary btn-sm whitespace-nowrap flex-shrink-0"
        >
          Accept & continue
        </button>
      </div>
    </div>
  );
}
