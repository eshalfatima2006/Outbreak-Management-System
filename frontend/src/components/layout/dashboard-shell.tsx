"use client";
import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { GdprBanner } from "@/components/shared/gdpr-banner";

interface DashboardShellProps {
  children: ReactNode;
  title?: string;
}

export function DashboardShell({ children, title }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg)", color: "var(--ink)" }}>
      <Sidebar />
      <main className="flex-1 min-w-0">
        <Topbar title={title} />
        {/* Max-width 1100px per spec 3.1 */}
        <div className="p-8" style={{ maxWidth: 1100, margin: "0 auto" }}>
          {children}
        </div>
      </main>
      <GdprBanner />
    </div>
  );
}
