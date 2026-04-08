function ClockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

const steps = [
  {
    num: '01',
    badgeClass: 'em',
    time: '30 seconds',
    title: 'Duplicate into Framer',
    desc: 'One click to copy the template into your Framer workspace. Your product has a home before your coffee gets cold.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
      </svg>
    ),
    iconBg: 'var(--emerald-bg)',
    iconColor: 'var(--emerald)',
  },
  {
    num: '02',
    badgeClass: 'vi',
    time: '30–45 minutes',
    title: 'Add your content',
    desc: 'Swap placeholder copy with your product messaging. Change colors, upload images, and personalize every section — all in Framer\'s visual editor. No code, no CSS, no developer.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    iconBg: 'var(--indigo-g)',
    iconColor: 'var(--indigo)',
  },
  {
    num: '03',
    badgeClass: 'sk',
    time: '5 minutes',
    title: 'Publish and start growing',
    desc: 'Connect your domain and hit Publish. Your AI startup is live, collecting signups, and looking like a funded product — all before lunch.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      </svg>
    ),
    iconBg: 'var(--sky-g)',
    iconColor: 'var(--sky)',
  },
]

export default function HowItWorks() {
  return (
    <section className="section" id="how-it-works" style={{ paddingBottom: '60px' }}>
      <div className="container">
        <div className="fh an">
          <div className="eyebrow">How It Works</div>
          <h2 className="st">
            From purchase to <span>live in 60 minutes</span>
          </h2>
          <p className="sd">
            No setup calls. No developer. No design degree required. Three steps between
            you and a live AI startup that looks like it raised money.
          </p>
        </div>

        <div className="hiw-grid">
          {steps.map((step) => (
            <div className="hiw-card an" key={step.num}>
              <div className="hiw-top">
                <div className="hiw-step">
                  <span>{step.num}</span>
                </div>
                <div
                  className="hiw-icon-wrap"
                  style={{ background: step.iconBg, color: step.iconColor }}
                >
                  {step.icon}
                </div>
              </div>
              <div className="hiw-t">{step.title}</div>
              <div className="hiw-d">{step.desc}</div>
              <div className={`hiw-badge ${step.badgeClass}`}>
                <ClockIcon />
                {step.time}
              </div>
            </div>
          ))}
        </div>

        <div className="hiw-total an">
          <div className="hiw-total-line" />
          <div className="hiw-total-text">
            Total time from zero to live:
            <strong> under 60 minutes</strong>
          </div>
          <div className="hiw-total-line" />
        </div>
      </div>
    </section>
  )
}
