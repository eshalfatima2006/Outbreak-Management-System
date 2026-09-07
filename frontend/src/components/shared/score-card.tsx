"use client";
import { Ring } from "@/components/shared/ring";

interface ScoreCardProps {
  label: string;
  value: string;
  description: string;
  progress: number;
  color: "sage" | "coral" | "sand";
}

const colorMap = {
  sage:  { ring: "var(--sage-dark)",  bg: "var(--sage-tint)"  },
  coral: { ring: "var(--coral-dark)", bg: "var(--coral-tint)" },
  sand:  { ring: "#a8944f",           bg: "var(--sand-tint)"  },
};

export function ScoreCard({ label, value, description, progress, color }: ScoreCardProps) {
  const c = colorMap[color];
  return (
    <div
      className="p-5 rounded-[20px] border flex items-center gap-5"
      style={{ background: "var(--surface)", borderColor: "var(--line)" }}
    >
      <Ring
        size={52}
        strokeWidth={5}
        progress={progress}
        color={c.ring}
        bgColor={c.bg}
        animated
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium mb-0.5" style={{ color: "var(--ink-soft)" }}>{label}</p>
        <p className="font-display font-medium text-[22px] leading-none mb-1" style={{ color: "var(--ink)" }}>
          {value}
        </p>
        <p className="text-xs" style={{ color: "var(--ink-soft)" }}>{description}</p>
      </div>
    </div>
  );
}