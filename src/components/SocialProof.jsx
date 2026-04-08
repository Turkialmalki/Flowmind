const brands = [
  'NovaMind AI',
  'Scribe.so',
  'DataPulse',
  'ShipAI',
  'Cortex HQ',
  'Insight Lab',
  'AuraWrite',
  'FlowBot',
]

const stats = [
  { num: '847+', label: 'AI founders launched' },
  { num: '12+', label: 'Complete screens included' },
  { num: '4.9★', label: 'Average rating' },
  { num: '<60min', label: 'Average time to live' },
]

const trustBadges = [
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    text: 'Used by founders launching AI startups',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    text: 'Built for Framer',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </svg>
    ),
    text: 'Lifetime updates included',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    text: 'One-time payment, no subscription',
  },
]

export default function SocialProof() {
  return (
    <section className="sp-strip">
      <div className="container">
        <div className="sp-trust-badges an">
          {trustBadges.map((b) => (
            <div className="sp-trust-badge" key={b.text}>
              {b.icon}
              {b.text}
            </div>
          ))}
        </div>
        <div className="sp-brands an">
          <div className="sp-brands-label">Trusted by founders building</div>
          <div className="sp-brands-pills">
            {brands.map((b) => (
              <div className="sp-brand-pill" key={b}>{b}</div>
            ))}
          </div>
        </div>
        <div className="sp-grid">
          {stats.map((s) => (
            <div className="sp-item an" key={s.label}>
              <div className="sp-num">{s.num}</div>
              <div className="sp-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
