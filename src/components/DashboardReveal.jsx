import { useRef, useEffect, useState } from 'react'

const CHART_PTS = [
  [0,   168], [60,  157], [130, 143], [200, 128],
  [270, 136], [350, 115], [420,  99], [490,  84],
  [550,  69], [605,  55], [655,  43],
]
const MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
const VALUES = [18, 22, 26, 30, 28, 34, 38, 42, 45, 47, 48]

const LINE_PATH =
  'M0,168 C27,168 33,157 60,157' +
  ' C91.5,157 98.5,143 130,143' +
  ' C161.5,143 168.5,128 200,128' +
  ' C231.5,128 238.5,136 270,136' +
  ' C306,136 314,115 350,115' +
  ' C381.5,115 388.5,99 420,99' +
  ' C451.5,99 458.5,84 490,84' +
  ' C517,84 523,69 550,69' +
  ' C574.75,69 580.25,55 605,55' +
  ' C627.5,55 632.5,43 655,43'
const FILL_PATH = LINE_PATH + ' L655,180 L0,180 Z'

const SPARKS = [
  { s: 'M0,28 C10,22 22,18 32,13 C42,8 52,10 62,5 C66,3 69,2 72,0',  f: 'M0,28 C10,22 22,18 32,13 C42,8 52,10 62,5 C66,3 69,2 72,0 L72,32 L0,32Z' },
  { s: 'M0,26 C10,20 20,18 28,12 C38,6 48,9 58,4 C63,2 67,1 72,0',   f: 'M0,26 C10,20 20,18 28,12 C38,6 48,9 58,4 C63,2 67,1 72,0 L72,32 L0,32Z' },
  { s: 'M0,24 C10,20 18,22 28,15 C38,8 48,11 58,6 C63,4 67,3 72,1',  f: 'M0,24 C10,20 18,22 28,15 C38,8 48,11 58,6 C63,4 67,3 72,1 L72,32 L0,32Z' },
  { s: 'M0,30 C8,26 18,28 28,20 C38,12 48,14 58,8 C63,5 67,3 72,0',  f: 'M0,30 C8,26 18,28 28,20 C38,12 48,14 58,8 C63,5 67,3 72,0 L72,32 L0,32Z' },
]

const NAV_ITEMS = ['Overview', 'Analytics', 'Users', 'Revenue']

const YAXIS = [
  { y: 43,  label: '$48K' },
  { y: 90,  label: '$36K' },
  { y: 136, label: '$24K' },
]

const SIDEBAR_NAV = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    label: 'Overview', active: true,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    label: 'Analytics',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: 'Users',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    label: 'Revenue',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
      </svg>
    ),
    label: 'Reports',
  },
]

const SIDEBAR_BOTTOM = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
    label: 'Settings',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
      </svg>
    ),
    label: 'Help',
  },
]

