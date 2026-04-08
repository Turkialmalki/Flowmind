import { useState } from 'react'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    color: 'var(--indigo)',
    bg: 'var(--indigo-g)',
    title: 'Visual Editor',
    desc: 'Click-to-edit everything. Change text, images, and layouts directly in the browser — no code required.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    color: 'var(--sky)',
    bg: 'var(--sky-g)',
    title: 'SEO Built-in',
    desc: 'Every blog post gets its own meta title, description, Open Graph image, and structured data — automatically.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
    color: 'var(--emerald)',
    bg: 'var(--emerald-bg)',
    title: 'Dynamic Collections',
    desc: 'Manage blog posts, case studies, team members, and changelogs from a single CMS dashboard.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.08)',
    title: 'Multi-author',
    desc: 'Invite your team. Each author gets a profile page with their posts, bio, and avatar. Full editorial workflow.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    color: 'var(--amber)',
    bg: 'rgba(217,119,6,0.08)',
    title: 'Preview Mode',
    desc: 'See exactly what your post looks like before publishing. Share a preview link with stakeholders for review.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    color: 'var(--emerald)',
    bg: 'var(--emerald-bg)',
    title: 'Analytics Integration',
    desc: 'Connect to Plausible, Fathom, or Google Analytics. See which posts drive signups, not just traffic.',
  },
]

const SAMPLE_POSTS = [
  {
    tag: 'Growth',
    tagColor: '#5b5bd6',
    title: 'How We Hit $10K MRR in 60 Days',
    excerpt: 'The exact playbook — content strategy, pricing decisions, and the cold outreach system that made it happen.',
    author: 'Maya Chen',
    date: 'Apr 5, 2026',
    read: '8 min',
    img: '#5b5bd6',
  },
  {
    tag: 'Product',
    tagColor: '#059669',
    title: 'Why We Rewrote Our Onboarding from Scratch',
    excerpt: 'Our activation rate went from 24% to 61% after 3 changes. Here\'s what we learned and what we would do differently.',
    author: 'Jordan Park',
    date: 'Mar 28, 2026',
    read: '6 min',
    img: '#059669',
  },
  {
    tag: 'AI',
    tagColor: '#7c3aed',
    title: 'The Real Cost of Building vs Buying AI Infrastructure',
    excerpt: 'We calculated it. 18 months of engineering time versus a $49 template. The math is not even close.',
    author: 'Alex Kim',
    date: 'Mar 20, 2026',
    read: '10 min',
    img: '#7c3aed',
  },
]

const categories = [
  { name: 'Blog Posts', count: 48, icon: '✍️' },
  { name: 'Case Studies', count: 12, icon: '📊' },
  { name: 'Changelogs', count: 24, icon: '🔄' },
  { name: 'Team Pages', count: 8, icon: '👥' },
  { name: 'Landing Pages', count: 6, icon: '🏠' },
  { name: 'Help Articles', count: 31, icon: '💡' },
]

