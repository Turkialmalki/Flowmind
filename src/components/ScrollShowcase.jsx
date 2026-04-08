import { useRef, useState, useEffect } from 'react'
import { useScrollY } from '../hooks/useScrollY'

const STEPS = [
  {
    eyebrow: '01',
    title: 'Revenue tracked in real-time',
    desc: 'Watch MRR, churn, and growth update live. No more waiting for Monday\'s report or digging through spreadsheets.',
    highlight: 'metrics',
    stat: '$48K MRR',
    statChange: '↑ 12%',
    statColor: 'var(--emerald)',
  },
  {
    eyebrow: '02',
    title: 'Understand every user deeply',
    desc: 'Segment by plan, behavior, and risk score. See exactly who is about to churn — before they do.',
    highlight: 'chart',
    stat: '12.4K users',
    statChange: '↑ 23% this week',
    statColor: 'var(--indigo)',
  },
  {
    eyebrow: '03',
    title: 'Ship the full product in 60 min',
    desc: 'Every screen pre-built. Every flow connected. From purchase to live product faster than any meeting about it.',
    highlight: 'activity',
    stat: '60 minutes',
    statChange: 'vs 6–8 weeks',
    statColor: 'var(--sky)',
  },
]

export default function ScrollShowcase() {
  const sectionRef = useRef(null)
  const scrollY = useScrollY()
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const top = el.offsetTop
    const height = el.offsetHeight
    const vh = window.innerHeight
    // Activate first step as section enters, spread phases across scroll height
    const raw = (scrollY - top + vh * 0.2) / (height - vh * 0.6)
    const p = Math.max(0, Math.min(0.999, raw))
    setActiveStep(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)))
  }, [scrollY])

  const step = STEPS[activeStep]

  return (
    // Tall section so sticky panel has room to breathe while user scrolls
    <section ref={sectionRef} className="ss-outer">
      <div className="ss-sticky">
        <div className="container">
          <div className="ss-layout">

            {/* Left — step text transitions on scroll */}
            <div className="ss-left">
              <div className="fh" style={{ marginBottom: '48px', textAlign: 'left' }}>
                <div className="eyebrow">Product Depth</div>
                <h2 className="st">
                  Built for every stage<br /><span>of your SaaS</span>
                </h2>
              </div>

              {/* Step indicators */}
              <div className="ss-steps">
                {STEPS.map((s, i) => (
                  <div
                    key={i}
                    className={`ss-step${activeStep === i ? ' ss-step-active' : ''}`}
                  >
                    <div className="ss-step-num">{s.eyebrow}</div>
                    <div className="ss-step-body">
                      <div className="ss-step-title">{s.title}</div>
                      <div className="ss-step-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress dots */}
              <div className="ss-dots">
                {STEPS.map((_, i) => (
                  <div key={i} className={`ss-dot${activeStep === i ? ' active' : ''}`} />
                ))}
              </div>
            </div>

            {/* Right — sticky dashboard mockup */}
            <div className="ss-right">
              <div className={`ss-mock ss-mock-${step.highlight}`}>
                {/* Browser chrome */}
                <div className="ss-mock-chrome">
                  <div className="dd"><div /><div /><div /></div>
                  <div className="du">app.your-saas.com/dashboard</div>
                  <div style={{ width: '40px' }} />
                </div>

                {/* Dashboard content */}
                <div className="ss-mock-body">

                  {/* Stat cards row */}
                  <div className="ss-stat-row">
                    {[
                      { label: 'MRR', value: '$48K', delta: '↑ 12%', color: 'var(--emerald)' },
                      { label: 'Active Users', value: '12.4K', delta: '↑ 4.2%', color: 'var(--indigo)' },
                      { label: 'Churn Rate', value: '2.1%', delta: '↓ 0.3%', color: 'var(--sky)' },
                    ].map((stat, i) => (
                      <div className="ss-stat" key={i}>
                        <div className="ss-stat-label">{stat.label}</div>
                        <div className="ss-stat-value">{stat.value}</div>
                        <div className="ss-stat-delta" style={{ color: stat.color }}>{stat.delta}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart area */}
                  <div className="ss-chart-area">
                    <div className="ss-chart-label">User Growth</div>
                    <svg viewBox="0 0 500 80" preserveAspectRatio="none" style={{ width: '100%', height: '80px' }}>
                      <defs>
                        <linearGradient id="ss-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(91,91,214,.18)" />
                          <stop offset="100%" stopColor="rgba(91,91,214,0)" />
                        </linearGradient>
                      </defs>
                      <path
                        className={`ss-chart-fill${step.highlight === 'chart' ? ' ss-anim-fill' : ''}`}
                        fill="url(#ss-grad)"
                        d="M0,72 C60,62 120,48 180,38 C240,28 300,42 360,28 C420,14 470,10 500,8 L500,80 L0,80Z"
                      />
                      <path
                        key={`ss-line-${activeStep}`}
                        className={`ss-chart-line${step.highlight === 'chart' ? ' ss-anim-line' : ''}`}
                        pathLength="1"
                        fill="none"
                        stroke="#5B5BD6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        d="M0,72 C60,62 120,48 180,38 C240,28 300,42 360,28 C420,14 470,10 500,8"
                      />
                      <circle
                        key={`ss-dot-${activeStep}`}
                        className={`ss-chart-dot${step.highlight === 'chart' ? ' ss-anim-dot' : ''}`}
                        cx="360" cy="28" r="3.5" fill="#5B5BD6" stroke="white" strokeWidth="1.5"
                      />
                    </svg>
                  </div>

                  {/* Activity feed */}
                  <div className="ss-activity">
                    <div className="ss-activity-label">Live Activity</div>
                    {[
                      { dot: 'var(--emerald)', text: 'new_user@startup.io signed up — Pro plan' },
                      { dot: 'var(--indigo)', text: 'pitch-deck.ai upgraded to annual' },
                      { dot: 'var(--sky)', text: 'nova-saas.io hit $2K MRR milestone' },
                    ].map((item, i) => (
                      <div
                        className={`ss-activity-item${step.highlight === 'activity' ? ' ss-activity-active' : ''}`}
                        key={i}
                        style={{ animationDelay: `${i * 0.12}s` }}
                      >
                        <div className="ss-activity-dot" style={{ background: item.dot }} />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Stat callout — changes with active step */}
                <div className="ss-callout" key={activeStep}>
                  <div className="ss-callout-value" style={{ color: step.statColor }}>{step.stat}</div>
                  <div className="ss-callout-change">{step.statChange}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
