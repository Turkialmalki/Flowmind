// DashboardMockup.tsx
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

interface DashboardMockupProps {
  metricLabel1: string
  metricValue1: string
  metricDelta1: string
  metricLabel2: string
  metricValue2: string
  metricDelta2: string
  metricLabel3: string
  metricValue3: string
  metricDelta3: string
  metricLabel4: string
  metricValue4: string
  metricDelta4: string
  chartTitle: string
  tableTitle: string
  darkMode: boolean
}

const CHART_PATH =
  "M0,90 C40,82 80,75 130,62 C175,50 210,55 260,40 C305,28 345,18 400,12"

function SidebarItem({
  label,
  active,
  dark,
}: {
  label: string
  active?: boolean
  dark: boolean
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 12px",
        borderRadius: "8px",
        background: active
          ? dark
            ? "rgba(91,91,214,0.2)"
            : "rgba(91,91,214,0.08)"
          : "transparent",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: active
            ? "#5b5bd6"
            : dark
              ? "rgba(255,255,255,0.2)"
              : "rgba(15,23,42,0.13)",
        }}
      />
      <span
        style={{
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          fontSize: "12px",
          color: active
            ? "#5b5bd6"
            : dark
              ? "rgba(255,255,255,0.5)"
              : "#6b7280",
          fontWeight: active ? 600 : 400,
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default function DashboardMockup({
  metricLabel1, metricValue1, metricDelta1,
  metricLabel2, metricValue2, metricDelta2,
  metricLabel3, metricValue3, metricDelta3,
  metricLabel4, metricValue4, metricDelta4,
  chartTitle,
  tableTitle,
  darkMode,
}: DashboardMockupProps) {
  const bg = darkMode ? "#0d0f1a" : "#ffffff"
  const bg2 = darkMode ? "#12102a" : "#f7f8fc"
  const bg3 = darkMode ? "rgba(255,255,255,0.04)" : "#eff1f8"
  const borderC = darkMode ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.07)"
  const text1 = darkMode ? "#ffffff" : "#0a0e1a"
  const text3 = darkMode ? "rgba(255,255,255,0.45)" : "#6b7280"

  const metrics = [
    { label: metricLabel1, value: metricValue1, delta: metricDelta1, color: "#5b5bd6" },
    { label: metricLabel2, value: metricValue2, delta: metricDelta2, color: "#0ea5e9" },
    { label: metricLabel3, value: metricValue3, delta: metricDelta3, color: "#059669" },
    { label: metricLabel4, value: metricValue4, delta: metricDelta4, color: "#d97706" },
  ]

  return (
    <div
      role="img"
      aria-label="Dashboard UI preview"
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        background: bg,
        border: `1px solid ${borderC}`,
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(15,23,42,0.12), 0 4px 16px rgba(15,23,42,0.05)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Browser bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "10px 16px",
          borderBottom: `1px solid ${borderC}`,
          background: bg2,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          {["#ff5f57", "#ffbd2e", "#28ca41"].map((c, i) => (
            <div key={i} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: bg3,
            borderRadius: "6px",
            padding: "4px 12px",
            fontSize: "10px",
            fontFamily: "'Fira Code', 'Cascadia Code', monospace",
            color: text3,
          }}
        >
          your-saas.com/dashboard
        </div>
      </div>

      {/* Dashboard body: sidebar + main */}
      <div style={{ display: "flex", flex: 1, minHeight: "420px" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "140px",
            flexShrink: 0,
            borderRight: `1px solid ${borderC}`,
            background: bg2,
            padding: "16px 8px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <div
            style={{
              fontFamily: "'Fira Code', 'Cascadia Code', monospace",
              fontSize: "9px",
              color: text3,
              padding: "4px 12px",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Main
          </div>
          <SidebarItem label="Overview" active dark={darkMode} />
          <SidebarItem label="Analytics" dark={darkMode} />
          <SidebarItem label="Users" dark={darkMode} />
          <SidebarItem label="Revenue" dark={darkMode} />
          <SidebarItem label="Reports" dark={darkMode} />
          <div style={{ height: "1px", background: borderC, margin: "8px 0" }} />
          <div
            style={{
              fontFamily: "'Fira Code', 'Cascadia Code', monospace",
              fontSize: "9px",
              color: text3,
              padding: "4px 12px",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Account
          </div>
          <SidebarItem label="Settings" dark={darkMode} />
          <SidebarItem label="Billing" dark={darkMode} />
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "20px", overflow: "hidden" }}>
          {/* Metrics row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            {metrics.map((m, i) => (
              <div
                key={i}
                style={{
                  background: bg3,
                  border: `1px solid ${borderC}`,
                  borderRadius: "10px",
                  padding: "14px",
                }}
              >
                <div style={{ fontSize: "10px", fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: text3, marginBottom: "6px" }}>
                  {m.label}
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontFamily: "'Sora', 'Inter', system-ui, sans-serif",
                    fontWeight: 800,
                    color: text1,
                    letterSpacing: "-0.02em",
                    marginBottom: "3px",
                  }}
                >
                  {m.value}
                </div>
                <div style={{ fontSize: "10px", color: "#059669", fontFamily: "'Inter', system-ui, -apple-system, sans-serif", fontWeight: 500 }}>
                  {m.delta}
                </div>
              </div>
            ))}
          </div>

          {/* Chart card */}
          <div
            style={{
              background: bg3,
              border: `1px solid ${borderC}`,
              borderRadius: "10px",
              padding: "16px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                color: text1,
                marginBottom: "12px",
              }}
            >
              {chartTitle}
            </div>
            <svg viewBox="0 0 400 100" style={{ width: "100%", height: "80px" }} preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="dash-chart-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5b5bd6" stopOpacity={darkMode ? "0.2" : "0.1"} />
                  <stop offset="100%" stopColor="#5b5bd6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="33" x2="400" y2="33" stroke={borderC} />
              <line x1="0" y1="66" x2="400" y2="66" stroke={borderC} />
              <path d={`${CHART_PATH} L400,100 L0,100Z`} fill="url(#dash-chart-grad)" />
              <path d={CHART_PATH} fill="none" stroke="#5b5bd6" strokeWidth="2" strokeLinecap="round" />
              <circle cx="400" cy="12" r="3" fill="#5b5bd6" stroke={darkMode ? "#1a1a2e" : "white"} strokeWidth="2" />
            </svg>
          </div>

          {/* Table preview */}
          <div
            style={{
              background: bg3,
              border: `1px solid ${borderC}`,
              borderRadius: "10px",
              padding: "16px",
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                color: text1,
                marginBottom: "12px",
              }}
            >
              {tableTitle}
            </div>
            {["sarah@acme.com", "mike@startup.io", "jane@novu.ai"].map((email, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "7px 0",
                  borderBottom: i < 2 ? `1px solid ${borderC}` : "none",
                }}
              >
                <span style={{ fontSize: "11px", fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: text3 }}>
                  {email}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                    padding: "2px 8px",
                    borderRadius: "6px",
                    background: "rgba(5,150,105,0.08)",
                    color: "#059669",
                  }}
                >
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

DashboardMockup.defaultProps = {
  metricLabel1: "Active Users", metricValue1: "12.4K", metricDelta1: "↑ 23%",
  metricLabel2: "MRR", metricValue2: "$48K", metricDelta2: "↑ 14%",
  metricLabel3: "Conversion", metricValue3: "4.8%", metricDelta3: "↑ 1.2%",
  metricLabel4: "Churn", metricValue4: "1.4%", metricDelta4: "↓ 0.3%",
  chartTitle: "User Growth — Last 30 Days",
  tableTitle: "Recent Sign-ups",
  darkMode: false,
}

addPropertyControls(DashboardMockup, {
  metricLabel1: { type: ControlType.String, title: "Metric 1 Label", defaultValue: "Active Users" },
  metricValue1: { type: ControlType.String, title: "Metric 1 Value", defaultValue: "12.4K" },
  metricDelta1: { type: ControlType.String, title: "Metric 1 Delta", defaultValue: "↑ 23%" },
  metricLabel2: { type: ControlType.String, title: "Metric 2 Label", defaultValue: "MRR" },
  metricValue2: { type: ControlType.String, title: "Metric 2 Value", defaultValue: "$48K" },
  metricDelta2: { type: ControlType.String, title: "Metric 2 Delta", defaultValue: "↑ 14%" },
  metricLabel3: { type: ControlType.String, title: "Metric 3 Label", defaultValue: "Conversion" },
  metricValue3: { type: ControlType.String, title: "Metric 3 Value", defaultValue: "4.8%" },
  metricDelta3: { type: ControlType.String, title: "Metric 3 Delta", defaultValue: "↑ 1.2%" },
  metricLabel4: { type: ControlType.String, title: "Metric 4 Label", defaultValue: "Churn" },
  metricValue4: { type: ControlType.String, title: "Metric 4 Value", defaultValue: "1.4%" },
  metricDelta4: { type: ControlType.String, title: "Metric 4 Delta", defaultValue: "↓ 0.3%" },
  chartTitle: { type: ControlType.String, title: "Chart Title", defaultValue: "User Growth — Last 30 Days" },
  tableTitle: { type: ControlType.String, title: "Table Title", defaultValue: "Recent Sign-ups" },
  darkMode: { type: ControlType.Boolean, title: "Dark Mode", defaultValue: false },
})
