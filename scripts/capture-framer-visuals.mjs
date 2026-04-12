import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '../framer-visuals')
fs.mkdirSync(OUT, { recursive: true })

const BASE = 'http://localhost:5100/basebox'

// Framer requires at least 2 images, up to 4. Best ratio: 16:9 (1600×900)
const shots = [
  {
    label: '00-cover',
    url: `${BASE}/#/`,
    scrollY: 0,
    width: 1600,
    height: 1200,  // 4:3 — Framer project cover
  },
  {
    label: '01-hero',
    url: `${BASE}/#/`,
    scrollY: 0,
    width: 1600,
    height: 900,
  },
  {
    label: '02-dashboard',
    url: `${BASE}/#/dashboard`,
    scrollY: 0,
    width: 1600,
    height: 900,
  },
  {
    label: '03-pricing',
    url: `${BASE}/#/pricing`,
    scrollY: 0,
    width: 1600,
    height: 900,
  },
  {
    label: '04-features',
    url: `${BASE}/#/features`,
    scrollY: 0,
    width: 1600,
    height: 900,
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
    await page.goto(shot.url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await new Promise(r => setTimeout(r, 3500))

    await page.evaluate((y) => window.scrollTo({ top: y }) , shot.scrollY)
    await new Promise(r => setTimeout(r, 500))

    const file = path.join(OUT, `${shot.label}.png`)
    await page.screenshot({ path: file, clip: { x: 0, y: 0, width: shot.width, height: shot.height }, type: 'png' })
    await page.close()
    console.log(`   ✅  Saved → framer-visuals/${shot.label}.png`)
  }

  await browser.close()
  console.log('\n🎉  All 4 visuals saved to /framer-visuals/')
}

run().catch(err => { console.error(err); process.exit(1) })
