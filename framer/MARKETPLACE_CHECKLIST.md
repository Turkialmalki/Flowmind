# BaseBox — Framer Marketplace Submission Checklist

Use this before clicking "Submit for Review". Every item must be checked.
Framer reviewers will test all of these. A single failure = rejection.

---

## CRITICAL — Instant Rejection if Missing

- [ ] **404 page exists** — Set a custom 404 in Pages panel. Must have "Back to Home" CTA.
- [ ] **No broken links** — Every nav item, button, and footer link resolves to a real page.
- [ ] **No placeholder text** — Zero instances of "Lorem ipsum", "[Insert text]", "Coming soon", or dummy email addresses.
- [ ] **No empty pages** — Every page has at least one complete section with real content.
- [ ] **CMS collections have entries** — Blog Posts: ≥3 entries. Changelog: ≥3 entries. All fields populated.
- [ ] **No hardcoded personal data** — No real phone numbers, real email addresses, or real payment info.

---

## Pages (All 14 must exist and be navigable)

- [ ] Home `/`
- [ ] Features `/features`
- [ ] Dashboard `/dashboard`
- [ ] AI Demo `/ai-demo`
- [ ] CMS & Blog `/cms`
- [ ] Pricing `/pricing`
- [ ] Blog `/blog`
- [ ] Blog Post `/blog/:slug` (CMS dynamic page)
- [ ] Docs `/docs`
- [ ] Login `/login`
- [ ] Sign Up `/signup`
- [ ] License `/license`
- [ ] Privacy `/privacy`
- [ ] 404 (configured as the 404 page in Framer settings)

---

## Navigation & Links

- [ ] Navbar logo links back to Home
- [ ] All navbar items link to correct pages
- [ ] Mobile menu works (hamburger opens/closes)
- [ ] Mobile menu links all work
- [ ] All CTA buttons have real hrefs (not `#`)
- [ ] Footer: all 3 columns have working links
- [ ] Footer social links open in new tab
- [ ] Footer social links have `aria-label`
- [ ] Blog cards link to the correct blog post detail page
- [ ] 404 page "Back to Home" button links to `/`
- [ ] Login page has "Sign up" link → `/signup`
- [ ] Signup page has "Sign in" link → `/login`
- [ ] License page linked from footer
- [ ] Privacy page linked from footer
- [ ] Contact email uses `mailto:` format

---

## CMS Setup

- [ ] "Blog Posts" collection created with all required fields
- [ ] "Blog Posts" has at least 3 complete entries (title, excerpt, image, content, date)
- [ ] Blog listing page uses a Collection List bound to "Blog Posts"
- [ ] Blog Post detail page is marked as CMS Page, bound to "Blog Posts"
- [ ] "Changelog" collection created with all required fields
- [ ] "Changelog" has at least 3 complete entries
- [ ] All CMS images have alt text in the CMS field

---

## Editability (Critical for Marketplace)

Every element must be editable by the buyer without touching code.

