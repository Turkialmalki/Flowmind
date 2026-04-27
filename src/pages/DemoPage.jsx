import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import LogoIcon from '../components/LogoIcon'

/* Mini interactive dashboard preview */
function MiniDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [timeframe, setTimeframe] = useState('7d')
  const [counts, setCounts] = useState({ users: 0, mrr: 0, conv: 0 })
  const started = useRef(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const targets = { users: 12482, mrr: 48339, conv: 48 }
        const dur = 1400
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setCounts({
            users: Math.round(ease * targets.users),
            mrr: Math.round(ease * targets.mrr),
            conv: Math.round(ease * targets.conv),
          })
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="demo-dash" ref={ref}>
      {/* Sidebar */}
      <div className="demo-dash-sidebar">
        <div className="demo-dash-logo">
          <LogoIcon height={28} />
          <span>FlowMind</span>
        </div>
        {['overview', 'analytics', 'workflows', 'revenue'].map(tab => (
          <button
            key={tab}
            className={`demo-nav-item${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="demo-dash-main">
        <div className="demo-dash-topbar">
          <div className="demo-topbar-title">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </div>
          <div className="demo-timeframe">
            {['24h', '7d', '30d'].map(tf => (
              <button
                key={tf}
                className={`demo-tf-btn${timeframe === tf ? ' active' : ''}`}
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="demo-stats">
              <div className="demo-stat-card">
                <div className="demo-stat-label">Workflows Run</div>
                <div className="demo-stat-value" style={{ color: 'var(--indigo)' }}>
                  {counts.users.toLocaleString()}
                </div>
                <div className="demo-stat-delta up">↑ 23% this week</div>
              </div>
              <div className="demo-stat-card">
                <div className="demo-stat-label">MRR</div>
                <div className="demo-stat-value" style={{ color: 'var(--emerald)' }}>
                  ${counts.mrr.toLocaleString()}
                </div>
                <div className="demo-stat-delta up">↑ 18% MoM</div>
              </div>
              <div className="demo-stat-card">
                <div className="demo-stat-label">Conversion</div>
                <div className="demo-stat-value" style={{ color: 'var(--sky)' }}>
                  {counts.conv / 10}%
                </div>
                <div className="demo-stat-delta up">↑ 1.2%</div>
              </div>
            </div>
            {/* Mini chart */}
            <div className="demo-chart-wrap">
              <div className="demo-chart-label">Automation Runs</div>
              <svg viewBox="0 0 400 80" preserveAspectRatio="none" style={{ width: '100%', height: '64px' }}>
                <defs>
                  <linearGradient id="dg1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(91,91,214,.2)" />
                    <stop offset="100%" stopColor="rgba(91,91,214,0)" />
                  </linearGradient>
                </defs>
                <path fill="url(#dg1)" d="M0,65 C60,58 120,45 180,38 C240,30 300,42 360,25 L400,18 L400,80 L0,80Z" />
                <path fill="none" stroke="#5B5BD6" strokeWidth="2.5" strokeLinecap="round"
                  d="M0,65 C60,58 120,45 180,38 C240,30 300,42 360,25 L400,18" />
                <circle cx="400" cy="18" r="4" fill="#5B5BD6" />
              </svg>
            </div>
            {/* Activity */}
            <div className="demo-activity">
              {[
                { dot: '#059669', text: 'Email Nurture — triggered for 248 contacts' },
                { dot: '#5b5bd6', text: 'Lead Scoring processed 1,420 records' },
                { dot: '#0ea5e9', text: 'AI Tasks: 312 processed · 0.3s avg' },
              ].map((item, i) => (
                <div key={i} className="demo-activity-item">
                  <div className="demo-activity-dot" style={{ background: item.dot }} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <div className="demo-analytics">
            {[
              { label: 'Page Views', value: '48,291', delta: '↑ 12%', color: 'var(--indigo)' },
              { label: 'Avg Session', value: '4m 32s', delta: '↑ 8%', color: 'var(--sky)' },
              { label: 'Bounce Rate', value: '28.4%', delta: '↓ 3%', color: 'var(--emerald)' },
            ].map(m => (
              <div key={m.label} className="demo-stat-card">
                <div className="demo-stat-label">{m.label}</div>
                <div className="demo-stat-value" style={{ color: m.color }}>{m.value}</div>
                <div className={`demo-stat-delta ${m.delta.startsWith('↑') ? 'up' : 'down'}`}>{m.delta}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'workflows' && (
          <div className="demo-users">
            {[
              { name: 'Maya Chen', plan: 'Pro', status: 'active', mrr: '$49' },
              { name: 'Jordan Park', plan: 'Team', status: 'active', mrr: '$99' },
              { name: 'Sarah Williams', plan: 'Pro', status: 'trial', mrr: '—' },
              { name: 'Alex Kim', plan: 'Starter', status: 'active', mrr: '$29' },
            ].map((u, i) => (
              <div key={i} className="demo-user-row">
                <div className="demo-user-avatar" style={{ background: ['#5b5bd6','#059669','#0ea5e9','#d97706'][i] }}>
                  {u.name[0]}
                </div>
                <div className="demo-user-name">{u.name}</div>
                <div className="demo-user-plan">{u.plan}</div>
                <div className={`demo-user-status ${u.status}`}>{u.status}</div>
                <div className="demo-user-mrr">{u.mrr}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="demo-revenue">
            {[
              { label: 'MRR', value: '$48,339', delta: '↑ 18%', color: 'var(--emerald)' },
              { label: 'ARR', value: '$580K', delta: 'projected', color: 'var(--indigo)' },
              { label: 'ARPU', value: '$57', delta: '↑ $4', color: 'var(--sky)' },
            ].map(m => (
              <div key={m.label} className="demo-stat-card">
                <div className="demo-stat-label">{m.label}</div>
                <div className="demo-stat-value" style={{ color: m.color }}>{m.value}</div>
                <div className="demo-stat-delta up">{m.delta}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const highlights = [
  { icon: '⚡', title: 'Zero configuration', desc: 'Duplicate → customize → publish. Live in one afternoon.' },
  { icon: '📱', title: 'Fully responsive', desc: 'Pixel-perfect on every screen from 320px to 4K.' },
  { icon: '🎨', title: 'Design system', desc: 'Change 3 color tokens — every component updates instantly.' },
  { icon: '🤖', title: 'AI-ready', desc: 'Drop in any AI backend — the demo UI is fully wired.' },
  { icon: '💳', title: 'Stripe-ready', desc: 'Auth, billing, and user management flows all included.' },
  { icon: '♾️', title: 'Lifetime updates', desc: 'Every improvement ships to you automatically. Buy once.' },
]

export default function DemoPage() {
  return (
    <div className="demo-page">
      {/* Demo preview banner */}
      <div className="demo-preview-banner">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        Demo Preview — view-only experience. Ready to launch?&nbsp;
        <Link to="/pricing" className="demo-banner-link">Get the template →</Link>
      </div>

      {/* Hero */}
      <section className="iph">
        <div className="iph-bg">
          <div className="iph-orb iph-orb1" />
          <div className="iph-orb iph-orb2" />
          <div className="iph-grid" />
        </div>
        <div className="container">
          <div className="iph-inner" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow">Live Demo</div>
            <h1 className="iph-title">
              See the full product.<br /><span>Right here, right now.</span>
            </h1>
            <p className="iph-desc" style={{ margin: '0 auto 36px' }}>
              This is not a screenshot or a Figma mockup. Every component below is interactive.
              Click the tabs, change the timeframes, and explore the full dashboard system.
            </p>
            <div className="demo-hero-actions">
              <Link to="/book-demo" className="btn btn-g btn-lg" style={{ textDecoration: 'none' }}>Get FlowMind</Link>
              <Link to="/pricing" className="btn btn-o btn-lg">View Pricing →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive dashboard */}
      <section className="section" style={{ background: 'var(--bg2)', paddingTop: '60px' }}>
        <div className="container">
          <div className="fh an" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="eyebrow">Interactive Preview</div>
            <h2 className="st">Click around — it's all real</h2>
            <p className="sd" style={{ margin: '0 auto' }}>
              Switch tabs, change timeframes, and interact with the data. This is exactly what your dashboard will look like.
            </p>
          </div>
          <div className="demo-frame-wrap an">
            <div className="demo-frame-header">
              <div className="demo-frame-dots">
                <span style={{ background: '#ff5f57' }} />
                <span style={{ background: '#febc2e' }} />
                <span style={{ background: '#28c840' }} />
              </div>
              <div className="demo-frame-url">flowmind.ai/dashboard</div>
              <div className="demo-frame-badge">LIVE PREVIEW</div>
            </div>
            <MiniDashboard />
          </div>
        </div>
      </section>

      {/* What you're seeing */}
      <section className="section">
        <div className="container">
          <div className="fh an" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="eyebrow">What's included</div>
            <h2 className="st">Everything you just <span>interacted with</span></h2>
          </div>
          <div className="demo-highlights-grid">
            {highlights.map(h => (
              <div key={h.title} className="demo-highlight-card an">
                <div className="demo-highlight-icon">{h.icon}</div>
                <h3 className="demo-highlight-title">{h.title}</h3>
                <p className="demo-highlight-desc">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Page list */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="fh an" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="eyebrow">All Pages</div>
            <h2 className="st">12+ pages. Every one <span>production-ready.</span></h2>
          </div>
          <div className="demo-pages-grid an">
            {[
              { path: '/', label: 'Home', desc: 'Full landing page with hero, features, pricing, testimonials', tag: 'Marketing' },
              { path: '/features', label: 'Features', desc: 'Interactive feature showcase with live demos', tag: 'Marketing' },
              { path: '/pricing', label: 'Pricing', desc: '3-tier pricing with comparison table and FAQ', tag: 'Marketing' },
              { path: '/dashboard', label: 'Dashboard', desc: 'Full analytics dashboard with 6 views', tag: 'App' },
              { path: '/ai-demo', label: 'AI Demo', desc: 'Interactive chat with your AI backend', tag: 'App' },
              { path: '/cms', label: 'CMS & Blog', desc: 'Blog system with categories, search, and SEO', tag: 'Content' },
              { path: '/blog', label: 'Blog', desc: 'Post grid, featured article, and single post view', tag: 'Content' },
              { path: '/docs', label: 'Documentation', desc: 'Sidebar navigation with code blocks and search', tag: 'Content' },
              { path: '/setup', label: 'Setup Guide', desc: 'Step-by-step onboarding with expandable steps', tag: 'Onboarding' },
              { path: '/changelog', label: 'Changelog', desc: 'Timeline of releases with expand/collapse', tag: 'Content' },
            ].map((page) => (
              <Link key={page.path} to={page.path} className="demo-page-card">
                <div className="demo-page-card-top">
                  <span className="demo-page-tag">{page.tag}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="demo-page-path">{page.path}</div>
                <div className="demo-page-label">{page.label}</div>
                <div className="demo-page-desc">{page.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ctas">
        <div className="container">
          <div className="ctab">
            <div className="eyebrow">Convinced?</div>
            <h2 className="st">This entire system.<br /><span>One payment. $49.</span></h2>
            <p className="sd" style={{ margin: '0 auto 36px' }}>
              Every page you just saw. Every interaction you just experienced. Lifetime updates included.
            </p>
            <div className="ctac">
              <Link to="/pricing" className="ctab-cta-btn">
                Get FlowMind — $49
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/features" className="btn btn-o">Explore Features</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
