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

export default function Home() {
  return (
    <>
      <Hero />
      <section className="home-section-intro an">
        <div className="container">
          <div className="hsi-inner">
            <div className="eyebrow">Live Dashboard</div>
            <h2 className="st">See how your AI automation system works</h2>
            <p className="sd">Monitor workflows, track performance, and manage automations in real time.</p>
          </div>
        </div>
      </section>
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
