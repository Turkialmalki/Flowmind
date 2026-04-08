const cards = [
  {
    iconBg: 'var(--indigo-g)',
    iconColor: 'var(--indigo)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      </svg>
    ),
    title: 'AI Startup Founders',
    desc: "Look like a funded startup before you've raised a dollar. Launch a site that earns trust instantly — while you focus on building the product.",
  },
  {
    iconBg: 'rgba(217,119,6,0.08)',
    iconColor: 'var(--amber)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Indie Hackers',
    desc: 'Stop overthinking design. Ship your idea this weekend, start collecting signups Monday, and iterate based on real user feedback — not hypotheticals.',
  },
  {
    iconBg: 'var(--sky-g)',
    iconColor: 'var(--sky)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'SaaS Developers',
    desc: "You built the product. BaseBox handles everything users see before they log in. Go live without touching Figma or hiring a designer.",
  },
  {
    iconBg: 'var(--emerald-bg)',
    iconColor: 'var(--emerald)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.477-1.125-.29-.289-.459-.683-.459-1.187 0-.944.765-1.71 1.71-1.71h2.018c3.159 0 5.71-2.55 5.71-5.71C22 6.047 17.523 2 12 2z" />
        <circle cx="7" cy="11.5" r="0.5" fill="currentColor" />
        <circle cx="12" cy="7.5" r="0.5" fill="currentColor" />
        <circle cx="17" cy="11.5" r="0.5" fill="currentColor" />
      </svg>
    ),
    title: 'No-Code Builders',
    desc: "Drag, drop, customize. Edit every word, color, and image in Framer's visual editor. Zero developers. Zero code. Just your product, live.",
  },
]

export default function WhoSection() {
  return (
    <section
      className="section"
      id="who"
      style={{ paddingTop: 0, background: 'var(--bg2)', paddingBottom: '100px' }}
    >
      <div className="container">
        <div className="fh an">
          <div className="eyebrow">Who Is This For</div>
          <h2 className="st">
            Built for builders who <span>ship fast</span>
          </h2>
          <p className="sd">
            If you're launching an AI product and can't afford to spend weeks on a website —
            BaseBox is your unfair advantage.
          </p>
        </div>
        <div className="wh-grid">
          {cards.map((c) => (
            <div className="wh-card an" key={c.title}>
              <div className="wh-ic" style={{ background: c.iconBg, color: c.iconColor }}>
                {c.icon}
              </div>
              <div className="wh-t">{c.title}</div>
              <div className="wh-d">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
