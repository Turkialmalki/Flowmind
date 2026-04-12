// SectionHeader.tsx
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

type Align = "left" | "center" | "right"

interface SectionHeaderProps {
  eyebrow: string
  headline: string
  accentWord: string
  description: string
  align: Align
  showEyebrow: boolean
  showDescription: boolean
  maxDescWidth: number
}

export default function SectionHeader({
  eyebrow,
  headline,
  accentWord,
  description,
  align,
  showEyebrow,
  showDescription,
  maxDescWidth,
}: SectionHeaderProps) {
  // Replace accentWord in headline with gradient-colored span
  const renderHeadline = () => {
    if (!accentWord || !headline.includes(accentWord)) {
      return <span>{headline}</span>
    }
    const parts = headline.split(accentWord)
    return (
      <>
        {parts[0]}
        <span
          style={{
            background: "linear-gradient(135deg, #6C5CE7, #8E7CFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {accentWord}
        </span>
        {parts[1]}
      </>
    )
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems:
          align === "center"
            ? "center"
            : align === "right"
              ? "flex-end"
              : "flex-start",
        textAlign: align,
        gap: "0",
      }}
    >
      {showEyebrow && eyebrow && (
        <div
          style={{
            fontFamily: "'Fira Code', 'Cascadia Code', monospace",
            fontSize: "12px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "#5b5bd6",
            marginBottom: "16px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {align === "left" && (
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "1.5px",
                background: "#5b5bd6",
                flexShrink: 0,
              }}
            />
          )}
          {eyebrow}
        </div>
      )}

      <h2
        style={{
          fontFamily: "'Sora', 'Inter', system-ui, sans-serif",
          fontSize: "clamp(32px, 4.5vw, 52px)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: "16px",
          color: "#0a0e1a",
        }}
      >
        {renderHeadline()}
      </h2>

      {showDescription && description && (
        <p
          style={{
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontSize: "17px",
            lineHeight: 1.7,
            color: "#374151",
            maxWidth: `${maxDescWidth}px`,
            margin: align === "center" ? "0 auto" : "0",
          }}
        >
          {description}
        </p>
      )}
    </div>
  )
}

SectionHeader.defaultProps = {
  eyebrow: "What Makes It Different",
  headline: "Everything a funded startup has — at $49",
  accentWord: "at $49",
  description:
    "Not just aesthetics. Every element is placed and worded to drive signups, reduce bounce, and build instant credibility from the moment a visitor lands.",
  align: "left" as Align,
  showEyebrow: true,
  showDescription: true,
  maxDescWidth: 540,
}

addPropertyControls(SectionHeader, {
  eyebrow: {
    type: ControlType.String,
    title: "Eyebrow",
    defaultValue: "What Makes It Different",
  },
  headline: {
    type: ControlType.String,
    title: "Headline",
    displayTextArea: true,
    defaultValue: "Everything a funded startup has — at $49",
  },
  accentWord: {
    type: ControlType.String,
    title: "Accent Word",
    description: "The word/phrase in the headline to colorize with the gradient",
    defaultValue: "at $49",
  },
  description: {
    type: ControlType.String,
    title: "Description",
    displayTextArea: true,
    defaultValue:
      "Not just aesthetics. Every element is placed and worded to drive signups, reduce bounce, and build instant credibility.",
  },
  align: {
    type: ControlType.Enum,
    title: "Alignment",
    options: ["left", "center", "right"],
    optionTitles: ["Left", "Center", "Right"],
    defaultValue: "left",
  },
  showEyebrow: {
    type: ControlType.Boolean,
    title: "Show Eyebrow",
    defaultValue: true,
  },
  showDescription: {
    type: ControlType.Boolean,
    title: "Show Description",
    defaultValue: true,
  },
  maxDescWidth: {
    type: ControlType.Number,
    title: "Desc Max Width",
    defaultValue: 540,
    min: 200,
    max: 900,
    step: 10,
    unit: "px",
  },
})
