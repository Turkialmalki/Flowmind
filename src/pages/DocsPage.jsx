import { useState } from 'react'
import { Link } from 'react-router-dom'

const docSections = [
  {
    label: 'Getting Started',
    items: ['Quick Start', 'Installation', 'Project Structure', 'Configuration'],
  },
  {
    label: 'Pages',
    items: ['Home Page', 'Features Page', 'Auth Pages', 'Dashboard', 'Blog Setup', 'Pricing Page'],
  },
  {
    label: 'Customization',
    items: ['Colors & Tokens', 'Typography', 'Components', 'Animations'],
  },
  {
    label: 'Framer CMS',
    items: ['Blog Integration', 'Collections', 'Dynamic Routes', 'SEO Settings'],
  },
  {
    label: 'Deployment',
    items: ['Publishing to Framer', 'Custom Domain', 'Netlify Deploy', 'Performance'],
  },
]

const CODE_VITE = `# 1. Duplicate the template in Framer
# 2. Or clone this repo for local dev

git clone https://github.com/basebox-ai/template
cd basebox-ai
npm install
npm run dev`

const CODE_COLORS = `/* index.css — Design tokens */
:root {
  --indigo: #5b5bd6;   /* Primary brand color */
  --sky:    #0ea5e9;   /* Secondary accent */
  --grad:   linear-gradient(135deg, #5b5bd6, #0ea5e9);
  --t1:     #0a0e1a;   /* Heading text */
  --t2:     #374151;   /* Body text */
  --t3:     #6b7280;   /* Muted text */
  --bg:     #ffffff;   /* Page background */
  --bg2:    #f7f8fc;   /* Section background */
}`

