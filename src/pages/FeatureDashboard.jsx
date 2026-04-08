import { Link } from 'react-router-dom'
import { BoxIcon } from '../components/LogoIcon'

const dashItems = [
  { icon: '📊', title: 'KPI Analytics Cards', desc: 'Users, MRR, conversion rate, active plans — the four metrics every SaaS founder needs at a glance.' },
  { icon: '📈', title: 'Area & Line Charts', desc: 'Visualize user growth, revenue trends, and engagement over any time window. Powered by SVG, zero dependencies.' },
  { icon: '👥', title: 'User Management Table', desc: 'Sortable, filterable table with user status, plan tier, join date, and action menus.' },
  { icon: '🔔', title: 'Activity Feed', desc: 'Real-time stream of signups, upgrades, API calls, and system events — your product\'s pulse.' },
  { icon: '⚡', title: 'Quick Actions Panel', desc: 'Invite users, create reports, configure integrations — frequent tasks surfaced where users need them.' },
  { icon: '📋', title: 'Empty States', desc: 'Every section has a thoughtful empty state. New users feel guided, not abandoned.' },
  { icon: '🗂️', title: 'Settings & Profile', desc: 'Account settings, billing, notifications, API key management — all designed to match the dashboard.' },
  { icon: '📱', title: 'Responsive Layout', desc: 'Sidebar collapses on mobile. Every dashboard panel stacks gracefully. Works on every device.' },
]

