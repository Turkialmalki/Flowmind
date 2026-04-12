# BaseBox — Complete Framer Build Guide

This guide walks you through rebuilding BaseBox as a native Framer template, step-by-step. Follow every section in order before submitting to the Marketplace.

---

## Prerequisites

- Framer desktop app (latest version)
- A new blank Framer project
- Google Fonts loaded: **Sora**, **Inter**, **Fira Code**
- All 14 code components from `/framer/components/` imported

---

## Part 0 — Project Setup

### 0.1 — Fonts

In Framer: **Settings → Fonts → Add Google Font**

| Font | Use |
|------|-----|
| Sora | Headlines, brand name |
| Inter | Body text, UI labels |
| Fira Code | Mono badges, code snippets, eyebrows |

### 0.2 — Color Styles

In Framer: **Assets panel → Colors → + Add Color**. Create these named swatches:

| Name | Value |
|------|-------|
| `bg` | `#ffffff` |
| `bg-2` | `#f7f8fc` |
| `bg-3` | `#eff1f8` |
| `text-primary` | `#0a0e1a` |
| `text-secondary` | `#374151` |
| `text-muted` | `#6b7280` |
| `brand-indigo` | `#5b5bd6` |
| `brand-indigo-light` | `rgba(91,91,214,0.08)` |
| `sky` | `#0ea5e9` |
| `emerald` | `#059669` |
| `amber` | `#d97706` |
| `border` | `rgba(15,23,42,0.07)` |
| `border-strong` | `rgba(15,23,42,0.13)` |
| `gradient-brand` | `linear-gradient(135deg, #6C5CE7 0%, #7C4DFF 50%, #8E7CFF 100%)` |

### 0.3 — Text Styles

Create these in **Assets → Text Styles**:

| Name | Font | Size | Weight | Line Height |
|------|------|------|--------|-------------|
| `Display/H1` | Sora | 64px | 700 | 1.05 |
| `Display/H2` | Sora | 52px | 700 | 1.1 |
| `Display/H3` | Sora | 32px | 700 | 1.2 |
| `Body/Large` | Inter | 17px | 400 | 1.7 |
| `Body/Base` | Inter | 15px | 400 | 1.65 |
| `Body/Small` | Inter | 14px | 400 | 1.6 |
| `Label` | Inter | 13px | 500 | 1.4 |
| `Mono/Eyebrow` | Fira Code | 12px | 500 | 1.5 |
| `Mono/Label` | Fira Code | 11px | 500 | 1.4 |

### 0.4 — Import Code Components

1. Open **Assets panel → Code**
2. Click **+** → **New Code File**
3. For each `.tsx` file in `/framer/components/`:
   - Paste the full file contents
   - The component will auto-appear in the Assets panel
