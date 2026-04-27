// PricingCard.tsx — Pixel-perfect BaseBox pricing card
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

interface MetaItem { text: string; type: "bolt" | "check" }
interface PricingCardProps {
  planName: string
  description: string
  originalPrice: string
  price: string
  currency: string
  urgencyText: string
  metaItems: MetaItem[]
  badgeText: string
  isPopular: boolean
  features: string[]
  ctaText: string
  ctaLink: string
  guarantee: string
  savingsNote: string
}

const BoltIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }} aria-hidden="true">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
)

const CheckSmIcon = ({ color }: { color: string }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" style={{ flexShrink: 0 }} aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }} aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
)

const ShieldIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }} aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
)

export default function PricingCard({
  planName,
  description,
  originalPrice,
  price,
  currency,
  urgencyText,
  metaItems,
  badgeText,
  isPopular,
  features,
  ctaText,
  ctaLink,
  guarantee,
  savingsNote,
}: PricingCardProps) {
  const accentClr  = isPopular ? "#5b5bd6" : "#059669"
  const ctaBg      = isPopular
    ? "linear-gradient(135deg, #6C5CE7 0%, #7C4DFF 50%, #8E7CFF 100%)"
    : "transparent"
  const ctaColor   = isPopular ? "#ffffff" : "#0a0e1a"
  const ctaBorder  = isPopular ? "none" : "1.5px solid rgba(15,23,42,0.13)"
  const ctaShadow  = isPopular
    ? "0 0 0 1px rgba(109,40,217,0.3), 0 4px 20px rgba(109,40,217,0.28)"
    : "0 1px 3px rgba(15,23,42,0.06)"

  return (
    <div style={{
      position: "relative",
      background: "#ffffff",
      border: isPopular ? "2px solid #5b5bd6" : "1.5px solid rgba(15,23,42,0.07)",
      borderRadius: "20px",
      padding: isPopular ? "32px" : "28px",
      display: "flex", flexDirection: "column", gap: "0",
      boxShadow: isPopular
        ? "0 8px 28px rgba(15,23,42,0.10), 0 2px 8px rgba(15,23,42,0.04), 0 0 0 1px rgba(91,91,214,0.06)"
        : "0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.03)",
      boxSizing: "border-box",
    }}>

      {/* Popular badge */}
      {isPopular && badgeText && (
        <div style={{
          position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
          background: "linear-gradient(135deg, #6C5CE7 0%, #7C4DFF 50%, #8E7CFF 100%)",
          color: "#fff", fontSize: "12px",
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          fontWeight: 600, padding: "4px 16px", borderRadius: "9999px",
          whiteSpace: "nowrap",
          boxShadow: "0 0 0 1px rgba(109,40,217,0.3), 0 4px 20px rgba(109,40,217,0.28)",
        }}>{badgeText}</div>
      )}

      {/* Plan name */}
      <div style={{
        fontFamily: "'Sora', 'Inter', system-ui, sans-serif",
        fontSize: "20px", fontWeight: 700, color: "#0a0e1a",
        marginBottom: "8px", letterSpacing: "-0.01em",
      }}>{planName}</div>

      {/* Description */}
      <p style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        fontSize: "14px", lineHeight: 1.6, color: "#6b7280",
        margin: "0 0 20px",
      }}>{description}</p>

      {/* Original (strikethrough) price */}
      {originalPrice && (
        <div style={{
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          fontSize: "14px", color: "#9ca3af",
          textDecoration: "line-through", marginBottom: "4px",
        }}>{originalPrice}</div>
      )}

      {/* Price */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "2px", marginBottom: "6px" }}>
        <span style={{
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          fontSize: "18px", fontWeight: 700, color: "#374151", marginTop: "6px",
        }}>{currency}</span>
        <span style={{
          fontFamily: "'Sora', 'Inter', system-ui, sans-serif",
          fontSize: "52px", fontWeight: 800, letterSpacing: "-0.04em",
          lineHeight: 1, color: "#0a0e1a",
        }}>{price}</span>
      </div>

      {/* Urgency row */}
      {urgencyText && (
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          fontSize: "12px", color: "#6b7280", fontWeight: 500,
          marginBottom: "16px",
        }}>
          <ClockIcon />
          {urgencyText}
        </div>
      )}

      {/* Meta items */}
      {(metaItems || []).length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", marginBottom: "20px" }}>
          {(metaItems || []).map((m, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "7px",
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              fontSize: "12.5px", color: "#374151",
            }}>
              {m.type === "bolt"
                ? <BoltIcon />
                : <CheckSmIcon color={accentClr} />}
              {m.text}
            </div>
          ))}
        </div>
      )}

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(15,23,42,0.07)", margin: "0 0 20px" }} />

      {/* Feature list */}
      <ul style={{ listStyle: "none", margin: "0 0 24px", padding: 0, display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
        {(features || []).map((f, i) => (
          <li key={i} style={{
            display: "flex", alignItems: "flex-start", gap: "10px",
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontSize: "14px", color: "#374151", lineHeight: 1.5,
          }}>
            <CheckSmIcon color={accentClr} />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a href={ctaLink} style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
        padding: isPopular ? "15px" : "13px 20px",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        fontSize: isPopular ? "16px" : "14px", fontWeight: 600,
        color: ctaColor, background: ctaBg, border: ctaBorder,
        borderRadius: "9999px", textDecoration: "none", cursor: "pointer",
        marginBottom: "16px", boxShadow: ctaShadow,
        transition: "all 0.25s",
      }}>
        {ctaText}
        {isPopular && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        )}
      </a>

      {/* Savings note */}
      {savingsNote && isPopular && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          fontSize: "12px", color: "#d97706", fontWeight: 500, marginBottom: "12px",
        }}>
          <StarIcon />
          {savingsNote}
        </div>
      )}

      {/* Guarantee */}
      {guarantee && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          fontSize: "12px", color: "#9ca3af",
        }}>
          <ShieldIcon />
          {guarantee}
        </div>
      )}
    </div>
  )
}

