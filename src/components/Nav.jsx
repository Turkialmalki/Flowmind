import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import LogoIcon from './LogoIcon'

/* ── Dropdown data ── */

const productItems = [
  {
    to: '/features',
    label: 'Features',
    desc: 'Full breakdown of every capability',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    color: 'var(--indigo)',
    bg: 'var(--indigo-g)',
  },
  {
    to: '/dashboard',
    label: 'Dashboard UI',
    desc: 'Real-time analytics & metrics',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    color: 'var(--sky)',
    bg: 'var(--sky-g)',
  },
  {
    to: '/ai-demo',
    label: 'AI Demo',
    desc: 'Try the live AI assistant',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.08)',
  },
  {
    to: '/cms',
    label: 'CMS & Blog',
    desc: 'Content management system',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    color: 'var(--emerald)',
    bg: 'var(--emerald-bg)',
  },
  {
    to: '/pricing',
    label: 'Pricing',
    desc: 'Plans, features & FAQ',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    color: 'var(--amber)',
    bg: 'rgba(217,119,6,0.08)',
  },
]

const resourceItems = [
  {
    to: '/docs',
    label: 'Documentation',
    desc: 'Guides, API reference & setup',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
    color: 'var(--indigo)',
    bg: 'var(--indigo-g)',
  },
  {
    to: '/blog',
    label: 'Blog',
    desc: 'SaaS growth & product insights',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    color: 'var(--sky)',
    bg: 'var(--sky-g)',
  },
  {
    to: '/setup',
    label: 'Setup Guide',
    desc: 'Step-by-step onboarding flow',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    color: 'var(--emerald)',
    bg: 'var(--emerald-bg)',
  },
  {
    to: '/changelog',
    label: 'Changelog',
    desc: 'Version history & updates',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.08)',
  },
  {
    to: '/demo',
    label: 'Live Demo',
    desc: 'Interactive product preview',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    ),
    color: 'var(--amber)',
    bg: 'rgba(217,119,6,0.08)',
  },
]

const companyItems = [
  {
    to: '/pricing',
    label: 'Get Template',
    desc: 'One-time purchase — $49',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
    color: 'var(--indigo)',
    bg: 'var(--indigo-g)',
    badge: '$49',
  },
  {
    to: '/login',
    label: 'Sign In',
    desc: 'Access your dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
      </svg>
    ),
    color: 'var(--t3)',
    bg: 'var(--bg3)',
  },
  {
    to: '/signup',
    label: 'Sign Up',
    desc: 'Create your account free',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
    color: 'var(--emerald)',
    bg: 'var(--emerald-bg)',
  },
  {
    to: '/license',
    label: 'License',
    desc: 'Usage rights & terms',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    color: 'var(--t3)',
    bg: 'var(--bg3)',
  },
  {
    to: '/privacy',
    label: 'Privacy',
    desc: 'Data & privacy policy',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    color: 'var(--t3)',
    bg: 'var(--bg3)',
  },
]

/* ── Dropdown component ── */
function NavDropdown({ label, items, groupLabel, wide }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef(null)

  const enter = () => { clearTimeout(closeTimer.current); setOpen(true) }
  const leave = () => { closeTimer.current = setTimeout(() => setOpen(false), 120) }

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  return (
    <li className="nav-dd-wrap" onMouseEnter={enter} onMouseLeave={leave}>
      <button className={`nav-dd-trigger${open ? ' open' : ''}`}>
        {label}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="nav-dd-chevron">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div className={`nav-dd-panel${open ? ' open' : ''}${wide ? ' wide' : ''}`}>
        <div className="nav-dd-inner">
          {groupLabel && <div className="nav-dd-label-row">{groupLabel}</div>}
          {items.map((item) => (
            <Link key={item.to + item.label} to={item.to} className="nav-dd-item" onClick={() => setOpen(false)}>
              <span className="nav-dd-icon" style={{ background: item.bg, color: item.color }}>
                {item.icon}
              </span>
              <div className="nav-dd-text">
                <div className="nav-dd-name">
                  {item.label}
                  {item.badge && <span className="nav-dd-badge">{item.badge}</span>}
                </div>
                <div className="nav-dd-desc">{item.desc}</div>
              </div>
              <svg className="nav-dd-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </li>
  )
}

/* ── Mobile accordion group ── */
function MobileGroup({ label, items, onClose }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mm-group">
      <button className="mm-section-toggle" onClick={() => setOpen(!open)}>
        {label}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="mm-sub">
          {items.map((item) => (
            <Link key={item.to + item.label} to={item.to} className="mm-sub-link" onClick={onClose}>
              <span className="mm-sub-icon" style={{ background: item.bg, color: item.color }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Main Nav ── */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handler = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 50)
      setHidden(currentY > lastScrollY.current && currentY > 80)
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const closeMenu = () => setMobileOpen(false)

  return (
    <>
      <nav id="mainNav" className={[scrolled ? 'scrolled' : '', hidden ? 'nav-hidden' : ''].filter(Boolean).join(' ')}>
        <div className="container">
          <Link to="/" className="nl">
            <LogoIcon height={40} />
            <span className="nl-brand">BaseBox</span>
          </Link>

          <ul className="nk">
            <NavDropdown label="Product" items={productItems} groupLabel="Product suite" />
            <NavDropdown label="Resources" items={resourceItems} groupLabel="Learn & explore" />
            <NavDropdown label="Company" items={companyItems} groupLabel="Company" />
          </ul>

          <div className="nr">
            <Link to="/login" className="btn btn-o" style={{ fontSize: '13px', padding: '9px 20px' }}>
              Sign In
            </Link>
            <Link to="/pricing" className="nav-get-template">
              Get Template
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <button className="nm" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mm${mobileOpen ? ' open' : ''}`}>
        <div className="mm-header">
          <Link to="/" className="nl" onClick={closeMenu}>
            <LogoIcon height={36} />
            <span className="nl-brand" style={{ fontSize: '19px' }}>BaseBox</span>
          </Link>
          <button className="mc" onClick={closeMenu}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mm-scroll">
          <MobileGroup label="Product" items={productItems} onClose={closeMenu} />
          <MobileGroup label="Resources" items={resourceItems} onClose={closeMenu} />
          <MobileGroup label="Company" items={companyItems} onClose={closeMenu} />
        </div>

        <div className="mm-footer">
          <Link to="/login" className="btn btn-o" style={{ width: '100%', justifyContent: 'center' }} onClick={closeMenu}>Sign In</Link>
          <Link to="/pricing" className="btn btn-g" style={{ width: '100%', justifyContent: 'center' }} onClick={closeMenu}>Get Template — $49</Link>
        </div>
      </div>
    </>
  )
}
