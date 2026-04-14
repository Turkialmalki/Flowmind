import { useRef, useState, useEffect, Fragment } from 'react'

// ── Icons ──────────────────────────────────────────────────────────────────
const CalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8"  y1="2" x2="8"  y2="6"/>
    <line x1="3"  y1="10" x2="21" y2="10"/>
  </svg>
)

const SparkIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
)

const CalSyncIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8"  y1="2" x2="8"  y2="6"/>
    <line x1="3"  y1="10" x2="21" y2="10"/>
    <polyline points="8 14 10.5 16.5 16 12"/>
  </svg>
)

const SlackIcon = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/>
    <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/>
    <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/>
    <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/>
    <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
    <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/>
    <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>
  </svg>
)

const DoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
)

// ── Pipeline steps ─────────────────────────────────────────────────────────
const STEPS = [
  {
    id:        'trigger',
    sublabel:  'Trigger',
    label:     'New Meeting Booked',
    status:    'Trigger received…',
    icon:      <CalIcon />,
    isGreen:   false,
  },
  {
    id:        'ai',
    sublabel:  'Processing',
    label:     'AI Analyzes Request',
    status:    'AI analyzing request…',
    icon:      <SparkIcon />,
    isGreen:   false,
  },
  {
    id:        'calendar',
    sublabel:  'Integration',
    label:     'Sync with Google Calendar',
    status:    'Syncing with Google Calendar…',
    icon:      <CalSyncIcon />,
    highlight: true,
    isGreen:   false,
  },
  {
    id:        'slack',
    sublabel:  'Action',
    label:     'Send Slack Notification',
    status:    'Sending Slack notification…',
    icon:      <SlackIcon />,
    isGreen:   false,
  },
  {
    id:        'done',
    sublabel:  'Complete',
    label:     'Workflow Completed',
    status:    'Workflow completed ✓',
    icon:      <DoneIcon />,
    isGreen:   true,
  },
]

const STEP_MS = 1200   // ms each step stays active
const METRICS = [
  { n: '847K',  l: 'Workflows today' },
  { n: '1.2s',  l: 'Avg. completion' },
  { n: '99.9%', l: 'Uptime' },
  { n: '12+',   l: 'Integrations' },
]

// ── Component ──────────────────────────────────────────────────────────────
export default function AutomationPipeline() {
  const [activeStep, setActiveStep] = useState(-1)
  const [visible,    setVisible]    = useState(false)
  const sectionRef = useRef(null)

  // Scroll-reveal — fires once when ≥12% of section enters viewport
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Short delay before animation kicks off (lets reveal animation play first)
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setActiveStep(0), 700)
    return () => clearTimeout(t)
  }, [visible])

  // Cycle steps
  useEffect(() => {
    if (activeStep < 0) return
    const t = setTimeout(() => setActiveStep(s => (s + 1) % STEPS.length), STEP_MS)
    return () => clearTimeout(t)
  }, [activeStep])

  const statusText = activeStep >= 0 ? STEPS[activeStep].status : 'Initializing…'

  return (
    <section
      ref={sectionRef}
      className={`ap-section${visible ? ' ap-visible' : ''}`}
      aria-label="Automation Pipeline"
    >
      {/* Ambient radial glows */}
      <div className="ap-bg-glow" aria-hidden="true" />

      <div className="container ap-container">

        {/* ── Section header ── */}
        <div className="ap-header">
          <div className="ap-pill">
            <span className="ap-pill-dot" />
            Automation Pipeline
          </div>
          <h2 className="ap-title">
            Watch your workflow<br />run in real time
          </h2>
          <p className="ap-subtitle">
            FlowMind orchestrates complex multi-step processes across your
            entire tool stack — automatically, every time.
          </p>
        </div>

        {/* ── Pipeline card ── */}
        <div className="ap-pipeline-wrap">

          {/* LIVE badge */}
          <div className="ap-live-badge">
            <span className="ap-live-dot" />
            <span className="ap-live-word">LIVE</span>
            <span className="ap-live-sub">Running automation</span>
          </div>

          {/* Nodes + connectors */}
          <div className="ap-pipeline">
            {STEPS.map((step, i) => (
              <Fragment key={step.id}>

                {/* ── Node ── */}
                <div className="ap-pipeline-node">
                  <div
                    className={[
                      'ap-node',
                      activeStep === i        ? 'ap-node-active' : '',
                      activeStep > i          ? 'ap-node-done'   : '',
                      step.highlight          ? 'ap-node-hl'     : '',
                      step.isGreen            ? 'ap-node-green'  : '',
                    ].filter(Boolean).join(' ')}
                  >
                    {/* Pulsing rings — only animate when .ap-node-active */}
                    <div className="ap-ring"  aria-hidden="true" />
                    <div className="ap-ring ap-ring2" aria-hidden="true" />

                    {/* Glass card */}
                    <div className="ap-node-card">
                      <div className="ap-node-icon">{step.icon}</div>
                    </div>
                  </div>

                  {/* Label block */}
                  <div className="ap-node-labels">
                    <span className="ap-node-type">{step.sublabel}</span>
                    <span className="ap-node-name">{step.label}</span>
                  </div>
                </div>

                {/* ── Connector (not after last node) ── */}
                {i < STEPS.length - 1 && (
                  <div className="ap-segment">
                    <div className="ap-line-track">
                      <div className="ap-line-base" />
                      <div className="ap-line-flow" />
                      {/* Two offset particles per segment */}
                      <span className="ap-dot" style={{ '--d': '0s',     '--s': '2s'   }} />
                      <span className="ap-dot" style={{ '--d': '-1s',    '--s': '2s'   }} />
                    </div>
                  </div>
                )}

              </Fragment>
            ))}
          </div>

          {/* ── Status text ── */}
          <div className="ap-status-row">
            <span className="ap-status-orb" />
            {/* key change re-mounts element → CSS fade-in fires each change */}
            <span key={statusText} className="ap-status-txt">{statusText}</span>
          </div>

        </div>{/* /ap-pipeline-wrap */}

        {/* ── Metrics row ── */}
        <div className="ap-metrics">
          {METRICS.map(({ n, l }, i) => (
            <div key={l} className="ap-metric-item">
              {i > 0 && <div className="ap-metric-sep" />}
              <div className="ap-metric-col">
                <div className="ap-metric-num">{n}</div>
                <div className="ap-metric-lbl">{l}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
