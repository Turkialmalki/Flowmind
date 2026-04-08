import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

const SUGGESTIONS = [
  'Analyze my user churn and find the top 3 reasons',
  'Generate a 30-day content calendar for my SaaS blog',
  'Write a cold email sequence that converts free to paid',
  'Identify my best-performing customer segment',
  'Build a pricing strategy for a B2B AI tool',
  'Create an onboarding checklist for new signups',
]

const RESPONSES = {
  default: `I've analyzed your product data. Here's what I found:\n\n• **Churn rate**: 4.2% MoM — above your 3% target\n• **Top exit reason**: Onboarding friction (38% of churned users never completed setup)\n• **Revenue at risk**: $8,400/month from likely churners\n• **Quick win**: Add a 3-step onboarding checklist — estimated 22% churn reduction\n\nWant me to generate the onboarding checklist now?`,
  churn: `**Churn Analysis — Last 90 Days**\n\nI found 3 root causes driving 78% of your churn:\n\n1. **No activation** (41%) — Users sign up but never connect their data source\n2. **Feature confusion** (26%) — Dashboard's analytics tab has 60% drop-off at first use\n3. **Pricing mismatch** (11%) — Team plan users downgrading after 45-day trial\n\n**Recommended actions:**\n• Send Day 2 setup reminder email\n• Add tooltip walkthrough to analytics tab\n• Offer Pro annual discount before trial ends\n\nShall I draft those emails?`,
  content: `**30-Day SaaS Content Calendar**\n\nWeek 1 — Awareness\n• Mon: "5 Signs Your SaaS Is Ready to Scale" (LinkedIn)\n• Wed: "How We Went From 0 to 500 Users in 60 Days" (Blog)\n• Fri: Product screenshot thread (Twitter/X)\n\nWeek 2 — Authority\n• Mon: Customer success story (Blog + Newsletter)\n• Wed: "AI vs Manual: Real Data From Our Users" (LinkedIn)\n• Fri: Behind-the-scenes product update (Twitter/X)\n\nWeek 3 — Conversion\n• Mon: "Free vs Pro: What You Actually Get" (Blog)\n• Wed: Limited-time offer announcement\n• Fri: FAQ thread based on support tickets\n\nWeek 4 — Retention\n• Mon: Feature spotlight video (Loom)\n• Wed: Community roundup & wins\n• Fri: Monthly metrics transparency post\n\nWant me to write any of these in full?`,
  email: `**Cold Email Sequence — Free to Paid Conversion**\n\n**Email 1 — Day 0 (Welcome)**\nSubject: Your free trial starts now — here's how to get the most from it\n\nHi {{first_name}}, you just unlocked access to BaseBox...\n[Full email draft ready]\n\n**Email 2 — Day 3 (Value)**\nSubject: {{first_name}}, 3 things top users do in week 1\n\n**Email 3 — Day 7 (Social Proof)**\nSubject: Maya went from idea to $10K MRR in 45 days using this\n\n**Email 4 — Day 12 (Urgency)**\nSubject: Your trial expires in 3 days — here's a special offer\n\n**Email 5 — Day 14 (Last Chance)**\nSubject: Last chance: 30% off Pro — expires tonight\n\nEstimated lift: +18% free-to-paid conversion based on similar sequences. Export full drafts?`,
}

function getResponse(input) {
  const lower = input.toLowerCase()
  if (lower.includes('churn')) return RESPONSES.churn
  if (lower.includes('content') || lower.includes('calendar') || lower.includes('blog')) return RESPONSES.content
  if (lower.includes('email') || lower.includes('cold')) return RESPONSES.email
  return RESPONSES.default
}

function MarkdownText({ text }) {
  const lines = text.split('\n')
  return (
    <div className="ai-md">
      {lines.map((line, i) => {
        if (!line.trim()) return <br key={i} />
        // Bold: **text**
        const parts = line.split(/(\*\*[^*]+\*\*)/g)
        return (
          <p key={i} style={{ margin: '2px 0' }}>
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={j}>{part.slice(2, -2)}</strong>
                : part
            )}
          </p>
        )
      })}
    </div>
  )
}

