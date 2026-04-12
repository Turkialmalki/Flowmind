// Navbar.tsx — Pixel-perfect BaseBox navbar with rich dropdowns + mobile menu
import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"

const NAV_STYLES = `
  @keyframes bb-dd-in {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes bb-mm-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .bb-dd-panel { animation: bb-dd-in 0.18s cubic-bezier(0.16,1,0.3,1) both; }
  .bb-mm       { animation: bb-mm-in 0.22s cubic-bezier(0.16,1,0.3,1) both; }
  .bb-nav-link:hover { color: #0a0e1a !important; background: #eff1f8 !important; }
  .bb-nav-link-dark:hover { color: #ffffff !important; background: rgba(255,255,255,0.12) !important; }
  .bb-dd-item:hover { background: #f7f8fc !important; }
  .bb-dd-item:hover .bb-dd-arrow { opacity: 1 !important; transform: translateX(2px) !important; }
  .bb-get-btn:hover { transform: translateY(-1px) !important; box-shadow: 0 6px 24px rgba(108,92,231,0.48) !important; }
  .bb-sign-btn:hover { color: #0a0e1a !important; background: #f7f8fc !important; border-color: rgba(15,23,42,0.22) !important; }
  .bb-sign-btn-dark:hover { color: #ffffff !important; background: rgba(255,255,255,0.12) !important; border-color: rgba(255,255,255,0.38) !important; }
  .bb-dd-trigger:hover { background: rgba(15,23,42,0.06) !important; }
  .bb-dd-trigger-dark:hover { background: rgba(255,255,255,0.10) !important; }
`

// ── Dropdown data ──────────────────────────────────────────────────────────
const PRODUCT_ITEMS = [
  { label: "Features",       desc: "Full breakdown of every capability",  href: "/features",  colorBg: "rgba(91,91,214,0.08)",  color: "#5b5bd6",  icon: "star"     },
  { label: "Dashboard UI",   desc: "Real-time analytics & metrics",       href: "/dashboard", colorBg: "rgba(14,165,233,0.08)", color: "#0ea5e9",  icon: "dashboard" },
  { label: "AI Demo",        desc: "Try the live AI assistant",            href: "/ai-demo",   colorBg: "rgba(124,58,237,0.08)", color: "#7c3aed",  icon: "ai"       },
  { label: "CMS & Blog",     desc: "Content management system",            href: "/cms",       colorBg: "rgba(5,150,105,0.08)",  color: "#059669",  icon: "cms"      },
  { label: "Pricing",        desc: "Plans, features & FAQ",                href: "/pricing",   colorBg: "rgba(217,119,6,0.08)",  color: "#d97706",  icon: "price"    },
]

const RESOURCE_ITEMS = [
  { label: "Documentation",  desc: "Guides, API reference & setup",       href: "/docs",      colorBg: "rgba(91,91,214,0.08)",  color: "#5b5bd6",  icon: "docs"     },
  { label: "Blog",           desc: "SaaS growth & product insights",       href: "/blog",      colorBg: "rgba(14,165,233,0.08)", color: "#0ea5e9",  icon: "blog"     },
  { label: "Setup Guide",    desc: "Step-by-step onboarding flow",         href: "/setup",     colorBg: "rgba(5,150,105,0.08)",  color: "#059669",  icon: "check"    },
  { label: "Changelog",      desc: "Version history & updates",            href: "/changelog", colorBg: "rgba(124,58,237,0.08)", color: "#7c3aed",  icon: "wave"     },
  { label: "Live Demo",      desc: "Interactive product preview",          href: "/demo",      colorBg: "rgba(217,119,6,0.08)",  color: "#d97706",  icon: "play"     },
]

const COMPANY_ITEMS = [
  { label: "Get Template",   desc: "One-time purchase — $49",              href: "/pricing",   colorBg: "rgba(91,91,214,0.08)",  color: "#5b5bd6",  icon: "box",   badge: "$49" },
  { label: "Sign In",        desc: "Access your dashboard",                href: "/login",     colorBg: "rgba(15,23,42,0.05)",   color: "#6b7280",  icon: "signin"  },
  { label: "Sign Up",        desc: "Create your account free",             href: "/signup",    colorBg: "rgba(5,150,105,0.08)",  color: "#059669",  icon: "user+"   },
  { label: "License",        desc: "Usage rights & terms",                 href: "/license",   colorBg: "rgba(15,23,42,0.05)",   color: "#6b7280",  icon: "shield"  },
  { label: "Privacy",        desc: "Data & privacy policy",                href: "/privacy",   colorBg: "rgba(15,23,42,0.05)",   color: "#6b7280",  icon: "lock"    },
]

