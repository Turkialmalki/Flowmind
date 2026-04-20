import Hero from '../components/Hero'
import DashboardReveal from '../components/DashboardReveal'
import CalendarSection from '../components/CalendarSection'
import AutomationPipeline from '../components/AutomationPipeline'
import SocialProof from '../components/SocialProof'
import WhySection from '../components/WhySection'
import HowItWorks from '../components/HowItWorks'
import ScrollShowcase from '../components/ScrollShowcase'
import WhoSection from '../components/WhoSection'
import Features from '../components/Features'
import LiveAIDemo from '../components/LiveAIDemo'
import MetricsWow from '../components/MetricsWow'
import UseCases from '../components/UseCases'
import ProductScreens from '../components/ProductScreens'
import ValueStack from '../components/ValueStack'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'

const WHATS_INCLUDED = [
  { icon: '🏠', label: 'Landing page' },
  { icon: '📊', label: 'SaaS dashboard UI' },
  { icon: '⚡', label: 'Automation pipeline' },
  { icon: '📅', label: 'AI calendar system' },
  { icon: '📄', label: 'Pricing, blog & docs pages' },
  { icon: '📱', label: 'Fully responsive design' },
]

export default function Home() {
  return (
    <>
      <Hero />

      {/* What's included strip */}
      {/* <section className="whats-included-section">
        <div className="container">
          <div className="wi-header an">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>What's included</div>
            <p className="wi-sub">Launch-ready pages and systems. One payment — everything yours.</p>
          </div>
          <div className="wi-grid an">
            {WHATS_INCLUDED.map(item => (
              <div key={item.label} className="wi-item">
                <span className="wi-icon">{item.icon}</span>
                <span className="wi-label">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="wi-tagline an">Designed for modern SaaS products · Launch faster with a real product system</p>
        </div>
      </section> */}

      <DashboardReveal />
      <CalendarSection />
      <AutomationPipeline />
      <SocialProof />
      <WhySection />
      <HowItWorks />
      <ScrollShowcase />
      <WhoSection />
      <Features />
      <LiveAIDemo />
      <MetricsWow />
      <UseCases />
      <ProductScreens />
      <ValueStack />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  )
}
