import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      {/* Minimal nav */}
      <header
        className="sticky top-0 border-b"
        style={{ background: "rgba(250,247,242,0.9)", backdropFilter: "blur(10px)", borderColor: "var(--line)", zIndex: 10 }}
      >
        <div className="max-w-[720px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-base font-semibold flex items-center gap-2" style={{ color: "var(--ink)", textDecoration: "none" }}>
            <svg viewBox="0 0 26 26" fill="none" className="w-6 h-6">
              <circle cx="13" cy="13" r="10.5" stroke="#517E70" strokeWidth="1.6" />
              <path d="M13 7.5v11M7.5 13h11" stroke="#D3806E" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            MedBuddy
          </Link>
          <Link href="/" className="text-sm" style={{ color: "var(--ink-soft)", textDecoration: "none" }}> Back</Link>
        </div>
      </header>

      {/* Content - centred 680px column */}
      <main className="max-w-[680px] mx-auto px-6 py-16">
        <div className="eyebrow mb-4">Legal</div>
        <h1 className="font-display text-[32px] font-medium mb-2" style={{ color: "var(--ink)" }}>
          Privacy Policy
        </h1>
        <p className="text-xs mb-10" style={{ color: "var(--ink-soft)" }}>Last updated: 1 July 2026</p>

        <div className="space-y-10 text-[14px] leading-[1.75]" style={{ color: "var(--ink)" }}>

          <section>
            <h2 className="font-display font-medium text-[18px] mb-3" style={{ color: "var(--ink)" }}>1. Who we are</h2>
            <p style={{ color: "var(--ink-soft)" }}>
              MedBuddy is a free cancer-awareness wellness platform. We are not a medical provider and do not offer diagnostic services. Our registered operator details are available upon request at privacy@medbuddy.io.
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[18px] mb-3" style={{ color: "var(--ink)" }}>2. What data we collect</h2>
            <ul className="list-disc list-inside space-y-2" style={{ color: "var(--ink-soft)" }}>
              <li>Account information: name, email address, date of birth, gender, region.</li>
              <li>Wellness data: self-exam logs, diet entries, exercise sessions, screening dates.</li>
              <li>Usage data: pages visited, feature interactions (anonymised and aggregated).</li>
              <li>Device data: browser type, OS, screen resolution.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-medium text-[18px] mb-3" style={{ color: "var(--ink)" }}>3. How we use your data</h2>
            <p style={{ color: "var(--ink-soft)" }}>
              We use your data to personalise your wellness plans, send you screening reminders, and improve the platform. We never sell your data. We do not use your data for advertising. Health-related data is never shared with third parties without your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[18px] mb-3" style={{ color: "var(--ink)" }}>4. Legal basis for processing (EU/GDPR)</h2>
            <p style={{ color: "var(--ink-soft)" }}>
              For users in the European Union, we process your data under Article 6(1)(a) (consent) and Article 9(2)(a) (explicit consent for health data). You may withdraw consent at any time from your profile settings.
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[18px] mb-3" style={{ color: "var(--ink)" }}>5. Your rights</h2>
            <ul className="list-disc list-inside space-y-2" style={{ color: "var(--ink-soft)" }}>
              <li>Right to access your data.</li>
              <li>Right to rectification of inaccurate data.</li>
              <li>Right to erasure ("right to be forgotten") - requests processed within 30 days.</li>
              <li>Right to data portability - export your data from your profile page.</li>
              <li>Right to withdraw consent at any time without affecting lawfulness of prior processing.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-medium text-[18px] mb-3" style={{ color: "var(--ink)" }}>6. Data retention</h2>
            <p style={{ color: "var(--ink-soft)" }}>
              We retain your data for as long as your account is active. Upon account deletion, your data is anonymised or deleted within 30 days. Backups are purged within 90 days.
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[18px] mb-3" style={{ color: "var(--ink)" }}>7. Cookies</h2>
            <p style={{ color: "var(--ink-soft)" }}>
              We use essential session cookies only. No advertising cookies, no third-party tracking cookies. Analytics are first-party and anonymised.
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[18px] mb-3" style={{ color: "var(--ink)" }}>8. Contact</h2>
            <p style={{ color: "var(--ink-soft)" }}>
              For privacy questions or data requests: <a href="mailto:privacy@medbuddy.io" className="underline" style={{ color: "var(--sage-dark)" }}>privacy@medbuddy.io</a>.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t py-8" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[680px] mx-auto px-6 flex gap-4 text-xs" style={{ color: "var(--ink-soft)" }}>
          <Link href="/terms" style={{ color: "inherit", textDecoration: "none" }} className="hover:underline">Terms of service</Link>
          <Link href="/privacy" style={{ color: "inherit", textDecoration: "none" }} className="hover:underline">Privacy policy</Link>
        </div>
      </footer>
    </div>
  );
}
