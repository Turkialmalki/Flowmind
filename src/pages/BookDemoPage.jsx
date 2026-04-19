import { useState } from 'react'
import { Link } from 'react-router-dom'

const BENEFITS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'See it live in 20 minutes',
    desc: 'A focused walkthrough of the features that matter most for your team.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
      </svg>
    ),
    title: 'Built for your use case',
    desc: 'We\'ll tailor the demo to your stack, workflow, and team size.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: 'Get your ROI estimate',
    desc: 'Leave with a clear picture of time and cost savings for your business.',
  },
]

export default function BookDemoPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', useCase: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <div className="bd2-page">
      <section className="bd2-section">
        {/* Atmospheric background */}
        <div className="bd2-bg">
          <div className="bd2-orb bd2-orb1" />
          <div className="bd2-orb bd2-orb2" />
          <div className="bd2-orb bd2-orb3" />
          <div className="bd2-grid" />
        </div>

        <div className="container">
          <div className="bd2-inner">

            {/* ── LEFT: Benefits + Trust ── */}
            <div className="bd2-left">
              <div className="eyebrow">Live Walkthrough</div>
              <h1 className="bd2-title">
                Book a <span>Demo</span>
              </h1>
              <p className="bd2-subtitle">
                See how FlowMind can power your SaaS — live, personalized, and in under 20 minutes.
              </p>

              <div className="bd2-benefits">
                {BENEFITS.map((b, i) => (
                  <div key={i} className="bd2-benefit">
                    <div className="bd2-benefit-icon">{b.icon}</div>
                    <div>
                      <div className="bd2-benefit-title">{b.title}</div>
                      <div className="bd2-benefit-desc">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bd2-testimonial">
                <blockquote className="bd2-quote">
                  "The demo was eye-opening. Within 20 minutes I knew FlowMind was the right choice for our team."
                </blockquote>
                <div className="bd2-author">
                  <div className="bd2-author-avatar">SC</div>
                  <div>
                    <div className="bd2-author-name">Sarah Chen</div>
                    <div className="bd2-author-role">Head of Operations · Nexus Labs</div>
                  </div>
                </div>
              </div>

              <div className="bd2-trust-row">
                <div className="bd2-avatars">
                  <div className="bd2-av" style={{ background: 'linear-gradient(135deg,#6c5ce7,#a29bfe)' }}>T</div>
                  <div className="bd2-av" style={{ background: 'linear-gradient(135deg,#0ea5e9,#38bdf8)' }}>A</div>
                  <div className="bd2-av" style={{ background: 'linear-gradient(135deg,#059669,#34d399)' }}>R</div>
                  <div className="bd2-av" style={{ background: 'linear-gradient(135deg,#d97706,#fbbf24)' }}>M</div>
                </div>
                <span className="bd2-trust-text">Join <strong>200+</strong> teams already using FlowMind</span>
              </div>
            </div>

            {/* ── RIGHT: Form card ── */}
            <div className="bd2-right">
              {submitted ? (
                <div className="bd2-success">
                  <div className="bd2-success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="28" height="28">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h2>You're booked!</h2>
                  <p>
                    Thanks, {form.name || 'there'}! We'll send a calendar invite to{' '}
                    <strong>{form.email}</strong> within the next few hours.
                  </p>
                  <Link to="/" className="btn btn-g bd2-success-btn">
                    Back to home
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ) : (
                <div className="bd2-card">
                  <div className="bd2-card-header">
                    <h2 className="bd2-card-title">Schedule your demo</h2>
                    <p className="bd2-card-sub">Takes less than 1 minute to book</p>
                  </div>

                  <form className="bd2-form" onSubmit={handleSubmit}>
                    <div className="bd2-field">
                      <label htmlFor="bd2-name" className="bd2-label">Full name</label>
                      <div className="bd2-input-wrap">
                        <span className="bd2-input-icon">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                          </svg>
                        </span>
                        <input
                          id="bd2-name"
                          name="name"
                          type="text"
                          className="bd2-input"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="bd2-field">
                      <label htmlFor="bd2-email" className="bd2-label">Work email</label>
                      <div className="bd2-input-wrap">
                        <span className="bd2-input-icon">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                          </svg>
                        </span>
                        <input
                          id="bd2-email"
                          name="email"
                          type="email"
                          className="bd2-input"
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="bd2-field">
                      <label htmlFor="bd2-company" className="bd2-label">
                        Company <span className="bd2-optional">optional</span>
                      </label>
                      <div className="bd2-input-wrap">
                        <span className="bd2-input-icon">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        </span>
                        <input
                          id="bd2-company"
                          name="company"
                          type="text"
                          className="bd2-input"
                          placeholder="Your company"
                          value={form.company}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="bd2-field">
                      <label htmlFor="bd2-useCase" className="bd2-label">What best describes your use case?</label>
                      <div className="bd2-input-wrap">
                        <span className="bd2-input-icon">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                          </svg>
                        </span>
                        <select
                          id="bd2-useCase"
                          name="useCase"
                          className="bd2-input bd2-select"
                          value={form.useCase}
                          onChange={handleChange}
                          required
                        >
                          <option value="" disabled>Select your use case</option>
                          <option value="automation">Workflow Automation</option>
                          <option value="ai-tools">AI-powered Tools</option>
                          <option value="saas-launch">SaaS Template</option>
                          <option value="integrations">Integrations &amp; APIs</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={`btn btn-g bd2-submit${loading ? ' bd2-loading' : ''}`}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="bd2-spinner" />
                          Booking...
                        </>
                      ) : (
                        <>
                          Book my demo
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </button>

                    <div className="bd2-microtrust">
                      <span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        No credit card required
                      </span>
                      <span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                        </svg>
                        Takes less than 1 minute
                      </span>
                    </div>
                  </form>

                  {/* Direct purchase option */}
                  <div className="bd2-direct-purchase">
                    <div className="bd2-divider-row">
                      <span className="bd2-divider-line" />
                      <span className="bd2-divider-text">or purchase directly</span>
                      <span className="bd2-divider-line" />
                    </div>
                    <a
                      href="https://gumroad.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-o bd2-gumroad-btn"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                      </svg>
                      Buy on Gumroad — $49
                    </a>
                    <p className="bd2-purchase-note">
                      You'll receive instant access to all files after completing your purchase.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
