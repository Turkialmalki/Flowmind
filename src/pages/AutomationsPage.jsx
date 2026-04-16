import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// ── Scroll reveal hook ─────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

// ── Mini pipeline diagram ─────────────────────────────────────────────────
function MiniPipeline({ steps }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % steps.length), 1100)
    return () => clearInterval(t)
  }, [steps.length])

  return (
    <div className="aup-mini-pipe">
      {steps.map((step, i) => (
        <div key={i} className="aup-mini-row">
          {/* Node */}
          <div className={`aup-mini-node${active === i ? ' aup-mini-active' : ''}${active > i ? ' aup-mini-done' : ''}`}>
            <div className="aup-mini-icon" style={{ color: step.color }}>
              {step.icon}
            </div>
          </div>
          {/* Connector */}
          {i < steps.length - 1 && (
            <div className={`aup-mini-conn${active > i ? ' aup-mini-conn-lit' : ''}`}>
              <div className="aup-mini-conn-line" />
              <div className="aup-mini-conn-dot" />
            </div>
          )}
          {/* Label */}
          <div className="aup-mini-label">{step.label}</div>
        </div>
      ))}
    </div>
  )
}

// ── Workflow examples ─────────────────────────────────────────────────────
const WORKFLOWS = [
  {
    id: 'cal-sync',
    tag: 'Calendar Sync',
    title: 'Intelligent meeting scheduling',
    desc: 'When a lead fills out your form, FlowMind checks everyone\'s availability, picks the best slot, creates a Google Calendar event, and sends a personalized confirmation — all in under 2 seconds.',
    steps: [
      {
        label: 'Form submitted',
        color: '#5b5bd6',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
        ),
      },
      {
        label: 'AI finds open slot',
        color: '#7c3aed',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83"/>
          </svg>
        ),
      },
      {
        label: 'Calendar event created',
        color: '#4285f4',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/>
            <polyline points="8 14 10.5 16.5 16 12"/>
          </svg>
        ),
      },
      {
        label: 'Confirmation sent',
        color: '#059669',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
          </svg>
        ),
      },
    ],
    metrics: [{ v: '1.8s', l: 'avg. time to book' }, { v: '94%', l: 'show-up rate' }, { v: '0', l: 'manual steps' }],
    color: '#5b5bd6',
    bg: 'rgba(91,91,214,0.05)',
    border: 'rgba(91,91,214,0.12)',
  },
  {
    id: 'lead-routing',
    tag: 'Lead Routing',
    title: 'AI-powered lead scoring & handoff',
    desc: 'Every new lead gets scored by AI based on firmographics, behavior, and intent signals. High-value leads are instantly routed to the right sales rep with a full context brief in Slack.',
    steps: [
      {
        label: 'Lead enters CRM',
        color: '#ff7a59',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
          </svg>
        ),
      },
      {
        label: 'AI scores intent',
        color: '#7c3aed',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        ),
      },
      {
        label: 'Routes to best rep',
        color: '#5b5bd6',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        ),
      },
      {
        label: 'Slack brief sent',
        color: '#4a154b',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
        ),
      },
    ],
    metrics: [{ v: '3.2×', l: 'conversion lift' }, { v: '48s', l: 'avg. response time' }, { v: '100%', l: 'leads covered' }],
    color: '#ff7a59',
    bg: 'rgba(255,122,89,0.05)',
    border: 'rgba(255,122,89,0.12)',
  },
  {
    id: 'data-processing',
    tag: 'Data Processing',
    title: 'Automated data enrichment pipeline',
    desc: 'Raw data from your database, APIs, or uploads gets cleaned, enriched, and categorized by AI — then pushed to your warehouse, CRM, or email platform in structured format.',
    steps: [
      {
        label: 'Raw data ingested',
        color: '#0ea5e9',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
          </svg>
        ),
      },
      {
        label: 'AI cleans & tags',
        color: '#7c3aed',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4"/>
          </svg>
        ),
      },
      {
        label: 'Validated & enriched',
        color: '#5b5bd6',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        ),
      },
      {
        label: 'Pushed to warehouse',
        color: '#059669',
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        ),
      },
    ],
    metrics: [{ v: '1.2M', l: 'records/day' }, { v: '98.7%', l: 'accuracy rate' }, { v: '0.4s', l: 'per record' }],
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.05)',
    border: 'rgba(14,165,233,0.12)',
  },
]

