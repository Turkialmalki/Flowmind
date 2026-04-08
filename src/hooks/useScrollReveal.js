import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    // Reset all animated elements
    document.querySelectorAll('.an.v, .an-scale.v, .an-left.v, .an-right.v, .an-up.v').forEach((el) =>
      el.classList.remove('v')
    )

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('v')
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    const observe = () => {
      // Observe all animation variant classes
      document.querySelectorAll('.an, .an-scale, .an-left, .an-right, .an-up').forEach((el) =>
        obs.observe(el)
      )

      // Staggered entrance delays — existing classes
      document.querySelectorAll('.bc.an').forEach((c, i) => { c.style.transitionDelay = i * 0.06 + 's' })
      document.querySelectorAll('.wh-card.an').forEach((c, i) => { c.style.transitionDelay = i * 0.06 + 's' })
      document.querySelectorAll('.why-card.an').forEach((c, i) => { c.style.transitionDelay = i * 0.06 + 's' })
      document.querySelectorAll('.uc-card.an').forEach((c, i) => { c.style.transitionDelay = i * 0.06 + 's' })
      document.querySelectorAll('.vs-item.an').forEach((c, i) => { c.style.transitionDelay = i * 0.05 + 's' })
      document.querySelectorAll('.tc.an').forEach((c, i) => { c.style.transitionDelay = i * 0.08 + 's' })
      document.querySelectorAll('.sp-item.an').forEach((c, i) => { c.style.transitionDelay = i * 0.08 + 's' })
      document.querySelectorAll('.wow-card.an').forEach((c, i) => { c.style.transitionDelay = i * 0.08 + 's' })
      document.querySelectorAll('.feat-card.an').forEach((c, i) => { c.style.transitionDelay = i * 0.06 + 's' })
      document.querySelectorAll('.blog-card.an').forEach((c, i) => { c.style.transitionDelay = i * 0.06 + 's' })
      document.querySelectorAll('.hiw-card.an').forEach((c, i) => { c.style.transitionDelay = i * 0.07 + 's' })
      document.querySelectorAll('.faq-item.an').forEach((c, i) => { c.style.transitionDelay = i * 0.05 + 's' })

      // Stagger for new variant classes
      document.querySelectorAll('.bc.an-scale').forEach((c, i) => { c.style.transitionDelay = i * 0.06 + 's' })
      document.querySelectorAll('.wow-card.an-scale').forEach((c, i) => { c.style.transitionDelay = i * 0.08 + 's' })
      document.querySelectorAll('.why-card.an-scale').forEach((c, i) => { c.style.transitionDelay = i * 0.06 + 's' })
      document.querySelectorAll('.an-left').forEach((c, i) => { c.style.transitionDelay = i * 0.07 + 's' })
      document.querySelectorAll('.an-right').forEach((c, i) => { c.style.transitionDelay = i * 0.07 + 's' })
    }

    const t = setTimeout(observe, 60)
    return () => {
      clearTimeout(t)
      obs.disconnect()
    }
  }, [pathname])
}
