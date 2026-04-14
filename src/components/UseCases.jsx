const cases = [
  {
    iconBg: 'var(--indigo-g)',
    iconColor: 'var(--indigo)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),
    title: 'AI Chatbot Tools',
    desc: 'Interactive demo section lets visitors try your bot before they sign up — turning curiosity into paying customers in one scroll.',
  },
  {
    iconBg: 'var(--sky-g)',
    iconColor: 'var(--sky)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    title: 'AI Analytics Dashboards',
    desc: 'The dashboard mockup section shows your product in action. Visitors understand the value before reading a single word of copy.',
  },
  {
    iconBg: 'var(--emerald-bg)',
    iconColor: 'var(--emerald)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    title: 'AI Content Generators',
    desc: 'Feature bento highlights output quality, use cases, and speed. Build trust before the signup click — then back it up with the demo section.',
  },
  {
    iconBg: 'rgba(217,119,6,0.08)',
    iconColor: 'var(--amber)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'AI Automation Startups',
    desc: 'The how-it-works section breaks complex workflows into three clear visual steps that any non-technical visitor can follow immediately.',
  },
]

export default function UseCases() {
  return (
    <section className="section" style={{ paddingTop: '60px' }} id="use-cases">
      <div className="container">
        <div className="fh an">
          <div className="eyebrow">Perfect For</div>
          <h2 className="st">
            Built for every type of <span>AI product</span>
          </h2>
          <p className="sd">
            No matter what you're shipping — FlowMind has the layout, sections, and copy structure
            to make it land.
          </p>
        </div>
        <div className="uc-grid">
          {cases.map((c) => (
            <div className="uc-card an" key={c.title}>
              <div className="uc-ic" style={{ background: c.iconBg, color: c.iconColor }}>
                {c.icon}
              </div>
              <div className="uc-t">{c.title}</div>
              <div className="uc-d">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
