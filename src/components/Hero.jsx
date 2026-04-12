import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Linear interpolation — the core of inertia smoothing
function lerp(a, b, t) { return a + (b - a) * t }

// Smoothstep — maps scroll y in [start, end] to a curved 0→1 value.
// Slow at both ends, fastest in the middle (true ease-in-out feel).
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
  const mockRef    = useRef(null)
  const badge1Ref  = useRef(null)
  const card1Ref   = useRef(null)
  const card2Ref   = useRef(null)
  const card3Ref   = useRef(null)
  const chartRef       = useRef(null)
  const premiumCardRef = useRef(null)

  const [chartPeriod, setChartPeriod] = useState('7d')
  const [chartKey, setChartKey] = useState(0)

  useEffect(() => {
    // Inertial smooth-Y — lerps toward real scroll each frame.
    // Factor 0.08 = heavy damping → buttery, never mechanical.
    let sy = window.scrollY
    let raf

    function tick() {
      // Pull toward real scroll position — inertia smoothing
      sy = lerp(sy, window.scrollY, 0.08)

      // ── Background image ──
      // Fades out + slow parallax up + slight scale shrink
      const bgP  = smoothstep(sy, 0, 800)
      const bgTY = -(sy * 0.06)                   // parallax up: 0 → ~-48px
      const bgSc = 1.05 - bgP * 0.05              // scale: 1.05 → 1.0
      if (bgRef.current) {
        bgRef.current.style.opacity   = (1 - bgP).toFixed(4)
        bgRef.current.style.transform = `translate3d(0,${bgTY.toFixed(2)}px,0) scale(${bgSc.toFixed(4)})`
      }

      // ── Gradient overlay ──
      // Fades IN as background fades OUT — prevents hard visual cutoff.
      // Starts near-invisible (0.06), rises to full (1.0) as bg disappears.
      if (overlayRef.current) {
        overlayRef.current.style.opacity = Math.min(1, 0.06 + bgP * 0.94).toFixed(4)
      }

      // ── Text content ──
      // Slightly delayed start, gentle lift upward while fading
      const textP = smoothstep(sy, 80, 560)
      if (contentRef.current) {
        contentRef.current.style.opacity   = Math.max(0, 1 - textP).toFixed(4)
        contentRef.current.style.transform = `translate3d(0,${(-(textP * 16)).toFixed(2)}px,0)`
      }

      // ── Product mockup ──
      // Perspective tilt flattens, scale shrinks, opacity fades — longer range for overlap
      const mockP = smoothstep(sy, 0, 900)
      const mTY   = sy * 0.11                     // parallax down (slower than content)
      const mSc   = Math.max(0.88, 1 - mockP * 0.12)
      const mOp   = Math.max(0.25, 1 - mockP * 0.8)
      const mRX   = Math.max(0, 10 * (1 - mockP)) // tilt: 10deg → 0deg
      if (mockRef.current) {
        mockRef.current.style.opacity   = mOp.toFixed(4)
        mockRef.current.style.transform = `perspective(1100px) translate3d(0,${mTY.toFixed(2)}px,0) scale(${mSc.toFixed(4)}) rotateX(${mRX.toFixed(2)}deg)`
      }

      // ── Float badges — counter-parallax (lighter offset) ──
      if (badge1Ref.current) {
        badge1Ref.current.style.transform = `translate3d(0,${(-sy * 0.072).toFixed(2)}px,0)`
      }
      // ── Depth cards — micro-parallax at different speeds ──
      if (card1Ref.current)  card1Ref.current.style.transform  = `translate3d(0,${(-sy * 0.05).toFixed(2)}px,0)`
      if (card2Ref.current)  card2Ref.current.style.transform  = `translate3d(0,${(-sy * 0.028).toFixed(2)}px,0)`
      if (card3Ref.current)  card3Ref.current.style.transform  = `translate3d(0,${(-sy * 0.065).toFixed(2)}px,0)`
      if (chartRef.current)  chartRef.current.style.transform  = `translate3d(0,${(-sy * 0.015).toFixed(2)}px,0)`

      // ── Premium floating card — float (±10px) + tilt (±3deg) + parallax ──
      // All motion computed in RAF: sin wave gives natural ease-in-out, no CSS keyframe conflict
      if (premiumCardRef.current) {
        const tNow    = performance.now() / 1000
        const phase   = tNow * (Math.PI * 2 / 5)          // 5 s period
        const floatY  = Math.sin(phase) * 10               // ±10 px vertical float
        const tiltDeg = Math.sin(phase) * 3                // ±3 deg tilt, in-phase
        const pY      = -sy * 0.085 + floatY               // parallax faster than content
        premiumCardRef.current.style.transform =
          `translate3d(0,${pY.toFixed(2)}px,0) rotate(${tiltDeg.toFixed(2)}deg)`
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const handlePeriodSwitch = (p) => {
    if (p === chartPeriod) return
    setChartPeriod(p)
    setChartKey((k) => k + 1)
  }

  const cd = PERIOD_DATA[chartPeriod]

  return (
    <section className="hero hero-img">
      {/* Cinematic background — fades, parallaxes, and scales via RAF loop */}
      <div
        ref={bgRef}
        className="hero-bg-image"
        style={{ willChange: 'opacity, transform' }}
      />
      {/* Gradient overlay — fades IN as background fades OUT (dual-layer system) */}
      <div
        ref={overlayRef}
        className="hero-bg-overlay"
        style={{ opacity: 0.06, willChange: 'opacity' }}
      />

      <div className="container">
        <div className="hero-flex">
        {/* Text content — RAF-driven lift + fade */}
        <div
          ref={contentRef}
          className="hc"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="hp">
            <span className="hp-dot" />
            Full SaaS System&nbsp;•&nbsp;Not Just a Template
          </div>

          <h1>
            <span className="h1-line-1">A Complete AI SaaS System</span>
            <span className="h1-line-2">Ready to Launch in Minutes</span>
          </h1>

          <p className="hsub">
            Landing page, dashboard, auth, and CMS — all structured and ready inside Framer.
          </p>

          <div className="ha">
            <Link to="/pricing" className="btn btn-g btn-xl hero-cta-primary">
              Get BaseBox Now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="h-micro-trust">
            No subscription · Instant access · Lifetime updates
          </div>
        </div>

        {/* Product mockup wrapper */}
        <div className="hd-wrap">
          <div
            className="hd"
            id="preview"
            ref={mockRef}
            style={{ transformOrigin: 'top center', willChange: 'transform, opacity' }}
          >
            {/* Premium floating product card — RAF-driven float + tilt + parallax */}
            <div
              ref={premiumCardRef}
              className="hero-premium-card"
              style={{ willChange: 'transform' }}
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
              <div className="hpc-sub">Response Accuracy</div>

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

            {/* Float badge 1 — counter-parallax up */}
            <div
              ref={badge1Ref}
              style={{
                position: 'absolute', top: '56px', right: '-20px', zIndex: 2,
                willChange: 'transform',
              }}
            >
              <div className="fl" style={{ position: 'relative', top: 'auto', right: 'auto', bottom: 'auto', left: 'auto', animation: 'float 5s ease-in-out infinite' }}>
                <div className="flr">
                  <div className="fli" style={{ background: 'var(--emerald-bg)', color: 'var(--emerald)' }}>✓</div>
                  <div>
                    <div className="flt">Dashboard Included</div>
                    <div className="fls">Charts, metrics, activity</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating depth card */}
            <div className="hero-float-card">
              <div className="hero-float-card-dot" style={{ background: '#059669' }} />
              <span>12 users joined this week</span>
            </div>

            <div className="dw">
              <div className="db">
                <div className="dd"><div /><div /><div /></div>
                <div className="du">your-ai-startup.com/dashboard</div>
                <div style={{ width: '50px' }} />
              </div>

              <div className="dby">
                {/* Each stat card at a different depth speed — micro-parallax */}
                <div ref={card1Ref} className="ds" style={{ willChange: 'transform' }}>
                  <div className="dsl">Active Users</div>
                  <div className="dsv">12.4K</div>
                  <div className="dsc" key={chartPeriod}>{cd.delta}</div>
                </div>

                <div ref={card2Ref} className="ds" style={{ willChange: 'transform' }}>
                  <div className="dsl">Conversion Rate</div>
                  <div className="dsv">4.8%</div>
                  <div className="dsc">↑ 1.2% vs avg</div>
                </div>

                <div ref={card3Ref} className="ds" style={{ willChange: 'transform' }}>
                  <div className="dsl">MRR</div>
                  <div className="dsv">$48K</div>
                  <div className="dsc">↑ Growing fast</div>
                </div>

                {/* Chart — slowest layer */}
                <div ref={chartRef} className="dch" style={{ willChange: 'transform' }}>
                  <div className="dchh">
                    <div className="dcht">User Growth</div>
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
