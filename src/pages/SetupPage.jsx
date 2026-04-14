import { useState } from 'react'
import { Link } from 'react-router-dom'

const steps = [
  {
    n: '01',
    title: 'Purchase FlowMind',
    desc: 'One-time payment. You get instant access to the full template — all pages, all components, all code.',
    detail: 'After checkout, you\'ll receive an email with your download link and a Framer workspace duplicate link. No waiting, no approval. Access is instant.',
    time: '2 min',
    tag: 'Purchase',
    tagColor: 'var(--indigo)',
    checks: ['Instant email delivery', 'Framer workspace link', 'Source code access', 'Lifetime license'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Duplicate to Framer',
    desc: 'Click your unique duplicate link. FlowMind opens in your Framer workspace with all 12+ pages ready to edit.',
    detail: 'You\'ll see every section immediately — hero, features, pricing, blog, dashboard, auth pages. Everything is named, grouped, and organized for fast editing.',
    time: '3 min',
    tag: 'Setup',
    tagColor: 'var(--sky)',
    checks: ['All 12+ pages included', 'Clean component hierarchy', 'Named layers & groups', 'Design tokens connected'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Replace your content',
    desc: 'Use Framer\'s Click-to-Edit to update your headline, features, pricing tiers, testimonials, and brand assets.',
    detail: 'Focus on high-impact sections first: hero headline, value proposition, pricing tiers, and CTA copy. Everything else is secondary. Most founders finish in under 2 hours.',
    time: '45–90 min',
    tag: 'Customize',
    tagColor: 'var(--emerald)',
    checks: ['Click-to-edit all text', 'Swap your logo in seconds', 'Update pricing tiers', 'Add your testimonials'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    n: '04',
    title: 'Connect your brand colors',
    desc: 'Update the 3 color tokens in Framer\'s Variables panel. Every component updates instantly across the entire site.',
    detail: 'FlowMind uses CSS custom properties for all colors. Change --indigo and --sky to match your brand — every button, badge, gradient, and highlight updates automatically. No hunting through components.',
    time: '10 min',
    tag: 'Brand',
    tagColor: '#7c3aed',
    checks: ['3 tokens control everything', 'Instant global update', 'Dark/light ready', 'Design system-aware'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="10.5" r="2.5" />
        <circle cx="8.5" cy="7.5" r="2.5" /><circle cx="6.5" cy="12.5" r="2.5" />
        <path d="M12 22c4.42 0 8-3.58 8-8 0-3.14-1.71-5.88-4.24-7.35" />
      </svg>
    ),
  },
  {
    n: '05',
    title: 'Connect your integrations',
    desc: 'Wire up your auth provider, payment system, and analytics. FlowMind is built to integrate, not lock you in.',
    detail: 'The template includes ready-to-go integration slots for Clerk, Auth0, Supabase, Stripe, Lemon Squeezy, and Paddle. Each auth and payment section has comments marking exactly where to drop in your API calls.',
    time: '20–30 min',
    tag: 'Integrate',
    tagColor: 'var(--amber)',
    checks: ['Auth: Clerk, Auth0, Supabase', 'Payments: Stripe, Paddle, LS', 'Analytics: Plausible, GA', 'CRM: HubSpot, Intercom'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    n: '06',
    title: 'Connect domain & publish',
    desc: 'Add your custom domain in Framer Settings, hit Publish, and your AI SaaS site is live on the internet.',
    detail: 'Framer handles SSL, CDN, and performance automatically. Your site goes live at your domain within minutes. No server config, no DevOps. Just click Publish.',
    time: '5 min',
    tag: 'Launch',
    tagColor: 'var(--rose)',
    checks: ['Free SSL certificate', 'Global CDN included', 'Custom domain in 5 min', 'Instant publish'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
  },
]

const faqs = [
  { q: 'Do I need to know how to code?', a: 'No. For Framer, everything is visual. If you want to customize the React source (for self-hosting), basic React knowledge helps, but it\'s not required for the main setup.' },
  { q: 'How long does setup actually take?', a: 'Most founders are live in 2–3 hours. The technical steps (duplicate, domain, publish) take under 30 minutes. The most time goes into writing your own copy — which is time well spent.' },
  { q: 'Can I host this myself, not on Framer?', a: 'Yes. The template includes the full React + Vite source. Run npm install && npm run build and deploy the dist folder to Vercel, Netlify, Cloudflare Pages, or any static host.' },
  { q: 'What if I get stuck?', a: 'FlowMind includes a detailed documentation site (/docs) that covers every section. You can also reach us via the Framer marketplace support chat — typical response time is under 2 hours.' },
  { q: 'Do I need a Framer paid plan?', a: 'A free Framer account lets you duplicate and edit. To publish to a custom domain, you\'ll need Framer\'s Mini plan ($5/mo). Framer hosting is entirely optional if you self-host.' },
]

export default function SetupPage() {
  const [activeStep, setActiveStep] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="setup-page">
      {/* Hero */}
      <section className="iph">
        <div className="iph-bg">
          <div className="iph-orb iph-orb1" />
          <div className="iph-orb iph-orb2" />
          <div className="iph-grid" />
        </div>
        <div className="container">
          <div className="iph-inner" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow">Setup Guide</div>
            <h1 className="iph-title">
              From purchase to <span>live in 3 hours</span>
            </h1>
            <p className="iph-desc" style={{ margin: '0 auto 36px' }}>
              Six steps. No surprises. FlowMind is built so that any founder — technical or not — can go
              from zero to a fully branded, live SaaS site in an afternoon.
            </p>
            <div className="setup-time-chips">
              <div className="setup-time-chip">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                ~3 hours total
              </div>
              <div className="setup-time-chip">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                No-code friendly
              </div>
              <div className="setup-time-chip">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                Live on custom domain
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section" style={{ background: 'var(--bg2)', paddingTop: '80px' }}>
        <div className="container">
          <div className="setup-steps">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className={`setup-step an${activeStep === i ? ' active' : ''}`}
                onClick={() => setActiveStep(activeStep === i ? null : i)}
              >
                <div className="setup-step-left">
                  <div className="setup-step-num">{step.n}</div>
                  <div className="setup-step-line" />
                </div>
                <div className="setup-step-content">
                  <div className="setup-step-header">
                    <div className="setup-step-icon" style={{ color: step.tagColor }}>
                      {step.icon}
                    </div>
                    <div className="setup-step-meta">
                      <span className="setup-step-tag" style={{ background: step.tagColor + '18', color: step.tagColor }}>{step.tag}</span>
                      <span className="setup-step-time">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        {step.time}
                      </span>
                    </div>
                  </div>
                  <h3 className="setup-step-title">{step.title}</h3>
                  <p className="setup-step-desc">{step.desc}</p>

                  {activeStep === i && (
                    <div className="setup-step-expanded">
                      <p className="setup-step-detail">{step.detail}</p>
                      <div className="setup-step-checks">
                        {step.checks.map((c) => (
                          <div key={c} className="setup-check">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                            {c}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button className="setup-step-toggle">
                    {activeStep === i ? 'Less detail' : 'More detail'}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      style={{ transform: activeStep === i ? 'rotate(180deg)' : 'none', transition: '0.2s' }}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: '720px' }}>
          <div className="fh an" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="eyebrow">FAQ</div>
            <h2 className="st">Common questions <span>answered</span></h2>
          </div>
          <div className="setup-faq">
            {faqs.map((faq, i) => (
              <div key={i} className={`setup-faq-item${openFaq === i ? ' open' : ''} an`}>
                <button className="setup-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: '0.25s', flexShrink: 0 }}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {openFaq === i && <div className="setup-faq-a">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ctas">
        <div className="container">
          <div className="ctab">
            <div className="eyebrow">Ready to start?</div>
            <h2 className="st">Step 1 is just a click away.<br /><span>Let's get you live.</span></h2>
            <p className="sd" style={{ margin: '0 auto 36px' }}>One payment. Instant access. Live in an afternoon.</p>
            <div className="ctac">
              <Link to="/pricing" className="ctab-cta-btn">
                Get FlowMind — $49
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/docs" className="btn btn-o">Read the Docs</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