- [ ] All text is in editable Text layers (not locked)
- [ ] All section headlines use Text layers (not image text)
- [ ] All button labels are editable strings
- [ ] All button links are editable (not hardcoded in component logic)
- [ ] All images can be swapped (use Framer's Fill or Image layer)
- [ ] Code components use `addPropertyControls` for all user-facing props
- [ ] Color styles defined at project level (buyer can change brand color in one place)
- [ ] Font styles defined at project level
- [ ] No content locked/hidden behind component internals without controls

---

## Design Consistency

- [ ] Same navbar on every page (except Login/Signup/Dashboard standalone)
- [ ] Same footer on every page (except Login/Signup/Dashboard standalone)
- [ ] Consistent heading hierarchy: H1 on every page, H2 for sections
- [ ] Same button system: gradient primary, outline secondary, purple tertiary
- [ ] Same color palette throughout (no random off-brand colors)
- [ ] Same font pairing: Sora for headlines, Inter for body
- [ ] Consistent border-radius: 10px/14px/20px system
- [ ] Consistent section padding: ~100px top/bottom
- [ ] Consistent container max-width: 1200px centered

---

## Responsiveness

Test every page at these viewports before submitting:

| Viewport | Width | Pass? |
|----------|-------|-------|
| iPhone SE | 375px | [ ] |
| iPhone 14 | 390px | [ ] |
| iPad | 768px | [ ] |
| iPad Pro | 1024px | [ ] |
| Laptop | 1280px | [ ] |
| Desktop | 1440px | [ ] |

Checks at each breakpoint:
- [ ] No horizontal scroll
- [ ] No text overflow / clipping
- [ ] Images scale correctly
- [ ] Navbar collapses to hamburger on mobile
- [ ] All CTAs are tappable (min 44×44px)
- [ ] Pricing cards stack vertically on mobile
- [ ] Dashboard is readable on tablet
- [ ] Footer stacks on mobile

---

## Accessibility

- [ ] Every image has an `alt` attribute (not empty, not "image")
- [ ] All icons used decoratively have `aria-hidden="true"`
- [ ] Interactive icons have `aria-label`
- [ ] Every form input has an associated `<label>`
- [ ] Color contrast ≥ 4.5:1 for body text (check with Stark or browser DevTools)
- [ ] Color contrast ≥ 3:1 for large text (headings)
- [ ] Gradient text (H2 accents) has a fallback color set
- [ ] All interactive elements are reachable by keyboard (Tab)
- [ ] Focus states are visible (not removed with `outline: none`)
- [ ] Page has exactly one `<h1>` per page
- [ ] H2 → H3 heading order is never skipped
- [ ] Links have descriptive text (not "click here" or "learn more" alone)
- [ ] Social proof section has proper list semantics
- [ ] Charts have `role="img"` and `aria-label`

---

## Assets & Performance

- [ ] All images are WebP or optimized JPG (not PNG unless transparency needed)
- [ ] No image exceeds 500KB
- [ ] Hero background image compressed
- [ ] Unused assets removed from project
- [ ] No external image hotlinks (all images uploaded to Framer assets)
- [ ] No copyrighted images (Shutterstock, Getty, stock photos without license)
- [ ] All images from Unsplash/Pexels (free commercial license)

---

## Copyright & Originality

- [ ] No real brand logos in the design (Revolut, Stripe, OpenAI, etc.)
- [ ] No screenshots of real apps (Notion, Linear, Slack, etc.)
- [ ] All fonts are from Google Fonts (free, open source)
- [ ] Icons are custom SVGs or from a free icon set (Lucide, Heroicons, etc.)
- [ ] No trademarked terms used misleadingly
- [ ] Content is original (not copied from other templates or websites)

---

## Framer-Specific Requirements

- [ ] Template name: **BaseBox** — clear, not misleading
- [ ] Template description is accurate and compelling
- [ ] Thumbnail is 1440×900px, WEBP/PNG, shows the actual Home page
- [ ] Preview images show: Home, Dashboard, Pricing, Mobile, Blog, Login
- [ ] All pages are named clearly in the Pages panel
- [ ] No development/draft pages left in the published template
- [ ] Template opens immediately to the Home page
- [ ] Page transitions are set (Fade, 0.25s)

---

## Pre-Submit Final Test

1. **Publish to a test URL** — Share link → Publish → test on mobile + desktop
2. **Tab through all interactive elements** — keyboard navigation
3. **Disable CSS** — verify content is readable as plain text (SEO/accessibility)
4. **Share the preview URL** with a fresh incognito window and test all navigation
5. **Check all CMS pages** — blog listing loads, individual posts open

---

## Template Description (copy-paste ready)

```
BaseBox is a complete AI SaaS system template — not just a landing page.

Includes: High-converting home page (16 sections), full dashboard UI, 
CMS-powered blog, docs, pricing, changelog, and more.

14 pages. 14 Framer Code Components. 2 CMS collections. 
Everything structured, editable, and ready to launch.

Perfect for: SaaS founders, AI startups, indie hackers, no-code entrepreneurs.

Design system: Sora + Inter + Fira Code. Indigo/violet gradient system.
Animations: Smooth scroll reveals, parallax, interactive hover states.
```

---

## Pricing Recommendation

| Tier | Price | Notes |
|------|-------|-------|
| Launch price | $39 | First 2 weeks |
| Standard | $49 | After 20 sales |
| Full price | $59 | After 100 sales |

---

## Support Email

Add `hello@basebox.io` (or your real email) to the template listing.
Framer requires a valid support contact.
