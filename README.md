# Clarity website

Plain HTML/CSS/JS — no build step, no framework, no backend.

```
clarity-static/
├── index.html            Home — hero gauge, steps, bento features, privacy, screenshots, FAQ
├── privacy.html          Privacy policy (required by App Store Connect)
├── support.html          Support page + contact form (required by App Store Connect)
├── css/styles.css        All styles
├── js/main.js            Nav, FAQ, hero gauge, scroll reveal, contact form
└── assets/screenshots/   Drop your App Store screenshots here
```

## What changed from v1

- **Hero is now an interactive gauge.** Visitors drag a confidence
  slider against a fixed score and watch the verdict flip between
  overconfident / calibrated / underconfident. It demonstrates the
  product's core idea instead of describing it.
- **Features use a bento grid** (4+2 / 2+4 / 3+3), the layout pattern
  Apple and Notion popularised. Every row sums to six columns so there
  are no gaps at any breakpoint.
- **Added a "How it works" sequence** — four numbered steps, the one
  place on the page where numbering is genuinely warranted.
- **Screenshot slots left empty and clearly labelled**, six of them, in
  a snap-scrolling row.
- **Nav** gained a logo mark built from the calibration motif, an
  animated hamburger, and a border that appears only once you scroll.
- **Footer** rebuilt as a three-column layout with auto-updating year.
- Restrained scroll reveal that respects `prefers-reduced-motion`.
- Palette and typefaces unchanged.

## Before you publish

1. **Add your screenshots** — see `assets/screenshots/README.txt`.
2. **Replace placeholders:**
   - `[SUPPORT_EMAIL]` in `privacy.html` and `support.html`
   - `[YOUR NAME / COMPANY NAME]`, `[DATE]`, `[X.X]` in `privacy.html`
   - The `#` placeholder App Store links in nav, hero, closer, footer
3. **Wire up the contact form** — set `FORM_ENDPOINT` at the top of
   `js/main.js` to a Formspree or Web3Forms endpoint. Until you do, the
   form shows a message pointing people at the mailto link instead of
   silently failing.
4. **Add `assets/og-image.png`** (1200x630) for link previews.
5. **Have the privacy policy reviewed** before launch.

## Local preview

```
npx serve .
```

## Deploy to Vercel

Static files, no build step. Push to GitHub, import at vercel.com/new,
framework preset **Other**, leave build command and output directory
blank.

## URLs for App Store Connect

- Privacy Policy URL → `https://yourdomain.com/privacy`
- Support URL → `https://yourdomain.com/support`
- Marketing URL → `https://yourdomain.com`