function DashMockFull() {
  return (
    <div className="db-full" style={{ height: 'auto', minHeight: '420px' }}>
      <div className="db-sidebar">
        <div className="db-logo">
          <div className="db-logo-mark"><BoxIcon height={26} /></div>
          <div className="db-logo-t">BaseBox</div>
        </div>
        <div className="db-nav">
          {[
            { icon: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>, label: 'Overview', active: true },
            { icon: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>, label: 'Analytics' },
            { icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></>, label: 'Users' },
            { icon: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></>, label: 'Revenue' },
            { icon: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></>, label: 'Reports' },
            { icon: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06A1.65 1.65 0 0015 19.4" /></>, label: 'Settings' },
          ].map(({ icon, label, active }) => (
            <div key={label} className={`db-nav-item${active ? ' active' : ''}`}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{icon}</svg>
              {label}
            </div>
          ))}
        </div>
        <div className="db-nav-item" style={{ marginTop: 'auto' }}>
          <div className="db-avatar" style={{ width: '16px', height: '16px', fontSize: '7px', flexShrink: 0 }}>A</div>
          Alex Kim
        </div>
      </div>
      <div className="db-main">
        <div className="db-topbar">
          <div className="db-topbar-t">Dashboard Overview</div>
          <div className="db-topbar-r">
            <div className="db-notif">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg>
            </div>
            <div className="db-avatar">A</div>
          </div>
        </div>
        <div className="db-content">
          <div className="db-stats">
            {[
              { l: 'Total Users', v: '12,481', d: '↑ 23% this week' },
              { l: 'Monthly Revenue', v: '$48,320', d: '↑ 18% MoM' },
              { l: 'Conversion Rate', v: '4.8%', d: '↑ 1.2% vs avg' },
              { l: 'Active Plans', v: '847', d: '32 upgraded today' },
            ].map((s) => (
              <div key={s.l} className="db-stat">
                <div className="db-stat-l">{s.l}</div>
                <div className="db-stat-v">{s.v}</div>
                <div className="db-stat-d">{s.d}</div>
              </div>
            ))}
          </div>
          <div className="db-bottom" style={{ gridTemplateColumns: '1.8fr 1fr' }}>
            <div className="db-chart-card">
              <div className="db-chart-top">
                <div className="db-chart-title">User Growth</div>
                <div className="db-time-btns">
                  <button className="db-time-btn">24h</button>
                  <button className="db-time-btn on">7d</button>
                  <button className="db-time-btn">30d</button>
                </div>
              </div>
              <svg style={{ width: '100%', height: '100px' }} viewBox="0 0 600 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="dbg2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(91,91,214,.16)" />
                    <stop offset="100%" stopColor="rgba(91,91,214,0)" />
                  </linearGradient>
                </defs>
                <path fill="url(#dbg2)" d="M0,80 C50,72 100,60 160,50 C220,40 270,55 330,38 C390,22 440,30 500,18 C550,10 580,14 600,10 L600,100 L0,100Z" />
                <path fill="none" stroke="#5B5BD6" strokeWidth="2.5" strokeLinecap="round" d="M0,80 C50,72 100,60 160,50 C220,40 270,55 330,38 C390,22 440,30 500,18 C550,10 580,14 600,10" />
                <circle cx="330" cy="38" r="4" fill="#5B5BD6" stroke="white" strokeWidth="2" />
                <circle cx="500" cy="18" r="4" fill="#5B5BD6" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <div className="db-activity">
              <div className="db-activity-title">Recent Activity</div>
              <div className="db-activity-list">
                {[
                  { dot: '#059669', text: 'New signup — maya@startup.co', time: '2m' },
                  { dot: '#5b5bd6', text: 'Upgraded to Pro — john@b2b.io', time: '8m' },
                  { dot: '#0ea5e9', text: 'API spike detected — auto-scaled', time: '14m' },
                  { dot: '#d97706', text: 'Trial ending — 3 accounts', time: '1h' },
                  { dot: '#059669', text: 'New signup — sara@techco.com', time: '2h' },
                ].map((item) => (
                  <div key={item.text} className="db-activity-item">
                    <div className="db-activity-dot" style={{ background: item.dot }} />
                    <div className="db-activity-text">{item.text}</div>
                    <div className="db-activity-time">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FeatureDashboard() {
  return (
    <div className="feat-detail-page">
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <Link to="/features">Features</Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span>Dashboard UI</span>
          </div>
        </div>
      </div>

      <section className="fd-hero">
        <div className="container">
          <div className="fd-hero-inner fd-hero-inner-center">
            <div className="fd-hero-text an" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 56px' }}>
              <div className="screen-badge">Dashboard UI Kit</div>
              <h1 className="fd-hero-title">
                A full SaaS dashboard<br /><span>your users will love</span>
              </h1>
              <p className="fd-hero-desc">
                Show off your product's power before anyone signs up. The complete dashboard UI includes
                sidebar navigation, KPI cards, animated charts, activity feeds, and data tables — all
                editable in Framer without touching code.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '28px' }}>
                <Link to="/dashboard" className="btn btn-g btn-lg">View Live Dashboard</Link>
                <Link to="/pricing" className="btn btn-o btn-lg">Get Template</Link>
              </div>
            </div>
            <div className="an">
              <DashMockFull />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="fh an">
            <div className="eyebrow">What's Included</div>
            <h2 className="st">Every panel your <span>SaaS dashboard needs</span></h2>
          </div>
          <div className="feat-grid">
            {dashItems.map((item) => (
              <div key={item.title} className="feat-card an">
                <div className="feat-card-icon">{item.icon}</div>
                <div className="feat-card-title">{item.title}</div>
                <div className="feat-card-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="fd-benefits-grid">
            <div className="fd-benefits-text an">
              <div className="eyebrow">Why It Matters</div>
              <h2 className="st">Your dashboard is your <span>product's first impression</span></h2>
              <p className="sd" style={{ maxWidth: 'none' }}>
                Visitors who see a polished dashboard preview before signing up convert at significantly
                higher rates. It answers the question "What will I get?" before they even have to ask.
                BaseBox's dashboard UI is designed to make your product look established and capable
                — even on day one.
              </p>
              <Link to="/pricing" className="btn btn-g" style={{ marginTop: '28px', display: 'inline-flex' }}>
                Get this feature — $49
              </Link>
            </div>
            <div className="fd-benefits-list">
              {[
                { title: 'Show value before signup', desc: 'Users understand exactly what they\'re getting. No guesswork, no hesitation.' },
                { title: 'Professional from day one', desc: 'A polished dashboard signals that you\'re serious. It builds credibility instantly.' },
                { title: 'Fully customizable', desc: 'Every color, label, and metric is editable in Framer. Make it match your product perfectly.' },
                { title: 'Production-ready code', desc: 'Not just a mockup — the dashboard components are structured for real-world use.' },
                { title: 'Mobile responsive', desc: 'Sidebar collapses gracefully. Every panel stacks correctly on phone and tablet.' },
              ].map((b) => (
                <div key={b.title} className="fd-benefit-item an">
                  <div className="fd-benefit-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <div>
                    <div className="fd-benefit-title">{b.title}</div>
                    <div className="fd-benefit-desc">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ctas">
        <div className="container">
          <div className="ctab">
            <div className="eyebrow">Try It Live</div>
            <h2 className="st">See the dashboard in <span>action right now</span></h2>
            <p className="sd" style={{ margin: '0 auto 36px' }}>Explore the full interactive dashboard demo — no signup required.</p>
            <div className="ctac">
              <Link to="/dashboard" className="ctab-cta-btn">
                Open Live Dashboard
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/pricing" className="btn btn-o">Get Template — $49</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
