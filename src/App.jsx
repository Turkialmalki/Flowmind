import { useEffect } from 'react'
import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import Layout from './components/Layout'
import Home from './pages/Home'
import FeaturesPage from './pages/FeaturesPage'
import FeatureAIDemo from './pages/FeatureAIDemo'
import FeatureDashboard from './pages/FeatureDashboard'
import FeatureCMS from './pages/FeatureCMS'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import DocsPage from './pages/DocsPage'
import PricingPage from './pages/PricingPage'
import AIDemoPage from './pages/AIDemoPage'
import CMSPage from './pages/CMSPage'
import SetupPage from './pages/SetupPage'
import ChangelogPage from './pages/ChangelogPage'
import DemoPage from './pages/DemoPage'
import LicensePage from './pages/LicensePage'
import PrivacyPage from './pages/PrivacyPage'
import NotFoundPage from './pages/NotFoundPage'
import IntegrationsPage from './pages/IntegrationsPage'
import AutomationsPage from './pages/AutomationsPage'
import BookDemoPage from './pages/BookDemoPage'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, duration: 1.2 })
    let rafId
    function step(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => { cancelAnimationFrame(rafId); lenis.destroy() }
  }, [])

  // Cinematic scroll-depth reveal: blur-clear entry for all non-hero sections
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting && !e.target.classList.contains('sd-reveal')) {
          e.target.classList.add('sd-reveal')
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.04 }
    )
    const tid = setTimeout(
      () => document.querySelectorAll('section:not(.hero)').forEach(s => obs.observe(s)),
      60
    )
    return () => { clearTimeout(tid); obs.disconnect() }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/features/ai-demo" element={<FeatureAIDemo />} />
          <Route path="/features/dashboard" element={<FeatureDashboard />} />
          <Route path="/features/cms" element={<FeatureCMS />} />
          <Route path="/ai-demo" element={<AIDemoPage />} />
          <Route path="/cms" element={<CMSPage />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/license" element={<LicensePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/post" element={<BlogPostPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/automations" element={<AutomationsPage />} />
          <Route path="/book-demo" element={<BookDemoPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
