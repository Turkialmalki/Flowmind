export const tokens = {
  colors: {
    // Backgrounds
    bg: "#ffffff",
    bg2: "#f7f8fc",
    bg3: "#eff1f8",
    bg4: "#e2e6f0",

    // Borders
    border: "rgba(15,23,42,0.07)",
    border2: "rgba(15,23,42,0.13)",

    // Text
    t1: "#0a0e1a",
    t2: "#374151",
    t3: "#6b7280",
    t4: "#9ca3af",

    // Brand
    indigo: "#5b5bd6",
    indigo2: "#7c7ce8",
    indigoG: "rgba(91,91,214,0.08)",

    // Semantic
    sky: "#0ea5e9",
    skyG: "rgba(14,165,233,0.08)",
    emerald: "#059669",
    emeraldBg: "rgba(5,150,105,0.08)",
    amber: "#d97706",
    amberBg: "rgba(217,119,6,0.08)",
    rose: "#e11d48",
    purple: "#7c3aed",
    purpleBg: "rgba(124,58,237,0.08)",

    // Gradients (as strings for inline style background)
    grad: "linear-gradient(135deg, #6C5CE7, #8E7CFF)",
    grad2: "linear-gradient(135deg, #6C5CE7 0%, #7C4DFF 50%, #8E7CFF 100%)",
  },

  fonts: {
    sans: "'Inter', system-ui, -apple-system, sans-serif",
    display: "'Sora', 'Inter', system-ui, sans-serif",
    mono: "'Fira Code', 'Cascadia Code', monospace",
  },

  radius: {
    sm: "10px",
    md: "14px",
    lg: "20px",
    full: "9999px",
  },

  shadow: {
    sm: "0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.03)",
    md: "0 4px 16px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04)",
    lg: "0 8px 28px rgba(15,23,42,0.1), 0 2px 8px rgba(15,23,42,0.04)",
    xl: "0 20px 60px rgba(15,23,42,0.12), 0 4px 16px rgba(15,23,42,0.05)",
    indigoBtnGlow:
      "0 0 0 1px rgba(109,40,217,0.3), 0 4px 20px rgba(109,40,217,0.25)",
  },

  spacing: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
    section: "100px",
  },

  transition: {
    fast: "all 0.15s cubic-bezier(0.4,0,0.2,1)",
    base: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
    slow: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
  },
} as const

export type Tokens = typeof tokens
