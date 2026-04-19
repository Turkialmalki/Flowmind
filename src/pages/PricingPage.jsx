import { useState } from 'react'
import { Link } from 'react-router-dom'

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    desc: 'The core marketing pages to get your AI SaaS in front of users today.',
    monthly: 29, annual: 19,
    urgency: 'Launch price — increases soon',
    features: ['Home page (all sections)', 'Pricing page', 'Fully responsive design', 'Lifetime updates', 'Framer template file'],
    cta: 'Get Starter',
    ctaClass: 'btn btn-o pbn',
    pop: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'Most Popular',
    desc: 'The complete FlowMind kit — every screen, page, and UI component you need to launch and grow.',
    monthly: 49, annual: 35,
    urgency: 'Save $50 vs hiring a designer',
    features: [
      'All 12 pages included',
      'Full dashboard UI kit',
      'Auth screens (login, signup, reset)',
      'Settings & profile screens',
      'Blog + CMS integration',
      'Empty states for every screen',
      'Animations & micro-interactions',
      'Lifetime updates + priority support',
      'Commercial license',
    ],
    cta: 'Get Pro — Best Value',
    ctaClass: 'btn btn-g pbn',
    showArrow: true,
    pop: true,
  },
  {
    id: 'team',
    name: 'Team',
    desc: 'Pro + extended license for agencies. Unlimited client projects, Figma source included.',
    monthly: 99, annual: 69,
    urgency: 'Extended commercial license',
    features: ['Everything in Pro', 'Extended commercial license', 'Figma source file', 'Unlimited client projects', '1-on-1 setup call', 'Priority Slack support'],
    cta: 'Get Team License',
    ctaClass: 'btn btn-p pbn',
    pop: false,
  },
]

const compareFeatures = [
  { feature: 'Pages included', starter: '2', pro: '12', team: '12' },
  { feature: 'Dashboard UI kit', starter: '—', pro: '✓', team: '✓' },
  { feature: 'Auth screens', starter: '—', pro: '✓', team: '✓' },
  { feature: 'Blog + CMS', starter: '—', pro: '✓', team: '✓' },
  { feature: 'Settings pages', starter: '—', pro: '✓', team: '✓' },
  { feature: 'Empty states', starter: '—', pro: '✓', team: '✓' },
  { feature: 'Animations', starter: 'Basic', pro: 'Full', team: 'Full' },
  { feature: 'Lifetime updates', starter: '✓', pro: '✓', team: '✓' },
  { feature: 'Commercial license', starter: 'Personal', pro: 'Personal', team: 'Extended' },
  { feature: 'Figma source file', starter: '—', pro: '—', team: '✓' },
  { feature: '1-on-1 setup call', starter: '—', pro: '—', team: '✓' },
  { feature: 'Unlimited client projects', starter: '—', pro: '—', team: '✓' },
]

