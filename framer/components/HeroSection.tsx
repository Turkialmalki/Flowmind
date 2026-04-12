// HeroSection.tsx — Two-column layout matching reference exactly
// LEFT: text content (max-width 520px, left-aligned)
// RIGHT: dashboard mockup (max-width 580px) + floating cards (positioned relative to right column)
import * as React from "react"
import { useState, useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"

const HERO_STYLES = `
  @keyframes bb-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes bb-float-d {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes bb-float-pm {
    0%, 100% { transform: translate3d(0,0,0) rotate(0deg); }
    50%       { transform: translate3d(0,-10px,0) rotate(3deg); }
  }
  @keyframes bb-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.35; }
  }
  @keyframes bb-gx {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes bb-fade-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes bb-chart-fill-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes bb-chart-draw {
    from { stroke-dashoffset: 1; }
    to   { stroke-dashoffset: 0; }
  }
  .bb-fl1  { animation: bb-float   5s ease-in-out infinite; }
  .bb-fl2  { animation: bb-float-d 5s ease-in-out 1.5s infinite; }
  .bb-fl3  { animation: bb-float   4s ease-in-out 0.8s infinite; }
  .bb-flpm { animation: bb-float-pm 5s ease-in-out infinite; }
  .bb-cta-btn {
    background-size: 200% 200% !important;
    animation: bb-gx 3s ease infinite !important;
    transition: transform 0.25s, box-shadow 0.25s !important;
  }
  .bb-cta-btn:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 0 0 1px rgba(109,40,217,0.35), 0 12px 40px rgba(109,40,217,0.48) !important;
  }
  .bb-chart-fill { animation: bb-chart-fill-in 0.55s ease both; }
  .bb-chart-line { stroke-dasharray: 1; stroke-dashoffset: 0; animation: bb-chart-draw 0.9s ease both; }
`

type Period = "24h" | "7d" | "30d"

const PERIOD_DATA: Record<Period, { fill: string; stroke: string; dot: { cx: number; cy: number }; delta: string }> = {
  "24h": {
    fill:   "M0,92 C60,86 120,78 180,70 C240,62 290,68 350,58 C410,48 460,36 520,28 C580,20 635,26 695,17 C748,10 778,12 800,10 L800,130 L0,130Z",
    stroke: "M0,92 C60,86 120,78 180,70 C240,62 290,68 350,58 C410,48 460,36 520,28 C580,20 635,26 695,17 C748,10 778,12 800,10",
    dot: { cx: 520, cy: 28 },
    delta: "↑ 4.2% today",
  },
  "7d": {
    fill:   "M0,105 C50,95 100,80 160,70 C220,60 280,75 340,60 C400,45 450,30 500,23 C560,16 620,30 680,20 C740,13 780,17 800,14 L800,130 L0,130Z",
    stroke: "M0,105 C50,95 100,80 160,70 C220,60 280,75 340,60 C400,45 450,30 500,23 C560,16 620,30 680,20 C740,13 780,17 800,14",
    dot: { cx: 500, cy: 23 },
    delta: "↑ 23% this week",
  },
  "30d": {
    fill:   "M0,120 C80,112 160,102 250,90 C330,78 400,64 480,50 C545,38 615,27 695,18 C750,12 782,11 800,10 L800,130 L0,130Z",
    stroke: "M0,120 C80,112 160,102 250,90 C330,78 400,64 480,50 C545,38 615,27 695,18 C750,12 782,11 800,10",
    dot: { cx: 695, cy: 18 },
    delta: "↑ 48% this month",
  },
}

interface HeroSectionProps {
  pillText: string
  headline: string
  accentLine: string
  subheadline: string
  ctaPrimaryText: string
  ctaPrimaryLink: string
  microTrust: string
  stat1Label: string
  stat1Value: string
  stat2Label: string
  stat2Value: string
  stat2Delta: string
  stat3Label: string
  stat3Value: string
  stat3Delta: string
  darkBackground: boolean
}

export default function HeroSection({
  pillText,
  headline,
  accentLine,
  subheadline,
  ctaPrimaryText,
  ctaPrimaryLink,
  microTrust,
  stat1Label,
  stat1Value,
  stat2Label,
  stat2Value,
  stat2Delta,
  stat3Label,
  stat3Value,
  stat3Delta,
  darkBackground,
}: HeroSectionProps) {
  const [period, setPeriod] = useState<Period>("7d")
  const [chartKey, setChartKey] = useState(0)

  useEffect(() => {
    const id = "bb-hero-keyframes"
    if (!document.getElementById(id)) {
      const el = document.createElement("style")
      el.id = id
      el.textContent = HERO_STYLES
      document.head.appendChild(el)
    }
  }, [])

  const cd = PERIOD_DATA[period]

  const handlePeriod = (p: Period) => {
    if (p === period) return
    setPeriod(p)
    setChartKey((k) => k + 1)
  }

  const dk = darkBackground

  // ── colour aliases ──────────────────────────────────────────────
  const txt1      = dk ? "#ffffff"                        : "#0a0e1a"
  const txt2      = dk ? "rgba(255,255,255,0.72)"         : "#374151"
  const txt3      = dk ? "rgba(255,255,255,0.42)"         : "#9ca3af"
  const pillBg    = dk ? "rgba(91,91,214,0.18)"           : "rgba(91,91,214,0.07)"
  const pillBdr   = dk ? "rgba(91,91,214,0.38)"           : "rgba(91,91,214,0.16)"
  const pillClr   = dk ? "#a5b4fc"                        : "#5b5bd6"
  const mockBg    = dk ? "#090a1c"                        : "#ffffff"
  const mockBdr   = dk ? "rgba(255,255,255,0.08)"         : "rgba(15,23,42,0.13)"
  const chromeBg  = dk ? "rgba(255,255,255,0.03)"         : "#f7f8fc"
  const chromeBdr = dk ? "rgba(255,255,255,0.06)"         : "rgba(15,23,42,0.07)"
  const statBg    = dk ? "rgba(255,255,255,0.04)"         : "#f7f8fc"
  const statBdr   = dk ? "rgba(255,255,255,0.07)"         : "rgba(15,23,42,0.07)"
  const gridLine  = dk ? "rgba(255,255,255,0.04)"         : "rgba(15,23,42,0.05)"
  const chartFill = dk ? "rgba(91,91,214,0.22)"           : "rgba(91,91,214,0.14)"
  const dotStroke = dk ? "rgba(255,255,255,0.2)"          : "white"
  const urlBg     = dk ? "rgba(255,255,255,0.05)"         : "#eff1f8"
  const floatBg   = dk ? "rgba(9,10,26,0.96)"             : "#ffffff"
  const floatBdr  = dk ? "rgba(255,255,255,0.09)"         : "rgba(15,23,42,0.1)"
  const floatSh   = dk
    ? "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)"
    : "0 8px 28px rgba(15,23,42,0.1), 0 2px 8px rgba(15,23,42,0.04)"

  const heroBg = dk
    ? [
        "radial-gradient(ellipse 62% 55% at 14% 20%, rgba(108,92,231,0.34) 0%, rgba(108,92,231,0.11) 44%, transparent 72%)",
        "radial-gradient(ellipse 54% 50% at 86% 16%, rgba(124,77,255,0.24) 0%, rgba(124,77,255,0.07) 46%, transparent 72%)",
        "radial-gradient(ellipse 80% 45% at 50% 58%, rgba(37,99,235,0.09) 0%, transparent 70%)",
        "radial-gradient(ellipse 94% 40% at 50% 114%, rgba(4,6,18,0.78) 0%, transparent 66%)",
        "linear-gradient(170deg, #050617 0%, #07081c 20%, #090b26 50%, #070a24 78%, #040616 100%)",
      ].join(", ")
    : "linear-gradient(180deg, #f0f1ff 0%, #f6f7ff 40%, #fafbff 65%, #ffffff 90%)"

  return (
    <section
      style={{
        width: "100%",
        minHeight: "100vh",
        background: heroBg,
        display: "flex",
        alignItems: "center",
        // No horizontal padding here — container handles it
        padding: "120px 0 96px",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* ── Background decoration ─────────────────────────────── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {/* Radial orb — top-right */}
        <div style={{
          position: "absolute", top: "-20%", right: "-12%",
          width: "860px", height: "860px", borderRadius: "50%",
          background: `radial-gradient(circle, ${dk ? "rgba(91,91,214,0.24)" : "rgba(91,91,214,0.09)"} 0%, transparent 62%)`,
        }} />
        {/* Radial orb — bottom-left */}
        <div style={{
          position: "absolute", bottom: "-22%", left: "-14%",
          width: "660px", height: "660px", borderRadius: "50%",
          background: `radial-gradient(circle, ${dk ? "rgba(14,165,233,0.18)" : "rgba(14,165,233,0.07)"} 0%, transparent 62%)`,
        }} />
        {/* Dot grid (light mode only) */}
        {!dk && (
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(15,23,42,0.045) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 25%, black 20%, transparent 65%)",
            maskImage: "radial-gradient(ellipse at 50% 25%, black 20%, transparent 65%)",
          }} />
        )}
      </div>

      {/* ── CENTERED CONTAINER (1200px max-width, 0 24px padding) ── */}
      <div style={{
        maxWidth: "1200px",
        width: "100%",
        margin: "0 auto",
        padding: "0 24px",
        boxSizing: "border-box",
        position: "relative",
        zIndex: 1,
      }}>

        {/* ── TWO-COLUMN GRID ─────────────────────────────────── */}
        {/* Left: text (480px) | gap: 80px | Right: mockup (1fr, max 560px) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "480px 1fr",
          gap: "80px",
          alignItems: "center",
        }}>

          {/* ══════════════════════════════════════════════════════
              LEFT COLUMN — Text content, max-width 520px, left-aligned
              Exact spacing per spec:
                Pill        → margin-bottom: 20px
                Headline    → margin-bottom: 12px
                Accent line → margin-bottom: 20px
                Subheadline → margin-bottom: 28px
                CTA         → margin-bottom: 12px
          ══════════════════════════════════════════════════════ */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: "480px",
          }}>

            {/* Pill badge — margin-bottom: 20px */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: pillBg, border: `1.5px solid ${pillBdr}`,
              borderRadius: "9999px", padding: "5px 14px 5px 10px",
              fontSize: "12.5px",
              fontFamily: "'Fira Code', 'Cascadia Code', monospace",
              color: pillClr, letterSpacing: "0.03em",
              marginBottom: "20px",
              animation: "bb-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
            }}>
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#22c55e", flexShrink: 0,
                animation: "bb-pulse 2s ease infinite",
              }} />
              {pillText}
            </div>

            {/* Headline — margin-bottom: 12px */}
            <h1 style={{
              fontFamily: "'Sora', 'Inter', system-ui, sans-serif",
              fontSize: "clamp(38px, 4.2vw, 62px)", fontWeight: 800,
              lineHeight: 1.05, letterSpacing: "-0.03em",
              color: txt1,
              margin: "0 0 12px",
              animation: "bb-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.08s both",
            }}>
              {headline}
            </h1>

            {/* Accent line — margin-bottom: 20px */}
            {accentLine && (
              <div style={{
                fontFamily: "'Sora', 'Inter', system-ui, sans-serif",
                fontSize: "clamp(38px, 4.2vw, 62px)", fontWeight: 800,
                lineHeight: 1.05, letterSpacing: "-0.03em",
                marginBottom: "20px",
                background: dk
                  ? "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #7c4dff 100%)"
                  : "linear-gradient(135deg, #6C5CE7 0%, #7C4DFF 50%, #8E7CFF 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                animation: "bb-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both",
              }}>
                {accentLine}
              </div>
            )}

            {/* Sub-headline — margin-bottom: 28px */}
            <p style={{
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              fontSize: "18px", lineHeight: 1.68, color: txt2,
              margin: "0 0 28px",
              animation: "bb-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.18s both",
            }}>
              {subheadline}
            </p>

            {/* CTA button — width: fit-content, left-aligned, margin-bottom: 8px */}
            <a
              href={ctaPrimaryLink}
              className="bb-cta-btn"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "18px 44px", fontSize: "17px",
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                fontWeight: 700, letterSpacing: "-0.01em", color: "#ffffff",
                background: "linear-gradient(135deg, #6C5CE7 0%, #7C4DFF 50%, #8E7CFF 100%)",
                border: "none", borderRadius: "9999px", textDecoration: "none",
                boxShadow: "0 0 0 1px rgba(109,40,217,0.3), 0 8px 32px rgba(109,40,217,0.38)",
                marginBottom: "8px",
                cursor: "pointer",
                // fit-content: inline-flex already achieves this — do NOT use width: 100%
                animation: "bb-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.26s both",
              }}
            >
              {ctaPrimaryText}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            {/* Micro-trust line — left-aligned under CTA, 8px gap */}
            {microTrust && (
              <p style={{
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                fontSize: "13px", color: txt3, letterSpacing: "0.01em",
                margin: "8px 0 0", opacity: 0.80,
                animation: "bb-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.32s both",
              }}>
                {microTrust}
              </p>
            )}
          </div>

          {/* ══════════════════════════════════════════════════════
              RIGHT COLUMN — Dashboard mockup + floating cards
              position: relative so cards are anchored to this column
              paddingTop/Bottom: give space for cards that overflow
              Floating card positions:
                Card 1 (AI Insights)        → top-left   (top: 0,    left: -20px)
                Card 2 (Dashboard Included) → upper-right (top: 48px, right: -16px)
                Card 3 (Full Screens)       → bottom-right (bottom: 0, right: -16px)
          ══════════════════════════════════════════════════════ */}
          <div style={{
            position: "relative",
            // Padding creates room for cards that extend outside the mockup
            paddingTop: "56px",
            paddingBottom: "56px",
            // Prevent overflow from clipping the floating cards
            overflow: "visible",
            // Constrain right column
            maxWidth: "560px",
            width: "100%",
          }}>

            {/* ── CARD 1: AI Insights — top-left of mockup ── */}
            <div className="bb-flpm" style={{
              position: "absolute",
              top: 0,
              left: "-20px",
              zIndex: 3,
              background: floatBg,
              border: `1px solid ${floatBdr}`,
              borderRadius: "16px",
              padding: "14px 16px",
              boxShadow: floatSh,
              minWidth: "174px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <div style={{
                  width: "26px", height: "26px", borderRadius: "8px",
                  background: "rgba(91,91,214,0.12)", color: "#5b5bd6",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "11px", fontWeight: 600, color: dk ? "rgba(255,255,255,0.6)" : "#6b7280" }}>AI Insights</span>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", marginLeft: "auto", animation: "bb-pulse 2s ease infinite" }} />
              </div>
              <div style={{ fontFamily: "'Sora', 'Inter', system-ui, sans-serif", fontSize: "24px", fontWeight: 800, letterSpacing: "-0.03em", color: dk ? "#fff" : "#0a0e1a", lineHeight: 1, marginBottom: "2px" }}>
                94.8%
              </div>
              <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "11px", color: txt3, marginBottom: "10px" }}>
                Response Accuracy
              </div>
              <svg viewBox="0 0 90 26" style={{ width: "100%", height: "26px" }} preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="hpc-sg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(91,91,214,0.18)" />
                    <stop offset="100%" stopColor="rgba(91,91,214,0)" />
                  </linearGradient>
                </defs>
                <path d="M0,22 C10,19 20,21 30,15 C40,9 50,10 60,6 L75,3 L75,26 L0,26Z" fill="url(#hpc-sg)" />
                <polyline points="0,22 10,19 20,21 30,15 40,9 50,10 60,6 75,3" stroke="#5B5BD6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "10px", color: txt3 }}>1,240 requests today</span>
              </div>
            </div>

            {/* ── CARD 2: Dashboard Included — upper-right ── */}
            <div className="bb-fl1" style={{
              position: "absolute",
              top: "48px",
              right: "-16px",
              zIndex: 3,
              background: floatBg,
              border: `1px solid ${floatBdr}`,
              borderRadius: "14px",
              padding: "10px 14px",
              boxShadow: floatSh,
              display: "flex", alignItems: "center", gap: "10px",
            }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "8px",
                background: "rgba(5,150,105,0.10)", color: "#059669",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "13px", fontWeight: 700, flexShrink: 0,
              }}>✓</div>
              <div>
                <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "12px", fontWeight: 600, color: dk ? "#fff" : "#0a0e1a" }}>Dashboard Included</div>
                <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "11px", color: txt3 }}>Charts, metrics, activity</div>
              </div>
            </div>

            {/* ── CARD 3: Full Screens — bottom-right ── */}
            <div className="bb-fl2" style={{
              position: "absolute",
              bottom: 0,
              right: "-16px",
              zIndex: 3,
              background: floatBg,
              border: `1px solid ${floatBdr}`,
              borderRadius: "14px",
              padding: "10px 14px",
              boxShadow: floatSh,
              display: "flex", alignItems: "center", gap: "10px",
            }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "8px",
                background: "rgba(91,91,214,0.10)", color: "#5b5bd6",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px", fontWeight: 700, flexShrink: 0,
              }}>10+</div>
              <div>
                <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "12px", fontWeight: 600, color: dk ? "#fff" : "#0a0e1a" }}>Full Screens</div>
                <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "11px", color: txt3 }}>Landing to dashboard</div>
              </div>
            </div>

            {/* ── MAIN DASHBOARD MOCKUP ── */}
            <div style={{
              background: mockBg,
              border: `1.5px solid ${mockBdr}`,
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: dk
                ? "0 48px 120px rgba(0,0,0,0.54), 0 12px 36px rgba(91,91,214,0.14)"
                : "0 48px 120px rgba(15,23,42,0.22), 0 12px 36px rgba(91,91,214,0.12)",
              transform: "perspective(1100px) rotateX(4deg)",
              transformOrigin: "top center",
            }}>

              {/* Browser chrome */}
              <div style={{
                display: "flex", alignItems: "center",
                padding: "11px 16px",
                background: chromeBg,
                borderBottom: `1.5px solid ${chromeBdr}`,
              }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                    <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                  ))}
                </div>
                <div style={{
                  flex: 1, background: urlBg, borderRadius: "6px",
                  padding: "4px 12px", margin: "0 24px",
                  fontSize: "11px", fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                  color: txt3, textAlign: "center",
                }}>
                  your-ai-startup.com/dashboard
                </div>
                <div style={{ width: "50px" }} />
              </div>

              {/* Stat cards row */}
              <div style={{ padding: "20px 20px 0", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                {[
                  { label: stat1Label, value: stat1Value, delta: cd.delta },
                  { label: stat2Label, value: stat2Value, delta: stat2Delta },
                  { label: stat3Label, value: stat3Value, delta: stat3Delta },
                ].map((s, i) => (
                  <div key={i} style={{
                    background: statBg,
                    border: `1.5px solid ${statBdr}`,
                    borderRadius: "10px",
                    padding: "16px",
                  }}>
                    <div style={{ fontSize: "11px", fontFamily: "'Inter', system-ui, sans-serif", color: txt3, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>{s.label}</div>
                    <div style={{ fontSize: "24px", fontFamily: "'Sora', 'Inter', system-ui, sans-serif", fontWeight: 700, letterSpacing: "-0.02em", color: dk ? "#fff" : "#0a0e1a", lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: "11px", fontWeight: 600, marginTop: "3px", color: "#059669" }}>{s.delta}</div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div style={{ padding: "14px 20px 20px" }}>
                <div style={{
                  background: statBg,
                  border: `1.5px solid ${statBdr}`,
                  borderRadius: "10px",
                  padding: "18px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <span style={{ fontSize: "13px", fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 600, color: dk ? "#fff" : "#0a0e1a" }}>User Growth</span>
                    <div style={{ display: "flex", gap: "4px" }}>
                      {(["24h", "7d", "30d"] as Period[]).map((p) => (
                        <button key={p} onClick={() => handlePeriod(p)} style={{
                          fontSize: "10px", padding: "4px 10px", borderRadius: "9999px",
                          background: period === p ? "#5b5bd6" : "transparent",
                          border: `1.5px solid ${period === p ? "#5b5bd6" : (dk ? "rgba(255,255,255,0.13)" : "rgba(15,23,42,0.13)")}`,
                          color: period === p ? "#fff" : txt3,
                          cursor: "pointer", fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 500,
                        }}>{p}</button>
                      ))}
                    </div>
                  </div>

                  <svg style={{ width: "100%", height: "130px" }} viewBox="0 0 800 130" preserveAspectRatio="none" aria-label="User growth chart" role="img">
                    <defs>
                      <linearGradient id="hero-chart-g" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={chartFill} />
                        <stop offset="100%" stopColor="rgba(91,91,214,0)" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="33" x2="800" y2="33" stroke={gridLine} />
                    <line x1="0" y1="65" x2="800" y2="65" stroke={gridLine} />
                    <line x1="0" y1="97" x2="800" y2="97" stroke={gridLine} />
                    <path key={`fill-${chartKey}`} className="bb-chart-fill" d={cd.fill} fill="url(#hero-chart-g)" />
                    <path key={`stroke-${chartKey}`} className="bb-chart-line" pathLength="1" d={cd.stroke} fill="none" stroke="#5b5bd6" strokeWidth="2" strokeLinecap="round" />
                    <circle key={`dot-${chartKey}`} cx={cd.dot.cx} cy={cd.dot.cy} r="4" fill="#5b5bd6" stroke={dotStroke} strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
            {/* ── END MOCKUP ── */}

          </div>
          {/* ── END RIGHT COLUMN ── */}

        </div>
        {/* ── END TWO-COLUMN GRID ── */}

      </div>
      {/* ── END CONTAINER ── */}

    </section>
  )
}

HeroSection.defaultProps = {
  pillText: "Full SaaS System · Not Just a Template",
  headline: "A Complete AI SaaS System",
  accentLine: "Ready to Launch in Minutes",
  subheadline: "Landing page, dashboard, authentication, and CMS — everything structured and ready inside Framer.",
  ctaPrimaryText: "Get BaseBox Now",
  ctaPrimaryLink: "/pricing",
  microTrust: "No subscription · Instant access · Lifetime updates",
  stat1Label: "Active Users",
  stat1Value: "12.4K",
  stat2Label: "Conversion Rate",
  stat2Value: "4.8%",
  stat2Delta: "↑ 1.2% vs avg",
  stat3Label: "MRR",
  stat3Value: "$48K",
  stat3Delta: "↑ Growing fast",
  darkBackground: true,
}

addPropertyControls(HeroSection, {
  pillText:       { type: ControlType.String,  title: "Pill Badge",      defaultValue: "Full SaaS System · Not Just a Template" },
  headline:       { type: ControlType.String,  title: "Headline",        defaultValue: "A Complete AI SaaS System" },
  accentLine:     { type: ControlType.String,  title: "Accent Line",     defaultValue: "Ready to Launch in Minutes" },
  subheadline:    { type: ControlType.String,  title: "Subheadline",     displayTextArea: true, defaultValue: "Landing page, dashboard, authentication, and CMS — everything structured and ready inside Framer." },
  ctaPrimaryText: { type: ControlType.String,  title: "CTA Text",        defaultValue: "Get BaseBox Now" },
  ctaPrimaryLink: { type: ControlType.Link,    title: "CTA Link" },
  microTrust:     { type: ControlType.String,  title: "Micro Trust",     defaultValue: "No subscription · Instant access · Lifetime updates" },
  stat1Label:     { type: ControlType.String,  title: "Stat 1 Label",    defaultValue: "Active Users" },
  stat1Value:     { type: ControlType.String,  title: "Stat 1 Value",    defaultValue: "12.4K" },
  stat2Label:     { type: ControlType.String,  title: "Stat 2 Label",    defaultValue: "Conversion Rate" },
  stat2Value:     { type: ControlType.String,  title: "Stat 2 Value",    defaultValue: "4.8%" },
  stat2Delta:     { type: ControlType.String,  title: "Stat 2 Delta",    defaultValue: "↑ 1.2% vs avg" },
  stat3Label:     { type: ControlType.String,  title: "Stat 3 Label",    defaultValue: "MRR" },
  stat3Value:     { type: ControlType.String,  title: "Stat 3 Value",    defaultValue: "$48K" },
  stat3Delta:     { type: ControlType.String,  title: "Stat 3 Delta",    defaultValue: "↑ Growing fast" },
  darkBackground: { type: ControlType.Boolean, title: "Dark Background", defaultValue: true },
})
