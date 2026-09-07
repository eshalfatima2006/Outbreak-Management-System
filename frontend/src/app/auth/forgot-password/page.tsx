"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--bg)" }}>
      <div
        className="w-full max-w-md rounded-[28px] p-10"
        style={{ background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--elev-4)" }}
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <svg viewBox="0 0 26 26" fill="none" className="w-10 h-10">
              <circle cx="13" cy="13" r="10.5" stroke="#517E70" strokeWidth="1.6" />
              <path d="M13 7.5v11M7.5 13h11" stroke="#D3806E" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-medium" style={{ color: "var(--ink)" }}>Reset your password</h1>
          <p className="text-sm mt-1" style={{ color: "var(--ink-soft)" }}>We'll email you a link to get back in.</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--ink)" }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-medbuddy"
                placeholder="you@email.com"
                required
                autoComplete="email"
              />
            </div>
            <button type="submit" className="btn-medbuddy-primary w-full justify-center">
              Send reset link
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "var(--sage-tint)" }}
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="var(--sage-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <p className="font-medium mb-1" style={{ color: "var(--ink)" }}>Check your email</p>
            {/* Generic copy per spec - do not confirm/deny email existence */}
            <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
              If an account exists for that address, a reset link is on its way.
            </p>
          </div>
        )}

        <div className="text-center mt-6">
          <Link href="/auth/sign-in" className="text-sm font-semibold hover:underline" style={{ color: "var(--sage-dark)" }}>
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
