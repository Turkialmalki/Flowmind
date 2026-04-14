import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function Counter({ target, suffix = '', prefix = '', decimals = 0, duration = 1600 }) {
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          const startTime = performance.now()
          const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = eased * target
            setValue(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current))
            if (progress < 1) requestAnimationFrame(tick)
            else setValue(target)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.7 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started, target, decimals, duration])

  const display = decimals > 0 ? value.toFixed(decimals) : value.toLocaleString()
  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  )
}

const metrics = [
  {
    counter: <Counter target={847} suffix="+" />,
    label: 'Founders launched',
    sub: 'and growing every week',
    color: 'var(--indigo)',
    bg: 'var(--indigo-g)',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    counter: <Counter target={4.9} suffix="★" decimals={1} />,
    label: 'Average rating',
    sub: 'from verified buyers',
    color: 'var(--amber)',
    bg: 'rgba(217,119,6,0.08)',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ),
  },
  {
    counter: <Counter target={3450} prefix="$" suffix="+" />,
    label: 'Avg saved per project',
    sub: 'vs hiring a designer',
    color: 'var(--emerald)',
    bg: 'var(--emerald-bg)',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" />
      </svg>
    ),
  },
  {
    counter: (
      <>
        <span style={{ fontSize: '0.6em', marginRight: '2px', fontWeight: 700 }}>{'<'}</span>
        <Counter target={60} suffix=" min" />
      </>
    ),
    label: 'Average launch time',
    sub: 'from purchase to live',
    color: 'var(--sky)',
    bg: 'var(--sky-g)',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
]

const LIVE_EVENTS = [
  { icon: '🚀', text: 'nova-saas.io just launched with FlowMind' },
  { icon: '💰', text: 'ai-invoice.co hit $2K MRR today' },
  { icon: '⭐', text: 'New 5-star review from @JoshBuildsSaaS' },
  { icon: '🎯', text: '3 new signups in the last 5 minutes' },
  { icon: '🚀', text: 'pitch-deck.io went live in 47 minutes' },
  { icon: '💰', text: 'quickdemo.ai closed their first paying user' },
]

export default function MetricsWow() {
  const sectionRef = useRef(null)
  const liveIdx = useRef(0)
  const [liveBadge, setLiveBadge] = useState({ text: LIVE_EVENTS[0].icon + ' ' + LIVE_EVENTS[0].text, visible: false })

  useEffect(() => {
    let iv = null

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          iv = setInterval(() => {
            liveIdx.current = (liveIdx.current + 1) % LIVE_EVENTS.length
            const ev = LIVE_EVENTS[liveIdx.current]
            setLiveBadge({ text: ev.icon + ' ' + ev.text, visible: true })
            setTimeout(() => setLiveBadge(prev => ({ ...prev, visible: false })), 3200)
          }, 5500)
        } else {
          if (iv) { clearInterval(iv); iv = null }
          setLiveBadge(prev => ({ ...prev, visible: false }))
        }
      },
      { threshold: 0.25 }
    )

    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => { obs.disconnect(); if (iv) clearInterval(iv) }
  }, [])

  return (
    <section className="section wow-section" id="metrics" ref={sectionRef} style={{ position: 'relative' }}>
      <div className="container">
        <div className="fh an-scale">
          <div className="eyebrow">Real Results</div>
          <h2 className="st">
            Numbers from founders<br /><span>who already shipped</span>
          </h2>
          <p className="sd">
            These aren't projections. They're outcomes from real founders who used FlowMind
            to get their AI products in front of users — fast.
          </p>
        </div>

        <div className="wow-metrics">
          {metrics.map((m, i) => (
            <div
              className="wow-card an-scale"
              key={i}
              style={{ '--accent': m.color, '--accent-bg': m.bg }}
            >
              <div className="wow-icon" style={{ background: m.bg, color: m.color }}>
                {m.icon}
              </div>
              <div className="wow-num">{m.counter}</div>
              <div className="wow-label">{m.label}</div>
              <div className="wow-sub">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Before / After visual */}
        <div className="wow-compare an-scale">
          <div className="wow-compare-title">Time from idea to live site</div>
          <div className="wow-bar-row">
            <div className="wow-bar-label without">Without FlowMind</div>
            <div className="wow-bar-track">
              <div className="wow-bar-fill without" />
            </div>
            <div className="wow-bar-time without">6–8 weeks</div>
          </div>
          <div className="wow-bar-row">
            <div className="wow-bar-label with">With FlowMind</div>
            <div className="wow-bar-track">
              <div className="wow-bar-fill with" />
            </div>
            <div className="wow-bar-time with">60 minutes</div>
          </div>
          <div className="wow-compare-note">
            Launch price still active —{' '}
            <Link to="/pricing">get FlowMind for $49 today</Link>
          </div>
        </div>
      </div>

      {/* Live activity badge */}
      <div className={`wow-live-badge${liveBadge.visible ? ' wow-live-on' : ''}`}>
        <div className="wow-live-dot" />
        {liveBadge.text}
      </div>
    </section>
  )
}
