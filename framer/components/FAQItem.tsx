// FAQItem.tsx — Pixel-perfect BaseBox FAQ accordion item
import * as React from "react"
import { useState } from "react"
import { addPropertyControls, ControlType } from "framer"

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  showDivider: boolean
}

export default function FAQItem({
  question,
  answer,
  isOpen: defaultOpen,
  showDivider,
}: FAQItemProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div style={{
      background: "#ffffff",
      borderRadius: showDivider ? 0 : "14px",
      overflow: "hidden",
      boxSizing: "border-box",
      ...(showDivider
        ? { borderBottom: "1.5px solid rgba(15,23,42,0.07)" }
        : {
            border: "1.5px solid rgba(15,23,42,0.07)",
            boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.03)",
          }),
    }}>
      {/* Question row */}
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "16px",
          padding: showDivider ? "22px 0" : "22px 24px",
          background: "none", border: "none", cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          fontSize: "15px", fontWeight: 600, color: "#0a0e1a",
          lineHeight: 1.4, letterSpacing: "-0.01em",
        }}>
          {question}
        </span>

        {/* Plus icon — rotates to × when open */}
        <div style={{
          width: "28px", height: "28px", borderRadius: "50%",
          background: open ? "rgba(91,91,214,0.08)" : "#eff1f8",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          transition: "background 0.2s",
        }} aria-hidden="true">
          <svg
            width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke={open ? "#5b5bd6" : "#6b7280"} strokeWidth="2.5"
            style={{ transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)", transform: open ? "rotate(45deg)" : "none" }}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </button>

      {/* Answer */}
      <div style={{
        maxHeight: open ? "400px" : "0",
        overflow: "hidden",
        transition: "max-height 0.3s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <p style={{
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          fontSize: "14px", lineHeight: 1.75, color: "#6b7280",
          margin: 0,
          padding: showDivider ? "0 0 22px" : "0 24px 22px",
        }}>
          {answer}
        </p>
      </div>
    </div>
  )
}

FAQItem.defaultProps = {
  question: "Do I need to know how to code?",
  answer: "No. Everything is built in Framer's visual editor. Swap text, update images, change colors — all drag and drop. If you can use Canva, you can launch with BaseBox.",
  isOpen: false,
  showDivider: true,
}

addPropertyControls(FAQItem, {
  question: {
    type: ControlType.String,
    title: "Question",
    defaultValue: "Do I need to know how to code?",
  },
  answer: {
    type: ControlType.String,
    title: "Answer",
    displayTextArea: true,
    defaultValue: "No. Everything is built in Framer's visual editor. Swap text, update images, change colors — all drag and drop.",
  },
  isOpen: {
    type: ControlType.Boolean,
    title: "Open (preview)",
    defaultValue: false,
  },
  showDivider: {
    type: ControlType.Boolean,
    title: "Divider Style",
    description: "Use border-bottom dividers instead of card border",
    defaultValue: true,
  },
})
