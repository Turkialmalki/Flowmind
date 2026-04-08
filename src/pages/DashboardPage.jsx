import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import LogoIcon from '../components/LogoIcon'

/* ── Count-up hook ── */
function useCountUp(target, duration = 1400, start = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf
    const startTime = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(ease * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])
  return val
}

/* ── Animated stat card ── */
function AnimatedStat({ label, value, prefix = '', suffix = '', color = 'var(--t1)', delta, icon }) {
  const [started, setStarted] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const num = useCountUp(value, 1200, started)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      className={`dash-stat-card${hovered ? ' hovered' : ''}`}
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="dash-stat-top">
        <div className="dash-stat-label">{label}</div>
        {icon && <div className="dash-stat-icon" style={{ color }}>{icon}</div>}
      </div>
      <div className="dash-stat-value" style={{ color }}>
        {prefix}{num.toLocaleString()}{suffix}
      </div>
      {delta && (
        <div className={`dash-stat-delta${delta.startsWith('↑') ? ' up' : delta.startsWith('↓') ? ' down' : ''}`}>
          {delta}
        </div>
      )}
      <div className="dash-stat-shimmer" />
    </div>
  )
}

/* ── Chart data per timeframe ── */
const chartData = {
  '24h': {
    labels: ['12a', '3a', '6a', '9a', '12p', '3p', '6p', '9p'],
    userPath: 'M0,160 C30,155 80,150 160,135 C240,120 280,140 360,115 C440,90 500,65 580,48 C660,30 730,38 800,25',
    trialPath: 'M0,172 C30,168 80,165 160,158 C240,150 280,158 360,148 C440,138 500,128 580,118 C660,108 730,112 800,105',
    userFill: 'M0,160 C30,155 80,150 160,135 C240,120 280,140 360,115 C440,90 500,65 580,48 C660,30 730,38 800,25 L800,180 L0,180Z',
    trialFill: 'M0,172 C30,168 80,165 160,158 C240,150 280,158 360,148 C440,138 500,128 580,118 C660,108 730,112 800,105 L800,180 L0,180Z',
    dot: { cx: 580, cy: 48 },
    label: '+142 users',
  },
  '7d': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    userPath: 'M0,160 C60,148 130,130 200,112 C270,94 330,120 400,96 C470,72 540,52 620,38 C700,24 760,30 800,22',
    trialPath: 'M0,170 C60,162 130,155 200,148 C270,140 330,150 400,140 C470,130 540,120 620,108 C700,96 760,100 800,94',
    userFill: 'M0,160 C60,148 130,130 200,112 C270,94 330,120 400,96 C470,72 540,52 620,38 C700,24 760,30 800,22 L800,180 L0,180Z',
    trialFill: 'M0,170 C60,162 130,155 200,148 C270,140 330,150 400,140 C470,130 540,120 620,108 C700,96 760,100 800,94 L800,180 L0,180Z',
    dot: { cx: 620, cy: 38 },
    label: '+847 users',
  },
  '30d': {
    labels: ['Wk1', 'Wk2', 'Wk3', 'Wk4'],
    userPath: 'M0,165 C120,145 240,118 360,88 C480,60 600,42 800,18',
    trialPath: 'M0,174 C120,162 240,148 360,132 C480,116 600,105 800,88',
    userFill: 'M0,165 C120,145 240,118 360,88 C480,60 600,42 800,18 L800,180 L0,180Z',
    trialFill: 'M0,174 C120,162 240,148 360,132 C480,116 600,105 800,88 L800,180 L0,180Z',
    dot: { cx: 680, cy: 28 },
    label: '+3.2K users',
  },
  '90d': {
    labels: ['Jan', 'Feb', 'Mar'],
    userPath: 'M0,170 C200,148 400,105 600,60 C700,38 750,28 800,15',
    trialPath: 'M0,176 C200,164 400,142 600,112 C700,96 750,88 800,78',
    userFill: 'M0,170 C200,148 400,105 600,60 C700,38 750,28 800,15 L800,180 L0,180Z',
    trialFill: 'M0,176 C200,164 400,142 600,112 C700,96 750,88 800,78 L800,180 L0,180Z',
    dot: { cx: 720, cy: 22 },
    label: '+9.4K users',
  },
}

