"use client";

import { AdminShell } from "@/components/layout/admin-shell";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

type ContentType = "exercises" | "diet-plans" | "self-exam-guides";

const contentTabs: { key: ContentType; label: string }[] = [
  { key: "exercises",        label: "Exercises" },
  { key: "diet-plans",       label: "Diet plans" },
  { key: "self-exam-guides", label: "Self-exam guides" },
];

const mockContent: Record<ContentType, { id: string; title: string; status: string }[]> = {
  exercises: [
    { id: "1", title: "Upper Body Resistance",        status: "published" },
    { id: "2", title: "Low-Impact Yoga Flow",          status: "published" },
    { id: "3", title: "Core Strength Fundamentals",    status: "draft" },
  ],
  "diet-plans": [
    { id: "1", title: "7-Day Anti-Inflammatory Plan",  status: "published" },
    { id: "2", title: "High-Fibre Reset Plan",          status: "draft" },
  ],
  "self-exam-guides": [
    { id: "1", title: "Breast Self-Exam",              status: "published" },
    { id: "2", title: "Testicular Self-Exam",          status: "published" },
    { id: "3", title: "Skin Check Guide",              status: "published" },
  ],
};

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<ContentType>("exercises");
  const [youtubeId, setYoutubeId] = useState("");
  const [showForm, setShowForm] = useState(false);

  const items = mockContent[activeTab];

  return (
    <AdminShell>
      <div className="mb-7">
        <h1 className="font-display text-[26px] font-medium mb-1.5" style={{ color: "var(--ink)" }}>
          Content management
        </h1>
        <p className="text-[13.5px]" style={{ color: "var(--ink-soft)" }}>
          Manage the 3 Phase-1 content types.
        </p>
      </div>

      {/* Content-type tab row + Add button */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {contentTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setShowForm(false); setYoutubeId(""); }}
              className={cn("pill", activeTab === tab.key && "selected")}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-medbuddy-primary btn-sm flex items-center gap-1.5 flex-shrink-0"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          Add
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div
          className="rounded-[20px] border p-6 mb-6"
          style={{ background: "var(--surface)", borderColor: "var(--line)" }}
        >
          <h2 className="font-display font-medium text-[16px] mb-4" style={{ color: "var(--ink)" }}>
            Add new - {contentTabs.find((t) => t.key === activeTab)?.label}
          </h2>
          <div className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--ink)" }}>Title</label>
              <input className="input-medbuddy" placeholder="e.g. Full Body Strength" />
            </div>

            {/* YouTube Video ID field with live 16:9 preview embed */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--ink)" }}>
                YouTube Video ID
              </label>
              <input
                className="input-medbuddy"
                placeholder="e.g. dQw4w9WgXcQ"
                value={youtubeId}
                onChange={(e) => setYoutubeId(e.target.value.trim())}
              />
              <p className="text-[11px] mt-1" style={{ color: "var(--ink-soft)" }}>
                Paste only the video ID (the part after <code>?v=</code>), not the full URL.
              </p>

              {/* Live 16:9 YouTube embed preview */}
              {youtubeId && (
                <div className="mt-3 w-full aspect-video rounded-[14px] overflow-hidden" style={{ background: "#1a2320" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title="YouTube video preview"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--ink)" }}>Status</label>
              <select className="input-medbuddy" style={{ width: "auto" }}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button className="btn-medbuddy-primary btn-sm">Save</button>
              <button
                onClick={() => { setShowForm(false); setYoutubeId(""); }}
                className="btn-medbuddy-ghost btn-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content list table */}
      <div
        className="rounded-[20px] border overflow-hidden"
        style={{ background: "var(--surface)", borderColor: "var(--line)" }}
      >
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--line)" }}>
              <th className="text-left text-xs font-semibold px-5 py-3" style={{ color: "var(--ink-soft)" }}>Title</th>
              <th className="text-left text-xs font-semibold px-5 py-3" style={{ color: "var(--ink-soft)" }}>Status</th>
              <th className="text-left text-xs font-semibold px-5 py-3" style={{ color: "var(--ink-soft)" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b last:border-b-0" style={{ borderColor: "var(--line)" }}>
                <td className="px-5 py-3 text-sm font-medium" style={{ color: "var(--ink)" }}>{item.title}</td>
                <td className="px-5 py-3">
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full capitalize"
                    style={{
                      background: item.status === "published" ? "var(--sage-tint)" : "var(--sand-tint)",
                      color: item.status === "published" ? "var(--sage-dark)" : "#a8944f",
                    }}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-3">
                    <button className="text-xs font-semibold hover:underline" style={{ color: "var(--sage-dark)" }}>Edit</button>
                    <button className="text-xs font-semibold hover:underline" style={{ color: "var(--coral-dark)" }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
