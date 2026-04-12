import { useRef, useEffect, useState } from 'react'

function Icon({ d }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

const NAV = [
  { label: 'Overview',    d: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
  { label: 'Analytics',  d: 'M18 20V10M12 20V4M6 20v-6' },
  { label: 'Users',      d: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8' },
  { label: 'Revenue',    d: 'M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' },
  { label: 'AI Insights', d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
  { label: 'Settings',   d: 'M12 15a3 3 0 100-6 3 3 0 000 6zM12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' },
]

const FEED = [
  { color: '#10b981', bg: 'rgba(16,185,129,0.12)', text: 'New Pro signup',    sub: 'alex@startup.io',    time: '2m' },
  { color: '#5b5bd6', bg: 'rgba(91,91,214,0.12)',  text: 'API key generated', sub: 'Dashboard access',   time: '5m' },
  { color: '#0ea5e9', bg: 'rgba(14,165,233,0.12)', text: 'Report exported',   sub: 'Q4 Analytics PDF',   time: '9m' },
  { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', text: '$199 received',     sub: 'Annual plan upgrade', time: '14m' },
  { color: '#10b981', bg: 'rgba(16,185,129,0.12)', text: 'Integration live',  sub: 'Slack + GitHub',     time: '18m' },
]

// Mini sparkline paths for each KPI (viewBox 0 0 72 32)
const SPARKS = [
  { s: 'M0,28 C10,24 22,20 32,15 C42,10 52,12 62,7 C66,5 69,3 72,1',  f: 'M0,28 C10,24 22,20 32,15 C42,10 52,12 62,7 C66,5 69,3 72,1 L72,32 L0,32Z' },
  { s: 'M0,30 C10,26 20,22 28,15 C38,8 48,11 58,5 C63,2 67,1 72,0',   f: 'M0,30 C10,26 20,22 28,15 C38,8 48,11 58,5 C63,2 67,1 72,0 L72,32 L0,32Z' },
  { s: 'M0,26 C10,22 18,26 28,18 C38,10 48,14 58,8 C63,5 67,4 72,2',  f: 'M0,26 C10,22 18,26 28,18 C38,10 48,14 58,8 C63,5 67,4 72,2 L72,32 L0,32Z' },
  { s: 'M0,30 C12,27 22,24 32,21 C42,18 50,14 58,10 C63,8 66,6 72,4', f: 'M0,30 C12,27 22,24 32,21 C42,18 50,14 58,10 C63,8 66,6 72,4 L72,32 L0,32Z' },
]

export default function DashboardReveal() {
  const sectionRef  = useRef(null)
  const panelRef    = useRef(null)
  const triggered   = useRef(false)
  const chartsShown = useRef(false)
  const [counts, setCounts] = useState({ mrr: 0, users: 0, conv: '0.0', nps: 0 })

  function animateCounts() {
    const targets = { mrr: 48, users: 12400, conv: 4.8, nps: 94 }
    const dur = 1800
    const t0  = performance.now()
    function step(now) {
      const p = Math.min(1, (now - t0) / dur)
      const e = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p
      setCounts({
        mrr:   Math.round(targets.mrr * e),
        users: Math.round(targets.users * e),
        conv:  (targets.conv * e).toFixed(1),
        nps:   Math.round(targets.nps * e),
      })
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  useEffect(() => {
    const sectionEl = sectionRef.current
    const panelEl   = panelRef.current
    if (!sectionEl || !panelEl) return
    let raf
    function tick() {
      const rect     = sectionEl.getBoundingClientRect()
      const vh       = window.innerHeight
      const rel      = vh * 0.8 - rect.top
      const progress = Math.min(1, Math.max(0, rel / 520))
      const eased    = 1 - Math.pow(1 - progress, 3)
      const scale    = 0.82 + eased * 0.22
      const ty       = (1 - eased) * 90
      const rotateX  = (1 - eased) * 8
      panelEl.style.opacity   = eased.toFixed(4)
      panelEl.style.transform =
        `perspective(1200px) translateY(${ty.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) scale(${scale.toFixed(4)})`
      panelEl.style.boxShadow =
        `0 ${(eased*80).toFixed(0)}px ${(eased*220).toFixed(0)}px rgba(15,23,42,${(eased*0.22).toFixed(3)}),` +
        `0 ${(eased*24).toFixed(0)}px ${(eased*60).toFixed(0)}px rgba(91,91,214,${(eased*0.14).toFixed(3)}),` +
        `0 0 ${(eased*120).toFixed(0)}px rgba(91,91,214,${(eased*0.07).toFixed(3)})`
      if (!triggered.current && progress > 0.08) { triggered.current = true; animateCounts() }
      if (!chartsShown.current && progress > 0.45) { chartsShown.current = true; panelEl.classList.add('sdr-charts-in') }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const usersDisplay = counts.users >= 1000 ? `${(counts.users / 1000).toFixed(1)}K` : String(counts.users)

  const kpis = [
    { label: 'Monthly Revenue', val: `$${counts.mrr}K`, trend: '+22%',  color: '#5b5bd6', bg: 'rgba(91,91,214,0.09)',  spark: SPARKS[0] },
    { label: 'Active Users',    val: usersDisplay,       trend: '+18%',  color: '#10b981', bg: 'rgba(16,185,129,0.09)', spark: SPARKS[1] },
    { label: 'Conversion',      val: `${counts.conv}%`,  trend: '+1.2%', color: '#0ea5e9', bg: 'rgba(14,165,233,0.09)', spark: SPARKS[2] },
    { label: 'NPS Score',       val: String(counts.nps), trend: '+8pts', color: '#f59e0b', bg: 'rgba(245,158,11,0.09)', spark: SPARKS[3] },
  ]

  return (
    <section ref={sectionRef} className="section-dashboard-reveal">
      <div className="sdr-glow" aria-hidden="true" />

      <div ref={panelRef} className="sdr-panel" style={{ opacity: 0, willChange: 'transform, opacity, box-shadow' }}>

        {/* Browser chrome */}
        <div className="sdr-bar">
          <div className="sdr-dots"><div /><div /><div /></div>
          <div className="sdr-url">app.basebox.ai/dashboard</div>
          <div style={{ width: 50 }} />
        </div>

        {/* Dashboard layout */}
        <div className="sdr-body">

          {/* ── Dark sidebar ── */}
          <aside className="sdr-sidebar">
            <div className="sdr-brand">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3"  y="3"  width="8" height="8" rx="2" fill="#818cf8" />
                <rect x="13" y="3"  width="8" height="8" rx="2" fill="#818cf8" opacity=".65" />
                <rect x="3"  y="13" width="8" height="8" rx="2" fill="#818cf8" opacity=".40" />
                <rect x="13" y="13" width="8" height="8" rx="2" fill="#818cf8" opacity=".20" />
              </svg>
              <span>BaseBox</span>
            </div>

            <div className="sdr-nav-label">Main</div>
            {NAV.slice(0, 4).map((item, i) => (
              <div key={item.label} className={`sdr-nav-item${i === 0 ? ' active' : ''}`}>
                <span className="sdr-nav-icon"><Icon d={item.d} /></span>
                {item.label}
                {i === 0 && <div className="sdr-nav-ping" />}
              </div>
            ))}

            <div className="sdr-nav-label" style={{ marginTop: 6 }}>Tools</div>
            {NAV.slice(4).map(item => (
              <div key={item.label} className="sdr-nav-item">
                <span className="sdr-nav-icon"><Icon d={item.d} /></span>
                {item.label}
              </div>
            ))}

            <div className="sdr-sidebar-user">
              <div className="sdr-user-av">TK</div>
              <div>
                <div className="sdr-user-name">Turki K.</div>
                <div className="sdr-user-role">Admin</div>
              </div>
              <span className="sdr-user-more">⋯</span>
            </div>
          </aside>

          {/* ── Main content ── */}
          <main className="sdr-main">

            {/* Topbar */}
            <div className="sdr-topbar">
              <div>
                <div className="sdr-topbar-title">Overview</div>
                <div className="sdr-topbar-sub">Good morning — here's your snapshot</div>
              </div>
              <div className="sdr-topbar-right">
                <div className="sdr-live-badge"><div className="sdr-live-dot" />Live</div>
                <div className="sdr-range-pill">Last 30 days ▾</div>
                <div className="sdr-avatar-pill">TK</div>
              </div>
            </div>

            {/* KPI cards */}
            <div className="sdr-kpi-grid">
              {kpis.map(({ label, val, trend, color, bg, spark }, idx) => (
                <div key={label} className="sdr-kpi">
                  <div className="sdr-kpi-top">
                    <div className="sdr-kpi-label">{label}</div>
                    <div className="sdr-kpi-trend" style={{ color, background: bg }}>↑ {trend}</div>
                  </div>
                  <div className="sdr-kpi-val" style={{ color }}>{val}</div>
                  <div className="sdr-kpi-spark">
                    <svg viewBox="0 0 72 32" width="72" height="28" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`skg${idx}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
                          <stop offset="100%" stopColor={color} stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path fill={`url(#skg${idx})`} d={spark.f} className="sdr-spark-fill" />
                      <path fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"
                        pathLength="1" d={spark.s} className="sdr-spark-line" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart + Feed row */}
            <div className="sdr-bottom-row">

              {/* Revenue area chart */}
              <div className="sdr-chart-card">
                <div className="sdr-chart-hd">
                  <div>
                    <div className="sdr-chart-title">Revenue Growth</div>
                    <div className="sdr-chart-sub">$48K this month · record high ↑</div>
                  </div>
                  <div className="sdr-chart-tabs">
                    {['7d', '30d', '90d'].map((t, i) => (
                      <button key={t} className={`sdr-tab${i === 1 ? ' on' : ''}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <svg className="sdr-svg" viewBox="0 0 520 108" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="sdrMainG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(91,91,214,0.22)" />
                      <stop offset="100%" stopColor="rgba(91,91,214,0)" />
                    </linearGradient>
                  </defs>
                  {[22, 54, 86].map(y => (
                    <line key={y} x1="0" y1={y} x2="520" y2={y}
                      stroke="rgba(15,23,42,.05)" strokeWidth="1" />
                  ))}
                  <path className="sdr-chart-fill" fill="url(#sdrMainG)"
                    d="M0,100 C50,92 100,80 150,66 C200,52 250,57 300,42 C350,27 400,18 450,9 C480,3 500,2 520,1 L520,108 L0,108Z" />
                  <path className="sdr-chart-line" fill="none" stroke="#5b5bd6"
                    strokeWidth="2.5" strokeLinecap="round" pathLength="1"
                    d="M0,100 C50,92 100,80 150,66 C200,52 250,57 300,42 C350,27 400,18 450,9 C480,3 500,2 520,1" />
                  <circle className="sdr-chart-dot" cx="520" cy="1" r="4"
                    fill="#5b5bd6" stroke="white" strokeWidth="2" />
                  <g className="sdr-chart-dot">
                    <rect x="488" y="-15" width="44" height="16" rx="5" fill="#5b5bd6" />
                    <text x="510" y="-4" textAnchor="middle" fill="white"
                      fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">$48K</text>
                  </g>
                </svg>
              </div>

              {/* Live activity feed */}
              <div className="sdr-activity-card">
                <div className="sdr-chart-title">
                  Live Activity
                  <span className="sdr-feed-count">5 new</span>
                </div>
                {FEED.map((item, i) => (
                  <div key={i} className="sdr-activity-row">
                    <div className="sdr-act-av" style={{ background: item.bg, color: item.color }}>
                      {item.text.charAt(0)}
                    </div>
                    <div className="sdr-act-content">
                      <div className="sdr-act-text">{item.text}</div>
                      <div className="sdr-act-sub">{item.sub}</div>
                    </div>
                    <div className="sdr-act-time">{item.time}</div>
                  </div>
                ))}
              </div>

            </div>
          </main>
        </div>
      </div>
    </section>
  )
}
