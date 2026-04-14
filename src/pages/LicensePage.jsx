import { Link } from 'react-router-dom'

const sections = [
  {
    title: 'License Grant',
    content: [
      'FlowMind grants you a personal, non-exclusive, non-transferable license to use the template for one (1) commercial project or business.',
      'You may customize and modify the template to fit your product.',
      'The license is per-project. Each distinct product, app, or business requires its own license.',
    ],
  },
  {
    title: 'What You Can Do',
    content: [
      'Use FlowMind to build and launch your own SaaS product or website.',
      'Modify any component, page, design token, or code.',
      'Deploy to any hosting platform (Framer, Vercel, Netlify, Cloudflare Pages, etc.).',
      'Use for client projects when you are the end-customer (i.e., the template is not resold to the client).',
      'Share the final product publicly — including publicly accessible websites and apps.',
    ],
  },
  {
    title: 'What You Cannot Do',
    content: [
      'Resell, redistribute, or sub-license the FlowMind template or source code to others.',
      'Create a competing template, UI kit, or design system using FlowMind as a foundation.',
      'Share your download link, duplicate link, or purchase access with other people.',
      'Use FlowMind to create multiple separate commercial projects without purchasing additional licenses.',
      'Remove copyright notices or attribution from any source files.',
    ],
  },
  {
    title: 'Extended / Team License',
    content: [
      'If your team has multiple designers or developers who will access the source files, an Extended License is required.',
      'Extended licenses are available for $149 and cover unlimited team members for a single project.',
      'For agency use (building multiple client products), contact us at license@flowmind.ai for bulk pricing.',
    ],
  },
  {
    title: 'Intellectual Property',
    content: [
      'FlowMind and its design system, component architecture, and visual language remain the intellectual property of FlowMind AI Ltd.',
      'You retain full ownership of the content you add (copy, images, logos, brand assets).',
      'The underlying template structure, CSS system, and React component patterns are licensed, not sold.',
    ],
  },
  {
    title: 'Updates and Support',
    content: [
      'All license holders receive lifetime updates to the version of FlowMind they purchased.',
      'Support is provided via the Framer marketplace chat and at docs.flowmind.ai.',
      'FlowMind reserves the right to change the template design, features, or structure in future updates.',
    ],
  },
  {
    title: 'Disclaimer',
    content: [
      'FlowMind is provided "as-is" without warranty of any kind, express or implied.',
      'FlowMind AI Ltd. is not liable for any loss of business, revenue, data, or consequential damages arising from use of the template.',
      'It is your responsibility to comply with applicable laws and regulations when building your product.',
    ],
  },
]

export default function LicensePage() {
  return (
    <div className="legal-page">
      {/* Header */}
      <section className="iph" style={{ paddingBottom: '60px' }}>
        <div className="iph-bg">
          <div className="iph-orb iph-orb1" />
          <div className="iph-orb iph-orb2" />
        </div>
        <div className="container">
          <div className="iph-inner" style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow">License</div>
            <h1 className="iph-title">
              Standard <span>License Terms</span>
            </h1>
            <p className="iph-desc" style={{ margin: '0 auto 0' }}>
              One license. One product. Unlimited builds with that product. Everything you need to know about what you can and cannot do with FlowMind.
            </p>
          </div>
        </div>
      </section>

      {/* Quick summary cards */}
      <div style={{ background: 'var(--bg2)', borderTop: '1.5px solid var(--border)', borderBottom: '1.5px solid var(--border)' }}>
        <div className="container">
          <div className="legal-summary">
            <div className="legal-summary-card allowed">
              <div className="legal-summary-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
              </div>
              <div className="legal-summary-title">Allowed</div>
              <ul>
                <li>One commercial project</li>
                <li>Unlimited customization</li>
                <li>Any hosting platform</li>
                <li>Lifetime updates</li>
              </ul>
            </div>
            <div className="legal-summary-card disallowed">
              <div className="legal-summary-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </div>
              <div className="legal-summary-title">Not Allowed</div>
              <ul>
                <li>Reselling or redistributing</li>
                <li>Sharing access credentials</li>
                <li>Multiple projects (need extra license)</li>
                <li>Competing template products</li>
              </ul>
            </div>
            <div className="legal-summary-card extended">
              <div className="legal-summary-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg>
              </div>
              <div className="legal-summary-title">Need more?</div>
              <ul>
                <li>Extended license — $149</li>
                <li>Unlimited team members</li>
                <li>Agency bulk pricing</li>
                <li>license@flowmind.ai</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Full legal text */}
      <section className="section">
        <div className="container" style={{ maxWidth: '720px' }}>
          <div className="legal-meta an">
            <span>Last updated: April 5, 2026</span>
            <span>·</span>
            <span>Applies to: FlowMind v2.0+</span>
          </div>

          {sections.map((section, i) => (
            <div key={i} className="legal-section an">
              <h2 className="legal-section-title">{section.title}</h2>
              <ul className="legal-section-body">
                {section.content.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="legal-footer-note an">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
            <div>
              Have questions about the license?{' '}
              <a href="mailto:license@flowmind.ai" style={{ color: 'var(--indigo)', fontWeight: 600 }}>Email us</a>{' '}
              or check our <Link to="/docs" style={{ color: 'var(--indigo)', fontWeight: 600 }}>documentation</Link>.
              We respond within 24 hours.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
