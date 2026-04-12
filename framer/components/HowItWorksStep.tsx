// HowItWorksStep.tsx
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

type StepColor = "indigo" | "sky" | "emerald" | "amber" | "purple"

interface HowItWorksStepProps {
  stepNumber: number
  title: string
  description: string
  accentColor: StepColor
  showConnector: boolean
  isLast: boolean
}

const colorMap: Record<StepColor, { bg: string; color: string; border: string }> = {
  indigo: {
    bg: "rgba(91,91,214,0.08)",
    color: "#5b5bd6",
    border: "rgba(91,91,214,0.2)",
  },
  sky: {
    bg: "rgba(14,165,233,0.08)",
    color: "#0ea5e9",
    border: "rgba(14,165,233,0.2)",
  },
  emerald: {
    bg: "rgba(5,150,105,0.08)",
    color: "#059669",
    border: "rgba(5,150,105,0.2)",
  },
  amber: {
    bg: "rgba(217,119,6,0.08)",
    color: "#d97706",
    border: "rgba(217,119,6,0.2)",
  },
  purple: {
    bg: "rgba(124,58,237,0.08)",
    color: "#7c3aed",
    border: "rgba(124,58,237,0.2)",
  },
}

export default function HowItWorksStep({
  stepNumber,
  title,
  description,
  accentColor,
  showConnector,
  isLast,
}: HowItWorksStepProps) {
  const ac = colorMap[accentColor]

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0",
        flex: 1,
        position: "relative",
      }}
    >
      {/* Connector line (goes to the right, hidden on last step) */}
      {showConnector && !isLast && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "22px",
            left: "calc(50% + 22px)",
            right: "calc(-50% + 22px)",
            height: "1px",
            background: `linear-gradient(to right, ${ac.border}, rgba(15,23,42,0.07))`,
            zIndex: 0,
          }}
        />
      )}

      {/* Step number bubble */}
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: ac.bg,
          border: `1.5px solid ${ac.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Sora', 'Inter', system-ui, sans-serif",
          fontSize: "15px",
          fontWeight: 800,
          color: ac.color,
          letterSpacing: "-0.02em",
          marginBottom: "20px",
          flexShrink: 0,
          position: "relative",
          zIndex: 1,
        }}
        aria-label={`Step ${stepNumber}`}
      >
        {stepNumber}
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
        }}
      >
        {description}
      </p>
    </div>
  )
}

HowItWorksStep.defaultProps = {
  stepNumber: 1,
  title: "Get BaseBox",
  description:
    "Purchase once and get instant access. No subscription, no waiting — download and open in Framer immediately.",
  accentColor: "indigo" as StepColor,
  showConnector: true,
  isLast: false,
}

addPropertyControls(HowItWorksStep, {
  stepNumber: {
    type: ControlType.Number,
    title: "Step Number",
    defaultValue: 1,
    min: 1,
    max: 9,
    step: 1,
    displayStepper: true,
  },
  title: {
    type: ControlType.String,
    title: "Title",
    defaultValue: "Get BaseBox",
  },
  description: {
    type: ControlType.String,
    title: "Description",
    displayTextArea: true,
    defaultValue:
      "Purchase once and get instant access. No subscription, no waiting — open in Framer immediately.",
  },
  accentColor: {
    type: ControlType.Enum,
    title: "Accent Color",
    options: ["indigo", "sky", "emerald", "amber", "purple"],
    optionTitles: ["Indigo", "Sky", "Emerald", "Amber", "Purple"],
    defaultValue: "indigo",
  },
  showConnector: {
    type: ControlType.Boolean,
    title: "Connector Line",
    description: "Show horizontal connector to next step",
    defaultValue: true,
  },
  isLast: {
    type: ControlType.Boolean,
    title: "Is Last Step",
    defaultValue: false,
  },
})
