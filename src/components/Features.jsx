import { useState, useEffect, useRef } from 'react'

const AI_RESPONSE =
  'Your team saved 312 hours this month. 4 workflows are underperforming — fixing them would cut processing time by 40%. Want me to auto-optimize them now?'

const PAGES = ['Home', 'Pricing', 'Blog', 'Dashboard', 'Auth']
const PAGE_DESC = {
  Home: 'Hero, AI demo, social proof, pricing, FAQ — every conversion section pre-built for AI SaaS.',
  Pricing: 'Plan comparison table, urgency messaging, and FAQs engineered to convert AI tool buyers.',
  Blog: 'CMS-powered blog for product updates, automation guides, and SEO. Zero developer needed.',
  Dashboard: 'Workflow metrics, automation charts, activity feed, sidebar nav — show your AI product live.',
  Auth: 'Login, signup, and password reset with social OAuth. Ready to wire to any auth provider.',
}

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
              if (i >= AI_RESPONSE.length) {
                clearInterval(tick)
                setTyping(false)
              }
            }, 16)
          }, 900)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  return (
    <div className="mch" ref={ref}>
      <div className="mm1 u">How many hours did my team save with automation this month?</div>
      <div className="mm1 a" style={{ minHeight: '72px' }}>
        {typed || '\u00A0'}
        {typing && <span className="typing-cursor" />}
      </div>
    </div>
  )
}

