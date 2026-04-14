import { Link } from 'react-router-dom'

const trustItems = [
  {
    label: 'Instant access after purchase',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    label: 'One-time payment, no subscription',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: 'Lifetime free updates',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </svg>
    ),
  },
  {
    label: 'Use on unlimited projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
]

const socialProofItems = [
  { num: '847+', label: 'founders launched' },
  { num: '$3,450+', label: 'saved per project' },
  { num: '60 min', label: 'avg time to live' },
  { num: '4.9★', label: 'average rating' },
]

export default function FinalCTA() {
  return (
    <section className="ctas">
      <div className="container">
        <div className="ctab an">
          {/* Eyebrow */}
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Your AI SaaS. Live Today.</div>

          {/* Headline */}
          <h2 className="st" style={{ textAlign: 'center', marginBottom: '18px' }}>
            Stop waiting. Ship your<br />AI automation SaaS <span>today.</span>
          </h2>

          {/* Subtext — urgency + social proof */}
          <p className="sd" style={{ textAlign: 'center', margin: '0 auto 14px' }}>
            Every week you wait is a week your competitors are collecting signups you're not.
            847+ founders already shipped with FlowMind — most went live in under 60 minutes.
          </p>

          {/* Social proof mini stats */}
          <div className="ctab-stats">
            {socialProofItems.map((item) => (
              <div className="ctab-stat" key={item.label}>
                <div className="ctab-stat-num">{item.num}</div>
                <div className="ctab-stat-label">{item.label}</div>
              </div>
            ))}
          </div>

          <p className="ctab-note">
            Instant access · One-time payment · No subscription ever · Lifetime updates
          </p>

          {/* CTAs */}
          <div className="ctac">
            <Link to="/pricing" className="ctab-cta-btn">
              Get the Template — $49
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/demo" className="btn btn-o btn-lg">See Live Demo</Link>
          </div>

          {/* Urgency */}
          <div className="ctab-urgency">
            <div className="ctab-urgency-dot" />
            Launch price active now — increasing after next 50 sales
          </div>

          {/* Trust row */}
          <div className="ctab-trust">
            {trustItems.map((item) => (
              <div className="ctab-trust-item" key={item.label}>
                {item.icon}
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
