function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

const items = [
  {
    title: '6 Production-Ready Marketing Pages',
    desc: 'Home, Features, Pricing, Blog (CMS), About, Contact — connected, responsive, and ready to publish today.',
  },
  {
    title: 'Full Dashboard UI Kit',
    desc: 'Analytics cards, charts, sidebar nav, activity feed — a complete product dashboard your users log into every day.',
  },
  {
    title: 'Auth Screens (Login, Signup, Reset)',
    desc: 'Conversion-optimized auth flows with social login buttons. Reduce sign-up friction from the very first click.',
  },
  {
    title: 'Settings & Profile Screens',
    desc: 'User preferences, notifications, billing, and API key management — all designed and wired up. Skip weeks of UI work.',
  },
  {
    title: 'Empty States for Every Screen',
    desc: 'On-brand empty state designs that guide new users to their first action. Polished product experience from day one.',
  },
  {
    title: 'AI SaaS Copywriting Built In',
    desc: 'Every headline, CTA, and feature description is written for AI products. Not filler copy you\'ll need to rewrite from scratch.',
  },
  {
    title: 'Framer CMS Integration',
    desc: 'Blog posts, team members, and changelogs powered by Framer CMS. Add content without touching the design — ever.',
  },
  {
    title: 'Lifetime Free Updates',
    desc: 'Every new screen, section, and design improvement ships to your template automatically. Buy once, stay current forever.',
  },
]

export default function ValueStack() {
  return (
    <section className="section" style={{ paddingTop: '100px' }}>
      <div className="container">
        <div className="fh an">
          <div className="eyebrow">What's Included</div>
          <h2 className="st">
            One purchase. <span>Everything you need.</span>
          </h2>
          <p className="sd">
            No hunting for pieces. No stitching templates together. One purchase — the complete
            FlowMind kit, ready to ship.
          </p>
        </div>
        <div className="vs-grid">
          {items.map((item) => (
            <div className="vs-item an" key={item.title}>
              <div className="vs-check"><CheckIcon /></div>
              <div>
                <div className="vs-t">{item.title}</div>
                <div className="vs-d">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
