const puppeteer = require('/Users/turki/launchy-ai/node_modules/puppeteer')

const URL = 'https://tryflowmind.com'
const sleep = ms => new Promise(r => setTimeout(r, ms))

async function freezeHero(page) {
  await page.evaluate(() => {
    // Neutralise RAF-applied 3D transforms so headless Chrome renders elements
    // in their natural CSS positions (perspective() can fail to composite in headless)
    const sel = [
      '.hd-wrap', '.hd', '.dw',
      '.hero-premium-card', '.hero-upper-right-card', '.hero-workflow-card',
      '.hero-float-card', '.hc', '.ds', '.dch',
    ]
    sel.forEach(s => document.querySelectorAll(s).forEach(el => {
      el.style.transform = 'none'
      el.style.transition = 'none'
      el.style.animation = 'none'
    }))
    window.scrollTo(0, 0)
  })
}

async function shoot() {
  const browser = await puppeteer.launch({
    executablePath: puppeteer.executablePath(),
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    // ── 1. HORIZONTAL 1280×720 ────────────────────────────────────────────
    console.log('Capturing horizontal 1280×720…')
    const page1 = await browser.newPage()
    // Use 1380×720 viewport so the full dashboard (ends ~x=1342) is within
    // bounds, then clip the centred 1280px.
    await page1.setViewport({ width: 1380, height: 720, deviceScaleFactor: 1 })
    await page1.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 })
    await sleep(2500)
    await freezeHero(page1)
    await sleep(400)

    const hd1 = await page1.evaluate(() => {
      const b = document.querySelector('.hd')?.getBoundingClientRect()
      return b ? { x: Math.round(b.x), r: Math.round(b.right), y: Math.round(b.y), h: Math.round(b.height) } : null
    })
    console.log('  hd:', hd1)

    // Centre the 1280px crop within the 1380px viewport (50px each side)
    await page1.screenshot({
      path: 'public/og-image.png',
      clip: { x: 50, y: 0, width: 1280, height: 720 },
    })
    console.log('✓ og-image.png  (1280×720)')
    await page1.close()

    // ── 2. SQUARE 720×720 ─────────────────────────────────────────────────
    console.log('Capturing square 720×720…')
    const page2 = await browser.newPage()
    await page2.setViewport({ width: 1440, height: 810, deviceScaleFactor: 1 })
    await page2.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 })
    await sleep(2500)
    await freezeHero(page2)
    await sleep(400)

    const hd2 = await page2.evaluate(() => {
      const b = document.querySelector('.hd')?.getBoundingClientRect()
      return b ? { x: Math.round(b.x), r: Math.round(b.right), y: Math.round(b.y), h: Math.round(b.height) } : null
    })
    console.log('  hd at 1440px:', hd2)

    const size = 720
    // Position the crop so the dashboard fills the right ~90% and a sliver of
    // the dark hero background + floating premium card shows on the left.
    // Dashboard starts at hd2.x; we want the crop to start ~80px before it.
    const clipX = hd2 ? Math.max(0, Math.min(hd2.x - 80, 1440 - size)) : 560
    const clipY = 0

    await page2.screenshot({
      path: 'public/og-thumb.png',
      clip: { x: clipX, y: clipY, width: size, height: size },
    })
    console.log(`✓ og-thumb.png  (${size}×${size})  clip x=${clipX}–${clipX + size}`)
    await page2.close()

  } finally {
    await browser.close()
  }
}

shoot().catch(err => { console.error(err); process.exit(1) })
