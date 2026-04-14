import { useState } from 'react'

const faqs = [
  {
    q: 'Do I need to know how to code?',
    a: "No. Everything is built in Framer's visual editor. Swap text, update images, change colors — all drag and drop. If you can use Canva, you can launch with FlowMind.",
  },
  {
    q: "What's included in the Pro plan exactly?",
    a: 'Pro includes 6 marketing pages (Home, Features, Pricing, Blog, About, Contact), a full dashboard UI kit with charts and activity feed, auth screens (login, signup, password reset), settings and profile panels, empty state designs for every screen, Framer CMS integration, animations, and lifetime updates with priority support.',
  },
  {
    q: 'Can I use this for a non-AI SaaS?',
    a: 'Yes. While the copy and layout are optimized for AI SaaS, the design works great for any software startup. Just update the text to match your product — the structure and conversion logic stays the same.',
  },
  {
    q: 'How fast can I actually launch?',
    a: "Most founders are live within 60–90 minutes. Duplicate the template into your Framer workspace, replace placeholder content with yours, connect your domain, and publish. The quick-start guide walks you through each step.",
  },
  {
    q: 'What\'s included in "lifetime updates"?',
    a: "Every new screen, section, design improvement, and bug fix we ship is added to your template automatically. No extra charges, ever. Buy once and stay current forever — including new screens we add after your purchase.",
  },
  {
    q: 'Can I use this for client projects?',
    a: 'Starter and Pro include a personal license — use on your own projects. The Team plan includes an extended commercial license for unlimited client work. Agencies use the Team license to build and deliver sites for clients.',
  },
  {
    q: 'Is there a refund policy?',
    a: "Due to the digital nature of the product, we don't offer refunds — which is exactly why we provide a full live demo with every screen visible before you buy. See exactly what you're getting before you purchase.",
  },
]

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (i) => setOpenIndex(openIndex === i ? -1 : i)

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="fqh an">
          <div className="eyebrow">FAQ</div>
          <h2 className="st">
            Questions before <span>you buy</span>
          </h2>
          <p className="sd">Straight answers to the most common questions about FlowMind.</p>
        </div>
        <div className="fql">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className={`fqi${isOpen ? ' open' : ''}`}>
                <button className="fqq" onClick={() => toggle(i)}>
                  {faq.q}
                  <div className="fqic"><PlusIcon /></div>
                </button>
                <div className="fqa" style={{ maxHeight: isOpen ? '300px' : '0' }}>
                  <div className="fqai">{faq.a}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
