import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import LogoIcon from './LogoIcon'

const productItems = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    desc: 'Real-time analytics & metrics',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    color: 'var(--indigo)',
    bg: 'var(--indigo-g)',
  },
  {
    to: '/features/ai-demo',
    label: 'AI Demo',
    desc: 'Try the live AI assistant',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2V4a2 2 0 012-2z" />
        <path d="M12 8v8M8 12H4a2 2 0 000 4h16a2 2 0 000-4h-4" />
        <circle cx="12" cy="20" r="2" />
      </svg>
    ),
    color: 'var(--sky)',
    bg: 'var(--sky-g)',
  },
  {
    to: '/features/cms',
    label: 'CMS',
    desc: 'Content management system',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    color: 'var(--emerald)',
    bg: 'var(--emerald-bg)',
  },
  {
    to: '/login',
    label: 'Auth',
    desc: 'Login & signup flows',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    color: 'var(--amber)',
    bg: 'rgba(217,119,6,0.08)',
  },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  const [mobileProductOpen, setMobileProductOpen] = useState(false)
  const { pathname } = useLocation()
  const dropdownRef = useRef(null)
  const closeTimer = useRef(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handler = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 50)
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setProductOpen(false)
    setMobileProductOpen(false)
  }, [pathname])

  const handleDropdownEnter = () => {
    clearTimeout(closeTimer.current)
    setProductOpen(true)
  }

  const handleDropdownLeave = () => {
    closeTimer.current = setTimeout(() => setProductOpen(false), 120)
  }

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  return (
    <>
      <nav id="mainNav" className={[scrolled ? 'scrolled' : '', hidden ? 'nav-hidden' : ''].filter(Boolean).join(' ')}>
        <div className="container">
          <Link to="/" className="nl">
            <LogoIcon height={36} />
            <span className="nl-brand">BaseBox</span>
          </Link>

          <ul className="nk">
            {/* Product dropdown */}
            <li
              className="nav-dd-wrap"
              ref={dropdownRef}
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button className={`nav-dd-trigger${productOpen ? ' open' : ''}`}>
                Product
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="nav-dd-chevron">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <div className={`nav-dd-panel${productOpen ? ' open' : ''}`}>
                <div className="nav-dd-inner">
                  <div className="nav-dd-label-row">Product suite</div>
                  {productItems.map((item) => (
                    <Link key={item.to} to={item.to} className="nav-dd-item">
                      <span className="nav-dd-icon" style={{ background: item.bg, color: item.color }}>
                        {item.icon}
                      </span>
                      <div className="nav-dd-text">
                        <div className="nav-dd-name">{item.label}</div>
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

            <li>
              <NavLink to="/features" className={({ isActive }) => isActive ? 'ac' : ''}>
                Features
              </NavLink>
            </li>
            <li>
              <NavLink to="/pricing" className={({ isActive }) => isActive ? 'ac' : ''}>
                Pricing
              </NavLink>
            </li>
          </ul>

          <div className="nr">
            <Link to="/login" className="btn btn-o" style={{ fontSize: '13px', padding: '9px 20px' }}>
              Login
            </Link>
            <a href="#pricing" className="nav-get-template">
              Get Template
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
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
        <button className="mc" onClick={() => setMobileOpen(false)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <button
          className="mm-section-toggle"
          onClick={() => setMobileProductOpen(!mobileProductOpen)}
        >
          Product
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: mobileProductOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {mobileProductOpen && (
          <div className="mm-sub">
            {productItems.map((item) => (
              <Link key={item.to} to={item.to} className="mm-sub-link">
                <span className="mm-sub-icon" style={{ background: item.bg, color: item.color }}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}
          </div>
        )}

        <Link to="/features">Features</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/login" className="mm-auth">Login</Link>
        <a href="#pricing" className="mm-cta" onClick={() => setMobileOpen(false)}>Get Template — $49</a>
      </div>
    </>
  )
}
