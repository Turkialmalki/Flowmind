import { useState, useEffect } from 'react'

export default function UrgencyBar() {
  const [hidden, setHidden] = useState(false)
  const [viewers, setViewers] = useState(18)

  useEffect(() => {
    const scrollHandler = () => setHidden(window.scrollY > 300)
    window.addEventListener('scroll', scrollHandler, { passive: true })

    // Simulate live viewer count fluctuating
    const interval = setInterval(() => {
      setViewers((v) => {
        const delta = Math.random() > 0.5 ? 1 : -1
        return Math.min(28, Math.max(11, v + delta))
      })
    }, 4500)

    return () => {
      window.removeEventListener('scroll', scrollHandler)
      clearInterval(interval)
    }
  }, [])

  if (hidden) return null

  return (
    <div className="ub" id="topBar">
      <div className="ub-inner">
        <div className="ub-badge">Launch Price</div>
        <div className="ub-live">
          <div className="ub-dot" />
          {viewers} people viewing now
        </div>
        <span className="ub-sep">·</span>
        Price increases after next 50 sales — lock in $49
        <a href="#pricing" className="ub-cta">Get it now →</a>
      </div>
    </div>
  )
}
