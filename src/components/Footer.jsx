import { Link } from 'react-router-dom'
import LogoIcon from './LogoIcon'

function TwitterIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="ft">
          <div>
            <Link to="/" className="nl">
              <LogoIcon height={52} />
              <span className="nl-brand">FlowMind</span>
            </Link>
            <p className="fbd">
              The complete AI SaaS launch kit. Landing pages, dashboard, auth flows, and every screen
              your product needs — built for Framer, live in 60 minutes.
            </p>
          </div>

          <div>
            <div className="fct">Product</div>
            <ul className="flk">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/integrations">Integrations</Link></li>
              <li><Link to="/automations">Automations</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <div className="fct">Resources</div>
            <ul className="flk">
              <li><Link to="/docs">Docs</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/changelog">Changelog</Link></li>
              <li><Link to="/setup">Setup Guide</Link></li>
              <li><Link to="/demo">Live Demo</Link></li>
            </ul>
          </div>

          <div>
            <div className="fct">Company</div>
            <ul className="flk">
              <li><Link to="/book-demo">Get Template</Link></li>
              <li><Link to="/terms">Terms &amp; Conditions</Link></li>
              <li><Link to="/license">License</Link></li>
              <li><Link to="/privacy">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="fbo">
          <span>© 2026 FlowMind. All rights reserved.</span>
          <div className="fsc">
            <a href="mailto:turkialmalki202200@gmail.com" aria-label="Email us">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Follow FlowMind on X (Twitter)"><TwitterIcon /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="View FlowMind on GitHub"><GitHubIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
