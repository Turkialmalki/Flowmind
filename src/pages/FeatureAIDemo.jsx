import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const CONVERSATIONS = [
  {
    user: 'What\'s my conversion rate this week and how does it compare to last month?',
    ai: 'Your conversion rate is 4.8% this week — up from 3.6% last month (+33%). Your highest-converting traffic source is organic search (6.2%). Want me to break down which landing page variants are driving this?',
  },
  {
    user: 'Which users are most likely to churn in the next 30 days?',
    ai: 'Identified 23 at-risk accounts based on engagement signals. Top indicators: no API calls in 7+ days, skipped last 2 check-ins, and downgraded feature usage. I\'ve ranked them by revenue risk. Shall I draft personalized re-engagement emails?',
  },
  {
    user: 'Summarize our MRR growth and forecast next quarter',
    ai: 'Current MRR: $48,320 (+18% MoM). At this growth rate, Q3 projection is $67K–$74K. Key drivers: Pro plan conversions (+42%), reduced churn (1.8% → 1.1%), and 3 new enterprise deals pending. Confidence interval: 85%.',
  },
]

function LiveChatDemo() {
  const [activeConv, setActiveConv] = useState(0)
  const [typed, setTyped] = useState('')
  const [typing, setTyping] = useState(false)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  const tickRef = useRef(null)

  const startTyping = (convIndex) => {
    if (tickRef.current) clearInterval(tickRef.current)
    setTyped('')
    setTyping(true)
    let i = 0
    const text = CONVERSATIONS[convIndex].ai
    tickRef.current = setInterval(() => {
      i++
      setTyped(text.slice(0, i))
      if (i >= text.length) { clearInterval(tickRef.current); setTyping(false) }
    }, 12)
  }

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) { setStarted(true); setTimeout(() => startTyping(0), 800) }
      },
      { threshold: 0.4 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => { obs.disconnect(); if (tickRef.current) clearInterval(tickRef.current) }
  }, [started])

  const switchConv = (i) => {
    setActiveConv(i)
    startTyping(i)
  }

  return (
    <div className="aidemo-chat-wrap" ref={ref}>
      <div className="aidemo-conv-tabs">
        {CONVERSATIONS.map((c, i) => (
          <button key={i} className={`aidemo-tab${activeConv === i ? ' active' : ''}`} onClick={() => switchConv(i)}>
            Example {i + 1}
          </button>
        ))}
      </div>
      <div className="aidemo-chat">
        <div className="mm1 u">{CONVERSATIONS[activeConv].user}</div>
        <div className="mm1 a" style={{ minHeight: '88px' }}>
          {typed || '\u00A0'}
          {typing && <span className="typing-cursor" />}
        </div>
        <div className="aidemo-actions">
          <button className="aidemo-action-btn active">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
            Continue conversation
          </button>
          <button className="aidemo-action-btn">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 12l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export report
          </button>
          <button className="aidemo-action-btn">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
            View full data
          </button>
        </div>
      </div>
    </div>
  )
}

const steps = [
  {
    n: '01',
    title: 'Configure your AI persona',
    desc: 'Set your AI\'s name, personality, and knowledge base. Define what questions it can answer and what tone it should take.',
    badge: 'Setup: 5 minutes',
    badgeClass: 'em',
  },
  {
    n: '02',
    title: 'Customize the chat interface',
    desc: 'The chat UI inherits your brand colors and typography automatically. Change the prompt placeholder, response format, and UI details in Framer\'s visual editor.',
    badge: 'No code required',
    badgeClass: 'vi',
  },
  {
    n: '03',
    title: 'Connect your backend & go live',
    desc: 'Point the demo to your API endpoint or use our sample data to show realistic AI output. Embed anywhere on your landing page.',
    badge: 'Works with any API',
    badgeClass: 'sk',
  },
]

const benefits = [
  { title: 'Higher conversion rates', desc: 'Visitors who interact with the demo convert at 3.2× the rate of those who don\'t. Experience sells better than copy.' },
  { title: 'Reduce support questions', desc: 'When people understand what your AI does before they buy, they arrive with accurate expectations — and fewer refund requests.' },
  { title: 'Build trust instantly', desc: 'A live, working demo is the strongest trust signal possible. It shows you\'ve built something real.' },
  { title: 'Qualify leads automatically', desc: 'People who engage deeply with the demo self-identify as high-intent. Use this signal in your CRM.' },
  { title: 'Showcase your competitive edge', desc: 'If your AI is better than alternatives, prove it right there on the page. Don\'t just tell them — show them.' },
]

