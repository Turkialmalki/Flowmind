import { useState } from 'react'

export default function BookDemoPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="book-demo-page">
      <section className="iph" style={{ paddingBottom: '100px' }}>
        <div className="iph-bg">
          <div className="iph-orb iph-orb1" />
          <div className="iph-orb iph-orb2" />
          <div className="iph-grid" />
        </div>
        <div className="container">
          <div className="iph-inner" style={{ maxWidth: '560px', margin: '0 auto' }}>
            <div className="eyebrow">Get Access</div>
            <h1 className="iph-title" style={{ marginBottom: '12px' }}>Book a Demo</h1>
            <p className="iph-desc" style={{ marginBottom: '48px' }}>
              See how this template works and get access.
            </p>

            {submitted ? (
              <div className="book-demo-success">
                <div className="book-demo-success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="28" height="28">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h2>You're all set!</h2>
                <p>Thanks, {form.name || 'there'}! We'll reach out to {form.email} within 24 hours to confirm your demo.</p>
              </div>
            ) : (
              <form className="book-demo-form" onSubmit={handleSubmit}>
                <div className="book-demo-field">
                  <label htmlFor="bd-name" className="auth-label">Name</label>
                  <input
                    id="bd-name"
                    name="name"
                    type="text"
                    className="auth-input"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="book-demo-field">
                  <label htmlFor="bd-email" className="auth-label">Email</label>
                  <input
                    id="bd-email"
                    name="email"
                    type="email"
                    className="auth-input"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="book-demo-field">
                  <label htmlFor="bd-message" className="auth-label">Message</label>
                  <textarea
                    id="bd-message"
                    name="message"
                    className="auth-input book-demo-textarea"
                    placeholder="Tell us about your project or what you'd like to see..."
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <button type="submit" className="btn btn-g" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px', fontWeight: 600 }}>
                  Get Access
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>

                <p className="book-demo-note">
                  No spam. We'll reply within 24 hours.
                </p>
              </form>
            )}

            {/* ── Contact section ── */}
            <div className="bd-contact">
              <h3 className="bd-contact-title">Let's Get In Touch</h3>
              <p className="bd-contact-sub">Have questions or need a custom setup? Reach out directly.</p>
              <div className="bd-contact-items">
                <a href="mailto:hello@yourdomain.com" className="bd-contact-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>hello@yourdomain.com</span>
                </a>
                <div className="bd-contact-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <span>+966 XX XXX XXXX</span>
                </div>
                <div className="bd-contact-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>Riyadh, Saudi Arabia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
