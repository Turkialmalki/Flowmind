// UrgencyBar.tsx — Top announcement/urgency banner
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

interface UrgencyBarProps {
  badgeText: string
  messageText: string
  ctaText: string
  ctaLink: string
  showCta: boolean
}

export default function UrgencyBar({ badgeText, messageText, ctaText, ctaLink, showCta }: UrgencyBarProps) {
  return (
    <div style={{
      background: "linear-gradient(90deg, #4c4cc4 0%, #0ea5e9 100%)",
      padding: "10px 0",
      width: "100%", boxSizing: "border-box",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "10px", flexWrap: "wrap",
      }}>
        {badgeText && (
          <span style={{
            background: "rgba(255,255,255,0.20)",
            padding: "2px 10px", borderRadius: "9999px",
            fontFamily: "'Fira Code', 'Cascadia Code', monospace",
            fontSize: "11px", fontWeight: 700, color: "#ffffff",
            letterSpacing: "0.05em",
          }}>{badgeText}</span>
        )}
        <span style={{
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          fontSize: "13px", fontWeight: 600, color: "#ffffff",
        }}>{messageText}</span>
        {showCta && ctaText && (
          <a href={ctaLink} style={{
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontSize: "13px", fontWeight: 700,
            color: "#ffffff",
            textDecoration: "underline",
            textUnderlineOffset: "2px",
            opacity: 0.9,
          }}>{ctaText} →</a>
        )}
      </div>
    </div>
  )
}

UrgencyBar.defaultProps = {
  badgeText: "LAUNCH PRICE",
  messageText: "50% off for the next 50 customers — only a few spots left at this price",
  ctaText: "Get BaseBox — $49",
  ctaLink: "/pricing",
  showCta: true,
}

addPropertyControls(UrgencyBar, {
  badgeText:   { type: ControlType.String,  title: "Badge",        defaultValue: "LAUNCH PRICE" },
  messageText: { type: ControlType.String,  title: "Message",      defaultValue: "50% off for the next 50 customers — only a few spots left at this price" },
  showCta:     { type: ControlType.Boolean, title: "Show CTA Link", defaultValue: true },
  ctaText:     { type: ControlType.String,  title: "CTA Text",     defaultValue: "Get BaseBox — $49", hidden: (p: UrgencyBarProps) => !p.showCta },
  ctaLink:     { type: ControlType.Link,    title: "CTA Link",     hidden: (p: UrgencyBarProps) => !p.showCta },
})