// ── Workflow card ─────────────────────────────────────────────────────────
function WorkflowCard({ wf, index }) {
  const [ref, visible] = useReveal(0.1)
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`aup-wf-card an${visible ? ' v' : ''}`}
      style={{
        transitionDelay: `${index * 80}ms`,
        background: wf.bg,
        border: `1px solid ${wf.border}`,
      }}
    >
      <div className={`aup-wf-inner${isEven ? '' : ' aup-wf-inner-rev'}`}>

        {/* Text side */}
        <div className="aup-wf-text">
          <span className="aup-wf-tag" style={{ color: wf.color, background: `${wf.color}14`, border: `1px solid ${wf.color}22` }}>
            {wf.tag}
          </span>
          <h3 className="aup-wf-title">{wf.title}</h3>
          <p className="aup-wf-desc">{wf.desc}</p>

          <div className="aup-wf-metrics">
            {wf.metrics.map(({ v, l }) => (
              <div key={l} className="aup-wf-metric">
                <div className="aup-wf-metric-val" style={{ color: wf.color }}>{v}</div>
                <div className="aup-wf-metric-lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline diagram side */}
        <div className="aup-wf-diagram">
          <MiniPipeline steps={wf.steps} />
        </div>

      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function AutomationsPage() {
  const [heroRef, heroVisible] = useReveal()

  return (
    <div className="aup-page">

      {/* ── Hero ── */}
      <section className="aup-hero" ref={heroRef}>
        <div className="aup-hero-glow" aria-hidden="true" />
        <div className="container aup-hero-inner">
          <div className={`aup-eyebrow an${heroVisible ? ' v' : ''}`} style={{ transitionDelay: '0ms' }}>
            <span className="aup-eyebrow-dot" />
            Automations
          </div>
          <h1 className={`aup-title an${heroVisible ? ' v' : ''}`} style={{ transitionDelay: '80ms' }}>
            Build powerful<br /><span>AI automations</span>
          </h1>
          <p className={`aup-subtitle an${heroVisible ? ' v' : ''}`} style={{ transitionDelay: '160ms' }}>
            Stop doing repetitive work manually. FlowMind gives you a visual workflow builder
            backed by GPT-4 — so you can automate anything from lead routing to data pipelines.
          </p>

          <div className={`aup-hero-pills an${heroVisible ? ' v' : ''}`} style={{ transitionDelay: '240ms' }}>
            {['No code required', 'GPT-4 powered', 'Live in minutes', '50+ templates'].map(p => (
              <span key={p} className="aup-hero-pill">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Workflow examples ── */}
      <section className="aup-workflows-section">
        <div className="container">
          <div className="aup-section-header">
            <h2 className="aup-section-title">Real workflow examples</h2>
            <p className="aup-section-sub">
              Pre-built automation templates you can deploy with one click and customize for your stack.
            </p>
          </div>

          <div className="aup-workflows-list">
            {WORKFLOWS.map((wf, i) => (
              <WorkflowCard key={wf.id} wf={wf} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="aup-how-section">
        <div className="container aup-how-inner">
          <h2 className="aup-how-title">From zero to running in 3 steps</h2>
          <div className="aup-how-steps">
            {[
              {
                n: '01',
                title: 'Pick a trigger',
                desc: 'Choose from 50+ event types — form submissions, API calls, schedules, webhooks.',
                color: '#5b5bd6',
              },
              {
                n: '02',
                title: 'Add AI actions',
                desc: 'Drag in AI steps for scoring, summarizing, routing, writing, or classifying data.',
                color: '#7c3aed',
              },
              {
                n: '03',
                title: 'Connect & deploy',
                desc: 'Wire up your tools, test with live data, and go live — no infra to manage.',
                color: '#059669',
              },
            ].map(({ n, title, desc, color }) => (
              <div key={n} className="aup-how-step">
                <div className="aup-how-n" style={{ color, background: `${color}10`, border: `1px solid ${color}22` }}>{n}</div>
                <h3 className="aup-how-step-title">{title}</h3>
                <p className="aup-how-step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="aup-cta-section">
        <div className="container aup-cta-inner">
          <h2 className="aup-cta-title">Ready to automate?</h2>
          <p className="aup-cta-sub">Join 12,000+ teams running FlowMind automations today.</p>
          <div className="aup-cta-btns">
            <Link to="/signup" className="btn btn-g">Start Free Trial</Link>
            <Link to="/demo" className="btn btn-o">See Live Demo</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
