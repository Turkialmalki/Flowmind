import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DEMO_RESPONSES = {
  default: "I've analyzed your SaaS metrics. Your conversion funnel has 3 drop-off points costing ~$18K/month. Top fix: simplify your onboarding step 2 — it has a 67% exit rate. Want me to generate a fix plan?",
  growth: "Growth forecast for next 90 days based on current trajectory: +2,300 new users, $12K MRR increase, 3 churn risks identified in the enterprise tier. Your strongest acquisition channel is organic search — doubling down would be high ROI.",
  pricing: "Your pricing is leaving money on the table. Users on the $29 plan have the same usage as your $99 plan buyers. Recommend adding a usage-based tier — projected +$8,400/month in upsell revenue.",
  churn: "Churn analysis complete. 73% of churned users never completed onboarding day 3. The fix is a single automated email at hour 48. I've drafted it — want to review? This alone could recover 2.1% of churn.",
  competitors: "Competitive scan done. Your top 3 rivals raised prices 15–30% this quarter — yet your pricing hasn't moved since launch. You have room to increase by $10–20 without hurting conversion. Net impact: +$6,200/month.",
}

const SUGGESTIONS = [
  { label: '🚀 Analyze my growth', key: 'growth' },
  { label: '💰 Find pricing gaps', key: 'pricing' },
  { label: '📉 Reduce churn', key: 'churn' },
  { label: '🎯 Beat competitors', key: 'competitors' },
]

const ACTIVITY_FEED = [
  { icon: '🚀', text: 'nova-saas.io launched with FlowMind', time: '2m ago', color: '#5b5bd6' },
  { icon: '💰', text: 'stripe-labs.co made their first $1K MRR', time: '7m ago', color: '#059669' },
  { icon: '⭐', text: 'getflow.ai left a 5-star review', time: '14m ago', color: '#d97706' },
  { icon: '🎯', text: 'pitch-deck.io converted 3 enterprise leads', time: '21m ago', color: '#0ea5e9' },
  { icon: '🚀', text: 'ai-resume.co launched in under 60 minutes', time: '35m ago', color: '#5b5bd6' },
  { icon: '💰', text: 'quickdemo.ai hit $5K MRR this week', time: '52m ago', color: '#059669' },
]

