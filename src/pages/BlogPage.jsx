import { useState } from 'react'
import { Link } from 'react-router-dom'

const categories = ['All', 'Growth', 'Design', 'Launch', 'Product', 'Revenue']

const posts = [
  {
    tag: 'Growth',
    tagColor: '#5b5bd6',
    title: 'The Complete Guide to AI SaaS Landing Pages That Convert',
    excerpt: 'Most AI SaaS landing pages fail at the same five things. Here\'s what the top 1% do differently — and how to implement it in under a day.',
    author: 'Alex Kim',
    date: 'Apr 5, 2026',
    read: '12 min',
    featured: true,
    avatar: '#5b5bd6',
  },
  {
    tag: 'Revenue',
    tagColor: '#059669',
    title: '5 Metrics Every AI SaaS Founder Should Track From Day One',
    excerpt: 'MRR is obvious. But these five signals — tracked from launch — are what separates growing SaaS from stagnant ones.',
    author: 'Maya Chen',
    date: 'Apr 2, 2026',
    read: '8 min',
    avatar: '#059669',
  },
  {
    tag: 'Launch',
    tagColor: '#0ea5e9',
    title: 'How We Hit $10K MRR in 60 Days Using BaseBox',
    excerpt: 'A step-by-step breakdown of our launch: what we shipped first, which pages converted best, and the one change that 3×\'d our trial-to-paid rate.',
    author: 'Jordan Park',
    date: 'Mar 28, 2026',
    read: '11 min',
    avatar: '#0ea5e9',
  },
  {
    tag: 'Design',
    tagColor: '#d97706',
    title: 'Why Your SaaS Pricing Page is Losing You 40% of Signups',
    excerpt: 'The psychological levers that move visitors from "maybe" to "buy" — and which pricing page patterns actively hurt conversions.',
    author: 'Sarah Williams',
    date: 'Mar 22, 2026',
    read: '7 min',
    avatar: '#d97706',
  },
  {
    tag: 'Product',
    tagColor: '#e11d48',
    title: 'Dashboard Design Patterns That Users Actually Love',
    excerpt: 'Six dashboard UI principles from 200+ SaaS products — including the navigation anti-patterns that kill retention in the first week.',
    author: 'Chris Patel',
    date: 'Mar 19, 2026',
    read: '9 min',
    avatar: '#e11d48',
  },
  {
    tag: 'Growth',
    tagColor: '#5b5bd6',
    title: 'The Psychology of Social Proof in B2B SaaS',
    excerpt: 'Not all testimonials convert equally. Understanding the placement, format, and specificity that makes social proof irresistible.',
    author: 'Emma Rodriguez',
    date: 'Mar 14, 2026',
    read: '6 min',
    avatar: '#7c7ce8',
  },
  {
    tag: 'Launch',
    tagColor: '#0ea5e9',
    title: 'From Zero to 100 Users: A Launch Day Playbook',
    excerpt: 'The exact sequence of channels, messages, and timing we use to get the first 100 users before spending a dollar on ads.',
    author: 'Alex Kim',
    date: 'Mar 8, 2026',
    read: '14 min',
    avatar: '#5b5bd6',
  },
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const featured = posts[0]
  const rest = posts.slice(1)

  const filtered = activeCategory === 'All' ? rest : rest.filter(p => p.tag === activeCategory)

  return (
    <div className="blog-page">
      {/* Header */}
      <section className="iph" style={{ paddingBottom: '60px' }}>
        <div className="iph-bg">
          <div className="iph-orb iph-orb1" />
          <div className="iph-orb iph-orb2" />
          <div className="iph-grid" />
        </div>
        <div className="container">
          <div className="iph-inner">
            <div className="eyebrow">Blog</div>
            <h1 className="iph-title">
              Insights for <span>AI SaaS founders</span>
            </h1>
            <p className="iph-desc">
              Growth tactics, design patterns, launch playbooks, and everything in between.
              Written by founders who've shipped, failed, and figured it out.
            </p>
          </div>
        </div>
      </section>

      {/* Featured post */}
      <div className="container" style={{ marginBottom: '0' }}>
        <Link to="/blog/post" className="blog-featured an">
          <div className="blog-featured-content">
            <div className="blog-tag" style={{ color: featured.tagColor, background: featured.tagColor + '14' }}>{featured.tag}</div>
            <h2 className="blog-featured-title">{featured.title}</h2>
            <p className="blog-featured-excerpt">{featured.excerpt}</p>
            <div className="blog-meta">
              <div className="blog-avatar" style={{ background: featured.avatar }}>{featured.author[0]}</div>
              <div>
                <div className="blog-author">{featured.author}</div>
                <div className="blog-date-read">{featured.date} · {featured.read} read</div>
              </div>
              <div className="blog-read-link">
                Read article
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </div>
          </div>
          <div className="blog-featured-visual">
            <div className="blog-featured-bg" />
            <div className="blog-featured-card">
              <div className="blog-featured-card-tag">Featured</div>
              <div className="blog-featured-card-lines">
                <div className="bcl bcl-lg" />
                <div className="bcl bcl-md" />
                <div className="bcl bcl-sm" />
                <div className="bcl bcl-md" />
                <div className="bcl bcl-lg" />
                <div className="bcl bcl-sm" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Category filter + Posts */}
      <section className="section" style={{ paddingTop: '56px' }}>
        <div className="container">
          <div className="blog-cats an">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`blog-cat-btn${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="blog-grid">
            {filtered.map((post) => (
              <Link to="/blog/post" key={post.title} className="blog-card an">
                <div className="blog-card-top">
                  <div className="blog-tag" style={{ color: post.tagColor, background: post.tagColor + '14' }}>{post.tag}</div>
                  <div className="blog-date-read">{post.read} read</div>
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-meta">
                  <div className="blog-avatar blog-avatar-sm" style={{ background: post.avatar }}>{post.author[0]}</div>
                  <div>
                    <div className="blog-author">{post.author}</div>
                    <div className="blog-date-read">{post.date}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="blog-empty">
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>📭</div>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>No posts in this category yet</div>
              <div style={{ color: 'var(--t3)' }}>Check back soon — we publish weekly.</div>
              <button className="btn btn-o" style={{ marginTop: '20px' }} onClick={() => setActiveCategory('All')}>View all posts</button>
            </div>
          )}

          {filtered.length > 0 && (
            <div className="blog-load-more an">
              <button className="btn btn-o">Load more articles</button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section style={{ background: 'var(--bg2)', borderTop: '1.5px solid var(--border)', borderBottom: '1.5px solid var(--border)', padding: '72px 0' }}>
        <div className="container">
          <div className="blog-newsletter an">
            <div className="blog-newsletter-text">
              <div className="eyebrow">Newsletter</div>
              <h2 className="st">Get the best content, <span>weekly in your inbox</span></h2>
              <p className="sd">One email per week. Launch tactics, design patterns, and real founder stories. No fluff.</p>
            </div>
            <div className="blog-newsletter-form">
              <input type="email" className="blog-email-input" placeholder="you@startup.com" />
              <button className="btn btn-g">Subscribe — it's free</button>
              <div className="blog-newsletter-note">No spam. Unsubscribe anytime.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
