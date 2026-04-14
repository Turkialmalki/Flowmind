import { useState } from 'react'
import { Link } from 'react-router-dom'

const releases = [
  {
    version: 'v2.4.0',
    date: 'April 5, 2026',
    tag: 'Major Release',
    tagColor: 'var(--indigo)',
    highlight: 'Full SaaS system expansion — 7 new pages, 3-dropdown navigation, and complete dashboard upgrade.',
    changes: {
      added: [
        'Advanced 3-dropdown navigation (Product, Resources, Company)',
        'AI Demo page with live interactive chat simulation',
        'CMS & Blog explanation page',
        'Setup Guide with step-by-step onboarding',
        'Changelog page with timeline UI (this page!)',
        'Live Demo interactive preview page',
        'License & Privacy pages',
        'Page transition animations (fade + slide)',
        'Dashboard Reports view with KPI cards',
      ],
      improved: [
        'Nav dropdowns now support hover + click on all screen sizes',
        'Mobile menu redesigned with grouped sections and footer CTA',
        'Dashboard activity feed now updates every 5 seconds live',
        'Micro-interactions upgraded across all card components',
      ],
      fixed: [
        'Nav hidden state now resets correctly on route change',
        'Pricing toggle no longer flickers on first load',
        'Blog page category filter preserves scroll position',
      ],
    },
  },
  {
    version: 'v2.3.0',
    date: 'March 18, 2026',
    tag: 'Feature Release',
    tagColor: 'var(--sky)',
    highlight: 'Documentation system, pricing upgrade, and blog polish.',
    changes: {
      added: [
        'Documentation page with sidebar navigation',
        'Code syntax highlighting with copy button',
        'Color swatch grid in docs',
        'FAQ section on Pricing page',
        'Annual/monthly pricing toggle',
        'BlogPostPage with full article layout',
      ],
      improved: [
        'Pricing cards — better visual hierarchy and feature comparison',
        'Blog grid — featured post spotlight',
        'Footer — added sitemap links and social icons',
      ],
      fixed: [
        'Fixed scroll reveal animation causing layout shift on iOS',
        'Pricing toggle state now persists across navigation',
      ],
    },
  },
  {
    version: 'v2.2.0',
    date: 'February 24, 2026',
    tag: 'Feature Release',
    tagColor: 'var(--emerald)',
    highlight: 'Dashboard phase 2 — revenue analytics, user table, and settings.',
    changes: {
      added: [
        'Dashboard Revenue view with MRR breakdown',
        'Dashboard Settings view with toggle switches',
        'User management table with sortable columns',
        'Status badges (active, trial, churned)',
        'Row hover highlight on user table',
        'Count-up animation on stat cards',
      ],
      improved: [
        'Dashboard sidebar — collapsible on mobile',
        'Chart animation now triggers on timeframe switch',
        'Activity feed — new events prepend with fade-in animation',
      ],
      fixed: [
        'Dashboard sidebar no longer overlaps content on tablets',
      ],
    },
  },
  {
    version: 'v2.1.0',
    date: 'January 30, 2026',
    tag: 'Feature Release',
    tagColor: '#7c3aed',
    highlight: 'Auth system, scroll-reveal engine, and design token system.',
    changes: {
      added: [
        'Login page with Google/GitHub OAuth simulation',
        'Signup page with multi-step onboarding',
        'Password strength indicator',
        'Scroll reveal animation system (IntersectionObserver)',
        'Full design token system in index.css',
        'Urgency bar component',
      ],
      improved: [
        'Hero section — floating mockup cards added',
        'Testimonials — avatar system with real initials',
        'Social proof strip — animated counters',
      ],
      fixed: [
        'Scroll-to-section anchors now respect sticky nav height',
        'Mobile hero layout fixed on 320px screens',
      ],
    },
  },
  {
    version: 'v2.0.0',
    date: 'January 8, 2026',
    tag: 'Major Release',
    tagColor: 'var(--amber)',
    highlight: 'Complete rewrite — React + Vite, component system, and initial page suite.',
    changes: {
      added: [
        'Full migration from static HTML to React + Vite',
        'HashRouter for GitHub Pages compatibility',
        'Layout system with shared Nav and Footer',
        'Home page with all landing sections',
        'Features page with interactive showcase',
        'Dashboard UI preview page',
        'AI Demo feature page',
        'Blog page with category filtering',
        'Pricing page with 3-tier plans',
      ],
      improved: [
        'Complete visual redesign — lighter, more premium aesthetic',
        'Typography upgraded to Sora + Inter',
      ],
      fixed: [],
    },
  },
]

