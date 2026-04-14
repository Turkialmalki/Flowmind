function Stars() {
  return (
    <div className="tst">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24">
          <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
        </svg>
      ))}
    </div>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function VerifiedIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

const reviews = [
  {
    outcome: 'First 50 signups in 3 days',
    quote: '"Saved me at least two weeks of design work. Honestly the dashboard screens were the thing I didn\'t know I needed — investors asked if we had a real product before seeing our deck. We did, kind of."',
    name: 'James K.',
    role: 'Founder, AI writing tool',
    initial: 'J',
    avatarStyle: { background: 'var(--grad)' },
  },
  {
    outcome: 'Launched in one afternoon',
    quote: '"Our agency quoted $8,400 for what\'s already here. The auth screens and settings panel alone are worth ten times the price. I customized everything in Framer in a few hours — it was almost too easy."',
    name: 'Ria M.',
    role: 'Co-founder, AI analytics startup',
    initial: 'R',
    avatarStyle: { background: 'linear-gradient(135deg,#5B5BD6,#E11D48)' },
  },
  {
    outcome: 'Looks like a Series A product',
    quote: '"I\'m a backend engineer. Design was always my weak point. FlowMind fixed that — the whole thing looks like we raised money to build it. My users had no idea it was a template. I\'m never starting from scratch again."',
    name: 'David L.',
    role: 'Solo developer, AI code assistant',
    initial: 'D',
    avatarStyle: { background: 'linear-gradient(135deg,#059669,#0EA5E9)' },
  },
]

export default function Testimonials() {
  return (
    <section className="section" style={{ background: 'var(--bg2)' }} id="reviews">
      <div className="container">
        <div className="teh an">
          <div className="eyebrow">From Real Customers</div>
          <h2 className="st">
            Founders shipping faster <span>with FlowMind</span>
          </h2>
          <p className="sd">
            Real results from people who bought it, shipped it, and got users — not just a pretty site.
          </p>
        </div>
        <div className="teg">
          {reviews.map((r) => (
            <div className="tc an" key={r.name}>
              <div className="tc-top-row">
                <Stars />
                <div className="tc-verified">
                  <VerifiedIcon />
                  Verified Purchase
                </div>
              </div>
              <div className="tc-outcome">
                <CheckIcon />
                {r.outcome}
              </div>
              <p className="ttx">{r.quote}</p>
              <div className="tau">
                <div className="tav" style={r.avatarStyle}>{r.initial}</div>
                <div>
                  <div className="tnm">{r.name}</div>
                  <div className="trl">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
