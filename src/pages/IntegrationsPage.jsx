import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// ── Integration data ──────────────────────────────────────────────────────
const INTEGRATIONS = [
  {
    id: 'openai',
    name: 'OpenAI',
    category: 'AI',
    desc: 'GPT-4 powered analysis, summarization, and intelligent routing for every workflow.',
    status: 'active',
    color: '#10a37f',
    bg: 'rgba(16,163,127,0.08)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    desc: 'Deliver real-time alerts, workflow summaries, and AI digests to any Slack channel.',
    status: 'active',
    color: '#4a154b',
    bg: 'rgba(74,21,75,0.08)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/>
        <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/>
        <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/>
        <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/>
        <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
        <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/>
        <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>
      </svg>
    ),
  },
  {
    id: 'gcal',
    name: 'Google Calendar',
    category: 'Productivity',
    desc: 'Auto-create, update, and sync calendar events triggered by AI workflow logic.',
    status: 'syncing',
    color: '#4285f4',
    bg: 'rgba(66,133,244,0.08)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8"  y1="2" x2="8"  y2="6"/>
        <line x1="3"  y1="10" x2="21" y2="10"/>
        <polyline points="8 14 10.5 16.5 16 12"/>
      </svg>
    ),
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Productivity',
    desc: 'Push AI-generated summaries, logs, and structured data directly into Notion pages.',
    status: 'active',
    color: '#000000',
    bg: 'rgba(0,0,0,0.06)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"/>
        <path d="M9 8h6M9 12h6M9 16h4"/>
      </svg>
    ),
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Payments',
    desc: 'Trigger automations on payment events — subscriptions, invoices, churn recovery.',
    status: 'active',
    color: '#635bff',
    bg: 'rgba(99,91,255,0.08)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'CRM',
    desc: 'Sync contacts, deals, and pipeline stages — let AI score leads automatically.',
    status: 'active',
    color: '#ff7a59',
    bg: 'rgba(255,122,89,0.08)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Dev',
    desc: 'Trigger workflows from PRs, issues, and commits — automate your dev pipeline.',
    status: 'syncing',
    color: '#24292e',
    bg: 'rgba(36,41,46,0.07)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
      </svg>
    ),
  },
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'Automation',
    desc: 'Bridge FlowMind with 5,000+ apps via Zapier webhooks and trigger chains.',
    status: 'active',
    color: '#ff4a00',
    bg: 'rgba(255,74,0,0.08)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
]

const CATEGORIES = ['All', 'AI', 'Communication', 'Productivity', 'Payments', 'CRM', 'Dev', 'Automation']

// ── Scroll reveal hook ─────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

// ── Integration card ──────────────────────────────────────────────────────
function IntCard({ item, delay }) {
  const [hovered, setHovered] = useState(false)
  const statusLabel = item.status === 'active' ? 'Active' : 'Syncing'

  return (
    <div
      className={`int-card${hovered ? ' int-card-hovered' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="int-card-top">
        <div className="int-icon-wrap" style={{ background: item.bg, color: item.color }}>
          {item.icon}
        </div>
        <span className={`int-status int-status-${item.status}`}>
          <span className="int-status-dot" />
          {statusLabel}
        </span>
      </div>

      <div className="int-card-body">
        <div className="int-card-name">{item.name}</div>
        <div className="int-card-cat">{item.category}</div>
        <p className="int-card-desc">{item.desc}</p>
      </div>

      <div className="int-card-footer">
        <button className="int-connect-btn">
          {item.status === 'active' ? 'Configure' : 'Connect'}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* hover glow */}
      <div className="int-card-glow" style={{ '--glow-c': item.color }} />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function IntegrationsPage() {
  const [filter, setFilter] = useState('All')
  const [heroRef, heroVisible]   = useReveal()
  const [gridRef, gridVisible]   = useReveal()

  const filtered = filter === 'All'
    ? INTEGRATIONS
    : INTEGRATIONS.filter(i => i.category === filter)

  return (
    <div className="int-page">

      {/* ── Hero ── */}
      <section className="int-hero" ref={heroRef}>
        <div className="int-hero-glow" aria-hidden="true" />
        <div className="container int-hero-inner">
          <div className={`int-eyebrow an${heroVisible ? ' v' : ''}`} style={{ transitionDelay: '0ms' }}>
            <span className="int-eyebrow-dot" />
            Integrations
          </div>
          <h1 className={`int-title an${heroVisible ? ' v' : ''}`} style={{ transitionDelay: '80ms' }}>
            Connect your entire<br /><span>workflow</span>
          </h1>
          <p className={`int-subtitle an${heroVisible ? ' v' : ''}`} style={{ transitionDelay: '160ms' }}>
            FlowMind plugs into the tools you already use. Sync data, trigger automations,
            and let AI orchestrate your entire stack — without writing a line of code.
          </p>

          <div className={`int-hero-stats an${heroVisible ? ' v' : ''}`} style={{ transitionDelay: '240ms' }}>
            {[
              { n: '12+',  l: 'Native integrations' },
              { n: '5K+',  l: 'Apps via Zapier' },
              { n: '99.9%',l: 'Sync uptime' },
            ].map(({ n, l }) => (
              <div key={l} className="int-hero-stat">
                <div className="int-hero-stat-n">{n}</div>
                <div className="int-hero-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <div className="int-filter-bar">
        <div className="container int-filter-inner">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`int-filter-btn${filter === cat ? ' active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
              {cat !== 'All' && (
                <span className="int-filter-count">
                  {INTEGRATIONS.filter(i => i.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="int-grid-section">
        <div className="container">
          <div
            ref={gridRef}
            className={`int-grid${gridVisible ? ' int-grid-visible' : ''}`}
          >
            {filtered.map((item, i) => (
              <IntCard key={item.id} item={item} delay={i * 60} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="int-cta-section">
        <div className="container int-cta-inner">
          <div className="int-cta-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
            </svg>
          </div>
          <h2 className="int-cta-title">Need a custom integration?</h2>
          <p className="int-cta-sub">
            Use our webhook API or Zapier bridge to connect any tool in under 5 minutes.
          </p>
          <div className="int-cta-btns">
            <Link to="/docs" className="btn btn-g">Read API Docs</Link>
            <Link to="/pricing" className="btn btn-o">View Plans</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
