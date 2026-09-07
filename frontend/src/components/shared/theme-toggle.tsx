"use client";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="p-2 rounded-lg border transition-colors hover:border-ink"
      style={{ borderColor: "var(--line)", color: "var(--ink)" }}
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="w-4 h-4" strokeWidth={1.7} /> : <Moon className="w-4 h-4" strokeWidth={1.7} />}
    </button>
  );
}