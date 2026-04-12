// Footer.tsx
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  heading: string
  links: FooterLink[]
}

interface FooterProps {
  brandName: string
  tagline: string
  column1: FooterColumn
  column2: FooterColumn
  column3: FooterColumn
  copyright: string
  twitterUrl: string
  githubUrl: string
  contactEmail: string
}

const TwitterIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const GitHubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
  </svg>
)

const MailIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const LogoMark = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <rect
      x="4" y="10" width="32" height="22" rx="4"
      fill="rgba(91,91,214,0.08)"
      stroke="#5b5bd6"
      strokeWidth="1.5"
    />
    <path
      d="M14 16l-4 5 4 5M26 16l4 5-4 5"
      stroke="#5b5bd6"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="20" y1="14" x2="20" y2="10" stroke="#5b5bd6" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="20" cy="8" r="2" fill="#5b5bd6" />
  </svg>
)

function FooterCol({ col }: { col: FooterColumn }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          color: "#0a0e1a",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "16px",
        }}
      >
        {col.heading}
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
        {(col.links || []).map((link, i) => (
          <li key={i}>
            <a
              href={link.href}
              style={{
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                fontSize: "14px",
                color: "#6b7280",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer({
  brandName,
  tagline,
  column1,
  column2,
  column3,
  copyright,
  twitterUrl,
  githubUrl,
  contactEmail,
}: FooterProps) {
  return (
    <footer
      style={{
        background: "#f7f8fc",
        borderTop: "1px solid rgba(15,23,42,0.07)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "64px 24px 40px",
        }}
      >
        {/* Top row: brand + columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: "48px",
            marginBottom: "48px",
          }}
        >
          {/* Brand column */}
          <div>
            <a
              href="/"
              aria-label={`${brandName} — home`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                marginBottom: "16px",
              }}
            >
              <LogoMark />
              <span
                style={{
                  fontFamily: "'Sora', 'Inter', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: "20px",
                  letterSpacing: "-0.02em",
                  color: "#0a0e1a",
                }}
              >
                {brandName}
              </span>
            </a>
            <p
              style={{
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                fontSize: "14px",
                lineHeight: 1.7,
                color: "#6b7280",
                maxWidth: "280px",
                margin: 0,
              }}
            >
              {tagline}
            </p>
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "16px",
                  fontSize: "13px",
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  color: "#5b5bd6",
                  textDecoration: "none",
                }}
              >
                <MailIcon />
                {contactEmail}
              </a>
            )}
          </div>

          <FooterCol col={column1} />
          <FooterCol col={column2} />
          <FooterCol col={column3} />
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "28px",
            borderTop: "1px solid rgba(15,23,42,0.07)",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              fontSize: "13px",
              color: "#9ca3af",
            }}
          >
            {copyright}
          </span>

          <div style={{ display: "flex", gap: "16px" }}>
            {twitterUrl && (
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on X (Twitter)"
                style={{ color: "#6b7280" }}
              >
                <TwitterIcon />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on GitHub"
                style={{ color: "#6b7280" }}
              >
                <GitHubIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

Footer.defaultProps = {
  brandName: "BaseBox",
  tagline:
    "The complete AI SaaS launch kit. Landing pages, dashboard, auth flows, and every screen your product needs — built for Framer, live in 60 minutes.",
  column1: {
    heading: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Dashboard UI", href: "/dashboard" },
      { label: "AI Demo", href: "/ai-demo" },
      { label: "CMS & Blog", href: "/cms" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  column2: {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Setup Guide", href: "/setup" },
      { label: "Changelog", href: "/changelog" },
      { label: "Live Demo", href: "/dashboard" },
    ],
  },
  column3: {
    heading: "Company",
    links: [
      { label: "Get Template", href: "/pricing" },
      { label: "Sign In", href: "/login" },
      { label: "Sign Up", href: "/signup" },
      { label: "License", href: "/license" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
  copyright: "© 2026 BaseBox. All rights reserved.",
  twitterUrl: "https://twitter.com",
  githubUrl: "https://github.com",
  contactEmail: "hello@basebox.io",
}

addPropertyControls(Footer, {
  brandName: { type: ControlType.String, title: "Brand Name", defaultValue: "BaseBox" },
  tagline: {
    type: ControlType.String,
    title: "Tagline",
    displayTextArea: true,
    defaultValue:
      "The complete AI SaaS launch kit. Landing pages, dashboard, auth flows, and every screen your product needs.",
  },
  copyright: {
    type: ControlType.String,
    title: "Copyright",
    defaultValue: "© 2026 BaseBox. All rights reserved.",
  },
  contactEmail: {
    type: ControlType.String,
    title: "Contact Email",
    defaultValue: "hello@basebox.io",
  },
  twitterUrl: { type: ControlType.Link, title: "Twitter URL" },
  githubUrl: { type: ControlType.Link, title: "GitHub URL" },
})