function ActivityFeed() {
  const [items, setItems] = useState(ACTIVITY_FEED.slice(0, 4))
  const nextIdxRef = useRef(4)

  useEffect(() => {
    const iv = setInterval(() => {
      setItems(prev => {
        const next = [...prev]
        next.unshift({ ...ACTIVITY_FEED[nextIdxRef.current % ACTIVITY_FEED.length], time: 'just now' })
        nextIdxRef.current++
        return next.slice(0, 4)
      })
    }, 4000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="ai-activity">
      <div className="ai-activity-header">
        <div className="ai-activity-dot" />
        <span>Live activity</span>
      </div>
      {items.map((item, i) => (
        <div className="ai-activity-item" key={i} style={{ '--i': i }}>
          <div className="ai-activity-icon" style={{ background: `${item.color}18`, color: item.color }}>
            {item.icon}
          </div>
          <div className="ai-activity-body">
            <div className="ai-activity-text">{item.text}</div>
            <div className="ai-activity-time">{item.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function LiveAIDemo() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: 'Growth forecast for next 90 days based on current trajectory...',
    },
  ])
  const [inputFocused, setInputFocused] = useState(false)

  const inputRef = useRef(null)
  const messagesRef = useRef(null)

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }

  const sendMessage = (text) => {
    const trimmed = (text || '').trim()
    if (!trimmed) return

    const responseKey = Object.keys(DEMO_RESPONSES).find(k =>
      trimmed.toLowerCase().includes(k)
    ) || 'default'

    const userMsg = { role: 'user', content: trimmed }
    const botMsg = { role: 'ai', content: DEMO_RESPONSES[responseKey] }

    setMessages(prev => [...prev, userMsg, botMsg])
    setInput('')
    setTimeout(scrollToBottom, 50)
  }

  const handleSuggestion = (key) => {
    const s = SUGGESTIONS.find(s => s.key === key)
    if (!s) return
    const text = s.label.replace(/^[^\w\s]+\s*/, '')
    sendMessage(text)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const safeMessages = Array.isArray(messages) ? messages : []

  return (
    <section className="section ai-demo-section" id="demo">
      <div className="ai-demo-bg-orb ai-demo-bg-orb1" />
      <div className="ai-demo-bg-orb ai-demo-bg-orb2" />
      <div className="ai-demo-bg-orb ai-demo-bg-orb3" />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="fh an ai-demo-header">
          <div className="eyebrow">Live AI Demo</div>
          <h2 className="st ai-demo-st">
            Your AI product, <span>live before they sign up.</span>
          </h2>
          <p className="sd ai-demo-sd">
            Type anything below. This exact demo ships with FlowMind — your visitors
            experience your product <strong>in real-time</strong> before they ever click "Get Started."
            No setup needed. Plug in your API key and go live.
          </p>

          <div className="ai-demo-feature-pills">
            <div className="ai-demo-pill">
              <span className="ai-demo-pill-dot" style={{ background: '#059669' }} />
              GPT-4o streaming
            </div>
            <div className="ai-demo-pill">
              <span className="ai-demo-pill-dot" style={{ background: '#5b5bd6' }} />
              Typing animation included
            </div>
            <div className="ai-demo-pill">
              <span className="ai-demo-pill-dot" style={{ background: '#0ea5e9' }} />
              Fully customizable
            </div>
          </div>
        </div>

        <div className={`ai-demo-grid an${inputFocused ? ' ai-demo-grid-focused' : ''}`}>
          <div className={`ai-demo-chat${inputFocused ? ' focused' : ''}`}>
            <div className="ai-demo-chat-header">
              <div className="ai-demo-chat-status">
                <div className="ai-demo-status-dot" />
                <span>AI Assistant</span>
                <span className="ai-demo-status-badge">Live</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="ai-demo-model-tag">GPT-4o · Streaming</div>
              </div>
            </div>

            <div className="ai-demo-messages" ref={messagesRef}>
              {safeMessages.map((msg, i) => (
                <div key={i} className={`ai-msg ai-msg-${msg.role}`}>
                  {msg.role === 'ai' && (
                    <div className="ai-msg-avatar">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
                      </svg>
                    </div>
                  )}
                  <div className="ai-msg-bubble">
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="ai-suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.key}
                  className="ai-suggestion-chip"
                  onClick={() => handleSuggestion(s.key)}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="ai-demo-input-wrap">
              <input
                ref={inputRef}
                className="ai-demo-input ai-demo-input-lg"
                placeholder="Try: Analyze my growth"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
              />
              <button
                className="ai-demo-send ai-demo-send-lg"
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>

            <div className="ai-demo-input-hint">
              <kbd>↵ Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line
            </div>
          </div>

          <div className="ai-demo-side">
            <ActivityFeed />

            <div className="ai-demo-stats">
              <div className="ai-demo-stat">
                <div className="ai-demo-stat-value">847+</div>
                <div className="ai-demo-stat-label">Founders launched</div>
              </div>
              <div className="ai-demo-stat">
                <div className="ai-demo-stat-value">60 min</div>
                <div className="ai-demo-stat-label">Avg. launch time</div>
              </div>
              <div className="ai-demo-stat">
                <div className="ai-demo-stat-value">4.9★</div>
                <div className="ai-demo-stat-label">Avg. rating</div>
              </div>
            </div>

            <div className="ai-demo-cta-card">
              <div className="ai-demo-cta-eyebrow">This demo is included</div>
              <div className="ai-demo-cta-title">Ship your AI demo in minutes</div>
              <div className="ai-demo-cta-desc">
                This exact section ships with your template. Plug in your API key, customize the prompts, go live.
              </div>
              <Link to="/pricing" className="btn btn-g" style={{ width: '100%', justifyContent: 'center' }}>
                Get FlowMind — $49
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <div className="ai-demo-cta-sub-row">
                <span>⚡ Instant access</span>
                <span>·</span>
                <span>One-time payment</span>
                <span>·</span>
                <span>Lifetime updates</span>
              </div>
              <div className="ai-demo-cta-note">
                <div className="ai-demo-cta-dot" />
                Launch price — increasing after next 50 sales
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