const faqs = [
  { q: 'Is this a one-time payment?', a: 'Yes. You pay once and own the template forever. No subscriptions, no recurring fees. You also get free lifetime updates — every new screen or improvement we ship.' },
  { q: 'What\'s the difference between Pro and Starter?', a: 'Starter includes just the landing pages (Home + Pricing). Pro includes every page in the system — dashboard, auth, blog, settings, docs, and all 12 pages listed above, plus lifetime priority support.' },
  { q: 'Can I use this for client projects?', a: 'Starter and Pro include a personal license — use on your own projects. The Team plan includes an extended commercial license for unlimited client work and delivery.' },
  { q: 'Is there a trial or refund policy?', a: 'Due to the digital nature of the product, we don\'t offer refunds. We provide a complete live demo with every screen visible before purchase so you know exactly what you\'re getting.' },
  { q: 'How do the lifetime updates work?', a: 'Every new screen, section, design improvement, or bug fix we ship is available to all buyers. You\'ll get a notification and can pull the latest version anytime — no extra charge.' },
  { q: 'Do I need to know Framer to use this?', a: 'No. Framer\'s visual editor lets you change text, images, colors, and layout without writing any code. If you can use Figma or Canva, you can edit FlowMind.' },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="pricing-page">
      {/* Hero */}
      <section className="iph" style={{ paddingBottom: '60px' }}>
        <div className="iph-bg">
          <div className="iph-orb iph-orb1" />
          <div className="iph-orb iph-orb2" />
          <div className="iph-grid" />
        </div>
        <div className="container">
          <div className="iph-inner">
            <div className="eyebrow">Pricing</div>
            <h1 className="iph-title">
              One payment. <span>Everything included.</span><br />Launch this week.
            </h1>
            <p className="iph-desc">
              No subscriptions. No hidden fees. Buy once, own it forever.
              Instant access the moment you purchase.
            </p>
            {/* Billing toggle */}
            <div className="pricing-toggle an">
              <span className={!annual ? 'active' : ''}>Monthly</span>
              <button className={`pricing-toggle-btn${annual ? ' annual' : ''}`} onClick={() => setAnnual(!annual)}>
                <div className="pricing-toggle-thumb" />
              </button>
              <span className={annual ? 'active' : ''}>
                Annual
                <span className="pricing-save-badge">Save 30%</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section style={{ paddingBottom: '80px' }}>
        <div className="container">
          <div className="prg">
            {plans.map((plan) => {
              const price = annual ? plan.annual : plan.monthly
              const orig = annual ? plan.monthly : null
              return (
                <div key={plan.id} className={`pc an${plan.pop ? ' pop' : ''}`}>
                  {plan.badge && <div className="pbg">{plan.badge}</div>}
                  <div className="pn">{plan.name}</div>
                  <div className="pde">{plan.desc}</div>
                  {orig && <div className="p-orig">${orig}/mo</div>}
                  <div className="pam">
                    <span className="pcr">$</span>
                    <span className="pvl">{price}</span>
                    {annual && <span style={{ fontSize: '14px', color: 'var(--t3)', alignSelf: 'flex-end', marginBottom: '6px' }}>/mo</span>}
                  </div>
                  {annual && <div style={{ fontSize: '12px', color: 'var(--emerald)', fontWeight: 600, marginBottom: '8px' }}>Billed annually — ${price * 12}/yr</div>}
                  <div className="p-urgency">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    {plan.urgency}
                  </div>
                  <div className="pdivider" />
                  <ul className="pfl">
                    {plan.features.map((f) => (
                      <li key={f}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/book-demo" className={plan.ctaClass} style={plan.pop ? { padding: '14px' } : {}}>
                    {plan.cta}
                    {plan.showArrow && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>}
                  </Link>
                  <div className="p-guarantee">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    One-time payment · No subscription
                  </div>
                </div>
              )
            })}
          </div>

          {/* Trust strip */}
          <div className="pricing-trust an">
            {[
              { icon: '⚡', text: 'Instant delivery after purchase' },
              { icon: '♾️', text: 'Free lifetime updates' },
              { icon: '🔒', text: 'Secure checkout via Lemon Squeezy' },
              { icon: '🌍', text: '500+ founders worldwide' },
            ].map((item) => (
              <div key={item.text} className="pricing-trust-item">
                <span>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="fh an">
            <div className="eyebrow">Compare Plans</div>
            <h2 className="st">Everything side by <span>side</span></h2>
          </div>
          <div className="pricing-compare-table an">
            <div className="pct-header">
              <div className="pct-feature-col">Feature</div>
              {plans.map((p) => (
                <div key={p.id} className={`pct-plan-col${p.pop ? ' pop' : ''}`}>
                  {p.name}
                  {p.pop && <div className="pct-popular-tag">Popular</div>}
                </div>
              ))}
            </div>
            {compareFeatures.map((row) => (
              <div key={row.feature} className="pct-row">
                <div className="pct-feature">{row.feature}</div>
                {[row.starter, row.pro, row.team].map((val, i) => (
                  <div key={i} className={`pct-val${plans[i].pop ? ' pop' : ''}`}>
                    {val === '✓'
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                      : val === '—'
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--bg4)" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                      : <span>{val}</span>
                    }
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value comparison */}
      <section className="section">
        <div className="container">
          <div className="fh an">
            <div className="eyebrow">Value Comparison</div>
            <h2 className="st">What you'd pay if you <span>built this yourself</span></h2>
          </div>
          <div className="pr-compare an">
            <div className="pr-ctable">
              <div className="pr-ctable-head">
                <div className="pr-cth">What's included</div>
                <div className="pr-cth">Market rate</div>
                <div className="pr-cth accent">FlowMind Pro</div>
              </div>
              {[
                { item: 'Professional landing page design', market: '~$1,500', launchy: '✓ Included' },
                { item: 'Full dashboard UI kit', market: '~$600', launchy: '✓ Included' },
                { item: 'Auth screens (login, signup, reset)', market: '~$400', launchy: '✓ Included' },
                { item: 'Settings & profile screens', market: '~$300', launchy: '✓ Included' },
                { item: 'Blog + CMS integration', market: '~$500', launchy: '✓ Included' },
                { item: 'Empty states for every screen', market: '~$200', launchy: '✓ Included' },
              ].map((row) => (
                <div className="pr-ctable-row" key={row.item}>
                  <div className="pr-ci">{row.item}</div>
                  <div className="pr-cv">{row.market}</div>
                  <div className="pr-cv good">{row.launchy}</div>
                </div>
              ))}
              <div className="pr-ctable-footer">
                <div className="pr-cft">Total if purchased separately</div>
                <div className="pr-cfv">~$3,500+</div>
                <div className="pr-cfv good">$49 — Save $3,450</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="fqh an">
            <div className="eyebrow">FAQ</div>
            <h2 className="st">Questions before <span>you buy</span></h2>
            <p className="sd">Straight answers to common questions about FlowMind.</p>
          </div>
          <div className="fql">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <div key={i} className={`fqi${isOpen ? ' open' : ''} faq-item an`}>
                  <button className="fqq" onClick={() => setOpenFaq(isOpen ? -1 : i)}>
                    {faq.q}
                    <div className="fqic">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                  </button>
                  <div
                    className="fqa"
                    style={{
                      maxHeight: isOpen ? '400px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
                    }}
                  >
                    <div className="fqai">{faq.a}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section style={{ background: 'var(--bg)', borderTop: '1.5px solid var(--border)', padding: '72px 0' }}>
        <div className="container">
          <div className="pricing-guarantee-grid an">
            <div className="pricing-guarantee-card">
              <div className="pricing-guarantee-icon">🔒</div>
              <div className="pricing-guarantee-title">Secure Checkout</div>
              <div className="pricing-guarantee-desc">All payments processed via Lemon Squeezy with 256-bit encryption. Your data is safe.</div>
            </div>
            <div className="pricing-guarantee-card">
              <div className="pricing-guarantee-icon">⚡</div>
              <div className="pricing-guarantee-title">Instant Access</div>
              <div className="pricing-guarantee-desc">Your template link lands in your inbox within 60 seconds of payment. No waiting.</div>
            </div>
            <div className="pricing-guarantee-card">
              <div className="pricing-guarantee-icon">♾️</div>
              <div className="pricing-guarantee-title">Lifetime Updates</div>
              <div className="pricing-guarantee-desc">Every new screen and improvement ships to your template automatically. Buy once, stay current.</div>
            </div>
            <div className="pricing-guarantee-card">
              <div className="pricing-guarantee-icon">💬</div>
              <div className="pricing-guarantee-title">Priority Support</div>
              <div className="pricing-guarantee-desc">Pro and Team buyers get priority support directly from the FlowMind team. Real humans.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="ctas">
        <div className="container">
          <div className="ctab">
            <div className="eyebrow">Ready?</div>
            <h2 className="st">Start building your AI SaaS<br /><span>this week — not next quarter</span></h2>
            <p className="sd" style={{ margin: '0 auto 36px' }}>500+ founders already launched. Join them today.</p>
            <div className="ctac">
              <Link to="/book-demo" className="ctab-cta-btn">
                Get Pro — $49 One-Time
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/demo" className="btn btn-o">View Live Demo</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
