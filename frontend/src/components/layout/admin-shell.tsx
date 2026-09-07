"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, FileText, BarChart3, Bell, ShieldCheck } from "lucide-react";

const navItems = [
  { name: "Overview",      href: "/admin/overview",      icon: <LayoutDashboard className="w-4 h-4" strokeWidth={1.7} /> },
  { name: "Users",         href: "/admin/users",         icon: <Users           className="w-4 h-4" strokeWidth={1.7} /> },
  { name: "Content",       href: "/admin/content",       icon: <FileText        className="w-4 h-4" strokeWidth={1.7} /> },
  { name: "Analytics",     href: "/admin/analytics",     icon: <BarChart3       className="w-4 h-4" strokeWidth={1.7} /> },
  { name: "Notifications", href: "/admin/notifications", icon: <Bell            className="w-4 h-4" strokeWidth={1.7} /> },
  { name: "Compliance",    href: "/admin/compliance",    icon: <ShieldCheck     className="w-4 h-4" strokeWidth={1.7} /> },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href);

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg)", color: "var(--ink)" }}>
      {/*  Sidebar  */}
      <aside
        className="w-[246px] flex-shrink-0 border-r h-screen sticky top-0 flex flex-col sidebar-scroll overflow-y-auto"
        style={{ background: "var(--surface)", borderColor: "var(--line)" }}
      >
        {/* Logo */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 font-display text-xl font-semibold" style={{ color: "var(--ink)" }}>
            <svg viewBox="0 0 26 26" fill="none" className="w-7 h-7">
              <circle cx="13" cy="13" r="10.5" stroke="#517E70" strokeWidth="1.6" />
              <path d="M13 7.5v11M7.5 13h11" stroke="#D3806E" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Admin
          </div>
        </div>

        {/* Nav */}
        <nav className="px-3 pb-6 flex-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 overflow-hidden"
                style={{
                  color: active ? "var(--sage-dark)" : "var(--ink-soft)",
                  fontWeight: active ? 600 : 500,
                  background: active ? "var(--sage-tint)" : undefined,
                }}
              >
                {/* Coral active indicator - left edge bar per spec 4.7 */}
                {active && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full"
                    style={{ width: 3, height: 20, background: "var(--coral-dark)" }}
                  />
                )}
                <span className="flex-shrink-0 ml-1">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Admin user card */}
        <div className="p-3 pb-6">
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl border"
            style={{ background: "var(--bg)", borderColor: "var(--line)" }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: "var(--sage-dark)" }}
            >
              SA
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate" style={{ color: "var(--ink)" }}>Super Admin</div>
              <div className="text-xs truncate" style={{ color: "var(--ink-soft)" }}>admin@medbuddy.io</div>
            </div>
          </div>
        </div>
      </aside>

      {/*  Main  */}
      <main className="flex-1 min-w-0">
        {/* Topbar */}
        <div
          className="sticky top-0 z-10 flex justify-between items-center px-8 py-4 border-b"
          style={{
            background: "rgba(250,247,242,0.86)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderColor: "var(--line)",
            zIndex: "var(--z-sticky)",
          }}
        >
          <div className="font-semibold text-sm" style={{ color: "var(--ink)" }}>Admin Panel</div>
          <div className="flex items-center gap-4">
            <Link href="/auth/sign-in" className="text-sm font-semibold hover:underline" style={{ color: "var(--ink-soft)" }}>
              Log out
            </Link>
          </div>
        </div>

        {/* Content area - max-width 1100px per spec */}
        <div className="p-8" style={{ maxWidth: 1100, margin: "0 auto" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
