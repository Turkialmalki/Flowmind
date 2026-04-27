import { useState } from 'react'
import { Link } from 'react-router-dom'

const proFeatures = [
  'All 12 pages included',
  'Full dashboard UI kit',
  'Auth screens (login, signup, reset)',
  'Settings & profile screens',
  'Blog + CMS integration',
  'Empty states for every screen',
  'Animations & micro-interactions',
  'Lifetime updates + priority support',
  'Commercial license',
]

const faqs = [
  { q: 'Is this a one-time payment?', a: 'Yes. You pay once and own the template forever. No subscriptions, no recurring fees. You also get free lifetime updates — every new screen or improvement we ship.' },
  { q: 'What exactly do I receive after purchase?', a: 'You receive instant access to the complete FlowMind React template — every page, UI component, and screen listed above. All files are downloadable and yours to keep forever.' },
  { q: 'Can I use this for client projects?', a: 'Yes. FlowMind includes a commercial license — use it on your own products or for client projects. You cannot resell or redistribute the template files themselves.' },
  { q: 'Is there a trial or refund policy?', a: 'Due to the digital nature of the product, all sales are final. We provide a complete live demo with every screen visible before purchase so you know exactly what you\'re getting.' },
  { q: 'How do the lifetime updates work?', a: 'Every new screen, section, design improvement, or bug fix we ship is available to all buyers. You\'ll get a notification and can pull the latest version anytime — no extra charge.' },
  { q: 'Do I need to know React/coding to use this?', a: 'Basic familiarity with React helps. The template is clean, well-structured code — if you\'re a developer or working with one, you\'ll be up and running in under an hour.' },
]

export default function PricingPage() {
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
            <div className="eyebrow">Simple, one-time pricing</div>
            <h1 className="iph-title">
              One payment. <span>Everything included.</span>
            </h1>
            <p className="iph-desc">
              No subscriptions. No hidden fees. Buy once, own it forever.
              Instant access the moment you purchase.
            </p>
            <p style={{ fontSize: '14px', color: 'var(--t3)', marginTop: '8px' }}>
              This is a one-time purchase template — not a hosted SaaS product.
            </p>
          </div>
        </div>
      </section>

      {/* Single plan */}
      <section style={{ paddingBottom: '80px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <div className="pc pop an" style={{ maxWidth: '440px', width: '100%' }}>
              <div className="pbg">⭐ Most Popular</div>
              <div className="pn">FlowMind Pro</div>
              <div className="pde">The complete FlowMind kit — every screen, page, and UI component you need to launch and grow.</div>
              <div className="p-orig">$99</div>
              <div className="pam">
                <span className="pcr">$</span>
                <span className="pvl">49</span>
              </div>
              <div className="p-urgency">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px' }}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                Save $50 vs hiring a designer
              </div>
              <div className="pdivider" />
              <ul className="pfl">
                {proFeatures.map((f) => (
                  <li key={f}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/book-demo"
                className="btn btn-g pbn"
                style={{ padding: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                Get FlowMind
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <div className="p-guarantee">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                One-time payment · No subscription · Lifetime access
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div className="pricing-trust an">
            {[
              { icon: '⚡', text: 'Instant delivery after purchase' },
              { icon: '♾️', text: 'Free lifetime updates' },
              { icon: '🔒', text: 'Secure checkout' },
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

      {/* Value comparison */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
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
      <section className="section">
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
                <div key={i} className={`fqi${isOpen ? ' open' : ''} faq-item`}>
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
              <div className="pricing-guarantee-desc">All payments are processed securely. Your data is safe.</div>
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
              <div className="pricing-guarantee-desc">Get priority support directly from the FlowMind creator. Real human, fast response.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="ctas">
        <div className="container">
          <div className="ctab">
            <div className="eyebrow">Ready?</div>
            <h2 className="st">Get your AI SaaS template<br /><span>today — not next quarter</span></h2>
            <p className="sd" style={{ margin: '0 auto 36px' }}>500+ founders already launched. One-time purchase. Instant access.</p>
            <div className="ctac">
              <Link
                to="/book-demo"
                className="ctab-cta-btn"
                style={{ textDecoration: 'none' }}
              >
                Get FlowMind
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px', height: '18px' }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--t3)', marginTop: '16px' }}>
              This is a one-time purchase template — not a hosted SaaS product.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
