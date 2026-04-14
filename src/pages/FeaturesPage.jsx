import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { BoxIcon } from '../components/LogoIcon'

const AI_RESPONSE = 'Analyzed 847 data points across your last 30 days. Found 3 revenue leaks worth $14K/month and identified your best-converting user segment. Want the full breakdown?'

function AnimatedChat() {
  const [typed, setTyped] = useState('')
  const [typing, setTyping] = useState(false)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          setTimeout(() => {
            setTyping(true)
            let i = 0
            const tick = setInterval(() => {
              i++
              setTyped(AI_RESPONSE.slice(0, i))
              if (i >= AI_RESPONSE.length) { clearInterval(tick); setTyping(false) }
            }, 14)
          }, 600)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  return (
    <div className="mch" ref={ref}>
      <div className="mm1 u">Analyze my product metrics and find revenue opportunities</div>
      <div className="mm1 a" style={{ minHeight: '80px' }}>
        {typed || '\u00A0'}
        {typing && <span className="typing-cursor" />}
      </div>
      <div className="feat-chat-actions">
        <button className="feat-chat-btn">View Full Report</button>
        <button className="feat-chat-btn">Export Data</button>
      </div>
    </div>
  )
}

const featureCards = [
  { icon: '⚡', title: 'Instant Setup', desc: 'Duplicate to your Framer workspace and you\'re live in under 60 minutes. No configuration headaches.' },
  { icon: '📱', title: 'Fully Responsive', desc: '40% of visitors are on mobile. Every screen is pixel-perfect from 320px to 4K displays.' },
  { icon: '🔒', title: 'Auth Screens', desc: 'Login, signup, and password reset. Ready to wire to any auth provider — Clerk, Auth0, Supabase.' },
  { icon: '⚙️', title: 'Settings Pages', desc: 'Profile, billing, notifications, API keys — every settings screen your users expect.' },
  { icon: '📊', title: 'Analytics Dashboard', desc: 'KPI cards, area charts, tables, activity feeds. Show your product before users sign up.' },
  { icon: '✍️', title: 'CMS Blog', desc: 'Framer CMS powers your blog, changelog, and team pages. Publish without touching code.' },
  { icon: '🎨', title: 'Design System', desc: 'Consistent tokens, components, and spacing. Change your brand in minutes from one place.' },
  { icon: '♾️', title: 'Lifetime Updates', desc: 'Every new screen and design improvement ships automatically. Buy once, stay current forever.' },
  { icon: '🚀', title: 'SEO Ready', desc: 'Meta tags, Open Graph, structured data, and semantic HTML. Launch ranking from day one.' },
  { icon: '💬', title: 'Interactive Demo', desc: 'Let visitors experience your AI before signing up. The highest-converting section in the kit.' },
  { icon: '🏷️', title: 'Pricing Optimized', desc: 'Three-tier pricing with comparison tables, urgency messaging, and FAQ — engineered to convert.' },
  { icon: '📋', title: 'Empty States', desc: 'Every dashboard screen has a thoughtful empty state. New users feel guided, not lost.' },
]