function TypedMessage({ text, onDone }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const idx = useRef(0)

  useEffect(() => {
    idx.current = 0
    setDisplayed('')
    setDone(false)
    const interval = setInterval(() => {
      idx.current++
      setDisplayed(text.slice(0, idx.current))
      if (idx.current >= text.length) {
        clearInterval(interval)
        setDone(true)
        onDone?.()
      }
    }, 8)
    return () => clearInterval(interval)
  }, [text])

  return (
    <div>
      <MarkdownText text={displayed} />
      {!done && <span className="typing-cursor" />}
    </div>
  )
}

const capabilities = [
  { icon: '📊', title: 'Data Analysis', desc: 'Connects to your metrics and surfaces insights instantly' },
  { icon: '✍️', title: 'Content Generation', desc: 'Emails, blog posts, ad copy — brand-voice aware' },
  { icon: '🔮', title: 'Predictive Insights', desc: 'Forecasts churn, LTV, and revenue before they happen' },
  { icon: '🎯', title: 'Conversion Ops', desc: 'Identifies friction in your funnel and fixes it automatically' },
  { icon: '📋', title: 'Task Automation', desc: 'Turns prompts into structured workflows and SOPs' },
  { icon: '🔗', title: 'API Native', desc: 'Plug into OpenAI, Anthropic, Gemini, or your own model' },
]

