// Button.tsx
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

type Variant = "primary" | "outline" | "purple"
type Size = "sm" | "md" | "lg" | "xl"

interface ButtonProps {
  label: string
  link: string
  openInNewTab: boolean
  variant: Variant
  size: Size
  showArrow: boolean
  fullWidth: boolean
}

// ── Style maps ─────────────────────────────────────────────────────────────

const variantStyles: Record<Variant, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, #6C5CE7 0%, #7C4DFF 50%, #8E7CFF 100%)",
    color: "#ffffff",
    border: "none",
    boxShadow: "0 0 0 1px rgba(109,40,217,0.3), 0 4px 20px rgba(109,40,217,0.25)",
  },
  outline: {
    background: "transparent",
    color: "#0a0e1a",
    border: "1.5px solid rgba(15,23,42,0.13)",
    boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.03)",
  },
  purple: {
    background: "rgba(124,58,237,0.08)",
    color: "#7c3aed",
    border: "1.5px solid rgba(124,58,237,0.2)",
    boxShadow: "none",
  },
}

const sizeStyles: Record<Size, React.CSSProperties> = {
  sm: { padding: "8px 18px", fontSize: "13px" },
  md: { padding: "10px 22px", fontSize: "14px" },
  lg: { padding: "13px 28px", fontSize: "15px" },
  xl: { padding: "15px 32px", fontSize: "16px" },
}

// ── Component ──────────────────────────────────────────────────────────────

export default function Button({
  label,
  link,
  openInNewTab,
  variant,
  size,
  showArrow,
  fullWidth,
}: ButtonProps) {
  return (
    <a
      href={link}
      target={openInNewTab ? "_blank" : "_self"}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        borderRadius: "9999px",
        cursor: "pointer",
        textDecoration: "none",
        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
        width: fullWidth ? "100%" : "auto",
        whiteSpace: "nowrap",
        ...variantStyles[variant],
        ...sizeStyles[size],
      }}
    >
      {label}
      {showArrow && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      )}
    </a>
  )
}

// ── Defaults ───────────────────────────────────────────────────────────────

Button.defaultProps = {
  label: "Get Started",
  link: "/",
  openInNewTab: false,
  variant: "primary" as Variant,
  size: "md" as Size,
  showArrow: true,
  fullWidth: false,
}

// ── Property Controls ──────────────────────────────────────────────────────

addPropertyControls(Button, {
  label: {
    type: ControlType.String,
    title: "Label",
    defaultValue: "Get Started",
  },
  link: {
    type: ControlType.Link,
    title: "Link",
  },
  openInNewTab: {
    type: ControlType.Boolean,
    title: "New Tab",
    defaultValue: false,
  },
  variant: {
    type: ControlType.Enum,
    title: "Variant",
    options: ["primary", "outline", "purple"],
    optionTitles: ["Primary (Gradient)", "Outline", "Purple"],
    defaultValue: "primary",
  },
  size: {
    type: ControlType.Enum,
    title: "Size",
    options: ["sm", "md", "lg", "xl"],
    optionTitles: ["Small", "Medium", "Large", "XL"],
    defaultValue: "md",
  },
  showArrow: {
    type: ControlType.Boolean,
    title: "Arrow Icon",
    defaultValue: true,
  },
  fullWidth: {
    type: ControlType.Boolean,
    title: "Full Width",
    defaultValue: false,
  },
})