export default function FeatureAIDemo() {
  return (
    <div className="feat-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <Link to="/features">Features</Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span>AI Demo</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="fd-hero">
        <div className="container">
          <div className="fd-hero-inner">
            <div className="fd-hero-text an">
              <div className="screen-badge">Interactive AI Demo</div>
              <h1 className="fd-hero-title">
                Show your AI to the world<br /><span>before users even sign up</span>
              </h1>
              <p className="fd-hero-desc">
                The most effective conversion tool in SaaS isn't a testimonial or a feature list —
                it's a live product demo. BaseBox's interactive chat section lets visitors experience
                your AI in action, building trust and desire before they ever hit the signup button.
              </p>
              <div className="fd-hero-stats">
                <div className="fd-stat">
                  <div className="fd-stat-v">3.2×</div>
                  <div className="fd-stat-l">Higher conversion from demo users</div>
                </div>
                <div className="fd-stat">
                  <div className="fd-stat-v">+67%</div>
                  <div className="fd-stat-l">Longer session duration</div>
                </div>
                <div className="fd-stat">
                  <div className="fd-stat-v">−28%</div>
                  <div className="fd-stat-l">Bounce rate reduction</div>
                </div>
              </div>
            </div>
            <div className="fd-hero-demo an">
              <LiveChatDemo />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="fh an">
            <div className="eyebrow">How It Works</div>
            <h2 className="st">Live in <span>under 15 minutes</span></h2>
            <p className="sd">Three steps from duplicate to deployed demo on your landing page.</p>
          </div>
          <div className="hiw-grid">
            {steps.map((step) => (
              <div key={step.n} className="hiw-card an">
                <div className="hiw-top">
                  <div className="hiw-step"><span>{step.n}</span></div>
                  <div className={`hiw-icon-wrap ${step.badgeClass === 'em' ? 'em' : step.badgeClass === 'vi' ? 'vi' : 'sk'}`} style={{ background: step.badgeClass === 'em' ? 'var(--emerald-bg)' : step.badgeClass === 'vi' ? 'var(--indigo-g)' : 'var(--sky-g)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={step.badgeClass === 'em' ? 'var(--emerald)' : step.badgeClass === 'vi' ? 'var(--indigo)' : 'var(--sky)'} strokeWidth="2">
                      {step.n === '01' && <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />}
                      {step.n === '02' && <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4" /></>}
                      {step.n === '03' && <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />}
                    </svg>
                  </div>
                </div>
                <div className="hiw-t">{step.title}</div>
                <div className="hiw-d">{step.desc}</div>
                <div className={`hiw-badge ${step.badgeClass}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                  {step.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="container">
          <div className="fd-benefits-grid">
            <div className="fd-benefits-text an">
              <div className="eyebrow">Why It Works</div>
              <h2 className="st">The psychology of <span>demo-driven conversion</span></h2>
              <p className="sd" style={{ maxWidth: 'none' }}>
                Seeing is believing. When visitors interact with your AI — even in a guided demo context —
                they form a personal connection with the product. They stop evaluating and start imagining.
                That's when conversions happen.
              </p>
              <Link to="/pricing" className="btn btn-g" style={{ marginTop: '28px', display: 'inline-flex' }}>
                Get this feature — $49
              </Link>
            </div>
            <div className="fd-benefits-list">
              {benefits.map((b) => (
                <div key={b.title} className="fd-benefit-item an">
                  <div className="fd-benefit-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <div>
                    <div className="fd-benefit-title">{b.title}</div>
                    <div className="fd-benefit-desc">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ctas">
        <div className="container">
          <div className="ctab">
            <div className="eyebrow">Get the AI Demo</div>
            <h2 className="st">This feature is included in <span>every BaseBox plan</span></h2>
            <p className="sd" style={{ margin: '0 auto 36px' }}>One payment. Instant access. No subscription.</p>
            <div className="ctac">
              <Link to="/pricing" className="ctab-cta-btn">
                Get BaseBox — from $29
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/features" className="btn btn-o">Back to all features</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
