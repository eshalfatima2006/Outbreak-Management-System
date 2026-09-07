"use client";

import { AdminShell } from "@/components/layout/admin-shell";
import { mockAdminUsers } from "@/lib/mock-data";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";

function AvatarChip({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
      style={{ background: "linear-gradient(135deg, var(--sage), var(--sand))" }}
    >
      {initials}
    </div>
  );
}

const statusColors: Record<string, { bg: string; color: string }> = {
  active:   { bg: "var(--sage-tint)",  color: "var(--sage-dark)" },
  inactive: { bg: "var(--sand-tint)",  color: "#a8944f" },
  banned:   { bg: "var(--coral-tint)", color: "var(--coral-dark)" },
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("All");

  const filtered = mockAdminUsers.filter((user) => {
    const matchSearch =
      !search ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchRegion = regionFilter === "All" || user.region === regionFilter;
    const matchAge = ageFilter === "All" || user.ageGroup === ageFilter;
    return matchSearch && matchRegion && matchAge;
  });

  return (
    <AdminShell>
      <div className="mb-7">
        <h1 className="font-display text-[26px] font-medium mb-1.5" style={{ color: "var(--ink)" }}>
          User management
        </h1>
        <p className="text-[13.5px]" style={{ color: "var(--ink-soft)" }}>
          {mockAdminUsers.length.toLocaleString()} total users
        </p>
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" strokeWidth={1.7} style={{ color: "var(--ink-soft)" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            className="input-medbuddy"
            style={{ paddingLeft: 36 }}
          />
        </div>
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="input-medbuddy"
          style={{ width: "auto" }}
        >
          <option value="All">All regions</option>
          <option value="usa">USA</option>
          <option value="southasia">South Asia</option>
          <option value="eu">EU</option>
        </select>
        <select
          value={ageFilter}
          onChange={(e) => setAgeFilter(e.target.value)}
          className="input-medbuddy"
          style={{ width: "auto" }}
        >
          <option value="All">All ages</option>
          <option value="18-29">18-29</option>
          <option value="30-39">30-39</option>
          <option value="40+">40+</option>
        </select>
      </div>

      {/* Data table */}
      <div className="rounded-[20px] border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--line)" }}>
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--line)" }}>
              <th className="text-left text-xs font-semibold px-5 py-3" style={{ color: "var(--ink-soft)" }}>User</th>
              <th className="text-left text-xs font-semibold px-5 py-3" style={{ color: "var(--ink-soft)" }}>Region</th>
              <th className="text-left text-xs font-semibold px-5 py-3" style={{ color: "var(--ink-soft)" }}>Age band</th>
              <th className="text-left text-xs font-semibold px-5 py-3" style={{ color: "var(--ink-soft)" }}>Status</th>
              <th className="text-left text-xs font-semibold px-5 py-3" style={{ color: "var(--ink-soft)" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-sm text-center" style={{ color: "var(--ink-soft)" }}>
                  No users match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((user) => {
                const statusStyle = statusColors[user.status] ?? statusColors.inactive;
                return (
                  <tr key={user.id} className="border-b last:border-b-0" style={{ borderColor: "var(--line)" }}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <AvatarChip name={user.name} />
                        <div>
                          <div className="text-sm font-medium" style={{ color: "var(--ink)" }}>{user.name}</div>
                          <div className="text-[11px]" style={{ color: "var(--ink-soft)" }}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm" style={{ color: "var(--ink-soft)" }}>{user.region}</td>
                    <td className="px-5 py-3 text-sm" style={{ color: "var(--ink-soft)" }}>{user.ageGroup}</td>
                    <td className="px-5 py-3">
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full capitalize"
                        style={{ background: statusStyle.bg, color: statusStyle.color }}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="text-xs font-semibold hover:underline"
                        style={{ color: "var(--sage-dark)" }}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
