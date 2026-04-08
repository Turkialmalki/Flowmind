function CheckIcon({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
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

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    desc: 'The core marketing pages to get your AI SaaS in front of users today.',
    orig: '$59',
    price: '29',
    urgency: 'Launch price — increases soon',
    meta: [
      { icon: <BoltIcon />, text: 'Instant access after purchase' },
      { icon: <CheckIcon />, text: 'One-time payment, no subscription' },
    ],
    features: [
      'Home page (all sections)',
      'Pricing page',
      'Fully responsive design',
      'Lifetime updates',
    ],
    cta: 'Get Starter',
    ctaClass: 'btn btn-o pbn',
    guarantee: 'One-time payment',
    pop: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: '⭐ Best Value — Most Popular',
    desc: 'The complete BaseBox kit — every screen, page, and UI component you need to launch and grow.',
    orig: '$99',
    price: '49',
    urgency: 'Launch price — save $50 today',
    meta: [
      { icon: <BoltIcon />, text: 'Instant access after purchase' },
      { icon: <CheckIcon />, text: 'One-time payment — no subscription ever' },
      { icon: <CheckIcon />, text: 'Use on unlimited personal projects' },
    ],
    features: [
      'All 6 marketing pages',
      'Full dashboard UI kit',
      'Auth screens (login, signup, reset)',
      'Settings & profile screens',
      'Empty states for every screen',
      'Framer CMS (blog, team, changelog)',
      'Animations & micro-interactions',
      'Lifetime updates + priority support',
    ],
    cta: 'Get Pro — Launch Today',
    ctaClass: 'btn btn-g pbn',
    showArrow: true,
    guarantee: 'One-time payment · Lifetime updates',
    savingsNote: 'Saves $3,450+ vs. hiring a designer',
    pop: true,
  },
  {
    id: 'team',
    name: 'Team',
    desc: 'Pro + extended license for agencies and client projects. Unlimited commercial use.',
    orig: '$199',
    price: '99',
    urgency: 'Launch price — 50% off',
    meta: [
      { icon: <BoltIcon />, text: 'Instant access after purchase' },
      { icon: <CheckIcon />, text: 'One-time payment, no subscription' },
      { icon: <CheckIcon />, text: 'Unlimited client & commercial projects' },
    ],
    features: [
      'Everything in Pro',
      'Extended commercial license',
      'Figma source file included',
      'Unlimited projects',
      '1-on-1 setup call',
    ],
    cta: 'Get Team License',
    ctaClass: 'btn btn-p pbn',
    guarantee: 'One-time · Unlimited client use',
    pop: false,
  },
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
          <div className="eyebrow">Get BaseBox</div>
          <h2 className="st">
            One payment. <span>Everything included.</span><br />Launch this week.
          </h2>
          <p className="sd">
            No subscriptions. No hidden fees. Buy once, own it forever.
            Instant access the moment you purchase — start building in minutes.
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

        <div className="prg">
          {plans.map((plan) => (
            <div key={plan.id} className={`pc an${plan.pop ? ' pop' : ''}`}>
              {plan.badge && <div className="pbg">{plan.badge}</div>}
              <div className="pn">{plan.name}</div>
              <div className="pde">{plan.desc}</div>
              <div className="p-orig">{plan.orig}</div>
              <div className="pam">
                <span className="pcr">$</span>
                <span className="pvl">{plan.price}</span>
              </div>
              <div className="p-urgency">
                <ClockIcon />
                {plan.urgency}
              </div>
              <div className="p-meta">
                {plan.meta.map((m, i) => (
                  <div className="p-meta-item" key={i}>
                    {m.icon}
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="pdivider" />
              <ul className="pfl">
                {plan.features.map((f) => (
                  <li key={f}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" className={plan.ctaClass} style={plan.pop ? { padding: '15px', fontSize: '16px' } : {}}>
                {plan.cta}
                {plan.showArrow && <ArrowIcon />}
              </a>
              {plan.savingsNote && (
                <div className="p-savings-note">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                  {plan.savingsNote}
                </div>
              )}
              <div className="p-guarantee">
                <ShieldIcon />
                {plan.guarantee}
              </div>
            </div>
          ))}
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
              <div className="pr-cth accent">BaseBox Pro</div>
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
