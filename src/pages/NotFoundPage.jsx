import { Link } from 'react-router-dom'

const quickLinks = [
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
  { to: '/docs', label: 'Docs' },
  { to: '/dashboard', label: 'Dashboard' },
]

export default function NotFoundPage() {
  return (
    <section className="nfp">
      <div className="nfp-bg">
        <div className="nfp-orb nfp-orb1" />
        <div className="nfp-orb nfp-orb2" />
        <div className="nfp-grid" />
      </div>

      <div className="container">
        <div className="nfp-inner">
          {/* Animated 404 code */}
          <div className="nfp-code" aria-hidden="true">404</div>

          {/* Icon */}
          <div className="nfp-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
              <line x1="11" y1="8" x2="11" y2="11" />
              <circle cx="11" cy="14" r="0.5" fill="currentColor" />
            </svg>
          </div>

          <h1 className="nfp-title">Workflow not found</h1>
          <p className="nfp-desc">
            This automation doesn't exist yet — or it may have been moved.
            Let's get you back on track.
          </p>

          <div className="nfp-actions">
            <Link to="/dashboard" className="btn btn-g btn-xl">
              Back to Dashboard
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </Link>
            <Link to="/docs" className="btn btn-o">
              Browse Docs
            </Link>
          </div>

          <div className="nfp-links">
            <span>Quick links:</span>
            {quickLinks.map((link) => (
              <Link key={link.to} to={link.to}>{link.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