export default function DashboardReveal() {
  const scrollZoneRef = useRef(null)
  const panelRef      = useRef(null)
  const svgRef        = useRef(null)
  const chartWrapRef  = useRef(null)
  const triggered     = useRef(false)
  const chartsShown   = useRef(false)
  const [counts, setCounts]         = useState({ mrr: 0, users: 0, conv: '0.0', churn: '0.0' })
  const [chartReady, setChartReady] = useState(false)
  const [tooltip, setTooltip]       = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading]       = useState(true)
  const [activeNav, setActiveNav]   = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  function animateCounts() {
    const targets = { mrr: 48, users: 12400, conv: 4.8, churn: 2.1 }
    const dur = 1600
    const t0  = performance.now()
    function step(now) {
      const p = Math.min(1, (now - t0) / dur)
      const e = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p
      setCounts({
        mrr:   Math.round(targets.mrr * e),
        users: Math.round(targets.users * e),
        conv:  (targets.conv * e).toFixed(1),
        churn: (targets.churn * e).toFixed(1),
      })
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  useEffect(() => {
    const zoneEl  = scrollZoneRef.current
    const panelEl = panelRef.current
    if (!zoneEl || !panelEl) return
    let raf
    function tick() {
      const rect     = zoneEl.getBoundingClientRect()
      const vh       = window.innerHeight
      const animDist = vh * 0.90
      const rel      = vh - rect.top
      const progress = Math.min(1, Math.max(0, rel / animDist))
      const eased    = 1 - Math.pow(1 - progress, 3)

      const scale   = 0.84 + eased * 0.16
      const ty      = (1 - eased) * 90
      const rotateX = (1 - eased) * 8

      panelEl.style.opacity   = eased.toFixed(4)
      panelEl.style.transform =
        `perspective(1200px) translateY(${ty.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) scale(${scale.toFixed(4)})`
      panelEl.style.boxShadow =
        `0 ${(eased * 40).toFixed(0)}px ${(eased * 80).toFixed(0)}px rgba(0,0,0,${(eased * 0.10).toFixed(3)}),` +
        `0 ${(eased * 8).toFixed(0)}px ${(eased * 24).toFixed(0)}px rgba(0,0,0,${(eased * 0.06).toFixed(3)})`

      if (!triggered.current && progress > 0.08) { triggered.current = true; animateCounts() }
      if (!chartsShown.current && progress > 0.45) {
        chartsShown.current = true
        panelEl.classList.add('sdr-charts-in')
        setChartReady(true)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const usersK = counts.users >= 1000
    ? `${(counts.users / 1000).toFixed(1)}K`
    : String(counts.users)

  const kpis = [
    { label: 'MRR',          val: `$${counts.mrr}K`, trend: '+22%',  up: true,  color: '#818cf8', spark: SPARKS[0] },
    { label: 'Active Users',  val: usersK,             trend: '+18%',  up: true,  color: '#34d399', spark: SPARKS[1] },
    { label: 'Conv. Rate',    val: `${counts.conv}%`,  trend: '+1.2%', up: true,  color: '#60a5fa', spark: SPARKS[2] },
    { label: 'Churn',         val: `${counts.churn}%`, trend: '-0.4%', up: false, color: '#f472b6', spark: SPARKS[3] },
  ]

  function handleSvgMove(e) {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const mx = ((e.clientX - rect.left) / rect.width) * 660
    let nearest = 0, minD = Infinity
    CHART_PTS.forEach((p, i) => {
      const d = Math.abs(p[0] - mx)
      if (d < minD) { minD = d; nearest = i }
    })
    const [px, py] = CHART_PTS[nearest]
    setTooltip({
      left: `${(px / 660) * 100}%`,
      top:  `${(py / 180) * 100}%`,
      val:  `$${VALUES[nearest]}K`,
      lbl:  `${MONTHS[nearest]} 2026`,
      ptX: px, ptY: py,
    })
  }

  function handleChartParallax(e) {
    const el = chartWrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top  + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width  / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    el.style.transform  = `perspective(1200px) rotateX(${(-dy * 1.2).toFixed(2)}deg) rotateY(${(dx * 1.8).toFixed(2)}deg)`
    el.style.transition = 'transform 0.12s ease-out, border-color 0.25s ease'
  }

  function handleChartLeave() {
    const el = chartWrapRef.current
    if (!el) return
    el.style.transition = 'transform 0.7s cubic-bezier(0.22,1,0.36,1), border-color 0.25s ease'
    el.style.transform  = ''
    setTooltip(null)
  }

  return (
    <div ref={scrollZoneRef} className="sdr-scroll-zone">
      <section className="section-dashboard-reveal">
        <div className="sdr-glow" aria-hidden="true" />

        <div ref={panelRef} className="ndb-panel"
          style={{ opacity: 0, willChange: 'transform, opacity, box-shadow' }}>

          {/* ── COLLAPSIBLE SIDEBAR ── */}
          <aside className={`ndb-sidebar${sidebarOpen ? '' : ' collapsed'}`}>
            <div className="ndb-sidebar-header">
              <div className="ndb-sidebar-brand">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3"  y="3"  width="8" height="8" rx="2.5" fill="#818cf8" />
                  <rect x="13" y="3"  width="8" height="8" rx="2.5" fill="#818cf8" opacity=".55" />
                  <rect x="3"  y="13" width="8" height="8" rx="2.5" fill="#818cf8" opacity=".30" />
                  <rect x="13" y="13" width="8" height="8" rx="2.5" fill="#818cf8" opacity=".15" />
                </svg>
                {sidebarOpen && <span className="ndb-sidebar-brand-name">BaseBox</span>}
              </div>
              <button
                className="ndb-sidebar-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  {sidebarOpen
                    ? <path d="M15 18l-6-6 6-6" />
                    : <path d="M9 18l6-6-6-6" />}
                </svg>
              </button>
            </div>

            <nav className="ndb-sidebar-nav">
              {SIDEBAR_NAV.map((item, i) => (
                <button
                  key={item.label}
                  className={`ndb-sidebar-item${item.active ? ' active' : ''}`}
                  data-tooltip={item.label}
                  onClick={() => {}}
                >
                  <span className="ndb-sidebar-icon">{item.icon}</span>
                  {sidebarOpen && <span className="ndb-sidebar-label">{item.label}</span>}
                </button>
              ))}
            </nav>

            <div className="ndb-sidebar-bottom">
              {SIDEBAR_BOTTOM.map((item) => (
                <button
                  key={item.label}
                  className="ndb-sidebar-item secondary"
                  data-tooltip={item.label}
                >
                  <span className="ndb-sidebar-icon">{item.icon}</span>
                  {sidebarOpen && <span className="ndb-sidebar-label">{item.label}</span>}
                </button>
              ))}
              <div className="ndb-sidebar-avatar-row">
                <div className="ndb-avatar-sm">TK</div>
                {sidebarOpen && (
                  <div className="ndb-sidebar-user-info">
                    <span className="ndb-sidebar-user-name">Turki K.</span>
                    <span className="ndb-sidebar-user-role">Admin</span>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <div className="ndb-main">

            {/* ── TOP NAV ── */}
            <header className="ndb-nav">
              <nav className="ndb-nav-links">
                {NAV_ITEMS.map((item, i) => (
                  <button
                    key={item}
                    className={`ndb-nav-link${activeNav === i ? ' active' : ''}`}
                    onClick={() => setActiveNav(i)}
                  >
                    {item}
                  </button>
                ))}
              </nav>

              <div className="ndb-nav-right">
                <div className="ndb-live-pill">
                  <span className="ndb-live-dot" />
                  Live
                </div>
                <button className="ndb-icon-btn" aria-label="Notifications">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  <span className="ndb-notif-dot" />
                </button>
                <div className="ndb-avatar">TK</div>
              </div>
            </header>

            {/* ── BODY ── */}
            <div className="ndb-body">

              {/* ── CHART HEADER ── */}
              <div className="ndb-chart-hd">
                <div className="ndb-chart-meta">
                  <span className="ndb-chart-label">Monthly Recurring Revenue</span>
                  <div className="ndb-chart-bignum">${counts.mrr}K</div>
                  <span className="ndb-chart-badge">↑ +22% vs last month</span>
                </div>
                <div className="ndb-chart-tabs">
                  {['7d', '30d', '90d'].map((t, i) => (
                    <button key={t} className={`ndb-tab${i === 1 ? ' on' : ''}`}>{t}</button>
                  ))}
                </div>
              </div>

              {/* ── HERO CHART ── */}
              {loading ? (
                <div className="ndb-skeleton-chart" />
              ) : (
                <div
                  ref={chartWrapRef}
                  className="ndb-chart-wrap"
                  onMouseMove={e => { if (chartReady) handleSvgMove(e); handleChartParallax(e); }}
                  onMouseLeave={handleChartLeave}
                >
                  <svg
                    ref={svgRef}
                    className="ndb-hero-svg"
                    viewBox="0 0 660 180"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="ndbFillG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="rgba(99,102,241,0.13)" />
                        <stop offset="65%"  stopColor="rgba(99,102,241,0.03)" />
                        <stop offset="100%" stopColor="rgba(99,102,241,0)" />
                      </linearGradient>
                      <linearGradient id="ndbLineG" x1="0" y1="0" x2="660" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%"   stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>

                    {[43, 90, 136].map(y => (
                      <line key={y} x1="0" y1={y} x2="660" y2={y}
                        stroke="rgba(0,0,0,0.05)" strokeWidth="1" strokeDasharray="4,8" />
                    ))}

                    {YAXIS.map(({ y, label }) => (
                      <text key={y} x="6" y={y - 5}
                        fill="rgba(107,114,128,0.5)" fontSize="8"
                        fontFamily="system-ui,sans-serif">{label}</text>
                    ))}

                    {MONTHS.map((m, i) => (
                      <text key={m}
                        x={CHART_PTS[i][0]} y={177}
                        fill="rgba(107,114,128,0.5)" fontSize="8.5"
                        fontFamily="system-ui,sans-serif"
                        textAnchor={i === 0 ? 'start' : i === MONTHS.length - 1 ? 'end' : 'middle'}
                      >{m}</text>
                    ))}

                    <path className="sdr-hero-fill" fill="url(#ndbFillG)" d={FILL_PATH} />

                    <path className="sdr-hero-glow-line" fill="none"
                      stroke="url(#ndbLineG)" strokeWidth="8" strokeLinecap="round"
                      pathLength="1" d={LINE_PATH}
                    />

                    <path className="sdr-hero-line" fill="none"
                      stroke="url(#ndbLineG)" strokeWidth="2" strokeLinecap="round"
                      pathLength="1" d={LINE_PATH}
                    />

                    <g className="sdr-hero-dot">
                      <line x1="655" y1="43" x2="655" y2="180"
                        stroke="rgba(99,102,241,0.10)" strokeWidth="1" strokeDasharray="3,4" />
                      <circle cx="655" cy="43" r="7" fill="rgba(99,102,241,0.10)" />
                      <circle cx="655" cy="43" r="3.5" fill="#6366f1"
                        stroke="#ffffff" strokeWidth="2.5" />
                    </g>

                    {tooltip && (
                      <g>
                        <line x1={tooltip.ptX} y1={tooltip.ptY} x2={tooltip.ptX} y2={180}
                          stroke="rgba(99,102,241,0.15)" strokeWidth="1" strokeDasharray="3,4" />
                        <circle cx={tooltip.ptX} cy={tooltip.ptY} r="10"
                          fill="rgba(99,102,241,0.08)" />
                        <circle cx={tooltip.ptX} cy={tooltip.ptY} r="4"
                          fill="#6366f1" stroke="#ffffff" strokeWidth="2.5" />
                      </g>
                    )}
                  </svg>

                  {tooltip && (
                    <div className="ndb-tooltip" style={{ left: tooltip.left, top: tooltip.top }}>
                      <div className="ndb-tt-val">{tooltip.val}</div>
                      <div className="ndb-tt-lbl">{tooltip.lbl}</div>
                    </div>
                  )}
                </div>
              )}

              {/* ── KPI ROW ── */}
              {loading ? (
                <div className="ndb-kpi-row">
                  {[0,1,2,3].map(i => (
                    <div key={i} className="ndb-skeleton-kpi" />
                  ))}
                </div>
              ) : (
                <div className="ndb-kpi-row">
                  {kpis.map(({ label, val, trend, up, color, spark }, idx) => (
                    <div key={label} className="ndb-kpi" style={{ '--kc': color }}>
                      <div className="ndb-kpi-top">
                        <div className="ndb-kpi-hdr">
                          <span className="ndb-kpi-dot" style={{ background: color }} />
                          <span className="ndb-kpi-label">{label}</span>
                        </div>
                        <span className="ndb-kpi-badge"
                          style={{ color, background: `${color}1a` }}>
                          {up ? '↑' : '↓'} {trend}
                        </span>
                      </div>
                      <div className="ndb-kpi-bottom">
                        <span className="ndb-kpi-val">{val}</span>
                        <div className="ndb-kpi-spark">
                          <svg viewBox="0 0 72 32" width="64" height="24"
                            preserveAspectRatio="none">
                            <defs>
                              <linearGradient id={`nkg${idx}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%"   stopColor={color} stopOpacity="0.28" />
                                <stop offset="100%" stopColor={color} stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            <path fill={`url(#nkg${idx})`} d={spark.f} className="sdr-spark-fill" />
                            <path fill="none" stroke={color} strokeWidth="2"
                              strokeLinecap="round" pathLength="1"
                              d={spark.s} className="sdr-spark-line" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
