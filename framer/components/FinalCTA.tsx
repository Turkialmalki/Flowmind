// FinalCTA.tsx — Pixel-perfect BaseBox final conversion section
import * as React from "react"
import { useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"

const CTA_STYLES = `
  @keyframes bb-cta-gx {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes bb-cta-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
  .bb-cta-primary-btn {
    background-size: 200% 200% !important;
    animation: bb-cta-gx 3s ease infinite !important;
    transition: transform 0.25s, box-shadow 0.25s !important;
  }
  .bb-cta-primary-btn:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 0 0 1px rgba(109,40,217,0.35), 0 12px 40px rgba(109,40,217,0.48) !important;
  }
  .bb-cta-secondary-btn:hover {
    color: #0a0e1a !important;
    border-color: rgba(15,23,42,0.22) !important;
    background: #f7f8fc !important;
  }
`

interface FinalCTAProps {
  eyebrow: string
  headline: string
  accentWord: string
  subheadline: string
  primaryCtaText: string
  primaryCtaLink: string
  secondaryCtaText: string
  secondaryCtaLink: string
  urgencyText: string
  stat1Num: string
  stat1Label: string
  stat2Num: string
  stat2Label: string
  stat3Num: string
  stat3Label: string
  stat4Num: string
  stat4Label: string
}

const TRUST_ITEMS = [
  { label: "Instant access after purchase",   icon: "bolt" },
  { label: "One-time payment, no subscription", icon: "shield" },
  { label: "Lifetime free updates",            icon: "refresh" },
  { label: "Use on unlimited projects",        icon: "screen" },
]

function TrustIcon({ name }: { name: string }) {
  const s = { width: 15, height: 15, flexShrink: 0 as const, color: "#5b5bd6" }
  if (name === "bolt") return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
  if (name === "shield") return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
  if (name === "refresh") return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" /></svg>
  return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
}

export default function FinalCTA({
  eyebrow,
  headline,
  accentWord,
  subheadline,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  urgencyText,
  stat1Num, stat1Label,
  stat2Num, stat2Label,
  stat3Num, stat3Label,
  stat4Num, stat4Label,
}: FinalCTAProps) {
  useEffect(() => {
    const id = "bb-cta-keyframes"
    if (!document.getElementById(id)) {
      const el = document.createElement("style")
      el.id = id
      el.textContent = CTA_STYLES
      document.head.appendChild(el)
    }
  }, [])

  const stats = [
    { num: stat1Num, label: stat1Label },
    { num: stat2Num, label: stat2Label },
    { num: stat3Num, label: stat3Label },
    { num: stat4Num, label: stat4Label },
  ]

  // Render headline with gradient on accentWord
  const renderHeadline = () => {
    if (!accentWord || !headline.includes(accentWord)) return <>{headline}</>
    const parts = headline.split(accentWord)
    return (
      <>
        {parts[0]}
        <span style={{
          background: "linear-gradient(135deg, #6C5CE7, #8E7CFF)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>{accentWord}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section style={{
      padding: "100px 0",
      background: "linear-gradient(180deg, #f7f8fc 0%, #ffffff 100%)",
      width: "100%", boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* Card */}
        <div style={{
          background: "#ffffff",
          border: "1.5px solid rgba(15,23,42,0.07)",
          borderRadius: "28px",
          padding: "72px 48px",
          boxShadow: "0 20px 60px rgba(15,23,42,0.08), 0 4px 16px rgba(15,23,42,0.04)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Background glow */}
          <div aria-hidden="true" style={{
            position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)",
            width: "600px", height: "400px", borderRadius: "50%", pointerEvents: "none",
            background: "radial-gradient(ellipse, rgba(91,91,214,0.07) 0%, transparent 70%)",
          }} />

          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontFamily: "'Fira Code', 'Cascadia Code', monospace",
            fontSize: "12px", fontWeight: 500, textTransform: "uppercase" as const,
            letterSpacing: "0.12em", color: "#5b5bd6", marginBottom: "16px",
            justifyContent: "center",
          }}>
            <span style={{ width: "20px", height: "1.5px", background: "#5b5bd6", display: "inline-block" }} />
            {eyebrow}
            <span style={{ width: "20px", height: "1.5px", background: "#5b5bd6", display: "inline-block" }} />
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Sora', 'Inter', system-ui, sans-serif",
            fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 700,
            lineHeight: 1.1, letterSpacing: "-0.02em", color: "#0a0e1a",
            marginBottom: "18px", position: "relative", zIndex: 1,
          }}>
            {renderHeadline()}
          </h2>

          {/* Sub */}
          <p style={{
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontSize: "17px", lineHeight: 1.7, color: "#374151",
            maxWidth: "560px", margin: "0 auto 14px",
          }}>
            {subheadline}
          </p>

          {/* Stats row */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "40px", flexWrap: "wrap", marginBottom: "20px",
          }}>
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Sora', 'Inter', system-ui, sans-serif",
                  fontSize: "24px", fontWeight: 800, letterSpacing: "-0.03em",
                  background: "linear-gradient(135deg, #6C5CE7, #8E7CFF)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text", lineHeight: 1, marginBottom: "2px",
                }}>{s.num}</div>
                <div style={{
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  fontSize: "12px", color: "#9ca3af", fontWeight: 500,
                }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Micro note */}
          <p style={{
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontSize: "12px", color: "#9ca3af", letterSpacing: "0.01em",
            marginBottom: "32px",
          }}>
            Instant access · One-time payment · No subscription ever · Lifetime updates
          </p>

          {/* CTAs */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "14px", flexWrap: "wrap", marginBottom: "20px",
          }}>
            <a href={primaryCtaLink} className="bb-cta-primary-btn" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "18px 44px", fontSize: "17px",
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              fontWeight: 700, letterSpacing: "-0.01em", color: "#ffffff",
              background: "linear-gradient(135deg, #6C5CE7 0%, #7C4DFF 50%, #8E7CFF 100%)",
              border: "none", borderRadius: "9999px", textDecoration: "none",
              boxShadow: "0 0 0 1px rgba(109,40,217,0.3), 0 8px 32px rgba(109,40,217,0.35)",
              cursor: "pointer",
            }}>
              {primaryCtaText}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            {secondaryCtaText && (
              <a href={secondaryCtaLink} className="bb-cta-secondary-btn" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "16px 36px", fontSize: "16px",
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                fontWeight: 600, color: "#374151",
                background: "transparent",
                border: "1.5px solid rgba(15,23,42,0.13)",
                borderRadius: "9999px", textDecoration: "none",
                cursor: "pointer", transition: "all 0.25s",
              }}>
                {secondaryCtaText}
              </a>
            )}
          </div>

          {/* Urgency */}
          {urgencyText && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              fontSize: "13px", color: "#6b7280", marginBottom: "40px",
            }}>
              <div style={{
                width: "8px", height: "8px", borderRadius: "50%", background: "#059669",
                animation: "bb-cta-pulse 2s ease infinite",
              }} />
              {urgencyText}
            </div>
          )}

          {/* Trust row */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "28px", flexWrap: "wrap",
            paddingTop: "32px",
            borderTop: "1.5px solid rgba(15,23,42,0.07)",
          }}>
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} style={{
                display: "flex", alignItems: "center", gap: "7px",
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                fontSize: "13px", color: "#6b7280", fontWeight: 500,
              }}>
                <TrustIcon name={item.icon} />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

