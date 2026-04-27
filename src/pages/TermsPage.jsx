import { Link } from 'react-router-dom'

export default function TermsPage() {
  return (
    <div className="legal-page">
      <section className="iph" style={{ paddingBottom: '40px' }}>
        <div className="iph-bg">
          <div className="iph-orb iph-orb1" />
          <div className="iph-orb iph-orb2" />
          <div className="iph-grid" />
        </div>
        <div className="container">
          <div className="iph-inner">
            <div className="eyebrow">Legal</div>
            <h1 className="iph-title">Terms &amp; Conditions</h1>
            <p className="iph-desc">Last updated: April 2026</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="legal-content">

            <div className="legal-block">
              <h2>About This Product</h2>
              <p>
                FlowMind is a digital product — a React-based SaaS UI template. It is sold as a
                one-time purchase downloadable template. FlowMind is <strong>not a hosted SaaS
                service</strong>. You are purchasing a template file that you download, own, and
                deploy yourself.
              </p>
            </div>

            <div className="legal-block">
              <h2>License</h2>
              <ul>
                <li>You receive a <strong>non-exclusive license</strong> to use FlowMind upon purchase.</li>
                <li>Permitted for <strong>personal and commercial use</strong> — build products for yourself or your clients.</li>
                <li>You <strong>may not resell or redistribute</strong> the template files, source code, or design assets as a standalone product.</li>
                <li>The Pro license covers personal and commercial projects. The extended (Team) license covers unlimited client delivery.</li>
              </ul>
            </div>

            <div className="legal-block">
              <h2>Payment &amp; Delivery</h2>
              <ul>
                <li>FlowMind is sold as a <strong>one-time payment</strong>. There are no recurring fees, subscriptions, or hidden charges.</li>
                <li>After payment is confirmed, you receive instant access to the template files via your purchase email.</li>
                <li>All payments are processed securely through Gumroad or Lemon Squeezy.</li>
              </ul>
            </div>

            <div className="legal-block">
              <h2>Refund Policy</h2>
              <p>
                Due to the digital and instantly-delivered nature of this product, <strong>all sales are
                final — no refunds are offered</strong>. A full live demo is available before purchase so
                you can review exactly what you are buying. If you have a technical issue, please
                contact us and we will do our best to resolve it.
              </p>
            </div>

            <div className="legal-block">
              <h2>Liability</h2>
              <p>
                FlowMind is provided "as is" without warranty of any kind. We are not responsible
                for how the template is used after purchase, for any damages arising from its use,
                or for the success or failure of any product built with it. You assume full
                responsibility for your use of the template.
              </p>
            </div>

            <div className="legal-block">
              <h2>Intellectual Property</h2>
              <p>
                All design, code, and content within FlowMind remain the intellectual property of
                the creator. The license grants you the right to use and modify the template for
                your own projects — it does not transfer ownership of the underlying IP.
              </p>
            </div>

            <div className="legal-block">
              <h2>Changes to These Terms</h2>
              <p>
                These terms may be updated at any time. Continued use of the template after
                purchase constitutes acceptance of any updated terms.
              </p>
            </div>

            <div className="legal-block">
              <h2>Contact</h2>
              <p>
                For any questions about these terms, licensing, or your purchase, contact us at:{' '}
                <a href="mailto:turkialmalki202200@gmail.com">turkialmalki202200@gmail.com</a>
              </p>
            </div>

            <div className="legal-footer-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/license">License Details</Link>
              <Link to="/">Back to Home</Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
