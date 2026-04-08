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
              <span className="nl-brand">BaseBox</span>
            </Link>
            <p className="fbd">
              The complete AI SaaS launch kit. Landing pages, dashboard, auth flows, and every screen
              your product needs — built for Framer, live in 60 minutes.
            </p>
          </div>

          <div>
            <div className="fct">Product</div>
            <ul className="flk">
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/features/dashboard">Dashboard UI</Link></li>
              <li><Link to="/features/ai-demo">AI Demo</Link></li>
              <li><Link to="/features/cms">CMS & Blog</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <div className="fct">Resources</div>
            <ul className="flk">
              <li><Link to="/docs">Documentation</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/docs">Setup Guide</Link></li>
              <li><Link to="/blog/post">Changelog</Link></li>
              <li><Link to="/dashboard">Live Demo</Link></li>
            </ul>
          </div>

          <div>
            <div className="fct">Company</div>
            <ul className="flk">
              <li><Link to="/pricing">Get Template</Link></li>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><a href="#">License</a></li>
              <li><a href="#">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="fbo">
          <span>© 2026 BaseBox. All rights reserved.</span>
          <div className="fsc">
            <a aria-label="Twitter/X"><TwitterIcon /></a>
            <a aria-label="GitHub"><GitHubIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