export default function AIDemoPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
  const chatRef = useRef(null)

  const sendMessage = (text) => {
    const userMsg = text || input.trim()
    if (!userMsg || loading) return
    setInput('')
    setStarted(true)
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)
    setTimeout(() => {
      const response = getResponse(userMsg)
      setMessages(prev => [...prev, { role: 'ai', text: response, id: Date.now() }])
      setLoading(false)
    }, 900 + Math.random() * 600)
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, loading])

  return (
    <div className="ai-demo-page">
      {/* Hero */}
      <section className="iph">
        <div className="iph-bg">
          <div className="iph-orb iph-orb1" />
          <div className="iph-orb iph-orb2" />
          <div className="iph-grid" />
        </div>
        <div className="container">
          <div className="iph-inner" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
            <div className="eyebrow">AI Demo</div>
            <h1 className="iph-title">
              Talk to your product.<br /><span>In plain English.</span>
            </h1>
            <p className="iph-desc" style={{ margin: '0 auto 36px' }}>
              BaseBox's AI layer understands your SaaS metrics, content goals, and user data.
              Type any question below — no training, no setup, no prompt engineering required.
            </p>
            <div className="ai-demo-trust">
              {['Powered by GPT-4o', 'No hallucinations on your data', 'Instant responses'].map(t => (
                <div key={t} className="ai-demo-trust-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main demo section */}
      <section className="section" style={{ paddingTop: '0', background: 'var(--bg2)', borderTop: '1.5px solid var(--border)' }}>
        <div className="container">
          <div className="ai-demo-layout">
            {/* Chat interface */}
            <div className="ai-demo-chat-wrap">
              <div className="ai-demo-chat-frame">
                <div className="ai-demo-chat-header">
                  <div className="ai-demo-chat-status">
                    <div className="ai-demo-status-dot" />
                    <span>BaseBox AI</span>
                    <span className="ai-demo-status-tag">GPT-4o</span>
                  </div>
                  <div className="ai-demo-chat-actions">
                    <button className="ai-demo-icon-btn" onClick={() => { setMessages([]); setStarted(false) }} title="Clear chat">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" /></svg>
                    </button>
                  </div>
                </div>

                <div className="ai-demo-messages" ref={chatRef}>
                  {!started && (
                    <div className="ai-demo-welcome">
                      <div className="ai-demo-welcome-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                        </svg>
                      </div>
                      <h3 className="ai-demo-welcome-title">What can I help you with?</h3>
                      <p className="ai-demo-welcome-sub">Ask me about your metrics, content, users, or strategy.</p>
                    </div>
                  )}

                  {messages.map((msg, i) => (
                    <div key={i} className={`ai-demo-msg ${msg.role}`}>
                      {msg.role === 'ai' && (
                        <div className="ai-demo-avatar">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                          </svg>
                        </div>
                      )}
                      <div className="ai-demo-bubble">
                        {msg.role === 'ai' && i === messages.length - 1 && !loading
                          ? <TypedMessage text={msg.text} />
                          : msg.role === 'ai'
                            ? <MarkdownText text={msg.text} />
                            : <p>{msg.text}</p>
                        }
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="ai-demo-msg ai">
                      <div className="ai-demo-avatar">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                        </svg>
                      </div>
                      <div className="ai-demo-bubble ai-demo-thinking">
                        <span /><span /><span />
                      </div>
                    </div>
                  )}
                </div>

                {/* Suggestion chips */}
                {!started && (
                  <div className="ai-demo-suggestions">
                    {SUGGESTIONS.map((s) => (
                      <button key={s} className="ai-demo-chip" onClick={() => sendMessage(s)}>{s}</button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="ai-demo-input-row">
                  <input
                    className="ai-demo-input"
                    placeholder="Ask anything about your SaaS…"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    disabled={loading}
                  />
                  <button
                    className={`ai-demo-send${loading ? ' loading' : ''}`}
                    onClick={() => sendMessage()}
                    disabled={loading || !input.trim()}
                  >
                    {loading
                      ? <span className="ai-demo-spinner" />
                      : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      )}
                  </button>
                </div>
              </div>
            </div>

            {/* Side panel */}
            <div className="ai-demo-side-panel">
              <div className="ai-demo-side-card">
                <div className="ai-demo-side-title">Try these prompts</div>
                <div className="ai-demo-prompt-list">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} className="ai-demo-prompt-item" onClick={() => sendMessage(s)}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="ai-demo-side-card" style={{ marginTop: '16px' }}>
                <div className="ai-demo-side-title">Powered by</div>
                <div className="ai-demo-models">
                  {[
                    { name: 'GPT-4o', color: '#10a37f', desc: 'Default' },
                    { name: 'Claude 3.5', color: '#5b5bd6', desc: 'Reasoning' },
                    { name: 'Gemini Pro', color: '#4285f4', desc: 'Multimodal' },
                    { name: 'Custom', color: '#d97706', desc: 'Your model' },
                  ].map(m => (
                    <div key={m.name} className="ai-demo-model-tag">
                      <div className="ai-demo-model-dot" style={{ background: m.color }} />
                      <span className="ai-demo-model-name">{m.name}</span>
                      <span className="ai-demo-model-desc">{m.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities grid */}
      <section className="section">
        <div className="container">
          <div className="fh an" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="eyebrow">Capabilities</div>
            <h2 className="st">Built for every SaaS workflow</h2>
            <p className="sd" style={{ margin: '0 auto' }}>
              BaseBox AI connects to your product data and adapts its responses to your specific context — not generic advice.
            </p>
          </div>
          <div className="ai-caps-grid">
            {capabilities.map((cap) => (
              <div key={cap.title} className="ai-cap-card an">
                <div className="ai-cap-icon">{cap.icon}</div>
                <h3 className="ai-cap-title">{cap.title}</h3>
                <p className="ai-cap-desc">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ctas">
        <div className="container">
          <div className="ctab">
            <div className="eyebrow">Ready to ship?</div>
            <h2 className="st">Add this AI demo to your<br /><span>SaaS in 60 minutes.</span></h2>
            <p className="sd" style={{ margin: '0 auto 36px' }}>
              BaseBox includes the full interactive demo — ready to connect to your backend.
            </p>
            <div className="ctac">
              <Link to="/pricing" className="ctab-cta-btn">
                Get BaseBox — $49
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/docs" className="btn btn-o">Read the Docs</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
