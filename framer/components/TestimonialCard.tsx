// TestimonialCard.tsx — Pixel-perfect BaseBox testimonial card
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #6C5CE7, #8E7CFF)",
  "linear-gradient(135deg, #5B5BD6, #E11D48)",
  "linear-gradient(135deg, #059669, #0EA5E9)",
  "linear-gradient(135deg, #0ea5e9, #6C5CE7)",
  "linear-gradient(135deg, #d97706, #e11d48)",
]

interface TestimonialCardProps {
  outcomeText: string
  quote: string
  authorName: string
  authorRole: string
  avatarGradientIndex: number
  avatarUrl: string
  stars: number
  showVerified: boolean
  showOutcome: boolean
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="1.5" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

const VerifiedIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export default function TestimonialCard({
  outcomeText,
  quote,
  authorName,
  authorRole,
  avatarGradientIndex,
  avatarUrl,
  stars,
  showVerified,
  showOutcome,
}: TestimonialCardProps) {
  const avatarGrad = AVATAR_GRADIENTS[Math.max(0, Math.min(avatarGradientIndex, AVATAR_GRADIENTS.length - 1))]

  return (
    <div style={{
      background: "#ffffff",
      border: "1.5px solid rgba(15,23,42,0.07)",
      borderRadius: "20px",
      padding: "28px",
      display: "flex", flexDirection: "column", gap: "0",
      boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.03)",
      boxSizing: "border-box", position: "relative",
      transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
    }}>

      {/* Stars + Verified row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <div style={{ display: "flex", gap: "2px" }} role="img" aria-label={`${stars} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((n) => <StarIcon key={n} filled={n <= stars} />)}
        </div>
        {showVerified && (
          <div style={{
            display: "flex", alignItems: "center", gap: "4px",
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontSize: "11px", fontWeight: 600, color: "#5b5bd6",
            background: "rgba(91,91,214,0.07)", padding: "3px 9px",
            borderRadius: "9999px",
          }}>
            <VerifiedIcon />
            Verified Purchase
          </div>
        )}
      </div>

      {/* Outcome chip */}
      {showOutcome && outcomeText && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          padding: "5px 12px", borderRadius: "9999px",
          background: "rgba(5,150,105,0.07)",
          border: "1px solid rgba(5,150,105,0.15)",
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          fontSize: "12px", fontWeight: 600, color: "#059669",
          marginBottom: "14px", alignSelf: "flex-start",
        }}>
          <span style={{ color: "#059669" }}><CheckIcon /></span>
          {outcomeText}
        </div>
      )}

      {/* Quote */}
      <p style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        fontSize: "15px", lineHeight: 1.75, color: "#374151",
        margin: "0 0 24px", flex: 1,
        position: "relative", zIndex: 1,
      }}>
        {quote}
      </p>

      {/* Author */}
      <div style={{
        display: "flex", alignItems: "center", gap: "12px",
        paddingTop: "20px", borderTop: "1.5px solid rgba(15,23,42,0.07)",
      }}>
        {/* Avatar */}
        <div style={{
          width: "42px", height: "42px", borderRadius: "50%",
          background: avatarUrl ? "transparent" : avatarGrad,
          flexShrink: 0, overflow: "hidden",
          border: "2px solid rgba(15,23,42,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={authorName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{
              fontFamily: "'Sora', 'Inter', system-ui, sans-serif",
              fontSize: "17px", fontWeight: 700, color: "#ffffff",
            }} aria-hidden="true">
              {authorName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* Name + role */}
        <div>
          <div style={{
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontSize: "14px", fontWeight: 700, color: "#0a0e1a", letterSpacing: "-0.01em",
          }}>{authorName}</div>
          <div style={{
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontSize: "12px", color: "#9ca3af", marginTop: "2px",
          }}>{authorRole}</div>
        </div>
      </div>
    </div>
  )
}

TestimonialCard.defaultProps = {
  outcomeText: "First 50 signups in 3 days",
  quote: '"Saved me at least two weeks of design work. Honestly the dashboard screens were the thing I didn\'t know I needed — investors asked if we had a real product before seeing our deck. We did, kind of."',
  authorName: "James K.",
  authorRole: "Founder, AI writing tool",
  avatarGradientIndex: 0,
  avatarUrl: "",
  stars: 5,
  showVerified: true,
  showOutcome: true,
}

addPropertyControls(TestimonialCard, {
  outcomeText: {
    type: ControlType.String,
    title: "Outcome",
    defaultValue: "First 50 signups in 3 days",
  },
  quote: {
    type: ControlType.String,
    title: "Quote",
    displayTextArea: true,
    defaultValue: '"Saved me at least two weeks of design work. The dashboard screens were worth it alone."',
  },
  authorName: { type: ControlType.String,  title: "Author Name", defaultValue: "James K." },
  authorRole: { type: ControlType.String,  title: "Role & Company", defaultValue: "Founder, AI writing tool" },
  avatarUrl:  { type: ControlType.Image,   title: "Avatar Image" },
  avatarGradientIndex: {
    type: ControlType.Number,
    title: "Avatar Gradient",
    defaultValue: 0,
    min: 0, max: 4, step: 1,
    displayStepper: true,
    description: "0–4 preset gradients",
  },
  stars: {
    type: ControlType.Number,
    title: "Stars",
    defaultValue: 5, min: 0, max: 5, step: 1, displayStepper: true,
  },
  showVerified: { type: ControlType.Boolean, title: "Verified Badge",  defaultValue: true },
  showOutcome:  { type: ControlType.Boolean, title: "Outcome Chip",    defaultValue: true },
})
