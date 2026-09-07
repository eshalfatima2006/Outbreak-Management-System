"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { linkConsentToEmail } from "@/components/shared/consent-banner";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      },
    });
    setLoading(false);
    if (error) return setError(error.message);
    await linkConsentToEmail(email);
    if (data.session) {
      router.push("/onboarding");
      router.refresh();
    } else {
      setInfo("Check your email for a confirmation link to activate your account.");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 12,
    border: "1.5px solid var(--line)",
    background: "var(--bg)",
    color: "var(--ink)",
    fontSize: 13.5,
    outline: "none",
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 page-enter" style={{ background: "var(--bg)" }}>
      <div className="fixed top-5 right-6 z-20"><ThemeToggle /></div>

      <div className="w-full max-w-md rounded-[28px] p-10" style={{ background: "var(--surface)", border: "1.5px solid var(--line)", boxShadow: "var(--elev-3)" }}>
        <div className="text-center mb-8">
          <Link href="/" className="flex justify-center mb-4">
            <svg viewBox="0 0 26 26" fill="none" className="w-10 h-10">
              <circle cx="13" cy="13" r="10.5" stroke="#517E70" strokeWidth="1.6"/>
              <path d="M13 7.5v11M7.5 13h11" stroke="#D3806E" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </Link>
          <h1 className="font-display text-2xl font-medium" style={{ color: "var(--ink)" }}>Create your account</h1>
          <p className="text-sm mt-1" style={{ color: "var(--ink-soft)" }}>Free, always. Takes about a minute.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: "rgba(211, 128, 110, 0.1)", border: "1px solid var(--coral-dark)", color: "var(--coral-dark)" }}>
            {error}
          </div>
        )}
        {info && (
          <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: "rgba(81, 126, 112, 0.1)", border: "1px solid var(--sage-dark)", color: "var(--sage-dark)" }}>
            {info}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--ink)" }}>Full name</label>
            <input data-testid="register-name" type="text" value={name} onChange={e => setName(e.target.value)} style={inputStyle} placeholder="Your name" required autoComplete="name" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--ink)" }}>Email</label>
            <input data-testid="register-email" type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} placeholder="you@email.com" required autoComplete="email" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--ink)" }}>Password</label>
              <div className="relative">
                <input data-testid="register-password" type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} style={{ ...inputStyle, paddingRight: 40 }} placeholder="Min. 8 chars" required minLength={8} autoComplete="new-password" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--ink-soft)" }}>
                  {showPw ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--ink)" }}>Confirm</label>
              <div className="relative">
                <input data-testid="register-confirm" type={showConf ? "text" : "password"} value={confirm} onChange={e => setConfirm(e.target.value)} style={{ ...inputStyle, paddingRight: 40 }} placeholder="Repeat password" required autoComplete="new-password" />
                <button type="button" onClick={() => setShowConf(!showConf)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--ink-soft)" }}>
                  {showConf ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                </button>
              </div>
            </div>
          </div>

          {password && confirm && password !== confirm && (
            <p className="text-xs" style={{ color: "var(--coral-dark)" }}>Passwords do not match.</p>
          )}

          <label className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            <input data-testid="register-terms" type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)}
              className="mt-0.5 w-4 h-4 flex-shrink-0 rounded" style={{ accentColor: "var(--sage-dark)" }} required />
            I have read and agree to the{" "}
            <Link href="/terms" className="underline" style={{ color: "var(--sage-dark)" }}>Terms of Service</Link>{" "}and{" "}
            <Link href="/privacy" className="underline" style={{ color: "var(--sage-dark)" }}>Privacy Policy</Link>.
          </label>

          <button data-testid="register-submit" type="submit" disabled={loading || !agree || password !== confirm} className="btn-medbuddy-primary w-full flex items-center justify-center gap-2 mt-2" style={{ opacity: loading ? 0.7 : 1 }}>
            {loading ? (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31" strokeDashoffset="10"/>
              </svg>
            ) : null}
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: "var(--ink-soft)" }}>
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="font-semibold hover:underline" style={{ color: "var(--sage-dark)" }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