/* ── Nav items ── */
const navItems = [
  { label: 'Overview', path: 'overview', icon: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></> },
  { label: 'Analytics', path: 'analytics', icon: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></> },
  { label: 'Users', path: 'users', icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></> },
  { label: 'Revenue', path: 'revenue', icon: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></> },
  { label: 'Reports', path: 'reports', icon: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></> },
  { label: 'Settings', path: 'settings', icon: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.68 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></> },
]

/* ── Users table data ── */
const users = [
  { name: 'Maya Chen', email: 'maya@techco.io', plan: 'Pro', status: 'active', joined: 'Mar 28', mrr: '$49' },
  { name: 'Jordan Park', email: 'jordan@b2bsaas.com', plan: 'Team', status: 'active', joined: 'Mar 22', mrr: '$99' },
  { name: 'Sarah Williams', email: 'sarah@startup.co', plan: 'Pro', status: 'trial', joined: 'Apr 1', mrr: '—' },
  { name: 'Alex Kim', email: 'alex@growthco.io', plan: 'Starter', status: 'active', joined: 'Feb 15', mrr: '$29' },
  { name: 'Chris Patel', email: 'chris@aibuilds.com', plan: 'Pro', status: 'active', joined: 'Mar 10', mrr: '$49' },
  { name: 'Emma Rodriguez', email: 'emma@saasfound.co', plan: 'Team', status: 'churned', joined: 'Jan 8', mrr: '—' },
]

/* ── Base activity feed ── */
const baseActivity = [
  { dot: '#059669', text: 'maya@techco.io signed up for Pro', time: '2 min ago', id: 1 },
  { dot: '#5b5bd6', text: 'jordan@b2bsaas.com upgraded to Team', time: '8 min ago', id: 2 },
  { dot: '#0ea5e9', text: 'API usage spike — auto-scaled to handle load', time: '14 min ago', id: 3 },
  { dot: '#d97706', text: '3 trial accounts expiring in 48 hours', time: '1 hour ago', id: 4 },
  { dot: '#059669', text: 'emma@saasfound.co reactivated Pro plan', time: '2 hours ago', id: 5 },
  { dot: '#e11d48', text: 'chris@aibuilds.com cancelled — reason: pricing', time: '3 hours ago', id: 6 },
  { dot: '#5b5bd6', text: 'Monthly report generated and emailed', time: '5 hours ago', id: 7 },
]

const liveEvents = [
  { dot: '#059669', text: 'new@founder.io just signed up', time: 'just now' },
  { dot: '#5b5bd6', text: 'startup@labs.com upgraded to Team', time: 'just now' },
  { dot: '#0ea5e9', text: 'AI API processed 1,200 requests', time: 'just now' },
  { dot: '#059669', text: 'dev@saasco.io started free trial', time: 'just now' },
  { dot: '#d97706', text: '2 new support tickets opened', time: 'just now' },
  { dot: '#5b5bd6', text: 'growth@startup.io enabled SSO', time: 'just now' },
]

