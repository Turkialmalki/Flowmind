import { Outlet, useLocation } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useEffect, useRef } from 'react'
import Nav from './Nav'
import Footer from './Footer'

function PageTransition({ children }) {
  const location = useLocation()
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.remove('page-enter')
    // Force reflow
    void el.offsetWidth
    el.classList.add('page-enter')
  }, [location.pathname])

  return (
    <div ref={ref} className="page-enter">
      {children}
    </div>
  )
}

export default function Layout() {
  useScrollReveal()
  return (
    <div className="site-layout">
      <Nav />
      <main>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}
