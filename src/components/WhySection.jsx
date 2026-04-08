import { useRef } from 'react'

const cards = [
  {
    iconBg: 'var(--indigo-g)',
    iconColor: 'var(--indigo)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    stat: '60 min',
    statLabel: 'to launch',
    title: 'Launch in 60 minutes, not weeks',
    desc: 'Stop losing to competitors who ship faster. BaseBox gives you every screen, every section, every conversion element — ready the moment you open it.',
    bullets: ['All 12 pages pre-built', 'Zero design decisions needed', 'Duplicate in Framer, go live'],
    accentColor: 'var(--indigo)',
    accentBg: 'var(--indigo-g)',
  },
  {
    iconBg: 'var(--emerald-bg)',
    iconColor: 'var(--emerald)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    stat: '$0',
    statLabel: 'designer needed',
    title: 'Look like a funded startup — instantly',
    desc: 'First impressions determine if visitors stay or bounce. BaseBox makes your product look backed by a $5M seed round, even if you built it alone over the weekend.',
    bullets: ['Premium visual design system', 'Used by 847+ AI founders', 'Converts 3× better than DIY'],
    accentColor: 'var(--emerald)',
    accentBg: 'var(--emerald-bg)',
  },
  {
    iconBg: 'var(--sky-g)',
    iconColor: 'var(--sky)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    stat: '12',
    statLabel: 'full pages',
    title: 'Every screen your users will see',
    desc: 'Dashboard, auth, blog, docs, pricing, settings — you get the full product UI, not just a marketing page. Show real product depth from day one.',
    bullets: ['Full dashboard with live data', 'Auth flows that convert', 'CMS-powered blog & docs'],
    accentColor: 'var(--sky)',
    accentBg: 'var(--sky-g)',
  },
  {
    iconBg: 'rgba(217,119,6,0.08)',
    iconColor: 'var(--amber)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    stat: '$49',
    statLabel: 'one-time only',
    title: 'No designer. No developer. No subscription.',
    desc: 'Agencies charge $8K+ and take 8 weeks. BaseBox costs $49, takes 60 minutes, and looks better. One payment. Yours forever. Lifetime updates included.',
    bullets: ['One-time payment, not a subscription', 'Use on unlimited projects', 'Early buyers get all future updates'],
    accentColor: 'var(--amber)',
    accentBg: 'rgba(217,119,6,0.08)',
  },
]

function WhyCard({ card }) {
  const cardRef = useRef(null)

  // Clear the scroll-reveal stagger delay on first hover so hover is instant
  const handleMouseEnter = () => {
    if (cardRef.current) cardRef.current.style.transitionDelay = '0s'
  }

  return (
    <div
      ref={cardRef}
      className="why-card an why-card-v2"
      style={{ '--accent': card.accentColor, '--accent-bg': card.accentBg }}
      onMouseEnter={handleMouseEnter}
    >
      <div className="why-card-top">
        <div className="why-ic" style={{ background: card.iconBg, color: card.iconColor }}>
          {card.icon}
        </div>
        <div className="why-stat-badge" style={{ color: card.accentColor, background: card.accentBg }}>
          <span className="why-stat-num">{card.stat}</span>
          <span className="why-stat-lbl">{card.statLabel}</span>
        </div>
      </div>
      <div className="why-t">{card.title}</div>
      <div className="why-d">{card.desc}</div>
      <ul className="why-bullets">
        {card.bullets.map((b) => (
          <li key={b} className="why-bullet visible">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {b}
          </li>
        ))}
      </ul>
      <div className="why-card-glow" style={{ background: card.accentColor }} />
    </div>
  )
}

export default function WhySection() {
  return (
    <section className="section" id="why">
      <div className="container">
        <div className="fh an-scale">
          <div className="eyebrow">Why BaseBox?</div>
          <h2 className="st">
            Stop building from scratch.<br /><span>Start shipping.</span>
          </h2>
          <p className="sd">
            Every week without a live product is a week your competitors collect signups you're not.
            BaseBox removes every excuse to delay.
          </p>
        </div>
        <div className="why-grid">
          {cards.map((card, i) => (
            <WhyCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
