import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, 'covers', 'cover-1280x720.png')

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-device-scale-factor=2'],
  })
  const page = await browser.newPage()

  // Wide viewport: forces full two-column layout + floating cards visible
  await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 2 })

  await page.goto('http://localhost:5175/basebox/#/', {
    waitUntil: 'networkidle0',
    timeout: 30000,
  })

  // Let entrance animations play out
  await new Promise(r => setTimeout(r, 2200))

  // Inject layout fixes + badge overlay
  await page.evaluate(() => {
    // 1. Hide everything that isn't the hero
    document.querySelectorAll('nav,.nav,header,footer,.footer').forEach(el => el.style.display = 'none')
    // Hide every sibling section after the hero
    const hero = document.querySelector('.hero')
    if (hero) {
      let el = hero.nextElementSibling
      while (el) { el.style.display = 'none'; el = el.nextElementSibling }
    }

    // 2. Layout + animation overrides
    const style = document.createElement('style')
    style.textContent = `
      @keyframes heroWrapEntry {
        from { opacity:0; transform:translateX(0) translateY(80px) scale(0.9); }
        to   { opacity:1; transform:translateX(0) translateY(0)    scale(1);   }
      }
      .hd-wrap { animation: heroWrapEntry 1.2s cubic-bezier(0.16,1,0.3,1) 0.1s both !important; }
      .hero, .hero-img {
        overflow: visible !important;
        min-height: 900px !important;
        padding-top: 84px !important;
        padding-bottom: 40px !important;
      }
      .hero-flex { gap:56px !important; align-items:center !important; }
      .hero-flex .hc { max-width:390px !important; }
      .container { max-width:1500px !important; padding:0 80px !important; }
      .hero-flex h1 { font-size:56px !important; }
      /* Force every floating card visible */
      .hero-premium-card, .hero-upper-right-card,
      .hero-workflow-card, .hero-float-card {
        opacity:1 !important; display:block !important;
        transform:none !important;
      }
    `
    document.head.appendChild(style)

    // 3. Badge — bottom-right corner of the crop area
    const badge = document.createElement('div')
    // left:1060px + top:656px keeps it inside the 1280×720 crop (viewport is 1600px, crop x=40..1320)
    badge.style.cssText = 'position:fixed;top:656px;left:1060px;z-index:99999;'
    badge.innerHTML = `<div style="
        display:inline-flex;align-items:center;gap:8px;
        background:rgba(91,91,214,.18);backdrop-filter:blur(12px);
        border:1px solid rgba(91,91,214,.38);border-radius:100px;
        padding:8px 18px;font-family:system-ui,sans-serif;
        font-size:13px;font-weight:700;color:#a5b4fc;letter-spacing:.03em;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
      FlowMind Template &nbsp;·&nbsp; React + Vite
    </div>`
    document.body.appendChild(badge)

    window.scrollTo(0, 0)
  })

  // Wait for animation re-run after style injection
  await new Promise(r => setTimeout(r, 1800))

  // Full canvas for inspection
  const OUT2 = OUT.replace('.png', '-full.png')
  await page.screenshot({ path: OUT2, type: 'png', clip: { x: 0, y: 0, width: 1600, height: 900 } })

  // Final 1280×720 — small left margin so headline has breathing room
  await page.screenshot({
    path: OUT,
    type: 'png',
    clip: { x: 40, y: 0, width: 1280, height: 720 },
  })

  await browser.close()
  console.log(`✓  cover-1280x720.png  (1280×720 @2x retina)`)
}

run().catch(err => { console.error(err); process.exit(1) })
