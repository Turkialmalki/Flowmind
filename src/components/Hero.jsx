import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollY } from '../hooks/useScrollY'

// Smoothstep easing — maps scrollY in [start, end] to a curved 0→1 value.
// Feels slow at both ends, fastest in the middle (ease-in-out).
function ease(y, start, end) {
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
  const heroRef = useRef(null)
  const mockRef = useRef(null)
  const scrollY = useScrollY()
  const [chartPeriod, setChartPeriod] = useState('7d')
  const [chartKey, setChartKey] = useState(0)

  // Background: eased fade over extended 750px range — slow start/end, no abrupt cut
  const bgP = ease(scrollY, 0, 750)
  const bgOpacity = 1 - bgP
  const bgScale = 1.05 - bgP * 0.05  // 1.05 → 1.0

  // Text: delayed start (80px), lifts 16px upward while fading — layered vs background
  const textP = ease(scrollY, 80, 560)
  const contentOpacity = Math.max(0, 1 - textP)
  const textLiftY = -(textP * 16)

  // Mockup: eased scale + tilt over longer range; raw parallax for crisp per-frame tracking
  const mockP = ease(scrollY, 0, 900)
  const mockParallaxY = scrollY * 0.18
  const mockScale = Math.max(0.88, 1 - mockP * 0.12)
  const mockOpacity = Math.max(0.25, 1 - mockP * 0.8)
  const mockRotateX = Math.max(0, 10 * (1 - mockP))

  // Float badges: lighter counter-parallax
  const floatOffset1 = scrollY * 0.16
  const floatOffset2 = scrollY * 0.28

  // Per-card micro-parallax (raw scroll = frame-accurate depth)
  const depth1 = -scrollY * 0.05
  const depth2 = -scrollY * 0.028
  const depth3 = -scrollY * 0.065
  const depthChart = -scrollY * 0.015

  const handlePeriodSwitch = (p) => {
    if (p === chartPeriod) return
    setChartPeriod(p)
    setChartKey((k) => k + 1)
  }

  const cd = PERIOD_DATA[chartPeriod]

  return (
    <section className="hero hero-dark" ref={heroRef}>
      {/* Cinematic full-screen background — fades and scales on scroll */}
      <div
        className="hero-bg-image"
        style={{
          opacity: bgOpacity,
          transform: `scale(${bgScale})`,
          willChange: 'opacity, transform',
        }}
      />
      {/* Gradient overlay — text readability + subtle bottom fade */}
      <div className="hero-bg-overlay" />

      <div className="container">
        {/* Text content — parallax + fade on scroll */}
        <div
          className="hc"
          style={{
            transform: `translateY(${textLiftY}px)`,
            opacity: contentOpacity,
            willChange: 'transform, opacity',
          }}
        >
          <div className="hp">
            <span className="hp-dot" />
            Full SaaS System&nbsp;•&nbsp;Not Just a Template
          </div>

          <h1>
            A Complete AI SaaS System<br />
            <span>Ready to Launch in Minutes</span>
          </h1>

          <p className="hsub">
            Landing page, dashboard, authentication, and CMS — everything structured
            and ready inside Framer.
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
          {/* Product mockup — perspective tilt, scale, and depth parallax on scroll */}
          <div
            className="hd"
            id="preview"
            ref={mockRef}
            style={{
              transform: `perspective(1100px) translateY(${mockParallaxY * 0.6}px) scale(${mockScale}) rotateX(${mockRotateX}deg)`,
              opacity: mockOpacity,
              transformOrigin: 'top center',
              willChange: 'transform, opacity',
            }}
          >
            {/* Float badge 1 */}
            <div
              style={{
                position: 'absolute', top: '56px', right: '-20px', zIndex: 2,
                transform: `translateY(${-floatOffset1 * 0.45}px)`,
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

            {/* Float badge 2 */}
            <div
              style={{
                position: 'absolute', bottom: '80px', left: '-16px', zIndex: 2,
                transform: `translateY(${floatOffset2 * 0.35}px)`,
                willChange: 'transform',
              }}
            >
              <div className="fl" style={{ position: 'relative', top: 'auto', right: 'auto', bottom: 'auto', left: 'auto', animation: 'float 5s ease-in-out 1.5s infinite' }}>
                <div className="flr">
                  <div className="fli" style={{ background: 'var(--indigo-g)', color: 'var(--indigo)' }}>10+</div>
                  <div>
                    <div className="flt">Full Screens</div>
                    <div className="fls">Landing to dashboard</div>
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
                {/* Each stat card moves at a different depth speed */}
                <div className="ds" style={{ transform: `translateY(${depth1}px)`, willChange: 'transform' }}>
                  <div className="dsl">Active Users</div>
                  <div className="dsv">12.4K</div>
                  <div className="dsc" key={chartPeriod}>{cd.delta}</div>
                </div>

                <div className="ds" style={{ transform: `translateY(${depth2}px)`, willChange: 'transform' }}>
                  <div className="dsl">Conversion Rate</div>
                  <div className="dsv">4.8%</div>
                  <div className="dsc">↑ 1.2% vs avg</div>
                </div>

                <div className="ds" style={{ transform: `translateY(${depth3}px)`, willChange: 'transform' }}>
                  <div className="dsl">MRR</div>
                  <div className="dsv">$48K</div>
                  <div className="dsc">↑ Growing fast</div>
                </div>

                {/* Chart — slowest layer (background) */}
                <div className="dch" style={{ transform: `translateY(${depthChart}px)`, willChange: 'transform' }}>
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
      </div>
    </section>
  )
}
