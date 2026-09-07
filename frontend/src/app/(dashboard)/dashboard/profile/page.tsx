"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { mockUser } from "@/lib/mock-data";
import { useState } from "react";
import Link from "next/link";

interface Toggles {
  email: boolean;
  web: boolean;
  reminders: boolean;
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b last:border-b-0" style={{ borderColor: "var(--line)" }}>
      <span className="text-[13.5px]" style={{ color: "var(--ink)" }}>{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className="toggle-track"
        style={{ background: checked ? "var(--sage-dark)" : "var(--line)", borderColor: checked ? "var(--sage-dark)" : "var(--line)" }}
      >
        <div className="toggle-thumb" style={{ left: checked ? "calc(100% - 18px)" : "2px" }} />
      </button>
    </div>
  );
}

export default function ProfilePage() {
  const [notif, setNotif] = useState<Toggles>({ email: true, web: true, reminders: true });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggle = (key: keyof Toggles) => setNotif((n) => ({ ...n, [key]: !n[key] }));

  return (
    <DashboardShell title="Profile & settings">
      <div className="mb-7">
        <h1 className="font-display text-[26px] font-medium mb-1.5" style={{ color: "var(--ink)" }}>
          Profile &amp; settings
        </h1>
      </div>

      {/* Personal info */}
      <h2 className="font-display font-medium text-[17px] mb-4" style={{ color: "var(--ink)" }}>Personal information</h2>
      <div
        className="rounded-[20px] border p-6 mb-6"
        style={{ background: "var(--surface)", borderColor: "var(--line)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--ink)" }}>Full name</label>
            <input defaultValue={mockUser.fullName} className="input-medbuddy" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--ink)" }}>Email</label>
            <input defaultValue={mockUser.email} disabled className="input-medbuddy" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--ink)" }}>Date of birth</label>
            <input type="date" defaultValue={mockUser.dateOfBirth} className="input-medbuddy" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--ink)" }}>Gender</label>
            <select defaultValue={mockUser.gender} className="input-medbuddy">
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--ink)" }}>Region</label>
            <select defaultValue={mockUser.region} className="input-medbuddy">
              <option value="usa">USA</option>
              <option value="southasia">South Asia</option>
              <option value="eu">European Union</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--ink)" }}>Language</label>
            <select defaultValue={mockUser.language} className="input-medbuddy">
              <option value="en">English</option>
              <option value="ur">Urdu</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleSave} className="btn-medbuddy-primary btn-sm">
            {saved ? "Saved!" : "Save changes"}
          </button>
          {saved && <span className="text-xs" style={{ color: "var(--sage-dark)" }}>Profile updated successfully.</span>}
        </div>
      </div>

      {/* Notification preferences */}
      <h2 className="font-display font-medium text-[17px] mb-4" style={{ color: "var(--ink)" }}>Notification preferences</h2>
      <div className="rounded-[20px] border p-5 mb-6" style={{ background: "var(--surface)", borderColor: "var(--line)" }}>
        <Toggle checked={notif.email}     onChange={() => toggle("email")}     label="Email reminders" />
        <Toggle checked={notif.web}       onChange={() => toggle("web")}       label="In-app notifications" />
        <Toggle checked={notif.reminders} onChange={() => toggle("reminders")} label="Screening reminders" />
      </div>

      {/* Danger zone */}
      <h2 className="font-display font-medium text-[17px] mb-4" style={{ color: "var(--coral-dark)" }}>Danger zone</h2>
      <div
        className="rounded-[20px] border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5"
        style={{ background: "var(--surface)", borderColor: "rgba(211,128,110,0.3)" }}
      >
        <p className="text-[13px]" style={{ color: "var(--ink-soft)" }}>
          Deleting your account permanently removes your data within 30 days.
        </p>
        <button
          className="btn-medbuddy-ghost btn-sm text-xs"
          style={{ borderColor: "var(--coral-dark)", color: "var(--coral-dark)" }}
        >
          Delete account
        </button>
      </div>

      {/* Legal links row per spec 6.3 */}
      <div className="flex flex-wrap gap-4 text-xs" style={{ color: "var(--ink-soft)" }}>
        <Link href="/privacy" className="hover:underline" style={{ color: "inherit" }}>Privacy policy</Link>
        <Link href="/terms" className="hover:underline" style={{ color: "inherit" }}>Terms of service</Link>
        <button className="hover:underline" style={{ color: "inherit" }}>Export my data</button>
      </div>
    </DashboardShell>
  );
}
