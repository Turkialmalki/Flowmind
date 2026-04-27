const GUMROAD = 'https://turkialmalki.gumroad.com/l/flowmind'

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

const features = [
  'All 6 marketing pages',
  'Full dashboard UI kit',
  'Auth screens (login, signup, reset)',
  'Settings & profile screens',
  'Empty states for every screen',
  'Framer CMS (blog, team, changelog)',
  'Animations & micro-interactions',
  'Lifetime updates + priority support',
]

const compareRows = [
  { item: 'Professional landing page design', market: '~$1,500', launchy: '✓ Included' },
  { item: 'Full dashboard UI kit', market: '~$600', launchy: '✓ Included' },
  { item: 'Auth screens (login, signup, reset)', market: '~$400', launchy: '✓ Included' },
  { item: 'Settings & profile screens', market: '~$300', launchy: '✓ Included' },
  { item: 'Blog + CMS integration', market: '~$500', launchy: '✓ Included' },
  { item: 'Empty states for every screen', market: '~$200', launchy: '✓ Included' },
]

export default function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="prh an">
          <div className="eyebrow">Simple, one-time pricing</div>
          <h2 className="st">
            One payment. <span>Everything included.</span>
          </h2>
          <p className="sd">
            No subscriptions. No hidden fees. Buy once, own it forever —
            instant access the moment you purchase.
          </p>
          <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--t3)', marginTop: '-8px', marginBottom: '8px' }}>
            This is a one-time purchase template — not a hosted SaaS product.
          </p>
          <div className="pr-trust-row">
            <div className="pr-trust-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              Instant access after purchase
            </div>
            <div className="pr-trust-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              One-time payment, no subscription
            </div>
            <div className="pr-trust-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" /></svg>
              Lifetime updates included
            </div>
            <div className="pr-trust-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
              Used by AI founders worldwide
            </div>
          </div>
        </div>

        {/* Single pricing card — centered */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '56px' }}>
          <div className="pc pop an" style={{ maxWidth: '440px', width: '100%' }}>
            <div className="pbg">⭐ Best Value — Most Popular</div>
            <div className="pn">FlowMind Pro</div>
            <div className="pde">The complete FlowMind kit — every screen, page, and UI component you need to launch and grow.</div>
            <div className="p-orig">$99</div>
            <div className="pam">
              <span className="pcr">$</span>
              <span className="pvl">49</span>
            </div>
            <div className="p-urgency">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px' }}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              Launch price — save $50 today
            </div>
            <div className="p-meta">
              <div className="p-meta-item"><BoltIcon />Instant access after purchase</div>
              <div className="p-meta-item"><CheckIcon />One-time payment — no subscription ever</div>
              <div className="p-meta-item"><CheckIcon />Lifetime access · downloadable template</div>
            </div>
            <div className="pdivider" />
            <ul className="pfl">
              {features.map((f) => (
                <li key={f}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={GUMROAD}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-g pbn"
              style={{ padding: '15px', fontSize: '16px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              Get FlowMind
              <ArrowIcon />
            </a>
            <div className="p-savings-note">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
              Saves $3,450+ vs. hiring a designer
            </div>
            <div className="p-guarantee">
              <ShieldIcon />
              One-time payment · Lifetime access
            </div>
          </div>
        </div>

        {/* Value comparison table */}
        <div className="pr-compare an">
          <div className="pr-compare-eyebrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            What you'd pay if you bought each piece separately
          </div>
          <div className="pr-ctable">
            <div className="pr-ctable-head">
              <div className="pr-cth">What's included</div>
              <div className="pr-cth">Market rate</div>
              <div className="pr-cth accent">FlowMind Pro</div>
            </div>
            {compareRows.map((row) => (
              <div className="pr-ctable-row" key={row.item}>
                <div className="pr-ci">{row.item}</div>
                <div className="pr-cv">{row.market}</div>
                <div className="pr-cv good">{row.launchy}</div>
              </div>
            ))}
            <div className="pr-ctable-footer">
              <div className="pr-cft">Total if purchased separately</div>
              <div className="pr-cfv">~$3,500+</div>
              <div className="pr-cfv good">$49 — Save $3,450+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