// ── Icon renderer ──────────────────────────────────────────────────────────
function NavIcon({ name, size = 15 }: { name: string; size?: number }) {
  const s = { width: size, height: size }
  const icons: Record<string, React.ReactNode> = {
    star:      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    dashboard: <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
    ai:        <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>,
    cms:       <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    price:     <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>,
    docs:      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>,
    blog:      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
    check:     <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>,
    wave:      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
    play:      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>,
    box:       <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg>,
    signin:    <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>,
    "user+":   <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>,
    shield:    <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    lock:      <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>,
  }
  return <>{icons[name] || icons.star}</>
}

// ── Logo mark ──────────────────────────────────────────────────────────────
function LogoMark({ dark }: { dark: boolean }) {
  const c = dark ? "rgba(255,255,255,0.9)" : "#5b5bd6"
  const bg = dark ? "rgba(255,255,255,0.10)" : "rgba(91,91,214,0.09)"
  return (
    <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="4" y="10" width="32" height="22" rx="4" fill={bg} stroke={c} strokeWidth="1.5" />
      <path d="M14 16l-4 5 4 5M26 16l4 5-4 5" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="20" y1="14" x2="20" y2="10" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="8" r="2" fill={c} />
    </svg>
  )
}

// ── Dropdown panel ─────────────────────────────────────────────────────────
interface DDItem {
  label: string
  desc: string
  href: string
  colorBg: string
  color: string
  icon: string
  badge?: string
}

function DropdownPanel({ items, groupLabel }: { items: DDItem[]; groupLabel: string }) {
  return (
    <div className="bb-dd-panel" style={{
      position: "absolute",
      top: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)",
      minWidth: "280px",
      background: "#ffffff",
      border: "1.5px solid rgba(15,23,42,0.07)",
      borderRadius: "16px",
      boxShadow: "0 20px 60px rgba(15,23,42,0.12), 0 4px 16px rgba(15,23,42,0.05)",
      padding: "8px",
      zIndex: 2000,
    }}>
      {groupLabel && (
        <div style={{
          padding: "6px 12px 8px",
          fontFamily: "'Fira Code', 'Cascadia Code', monospace",
          fontSize: "10px", fontWeight: 600, color: "#9ca3af",
          textTransform: "uppercase", letterSpacing: "0.1em",
        }}>{groupLabel}</div>
      )}
      {items.map((item) => (
        <a key={item.href + item.label} href={item.href} className="bb-dd-item" style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "10px 12px", borderRadius: "10px", textDecoration: "none",
          transition: "background 0.15s",
        }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "9px",
            background: item.colorBg, color: item.color,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <NavIcon name={item.icon} size={15} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "13.5px", fontWeight: 600, color: "#0a0e1a",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              {item.label}
              {item.badge && (
                <span style={{
                  padding: "1px 8px", borderRadius: "9999px",
                  background: "rgba(91,91,214,0.08)", color: "#5b5bd6",
                  fontSize: "10px", fontWeight: 700,
                  fontFamily: "'Fira Code', monospace",
                }}>{item.badge}</span>
              )}
            </div>
            <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "12px", color: "#9ca3af", marginTop: "1px" }}>
              {item.desc}
            </div>
          </div>
          <svg className="bb-dd-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" style={{ flexShrink: 0, opacity: 0, transition: "opacity 0.15s, transform 0.15s" }} aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      ))}
    </div>
  )
}

// ── Dropdown trigger wrapper ───────────────────────────────────────────────
function NavDropdown({
  label, items, groupLabel, dark,
}: {
  label: string
  items: DDItem[]
  groupLabel: string
  dark: boolean
}) {
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const enter = () => { if (timer.current) clearTimeout(timer.current); setOpen(true) }
  const leave = () => { timer.current = setTimeout(() => setOpen(false), 130) }

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const triggerCls = dark ? "bb-dd-trigger-dark" : "bb-dd-trigger"

  return (
    <li style={{ position: "relative", listStyle: "none" }} onMouseEnter={enter} onMouseLeave={leave}>
      <button className={triggerCls} style={{
        display: "flex", alignItems: "center", gap: "5px",
        padding: "8px 14px", borderRadius: "9999px",
        background: "transparent", border: "none", cursor: "pointer",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        fontSize: "14px", fontWeight: 500,
        color: dark ? "rgba(255,255,255,0.85)" : "#374151",
        transition: "background 0.15s, color 0.15s",
      }}>
        {label}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }} aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && <DropdownPanel items={items} groupLabel={groupLabel} />}
    </li>
  )
}