function PagesTabCard() {
  const [tab, setTab] = useState('Home')
  return (
    <div className="bc c4 an-scale">
      <div className="bi em">
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 14h6v6H4zM14 4h6v6h-6zM4 4h6v6H4zM14 14h6v6h-6z" />
        </svg>
      </div>
      <div className="bt">Every Page Your AI SaaS Needs</div>
      <div className="bds bds-sm">Home, Dashboard, Auth, Blog, Pricing — all included:</div>
      <div className="pages-tab-demo">
        <div className="ptabs">
          {PAGES.map((p) => (
            <button
              key={p}
              className={`ptab${tab === p ? ' on' : ''}`}
              onClick={() => setTab(p)}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="ptab-content" key={tab}>{PAGE_DESC[tab]}</div>
      </div>
    </div>
  )
}

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="fh an-scale">
          <h2 className="st">
            Everything you need to <span>build an AI SaaS</span>
          </h2>
          <p className="sd">
            Pre-built pages, dashboards, and systems designed for automation products.
          </p>
        </div>

        <div className="bento">

          {/* Big card — AI demo with live typing animation */}
          <div className="bc c8 accent an-scale">
            <div className="bi vi">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <div className="bt">Let Visitors Experience Your Automation Before They Sign Up</div>
            <div className="bds">
              The interactive AI demo lets visitors see real automation output — workflows triggered,
              hours saved, insights surfaced — before they click "Get Started." Showing beats telling,
              every time.
            </div>
            <AnimatedChat />
          </div>

          {/* Trust card */}
          <div className="bc c4 an">
            <div className="bi cy">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="bt">Social Proof Where It Actually Works</div>
            <div className="bds">
              Testimonials, badges, and metrics placed exactly where visitors hesitate — pricing pages,
              sign-up forms, and CTAs. Remove doubt at the exact moment it forms.
            </div>
            <div className="mbr">
              <div>
                <div className="mbl"><span>Visitor Trust Score</span><span style={{ color: 'var(--indigo)' }}>94%</span></div>
                <div className="mbx"><div className="mbf fc" style={{ width: '94%' }} /></div>
              </div>
              <div>
                <div className="mbl"><span>Signup Conversion</span><span style={{ color: 'var(--emerald)' }}>4.8%</span></div>
                <div className="mbx"><div className="mbf fe" style={{ width: '48%' }} /></div>
              </div>
              <div>
                <div className="mbl"><span>Bounce Rate Reduction</span><span style={{ color: 'var(--amber)' }}>−32%</span></div>
                <div className="mbx"><div className="mbf fa" style={{ width: '68%' }} /></div>
              </div>
            </div>
          </div>

          {/* Pages card — interactive tab switcher */}
          <PagesTabCard />

          {/* Mobile card */}
          <div className="bc c4 an">
            <div className="bi am">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 20V10M18 20V4M6 20v-6" />
              </svg>
            </div>
            <div className="bt">Flawless on Every Screen Size</div>
            <div className="bds">
              40% of your visitors are on mobile. FlowMind looks pixel-perfect on every device —
              never lose a conversion to a broken layout.
            </div>
            <ul className="bc-bullets">
              <li>Mobile-first responsive design</li>
              <li>Touch-optimized interactions</li>
              <li>Zero layout bugs, guaranteed</li>
            </ul>
          </div>

          {/* CMS card */}
          <div className="bc c4 an">
            <div className="bi vi">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
            </div>
            <div className="bt">Blog Content Without a Developer</div>
            <div className="bds">
              Framer CMS powers your blog, team page, and changelog. Write a post, publish — design
              stays perfect. SEO-ready out of the box.
            </div>
            <ul className="bc-bullets">
              <li>CMS-powered blog & changelog</li>
              <li>SEO-optimized structure</li>
              <li>No code, ever</li>
            </ul>
          </div>

          {/* Brand card */}
          <div className="bc c4 an">
            <div className="bi cy">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4" />
              </svg>
            </div>
            <div className="bt">Your Brand in Minutes, Not Weeks</div>
            <div className="bds">
              Colors, fonts, images, copy — change everything in Framer's visual editor. No designer.
              No code. Launch looking like your product, not a template.
            </div>
            <ul className="bc-bullets">
              <li>Full design token system</li>
              <li>One-click color & font swaps</li>
              <li>Looks custom-built, not templated</li>
            </ul>
          </div>

          {/* Comparison card */}
          <div className="bc c4 an">
            <div className="bi" style={{ background: 'rgba(5,150,105,0.08)', color: 'var(--emerald)' }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="bt">vs Hiring a Developer</div>
            <div className="bds">
              Everything here would cost $3,000+ to design and build. Skip the agency quote entirely.
            </div>
            <div className="bcomp">
              <div className="bcomp-row">
                <span className="bcomp-label">Agency quote</span>
                <span className="bcomp-bad">$8,400+</span>
              </div>
              <div className="bcomp-row">
                <span className="bcomp-label">Launch timeline</span>
                <span className="bcomp-bad">6–8 weeks</span>
              </div>
              <div className="bcomp-divider" />
              <div className="bcomp-row">
                <span className="bcomp-label" style={{ fontWeight: 700, color: 'var(--t1)' }}>FlowMind Pro</span>
                <span className="bcomp-good">$49 · 60 min</span>
              </div>
            </div>
          </div>

          {/* Lifetime updates card */}
          <div className="bc c4 an">
            <div className="bi" style={{ background: 'rgba(91,91,214,0.08)', color: 'var(--indigo)' }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
              </svg>
            </div>
            <div className="bt">Free Lifetime Updates</div>
            <div className="bds">
              Every new screen, section, and design improvement ships to your template automatically.
              Buy once — stay current forever.
            </div>
            <ul className="bc-bullets">
              <li>All future screens included</li>
              <li>Design improvements auto-pushed</li>
              <li>No extra cost, ever</li>
            </ul>
          </div>

          {/* Speed card */}
          <div className="bc c4 an">
            <div className="bi am">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div className="bt">Built for Speed to Revenue</div>
            <div className="bds">
              Every week without a live site is a week your competitors collect signups you're not.
              FlowMind eliminates that gap — permanently.
            </div>
            <ul className="bc-bullets">
              <li>From zero to live in under 60 minutes</li>
              <li>AI-ready components, no design work</li>
              <li>Your first paying users, this week</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
