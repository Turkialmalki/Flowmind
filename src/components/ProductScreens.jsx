import { BoxIcon } from './LogoIcon'

function CheckItem({ children }) {
  return (
    <li>
      <span className="sl-check">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
      {children}
    </li>
  )
}

function DashboardMock() {
  const navItems = [
    {
      label: 'Dashboard', active: true,
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>,
    },
    {
      label: 'Users', active: false,
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
    },
    {
      label: 'Revenue', active: false,
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" /></svg>,
    },
    {
      label: 'Analytics', active: false,
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>,
    },
    {
      label: 'Settings', active: false,
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4" /></svg>,
    },
  ]

  const activityItems = [
    { color: 'var(--emerald)', text: 'New signup — sarah@acme.io', time: '2m ago' },
    { color: 'var(--indigo)', text: 'Upgrade to Pro plan', time: '14m ago' },
    { color: 'var(--sky)', text: 'API call — 2,400 tokens', time: '31m ago' },
    { color: 'var(--amber)', text: 'Usage threshold reached', time: '1h ago' },
  ]

  return (
    <div className="db-full">
      {/* Sidebar */}
      <div className="db-sidebar">
        <div className="db-logo">
          <div className="db-logo-mark"><BoxIcon height={26} /></div>
          <div className="db-logo-t">BaseBox</div>
        </div>
        <div className="db-nav">
          {navItems.map((item) => (
            <div key={item.label} className={`db-nav-item${item.active ? ' active' : ''}`}>
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="db-main">
        <div className="db-topbar">
          <div className="db-topbar-t">Overview</div>
          <div className="db-topbar-r">
            <div className="db-notif">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            </div>
            <div className="db-avatar">A</div>
          </div>
        </div>
        <div className="db-content">
          <div className="db-stats">
            {[
              { l: 'Active Users', v: '12.4K', d: '↑ 23% this week' },
              { l: 'MRR', v: '$48K', d: '↑ $3.2K vs last month' },
              { l: 'Conversion', v: '4.8%', d: '↑ 1.2% vs avg' },
            ].map((s) => (
              <div className="db-stat" key={s.l}>
                <div className="db-stat-l">{s.l}</div>
                <div className="db-stat-v">{s.v}</div>
                <div className="db-stat-d">{s.d}</div>
              </div>
            ))}
          </div>
          <div className="db-bottom">
            <div className="db-chart-card">
              <div className="db-chart-top">
                <div className="db-chart-title">User Growth</div>
                <div className="db-time-btns">
                  <button className="db-time-btn">24h</button>
                  <button className="db-time-btn on">7d</button>
                  <button className="db-time-btn">30d</button>
                </div>
              </div>
              <svg style={{ width: '100%', height: '80px' }} viewBox="0 0 400 80" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(91,91,214,.15)" />
                    <stop offset="100%" stopColor="rgba(91,91,214,0)" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(15,23,42,.05)" />
                <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(15,23,42,.05)" />
                <path fill="url(#cg2)" d="M0,65 C25,58 50,48 80,40 C110,32 140,44 170,34 C200,24 225,14 250,10 C280,7 310,16 340,10 C370,5 390,8 400,6 L400,80 L0,80Z" />
                <path fill="none" stroke="#5B5BD6" strokeWidth="1.5" strokeLinecap="round" d="M0,65 C25,58 50,48 80,40 C110,32 140,44 170,34 C200,24 225,14 250,10 C280,7 310,16 340,10 C370,5 390,8 400,6" />
                <circle cx="250" cy="10" r="3" fill="#5B5BD6" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="db-activity">
              <div className="db-activity-title">Activity</div>
              <div className="db-activity-list">
                {activityItems.map((a) => (
                  <div className="db-activity-item" key={a.text}>
                    <div className="db-activity-dot" style={{ background: a.color }} />
                    <div className="db-activity-text">{a.text}</div>
                    <div className="db-activity-time">{a.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function AuthMocks() {
  return (
    <div className="auth-wrap">
      {/* Login */}
      <div className="auth-card">
        <div className="auth-card-label">Login</div>
        <div className="auth-logo">
          <div className="auth-logo-mark"><BoxIcon height={28} /></div>
          <div className="auth-logo-t">BaseBox</div>
        </div>
        <div className="auth-h">Welcome back</div>
        <div className="auth-sub">Sign in to your account</div>
        <div className="auth-social">
          <div className="auth-social-btn"><GoogleIcon /> Google</div>
          <div className="auth-social-btn">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </div>
        </div>
        <div className="auth-or">
          <div className="auth-or-line" /><div className="auth-or-text">or</div><div className="auth-or-line" />
        </div>
        <div className="auth-field">
          <div className="auth-field-label">Email</div>
          <div className="auth-field-input focused" style={{ borderColor: 'var(--indigo)', background: '#fff' }}>hello@yourproduct.com</div>
        </div>
        <div className="auth-field">
          <div className="auth-field-label">Password</div>
          <div className="auth-field-input">••••••••••</div>
        </div>
        <button className="auth-btn">Sign In</button>
        <div className="auth-foot">No account? <span>Sign up free</span></div>
      </div>

      {/* Signup */}
      <div className="auth-card">
        <div className="auth-card-label">Sign Up</div>
        <div className="auth-logo">
          <div className="auth-logo-mark"><BoxIcon height={28} /></div>
          <div className="auth-logo-t">BaseBox</div>
        </div>
        <div className="auth-h">Start for free</div>
        <div className="auth-sub">No credit card required</div>
        <div className="auth-social">
          <div className="auth-social-btn" style={{ flex: 'unset', width: '100%' }}>
            <GoogleIcon /> Continue with Google
          </div>
        </div>
        <div className="auth-or">
          <div className="auth-or-line" /><div className="auth-or-text">or email</div><div className="auth-or-line" />
        </div>
        <div className="auth-field">
          <div className="auth-field-label">Full Name</div>
          <div className="auth-field-input">Sarah Chen</div>
        </div>
        <div className="auth-field">
          <div className="auth-field-label">Work Email</div>
          <div className="auth-field-input focused" style={{ borderColor: 'var(--indigo)', background: '#fff' }}>sarah@acme.io</div>
        </div>
        <button className="auth-btn">Create Free Account</button>
        <div className="auth-foot">Already have an account? <span>Sign in</span></div>
      </div>
    </div>
  )
}

function Toggle({ on }) {
  return <div className={`s-toggle ${on ? 'on' : 'off'}`} />
}

function SettingsMock() {
  return (
    <div className="settings-mock">
      <div className="settings-tabs-bar">
        {['Profile', 'Notifications', 'Billing', 'API'].map((t, i) => (
          <div key={t} className={`stab${i === 0 ? ' active' : ''}`}>{t}</div>
        ))}
      </div>
      <div style={{ padding: '14px' }}>
        <div className="settings-field">
          <div className="settings-fl">Display Name</div>
          <div className="settings-fi">Sarah Chen</div>
        </div>
        <div className="settings-field">
          <div className="settings-fl">Email Address</div>
          <div className="settings-fi">sarah@acme.io</div>
        </div>
        <div className="settings-body">
          {[
            { t: 'Email notifications', d: 'Weekly digest & alerts', on: true },
            { t: 'Usage reports', d: 'Monthly summary email', on: true },
            { t: 'Marketing emails', d: 'Product updates & tips', on: false },
          ].map((row) => (
            <div className="settings-row" key={row.t}>
              <div>
                <div className="settings-row-t">{row.t}</div>
                <div className="settings-row-d">{row.d}</div>
              </div>
              <Toggle on={row.on} />
            </div>
          ))}
        </div>
        <button className="settings-save-btn">Save Changes</button>
      </div>
    </div>
  )
}

function EmptyStateMock() {
  return (
    <div className="empty-mock">
      <div className="empty-mock-bar">
        <div className="empty-mock-bar-t">API Keys</div>
        <button className="empty-mock-btn">+ New Key</button>
      </div>
      <div className="empty-body">
        <div className="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="11" width="20" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <div className="empty-t">No API keys yet</div>
        <div className="empty-d">
          Create your first API key to start integrating BaseBox into your product.
        </div>
        <button className="empty-cta">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create API Key
        </button>
      </div>
    </div>
  )
}

export default function ProductScreens() {
  return (
    <section className="section screens-section" id="screens">
      <div className="container">
        <div className="fh an">
          <div className="eyebrow">Product Screens</div>
          <h2 className="st">
            Every screen your SaaS needs, <span>already designed</span>
          </h2>
          <p className="sd">
            BaseBox isn't just a landing page. It's a complete UI kit — dashboard, auth flows,
            settings, and empty states. Ship a real product from day one.
          </p>
        </div>

        {/* ─ Dashboard ─ */}
        <div className="screen-block an">
          <div className="screen-label">
            <span className="screen-badge">Dashboard UI</span>
            <h3 className="screen-t">Show your product before users even sign up</h3>
            <p className="screen-d">
              A full analytics dashboard with live metrics, user growth charts, and an activity feed.
              Embed it in your landing page so visitors see exactly what they're signing up for —
              before they commit.
            </p>
            <ul className="screen-list">
              <CheckItem>Analytics cards — users, revenue, conversion rate</CheckItem>
              <CheckItem>Line chart with 24h / 7d / 30d toggle</CheckItem>
              <CheckItem>Real-time activity feed with colored event types</CheckItem>
              <CheckItem>Sidebar navigation with active states</CheckItem>
            </ul>
          </div>
          <div className="screen-mock">
            <DashboardMock />
          </div>
        </div>

        {/* ─ Auth screens ─ */}
        <div className="screen-block rev an">
          <div className="screen-label">
            <span className="screen-badge">Auth Screens</span>
            <h3 className="screen-t">Ready-to-use auth flows so you launch faster</h3>
            <p className="screen-d">
              Login and signup screens designed to minimize friction and maximize completions. No blank
              page when users click "Get Started" — the onboarding experience is built and beautiful
              from day one.
            </p>
            <ul className="screen-list">
              <CheckItem>Clean login with social auth (Google, GitHub)</CheckItem>
              <CheckItem>Signup page with trust signals</CheckItem>
              <CheckItem>Email verification and password reset</CheckItem>
              <CheckItem>Fully responsive, accessible markup</CheckItem>
            </ul>
          </div>
          <div className="screen-mock">
            <AuthMocks />
          </div>
        </div>

        {/* ─ Settings + Empty States ─ */}
        <div className="screens-2col an">
          <div className="screen-mini">
            <span className="screen-badge">Settings &amp; Profile</span>
            <h3>User settings panel — ready to go</h3>
            <p>
              Profile, preferences, billing, notifications — organized, accessible, and brand-consistent.
              No blank settings page on launch day.
            </p>
            <SettingsMock />
          </div>
          <div className="screen-mini">
            <span className="screen-badge">Empty States</span>
            <h3>Polished even before you have data</h3>
            <p>
              Clean, on-brand empty states guide new users to their first action. Looks intentional,
              not broken — from day one.
            </p>
            <EmptyStateMock />
          </div>
        </div>
      </div>
    </section>
  )
}
