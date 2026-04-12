// StatCard.tsx
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

type DeltaDirection = "up" | "down" | "neutral"
type AccentColor = "indigo" | "sky" | "emerald" | "amber" | "purple"

interface StatCardProps {
  label: string
  value: string
  delta: string
  deltaDirection: DeltaDirection
  accentColor: AccentColor
  showSparkline: boolean
  showIcon: boolean
}

const accentMap: Record<AccentColor, { bg: string; color: string }> = {
  indigo: { bg: "rgba(91,91,214,0.08)", color: "#5b5bd6" },
  sky: { bg: "rgba(14,165,233,0.08)", color: "#0ea5e9" },
  emerald: { bg: "rgba(5,150,105,0.08)", color: "#059669" },
  amber: { bg: "rgba(217,119,6,0.08)", color: "#d97706" },
  purple: { bg: "rgba(124,58,237,0.08)", color: "#7c3aed" },
}

const deltaColors: Record<DeltaDirection, string> = {
  up: "#059669",
  down: "#e11d48",
  neutral: "#9ca3af",
}

const SPARKLINE_PATH =
  "M0,28 C10,24 20,26 32,20 C44,14 56,16 68,10 C80,5 90,7 100,4"

export default function StatCard({
  label,
  value,
  delta,
  deltaDirection,
  accentColor,
  showSparkline,
  showIcon,
}: StatCardProps) {
  const ac = accentMap[accentColor]
  const deltaColor = deltaColors[deltaDirection]

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid rgba(15,23,42,0.07)",
        borderRadius: "14px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.03)",
        boxSizing: "border-box",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontSize: "12px",
            color: "#6b7280",
            letterSpacing: "0.01em",
          }}
        >
          {label}
        </span>
        {showIcon && (
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: ac.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-hidden="true"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke={ac.color}
              strokeWidth="2"
            >
              <path d="M12 20V10M18 20V4M6 20v-6" />
            </svg>
          </div>
        )}
      </div>

      {/* Value */}
      <div
        style={{
          fontFamily: "'Sora', 'Inter', system-ui, sans-serif",
          fontSize: "28px",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "#0a0e1a",
          lineHeight: 1,
          marginBottom: "6px",
        }}
      >
        {value}
      </div>

      {/* Delta */}
      {delta && (
        <div
          style={{
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            color: deltaColor,
            marginBottom: showSparkline ? "16px" : "0",
          }}
        >
          {deltaDirection === "up" && "↑ "}
          {deltaDirection === "down" && "↓ "}
          {delta}
        </div>
      )}

      {/* Sparkline */}
      {showSparkline && (
        <svg
          viewBox="0 0 100 32"
          style={{ width: "100%", height: "32px" }}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`sg-${accentColor}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ac.color} stopOpacity="0.15" />
              <stop offset="100%" stopColor={ac.color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`${SPARKLINE_PATH} L100,32 L0,32Z`}
            fill={`url(#sg-${accentColor})`}
          />
          <path
            d={SPARKLINE_PATH}
            fill="none"
            stroke={ac.color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="100" cy="4" r="2.5" fill={ac.color} />
        </svg>
      )}
    </div>
  )
}

StatCard.defaultProps = {
  label: "Active Users",
  value: "12.4K",
  delta: "23% this week",
  deltaDirection: "up" as DeltaDirection,
  accentColor: "indigo" as AccentColor,
  showSparkline: true,
  showIcon: true,
}

addPropertyControls(StatCard, {
  label: { type: ControlType.String, title: "Label", defaultValue: "Active Users" },
  value: { type: ControlType.String, title: "Value", defaultValue: "12.4K" },
  delta: { type: ControlType.String, title: "Delta", defaultValue: "23% this week" },
  deltaDirection: {
    type: ControlType.Enum,
    title: "Delta Direction",
    options: ["up", "down", "neutral"],
    optionTitles: ["Up ↑", "Down ↓", "Neutral"],
    defaultValue: "up",
  },
  accentColor: {
    type: ControlType.Enum,
    title: "Accent Color",
    options: ["indigo", "sky", "emerald", "amber", "purple"],
    optionTitles: ["Indigo", "Sky", "Emerald", "Amber", "Purple"],
    defaultValue: "indigo",
  },
  showSparkline: { type: ControlType.Boolean, title: "Sparkline", defaultValue: true },
  showIcon: { type: ControlType.Boolean, title: "Icon", defaultValue: true },
})
