// SocialProofStrip.tsx — Social proof band: trust badges + brand pills + stats
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

interface SocialProofStripProps {
  showBrands: boolean
  showTrustBadges: boolean
  showStats: boolean
}

const BRANDS = ["NovaMind AI", "Scribe.so", "DataPulse", "ShipAI", "Cortex HQ", "Insight Lab", "AuraWrite", "FlowBot"]

const TRUST_BADGES = [
  { text: "Used by founders launching AI startups", icon: "shield"  },
  { text: "Built for Framer",                       icon: "screen"  },
  { text: "Lifetime updates included",              icon: "refresh" },
  { text: "One-time payment, no subscription",      icon: "bolt"    },
]

function BadgeIcon({ name }: { name: string }) {
  const s: React.SVGProps<SVGSVGElement> = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": "true" as any }
  if (name === "shield")  return <svg {...s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
  if (name === "screen")  return <svg {...s}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
  if (name === "refresh") return <svg {...s}><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" /></svg>
  return <svg {...s}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
}

const STATS = [
  { num: "847+",   label: "AI founders launched" },
  { num: "12+",    label: "Complete screens included" },
  { num: "4.9★",  label: "Average rating" },
  { num: "<60min", label: "Average time to live" },
]

export default function SocialProofStrip({
  showBrands,
  showTrustBadges,
  showStats,
}: SocialProofStripProps) {
  return (
    <section style={{
      padding: "48px 0",
      background: "#f7f8fc",
      borderTop: "1.5px solid rgba(15,23,42,0.07)",
      borderBottom: "1.5px solid rgba(15,23,42,0.07)",
      width: "100%", boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* Trust badges row */}
        {showTrustBadges && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "10px", flexWrap: "wrap",
            paddingBottom: "28px",
            marginBottom: "28px",
            borderBottom: "1.5px solid rgba(15,23,42,0.07)",
          }}>
            {TRUST_BADGES.map((b) => (
              <div key={b.text} style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                fontSize: "12px", fontWeight: 600, color: "#374151",
                background: "#ffffff",
                border: "1.5px solid rgba(15,23,42,0.13)",
                padding: "7px 14px",
                borderRadius: "9999px",
                boxShadow: "0 1px 3px rgba(15,23,42,0.05)",
              }}>
                <span style={{ color: "#5b5bd6", display: "flex", alignItems: "center" }}><BadgeIcon name={b.icon} /></span>
                {b.text}
              </div>
            ))}
          </div>
        )}

        {/* Brand pills */}
        {showBrands && (
          <div style={{ marginBottom: showStats ? "28px" : "0" }}>
            <div style={{
              fontFamily: "'Fira Code', 'Cascadia Code', monospace",
              fontSize: "10px", fontWeight: 700, color: "#9ca3af",
              textAlign: "center", marginBottom: "12px",
              textTransform: "uppercase", letterSpacing: "0.12em",
            }}>
              Trusted by founders building
            </div>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "8px", flexWrap: "wrap",
            }}>
              {BRANDS.map((b) => (
                <div key={b} style={{
                  padding: "5px 14px", borderRadius: "9999px",
                  background: "#ffffff",
                  border: "1.5px solid rgba(15,23,42,0.09)",
                  fontFamily: "'Sora', 'Inter', system-ui, sans-serif",
                  fontSize: "12px", fontWeight: 700, color: "#6b7280",
                  letterSpacing: "-0.01em",
                  boxShadow: "0 1px 3px rgba(15,23,42,0.05)",
                }}>{b}</div>
              ))}
            </div>
          </div>
        )}

        {/* Stats grid */}
        {showStats && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "48px", flexWrap: "wrap",
          }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Sora', 'Inter', system-ui, sans-serif",
                  fontSize: "32px", fontWeight: 800,
                  background: "linear-gradient(135deg, #6C5CE7, #8E7CFF)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text", lineHeight: 1,
                }}>{s.num}</div>
                <div style={{
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  fontSize: "12px", color: "#6b7280", fontWeight: 500,
                  marginTop: "2px",
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

SocialProofStrip.defaultProps = {
  showBrands:      true,
  showTrustBadges: true,
  showStats:       true,
}

addPropertyControls(SocialProofStrip, {
  showTrustBadges: { type: ControlType.Boolean, title: "Trust Badges", defaultValue: true },
  showBrands:      { type: ControlType.Boolean, title: "Brand Pills",  defaultValue: true },
  showStats:       { type: ControlType.Boolean, title: "Stats Grid",   defaultValue: true },
})