const CODE_COMPONENT = `// Reusable section header pattern
<div className="fh an">
  <div className="eyebrow">Section Label</div>
  <h2 className="st">
    Main headline with <span>gradient word</span>
  </h2>
  <p className="sd">Supporting description text.</p>
</div>`

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('Quick Start')
  const [expandedSections, setExpandedSections] = useState(['Getting Started'])

  const toggleSection = (label) => {
    setExpandedSections(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    )
  }

  return (
    <div className="docs-page">
      {/* Hero */}
      <section className="iph" style={{ paddingBottom: '0', paddingTop: '100px' }}>
        <div className="iph-bg">
          <div className="iph-orb iph-orb1" />
          <div className="iph-orb iph-orb2" />
        </div>
        <div className="container">
          <div className="docs-hero-inner">
            <div className="eyebrow">Documentation</div>
            <h1 className="iph-title" style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: '16px' }}>
              BaseBox <span>Docs</span>
            </h1>
            <p className="iph-desc" style={{ marginBottom: '28px' }}>
              Everything you need to duplicate, customize, and launch your AI SaaS in 60 minutes.
            </p>
            <div className="docs-search-bar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              <input placeholder="Search documentation…" />
              <kbd>⌘K</kbd>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <div style={{ borderBottom: '1.5px solid var(--border)', background: 'var(--bg2)' }}>
        <div className="container">
          <div className="docs-quick-links">
            {[
              { icon: '⚡', label: 'Quick Start', sub: '5 min setup' },
              { icon: '🎨', label: 'Customization', sub: 'Colors & fonts' },
              { icon: '📄', label: 'Pages Guide', sub: 'All 12 pages' },
              { icon: '🚀', label: 'Deployment', sub: 'Go live fast' },
            ].map((link) => (
              <button
                key={link.label}
                className="docs-quick-link"
                onClick={() => setActiveSection(link.label === 'Quick Start' ? 'Quick Start' : link.label === 'Customization' ? 'Colors & Tokens' : link.label === 'Pages Guide' ? 'Home Page' : 'Publishing to Framer')}
              >
                <span className="docs-quick-icon">{link.icon}</span>
                <div>
                  <div className="docs-quick-label">{link.label}</div>
                  <div className="docs-quick-sub">{link.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="container">
        <div className="docs-layout">
          {/* Sidebar */}
          <aside className="docs-sidebar">
            <div className="docs-sidebar-inner">
              {docSections.map((section) => (
                <div key={section.label} className="docs-nav-section">
                  <button
                    className="docs-nav-group-btn"
                    onClick={() => toggleSection(section.label)}
                  >
                    {section.label}
                    <svg
                      width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      style={{ transform: expandedSections.includes(section.label) ? 'rotate(180deg)' : 'none', transition: '0.2s' }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {expandedSections.includes(section.label) && (
                    <div className="docs-nav-items">
                      {section.items.map((item) => (
                        <button
                          key={item}
                          className={`docs-nav-item${activeSection === item ? ' active' : ''}`}
                          onClick={() => setActiveSection(item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* Content */}
          <main className="docs-content">
            {activeSection === 'Quick Start' && (
              <div>
                <div className="docs-content-header an">
                  <div className="docs-badge">Getting Started</div>
                  <h1 className="docs-content-title">Quick Start</h1>
                  <p className="docs-content-lead">
                    Get BaseBox running in your Framer workspace in under 5 minutes.
                    No code required for Framer — use the dev setup below only if you want to customize
                    the React source.
                  </p>
                </div>

                <div className="docs-step-list">
                  {[
                    {
                      n: '1',
                      title: 'Get your copy',
                      body: 'Purchase BaseBox from the Framer marketplace or from basebox.ai. You\'ll receive an instant email with your template link.',
                    },
                    {
                      n: '2',
                      title: 'Duplicate to your workspace',
                      body: 'Click the template link → "Duplicate" in Framer. The complete site — all 12 pages — appears in your workspace instantly.',
                    },
                    {
                      n: '3',
                      title: 'Replace placeholder content',
                      body: 'Update the hero headline, feature descriptions, pricing, testimonials, and your logo. Use Framer\'s Click-to-Edit mode for speed.',
                    },
                    {
                      n: '4',
                      title: 'Connect your domain & publish',
                      body: 'Add your custom domain in Framer\'s settings, then hit Publish. Your AI SaaS site is live.',
                    },
                  ].map((step) => (
                    <div key={step.n} className="docs-step an">
                      <div className="docs-step-num">{step.n}</div>
                      <div className="docs-step-body">
                        <div className="docs-step-title">{step.title}</div>
                        <div className="docs-step-text">{step.body}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="docs-h2">Local development setup</h2>
                <p className="docs-p">If you prefer to edit the React source directly:</p>
                <div className="docs-code-block an">
                  <div className="docs-code-header">
                    <span>Terminal</span>
                    <button className="docs-code-copy">Copy</button>
                  </div>
                  <pre>{CODE_VITE}</pre>
                </div>

                <div className="docs-callout docs-callout-info an">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
                  <div>
                    <strong>Framer vs React:</strong> Most customizations (copy, colors, images) are faster
                    in Framer's visual editor. Use the React source only for structural changes or custom integrations.
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'Colors & Tokens' && (
              <div>
                <div className="docs-content-header an">
                  <div className="docs-badge">Customization</div>
                  <h1 className="docs-content-title">Colors & Design Tokens</h1>
                  <p className="docs-content-lead">
                    All colors, spacing, shadows, and typography settings live in CSS custom properties.
                    Change your brand in one place and every component updates automatically.
                  </p>
                </div>
                <h2 className="docs-h2">Core color tokens</h2>
                <div className="docs-color-grid an">
                  {[
                    { name: '--indigo', hex: '#5b5bd6', label: 'Primary (indigo)' },
                    { name: '--sky', hex: '#0ea5e9', label: 'Accent (sky)' },
                    { name: '--emerald', hex: '#059669', label: 'Success (emerald)' },
                    { name: '--amber', hex: '#d97706', label: 'Warning (amber)' },
                    { name: '--rose', hex: '#e11d48', label: 'Danger (rose)' },
                    { name: '--t1', hex: '#0a0e1a', label: 'Heading text' },
                    { name: '--t2', hex: '#374151', label: 'Body text' },
                    { name: '--t3', hex: '#6b7280', label: 'Muted text' },
                  ].map((color) => (
                    <div key={color.name} className="docs-color-swatch">
                      <div className="docs-swatch-box" style={{ background: color.hex }} />
                      <div className="docs-swatch-name">{color.name}</div>
                      <div className="docs-swatch-hex">{color.hex}</div>
                      <div className="docs-swatch-label">{color.label}</div>
                    </div>
                  ))}
                </div>
                <div className="docs-code-block an">
                  <div className="docs-code-header"><span>src/index.css</span><button className="docs-code-copy">Copy</button></div>
                  <pre>{CODE_COLORS}</pre>
                </div>
              </div>
            )}

            {activeSection !== 'Quick Start' && activeSection !== 'Colors & Tokens' && (
              <div>
                <div className="docs-content-header an">
                  <div className="docs-badge">Documentation</div>
                  <h1 className="docs-content-title">{activeSection}</h1>
                  <p className="docs-content-lead">
                    Documentation for {activeSection} is coming soon. In the meantime, explore the
                    Quick Start guide to get up and running in minutes.
                  </p>
                </div>

                <h2 className="docs-h2">Component patterns</h2>
                <p className="docs-p">All BaseBox components follow a consistent pattern for scroll animations, section headers, and responsive layouts:</p>
                <div className="docs-code-block an">
                  <div className="docs-code-header"><span>JSX pattern</span><button className="docs-code-copy">Copy</button></div>
                  <pre>{CODE_COMPONENT}</pre>
                </div>

                <div className="docs-callout docs-callout-tip an">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  <div>
                    <strong>Need help?</strong> Check the{' '}
                    <button className="docs-inline-link" onClick={() => setActiveSection('Quick Start')}>Quick Start guide</button>{' '}
                    or reach out via the Framer marketplace support chat.
                  </div>
                </div>
              </div>
            )}

            {/* Page navigation */}
            <div className="docs-page-nav an">
              <button className="docs-page-nav-btn docs-page-nav-prev">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                Previous
              </button>
              <button className="docs-page-nav-btn docs-page-nav-next">
                Next
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