const PILL_SECTIONS = [
  { id: 'ai-demo', label: 'AI Demo' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'auth', label: 'Auth' },
  { id: 'blog', label: 'Blog & CMS' },
  { id: 'design', label: 'Design System' },
  { id: 'all-features', label: 'All Features' },
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function FeaturesPage() {
  const [activeSection, setActiveSection] = useState('ai-demo')

  useEffect(() => {
    const sectionIds = ['ai-demo', 'dashboard', 'auth', 'all-features']
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [])

  return (
    <div className="feat-page">
      {/* Inner page hero */}
      <section className="iph">
        <div className="iph-bg">
          <div className="iph-orb iph-orb1" />
          <div className="iph-orb iph-orb2" />
          <div className="iph-grid" />
        </div>
        <div className="container">
          <div className="iph-inner">
            <div className="eyebrow">All Features</div>
            <h1 className="iph-title">
              Every building block your<br /><span>AI SaaS needs to launch</span>
            </h1>
            <p className="iph-desc">
              FlowMind is not a collection of pretty screens — it's a complete, conversion-engineered
              product system. Every section, interaction, and design detail built for one purpose: getting
              you from idea to revenue, fast.
            </p>
            <div className="iph-actions">
              <Link to="/pricing" className="btn btn-g btn-lg">Get FlowMind — $49</Link>
              <Link to="/dashboard" className="btn btn-o btn-lg">View Live Demo</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature nav pills */}
      <div className="feat-nav-strip">
        <div className="container">
          <div className="feat-nav-pills">
            {PILL_SECTIONS.map(({ id, label }) => {
              // blog → auth section, design → all-features section
              const targetId = id === 'blog' ? 'auth' : id === 'design' ? 'all-features' : id
              const isActive = id === 'blog'
                ? activeSection === 'auth'
                : id === 'design'
                  ? activeSection === 'all-features'
                  : activeSection === id
              return (
                <button
                  key={id}
                  className={`feat-pill${isActive ? ' active' : ''}`}
                  onClick={() => scrollToSection(targetId)}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Feature showcase 1 — AI Demo */}
      <section className="section feat-showcase" id="ai-demo">
        <div className="container">
          <div className="feat-showcase-grid">
            <div className="feat-showcase-text an">
              <div className="screen-badge">Interactive AI Demo</div>
              <h2 className="feat-showcase-title">
                Convert skeptics into signups with a live AI experience
              </h2>
              <p className="feat-showcase-desc">
                The interactive demo section lets visitors talk to your AI before they ever see a pricing page.
                They type a question, watch it respond in real time, and understand immediately why they need your product.
                Nothing converts like firsthand experience.
              </p>
              <ul className="feat-showcase-list">
                {['Animated typing response', 'Customizable prompt & persona', 'Mobile-optimized chat UI', 'Triggers on scroll into view', 'Wires to any AI backend'].map(f => (
                  <li key={f}>
                    <span className="sl-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg></span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/features/ai-demo" className="feat-showcase-link">
                Explore AI Demo feature
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="feat-showcase-mock an">
              <div className="feat-mock-frame">
                <div className="feat-mock-header">
                  <div className="feat-mock-dots"><span /><span /><span /></div>
                  <div className="feat-mock-url">your-ai-saas.com/demo</div>
                </div>
                <div className="feat-mock-body">
                  <AnimatedChat />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature showcase 2 — Dashboard */}
      <section className="section feat-showcase feat-showcase-alt" id="dashboard">
        <div className="container">
          <div className="feat-showcase-grid feat-showcase-grid-rev">
            <div className="feat-showcase-mock an">
              <div className="feat-mock-frame">
                <div className="feat-mock-header">
                  <div className="feat-mock-dots"><span /><span /><span /></div>
                  <div className="feat-mock-url">your-ai-saas.com/dashboard</div>
                </div>
                <div className="feat-dash-preview">
                  <div className="fdp-sidebar">
                    {['Overview', 'Analytics', 'Users', 'Revenue', 'Settings'].map((item, i) => (
                      <div key={item} className={`fdp-nav-item ${i === 0 ? 'active' : ''}`}>
                        <div className="fdp-dot" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="fdp-main">
                    <div className="fdp-stats">
                      {[{ l: 'Users', v: '12.4K', d: '↑ 23%' }, { l: 'MRR', v: '$48K', d: '↑ 18%' }, { l: 'Conv.', v: '4.8%', d: '↑ 1.2%' }].map(s => (
                        <div key={s.l} className="fdp-stat">
                          <div className="fdp-stat-l">{s.l}</div>
                          <div className="fdp-stat-v">{s.v}</div>
                          <div className="fdp-stat-d">{s.d}</div>
                        </div>
                      ))}
                    </div>
                    <div className="fdp-chart">
                      <svg viewBox="0 0 400 80" preserveAspectRatio="none" style={{ width: '100%', height: '70px' }}>
                        <defs>
                          <linearGradient id="fdg" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(91,91,214,.18)" />
                            <stop offset="100%" stopColor="rgba(91,91,214,0)" />
                          </linearGradient>
                        </defs>
                        <path fill="url(#fdg)" d="M0,60 C40,52 80,40 120,35 C160,30 200,42 240,28 C280,14 320,20 360,10 L400,8 L400,80 L0,80Z" />
                        <path fill="none" stroke="#5B5BD6" strokeWidth="2" d="M0,60 C40,52 80,40 120,35 C160,30 200,42 240,28 C280,14 320,20 360,10 L400,8" />
                      </svg>
                    </div>
                    <div className="fdp-activity">
                      {['New signup — maya@co.', 'Upgraded to Pro — j@b.', 'API call spike — auto'].map(a => (
                        <div key={a} className="fdp-act-item">
                          <div className="fdp-act-dot" />
                          <span>{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="feat-showcase-text an">
              <div className="screen-badge">Dashboard UI Kit</div>
              <h2 className="feat-showcase-title">
                A full product dashboard your users will love from day one
              </h2>
              <p className="feat-showcase-desc">
                Show off your product's power before users even sign up. The dashboard UI includes
                everything — sidebar navigation, KPI cards, area charts, activity feeds, data tables,
                and empty states. Built in Framer, fully customizable.
              </p>
              <ul className="feat-showcase-list">
                {['Sidebar + topbar navigation', '4 analytics KPI cards', 'Animated area chart', 'Recent activity feed', 'User management table', 'Mobile-responsive layout'].map(f => (
                  <li key={f}>
                    <span className="sl-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg></span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/features/dashboard" className="feat-showcase-link">
                Explore Dashboard UI
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature showcase 3 — Auth + CMS */}
      <section className="section feat-showcase" id="auth">
        <div className="container">
          <div className="feat-showcase-grid">
            <div className="feat-showcase-text an">
              <div className="screen-badge">Auth & CMS</div>
              <h2 className="feat-showcase-title">
                Every screen beyond the landing page — already built
              </h2>
              <p className="feat-showcase-desc">
                Login, signup, password reset, settings, profile, blog — all the pages your users
                will navigate after they convert. FlowMind includes them all so you're shipping a
                complete product, not just a marketing site.
              </p>
              <div className="feat-dual-badges">
                <Link to="/features/cms" className="feat-badge-link">
                  <div className="feat-badge-card">
                    <div className="feat-badge-icon" style={{ background: 'var(--indigo-g)', color: 'var(--indigo)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    </div>
                    <div>
                      <div className="feat-badge-title">Auth Screens</div>
                      <div className="feat-badge-desc">Login · Signup · Reset</div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </Link>
                <Link to="/features/cms" className="feat-badge-link">
                  <div className="feat-badge-card">
                    <div className="feat-badge-icon" style={{ background: 'var(--emerald-bg)', color: 'var(--emerald)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                    </div>
                    <div>
                      <div className="feat-badge-title">CMS & Blog</div>
                      <div className="feat-badge-desc">Posts · Categories · SEO</div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </Link>
              </div>
            </div>
            <div className="feat-showcase-mock an">
              <div className="feat-auth-split">
                <div className="feat-auth-card">
                  <div className="feat-auth-logo">
                    <BoxIcon height={26} />
                    <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '13px' }}>FlowMind</span>
                  </div>
                  <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>Welcome back</div>
                  <div style={{ fontSize: '11px', color: 'var(--t3)', marginBottom: '14px' }}>Sign in to your account</div>
                  <div className="feat-auth-social">
                    <div className="feat-auth-social-btn">G Google</div>
                    <div className="feat-auth-social-btn">⌥ GitHub</div>
                  </div>
                  <div className="feat-auth-or"><div className="feat-auth-line" /><span>or</span><div className="feat-auth-line" /></div>
                  {[{ l: 'Email', ph: 'you@startup.com' }, { l: 'Password', ph: '••••••••' }].map(f => (
                    <div key={f.l} className="feat-auth-field">
                      <div className="feat-auth-label">{f.l}</div>
                      <div className="feat-auth-input">{f.ph}</div>
                    </div>
                  ))}
                  <div className="feat-auth-submit">Sign in</div>
                </div>
                <div className="feat-cms-card">
                  <div className="feat-cms-badge">Blog Post</div>
                  <div className="feat-cms-title">How We Hit $10K MRR in 60 Days</div>
                  <div className="feat-cms-meta">Apr 5 · 8 min read · Growth</div>
                  <div className="feat-cms-body" />
                  <div className="feat-cms-body feat-cms-body-sm" />
                  <div className="feat-cms-tags">
                    <span>MRR</span><span>Growth</span><span>SaaS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full feature grid */}
      <section className="section" id="all-features" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="fh an">
            <div className="eyebrow">Complete Feature List</div>
            <h2 className="st">Everything included, <span>nothing extra needed</span></h2>
            <p className="sd">One purchase gives you the complete system — pages, components, interactions, and design tokens.</p>
          </div>
          <div className="feat-grid">
            {featureCards.map((card) => (
              <div key={card.title} className="feat-card an">
                <div className="feat-card-icon">{card.icon}</div>
                <div className="feat-card-title">{card.title}</div>
                <div className="feat-card-desc">{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ctas">
        <div className="container">
          <div className="ctab">
            <div className="eyebrow">Ready to Launch?</div>
            <h2 className="st">Stop building from scratch.<br /><span>Start shipping this week.</span></h2>
            <p className="sd" style={{ margin: '0 auto 36px' }}>One payment. Everything included. Instant access after purchase.</p>
            <div className="ctac">
              <Link to="/pricing" className="ctab-cta-btn">
                Get FlowMind — $49
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/dashboard" className="btn btn-o">View Live Demo</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
