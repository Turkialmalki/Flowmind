import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, 'covers')
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT)

// ─── Brand tokens ──────────────────────────────────────────
const B = {
  bg:      '#080d1a',
  bg2:     '#0d1426',
  panel:   '#111827',
  panel2:  '#141c2e',
  border:  'rgba(255,255,255,0.07)',
  indigo:  '#5B5BD6',
  indigo2: '#4a4ac4',
  green:   '#059669',
  purple:  '#7c3aed',
  t1:      '#f1f5f9',
  t2:      '#cbd5e1',
  t3:      '#8faabf',
  t4:      '#4b6177',
}

// ─── Shared CSS ────────────────────────────────────────────
const BASE_CSS = `
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    background: ${B.bg};
    font-family: 'SF Pro Display', 'Segoe UI', system-ui, -apple-system, sans-serif;
    color: ${B.t1};
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, .brand { font-family: 'SF Pro Display', 'Segoe UI', system-ui, -apple-system, sans-serif; }
`

// ═══════════════════════════════════════════════════════════
// COVER  1280 × 720  — Marketplace premium edition
// ═══════════════════════════════════════════════════════════
function coverHTML() {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <style>${BASE_CSS}
  body { width:1280px; height:720px; position:relative; overflow:hidden; background:#05091a; }

  /* ── Deep cinematic background ── */
  .bg {
    position:absolute; inset:0;
    background:
      radial-gradient(ellipse 55% 100% at 5% 50%,  rgba(91,91,214,.32) 0%, transparent 52%),
      radial-gradient(ellipse 45% 65%  at 82% 12%,  rgba(124,58,237,.22) 0%, transparent 48%),
      radial-gradient(ellipse 35% 50%  at 65% 88%,  rgba(59,130,246,.10) 0%, transparent 50%),
      #05091a;
  }

  /* Fine perspective grid — vanishing toward centre */
  .grid {
    position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 100% 90% at 50% 50%, black 0%, transparent 72%);
  }

  /* Top edge vignette — keeps eyes on centre */
  .vignette {
    position:absolute; inset:0;
    background:
      linear-gradient(to bottom,  rgba(5,9,26,.55) 0%, transparent 22%),
      linear-gradient(to top,     rgba(5,9,26,.55) 0%, transparent 22%),
      linear-gradient(to right,   rgba(5,9,26,.35) 0%, transparent 18%),
      linear-gradient(to left,    rgba(5,9,26,.35) 0%, transparent 18%);
    pointer-events:none;
  }

  /* ── Master layout ── */
  .wrap {
    position:absolute; inset:0;
    display:flex; align-items:center;
    padding: 0 72px 0 84px;
    gap: 64px;
  }

  /* ══════════════════════════════
     LEFT — title + meta
  ══════════════════════════════ */
  .left {
    flex: 0 0 auto;
    width: 430px;
    display:flex; flex-direction:column;
    gap: 0;
  }

  /* Tiny category label */
  .eyebrow {
    display:inline-flex; align-items:center; gap:7px;
    font-size:10.5px; font-weight:700; letter-spacing:.18em;
    color: rgba(129,140,248,.7);
    text-transform:uppercase;
    margin-bottom: 20px;
  }
  .eyebrow-line {
    width:20px; height:1px;
    background: rgba(129,140,248,.5);
  }

  /* Giant wordmark */
  h1 {
    font-family:'Sora','SF Pro Display','Inter',sans-serif;
    font-size:96px; font-weight:800; line-height:.96;
    letter-spacing:-.045em;
    margin:0;
    /* Layered text glow */
    color: #f0f4ff;
    text-shadow:
      0 0 120px rgba(91,91,214,.55),
      0 0  40px rgba(91,91,214,.25),
      0  2px 0   rgba(0,0,0,.4);
  }
  h1 .accent {
    /* Purple–violet gradient on "Mind" */
    background: linear-gradient(135deg, #818cf8 0%, #a78bfa 60%, #c084fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 24px rgba(167,139,250,.55));
  }

  /* Hairline divider */
  .divider {
    width: 48px; height: 1.5px;
    background: linear-gradient(90deg, rgba(129,140,248,.6), transparent);
    margin: 22px 0 20px;
    border-radius:2px;
  }

  /* Subtitle */
  .subtitle {
    font-size:18px; font-weight:600;
    color: rgba(203,213,225,.75);
    letter-spacing:-.01em;
    line-height:1.2;
    margin-bottom: 10px;
  }

  /* Tagline */
  .tagline {
    font-size:13.5px;
    color: rgba(148,163,184,.5);
    line-height:1.6;
    letter-spacing:.005em;
    margin-bottom: 28px;
  }

  /* Marketplace badges — metadata style, not CTA */
  .badges { display:flex; gap:8px; align-items:center; }
  .badge {
    display:inline-flex; align-items:center; gap:5px;
    padding: 4px 11px 4px 9px;
    border-radius: 5px;
    font-size: 10.5px; font-weight:700; letter-spacing:.03em;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.10);
    color: rgba(203,213,225,.75);
  }
  .badge-pip {
    width:4px; height:4px; border-radius:50%;
    background: rgba(129,140,248,.8);
    flex-shrink:0;
  }

  /* ══════════════════════════════
     RIGHT — dashboard preview
  ══════════════════════════════ */
  .right {
    flex:1; min-width:0;
    /* 3-D tilt toward viewer */
    transform: perspective(1400px) rotateY(-8deg) rotateX(3deg) scale(1.02);
    transform-origin: 60% center;
    filter: drop-shadow(-24px 32px 72px rgba(0,0,0,.65));
  }

  /* Browser shell */
  .shell {
    border-radius:16px;
    overflow:hidden;
    background: rgba(10,15,30,.96);
    border: 1px solid rgba(255,255,255,.10);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,.09),
      0 2px 0 rgba(0,0,0,.4),
      0 40px 100px rgba(0,0,0,.6);
  }
  .shell-bar {
    background: rgba(7,11,24,.85);
    border-bottom: 1px solid rgba(255,255,255,.07);
    padding: 10px 16px;
    display:flex; align-items:center; gap:7px;
  }
  .dot { width:9px; height:9px; border-radius:50%; flex-shrink:0; }
  .url-bar {
    flex:1; margin:0 12px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.07);
    border-radius:6px;
    padding: 4px 12px;
    font-size:9px; color:rgba(100,116,139,.7);
    text-align:center; letter-spacing:.01em;
  }

  /* ── Dashboard inner ── */
  .dash { padding:14px 14px 12px; display:flex; flex-direction:column; gap:10px; }

  /* Page title row */
  .dash-header {
    display:flex; align-items:center; justify-content:space-between;
    padding-bottom:2px;
  }
  .dash-title {
    font-size:12px; font-weight:700;
    color: rgba(241,245,249,.85); letter-spacing:-.01em;
  }
  .dash-period {
    font-size:9px; font-weight:600;
    color: rgba(100,116,139,.7);
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.07);
    border-radius:5px; padding:3px 9px;
    letter-spacing:.03em;
  }

  /* 4 stat cards in a row */
  .stats { display:flex; gap:8px; }
  .sc {
    flex:1;
    background: rgba(255,255,255,.045);
    border: 1px solid rgba(255,255,255,.08);
    border-radius:10px;
    padding: 11px 13px;
    position:relative; overflow:hidden;
  }
  /* accent glow on first card */
  .sc.hi { background: rgba(91,91,214,.12); border-color: rgba(91,91,214,.28); }
  .sc.hi::before {
    content:'';
    position:absolute; top:0; left:0; right:0; height:1px;
    background: linear-gradient(90deg, rgba(129,140,248,.6), transparent);
  }
  .sc-label {
    font-size:8.5px; font-weight:600; letter-spacing:.06em;
    text-transform:uppercase; color:rgba(100,116,139,.9);
    margin-bottom:5px;
  }
  .sc-val {
    font-size:19px; font-weight:800; letter-spacing:-.03em;
    color:#f1f5f9;
  }
  .sc.hi .sc-val { color:#a5b4fc; }
  .sc-delta { font-size:8.5px; color:#34d399; margin-top:3px; font-weight:600; }

  /* Large area chart */
  .chart-wrap {
    background: rgba(255,255,255,.03);
    border: 1px solid rgba(255,255,255,.07);
    border-radius:10px;
    padding: 12px 14px 10px;
  }
  .chart-top {
    display:flex; align-items:center; justify-content:space-between;
    margin-bottom:10px;
  }
  .ct-label { font-size:9.5px; font-weight:700; color:rgba(165,180,252,.8); letter-spacing:.05em; text-transform:uppercase; }
  .ct-tag {
    font-size:8.5px; font-weight:700; letter-spacing:.04em;
    background: rgba(52,211,153,.11); border:1px solid rgba(52,211,153,.25);
    color:#34d399; border-radius:5px; padding:2px 8px;
  }

  /* Two-panel bottom row */
  .bottom-row { display:flex; gap:8px; }
  .mini-chart {
    flex:1;
    background: rgba(255,255,255,.03);
    border: 1px solid rgba(255,255,255,.07);
    border-radius:10px;
    padding: 10px 12px;
  }
  .mc-label { font-size:8.5px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; color:rgba(100,116,139,.7); margin-bottom:8px; }

  .table-panel {
    width:175px; flex-shrink:0;
    background: rgba(255,255,255,.03);
    border: 1px solid rgba(255,255,255,.07);
    border-radius:10px;
    padding: 10px 12px;
    display:flex; flex-direction:column; gap:5px;
  }
  .tp-label { font-size:8.5px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; color:rgba(100,116,139,.7); margin-bottom:3px; }
  .tp-row {
    display:flex; align-items:center; justify-content:space-between;
    padding: 4px 0;
    border-top: 1px solid rgba(255,255,255,.05);
  }
  .tp-name { font-size:9px; color:rgba(148,163,184,.75); font-weight:500; }
  .tp-val  { font-size:9px; color:rgba(165,180,252,.9); font-weight:700; }
  </style>
</head>
<body>
  <div class="bg"></div>
  <div class="grid"></div>
  <div class="vignette"></div>

  <div class="wrap">

    <!-- ════ LEFT ════ -->
    <div class="left">
      <div class="eyebrow"><div class="eyebrow-line"></div>React Template</div>

      <h1>Flow<span class="accent">Mind</span></h1>

      <div class="divider"></div>

      <div class="subtitle">React SaaS Starter Kit</div>
      <div class="tagline">Build your SaaS in days,&nbsp;not months.</div>

      <div class="badges">
        <div class="badge"><div class="badge-pip"></div>Full Source Code</div>
        <div class="badge"><div class="badge-pip"></div>20+ Pages</div>
        <div class="badge"><div class="badge-pip"></div>Lifetime Updates</div>
      </div>
    </div>

    <!-- ════ RIGHT — Dashboard ════ -->
    <div class="right">
      <div class="shell">

        <!-- Browser chrome -->
        <div class="shell-bar">
          <div class="dot" style="background:#ff5f57"></div>
          <div class="dot" style="background:#febc2e"></div>
          <div class="dot" style="background:#28c840"></div>
          <div class="url-bar">app.flowmind.ai / dashboard</div>
        </div>

        <div class="dash">

          <!-- Header -->
          <div class="dash-header">
            <div class="dash-title">Overview</div>
            <div class="dash-period">Last 30 days</div>
          </div>

          <!-- 4 stat cards -->
          <div class="stats">
            <div class="sc hi">
              <div class="sc-label">Workflows</div>
              <div class="sc-val">847K</div>
              <div class="sc-delta">↑ 23.4%</div>
            </div>
            <div class="sc">
              <div class="sc-label">Automation</div>
              <div class="sc-val">94.2%</div>
              <div class="sc-delta">↑ 3.1%</div>
            </div>
            <div class="sc">
              <div class="sc-label">AI Tasks</div>
              <div class="sc-val">1.2M</div>
              <div class="sc-delta">↑ 18.7%</div>
            </div>
            <div class="sc">
              <div class="sc-label">Uptime</div>
              <div class="sc-val">99.9%</div>
              <div class="sc-delta">↑ 0.2%</div>
            </div>
          </div>

          <!-- Main area chart -->
          <div class="chart-wrap">
            <div class="chart-top">
              <div class="ct-label">Automation Runs</div>
              <div class="ct-tag">+18.4% vs prev</div>
            </div>
            <svg width="100%" height="90" viewBox="0 0 580 90" preserveAspectRatio="none">
              <defs>
                <linearGradient id="fill1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stop-color="rgba(91,91,214,.35)"/>
                  <stop offset="100%" stop-color="rgba(91,91,214,0)"/>
                </linearGradient>
                <linearGradient id="fill2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stop-color="rgba(124,58,237,.18)"/>
                  <stop offset="100%" stop-color="rgba(124,58,237,0)"/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <!-- Grid -->
              <line x1="0" y1="22" x2="580" y2="22" stroke="rgba(255,255,255,.04)"/>
              <line x1="0" y1="44" x2="580" y2="44" stroke="rgba(255,255,255,.04)"/>
              <line x1="0" y1="66" x2="580" y2="66" stroke="rgba(255,255,255,.04)"/>
              <!-- Secondary fill -->
              <path d="M0,74 C70,70 140,67 210,60 C280,53 330,57 390,46 C450,35 510,32 580,28 L580,90 L0,90Z" fill="url(#fill2)"/>
              <!-- Primary fill -->
              <path d="M0,80 C70,75 140,69 220,60 C300,51 340,64 410,49 C460,38 520,20 580,10 L580,90 L0,90Z" fill="url(#fill1)"/>
              <!-- Glow line -->
              <path d="M0,80 C70,75 140,69 220,60 C300,51 340,64 410,49 C460,38 520,20 580,10" fill="none" stroke="rgba(129,140,248,.35)" stroke-width="6" stroke-linecap="round"/>
              <!-- Primary line -->
              <path d="M0,80 C70,75 140,69 220,60 C300,51 340,64 410,49 C460,38 520,20 580,10" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round" filter="url(#glow)"/>
              <!-- Endpoint -->
              <circle cx="580" cy="10" r="5"  fill="#818cf8"/>
              <circle cx="580" cy="10" r="10" fill="rgba(129,140,248,.2)"/>
            </svg>
          </div>

          <!-- Bottom row: bar chart + table -->
          <div class="bottom-row">
            <div class="mini-chart">
              <div class="mc-label">Pages / Session</div>
              <svg width="100%" height="44" viewBox="0 0 200 44" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="rgba(91,91,214,.7)"/>
                    <stop offset="100%" stop-color="rgba(91,91,214,.3)"/>
                  </linearGradient>
                  <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="rgba(167,139,250,.6)"/>
                    <stop offset="100%" stop-color="rgba(167,139,250,.2)"/>
                  </linearGradient>
                </defs>
                <!-- 7 bars -->
                <rect x="2"   y="22" width="20" height="22" rx="3" fill="url(#bg1)" opacity=".7"/>
                <rect x="30"  y="14" width="20" height="30" rx="3" fill="url(#bg1)" opacity=".8"/>
                <rect x="58"  y="8"  width="20" height="36" rx="3" fill="url(#bg2)"/>
                <rect x="86"  y="18" width="20" height="26" rx="3" fill="url(#bg1)" opacity=".75"/>
                <rect x="114" y="10" width="20" height="34" rx="3" fill="url(#bg2)" opacity=".9"/>
                <rect x="142" y="4"  width="20" height="40" rx="3" fill="url(#bg2)"/>
                <rect x="170" y="16" width="20" height="28" rx="3" fill="url(#bg1)" opacity=".8"/>
              </svg>
            </div>
            <div class="table-panel">
              <div class="tp-label">Top Workflows</div>
              <div class="tp-row">
                <div class="tp-name">Lead Enrichment</div>
                <div class="tp-val">12.4K</div>
              </div>
              <div class="tp-row">
                <div class="tp-name">Slack → CRM</div>
                <div class="tp-val">8.9K</div>
              </div>
              <div class="tp-row">
                <div class="tp-name">AI Summarise</div>
                <div class="tp-val">6.1K</div>
              </div>
              <div class="tp-row">
                <div class="tp-name">Email Parser</div>
                <div class="tp-val">4.7K</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</body></html>`
}

// ═══════════════════════════════════════════════════════════
// SQUARE 1 — 600 × 600  Hero Shot
// ═══════════════════════════════════════════════════════════
function square1HTML() {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <style>${BASE_CSS}
  body { width:600px; height:600px; position:relative; display:flex; align-items:center; justify-content:center; }
  .bg {
    position:absolute; inset:0;
    background:
      radial-gradient(ellipse 90% 80% at 50% 30%, rgba(91,91,214,.22) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 85% 80%, rgba(124,58,237,.12) 0%, transparent 55%),
      ${B.bg};
  }
  .grid-lines {
    position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%);
  }
  .inner {
    position:relative; z-index:1;
    display:flex; flex-direction:column; align-items:center;
    gap:16px; text-align:center; padding:40px;
  }
  .brand-icon {
    width:64px; height:64px; border-radius:18px;
    background:linear-gradient(135deg,${B.indigo},${B.purple});
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 0 40px rgba(91,91,214,.5);
    margin-bottom:4px;
  }
  h1 {
    font-family:'Sora','Inter',sans-serif;
    font-size:52px; font-weight:800; line-height:1.08;
    letter-spacing:-.03em;
  }
  .accent { color:${B.indigo}; }
  .sub {
    font-size:16px; color:${B.t3}; line-height:1.6; max-width:340px;
  }
  .divider {
    width:40px; height:2px;
    background:linear-gradient(90deg,${B.indigo},${B.purple});
    border-radius:2px;
  }
  .tag-row { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin-top:4px; }
  .tag {
    padding:5px 12px;
    border-radius:100px;
    font-size:12px; font-weight:600;
    border:1px solid;
  }
  .tag-indigo { background:rgba(91,91,214,.12); border-color:rgba(91,91,214,.3); color:${B.indigo}; }
  .tag-green  { background:rgba(5,150,105,.12);  border-color:rgba(5,150,105,.3);  color:#34d399; }
  .tag-purple { background:rgba(124,58,237,.12); border-color:rgba(124,58,237,.3); color:#a78bfa; }
  .badge {
    margin-top:6px;
    background:rgba(255,255,255,.05);
    border:1px solid rgba(255,255,255,.1);
    border-radius:12px;
    padding:12px 24px;
    font-size:13px; color:${B.t3};
  }
  .badge strong { color:${B.t1}; font-weight:700; }
  </style>
</head>
<body>
  <div class="bg"></div>
  <div class="grid-lines"></div>
  <div class="inner">
    <div class="brand-icon">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    </div>
    <h1>Flow<span class="accent">Mind</span></h1>
    <div class="divider"></div>
    <p class="sub">AI Automation SaaS Template.<br/>Built with React + Vite.</p>
    <div class="tag-row">
      <div class="tag tag-indigo">20+ Pages</div>
      <div class="tag tag-green">Full Source Code</div>
      <div class="tag tag-purple">Premium Animations</div>
    </div>
    <div class="badge"><strong>One-time payment</strong> &nbsp;·&nbsp; Lifetime updates &nbsp;·&nbsp; Instant download</div>
  </div>
</body></html>`
}

// ═══════════════════════════════════════════════════════════
// SQUARE 2 — 600 × 600  What's Included
// ═══════════════════════════════════════════════════════════
function square2HTML() {
  const items = [
    { icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', label:'Landing Page',      color:B.indigo,  bg:'rgba(91,91,214,.12)' },
    { icon:'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', label:'Pricing Page', color:'#818cf8', bg:'rgba(129,140,248,.12)' },
    { icon:'M13 2L3 14h9l-1 8 10-12h-9l1-8z', label:'AI Demo Page',   color:B.indigo,  bg:'rgba(91,91,214,.12)' },
    { icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', label:'Docs Page', color:B.purple, bg:'rgba(124,58,237,.12)' },
    { icon:'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', label:'Integrations',   color:B.green,  bg:'rgba(5,150,105,.12)' },
    { icon:'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', label:'Blog + CMS',    color:'#f59e0b', bg:'rgba(245,158,11,.12)' },
    { icon:'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z', label:'Automations',   color:'#f43f5e', bg:'rgba(244,63,94,.12)' },
    { icon:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', label:'Book Demo',     color:'#0ea5e9', bg:'rgba(14,165,233,.12)' },
    { icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', label:'Auth / Setup',  color:B.purple, bg:'rgba(124,58,237,.12)' },
  ]
  const cards = items.map(it => `
    <div class="inc-card">
      <div class="inc-icon" style="background:${it.bg}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${it.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="${it.icon}"/>
        </svg>
      </div>
      <div class="inc-label">${it.label}</div>
    </div>`).join('')

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <style>${BASE_CSS}
  body { width:600px; height:600px; position:relative; }
  .bg {
    position:absolute; inset:0;
    background:
      radial-gradient(ellipse 70% 60% at 50% 0%, rgba(91,91,214,.16) 0%, transparent 55%),
      ${B.bg};
  }
  .wrap { position:relative; z-index:1; padding:36px 36px 28px; display:flex; flex-direction:column; gap:20px; height:100%; }
  .header { text-align:center; }
  .eyebrow {
    font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
    color:${B.indigo}; margin-bottom:8px;
  }
  h2 { font-family:'Sora','Inter',sans-serif; font-size:28px; font-weight:800; color:${B.t1}; }
  .h2-sub { font-size:13px; color:${B.t3}; margin-top:4px; }
  .grid {
    display:grid; grid-template-columns:repeat(3,1fr); gap:8px; flex:1;
  }
  .inc-card {
    background:${B.panel};
    border:1px solid ${B.border};
    border-radius:10px;
    padding:12px;
    display:flex; flex-direction:column; gap:8px;
    transition: border-color .2s;
  }
  .inc-icon {
    width:32px; height:32px; border-radius:8px;
    display:flex; align-items:center; justify-content:center;
  }
  .inc-label { font-size:12px; font-weight:600; color:${B.t2}; }
  .footer {
    display:flex; justify-content:center; gap:16px; padding-top:4px;
  }
  .foot-item {
    display:flex; align-items:center; gap:6px;
    font-size:12px; color:${B.t4};
  }
  .foot-dot { width:5px; height:5px; border-radius:50%; background:${B.indigo}; }
  </style>
</head>
<body>
  <div class="bg"></div>
  <div class="wrap">
    <div class="header">
      <div class="eyebrow">FlowMind Template</div>
      <h2>What's Included</h2>
      <div class="h2-sub">Everything you need to ship your AI SaaS</div>
    </div>
    <div class="grid">${cards}</div>
    <div class="footer">
      <div class="foot-item"><div class="foot-dot"></div>React + Vite</div>
      <div class="foot-item"><div class="foot-dot"></div>Full Source Code</div>
      <div class="foot-item"><div class="foot-dot"></div>Lifetime Updates</div>
    </div>
  </div>
</body></html>`
}

// ═══════════════════════════════════════════════════════════
// SQUARE 3 — 600 × 600  Features Highlight
// ═══════════════════════════════════════════════════════════
function square3HTML() {
  const feats = [
    { icon:'M13 2L3 14h9l-1 8 10-12h-9l1-8z',       title:'Automation Pipeline', desc:'Cinematic scroll-driven workflow animations', color:B.indigo },
    { icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title:'Lenis Smooth Scroll', desc:'Inertia-based cinematic scrolling out of the box', color:'#818cf8' },
    { icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', title:'20+ Polished Pages',  desc:'Every SaaS page you need, ready to customize', color:B.purple },
    { icon:'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z', title:'Premium Dark UI',  desc:'Refined dark design system with depth & glow', color:B.green },
  ]
  const cards = feats.map((f, i) => `
    <div class="feat-card" style="--delay:${i * 0.08}s">
      <div class="feat-icon" style="background:${f.color}18; border-color:${f.color}30">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${f.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="${f.icon}"/>
        </svg>
      </div>
      <div class="feat-body">
        <div class="feat-title">${f.title}</div>
        <div class="feat-desc">${f.desc}</div>
      </div>
    </div>`).join('')

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <style>${BASE_CSS}
  body { width:600px; height:600px; position:relative; }
  .bg {
    position:absolute; inset:0;
    background:
      radial-gradient(ellipse 60% 70% at 90% 10%,  rgba(91,91,214,.18) 0%, transparent 55%),
      radial-gradient(ellipse 50% 50% at 10% 80%,  rgba(5,150,105,.1)  0%, transparent 55%),
      ${B.bg};
  }
  .wrap { position:relative; z-index:1; padding:44px; display:flex; flex-direction:column; gap:28px; height:100%; }
  .header {}
  .eyebrow { font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:${B.indigo}; margin-bottom:10px; }
  h2 { font-family:'Sora','Inter',sans-serif; font-size:34px; font-weight:800; line-height:1.15; }
  .h2-accent { color:${B.indigo}; }
  .h2-sub { font-size:14px; color:${B.t3}; margin-top:8px; }
  .feats { display:flex; flex-direction:column; gap:12px; flex:1; justify-content:center; }
  .feat-card {
    background:${B.panel};
    border:1px solid ${B.border};
    border-radius:12px;
    padding:16px;
    display:flex; align-items:center; gap:14px;
  }
  .feat-icon {
    width:44px; height:44px; flex-shrink:0;
    border-radius:12px; border:1px solid;
    display:flex; align-items:center; justify-content:center;
  }
  .feat-title { font-size:14px; font-weight:700; color:${B.t1}; margin-bottom:3px; }
  .feat-desc  { font-size:12px; color:${B.t3}; line-height:1.5; }
  .stack-row {
    display:flex; gap:8px; align-items:center;
    padding-top:4px; border-top:1px solid ${B.border};
  }
  .stack-label { font-size:11px; color:${B.t4}; margin-right:4px; font-weight:600; letter-spacing:.04em; }
  .stack-chip {
    background:rgba(255,255,255,.05);
    border:1px solid rgba(255,255,255,.08);
    border-radius:6px; padding:4px 10px;
    font-size:11px; font-weight:600; color:${B.t3};
  }
  </style>
</head>
<body>
  <div class="bg"></div>
  <div class="wrap">
    <div class="header">
      <div class="eyebrow">FlowMind Template</div>
      <h2>Built for speed,<br/><span class="h2-accent">designed to impress</span></h2>
      <p class="h2-sub">Every feature crafted to convert and delight.</p>
    </div>
    <div class="feats">${cards}</div>
    <div class="stack-row">
      <span class="stack-label">STACK</span>
      <div class="stack-chip">React 18</div>
      <div class="stack-chip">Vite 5</div>
      <div class="stack-chip">CSS3</div>
      <div class="stack-chip">Lenis</div>
      <div class="stack-chip">React Router</div>
    </div>
  </div>
</body></html>`
}

// ═══════════════════════════════════════════════════════════
// SQUARE 4 — 600 × 600  Social Proof / Trust
// ═══════════════════════════════════════════════════════════
function square4HTML() {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <style>${BASE_CSS}
  body { width:600px; height:600px; position:relative; display:flex; align-items:center; justify-content:center; }
  .bg {
    position:absolute; inset:0;
    background:
      radial-gradient(ellipse 80% 70% at 50% 50%, rgba(91,91,214,.2) 0%, transparent 60%),
      ${B.bg};
  }
  .inner {
    position:relative; z-index:1;
    display:flex; flex-direction:column; align-items:center;
    gap:20px; text-align:center; padding:48px;
  }
  .eyebrow { font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:${B.indigo}; }
  h2 { font-family:'Sora','Inter',sans-serif; font-size:40px; font-weight:800; line-height:1.12; }
  .accent { color:${B.indigo}; }
  .metrics { display:flex; gap:32px; }
  .metric { display:flex; flex-direction:column; align-items:center; gap:4px; }
  .metric-val { font-family:'Sora','Inter',sans-serif; font-size:36px; font-weight:800; color:${B.t1}; line-height:1; }
  .metric-label { font-size:12px; color:${B.t3}; font-weight:500; }
  .divider { width:1px; height:48px; background:${B.border}; }
  .testimonial {
    background:${B.panel};
    border:1px solid ${B.border};
    border-radius:16px;
    padding:20px 24px;
    max-width:380px;
    text-align:left;
  }
  .t-text { font-size:14px; color:${B.t2}; line-height:1.65; }
  .t-author { margin-top:12px; font-size:12px; color:${B.t4}; font-weight:600; }
  .stars { color:#f59e0b; font-size:16px; letter-spacing:2px; margin-bottom:8px; }
  .cta {
    background:${B.indigo};
    border-radius:10px;
    padding:12px 32px;
    font-size:15px; font-weight:700; color:#fff;
    box-shadow:0 0 32px rgba(91,91,214,.45);
    letter-spacing:.01em;
  }
  </style>
</head>
<body>
  <div class="bg"></div>
  <div class="inner">
    <div class="eyebrow">FlowMind Template</div>
    <h2>Ship your <span class="accent">AI SaaS</span><br/>this week</h2>
    <div class="metrics">
      <div class="metric">
        <div class="metric-val">20+</div>
        <div class="metric-label">Pages</div>
      </div>
      <div class="divider"></div>
      <div class="metric">
        <div class="metric-val">∞</div>
        <div class="metric-label">Updates</div>
      </div>
      <div class="divider"></div>
      <div class="metric">
        <div class="metric-val">1×</div>
        <div class="metric-label">Payment</div>
      </div>
    </div>
    <div class="testimonial">
      <div class="stars">★★★★★</div>
      <div class="t-text">"Saved me weeks of work. The animations and design system are production-ready out of the box."</div>
      <div class="t-author">— Early customer</div>
    </div>
    <div class="cta">Get FlowMind Template →</div>
  </div>
</body></html>`
}

// ─── Render all images ─────────────────────────────────────
async function render() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page    = await browser.newPage()

  const jobs = [
    { name: 'cover-1280x720.png',   w:1280, h:720,  html: coverHTML()   },
    { name: 'square1-hero.png',     w:600,  h:600,  html: square1HTML() },
    { name: 'square2-included.png', w:600,  h:600,  html: square2HTML() },
    { name: 'square3-features.png', w:600,  h:600,  html: square3HTML() },
    { name: 'square4-trust.png',    w:600,  h:600,  html: square4HTML() },
  ]

  for (const job of jobs) {
    const p = await browser.newPage()
    await p.setViewport({ width: job.w, height: job.h, deviceScaleFactor: 2 })
    await p.setContent(job.html, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await new Promise(r => setTimeout(r, 300))
    const outPath = path.join(OUT, job.name)
    await p.screenshot({ path: outPath, type: 'png', clip: { x:0, y:0, width:job.w, height:job.h } })
    await p.close()
    console.log(`✓  ${job.name}  (${job.w}×${job.h})`)
  }

  await browser.close()
  console.log(`\nAll images saved to ./covers/`)
}

render().catch(err => { console.error(err); process.exit(1) })