export default function CMSPage() {
  const [activeTab, setActiveTab] = useState('blog')

  return (
    <div className="cms-page">
      {/* Hero */}
      <section className="iph">
        <div className="iph-bg">
          <div className="iph-orb iph-orb1" />
          <div className="iph-orb iph-orb2" />
          <div className="iph-grid" />
        </div>
        <div className="container">
          <div className="iph-inner" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow">CMS & Blog</div>
            <h1 className="iph-title">
              Publish content that <span>converts visitors</span>
            </h1>
            <p className="iph-desc" style={{ margin: '0 auto 36px' }}>
              BaseBox ships with a fully-configured CMS — blog, changelog, case studies, team pages, and help center.
              Write, publish, and grow without touching a line of code.
            </p>
            <div className="iph-actions" style={{ justifyContent: 'center' }}>
              <Link to="/pricing" className="btn btn-g btn-lg">Get BaseBox — $49</Link>
              <Link to="/blog" className="btn btn-o btn-lg">Read the Blog</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content type tabs */}
      <div className="cms-tabs-bar">
        <div className="container">
          <div className="cms-tabs">
            {[
              { id: 'blog', label: 'Blog' },
              { id: 'changelog', label: 'Changelog' },
              { id: 'docs', label: 'Help Center' },
            ].map(t => (
              <button
                key={t.id}
                className={`cms-tab${activeTab === t.id ? ' active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content preview */}
      <section className="section" style={{ paddingTop: '60px', background: 'var(--bg2)' }}>
        <div className="container">
          {activeTab === 'blog' && (
            <div className="cms-blog-preview an">
              <div className="cms-preview-header">
                <h2 className="cms-preview-title">Blog posts that rank and convert</h2>
                <p className="cms-preview-sub">Each post gets dedicated SEO settings, author profiles, tags, and related posts.</p>
              </div>
              <div className="cms-post-grid">
                {SAMPLE_POSTS.map((post, i) => (
                  <div key={i} className="cms-post-card">
                    <div className="cms-post-img" style={{ background: `linear-gradient(135deg, ${post.img}22, ${post.img}44)` }}>
                      <span className="cms-post-tag" style={{ background: post.tagColor + '18', color: post.tagColor }}>{post.tag}</span>
                    </div>
                    <div className="cms-post-body">
                      <h3 className="cms-post-title">{post.title}</h3>
                      <p className="cms-post-excerpt">{post.excerpt}</p>
                      <div className="cms-post-meta">
                        <div className="cms-post-avatar" style={{ background: post.tagColor }} />
                        <span>{post.author}</span>
                        <span className="cms-post-dot">·</span>
                        <span>{post.date}</span>
                        <span className="cms-post-dot">·</span>
                        <span>{post.read} read</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'changelog' && (
            <div className="cms-changelog-preview an">
              <div className="cms-preview-header">
                <h2 className="cms-preview-title">Keep users in the loop with a changelog</h2>
                <p className="cms-preview-sub">Show users you're always shipping. Each update builds trust and reduces churn.</p>
              </div>
              <div className="cms-cl-list">
                {[
                  { version: 'v2.4.0', date: 'Apr 5, 2026', tag: 'Major', tagColor: '#5b5bd6', items: ['New Dashboard Analytics view with funnel tracking', 'AI Demo page with multi-model support', '3-dropdown navigation system', 'Page transition animations'] },
                  { version: 'v2.3.0', date: 'Mar 18, 2026', tag: 'Feature', tagColor: '#059669', items: ['CMS & Blog system with SEO settings', 'Setup Guide onboarding flow', 'Mobile menu redesign'] },
                  { version: 'v2.2.1', date: 'Feb 28, 2026', tag: 'Fix', tagColor: '#d97706', items: ['Fixed nav hiding on mobile scroll', 'Improved pricing table accessibility', 'Dark mode contrast improvements'] },
                ].map((entry, i) => (
                  <div key={i} className="cms-cl-entry">
                    <div className="cms-cl-meta">
                      <span className="cms-cl-version">{entry.version}</span>
                      <span className="cms-cl-tag" style={{ background: entry.tagColor + '18', color: entry.tagColor }}>{entry.tag}</span>
                      <span className="cms-cl-date">{entry.date}</span>
                    </div>
                    <ul className="cms-cl-items">
                      {entry.items.map((item, j) => (
                        <li key={j}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'docs' && (
            <div className="cms-docs-preview an">
              <div className="cms-preview-header">
                <h2 className="cms-preview-title">Self-service help center</h2>
                <p className="cms-preview-sub">Reduce support tickets with a searchable knowledge base. Powered by the same CMS.</p>
              </div>
              <div className="cms-docs-grid">
                {[
                  { icon: '⚡', title: 'Getting Started', articles: 8, desc: 'Quick setup, first login, workspace config' },
                  { icon: '📊', title: 'Analytics & Reporting', articles: 12, desc: 'Dashboard, charts, exports, custom metrics' },
                  { icon: '🔗', title: 'Integrations', articles: 24, desc: 'Slack, Zapier, Stripe, Intercom, and more' },
                  { icon: '💳', title: 'Billing & Plans', articles: 6, desc: 'Upgrades, invoices, seat management' },
                  { icon: '🔐', title: 'Security & Auth', articles: 9, desc: 'SSO, 2FA, API keys, team roles' },
                  { icon: '🛠️', title: 'API Reference', articles: 32, desc: 'REST endpoints, webhooks, rate limits' },
                ].map((cat, i) => (
                  <div key={i} className="cms-docs-cat an">
                    <div className="cms-docs-cat-icon">{cat.icon}</div>
                    <h3 className="cms-docs-cat-title">{cat.title}</h3>
                    <p className="cms-docs-cat-desc">{cat.desc}</p>
                    <div className="cms-docs-cat-count">{cat.articles} articles</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features grid */}
      <section className="section">
        <div className="container">
          <div className="fh an" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="eyebrow">CMS Features</div>
            <h2 className="st">Content management <span>done right</span></h2>
          </div>
          <div className="cms-features-grid">
            {features.map((f) => (
              <div key={f.title} className="cms-feature-card an">
                <div className="cms-feature-icon" style={{ background: f.bg, color: f.color }}>
                  {f.icon}
                </div>
                <h3 className="cms-feature-title">{f.title}</h3>
                <p className="cms-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content types overview */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="fh an" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="eyebrow">Content Types</div>
            <h2 className="st">Manage everything <span>from one place</span></h2>
          </div>
          <div className="cms-cats-grid">
            {categories.map((cat) => (
              <div key={cat.name} className="cms-cat-item an">
                <span className="cms-cat-icon">{cat.icon}</span>
                <div className="cms-cat-name">{cat.name}</div>
                <div className="cms-cat-count">{cat.count} included</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ctas">
        <div className="container">
          <div className="ctab">
            <div className="eyebrow">Included in BaseBox</div>
            <h2 className="st">Full CMS, zero monthly fees.<br /><span>Just one payment.</span></h2>
            <p className="sd" style={{ margin: '0 auto 36px' }}>
              Blog, changelog, help center, team pages — all powered by your own CMS. Publish without developers.
            </p>
            <div className="ctac">
              <Link to="/pricing" className="ctab-cta-btn">
                Get BaseBox — $49
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/blog" className="btn btn-o">See it Live</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
