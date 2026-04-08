import { Link } from 'react-router-dom'

const sections = [
  {
    title: 'Information We Collect',
    content: [
      {
        subtitle: 'Account information',
        text: 'When you create an account, we collect your email address, name, and password (hashed). If you sign in with Google or GitHub, we receive your name, email, and profile picture from those providers.',
      },
      {
        subtitle: 'Usage data',
        text: 'We collect information about how you use BaseBox — pages visited, features used, time spent, and click patterns. This data is aggregated and anonymized where possible.',
      },
      {
        subtitle: 'Payment information',
        text: 'Payments are processed by Stripe. We never store your credit card number. We receive only a payment confirmation token, the last 4 digits, and expiration date for display purposes.',
      },
      {
        subtitle: 'Communications',
        text: 'If you contact us via email or support chat, we retain those messages to provide support and improve our service.',
      },
    ],
  },
  {
    title: 'How We Use Your Information',
    content: [
      { subtitle: null, text: 'To create and maintain your BaseBox account.' },
      { subtitle: null, text: 'To process your purchase and deliver template access.' },
      { subtitle: null, text: 'To send transactional emails (receipts, account alerts, password resets).' },
      { subtitle: null, text: 'To send product update emails — you can unsubscribe at any time.' },
      { subtitle: null, text: 'To improve the product through anonymized usage analytics.' },
      { subtitle: null, text: 'To prevent fraud and ensure platform security.' },
    ],
  },
  {
    title: 'Data Sharing',
    content: [
      { subtitle: null, text: 'We do not sell your personal data. We never have. We never will.' },
      { subtitle: 'Service providers', text: 'We share data with trusted services that help us operate: Stripe (payments), Resend (email), Plausible (analytics, privacy-first), Vercel (hosting). Each is bound by their own privacy policy.' },
      { subtitle: 'Legal requirements', text: 'We may disclose your information if required by law, court order, or regulatory authority. We will notify you if legally permitted to do so.' },
    ],
  },
  {
    title: 'Cookies & Tracking',
    content: [
      { subtitle: null, text: 'We use a single first-party session cookie to keep you logged in. We do not use third-party advertising cookies.' },
      { subtitle: null, text: 'Our analytics are powered by Plausible — a privacy-first tool that tracks page views without collecting personal data or using cookies.' },
      { subtitle: null, text: 'You can disable cookies in your browser settings. This will log you out of your account.' },
    ],
  },
  {
    title: 'Data Retention',
    content: [
      { subtitle: null, text: 'Account data is retained as long as your account is active.' },
      { subtitle: null, text: 'If you delete your account, we remove your personal data within 30 days from our production systems and 90 days from backups.' },
      { subtitle: null, text: 'Payment records are retained for 7 years for legal and tax compliance.' },
    ],
  },
  {
    title: 'Your Rights (GDPR & CCPA)',
    content: [
      { subtitle: 'Access', text: 'You can request a copy of all data we hold about you.' },
      { subtitle: 'Correction', text: 'You can update your account information at any time from Settings.' },
      { subtitle: 'Deletion', text: 'You can delete your account and data from Settings → Account → Delete Account.' },
      { subtitle: 'Portability', text: 'You can request an export of your data in JSON format.' },
      { subtitle: 'Opt-out', text: 'You can unsubscribe from all marketing emails at any time.' },
    ],
  },
  {
    title: 'Security',
    content: [
      { subtitle: null, text: 'All data is encrypted in transit using TLS 1.3. Passwords are hashed using bcrypt with a high cost factor.' },
      { subtitle: null, text: 'We conduct regular security reviews and maintain SOC 2 compliance.' },
      { subtitle: null, text: 'If we discover a security breach affecting your data, we will notify you within 72 hours as required by GDPR.' },
    ],
  },
  {
    title: 'Changes to This Policy',
    content: [
      { subtitle: null, text: 'We may update this Privacy Policy to reflect changes in our practices or legal requirements. When we make material changes, we will notify you by email and update the "Last updated" date below.' },
      { subtitle: null, text: 'Continued use of BaseBox after policy updates constitutes acceptance of the updated terms.' },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      {/* Header */}
      <section className="iph" style={{ paddingBottom: '60px' }}>
        <div className="iph-bg">
          <div className="iph-orb iph-orb1" />
          <div className="iph-orb iph-orb2" />
        </div>
        <div className="container">
          <div className="iph-inner" style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow">Privacy Policy</div>
            <h1 className="iph-title">
              Your data. <span>Your rights.</span>
            </h1>
            <p className="iph-desc" style={{ margin: '0 auto 0' }}>
              We believe in plain-English privacy policies. No legalese, no hiding. Here is exactly what we collect, why, and what you can do about it.
            </p>
          </div>
        </div>
      </section>

      {/* Quick summary */}
      <div style={{ background: 'var(--bg2)', borderTop: '1.5px solid var(--border)', borderBottom: '1.5px solid var(--border)' }}>
        <div className="container">
          <div className="privacy-summary">
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
                color: 'var(--indigo)',
                bg: 'var(--indigo-g)',
                title: 'No selling',
                desc: 'We never sell your personal data to third parties. Period.',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
                color: 'var(--emerald)',
                bg: 'var(--emerald-bg)',
                title: 'GDPR compliant',
                desc: 'Full rights — access, correction, deletion, portability.',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>,
                color: 'var(--sky)',
                bg: 'var(--sky-g)',
                title: '256-bit encryption',
                desc: 'All data encrypted in transit and at rest.',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
                color: '#7c3aed',
                bg: 'rgba(124,58,237,0.08)',
                title: 'Privacy analytics',
                desc: 'Plausible analytics — no cookies, no tracking.',
              },
            ].map((item, i) => (
              <div key={i} className="privacy-summary-item">
                <div className="privacy-summary-icon" style={{ background: item.bg, color: item.color }}>{item.icon}</div>
                <div className="privacy-summary-title">{item.title}</div>
                <div className="privacy-summary-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full policy */}
      <section className="section">
        <div className="container" style={{ maxWidth: '720px' }}>
          <div className="legal-meta an">
            <span>Last updated: April 5, 2026</span>
            <span>·</span>
            <span>Applies to: basebox.ai and all BaseBox products</span>
            <span>·</span>
            <span>Controller: BaseBox AI Ltd.</span>
          </div>

          {sections.map((section, i) => (
            <div key={i} className="legal-section an">
              <h2 className="legal-section-title">{section.title}</h2>
              <div className="legal-section-body privacy-body">
                {section.content.map((item, j) => (
                  <div key={j} className="privacy-item">
                    {item.subtitle && <strong className="privacy-subtitle">{item.subtitle}: </strong>}
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="legal-footer-note an">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
            <div>
              Privacy questions?{' '}
              <a href="mailto:privacy@basebox.ai" style={{ color: 'var(--indigo)', fontWeight: 600 }}>privacy@basebox.ai</a>
              {' '}· We respond within 48 hours.
              {' '}<Link to="/license" style={{ color: 'var(--indigo)', fontWeight: 600 }}>View License →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
