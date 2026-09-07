"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DisclaimerBanner } from "@/components/shared/disclaimer-banner";

//  Inline SVG helpers 
function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  );
}
function IconLeaf() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M11 20A7 7 0 0 1 4 13c0-7 7-11 11-11 0 4.5-1.5 8.5-4 11" /><path d="M4.9 9C3 9 2 10 2 12c0 3 3 5 5 5" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconZap() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M13 2 3 14h8l-1 8 10-12h-8z" />
    </svg>
  );
}
function IconTrend() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

//  Logo 
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-semibold" style={{ color: "var(--ink)", textDecoration: "none" }}>
      <svg viewBox="0 0 26 26" fill="none" className="w-7 h-7">
        <circle cx="13" cy="13" r="10.5" stroke="#517E70" strokeWidth="1.6" />
        <path d="M13 7.5v11M7.5 13h11" stroke="#D3806E" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      MedBuddy
    </Link>
  );
}

//  Nav link with ring-arc hover underline 
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative text-sm font-medium group"
      style={{ color: "var(--ink-soft)", textDecoration: "none" }}
    >
      <span className="group-hover:text-ink transition-colors duration-200" style={{ color: "inherit" }}>
        {children}
      </span>
      {/* Ring-arc underline */}
      <svg
        viewBox="0 0 40 6"
        className="absolute -bottom-1.5 left-0 w-full overflow-visible opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ height: 6 }}
      >
        <path
          d="M2 5 Q20 0 38 5"
          fill="none"
          stroke="var(--coral-dark)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            strokeDasharray: 40,
            strokeDashoffset: 40,
            animation: "strokeDraw 450ms ease forwards",
          }}
          className="group-hover:[stroke-dashoffset:0]"
        />
      </svg>
    </Link>
  );
}

//  Scroll reveal hook 
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

//  Section wrapper with reveal 
function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 700ms ease ${delay}ms, transform 700ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

//  Module card data 
const modules = [
  { icon: <IconSearch />, title: "Self-Exam Guides", desc: "Step-by-step video guides for breast, testicular, and skin checks.", href: "/dashboard/self-exam", tint: "sage" },
  { icon: <IconLeaf />, title: "Cancer-Fighting Diet", desc: "A personalized 7-day plan loaded with protective nutrients.", href: "/dashboard/diet", tint: "coral" },
  { icon: <IconZap />, title: "Exercise Plans", desc: "Routine-adapted workouts: standard or gentle low-impact options.", href: "/dashboard/exercise", tint: "sand" },
  { icon: <IconCalendar />, title: "Screening Reminders", desc: "Age-appropriate alerts for mammograms, PSA tests, and more.", href: "/dashboard/screening", tint: "sage" },
  { icon: <IconTrend />, title: "Progress Tracking", desc: "Streaks, achievements, and your full health activity log.", href: "/dashboard/progress", tint: "coral" },
  { icon: <IconUsers />, title: "Community", desc: "Fully anonymous forum to share questions and lived experience.", href: "/dashboard/community", tint: "sand" },
];

const tintMap: Record<string, { bg: string; color: string }> = {
  sage:  { bg: "var(--sage-tint)",  color: "var(--sage-dark)" },
  coral: { bg: "var(--coral-tint)", color: "var(--coral-dark)" },
  sand:  { bg: "var(--sand-tint)",  color: "#a8944f" },
};

const stats = [
  { value: "18,000+", label: "Active members" },
  { value: "3 regions", label: "USA | South Asia | EU" },
  { value: "94%", label: "Feel more informed" },
  { value: "Free", label: "Always, for everyone" },
];

const dietPoints = [
  "7-day meal plans built for your profile",
  "Cancer-protective nutrients highlighted",
  "Grocery list auto-generated each week",
  "Snacks, recipes, and food library included",
];
const screeningPoints = [
  "Personalized by age, gender, and region",
  "Reminders for mammograms, PSA, colonoscopy",
  "USA screening center locator built-in",
  "Phase-2 expansion: South Asia & EU centers",
];