PricingCard.defaultProps = {
  planName: "Pro",
  description: "The complete BaseBox kit — every screen, page, and UI component you need to launch and grow.",
  originalPrice: "$99",
  price: "49",
  currency: "$",
  urgencyText: "Launch price — save $50 today",
  metaItems: [
    { text: "Instant access after purchase",         type: "bolt"  },
    { text: "One-time payment — no subscription ever", type: "check" },
    { text: "Use on unlimited personal projects",    type: "check" },
  ] as MetaItem[],
  badgeText: "⭐ Best Value — Most Popular",
  isPopular: true,
  features: [
    "All 6 marketing pages",
    "Full dashboard UI kit",
    "Settings & profile screens",
    "Empty states for every screen",
    "Framer CMS (blog, team, changelog)",
    "Animations & micro-interactions",
    "Lifetime updates + priority support",
  ],
  ctaText: "Get Pro — Launch Today",
  ctaLink: "/signup",
  guarantee: "One-time payment · Lifetime updates",
  savingsNote: "Saves $3,450+ vs. hiring a designer",
}

addPropertyControls(PricingCard, {
  planName:      { type: ControlType.String,  title: "Plan Name",     defaultValue: "Pro" },
  description:   { type: ControlType.String,  title: "Description",   displayTextArea: true, defaultValue: "The complete BaseBox kit — every screen you need to launch and grow." },
  originalPrice: { type: ControlType.String,  title: "Original Price",defaultValue: "$99" },
  price:         { type: ControlType.String,  title: "Price",         defaultValue: "49" },
  currency:      { type: ControlType.String,  title: "Currency",      defaultValue: "$" },
  urgencyText:   { type: ControlType.String,  title: "Urgency Text",  defaultValue: "Launch price — save $50 today" },
  metaItems: {
    type: ControlType.Array,
    title: "Meta Items",
    control: {
      type: ControlType.Object,
      controls: {
        text: { type: ControlType.String, title: "Text" },
        type: { type: ControlType.Enum, title: "Icon", options: ["bolt", "check"], optionTitles: ["Bolt ⚡", "Check ✓"] },
      },
    },
    defaultValue: [
      { text: "Instant access after purchase", type: "bolt" },
      { text: "One-time payment — no subscription ever", type: "check" },
    ],
  },
  isPopular:  { type: ControlType.Boolean, title: "Popular (Featured)", defaultValue: true },
  badgeText:  {
    type: ControlType.String,  title: "Badge Text",
    defaultValue: "⭐ Best Value — Most Popular",
    hidden: (props: PricingCardProps) => !props.isPopular,
  },
  features: {
    type: ControlType.Array,
    title: "Features",
    control: { type: ControlType.String },
    defaultValue: ["All 6 marketing pages", "Full dashboard UI kit", "Lifetime updates"],
  },
  ctaText:     { type: ControlType.String, title: "CTA Text",       defaultValue: "Get Pro — Launch Today" },
  ctaLink:     { type: ControlType.Link,   title: "CTA Link" },
  guarantee:   { type: ControlType.String, title: "Guarantee Line", defaultValue: "One-time payment · Lifetime updates" },
  savingsNote: {
    type: ControlType.String, title: "Savings Note",
    defaultValue: "Saves $3,450+ vs. hiring a designer",
    hidden: (props: PricingCardProps) => !props.isPopular,
  },
})
