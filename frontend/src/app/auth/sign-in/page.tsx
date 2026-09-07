"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    router.push(next);
    router.refresh();
  };

  const handleGoogle = async () => {
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center p-4">
      <div className="w-full max-w-md border card-surface rounded-[28px] p-10 shadow-elevated">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 26 26" fill="none" className="w-10 h-10">
              <circle cx="13" cy="13" r="10.5" stroke="#517E70" strokeWidth="1.6" />
              <path d="M13 7.5v11M7.5 13h11" stroke="#D3806E" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-medium">Welcome back</h1>
          <p className="text-sm text-ink-soft mt-1">Sign in to continue your streak.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5">Email</label>
            <input
              data-testid="signin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-medbuddy"
              placeholder="you@email.com"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5">Password</label>
            <input
              data-testid="signin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-medbuddy"
              placeholder="********"
              required
              autoComplete="current-password"
            />
          </div>
          <div className="text-right">
            <Link href="/auth/forgot-password" className="text-xs font-semibold text-sage-dark hover:underline">
              Forgot password?
            </Link>
          </div>
          <button
            data-testid="signin-submit"
            type="submit"
            disabled={loading}
            className="btn-medbuddy-primary w-full justify-center disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <hr className="flex-1 border-medbuddy-line" />
          <span className="text-xs text-ink-soft">or</span>
          <hr className="flex-1 border-medbuddy-line" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 py-2.5 border border-medbuddy-line rounded-xl text-sm font-medium hover:bg-ivory transition"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#517E70" d="M21.8 12.2c0-.7-.06-1.4-.18-2H12v3.9h5.5a4.7 4.7 0 0 1-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.6z"/>
            <path fill="#D3806E" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.3-2.6c-.9.6-2 1-3.3 1-2.5 0-4.7-1.7-5.5-4H3.1v2.6A10 10 0 0 0 12 22z"/>
            <path fill="#D7C9A3" d="M6.5 14a6 6 0 0 1 0-4V7.4H3.1a10 10 0 0 0 0 9.2z"/>
            <path fill="#2B342F" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 12 2 10 10 0 0 0 3.1 7.4L6.5 10c.8-2.3 3-4 5.5-4z"/>
          </svg>
          Sign in with Google
        </button>

        <p className="text-center text-sm text-ink-soft mt-6">
          New here?{" "}
          <Link href="/auth/register" className="font-semibold text-sage-dark hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
