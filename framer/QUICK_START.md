# BaseBox — Framer Quick Start (30 min)

## Step 1 — Create a new Framer project
1. Open Framer → **New Project** → blank canvas
2. In **Settings → Fonts**, add: `Sora`, `Inter`, `Fira Code` (Google Fonts)

---

## Step 2 — Import components (do this ONCE, in order)

In Framer: **Assets panel (left) → Code tab → + (New code file)**

For EACH file below:
1. Click **+** → name the file exactly as shown
2. Select all placeholder code → delete it
3. Paste the full contents of the matching file from `/framer/components/`
4. Press **Save** (Cmd+S) — the component appears in Assets

### Import order:
| # | File name | Copy from |
|---|-----------|-----------|
| 1 | `tokens` | `framer/tokens.ts` |
| 2 | `Button` | `framer/components/Button.tsx` |
| 3 | `SectionHeader` | `framer/components/SectionHeader.tsx` |
| 4 | `HeroSection` | `framer/components/HeroSection.tsx` |
| 5 | `Navbar` | `framer/components/Navbar.tsx` |
| 6 | `Footer` | `framer/components/Footer.tsx` |
| 7 | `FeatureCard` | `framer/components/FeatureCard.tsx` |
| 8 | `PricingCard` | `framer/components/PricingCard.tsx` |
| 9 | `BlogCard` | `framer/components/BlogCard.tsx` |
| 10 | `TestimonialCard` | `framer/components/TestimonialCard.tsx` |
| 11 | `StatCard` | `framer/components/StatCard.tsx` |
| 12 | `FAQItem` | `framer/components/FAQItem.tsx` |
| 13 | `DashboardMockup` | `framer/components/DashboardMockup.tsx` |
| 14 | `HowItWorksStep` | `framer/components/HowItWorksStep.tsx` |

---

## Step 3 — Create pages

In **Pages panel (top-left) → + Add Page**, create these:

| Page | URL slug |
|------|----------|
| Home | `/` |
| Features | `/features` |
| Pricing | `/pricing` |
| Dashboard | `/dashboard` |
| AI Demo | `/ai-demo` |
| CMS & Blog | `/cms` |
| Blog | `/blog` |
| Docs | `/docs` |
| Login | `/login` |
| Sign Up | `/signup` |
| License | `/license` |
| Privacy | `/privacy` |
| 404 | set as 404 page in Settings |

---

## Step 4 — Build the Home page

On the **Home** page:

### 4a — Full-width layout frame
- Press **F** → draw a frame that fills the full page
- In the right panel: W = `Fill`, H = `Auto`
- Set **Auto Layout**: vertical stack, gap = `0`

### 4b — Drop Navbar
- From **Assets → Code**, drag `Navbar` to the top of the frame
- In right panel, set: `brandName = "BaseBox"`, `darkMode = false`
- Set frame: W = `Fill`, H = `72px`, position = `sticky`, top = `0`

### 4c — Drop HeroSection
- Drag `HeroSection` below Navbar
- Set frame: W = `Fill`, H = `Auto`
- Props: `darkBackground = true` (already the default)

### 4d — Drop Footer
- Drag `Footer` below HeroSection
- Set frame: W = `Fill`, H = `Auto`

### 4e — Preview
Press **Play** (top right) to preview. You should see the dark hero.

---

## Step 5 — Navbar scroll behavior (optional but important)
1. Select the **Navbar** component on the page
2. Go to **Animate tab → Add interaction → Scroll**
3. When `scrollY > 50`: set `isScrolled = true`
4. This gives the glass blur effect on scroll

---

## Page URL links
When linking buttons/nav items to pages, use Framer's **Link** picker:
- Internal pages: select from the page list
- Do NOT type URLs manually — use the page picker

---

## Tips
- If a component shows an error, re-save it in the Code editor (Cmd+S)
- Components that use `tokens.ts` need `tokens` imported first
- For the Dashboard page: skip the Navbar/Footer, just drop `DashboardMockup` full-width
- For Login/Signup pages: skip Navbar/Footer, build a centered card natively
