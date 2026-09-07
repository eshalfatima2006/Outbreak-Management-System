import Link from "next/link";

export default function TermsPage() {
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

      {/* Content */}
      <main className="max-w-[680px] mx-auto px-6 py-16">
        <div className="eyebrow mb-4">Legal</div>
        <h1 className="font-display text-[32px] font-medium mb-2" style={{ color: "var(--ink)" }}>
          Terms of Service
        </h1>
        <p className="text-xs mb-10" style={{ color: "var(--ink-soft)" }}>Last updated: 1 July 2026</p>

        <div className="space-y-10 text-[14px] leading-[1.75]" style={{ color: "var(--ink)" }}>

          <section>
            <h2 className="font-display font-medium text-[18px] mb-3" style={{ color: "var(--ink)" }}>1. Acceptance</h2>
            <p style={{ color: "var(--ink-soft)" }}>
              By creating an account or using MedBuddy, you agree to these Terms. If you do not agree, please do not use the platform.
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[18px] mb-3" style={{ color: "var(--ink)" }}>2. Not a medical service</h2>
            <p style={{ color: "var(--ink-soft)" }}>
              <strong style={{ color: "var(--ink)" }}>MedBuddy is for awareness only.</strong> We do not detect, diagnose, treat, or prevent cancer or any other medical condition. Nothing on this platform constitutes medical advice. Always consult a qualified healthcare professional before making any health decision.
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[18px] mb-3" style={{ color: "var(--ink)" }}>3. Eligibility</h2>
            <p style={{ color: "var(--ink-soft)" }}>
              You must be 13 years of age or older to use MedBuddy. Users under 18 have access to age-appropriate content only. If you believe a minor is using the platform inappropriately, please contact us.
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[18px] mb-3" style={{ color: "var(--ink)" }}>4. Account responsibilities</h2>
            <ul className="list-disc list-inside space-y-2" style={{ color: "var(--ink-soft)" }}>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You must provide accurate information and keep it up to date.</li>
              <li>You may not share your account with others.</li>
              <li>You may not use MedBuddy to harm, harass, or mislead others.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-medium text-[18px] mb-3" style={{ color: "var(--ink)" }}>5. Community guidelines</h2>
            <p style={{ color: "var(--ink-soft)" }}>
              The MedBuddy community forum is anonymous to protect user privacy. You agree not to post identifying information about yourself or others, provide medical advice to other users, post spam or promotional content, or engage in abusive or harmful behaviour. Posts that violate these guidelines may be removed.
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[18px] mb-3" style={{ color: "var(--ink)" }}>6. Intellectual property</h2>
            <p style={{ color: "var(--ink-soft)" }}>
              All MedBuddy content, design, and software is our property. You may not copy, redistribute, or commercialise any part of the platform without written permission.
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[18px] mb-3" style={{ color: "var(--ink)" }}>7. Limitation of liability</h2>
            <p style={{ color: "var(--ink-soft)" }}>
              MedBuddy is provided &quot;as is&quot; without warranties of any kind. We are not liable for any health outcomes arising from use or non-use of information on this platform. To the maximum extent permitted by law, our liability is limited to the amount you paid to use the service (which is zero, as MedBuddy is free).
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[18px] mb-3" style={{ color: "var(--ink)" }}>8. Changes to terms</h2>
            <p style={{ color: "var(--ink-soft)" }}>
              We may update these terms from time to time. We will notify you by email and require re-consent before any material changes take effect.
            </p>
          </section>

          <section>
            <h2 className="font-display font-medium text-[18px] mb-3" style={{ color: "var(--ink)" }}>9. Contact</h2>
            <p style={{ color: "var(--ink-soft)" }}>
              Legal enquiries: <a href="mailto:legal@medbuddy.io" className="underline" style={{ color: "var(--sage-dark)" }}>legal@medbuddy.io</a>.
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
