import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Linear interpolation — the core of inertia smoothing
function lerp(a, b, t) { return a + (b - a) * t }

// Smoothstep — maps scroll y in [start, end] to a curved 0→1 value.
function smoothstep(y, start, end) {
  const t = Math.min(1, Math.max(0, (y - start) / (end - start)))
  return t * t * (3 - 2 * t)
}

const PERIOD_DATA = {
  '24h': {
    fill: 'M0,92 C60,86 120,78 180,70 C240,62 290,68 350,58 C410,48 460,36 520,28 C580,20 635,26 695,17 C748,10 778,12 800,10 L800,130 L0,130Z',
    stroke: 'M0,92 C60,86 120,78 180,70 C240,62 290,68 350,58 C410,48 460,36 520,28 C580,20 635,26 695,17 C748,10 778,12 800,10',
    dot: { cx: 520, cy: 28 },
    delta: '↑ 4.2% today',
  },
  '7d': {
    fill: 'M0,105 C50,95 100,80 160,70 C220,60 280,75 340,60 C400,45 450,30 500,23 C560,16 620,30 680,20 C740,13 780,17 800,14 L800,130 L0,130Z',
    stroke: 'M0,105 C50,95 100,80 160,70 C220,60 280,75 340,60 C400,45 450,30 500,23 C560,16 620,30 680,20 C740,13 780,17 800,14',
    dot: { cx: 500, cy: 23 },
    delta: '↑ 23% this week',
  },
  '30d': {
    fill: 'M0,120 C80,112 160,102 250,90 C330,78 400,64 480,50 C545,38 615,27 695,18 C750,12 782,11 800,10 L800,130 L0,130Z',
    stroke: 'M0,120 C80,112 160,102 250,90 C330,78 400,64 480,50 C545,38 615,27 695,18 C750,12 782,11 800,10',
    dot: { cx: 695, cy: 18 },
    delta: '↑ 48% this month',
  },
}

