import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import FeaturesPage from './pages/FeaturesPage'
import FeatureAIDemo from './pages/FeatureAIDemo'
import FeatureDashboard from './pages/FeatureDashboard'
import FeatureCMS from './pages/FeatureCMS'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
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

export default function App() {
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
        </Route>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}