FinalCTA.defaultProps = {
  eyebrow: "Your Startup. Live Today.",
  headline: "Stop waiting. Launch your\nAI startup today.",
  accentWord: "today.",
  subheadline: "Every week you wait is a week your competitors are collecting signups you're not. 847+ founders already shipped with BaseBox — most went live in under 60 minutes.",
  primaryCtaText:    "Get BaseBox Now — $49",
  primaryCtaLink:    "/pricing",
  secondaryCtaText:  "View All Screens",
  secondaryCtaLink:  "/features",
  urgencyText: "Launch price active now — increasing after next 50 sales",
  stat1Num: "847+",   stat1Label: "founders launched",
  stat2Num: "$3,450+",stat2Label: "saved per project",
  stat3Num: "60 min", stat3Label: "avg time to live",
  stat4Num: "4.9★",  stat4Label: "average rating",
}

addPropertyControls(FinalCTA, {
  eyebrow:          { type: ControlType.String, title: "Eyebrow",         defaultValue: "Your Startup. Live Today." },
  headline:         { type: ControlType.String, title: "Headline",         displayTextArea: true, defaultValue: "Stop waiting. Launch your\nAI startup today." },
  accentWord:       { type: ControlType.String, title: "Accent Word",      defaultValue: "today." },
  subheadline:      { type: ControlType.String, title: "Subheadline",      displayTextArea: true, defaultValue: "847+ founders already shipped with BaseBox." },
  primaryCtaText:   { type: ControlType.String, title: "Primary CTA Text", defaultValue: "Get BaseBox Now — $49" },
  primaryCtaLink:   { type: ControlType.Link,   title: "Primary CTA Link" },
  secondaryCtaText: { type: ControlType.String, title: "Secondary CTA",    defaultValue: "View All Screens" },
  secondaryCtaLink: { type: ControlType.Link,   title: "Secondary Link" },
  urgencyText:      { type: ControlType.String, title: "Urgency Text",     defaultValue: "Launch price active now — increasing after next 50 sales" },
  stat1Num:   { type: ControlType.String, title: "Stat 1 Num",   defaultValue: "847+"    },
  stat1Label: { type: ControlType.String, title: "Stat 1 Label", defaultValue: "founders launched" },
  stat2Num:   { type: ControlType.String, title: "Stat 2 Num",   defaultValue: "$3,450+" },
  stat2Label: { type: ControlType.String, title: "Stat 2 Label", defaultValue: "saved per project" },
  stat3Num:   { type: ControlType.String, title: "Stat 3 Num",   defaultValue: "60 min"  },
  stat3Label: { type: ControlType.String, title: "Stat 3 Label", defaultValue: "avg time to live" },
  stat4Num:   { type: ControlType.String, title: "Stat 4 Num",   defaultValue: "4.9★"   },
  stat4Label: { type: ControlType.String, title: "Stat 4 Label", defaultValue: "average rating" },
})
