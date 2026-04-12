// FeatureCard.tsx
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

type IconColor = "indigo" | "sky" | "emerald" | "amber" | "purple" | "rose"
type CardSize = "normal" | "wide" | "tall"

interface FeatureCardProps {
  icon: string
  iconColor: IconColor
  title: string
  description: string
  bullets: string[]
  showBullets: boolean
  cardSize: CardSize
  isAccent: boolean
}

const iconColorMap: Record<IconColor, { bg: string; color: string }> = {
  indigo: { bg: "rgba(91,91,214,0.08)", color: "#5b5bd6" },
  sky: { bg: "rgba(14,165,233,0.08)", color: "#0ea5e9" },
  emerald: { bg: "rgba(5,150,105,0.08)", color: "#059669" },
  amber: { bg: "rgba(217,119,6,0.08)", color: "#d97706" },
  purple: { bg: "rgba(124,58,237,0.08)", color: "#7c3aed" },
  rose: { bg: "rgba(225,29,72,0.08)", color: "#e11d48" },
}

// Bundled icon set — use the "icon" prop to pick one
const ICONS: Record<string, React.ReactNode> = {
  star: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  shield: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  bolt: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  chat: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  document: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
  mobile: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20V10M18 20V4M6 20v-6" />
    </svg>
  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  refresh: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  ),
  clock: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  ),
}

export default function FeatureCard({
  icon,
  iconColor,
  title,
  description,
  bullets,
  showBullets,
  cardSize,
  isAccent,
}: FeatureCardProps) {
  const ic = iconColorMap[iconColor]
  const iconEl = ICONS[icon] || ICONS["star"]

  return (
    <div
      style={{
        background: isAccent
          ? "linear-gradient(135deg, rgba(91,91,214,0.06) 0%, rgba(124,58,237,0.04) 100%)"
          : "#ffffff",
        border: `1px solid ${isAccent ? "rgba(91,91,214,0.15)" : "rgba(15,23,42,0.07)"}`,
        borderRadius: "20px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        height: cardSize === "tall" ? "400px" : "auto",
        gridColumn: cardSize === "wide" ? "span 2" : "span 1",
        boxSizing: "border-box",
        boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.03)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent glow */}
      {isAccent && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "200px",
            height: "200px",
            background: "radial-gradient(ellipse, rgba(91,91,214,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Icon */}
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: ic.bg,
          color: ic.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        {iconEl}
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: "'Sora', 'Inter', system-ui, sans-serif",
          fontSize: "17px",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: "#0a0e1a",
          marginBottom: "10px",
          lineHeight: 1.3,
        }}
      >
        {title}
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          fontSize: "14px",
          lineHeight: 1.7,
          color: "#6b7280",
          margin: 0,
          marginBottom: showBullets && bullets?.length ? "20px" : "0",
          flex: cardSize === "tall" ? 0 : "initial",
        }}
      >
        {description}
      </p>

      {/* Bullet list */}
      {showBullets && bullets?.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {bullets.map((b, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                fontSize: "13px",
                color: "#374151",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={ic.color}
                strokeWidth="2.5"
                style={{ flexShrink: 0 }}
                aria-hidden="true"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

FeatureCard.defaultProps = {
  icon: "bolt",
  iconColor: "indigo" as IconColor,
  title: "Built for Speed to Revenue",
  description:
    "Every week without a live site is a week your competitors collect signups. BaseBox eliminates that gap — permanently.",
  bullets: [
    "From zero to live in 60 minutes",
    "No designer or developer needed",
    "Your first users, this week",
  ],
  showBullets: true,
  cardSize: "normal" as CardSize,
  isAccent: false,
}

addPropertyControls(FeatureCard, {
  icon: {
    type: ControlType.Enum,
    title: "Icon",
    options: Object.keys(ICONS),
    optionTitles: Object.keys(ICONS).map((k) => k.charAt(0).toUpperCase() + k.slice(1)),
    defaultValue: "bolt",
  },
  iconColor: {
    type: ControlType.Enum,
    title: "Icon Color",
    options: ["indigo", "sky", "emerald", "amber", "purple", "rose"],
    optionTitles: ["Indigo", "Sky", "Emerald", "Amber", "Purple", "Rose"],
    defaultValue: "indigo",
  },
  title: {
    type: ControlType.String,
    title: "Title",
    defaultValue: "Built for Speed to Revenue",
  },
  description: {
    type: ControlType.String,
    title: "Description",
    displayTextArea: true,
    defaultValue: "Every week without a live site is a week your competitors collect signups.",
  },
  showBullets: {
    type: ControlType.Boolean,
    title: "Show Bullets",
    defaultValue: true,
  },
  bullets: {
    type: ControlType.Array,
    title: "Bullets",
    control: { type: ControlType.String },
    defaultValue: [
      "From zero to live in 60 minutes",
      "No designer or developer needed",
    ],
    hidden: (props: FeatureCardProps) => !props.showBullets,
  },
  cardSize: {
    type: ControlType.Enum,
    title: "Card Size",
    options: ["normal", "wide", "tall"],
    optionTitles: ["Normal (1 col)", "Wide (2 col)", "Tall (fixed height)"],
    defaultValue: "normal",
  },
  isAccent: {
    type: ControlType.Boolean,
    title: "Accent Style",
    description: "Adds gradient tint and glow",
    defaultValue: false,
  },
})
