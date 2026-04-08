import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '../thumbnails')
fs.mkdirSync(OUT, { recursive: true })

const BASE = 'https://cosmic-arithmetic-5067c4.netlify.app'

const shots = [
  // Full hero OG thumbnail (1200×630) — ideal for social sharing
  {
    name: 'og-hero',
    url: BASE,
    width: 1400,
    height: 900,
    clip: { x: 0, y: 0, width: 1400, height: 900 },
    outW: 1200,
    outH: 630,
    label: 'og-hero-1200x630',
  },
  // Square thumbnail (1080×1080) — Instagram / App Store
  {
    name: 'square',
    url: BASE,
    width: 1400,
    height: 1400,
    clip: { x: 0, y: 0, width: 1400, height: 1400 },
    outW: 1080,
    outH: 1080,
    label: 'square-1080x1080',
  },
  // Pricing page card (1200×630)
  {
    name: 'pricing',
    url: `${BASE}/pricing`,
    width: 1400,
    height: 900,
    clip: { x: 0, y: 0, width: 1400, height: 900 },
    outW: 1200,
    outH: 630,
    label: 'pricing-1200x630',
  },
  // Dashboard preview (16:9)
  {
    name: 'dashboard',
    url: `${BASE}/dashboard`,
    width: 1400,
    height: 900,
    clip: { x: 0, y: 0, width: 1400, height: 900 },
    outW: 1280,
    outH: 720,
    label: 'dashboard-1280x720',
  },
  // Mobile hero (390×844) — iPhone frame
  {
    name: 'mobile-hero',
    url: BASE,
    width: 390,
    height: 844,
    clip: { x: 0, y: 0, width: 390, height: 844 },
    outW: 390,
    outH: 844,
    label: 'mobile-hero-390x844',
  },
]

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  })

  for (const shot of shots) {
    console.log(`📸  Capturing ${shot.label}…`)
    const page = await browser.newPage()

    await page.setViewport({ width: shot.width, height: shot.height, deviceScaleFactor: 2 })
    await page.goto(shot.url, { waitUntil: 'networkidle2', timeout: 30000 })

    // Let animations settle
    await new Promise(r => setTimeout(r, 1800))

    // Hide nav on scroll-hidden state, ensure hero is pristine
    await page.evaluate(() => {
      // Remove any nav-hidden class so nav is visible in the shot
      document.querySelector('#mainNav')?.classList.remove('nav-hidden')
      // Smooth scroll to top
      window.scrollTo({ top: 0 })
    })

    await new Promise(r => setTimeout(r, 400))

    const file = path.join(OUT, `${shot.label}.png`)
    await page.screenshot({
      path: file,
      clip: shot.clip,
      type: 'png',
    })

    await page.close()
    console.log(`   ✅  Saved → thumbnails/${shot.label}.png`)
  }

  await browser.close()
  console.log('\n🎉  All thumbnails saved to /thumbnails/')
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
