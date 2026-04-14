import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const tocItems = [
  { id: 'intro', label: 'Why landing pages fail' },
  { id: 'hero', label: 'The hero section formula' },
  { id: 'social-proof', label: 'Social proof placement' },
  { id: 'pricing', label: 'Pricing that converts' },
  { id: 'demo', label: 'Interactive demo sections' },
  { id: 'cta', label: 'CTA design psychology' },
]

const relatedPosts = [
  { tag: 'Revenue', tagColor: '#059669', title: '5 Metrics Every AI SaaS Founder Should Track', author: 'Maya Chen', read: '8 min' },
  { tag: 'Launch', tagColor: '#0ea5e9', title: 'How We Hit $10K MRR in 60 Days', author: 'Jordan Park', read: '11 min' },
  { tag: 'Design', tagColor: '#d97706', title: 'Why Your Pricing Page Loses 40% of Signups', author: 'Sarah Williams', read: '7 min' },
]

function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const handler = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop || document.body.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return (
    <div className="reading-progress-bar">
      <div className="reading-progress-fill" style={{ width: `${progress}%` }} />
    </div>
  )
}

export default function BlogPostPage() {
  const [activeSection, setActiveSection] = useState('intro')

  return (
    <>
      <ReadingProgress />
      <div className="post-page">
        <div className="container">
          {/* Breadcrumb */}
          <div className="breadcrumb-bar" style={{ borderBottom: 'none', paddingTop: '32px', paddingLeft: 0, paddingRight: 0 }}>
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              <Link to="/blog">Blog</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              <span>The Complete Guide</span>
            </div>
          </div>

          {/* Post header */}
          <div className="post-header an">
            <div className="blog-tag" style={{ color: '#5b5bd6', background: 'rgba(91,91,214,0.1)', marginBottom: '20px' }}>Growth</div>
            <h1 className="post-title">The Complete Guide to AI SaaS Landing Pages That Convert</h1>
            <p className="post-subtitle">
              Most AI SaaS landing pages fail at the same five things. Here's what the top 1% do differently —
              and how to implement it in under a day.
            </p>
            <div className="post-meta-row">
              <div className="post-author-card">
                <div className="blog-avatar" style={{ background: '#5b5bd6' }}>A</div>
                <div>
                  <div className="post-author-name">Alex Kim</div>
                  <div className="post-author-title">Founder, FlowMind</div>
                </div>
              </div>
              <div className="post-meta-details">
                <span>Apr 5, 2026</span>
                <span className="post-meta-sep">·</span>
                <span>12 min read</span>
                <span className="post-meta-sep">·</span>
                <span>4.2K views</span>
              </div>
              <div className="post-share">
                <button className="post-share-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" /></svg>
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Layout */}
          <div className="post-layout">
            {/* Sidebar TOC */}
            <aside className="post-toc">
              <div className="post-toc-inner">
                <div className="post-toc-title">On this page</div>
                <ul className="post-toc-list">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <button
                        className={`post-toc-link${activeSection === item.id ? ' active' : ''}`}
                        onClick={() => setActiveSection(item.id)}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="post-toc-cta">
                  <div className="post-toc-cta-label">Get the full kit</div>
                  <Link to="/pricing" className="btn btn-g" style={{ fontSize: '12px', padding: '8px 16px', width: '100%', justifyContent: 'center' }}>
                    FlowMind — $49
                  </Link>
                </div>
              </div>
            </aside>

            {/* Content */}
            <article className="post-content">
              <div className="post-lead an">
                Most founders spend weeks designing their landing page, hire a copywriter, and still
                wonder why their conversion rate hovers around 1.2%. The problem isn't the design or
                even the copy — it's the structure. The wrong sections, in the wrong order, with the
                wrong intent.
              </div>

              <h2 id="intro" className="post-h2">Why AI SaaS landing pages fail</h2>
              <p className="post-p">
                AI SaaS products suffer from a fundamental communication problem: what they do is often
                abstract, the benefit is often delayed, and the competition is intense. A visitor lands
                on your page and in three seconds decides whether to stay or leave. If they can't
                immediately understand what you do and why it matters to them specifically, they leave.
              </p>
              <p className="post-p">
                The most common mistake is leading with features instead of outcomes. "AI-powered analytics
                dashboard" means nothing to a founder who just wants to stop losing customers. "Find your
                three biggest revenue leaks before your next invoice" means everything.
              </p>

              <div className="post-callout an">
                <div className="post-callout-icon">💡</div>
                <div>
                  <div className="post-callout-title">Key insight</div>
                  <div className="post-callout-text">
                    Visitors don't buy features — they buy futures. Your landing page should describe
                    the world after they use your product, not the mechanics of how it works.
                  </div>
                </div>
              </div>

              <h2 id="hero" className="post-h2">The hero section formula</h2>
              <p className="post-p">
                Your hero section needs to accomplish four things in under five seconds: communicate
                what you do (clarity), show who it's for (relevance), prove it works (credibility),
                and tell them what to do next (action). Most landing pages fail at all four.
              </p>
              <p className="post-p">
                The formula that works: <strong>verb + specific user + specific outcome + timeframe</strong>.
                Instead of "AI analytics for SaaS", try "Help your SaaS team reduce churn by 30% in 90 days."
                Every word is doing work. Every word answers a question the visitor didn't know they had.
              </p>

              <div className="post-code-block an">
                <div className="post-code-header">
                  <span>Hero copy formula</span>
                  <button className="post-code-copy">Copy</button>
                </div>
                <pre className="post-code">
{`[Action verb] your [specific user persona]
[Specific, measurable outcome]
in [timeframe] — [credibility hook].

Example:
"Help your SaaS founders reduce churn by 30% in 90 days —
join 500+ teams who've used FlowMind to ship faster."`}
                </pre>
              </div>

              <h2 id="social-proof" className="post-h2">Social proof placement</h2>
              <p className="post-p">
                Social proof is only effective when placed where doubt exists. Most pages put testimonials
                at the bottom — a graveyard of unconvincing quotes that nobody reads. The right placement
                is contextual: near the pricing section, directly below the headline, and inside the
                CTA area.
              </p>
              <p className="post-p">
                The three highest-converting forms of social proof are: customer logos (trust by
                association), specific outcome testimonials ("We went from $2K to $28K MRR"), and
                real-time metrics ("1,247 founders launched this week"). Use all three strategically.
              </p>

              <h2 id="pricing" className="post-h2">Pricing that converts</h2>
              <p className="post-p">
                The most common pricing page mistake is showing three identical-looking tiers with
                different price points and a list of features. This triggers comparison paralysis.
                Instead, design your pricing page to answer one question: "Which plan is right for me?"
              </p>
              <p className="post-p">
                The three-tier model works best when the middle tier is clearly differentiated as the
                "smart choice." Use anchoring: show an expensive tier first to make the middle tier
                feel affordable. Add urgency with real constraints. And always show what they'd pay
                to get the same result elsewhere.
              </p>

              <h2 id="demo" className="post-h2">Interactive demo sections</h2>
              <p className="post-p">
                The single highest-ROI addition to any AI SaaS landing page is an interactive demo.
                Visitors who interact with your AI convert at 3.2× the rate of those who don't. It's
                not magic — it's just that experience sells better than any copy you can write.
              </p>

              <h2 id="cta" className="post-h2">CTA design psychology</h2>
              <p className="post-p">
                Your CTA button text is doing more work than you think. "Get started" is neutral.
                "Start your free trial" implies risk. "Get instant access" implies speed and ease.
                The best CTAs are specific: "Get FlowMind — $49" outperforms "Buy now" by up to 40%
                because it answers the two questions visitors have: what am I getting, and how much
                is it?
              </p>

              {/* Author bio */}
              <div className="post-author-bio an">
                <div className="blog-avatar" style={{ background: '#5b5bd6', width: '52px', height: '52px', fontSize: '20px', flexShrink: 0 }}>A</div>
                <div>
                  <div className="post-bio-name">Alex Kim</div>
                  <div className="post-bio-title">Founder of FlowMind · 4× SaaS founder</div>
                  <div className="post-bio-desc">
                    Alex built four SaaS products from zero to revenue. He created FlowMind after
                    spending 3 months redesigning landing pages for early-stage founders and noticing
                    the same conversion problems over and over.
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="post-tags an">
                {['Landing Pages', 'Conversion', 'SaaS Growth', 'AI Products', 'Design'].map(tag => (
                  <span key={tag} className="post-tag">{tag}</span>
                ))}
              </div>
            </article>
          </div>

          {/* Related posts */}
          <div className="post-related">
            <h2 className="post-related-title an">More from the blog</h2>
            <div className="blog-grid blog-grid-3">
              {relatedPosts.map((post) => (
                <Link to="/blog/post" key={post.title} className="blog-card an">
                  <div className="blog-card-top">
                    <div className="blog-tag" style={{ color: post.tagColor, background: post.tagColor + '14' }}>{post.tag}</div>
                    <div className="blog-date-read">{post.read} read</div>
                  </div>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <div className="blog-meta" style={{ marginTop: 'auto' }}>
                    <div className="blog-avatar blog-avatar-sm" style={{ background: post.tagColor }}>{post.author[0]}</div>
                    <div className="blog-author">{post.author}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
