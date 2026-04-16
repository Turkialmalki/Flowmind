import { useRef, useState, useEffect } from 'react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// April 2026 calendar (starts Wednesday = index 3)
const FIRST_DAY = 3
const TOTAL_DAYS = 30

// Automated events by day
const EVENTS = {
  3:  { label: 'AI-synced meeting', type: 'meeting', color: '#5b5bd6' },
  7:  { label: 'Auto-scheduled task', type: 'task', color: '#059669' },
  10: { label: 'AI-synced meeting', type: 'meeting', color: '#5b5bd6' },
  14: { label: 'Auto-scheduled task', type: 'task', color: '#059669' },
  17: { label: 'AI-synced meeting', type: 'meeting', color: '#5b5bd6' },
  21: { label: 'Auto-scheduled task', type: 'task', color: '#059669' },
  24: { label: 'AI-synced meeting', type: 'meeting', color: '#5b5bd6' },
  28: { label: 'Auto-scheduled task', type: 'task', color: '#059669' },
}

const EVENT_DAYS = Object.keys(EVENTS).map(Number)

export default function CalendarSection() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [revealedDays, setRevealedDays] = useState([])
  const [selectedDay, setSelectedDay] = useState(14)
  const [pulseDay, setPulseDay] = useState(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Animate events appearing one by one after section is visible
  useEffect(() => {
    if (!visible) return
    let i = 0
    const timer = setInterval(() => {
      if (i >= EVENT_DAYS.length) { clearInterval(timer); return }
      const day = EVENT_DAYS[i]
      setRevealedDays(prev => [...prev, day])
      setPulseDay(day)
      setTimeout(() => setPulseDay(null), 600)
      i++
    }, 220)
    return () => clearInterval(timer)
  }, [visible])

  const cells = []
  for (let i = 0; i < FIRST_DAY; i++) cells.push(null)
  for (let d = 1; d <= TOTAL_DAYS; d++) cells.push(d)

  const selectedEvent = EVENTS[selectedDay]

  return (
    <section ref={sectionRef} className={`cal-section an${visible ? ' v' : ''}`}>
      <div className="cal-glow" aria-hidden="true" />
      <div className="container">
        {/* Section header */}
        <div className="cal-header an">
          <h2 className="st">
            Automate your schedule <span>with AI</span>
          </h2>
          <p className="sd">
            Sync meetings, trigger workflows, and manage events automatically.
          </p>
        </div>

        <div className="cal-layout">
          {/* Calendar card */}
          <div className="cal-card an">
            <div className="cal-card-header">
              <div className="cal-card-title">April 2026</div>
              <div className="cal-card-legend">
                <div className="cal-legend-item">
                  <div className="cal-legend-dot" style={{ background: '#5b5bd6' }} />
                  <span>AI-synced meeting</span>
                </div>
                <div className="cal-legend-item">
                  <div className="cal-legend-dot" style={{ background: '#059669' }} />
                  <span>Auto-scheduled task</span>
                </div>
              </div>
            </div>

            <div className="cal-grid">
              {DAYS.map(d => (
                <div key={d} className="cal-day-hd">{d}</div>
              ))}
              {cells.map((day, i) => {
                if (day === null) return <div key={`e-${i}`} className="cal-cell cal-empty" />
                const event = EVENTS[day]
                const isRevealed = revealedDays.includes(day)
                const isPulsing = pulseDay === day
                const isSelected = selectedDay === day
                const isToday = day === 14
                return (
                  <button
                    key={day}
                    className={[
                      'cal-cell',
                      isToday    ? 'cal-today' : '',
                      isSelected ? 'cal-selected' : '',
                      event && isRevealed ? 'cal-has-event' : '',
                      isPulsing  ? 'cal-pulse' : '',
                    ].filter(Boolean).join(' ')}
                    onClick={() => setSelectedDay(day)}
                  >
                    <span className="cal-cell-num">{day}</span>
                    {event && isRevealed && (
                      <div
                        className="cal-event-dot"
                        style={{ background: event.color }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Selected day event */}
            <div className="cal-event-preview">
              {selectedEvent ? (
                <div className="cal-event-row">
                  <div className="cal-event-bar" style={{ background: selectedEvent.color }} />
                  <div className="cal-event-body">
                    <div className="cal-event-name">{selectedEvent.label}</div>
                    <div className="cal-event-meta">
                      April {selectedDay} · Auto-managed by FlowMind AI
                    </div>
                  </div>
                  <div
                    className="cal-event-badge"
                    style={{
                      background: selectedEvent.color + '14',
                      color: selectedEvent.color,
                    }}
                  >
                    {selectedEvent.type === 'meeting' ? 'AI-synced' : 'Auto-task'}
                  </div>
                </div>
              ) : (
                <div className="cal-event-empty">
                  No automated events — click a highlighted day
                </div>
              )}
            </div>
          </div>

          {/* Side info */}
          <div className="cal-side an">
            <div className="cal-side-card">
              <div className="cal-side-icon" style={{ color: '#5b5bd6', background: 'rgba(91,91,214,0.08)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                  <polyline points="8 14 10.5 16.5 16 12"/>
                </svg>
              </div>
              <h3 className="cal-side-title">Smart Meeting Sync</h3>
              <p className="cal-side-desc">
                FlowMind checks availability across your team, picks the best slot, and books it — no back-and-forth.
              </p>
            </div>

            <div className="cal-side-card">
              <div className="cal-side-icon" style={{ color: '#059669', background: 'rgba(5,150,105,0.08)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3 className="cal-side-title">Auto-Scheduled Tasks</h3>
              <p className="cal-side-desc">
                Recurring tasks, reminders, and follow-ups are placed automatically based on your workflow rules.
              </p>
            </div>

            <div className="cal-side-card">
              <div className="cal-side-icon" style={{ color: '#7c3aed', background: 'rgba(124,58,237,0.08)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                </svg>
              </div>
              <h3 className="cal-side-title">AI Conflict Resolution</h3>
              <p className="cal-side-desc">
                When schedules clash, the AI renegotiates and proposes alternatives in seconds — zero human effort.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