4. Import `tokens.ts` first (it's a dependency)

Order of import:
1. `tokens.ts`
2. `Button.tsx`
3. `SectionHeader.tsx`
4. `HeroSection.tsx`
5. `Navbar.tsx`
6. `Footer.tsx`
7. `FeatureCard.tsx`
8. `PricingCard.tsx`
9. `BlogCard.tsx`
10. `TestimonialCard.tsx`
11. `StatCard.tsx`
12. `FAQItem.tsx`
13. `DashboardMockup.tsx`
14. `HowItWorksStep.tsx`

---

## Part 1 — Page Structure

Create all pages in **Pages panel → + Add Page**.

| Page Name | URL | Layout |
|-----------|-----|--------|
| Home | `/` | Layout (Navbar + Footer) |
| Features | `/features` | Layout |
| Dashboard | `/dashboard` | Standalone (no Footer) |
| AI Demo | `/ai-demo` | Layout |
| CMS & Blog | `/cms` | Layout |
| Pricing | `/pricing` | Layout |
| Blog | `/blog` | Layout |
| Blog Post | `/blog/:slug` | Layout + CMS |
| Docs | `/docs` | Layout |
| Login | `/login` | Standalone |
| Sign Up | `/signup` | Standalone |
| License | `/license` | Layout |
| Privacy | `/privacy` | Layout |
| 404 | (auto) | Layout |

### Create a Master Layout Frame

1. On each page, create a full-width frame: `W: Fill, H: Auto`
2. Inside it, stack vertically: **Navbar → Page Content → Footer**
3. Use **Auto Layout** (Stack, vertical, gap: 0)
4. Set the Navbar to `position: sticky, top: 0, z-index: 100`

---

## Part 2 — Home Page

Build the Home page with these sections in order:

### 2.1 — Navbar
- Drop the `Navbar` code component at the top
- Set `brandName: "BaseBox"`
- Set `darkMode: true` (hero has dark background)
- Links: Features → `/features`, Pricing → `/pricing`, Blog → `/blog`, Docs → `/docs`, Dashboard → `/dashboard`
- CTA Outline: "Sign In" → `/login`
- CTA Primary: "Get Template" → `/pricing`
- In Framer, add a **Scroll** interaction: when scrollY > 50, switch to `isScrolled: true` variant

### 2.2 — Hero Section
- Drop the `HeroSection` code component
- Set `darkBackground: false`
- Set all copy props per `HeroSection.defaultProps`
- CTA Primary: "Get BaseBox Now" → `/pricing`
- CTA Secondary: "View Dashboard" → `/dashboard`

### 2.3 — Social Proof Bar
Build with native Framer tools:
- Full-width frame, `bg-2` background, 1px bottom border
- Auto Layout horizontal, centered
- 4–5 company logo placeholders (grayscale, opacity 50%)
- Text: "Trusted by 500+ founders" in `Mono/Eyebrow` style

### 2.4 — Why Section
- `SectionHeader`: eyebrow "Why BaseBox", headline "Launch like a funded startup — at indie prices"
- 3-column bento grid of `FeatureCard` components

### 2.5 — How It Works
- `SectionHeader`: eyebrow "How It Works", headline "From zero to live in 3 steps"
- Row of 3 `HowItWorksStep` components:
  1. "Get BaseBox" (indigo)
  2. "Customize your brand" (sky)
  3. "Publish & grow" (emerald)
- Set `showConnector: true`, `isLast: true` on the third step

### 2.6 — Features Bento Grid
- `SectionHeader`
- 3-column CSS Grid with `FeatureCard` components
- First card: `isAccent: true, cardSize: "wide"`
- Mix card sizes for visual interest

### 2.7 — Dashboard Preview
- `DashboardMockup` component, full-width
- Add a subtle parallax effect via Framer's scroll-driven animations
- Wrap in a section with `bg-2` background

### 2.8 — Metrics Row
- 4× `StatCard` side by side, auto-layout horizontal
- Values: 12.4K users, 4.8% conversion, $48K MRR, 500+ founders

### 2.9 — Testimonials
- `SectionHeader`: "What founders are saying"
- 3-column grid of `TestimonialCard`
- Add at least 6 testimonials (use Framer's overflow/scroll)

### 2.10 — Pricing
- `SectionHeader`: eyebrow "Get BaseBox", headline "One payment. Everything included."
- 3× `PricingCard` side by side
- Middle card: `isPopular: true`

### 2.11 — FAQ
- `SectionHeader`: eyebrow "Common Questions"
- 8–10× `FAQItem` in a single column, max-width 720px, centered
- `showDivider: true`

### 2.12 — Final CTA
- Full-width gradient background (`gradient-brand`)
- H2: "Ready to launch your AI SaaS?"
- `Button` (primary, xl): "Get BaseBox Now" → `/pricing`
- Micro-trust: "No subscription · Instant access · Lifetime updates"

### 2.13 — Footer
- `Footer` code component
- Set all column links to match the site map above
- Set `contactEmail: "hello@basebox.io"` (update to your real email)
- Set social URLs (Twitter/X and GitHub)

---

## Part 3 — Features Page

### Sections:
1. **PageHero** — headline "Every feature your SaaS needs", dark gradient background
2. **Features Bento Grid** — 9+ `FeatureCard` components
3. **DashboardMockup** — with darkMode: false
4. **CTA strip** — "Ready to see it live? → View Dashboard"

---

## Part 4 — Dashboard Page (Standalone)

This page uses a **standalone layout** (no site Navbar/Footer — only a minimal dashboard nav).

### Build:
1. Full-width sidebar (200px) + main content area — use Auto Layout horizontal
2. Drop `DashboardMockup` as the main content (set `darkMode: false`)
3. Add a minimal top bar: logo, user avatar placeholder, "Back to Home" link
4. Add Framer interactions: tab clicks switch between Analytics / Reports / Revenue views

---

## Part 5 — AI Demo Page

1. **Hero** — "Try the AI Assistant"
2. **Chat UI frame** — build with native Framer tools:
   - Input field at bottom (`bg-3`, border, rounded-full)
   - Message bubbles above (user: indigo bg; assistant: white card)
   - Add pre-filled "demo" messages in the design
   - Wire an **Interaction** to the Send button to cycle through response variants
3. **Feature list** — what the AI can do

---

## Part 6 — Blog Page + Blog Post

### Blog Listing
1. `SectionHeader`: "Ideas for AI founders"
2. **Collection List** → "Blog Posts" collection → 9 items per page
3. Item template: `BlogCard` component
4. Bind fields:
   - `title` → `Blog Posts.Title`
   - `excerpt` → `Blog Posts.Excerpt`
   - `category` → `Blog Posts.Category`
   - `date` → `Blog Posts.Published Date`
   - `imageUrl` → `Blog Posts.Cover Image`
   - `imageAlt` → `Blog Posts.Cover Image Alt`
   - `postUrl` → `Blog Posts.Slug` (auto-linked by Framer)

### Blog Post Detail (CMS Page)
1. Mark as **CMS Page** → bind to "Blog Posts"
2. Layout:
   - Back button → `/blog`
   - Category badge + date + read time
   - H1: `Blog Posts.Title`
   - Cover image (full width, aspect-ratio 16/9)
   - Author card (avatar + name + role)
   - Rich text content: `Blog Posts.Content`
   - Related posts (2 cards) from same collection

---

## Part 7 — Pricing Page

1. **PageHero** — gradient background, "Simple, honest pricing"
2. 3× `PricingCard` side by side
3. **Value comparison table** — build natively:
   - Header row: "What's included" / "Market rate" / "BaseBox Pro"
   - 6 rows from the current Pricing.jsx compareRows data
4. **FAQ** — 6× `FAQItem` (pricing-specific questions)
5. **CTA** strip

---

## Part 8 — Login & Signup Pages (Standalone)

Build these as standalone pages (no Navbar/Footer):

### Login
- Centered card, max-width 400px
- Logo at top
- H1: "Welcome back"
- Email + Password inputs (native Framer inputs or code)
- Primary button: "Sign in"
- "Forgot password?" link
- Link to Signup page
- Accessibility: `<label>` for each input, `aria-required`

### Signup
- Same structure as Login
- Fields: Name, Email, Password, Confirm Password
- Checkbox: "I agree to the Terms of Service" (link to `/license`)
- Primary button: "Create account"
- Link to Login page

---

## Part 9 — Docs Page

1. Two-column layout: left sidebar (240px) + main content
2. Sidebar: section links (Getting Started, Installation, Components, CMS, etc.)
3. Main content: rendered markdown-style sections with H2/H3/code blocks
4. Add a search input at the top (decorative or wired to Framer interactions)

---

## Part 10 — Changelog Page

1. `SectionHeader`: "What's new in BaseBox"
2. **Collection List** → "Changelog" collection
3. Item layout (build natively):
   - Left column: Version badge + Release Date
   - Right column: Title + Tag + Summary
   - Vertical connector line between items

---

## Part 11 — License + Privacy Pages

Both use the same simple layout:

1. Centered content column, max-width 760px
2. H1 heading
3. Last updated date
4. Rich text sections with H2/H3 headings
5. Use the content from `src/pages/LicensePage.jsx` and `src/pages/PrivacyPage.jsx`

---

## Part 12 — 404 Page

**Required for Marketplace approval.**

1. In Framer: Pages → Set 404 Page
2. Layout:
   - Large "404" text (display font, gradient fill, 120px)
   - H1: "Page not found"
   - Body: "The page you're looking for doesn't exist. Let's get you back."
   - Primary button: "Back to Home" → `/`
   - Secondary button: "Browse Docs" → `/docs`
   - Quick links row: Features · Pricing · Blog · Dashboard

---

## Part 13 — Animations & Interactions

### Scroll-triggered animations (apply to all sections)
1. Select a section frame
2. **Animate** tab → **On Scroll Into View**
3. Settings: `opacity 0→1`, `translateY 40px→0px`, duration `0.75s`, easing `Ease Out`

### Navbar scroll behavior
1. Add a Framer **Scroll** interaction on the page
2. When `scrollY > 50`: switch Navbar to `isScrolled: true` variant
3. Add `backdropFilter: blur(16px)` and `background: rgba(255,255,255,0.88)`

### Button hover states
1. For each `Button` component usage, override hover:
   - `opacity: 0.92`
   - `translateY: -1px`
   - `boxShadow` increases slightly

### Page transitions
1. In **Settings → Prototype → Transitions**
2. Set default: `Fade`, `0.25s`, `Ease In Out`

---

## Part 14 — Responsiveness

### Breakpoints to set up in Framer:

| Breakpoint | Width | Changes |
|------------|-------|---------|
| Desktop | 1280px+ | Default layout |
| Tablet | 768–1279px | 2-column grids → 1-column, hide some text |
| Mobile | 375–767px | Single column, stacked nav, larger touch targets |

### Mobile-specific changes:
- Navbar: hide desktop links, show hamburger menu icon
- Hero: stack text + mockup vertically
- Bento grid: 1 column
- Pricing: vertical stack (not 3-column)
- Footer: 2-column grid, then 1-column at 480px

### Use Framer breakpoints:
1. Select a frame
2. Press `B` to add breakpoint
3. Adjust layout for each breakpoint

---

## Part 15 — Pre-Submission QA

Run through this before clicking "Submit to Marketplace":

### Links
- [ ] Every navigation link resolves to a real page
- [ ] All CTA buttons have correct hrefs
- [ ] Footer links all work
- [ ] Social links open in new tab with `rel="noopener noreferrer"`
- [ ] No `#` placeholder links anywhere

### Content
- [ ] No "Lorem ipsum" placeholder text
- [ ] No empty pages or sections
- [ ] CMS collections have at least 3 sample entries each
- [ ] All images have alt text

### Accessibility
- [ ] All images have descriptive alt attributes
- [ ] Form inputs have `<label>` elements
- [ ] Heading hierarchy: one H1 per page, H2/H3 for sections
- [ ] Color contrast ≥ 4.5:1 for body text
- [ ] Interactive elements are keyboard-navigable

### Responsiveness
- [ ] Test at 375px (iPhone SE)
- [ ] Test at 768px (iPad)
- [ ] Test at 1280px (Desktop)
- [ ] No horizontal scroll at any breakpoint
- [ ] Touch targets ≥ 44×44px

### Performance
- [ ] All images are WebP or optimized JPG
- [ ] No images larger than 500KB
- [ ] Remove unused code components
- [ ] No console errors in preview

### Copyright
- [ ] Only use Unsplash/Pexels free images
- [ ] No brand logos (Revolut, Stripe, OpenAI, etc.)
- [ ] Remove any copied screenshots from real products
- [ ] All fonts are from Google Fonts (free)

---

## Image Sources (Free, License-Compliant)

Use these Unsplash collections — all free for commercial use:

- **Dashboard/SaaS**: `https://unsplash.com/s/photos/dashboard`
- **Team/People**: `https://unsplash.com/s/photos/team`
- **Technology**: `https://unsplash.com/s/photos/technology`
- **Abstract**: `https://unsplash.com/s/photos/abstract-gradient`

Always download and re-upload to Framer assets. Never hotlink Unsplash URLs in production.

---

## Marketplace Submission Checklist

See `MARKETPLACE_CHECKLIST.md` for the complete pre-submission checklist.

---

## Questions?

Contact: `hello@basebox.io`
