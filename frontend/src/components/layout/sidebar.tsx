"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mockUser } from "@/lib/mock-data";
import {
  Home, Search, AlertCircle, UtensilsCrossed, Zap,
  TrendingUp, Calendar, Users, Bell, User, Heart,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  subItems?: { name: string; href: string }[];
  /** If set, only show when mockUser.ageGroup matches */
  requiresAgeGroup?: string;
}

const navItems: NavItem[] = [
  { name: "Dashboard",     href: "/dashboard",                icon: <Home          className="w-4 h-4" strokeWidth={1.7} /> },
  { name: "Self exam",     href: "/dashboard/self-exam",      icon: <Search        className="w-4 h-4" strokeWidth={1.7} /> },
  { name: "Warning signs", href: "/dashboard/warning-signs",  icon: <AlertCircle   className="w-4 h-4" strokeWidth={1.7} /> },
  {
    name: "Diet",
    href: "/dashboard/diet",
    icon: <UtensilsCrossed className="w-4 h-4" strokeWidth={1.7} />,
    subItems: [
      { name: "Plan",    href: "/dashboard/diet" },
      { name: "Foods",   href: "/dashboard/diet/foods" },
      { name: "Meals",   href: "/dashboard/diet/meals" },
      { name: "Grocery", href: "/dashboard/diet/grocery" },
    ],
  },
  { name: "Exercise",      href: "/dashboard/exercise",       icon: <Zap           className="w-4 h-4" strokeWidth={1.7} /> },
  { name: "Progress",      href: "/dashboard/progress",       icon: <TrendingUp    className="w-4 h-4" strokeWidth={1.7} /> },
  { name: "Screening",     href: "/dashboard/screening",      icon: <Calendar      className="w-4 h-4" strokeWidth={1.7} /> },
  { name: "Community",     href: "/dashboard/community",      icon: <Users         className="w-4 h-4" strokeWidth={1.7} /> },
  {
    name: "Caregiver",
    href: "/dashboard/caregiver",
    icon: <Heart className="w-4 h-4" strokeWidth={1.7} />,
    requiresAgeGroup: "adults-40-plus",
  },
  { name: "Notifications", href: "/dashboard/notifications",  icon: <Bell          className="w-4 h-4" strokeWidth={1.7} /> },
  { name: "Profile",       href: "/dashboard/profile",        icon: <User          className="w-4 h-4" strokeWidth={1.7} /> },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname?.startsWith(href));

  const visibleItems = navItems.filter(
    (item) => !item.requiresAgeGroup || item.requiresAgeGroup === mockUser.ageGroup
  );

  return (
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
          MedBuddy
        </div>
      </div>

      {/* Nav */}
      <nav className="px-3 pb-6 flex-1">
        {visibleItems.map((item) => {
          const active = isActive(item.href);
          return (
            <div key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 overflow-hidden",
                  active
                    ? "font-semibold"
                    : "hover:bg-sage-50 hover:text-ink"
                )}
                style={{
                  color: active ? "var(--sage-dark)" : "var(--ink-soft)",
                  background: active ? "var(--sage-tint)" : undefined,
                }}
              >
                {/* Coral active indicator bar - positioned left, outside padding box */}
                {active && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full"
                    style={{
                      width: 3,
                      height: 20,
                      background: "var(--coral-dark)",
                    }}
                  />
                )}
                <span className="flex-shrink-0 ml-1">{item.icon}</span>
                {item.name}
              </Link>

              {/* Sub-items (Diet sub-nav) */}
              {item.subItems && (
                <div className="ml-9 mt-0.5 mb-1 flex flex-col gap-0.5">
                  {item.subItems.map((sub) => {
                    const subActive =
                      sub.href === "/dashboard/diet"
                        ? pathname === "/dashboard/diet"
                        : pathname?.startsWith(sub.href);
                    return (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={{
                          color: subActive ? "var(--sage-dark)" : "var(--ink-soft)",
                          background: subActive ? "var(--sage-tint)" : undefined,
                        }}
                      >
                        {sub.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User card at bottom */}
      <div className="p-3 pb-6">
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl border"
          style={{ background: "var(--bg)", borderColor: "var(--line)" }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
            style={{ background: "linear-gradient(135deg, var(--sage), var(--sand))" }}
          >
            {mockUser.fullName.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate" style={{ color: "var(--ink)" }}>
              {mockUser.fullName}
            </div>
            <div className="text-xs" style={{ color: "var(--ink-soft)" }}>
              {mockUser.ageGroup} - {mockUser.region}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
