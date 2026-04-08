import { Link } from 'react-router-dom'

const blogPosts = [
  { tag: 'Growth', title: 'How We Hit $10K MRR in 60 Days', date: 'Apr 5', read: '8 min', color: '#5b5bd6' },
  { tag: 'Design', title: 'Dashboard Patterns Users Love', date: 'Mar 28', read: '5 min', color: '#059669' },
  { tag: 'Launch', title: 'The Zero-to-100 Users Playbook', date: 'Mar 19', read: '11 min', color: '#0ea5e9' },
]

const cmsFeatures = [
  { icon: '✍️', title: 'Visual content editor', desc: 'Write and format posts in Framer\'s built-in CMS editor. No markdown, no code — just click and type.' },
  { icon: '🗂️', title: 'Categories & tags', desc: 'Organize posts by category, add multiple tags, and filter by any combination. Works out of the box.' },
  { icon: '👤', title: 'Author profiles', desc: 'Each post links to an author with bio, photo, and social links. Multiple authors supported.' },
  { icon: '🔍', title: 'SEO-optimized structure', desc: 'Meta titles, descriptions, Open Graph images, canonical URLs — all managed per-post in the CMS.' },
  { icon: '📡', title: 'RSS feed built in', desc: 'Automatic RSS feed for every blog so readers can subscribe with their favorite reader app.' },
  { icon: '🖼️', title: 'Rich media support', desc: 'Images, videos, code blocks, callouts — all supported in the editor with zero configuration.' },
]

export default function FeatureCMS() {
  return (
    <div className="feat-detail-page">
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <Link to="/features">Features</Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span>Blog & CMS</span>
          </div>
        </div>
      </div>

      <section className="fd-hero">
        <div className="container">
          <div className="fd-hero-inner">
            <div className="fd-hero-text an">
              <div className="screen-badge">Blog & CMS</div>
              <h1 className="fd-hero-title">
                Publish content without<br /><span>touching a line of code</span>
              </h1>
              <p className="fd-hero-desc">
                Content marketing is the highest-ROI growth channel for early SaaS. BaseBox gives you
                a full blog system — Framer CMS powers the content, the design stays perfect automatically,
                and you ship articles in minutes. SEO-friendly from post one.
              </p>
              <div className="fd-hero-stats">
                <div className="fd-stat">
                  <div className="fd-stat-v">7×</div>
                  <div className="fd-stat-l">More leads from organic content</div>
                </div>
                <div className="fd-stat">
                  <div className="fd-stat-v">0</div>
                  <div className="fd-stat-l">Lines of code to publish</div>
                </div>
                <div className="fd-stat">
                  <div className="fd-stat-v">100%</div>
                  <div className="fd-stat-l">SEO-optimized structure</div>
                </div>
              </div>
            </div>
            <div className="fd-hero-demo an">
              {/* Blog preview mockup */}
              <div className="cms-preview-frame">
                <div className="feat-mock-header">
                  <div className="feat-mock-dots"><span /><span /><span /></div>
                  <div className="feat-mock-url">your-ai-saas.com/blog</div>
                </div>
                <div className="cms-preview-body">
                  <div className="cms-preview-header">
                    <div className="cms-preview-title">Blog</div>
                    <div className="cms-preview-sub">Insights, tutorials, and product updates</div>
                    <div className="cms-preview-cats">
                      <span className="cms-cat active">All</span>
                      <span className="cms-cat">Growth</span>
                      <span className="cms-cat">Design</span>
                      <span className="cms-cat">Launch</span>
                    </div>
                  </div>
                  <div className="cms-preview-posts">
                    {blogPosts.map((post) => (
                      <div key={post.title} className="cms-preview-post">
                        <div className="cms-post-tag" style={{ color: post.color, background: post.color + '14' }}>{post.tag}</div>
                        <div className="cms-post-title">{post.title}</div>
                        <div className="cms-post-meta">{post.date} · {post.read} read</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="fh an">
            <div className="eyebrow">CMS Features</div>
            <h2 className="st">Everything your blog <span>needs to rank and grow</span></h2>
          </div>
          <div className="feat-grid">
            {cmsFeatures.map((item) => (
              <div key={item.title} className="feat-card an">
                <div className="feat-card-icon">{item.icon}</div>
                <div className="feat-card-title">{item.title}</div>
                <div className="feat-card-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="fd-benefits-grid">
            <div className="fd-benefits-text an">
              <div className="eyebrow">Why Content Marketing Wins</div>
              <h2 className="st">Your blog is your<br /><span>best sales rep</span></h2>
              <p className="sd" style={{ maxWidth: 'none' }}>
                A single well-ranked article can drive hundreds of qualified signups every month — for years.
                Every AI SaaS founder who invests in content early sees compounding returns that paid ads
                can't match. BaseBox removes every friction point between you and publishing.
              </p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
                <Link to="/blog" className="btn btn-g">View Blog Example</Link>
                <Link to="/pricing" className="btn btn-o">Get Template — $49</Link>
              </div>
            </div>
            <div className="fd-benefits-list">
              {[
                { title: 'No developer required', desc: 'Framer CMS gives you a visual editor that any non-technical founder can use from day one.' },
                { title: 'Design never breaks', desc: 'New posts automatically inherit your typography, spacing, and brand. Every article looks identical.' },
                { title: 'Built-in SEO controls', desc: 'Set meta titles, descriptions, and OG images per post. Google sees exactly what you want.' },
                { title: 'Scales with your team', desc: 'Add multiple authors and editors. Manage drafts, schedule posts, and track revision history.' },
                { title: 'Fast-loading pages', desc: 'Framer generates static pages for each post. Sub-1s load times mean better rankings and lower bounce.' },
              ].map((b) => (
                <div key={b.title} className="fd-benefit-item an">
                  <div className="fd-benefit-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <div>
                    <div className="fd-benefit-title">{b.title}</div>
                    <div className="fd-benefit-desc">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ctas">
        <div className="container">
          <div className="ctab">
            <div className="eyebrow">Start Publishing</div>
            <h2 className="st">Your first article could go live<br /><span>within the hour</span></h2>
            <p className="sd" style={{ margin: '0 auto 36px' }}>Blog included in Pro and Team plans.</p>
            <div className="ctac">
              <Link to="/pricing" className="ctab-cta-btn">
                Get BaseBox — from $49
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/blog" className="btn btn-o">See Blog Example</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