export default function Hero() {
  // Refs for RAF-driven direct DOM animation (no React re-renders per frame)
  const bgRef      = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const hdWrapRef  = useRef(null)   // scroll parallax wrapper
  const mockRef    = useRef(null)   // dashboard — rotation only
  const card1Ref   = useRef(null)
  const card2Ref   = useRef(null)
  const card3Ref   = useRef(null)
  const chartRef       = useRef(null)
  const premiumCardRef = useRef(null)
  const heroCard3Ref   = useRef(null)
  const heroRef        = useRef(null)
  const spotlightRef   = useRef(null)
  const workflowRef    = useRef(null)

  // ── MOUSE PARALLAX STATE ──
  const mouseNX = useRef(0)   // raw normalized mouse X: -1 → +1
  const mouseNY = useRef(0)   // raw normalized mouse Y: -1 → +1

  // ── 3-TIER CASCADING LERP — creates organic micro-delay between layers ──
  // Layer 1: dashboard (fastest — reacts first)
  const mxL = useRef(0)
  const myL = useRef(0)
  // Layer 2: stat cards (~30ms lag behind dashboard)
  const mxC = useRef(0)
  const myC = useRef(0)
  // Layer 3: floating premium cards (~60ms total lag)
  const mxF = useRef(0)
  const myF = useRef(0)

  const mouseActive    = useRef(false)
  const spotlightAlpha = useRef(0)
  // Idle breathing scale for dashboard when mouse is still
  const breatheS = useRef(1)

  // ── Hover lift state ──
  const premHover = useRef(false);  const premHY = useRef(0);  const premHS = useRef(1)
  const urcHover  = useRef(false);  const urcHY  = useRef(0);  const urcHS  = useRef(1)
  const ds1Hover  = useRef(false);  const ds1HY  = useRef(0);  const ds1HS  = useRef(1)
  const ds2Hover  = useRef(false);  const ds2HY  = useRef(0);  const ds2HS  = useRef(1)
  const ds3Hover  = useRef(false);  const ds3HY  = useRef(0);  const ds3HS  = useRef(1)
  const wfHover   = useRef(false);  const wfHY   = useRef(0);  const wfHS   = useRef(1)

  const [chartPeriod, setChartPeriod] = useState('7d')
  const [chartKey, setChartKey] = useState(0)

  useEffect(() => {
    let sy = window.scrollY
    let raf

    function tick() {
      sy = lerp(sy, window.scrollY, 0.08)
      const tNow = performance.now() / 1000

      // ── Hover lift — lerped spring feel ──
      premHY.current = lerp(premHY.current, premHover.current ? -10 : 0, 0.12)
      premHS.current = lerp(premHS.current, premHover.current ? 1.04 : 1, 0.12)
      urcHY.current  = lerp(urcHY.current,  urcHover.current  ? -10 : 0, 0.12)
      urcHS.current  = lerp(urcHS.current,  urcHover.current  ? 1.04 : 1, 0.12)
      ds1HY.current  = lerp(ds1HY.current,  ds1Hover.current  ? -10 : 0, 0.12)
      ds1HS.current  = lerp(ds1HS.current,  ds1Hover.current  ? 1.04 : 1, 0.12)
      ds2HY.current  = lerp(ds2HY.current,  ds2Hover.current  ? -10 : 0, 0.12)
      ds2HS.current  = lerp(ds2HS.current,  ds2Hover.current  ? 1.04 : 1, 0.12)
      ds3HY.current  = lerp(ds3HY.current,  ds3Hover.current  ? -10 : 0, 0.12)
      ds3HS.current  = lerp(ds3HS.current,  ds3Hover.current  ? 1.04 : 1, 0.12)
      wfHY.current   = lerp(wfHY.current,   wfHover.current   ? -8  : 0, 0.12)
      wfHS.current   = lerp(wfHS.current,   wfHover.current   ? 1.03: 1, 0.12)

      // ── CASCADING LERP — 3-tier micro-delay depth system ──
      // Dashboard responds first, then cards follow, then floating cards follow cards.
      // Each tier lerps toward the PREVIOUS tier (not raw mouse) = cascaded lag.
      mxL.current = lerp(mxL.current, mouseNX.current, 0.10)  // L1: fast
      myL.current = lerp(myL.current, mouseNY.current, 0.10)
      mxC.current = lerp(mxC.current, mxL.current,     0.075) // L2: ~30ms lag
      myC.current = lerp(myC.current, myL.current,     0.075)
      mxF.current = lerp(mxF.current, mxC.current,     0.065) // L3: ~60ms lag
      myF.current = lerp(myF.current, myC.current,     0.065)

      const mx = mxL.current  // dashboard-speed
      const my = myL.current
      const cx = mxC.current  // card-speed
      const cy = myC.current
      const fx = mxF.current  // float-speed (slowest)
      const fy = myF.current

      // ── Cursor spotlight — premium interactive surface glow ──
      spotlightAlpha.current = lerp(spotlightAlpha.current, mouseActive.current ? 1 : 0, 0.09)
      if (spotlightRef.current) {
        const sxPct = ((mx + 1) * 50).toFixed(1)
        const syPct = ((my + 1) * 50).toFixed(1)
        spotlightRef.current.style.opacity = spotlightAlpha.current.toFixed(3)
        spotlightRef.current.style.background =
          `radial-gradient(circle 500px at ${sxPct}% ${syPct}%, rgba(108,92,231,0.18) 0%, rgba(91,91,214,0.07) 40%, transparent 70%)`
      }

      // ── Background image — fade + parallax + Ken Burns zoom ──
      const bgP  = smoothstep(sy, 0, 800)
      const bgTY = -(sy * 0.06)
      const bgSc = 1.02 + bgP * 0.02
      if (bgRef.current) {
        bgRef.current.style.opacity   = (1 - bgP).toFixed(4)
        bgRef.current.style.transform = `translate3d(0,${bgTY.toFixed(2)}px,0) scale(${bgSc.toFixed(4)})`
      }

      // ── Gradient overlay — fades IN as bg fades OUT ──
      if (overlayRef.current) {
        overlayRef.current.style.opacity = Math.min(1, 0.06 + bgP * 0.94).toFixed(4)
      }

      // ── Text content — fade + subtle opposite-direction parallax ──
      const textP = smoothstep(sy, 0, 500)
      if (contentRef.current) {
        contentRef.current.style.opacity   = Math.max(0, 1 - textP).toFixed(4)
        contentRef.current.style.transform =
          `translate3d(${(mx * -5).toFixed(2)}px,${(-(textP * 20)).toFixed(2)}px,0)`
      }

      // ── Dashboard wrapper — scroll parallax only ──
      if (hdWrapRef.current) {
        hdWrapRef.current.style.transform = `translateY(${(sy * 0.15).toFixed(2)}px)`
      }

      // ── DASHBOARD — ROTATION + IDLE BREATHING SCALE ──
      // Pure rotation creates the 3D plane. Small translate adds a natural pan feel.
      // Rotation increased to 11/12deg (was 7/9) for more obvious depth.
      // breatheS: 1.0 → 1.006 when idle, snaps to 1.0 when mouse is active.
      const breatheTarget = mouseActive.current
        ? 1
        : 1 + Math.sin(tNow * 0.38) * 0.006
      breatheS.current = lerp(breatheS.current, breatheTarget, 0.025)

      if (mockRef.current) {
        mockRef.current.style.transform =
          `perspective(1000px) rotateX(${(my * -11).toFixed(2)}deg) rotateY(${(mx * 12).toFixed(2)}deg) translate3d(${(mx * 4).toFixed(2)}px,${(my * 3).toFixed(2)}px,0) scale(${breatheS.current.toFixed(4)})`
      }

      // ── IDLE FLOAT — stat cards breathe at different rates when mouse is still ──
      // Async phases + different amplitudes = organic, never lockstep.
      const idle1 = Math.sin(tNow * 0.75 + 0.0) * 3.5   // ~8.4s period, ±3.5px
      const idle2 = Math.sin(tNow * 0.62 + 1.1) * 4.5   // ~10.1s period, ±4.5px
      const idle3 = Math.sin(tNow * 0.88 + 2.3) * 2.5   // ~7.1s period, ±2.5px

      // ── DEPTH CARD SYSTEM — TRUE LAYER SEPARATION ──
      // Cards use cx/cy (Layer 2 — follows dashboard with ~30ms delay).
      // Multiplier hierarchy creates clear depth stack:
      //   card1: 0.6x base  → middle ground
      //   card2: 0.8x base  → closer to viewer
      //   card3: OPPOSITE X → strongest depth cue (counter-motion = clear parallax)
      // chart: background element, barely moves
      if (card1Ref.current) {
        card1Ref.current.style.transform =
          `translate3d(${(cx * 8).toFixed(2)}px,${(-sy*0.050 + idle1 + ds1HY.current + cy * 5).toFixed(2)}px,0) scale(${ds1HS.current.toFixed(4)})`
      }
      if (card2Ref.current) {
        card2Ref.current.style.transform =
          `translate3d(${(cx * 11).toFixed(2)}px,${(-sy*0.028 + idle2 + ds2HY.current + cy * 7).toFixed(2)}px,0) scale(${ds2HS.current.toFixed(4)})`
      }
      if (card3Ref.current) {
        // Negative X: moves OPPOSITE to mouse direction — the signature depth pop
        card3Ref.current.style.transform =
          `translate3d(${(cx * -16).toFixed(2)}px,${(-sy*0.065 + idle3 + ds3HY.current + cy * 4).toFixed(2)}px,0) scale(${ds3HS.current.toFixed(4)})`
      }
      if (chartRef.current) {
        chartRef.current.style.transform =
          `translate3d(${(cx * 3).toFixed(2)}px,${(-sy * 0.015).toFixed(2)}px,0)`
      }

      // ── PREMIUM FLOATING CARD — foreground (slowest: fx/fy) ──
      // floatSlow: 6s / ±14px. Uses fx/fy = trails furthest behind mouse.
      if (premiumCardRef.current) {
        const phase    = tNow * (Math.PI * 2 / 6)
        const floatAmt = Math.sin(phase) * 14
        const tiltDeg  = Math.sin(phase) * 2.5
        const pY       = -sy * 0.085 + floatAmt + premHY.current + fy * 11
        premiumCardRef.current.style.transform =
          `translate3d(${(fx * 20).toFixed(2)}px,${pY.toFixed(2)}px,0) rotate(${tiltDeg.toFixed(2)}deg) scale(${premHS.current.toFixed(4)})`
      }

      // ── UPPER-RIGHT CARD — mid-foreground (slowest: fx/fy) ──
      // floatFast: 5s / ±8px, offset phase for async motion.
      if (heroCard3Ref.current) {
        const phase3 = tNow * (Math.PI * 2 / 5) + Math.PI * 0.55
        const float3 = Math.sin(phase3) * 8
        const tilt3  = Math.sin(phase3) * 1.5
        const pY3    = -sy * 0.04 + float3 + urcHY.current + fy * 8
        heroCard3Ref.current.style.transform =
          `translate3d(${(fx * 15).toFixed(2)}px,${pY3.toFixed(2)}px,0) rotate(${tilt3.toFixed(2)}deg) scale(${urcHS.current.toFixed(4)})`
      }

      // ── WORKFLOW DIAGRAM CARD — bottom-left, counter-direction from premium card ──
      if (workflowRef.current) {
        const phaseWf = tNow * (Math.PI * 2 / 7.5) + Math.PI * 0.25
        const floatWf = Math.sin(phaseWf) * 6
        const tiltWf  = Math.sin(phaseWf) * 1.2
        const wfY     = -sy * 0.05 + floatWf + wfHY.current + fy * 9
        workflowRef.current.style.transform =
          `translate3d(${(fx * -16).toFixed(2)}px,${wfY.toFixed(2)}px,0) rotate(${tiltWf.toFixed(2)}deg) scale(${wfHS.current.toFixed(4)})`
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Mouse move — normalized coords: -1 to +1 on each axis
  const handleHeroMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseActive.current = true
    mouseNX.current = ((e.clientX - rect.left)  / rect.width  - 0.5) * 2
    mouseNY.current = ((e.clientY - rect.top)   / rect.height - 0.5) * 2
  }

  const handlePeriodSwitch = (p) => {
    if (p === chartPeriod) return
    setChartPeriod(p)
    setChartKey((k) => k + 1)
  }

  const cd = PERIOD_DATA[chartPeriod]

  return (
    <section
      className="hero hero-img"
      ref={heroRef}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={() => { mouseNX.current = 0; mouseNY.current = 0; mouseActive.current = false }}
    >
      {/* Cinematic background */}
      <div
        ref={bgRef}
        className="hero-bg-image"
        style={{ willChange: 'opacity, transform' }}
      />
      {/* Gradient overlay */}
      <div
        ref={overlayRef}
        className="hero-bg-overlay"
        style={{ opacity: 0.06, willChange: 'opacity' }}
      />

      <div className="container">
        <div className="hero-flex">
        {/* Text content */}
        <div
          ref={contentRef}
          className="hc"
          style={{ willChange: 'transform, opacity' }}
        >
          <h1>
            <span className="h1-line-1">AI Automation SaaS</span>
            <span className="h1-line-2">In Days, Not Months</span>
          </h1>

          <p className="hsub">
            The complete template for AI founders — workflow dashboard,
            AI demo, auth, integrations, and every conversion page. Zero design required.
          </p>

          <div className="ha">
            <Link to="/pricing" className="btn btn-g btn-xl hero-cta-primary">
              Get Template
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <p className="h-micro-trust">One-time payment · Lifetime updates · Full source code</p>

        </div>

        {/* Product mockup wrapper — scroll parallax */}
        <div className="hd-wrap" ref={hdWrapRef} style={{ willChange: 'transform' }}>
          <div
            className="hd"
            id="preview"
            ref={mockRef}
            style={{ transformOrigin: 'center center', willChange: 'transform' }}
          >
            {/* Cursor spotlight */}
            <div
              ref={spotlightRef}
              className="hd-spotlight"
              style={{ willChange: 'background, opacity', opacity: 0 }}
            />

            {/* Upper-right floating card — AI assistant chat */}
            <div
              ref={heroCard3Ref}
              className="hero-upper-right-card"
              style={{ willChange: 'transform' }}
              onMouseEnter={() => { urcHover.current = true }}
              onMouseLeave={() => { urcHover.current = false }}
            >
              <div className="hurc-chat-header">
                <div className="hurc-chat-avatar">AI</div>
                <span className="hurc-chat-name">FlowMind AI</span>
                <div className="hpc-live" />
              </div>
              <div className="hurc-chat-messages">
                <div className="hurc-chat-bubble hurc-user">Which workflows need attention?</div>
                <div className="hurc-chat-bubble hurc-ai">4 underperforming. Efficiency +18% if optimized.</div>
              </div>
            </div>

            {/* Premium floating card — most foreground */}
            <div
              ref={premiumCardRef}
              className="hero-premium-card"
              style={{ willChange: 'transform' }}
              onMouseEnter={() => { premHover.current = true }}
              onMouseLeave={() => { premHover.current = false }}
            >
              <div className="hpc-header">
                <div className="hpc-icon">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <span className="hpc-label">AI Insights</span>
                <div className="hpc-live" />
              </div>

              <div className="hpc-metric">94.8%</div>
              <div className="hpc-sub">Automation Accuracy</div>

              <div className="hpc-spark">
                <svg viewBox="0 0 90 26" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="hpc-sg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(91,91,214,0.18)" />
                      <stop offset="100%" stopColor="rgba(91,91,214,0)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,22 C10,19 20,21 30,15 C40,9 50,10 60,6 L75,3 L75,26 L0,26Z"
                    fill="url(#hpc-sg)"
                  />
                  <polyline
                    points="0,22 10,19 20,21 30,15 40,9 50,10 60,6 75,3"
                    stroke="#5B5BD6"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>

              <div className="hpc-footer">
                <div className="hpc-foot-dot" />
                <span>1,240 requests today</span>
              </div>
            </div>

            {/* Floating depth card */}
            <div className="hero-float-card">
              <div className="hero-float-card-dot" style={{ background: '#059669' }} />
              <span>Last workflow triggered · 0.3s ago</span>
            </div>

            {/* Workflow diagram card — bottom-left, automation scenario */}
            <div
              ref={workflowRef}
              className="hero-workflow-card"
              style={{ willChange: 'transform' }}
              onMouseEnter={() => { wfHover.current = true }}
              onMouseLeave={() => { wfHover.current = false }}
            >
              <div className="hwf-header">
                <div className="hwf-live-dot" />
                <span className="hwf-title">Calendar Automation</span>
                <span className="hwf-badge">LIVE</span>
              </div>
              <div className="hwf-nodes">
                <div className="hwf-node">
                  <div className="hwf-node-icon">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <span className="hwf-node-label">New Meeting</span>
                </div>
                <span className="hwf-arrow">→</span>
                <div className="hwf-node">
                  <div className="hwf-node-icon">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                  </div>
                  <span className="hwf-node-label">AI Checks</span>
                </div>
                <span className="hwf-arrow">→</span>
                <div className="hwf-node hwf-active">
                  <div className="hwf-node-icon">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                  </div>
                  <span className="hwf-node-label">Sync Cal</span>
                </div>
                <span className="hwf-arrow">→</span>
                <div className="hwf-node">
                  <div className="hwf-node-icon">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <span className="hwf-node-label">Notify Slack</span>
                </div>
              </div>
              <div className="hwf-status">
                <div className="hwf-status-dot" />
                <span>Running now · step 3 of 4</span>
              </div>
            </div>

            <div className="dw">
              <div className="db">
                <div className="dd"><div /><div /><div /></div>
                <div className="du">your-ai-startup.com/dashboard</div>
                <div style={{ width: '50px' }} />
              </div>

              <div className="dby">
                <div ref={card1Ref} className="ds" style={{ willChange: 'transform' }}
                  onMouseEnter={() => { ds1Hover.current = true }}
                  onMouseLeave={() => { ds1Hover.current = false }}
                >
                  <div className="dsl">Workflows Run</div>
                  <div className="dsv">847K</div>
                  <div className="dsc" key={chartPeriod}>{cd.delta}</div>
                </div>

                <div ref={card2Ref} className="ds" style={{ willChange: 'transform' }}
                  onMouseEnter={() => { ds2Hover.current = true }}
                  onMouseLeave={() => { ds2Hover.current = false }}
                >
                  <div className="dsl">Automation Rate</div>
                  <div className="dsv">94.2%</div>
                  <div className="dsc">↑ 3.1% vs last week</div>
                </div>

                <div ref={card3Ref} className="ds" style={{ willChange: 'transform' }}
                  onMouseEnter={() => { ds3Hover.current = true }}
                  onMouseLeave={() => { ds3Hover.current = false }}
                >
                  <div className="dsl">AI Tasks</div>
                  <div className="dsv">1.2M</div>
                  <div className="dsc">↑ 3.4K today</div>
                </div>

                {/* Chart — background element, slowest parallax */}
                <div ref={chartRef} className="dch" style={{ willChange: 'transform' }}>
                  <div className="dchh">
                    <div className="dcht">Automation Runs</div>
                    <div className="dtb">
                      {['24h', '7d', '30d'].map((p) => (
                        <button
                          key={p}
                          className={chartPeriod === p ? 'on' : ''}
                          onClick={() => handlePeriodSwitch(p)}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                  <svg
                    style={{ width: '100%', height: '130px' }}
                    viewBox="0 0 800 130"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(91,91,214,.14)" />
                        <stop offset="100%" stopColor="rgba(91,91,214,0)" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="33" x2="800" y2="33" stroke="rgba(15,23,42,.05)" />
                    <line x1="0" y1="65" x2="800" y2="65" stroke="rgba(15,23,42,.05)" />
                    <line x1="0" y1="97" x2="800" y2="97" stroke="rgba(15,23,42,.05)" />

                    <path key={`fill-${chartKey}`} className="hero-chart-fill" fill="url(#cg)" d={cd.fill} />
                    <path
                      key={`stroke-${chartKey}`}
                      className="hero-chart-line"
                      pathLength="1"
                      fill="none"
                      stroke="#5B5BD6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      d={cd.stroke}
                    />
                    <circle
                      key={`dot-${chartKey}`}
                      className="hero-chart-dot"
                      cx={cd.dot.cx}
                      cy={cd.dot.cy}
                      r="4"
                      fill="#5B5BD6"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>{/* /hd-wrap */}
        </div>{/* /hero-flex */}
      </div>
    </section>
  )
}