export default function ChangelogPage() {
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState({ 0: true })

  const toggleExpanded = (i) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))

  const filtered = filter === 'all' ? releases : releases.filter(r => r.tag.toLowerCase().includes(filter))

  return (
    <div className="changelog-page">
      {/* Hero */}
      <section className="iph" style={{ paddingBottom: '60px' }}>
        <div className="iph-bg">
          <div className="iph-orb iph-orb1" />
          <div className="iph-orb iph-orb2" />
          <div className="iph-grid" />
        </div>
        <div className="container">
          <div className="iph-inner" style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow">Changelog</div>
            <h1 className="iph-title">
              We ship <span>every week</span>
            </h1>
            <p className="iph-desc" style={{ margin: '0 auto 32px' }}>
              Every update to FlowMind is documented here. New pages, design improvements, bug fixes — all tracked and explained.
            </p>
            <div className="cl-filter-bar">
              {[
                { id: 'all', label: 'All updates' },
                { id: 'major', label: 'Major' },
                { id: 'feature', label: 'Features' },
              ].map(f => (
                <button
                  key={f.id}
                  className={`cl-filter-btn${filter === f.id ? ' active' : ''}`}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ paddingTop: '0', background: 'var(--bg2)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div className="cl-timeline">
            {filtered.map((release, i) => (
              <div key={release.version} className="cl-entry an">
                {/* Timeline connector */}
                <div className="cl-connector">
                  <div className="cl-dot" style={{ background: release.tagColor }} />
                  {i < filtered.length - 1 && <div className="cl-line" />}
                </div>

                <div className="cl-card">
                  <div className="cl-card-header" onClick={() => toggleExpanded(i)}>
                    <div className="cl-card-top">
                      <div className="cl-version-wrap">
                        <span className="cl-version">{release.version}</span>
                        <span className="cl-tag" style={{ background: release.tagColor + '18', color: release.tagColor }}>
                          {release.tag}
                        </span>
                      </div>
                      <span className="cl-date">{release.date}</span>
                    </div>
                    <p className="cl-highlight">{release.highlight}</p>
                    <button className="cl-toggle">
                      {expanded[i] ? 'Collapse' : 'View changes'}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        style={{ transform: expanded[i] ? 'rotate(180deg)' : 'none', transition: '0.2s' }}>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  </div>

                  {expanded[i] && (
                    <div className="cl-changes">
                      {release.changes.added.length > 0 && (
                        <div className="cl-group">
                          <div className="cl-group-label added">Added</div>
                          <ul className="cl-list">
                            {release.changes.added.map((item, j) => (
                              <li key={j}>
                                <span className="cl-bullet added">+</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {release.changes.improved.length > 0 && (
                        <div className="cl-group">
                          <div className="cl-group-label improved">Improved</div>
                          <ul className="cl-list">
                            {release.changes.improved.map((item, j) => (
                              <li key={j}>
                                <span className="cl-bullet improved">↑</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {release.changes.fixed.length > 0 && (
                        <div className="cl-group">
                          <div className="cl-group-label fixed">Fixed</div>
                          <ul className="cl-list">
                            {release.changes.fixed.map((item, j) => (
                              <li key={j}>
                                <span className="cl-bullet fixed">✕</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe nudge */}
      <section className="section">
        <div className="container" style={{ maxWidth: '560px' }}>
          <div className="cl-subscribe an">
            <div className="cl-subscribe-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h3 className="cl-subscribe-title">Get notified on new releases</h3>
            <p className="cl-subscribe-desc">Every FlowMind update ships to your inbox. No spam — just release notes.</p>
            <div className="cl-subscribe-form">
              <input className="cl-subscribe-input" type="email" placeholder="you@startup.com" />
              <button className="btn btn-p" style={{ borderRadius: '10px' }}>Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