//  Landing Page 
export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroHovered, setHeroHovered] = useState(false);

  return (
    <div style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>

      {/*  STICKY NAV  */}
      <header
        className="sticky top-0 z-10 border-b"
        style={{
          background: "rgba(250,247,242,0.86)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderColor: "var(--line)",
          zIndex: "var(--z-sticky)",
        }}
      >
        <div className="max-w-[1180px] mx-auto px-10 h-16 flex items-center justify-between">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/dashboard/self-exam">Self-exam</NavLink>
            <NavLink href="/dashboard/diet">Diet</NavLink>
            <NavLink href="/dashboard/screening">Screening</NavLink>
            <NavLink href="/dashboard/community">Community</NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/sign-in" className="btn-medbuddy-ghost btn-sm">Sign in</Link>
            <Link href="/auth/register" className="btn-medbuddy-primary btn-medbuddy-coral btn-sm">Get started free</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg border"
            style={{ borderColor: "var(--line)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t px-6 py-4 flex flex-col gap-3" style={{ background: "var(--bg)", borderColor: "var(--line)" }}>
            {["Self-exam", "Diet", "Screening", "Community"].map((item) => (
              <Link key={item} href={`/dashboard/${item.toLowerCase().replace("-", "-")}`} className="text-sm font-medium py-1" style={{ color: "var(--ink)" }}>{item}</Link>
            ))}
            <div className="flex gap-3 pt-2">
              <Link href="/auth/sign-in" className="btn-medbuddy-ghost btn-sm flex-1 justify-center">Sign in</Link>
              <Link href="/auth/register" className="btn-medbuddy-primary btn-medbuddy-coral btn-sm flex-1 justify-center">Get started</Link>
            </div>
          </div>
        )}
      </header>

      {/*  HERO SECTION  */}
      <section className="max-w-[1180px] mx-auto px-10 pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <RevealSection>
            <div className="eyebrow mb-5">Cancer awareness platform</div>
            <h1
              className="font-display font-medium leading-[1.08] mb-6"
              style={{ fontSize: "clamp(36px, 5vw, 52px)", color: "var(--ink)" }}
            >
              Your personal<br />
              <span style={{ color: "var(--sage-dark)" }}>wellness guide</span><br />
              for cancer prevention.
            </h1>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--ink-soft)", maxWidth: 460 }}>
              Self-exam guides, personalized diet plans, exercise routines, and screening reminders. All in one place. Free, always.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/auth/register" className="btn-medbuddy-primary btn-medbuddy-coral" style={{ fontSize: 14, padding: "13px 28px" }}>
                Start for free
              </Link>
              <Link href="/auth/sign-in" className="btn-medbuddy-ghost" style={{ fontSize: 14, padding: "13px 28px" }}>
                Sign in
              </Link>
            </div>
          </RevealSection>

          {/* Right: hero image */}
          <RevealSection delay={150}>
            <div className="relative flex justify-center">
              {/* Orbiting dashed ring */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ zIndex: 0 }}
              >
                <svg
                  viewBox="0 0 420 420"
                  className="w-full max-w-[420px]"
                  style={{ animation: "orbitRing 40s linear infinite", opacity: 0.25 }}
                >
                  <circle cx="210" cy="210" r="196" fill="none" stroke="var(--sage-dark)" strokeWidth="1.5" strokeDasharray="12 8" />
                </svg>
              </div>

              {/* Hero image with organic mask */}
              <div
                className="relative overflow-hidden cursor-pointer"
                style={{
                  borderRadius: "38% 62% 58% 42% / 48% 40% 60% 52%",
                  width: "min(380px, 90vw)",
                  height: "min(460px, 110vw)",
                  boxShadow: "var(--elev-4)",
                  zIndex: 1,
                }}
                onMouseEnter={() => setHeroHovered(true)}
                onMouseLeave={() => setHeroHovered(false)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero.png"
                  alt="Person doing a morning wellness stretch"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 700ms ease",
                    transform: heroHovered ? "scale(1.12)" : "scale(1.02)",
                    animation: !heroHovered ? "none" : undefined,
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.background =
                      "linear-gradient(135deg, var(--sage), var(--sand))";
                    (e.target as HTMLImageElement).src = "";
                  }}
                />
              </div>

              {/* Floating streak badge */}
              <div
                className="absolute bottom-8 -left-4 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-sm font-semibold"
                style={{
                  background: "var(--surface)",
                  boxShadow: "var(--elev-3)",
                  color: "var(--coral-dark)",
                  animation: "floatBadge 5s ease-in-out infinite",
                  zIndex: 2,
                }}
              >
                <svg viewBox="0 0 24 24" fill="var(--coral-dark)" strokeWidth="0" className="w-5 h-5">
                  <path d="M12 2C9.5 5 7 8 7 12a5 5 0 0 0 10 0c0-4-2.5-7-5-10z" />
                </svg>
                14-day streak
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/*  DISCLAIMER BAND  */}
      <section className="max-w-[1180px] mx-auto px-10 mb-20">
        <RevealSection>
          <DisclaimerBanner>
            For awareness only. MedBuddy does not detect or diagnose cancer. Always consult a qualified healthcare professional.
          </DisclaimerBanner>
        </RevealSection>
      </section>

      {/*  MODULE GRID  */}
      <section className="max-w-[1180px] mx-auto px-10 mb-28">
        <RevealSection className="text-center mb-12">
          <div className="eyebrow justify-center mb-4">Everything you need</div>
          <h2 className="font-display font-medium" style={{ fontSize: "clamp(26px, 3.5vw, 34px)" }}>
            Six tools. One platform.
          </h2>
        </RevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod, i) => {
            const colors = tintMap[mod.tint];
            return (
              <RevealSection key={mod.title} delay={i * 70}>
                <Link
                  href={mod.href}
                  className="group block relative bg-surface border rounded-[22px] p-6 cursor-pointer"
                  style={{
                    borderColor: "var(--line)",
                    textDecoration: "none",
                    boxShadow: "var(--elev-1)",
                    transition: "transform 300ms cubic-bezier(0.2,0.9,0.3,1), box-shadow 300ms cubic-bezier(0.2,0.9,0.3,1), border-color 300ms ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--elev-2)";
                    (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--elev-1)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                  }}
                >
                  {/* Icon chip */}
                  <div
                    className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-4"
                    style={{ background: colors.bg, color: colors.color }}
                  >
                    {mod.icon}
                  </div>

                  <h3 className="font-display font-medium text-[16px] mb-1.5" style={{ color: "var(--ink)" }}>
                    {mod.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed mb-4" style={{ color: "var(--ink-soft)" }}>
                    {mod.desc}
                  </p>
                  <span className="text-xs font-semibold flex items-center gap-1.5 transition-all group-hover:gap-2.5" style={{ color: colors.color }}>
                    Learn more <IconArrow />
                  </span>

                  {/* Corner ring decoration - fades/scales in on hover */}
                  <div
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                    style={{ pointerEvents: "none" }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: 22, height: 22 }}>
                      <circle cx="12" cy="12" r="9" stroke={colors.color} strokeWidth="1.2" opacity="0.4" />
                    </svg>
                  </div>
                </Link>
              </RevealSection>
            );
          })}
        </div>
      </section>

      {/*  SPLIT FEATURE - DIET  */}
      <section className="max-w-[1180px] mx-auto px-10 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image left */}
          <RevealSection delay={0}>
            <div className="relative rounded-[22px] overflow-hidden" style={{ aspectRatio: "4/3", boxShadow: "var(--elev-3)" }}>
              {/* Tag chip */}
              <div
                className="absolute top-4 left-4 z-10 font-mono text-[10px] font-medium tracking-[0.13em] uppercase px-3 py-1.5 rounded-full"
                style={{ background: "rgba(250,247,242,0.92)", color: "var(--sage-dark)", backdropFilter: "blur(6px)" }}
              >
                Diet
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/diet-feature.png"
                alt="Fresh cancer-protective vegetables and produce"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.background = "linear-gradient(135deg, var(--sage), var(--sand))";
                  (e.target as HTMLImageElement).src = "";
                }}
              />
            </div>
          </RevealSection>

          {/* Content right */}
          <RevealSection delay={120}>
            <div className="eyebrow mb-4">Nutrition for prevention</div>
            <h2 className="font-display font-medium mb-5" style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>
              Eat for protection,<br />not just satisfaction.
            </h2>
            <ul className="space-y-3 mb-7">
              {dietPoints.map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-[14px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--sage-dark)" }}><IconCheck /></span>
                  {pt}
                </li>
              ))}
            </ul>
            <Link href="/auth/register" className="btn-medbuddy-primary">
              See your meal plan
            </Link>
          </RevealSection>
        </div>
      </section>

      {/*  SPLIT FEATURE - SCREENING  */}
      <section className="max-w-[1180px] mx-auto px-10 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content left */}
          <RevealSection delay={0}>
            <div className="eyebrow mb-4">Screening awareness</div>
            <h2 className="font-display font-medium mb-5" style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>
              Never miss a check<br />that could matter most.
            </h2>
            <ul className="space-y-3 mb-7">
              {screeningPoints.map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-[14px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--sage-dark)" }}><IconCheck /></span>
                  {pt}
                </li>
              ))}
            </ul>
            <Link href="/auth/register" className="btn-medbuddy-primary">
              Set up reminders
            </Link>
          </RevealSection>

          {/* Image right */}
          <RevealSection delay={120}>
            <div className="relative rounded-[22px] overflow-hidden" style={{ aspectRatio: "4/3", boxShadow: "var(--elev-3)" }}>
              <div
                className="absolute top-4 left-4 z-10 font-mono text-[10px] font-medium tracking-[0.13em] uppercase px-3 py-1.5 rounded-full"
                style={{ background: "rgba(250,247,242,0.92)", color: "var(--sage-dark)", backdropFilter: "blur(6px)" }}
              >
                Screening
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/screening-feature.png"
                alt="Person planning health screenings in a calendar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.background = "linear-gradient(135deg, var(--coral), var(--sand))";
                  (e.target as HTMLImageElement).src = "";
                }}
              />
            </div>
          </RevealSection>
        </div>
      </section>

      {/*  STATS BAND  */}
      <section className="mb-28" style={{ background: "var(--sage-dark)" }}>
        <div className="max-w-[1180px] mx-auto px-10 py-20">
          <RevealSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-medium text-[36px] mb-1">{stat.value}</div>
                  <div className="text-[13px] opacity-70">{stat.label}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/*  CLOSING CTA  */}
      <section className="max-w-[1180px] mx-auto px-10 mb-28 text-center">
        <RevealSection>
          <div className="eyebrow justify-center mb-5">Start today</div>
          <h2 className="font-display font-medium mb-6" style={{ fontSize: "clamp(26px, 3.5vw, 36px)" }}>
            Your wellness journey<br />starts with one step.
          </h2>
          <p className="text-[15px] leading-relaxed mb-8 mx-auto" style={{ color: "var(--ink-soft)", maxWidth: 440 }}>
            Free for everyone. No credit card, no hidden fees. Just the tools you need to take charge of your health.
          </p>
          <Link href="/auth/register" className="btn-medbuddy-primary btn-medbuddy-coral" style={{ fontSize: 15, padding: "14px 32px" }}>
            Create your free account
          </Link>
        </RevealSection>
      </section>

      {/*  FOOTER  */}
      <footer className="border-t py-8" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[1180px] mx-auto px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-6 text-[13px]" style={{ color: "var(--ink-soft)" }}>
            <Link href="/privacy" style={{ color: "inherit", textDecoration: "none" }} className="hover:text-ink transition-colors">Privacy</Link>
            <Link href="/terms" style={{ color: "inherit", textDecoration: "none" }} className="hover:text-ink transition-colors">Terms</Link>
            <Link href="/dashboard/community" style={{ color: "inherit", textDecoration: "none" }} className="hover:text-ink transition-colors">Community</Link>
          </div>
          <p className="text-[12px]" style={{ color: "var(--ink-soft)" }}>
            &copy; 2026 MedBuddy. For awareness only, not a diagnostic service.
          </p>
        </div>
      </footer>
    </div>
  );
}