/* ── Analytics tab content ── */
function AnalyticsView() {
  return (
    <div className="dash-analytics-grid">
      {[
        { label: 'Page Views', value: '48,291', delta: '↑ 12%', color: 'var(--indigo)' },
        { label: 'Avg Session', value: '4m 32s', delta: '↑ 8%', color: 'var(--sky)' },
        { label: 'Bounce Rate', value: '28.4%', delta: '↓ 3%', color: 'var(--emerald)' },
        { label: 'Conversions', value: '4.8%', delta: '↑ 1.2%', color: 'var(--amber)' },
      ].map((m) => (
        <div key={m.label} className="dash-analytics-card">
          <div className="dash-analytics-label">{m.label}</div>
          <div className="dash-analytics-value" style={{ color: m.color }}>{m.value}</div>
          <div className={`dash-stat-delta ${m.delta.startsWith('↑') ? 'up' : 'down'}`}>{m.delta} vs last period</div>
        </div>
      ))}
      <div className="dash-analytics-funnel">
        <div className="dash-chart-title" style={{ marginBottom: '16px' }}>Conversion Funnel</div>
        {[
          { label: 'Visitors', value: 48291, pct: 100, color: 'var(--indigo)' },
          { label: 'Sign-ups', value: 3842, pct: 79, color: 'var(--sky)' },
          { label: 'Activated', value: 2109, pct: 55, color: 'var(--emerald)' },
          { label: 'Paying', value: 847, pct: 22, color: 'var(--amber)' },
        ].map((step) => (
          <div key={step.label} className="dash-funnel-row">
            <div className="dash-funnel-label">{step.label}</div>
            <div className="dash-funnel-bar-wrap">
              <div className="dash-funnel-bar" style={{ width: `${step.pct}%`, background: step.color }} />
            </div>
            <div className="dash-funnel-val">{step.value.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Revenue tab content ── */
function RevenueView() {
  return (
    <div className="dash-revenue-view">
      <div className="dash-rev-metrics">
        {[
          { label: 'MRR', value: '$48,339', delta: '↑ 18% MoM', color: 'var(--emerald)' },
          { label: 'ARR', value: '$580,068', delta: 'Projected', color: 'var(--indigo)' },
          { label: 'ARPU', value: '$57.07', delta: '↑ $4.20', color: 'var(--sky)' },
          { label: 'LTV', value: '$684', delta: 'vs $520 avg', color: 'var(--amber)' },
        ].map((m) => (
          <div key={m.label} className="dash-analytics-card">
            <div className="dash-analytics-label">{m.label}</div>
            <div className="dash-analytics-value" style={{ color: m.color }}>{m.value}</div>
            <div className={`dash-stat-delta ${m.delta.startsWith('↑') ? 'up' : ''}`}>{m.delta}</div>
          </div>
        ))}
      </div>
      <div className="dash-revenue-breakdown">
        <div className="dash-chart-title" style={{ marginBottom: '16px' }}>MRR by Plan</div>
        {[
          { label: 'Team ($99)', pct: 76, amount: '$18,612', color: 'var(--indigo)' },
          { label: 'Pro ($49)', pct: 58, amount: '$21,462', color: 'var(--sky)' },
          { label: 'Starter ($29)', pct: 28, amount: '$8,265', color: 'var(--emerald)' },
        ].map((item) => (
          <div key={item.label} className="dash-rev-row">
            <div className="dash-rev-label">{item.label}</div>
            <div className="dash-rev-bar-wrap">
              <div className="dash-rev-bar" style={{ width: `${item.pct}%`, background: item.color }} />
            </div>
            <div className="dash-rev-amount">{item.amount}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Settings tab content ── */
function SettingsView() {
  const [toggles, setToggles] = useState({ email: true, slack: false, mfa: true, api: false })
  const toggle = (key) => setToggles(p => ({ ...p, [key]: !p[key] }))

  return (
    <div className="dash-settings-view">
      <div className="dash-settings-section">
        <div className="dash-chart-title" style={{ marginBottom: '16px' }}>Notifications</div>
        {[
          { key: 'email', label: 'Email alerts', desc: 'Get notified on key events' },
          { key: 'slack', label: 'Slack integration', desc: 'Post alerts to a Slack channel' },
          { key: 'mfa', label: 'Two-factor auth', desc: 'Add an extra layer of security' },
          { key: 'api', label: 'API access logs', desc: 'Log all API requests to storage' },
        ].map(({ key, label, desc }) => (
          <div key={key} className="dash-setting-row">
            <div>
              <div className="dash-setting-label">{label}</div>
              <div className="dash-setting-desc">{desc}</div>
            </div>
            <button
              className={`dash-toggle${toggles[key] ? ' on' : ''}`}
              onClick={() => toggle(key)}
            >
              <span className="dash-toggle-knob" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Main dashboard ── */
export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [timeframe, setTimeframe] = useState('7d')
  const [notifOpen, setNotifOpen] = useState(false)
  const [activity, setActivity] = useState(baseActivity)
  const [newActivityId, setNewActivityId] = useState(null)
  const [chartAnimKey, setChartAnimKey] = useState(0)
  const liveIdx = useRef(0)

  /* Live activity feed — adds a new event every 5s */
  useEffect(() => {
    const interval = setInterval(() => {
      const event = liveEvents[liveIdx.current % liveEvents.length]
      liveIdx.current++
      const newItem = { ...event, id: Date.now() }
      setNewActivityId(newItem.id)
      setActivity(prev => [newItem, ...prev.slice(0, 8)])
      setTimeout(() => setNewActivityId(null), 600)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  /* Animate chart on timeframe change */
  const handleTimeframe = (tf) => {
    setTimeframe(tf)
    setChartAnimKey(k => k + 1)
  }

  const chart = chartData[timeframe]

  const pageHeaders = {
    overview: { title: 'Dashboard Overview', sub: 'Your product at a glance — updated in real time' },
    analytics: { title: 'Analytics', sub: 'Deep dive into engagement, retention, and growth' },
    users: { title: 'User Management', sub: 'Manage accounts, plans, and user activity' },
    revenue: { title: 'Revenue', sub: 'MRR, churn, LTV, and revenue trends' },
    reports: { title: 'Reports', sub: 'Scheduled reports and data exports' },
    settings: { title: 'Settings', sub: 'Account, billing, and integration settings' },
  }

  return (
    <div className="dash-root">
      {/* Sidebar */}
      <aside className={`dash-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="dash-sidebar-top">
          <Link to="/" className="dash-logo">
            <LogoIcon height={48} />
            <span className="dash-logo-text">BaseBox</span>
          </Link>
          <button className="dash-sidebar-close" onClick={() => setSidebarOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="dash-nav-section">
          <div className="dash-nav-label">Main</div>
          {navItems.slice(0, 5).map(({ label, path, icon }) => (
            <button
              key={path}
              className={`dash-nav-item${activeNav === path ? ' active' : ''}`}
              onClick={() => { setActiveNav(path); setSidebarOpen(false) }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{icon}</svg>
              {label}
              {path === 'users' && <span className="dash-nav-badge">23</span>}
            </button>
          ))}
        </div>

        <div className="dash-nav-section">
          <div className="dash-nav-label">Account</div>
          <button
            className={`dash-nav-item${activeNav === 'settings' ? ' active' : ''}`}
            onClick={() => setActiveNav('settings')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{navItems[5].icon}</svg>
            Settings
          </button>
          <Link to="/" className="dash-nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to Site
          </Link>
        </div>

        <div className="dash-user-card">
          <div className="dash-user-avatar">AK</div>
          <div className="dash-user-info">
            <div className="dash-user-name">Alex Kim</div>
            <div className="dash-user-email">alex@startup.io</div>
          </div>
          <div className="dash-user-plan">Pro</div>
        </div>
      </aside>

      {/* Main */}
      <div className="dash-main">
        {/* Topbar */}
        <div className="dash-topbar">
          <div className="dash-topbar-left">
            <button className="dash-menu-btn" onClick={() => setSidebarOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="dash-breadcrumb">
              <span>Dashboard</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              <span className="dash-breadcrumb-active">{pageHeaders[activeNav]?.title ?? 'Overview'}</span>
            </div>
          </div>
          <div className="dash-topbar-right">
            <div className="dash-search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              <input placeholder="Search users, reports…" />
            </div>
            <div style={{ position: 'relative' }}>
              <button className="dash-icon-btn" onClick={() => setNotifOpen(!notifOpen)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg>
                <span className="dash-notif-dot" />
              </button>
              {notifOpen && (
                <div className="dash-notif-panel">
                  <div className="dash-notif-header">
                    Notifications
                    <span className="dash-notif-live-badge">Live</span>
                  </div>
                  {activity.slice(0, 4).map((a) => (
                    <div key={a.id} className={`dash-notif-item${a.id === newActivityId ? ' new' : ''}`}>
                      <div className="dash-notif-dot-item" style={{ background: a.dot }} />
                      <div>
                        <div className="dash-notif-text">{a.text}</div>
                        <div className="dash-notif-time">{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="dash-avatar-btn">AK</div>
          </div>
        </div>

        {/* Content */}
        <div className="dash-content">
          {/* Page header */}
          <div className="dash-page-header">
            <div>
              <h1 className="dash-page-title">{pageHeaders[activeNav]?.title}</h1>
              <div className="dash-page-sub">{pageHeaders[activeNav]?.sub}</div>
            </div>
            <div className="dash-page-actions">
              <div className="dash-timeframe">
                {['24h', '7d', '30d', '90d'].map(tf => (
                  <button
                    key={tf}
                    className={`dash-tf-btn${timeframe === tf ? ' active' : ''}`}
                    onClick={() => handleTimeframe(tf)}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <button className="btn btn-g" style={{ fontSize: '13px', padding: '9px 18px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 12l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
            </div>
          </div>

          {/* ── Overview tab ── */}
          {activeNav === 'overview' && (
            <>
              {/* KPI Stats */}
              <div className="dash-stat-grid">
                <AnimatedStat
                  label="Total Users" value={12481} delta="↑ 23% this week"
                  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>}
                />
                <AnimatedStat
                  label="Monthly Revenue" value={48320} prefix="$" delta="↑ 18% MoM" color="var(--emerald)"
                  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>}
                />
                <AnimatedStat
                  label="Active Plans" value={847} delta="32 upgrades today" color="var(--indigo)"
                  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
                />
                <AnimatedStat
                  label="Churn Rate" value={11} suffix="%" delta="↓ 0.3% improvement" color="var(--amber)"
                  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>}
                />
              </div>

              {/* Chart + Activity */}
              <div className="dash-middle-grid">
                {/* Animated chart */}
                <div className="dash-chart-card">
                  <div className="dash-chart-header">
                    <div>
                      <div className="dash-chart-title">User Growth</div>
                      <div className="dash-chart-sub">New signups — {timeframe} view</div>
                    </div>
                    <div className="dash-chart-legend">
                      <div className="dash-legend-item">
                        <div className="dash-legend-dot" style={{ background: 'var(--indigo)' }} />
                        <span>Users</span>
                      </div>
                      <div className="dash-legend-item">
                        <div className="dash-legend-dot" style={{ background: 'var(--sky)' }} />
                        <span>Trials</span>
                      </div>
                    </div>
                  </div>
                  <div className="dash-chart-area">
                    <svg
                      key={chartAnimKey}
                      viewBox="0 0 800 180"
                      preserveAspectRatio="none"
                      style={{ width: '100%', height: '160px' }}
                      className="dash-chart-svg"
                    >
                      <defs>
                        <linearGradient id="dg1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(91,91,214,.18)" />
                          <stop offset="100%" stopColor="rgba(91,91,214,0)" />
                        </linearGradient>
                        <linearGradient id="dg2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(14,165,233,.12)" />
                          <stop offset="100%" stopColor="rgba(14,165,233,0)" />
                        </linearGradient>
                      </defs>
                      {[40, 80, 120, 160].map(y => (
                        <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(15,23,42,.04)" strokeWidth="1" />
                      ))}
                      <path className="dash-chart-fill" fill="url(#dg1)" d={chart.userFill} />
                      <path className="dash-chart-line" fill="none" stroke="#5B5BD6" strokeWidth="2.5" strokeLinecap="round" d={chart.userPath} />
                      <path className="dash-chart-fill" fill="url(#dg2)" d={chart.trialFill} />
                      <path fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6,3" strokeLinecap="round" d={chart.trialPath} />
                      <circle cx={chart.dot.cx} cy={chart.dot.cy} r="5" fill="#5B5BD6" stroke="white" strokeWidth="2.5" />
                      <rect x={chart.dot.cx - 44} y={chart.dot.cy - 24} width="88" height="22" rx="4" fill="#5B5BD6" />
                      <text x={chart.dot.cx} y={chart.dot.cy - 9} textAnchor="middle" fill="white" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="600">{chart.label}</text>
                    </svg>
                    <div className="dash-chart-labels">
                      {chart.labels.map(d => <span key={d}>{d}</span>)}
                    </div>
                  </div>
                </div>

                {/* Live activity feed */}
                <div className="dash-activity-card">
                  <div className="dash-activity-header">
                    <div className="dash-chart-title">
                      Recent Activity
                      <span className="dash-live-pill">
                        <span className="dash-live-dot" />
                        Live
                      </span>
                    </div>
                    <button className="dash-link-btn">View all</button>
                  </div>
                  <div className="dash-activity-list">
                    {activity.slice(0, 7).map((item) => (
                      <div
                        key={item.id}
                        className={`dash-activity-item${item.id === newActivityId ? ' new-item' : ''}`}
                      >
                        <div className="dash-activity-dot" style={{ background: item.dot }} />
                        <div className="dash-activity-body">
                          <div className="dash-activity-text">{item.text}</div>
                          <div className="dash-activity-time">{item.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Users table */}
              <div className="dash-table-card">
                <div className="dash-table-header">
                  <div>
                    <div className="dash-chart-title">Users</div>
                    <div className="dash-chart-sub">All registered accounts and their current status</div>
                  </div>
                  <div className="dash-table-actions">
                    <div className="dash-search" style={{ width: '200px' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                      <input placeholder="Search users…" />
                    </div>
                    <button className="btn btn-o" style={{ fontSize: '12px', padding: '8px 14px' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="12" y1="18" x2="12" y2="18" /></svg>
                      Filter
                    </button>
                    <button className="btn btn-g" style={{ fontSize: '12px', padding: '8px 14px' }}>+ Invite User</button>
                  </div>
                </div>
                <div className="dash-table-wrap">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>User</th><th>Plan</th><th>Status</th><th>Joined</th><th>MRR</th><th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.email} className="dash-table-row">
                          <td>
                            <div className="dash-user-cell">
                              <div className="dash-cell-avatar">{u.name[0]}</div>
                              <div>
                                <div className="dash-cell-name">{u.name}</div>
                                <div className="dash-cell-email">{u.email}</div>
                              </div>
                            </div>
                          </td>
                          <td><span className="dash-plan-badge">{u.plan}</span></td>
                          <td><span className={`dash-status-badge dash-status-${u.status}`}>{u.status}</span></td>
                          <td className="dash-cell-muted">{u.joined}</td>
                          <td className="dash-cell-mrr">{u.mrr}</td>
                          <td><button className="dash-row-action">•••</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="dash-table-footer">
                  <span>Showing 6 of 12,481 users</span>
                  <div className="dash-pagination">
                    <button className="dash-page-btn">← Prev</button>
                    <button className="dash-page-btn active">1</button>
                    <button className="dash-page-btn">2</button>
                    <button className="dash-page-btn">3</button>
                    <button className="dash-page-btn">Next →</button>
                  </div>
                </div>
              </div>

              {/* Quick actions + Revenue mini */}
              <div className="dash-bottom-grid">
                <div className="dash-quick-actions">
                  <div className="dash-chart-title" style={{ marginBottom: '16px' }}>Quick Actions</div>
                  {[
                    { icon: '✉️', label: 'Send announcement', desc: 'Email all active users' },
                    { icon: '📊', label: 'Generate report', desc: 'Weekly summary PDF' },
                    { icon: '🔑', label: 'Rotate API key', desc: 'Generate new credentials' },
                    { icon: '🎯', label: 'Create segment', desc: 'Filter users by criteria' },
                  ].map((action) => (
                    <button key={action.label} className="dash-quick-action-btn">
                      <span className="dash-qa-icon">{action.icon}</span>
                      <div>
                        <div className="dash-qa-label">{action.label}</div>
                        <div className="dash-qa-desc">{action.desc}</div>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                  ))}
                </div>
                <div className="dash-revenue-card">
                  <div className="dash-chart-title" style={{ marginBottom: '4px' }}>Revenue Breakdown</div>
                  <div className="dash-chart-sub" style={{ marginBottom: '20px' }}>MRR by plan tier</div>
                  {[
                    { label: 'Team ($99)', value: 76, amount: '$18,612', color: 'var(--indigo)' },
                    { label: 'Pro ($49)', value: 58, amount: '$21,462', color: 'var(--sky)' },
                    { label: 'Starter ($29)', value: 28, amount: '$8,265', color: 'var(--emerald)' },
                  ].map((item) => (
                    <div key={item.label} className="dash-rev-row">
                      <div className="dash-rev-label">{item.label}</div>
                      <div className="dash-rev-bar-wrap">
                        <div className="dash-rev-bar" style={{ width: `${item.value}%`, background: item.color }} />
                      </div>
                      <div className="dash-rev-amount">{item.amount}</div>
                    </div>
                  ))}
                  <div className="dash-rev-total">
                    <span>Total MRR</span>
                    <span className="dash-rev-total-val">$48,339</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Analytics tab ── */}
          {activeNav === 'analytics' && <AnalyticsView />}

          {/* ── Revenue tab ── */}
          {activeNav === 'revenue' && <RevenueView />}

          {/* ── Users tab ── */}
          {activeNav === 'users' && (
            <div className="dash-table-card">
              <div className="dash-table-header">
                <div>
                  <div className="dash-chart-title">All Users</div>
                  <div className="dash-chart-sub">12,481 total accounts across all plans</div>
                </div>
                <div className="dash-table-actions">
                  <button className="btn btn-g" style={{ fontSize: '12px', padding: '8px 14px' }}>+ Invite User</button>
                </div>
              </div>
              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr><th>User</th><th>Plan</th><th>Status</th><th>Joined</th><th>MRR</th><th></th></tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.email} className="dash-table-row">
                        <td>
                          <div className="dash-user-cell">
                            <div className="dash-cell-avatar">{u.name[0]}</div>
                            <div>
                              <div className="dash-cell-name">{u.name}</div>
                              <div className="dash-cell-email">{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td><span className="dash-plan-badge">{u.plan}</span></td>
                        <td><span className={`dash-status-badge dash-status-${u.status}`}>{u.status}</span></td>
                        <td className="dash-cell-muted">{u.joined}</td>
                        <td className="dash-cell-mrr">{u.mrr}</td>
                        <td><button className="dash-row-action">•••</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Reports tab ── */}
          {activeNav === 'reports' && (
            <div className="dash-reports-grid">
              {[
                { title: 'Weekly Summary', desc: 'Auto-generated every Monday', status: 'Delivered', date: 'Apr 1', icon: '📊' },
                { title: 'MRR Report', desc: 'Monthly revenue breakdown', status: 'Scheduled', date: 'Apr 30', icon: '💰' },
                { title: 'Churn Analysis', desc: 'Users who cancelled this month', status: 'Delivered', date: 'Mar 31', icon: '📉' },
                { title: 'User Cohorts', desc: 'Retention by signup month', status: 'Processing', date: 'Apr 6', icon: '🔬' },
              ].map((r) => (
                <div key={r.title} className="dash-report-card">
                  <div className="dash-qa-icon">{r.icon}</div>
                  <div className="dash-report-title">{r.title}</div>
                  <div className="dash-report-desc">{r.desc}</div>
                  <div className="dash-report-footer">
                    <span className={`dash-status-badge dash-status-${r.status === 'Delivered' ? 'active' : r.status === 'Scheduled' ? 'trial' : 'processing'}`}>{r.status}</span>
                    <span className="dash-cell-muted">{r.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Settings tab ── */}
          {activeNav === 'settings' && <SettingsView />}
        </div>
      </div>
    </div>
  )
}
