import { Outlet } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Nav from './Nav'
import Footer from './Footer'

export default function Layout() {
  useScrollReveal()
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