// ── Props ──────────────────────────────────────────────────────────────────
interface NavbarProps {
  brandName: string
  ctaOutlineText: string
  ctaOutlineLink: string
  ctaPrimaryText: string
  ctaPrimaryLink: string
  isScrolled: boolean
  darkMode: boolean
}

export default function Navbar({
  brandName,
  ctaOutlineText,
  ctaOutlineLink,
  ctaPrimaryText,
  ctaPrimaryLink,
  isScrolled,
  darkMode,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const id = "bb-nav-keyframes"
    if (!document.getElementById(id)) {
      const el = document.createElement("style")
      el.id = id
      el.textContent = NAV_STYLES
      document.head.appendChild(el)
    }
  }, [])

  // Hero over dark background
  const darkHero = darkMode && !isScrolled

  const navBg = isScrolled
    ? "rgba(255,255,255,0.92)"
    : darkHero
    ? "rgba(8,8,22,0.58)"
    : "transparent"

  const navBdr = isScrolled
    ? "1.5px solid rgba(15,23,42,0.07)"
    : darkHero
    ? "1px solid rgba(255,255,255,0.10)"
    : "1px solid transparent"

  const navSh = isScrolled
    ? "0 1px 12px rgba(15,23,42,0.06)"
    : darkHero
    ? "0 1px 24px rgba(0,0,0,0.22)"
    : "none"

  const txtMain  = darkHero ? "#ffffff" : "#0a0e1a"
  const signCls  = darkHero ? "bb-sign-btn-dark" : "bb-sign-btn"

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: navBg,
        backdropFilter: (isScrolled || darkHero) ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: (isScrolled || darkHero) ? "blur(20px) saturate(180%)" : "none",
        borderBottom: navBdr,
        boxShadow: navSh,
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
        width: "100%", boxSizing: "border-box",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto", padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: "72px",
        }}>

          {/* Logo */}
          <a href="/" aria-label={`${brandName} — home`} style={{
            display: "flex", alignItems: "center", gap: "10px",
            textDecoration: "none", flexShrink: 0,
          }}>
            <LogoMark dark={darkHero} />
            <span style={{
              fontFamily: "'Sora', 'Inter', system-ui, sans-serif",
              fontWeight: 700, fontSize: "20px", letterSpacing: "-0.02em",
              color: txtMain,
            }}>{brandName}</span>
          </a>

          {/* Desktop nav */}
          <ul style={{ display: "flex", alignItems: "center", gap: "4px", listStyle: "none", margin: 0, padding: 0 }}>
            <NavDropdown label="Product"   items={PRODUCT_ITEMS}  groupLabel="Product suite"  dark={darkHero} />
            <NavDropdown label="Resources" items={RESOURCE_ITEMS} groupLabel="Learn & explore" dark={darkHero} />
            <NavDropdown label="Company"   items={COMPANY_ITEMS}  groupLabel="Company"         dark={darkHero} />
          </ul>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <a href={ctaOutlineLink} className={signCls} style={{
              padding: "9px 20px",
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              fontSize: "13px", fontWeight: 600,
              color: darkHero ? "rgba(255,255,255,0.82)" : "#374151",
              background: darkHero ? "rgba(255,255,255,0.08)" : "transparent",
              border: `1.5px solid ${darkHero ? "rgba(255,255,255,0.26)" : "rgba(15,23,42,0.13)"}`,
              borderRadius: "9999px", textDecoration: "none", whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}>{ctaOutlineText}</a>

            <a href={ctaPrimaryLink} className="bb-get-btn" style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "9px 20px",
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              fontSize: "13px", fontWeight: 600, color: "#ffffff",
              background: "linear-gradient(135deg, #6C5CE7 0%, #7C4DFF 50%, #8E7CFF 100%)",
              border: "none", borderRadius: "9999px", textDecoration: "none", whiteSpace: "nowrap",
              boxShadow: darkHero
                ? "0 2px 14px rgba(108,92,231,0.55), 0 0 32px rgba(108,92,231,0.22)"
                : "0 0 0 1px rgba(109,40,217,0.3), 0 4px 20px rgba(109,40,217,0.25)",
              transition: "all 0.25s",
            }}>
              {ctaPrimaryText}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              style={{
                display: "none", /* shown via CSS media query — can't do in inline styles easily */
                background: "none", border: "none", cursor: "pointer",
                padding: "8px", color: darkHero ? "rgba(255,255,255,0.88)" : "#374151",
              }}
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile overlay ─────────────────────────────────────── */}
      {mobileOpen && (
        <div className="bb-mm" style={{
          position: "fixed", inset: 0, zIndex: 1100,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          display: "flex", flexDirection: "column", overflowY: "auto",
        }}>
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "20px 24px", borderBottom: "1px solid rgba(15,23,42,0.07)",
          }}>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <LogoMark dark={false} />
              <span style={{ fontFamily: "'Sora', system-ui, sans-serif", fontWeight: 700, fontSize: "19px", letterSpacing: "-0.02em", color: "#0a0e1a" }}>{brandName}</span>
            </a>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu" style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: "#6b7280" }}>
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>

          {/* Links */}
          <div style={{ flex: 1, padding: "24px" }}>
            {[...PRODUCT_ITEMS, ...RESOURCE_ITEMS, ...COMPANY_ITEMS].map((item) => (
              <a key={item.href + item.label} href={item.href} onClick={() => setMobileOpen(false)} style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "14px 16px", borderRadius: "12px", textDecoration: "none",
                marginBottom: "4px",
              }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: item.colorBg, color: item.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <NavIcon name={item.icon} size={15} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "14px", fontWeight: 600, color: "#0a0e1a" }}>{item.label}</div>
                  <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "12px", color: "#9ca3af" }}>{item.desc}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Footer CTAs */}
          <div style={{ padding: "16px 24px 32px", borderTop: "1px solid rgba(15,23,42,0.07)", display: "flex", flexDirection: "column", gap: "10px" }}>
            <a href={ctaOutlineLink} onClick={() => setMobileOpen(false)} style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "14px", borderRadius: "9999px", textDecoration: "none",
              fontFamily: "'Inter', system-ui, sans-serif", fontSize: "15px", fontWeight: 600,
              color: "#374151", border: "1.5px solid rgba(15,23,42,0.13)", background: "transparent",
            }}>{ctaOutlineText}</a>
            <a href={ctaPrimaryLink} onClick={() => setMobileOpen(false)} style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "14px", borderRadius: "9999px", textDecoration: "none",
              fontFamily: "'Inter', system-ui, sans-serif", fontSize: "15px", fontWeight: 700,
              color: "#ffffff",
              background: "linear-gradient(135deg, #6C5CE7 0%, #7C4DFF 50%, #8E7CFF 100%)",
              boxShadow: "0 4px 20px rgba(109,40,217,0.3)",
            }}>
              {ctaPrimaryText} — $49
            </a>
          </div>
        </div>
      )}
    </>
  )
}

Navbar.defaultProps = {
  brandName: "BaseBox",
  ctaOutlineText: "Sign In",
  ctaOutlineLink: "/login",
  ctaPrimaryText: "Get Template",
  ctaPrimaryLink: "/pricing",
  isScrolled: false,
  darkMode: true,
}

addPropertyControls(Navbar, {
  brandName:      { type: ControlType.String,  title: "Brand Name",    defaultValue: "BaseBox" },
  ctaOutlineText: { type: ControlType.String,  title: "CTA Outline",   defaultValue: "Sign In" },
  ctaOutlineLink: { type: ControlType.Link,    title: "Outline Link" },
  ctaPrimaryText: { type: ControlType.String,  title: "CTA Primary",   defaultValue: "Get Template" },
  ctaPrimaryLink: { type: ControlType.Link,    title: "Primary Link" },
  isScrolled:     { type: ControlType.Boolean, title: "Scrolled State", description: "Preview the glass / scrolled style", defaultValue: false },
  darkMode:       { type: ControlType.Boolean, title: "Dark Hero Mode", description: "Use over dark hero backgrounds",       defaultValue: true  },
})
