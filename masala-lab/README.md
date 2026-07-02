# Masala Lab — Concept Prototype

A high-fidelity, mobile-first concept visualization for a next-generation Indian food brand built around customization, community, and playful food creation.

**Tagline:** *Your dish. Your name. Your flavor. Maybe next week, everyone's eating it.*

## Experience Overview

| Screen | Description |
|--------|-------------|
| **Hero Menu** | Cinematic scroll through 5 signature dishes — large food cards with emotional copy, popularity scores, and "Create Yours" CTAs |
| **Scene 01 — Chicken** | Vertical ingredient journey. Swipe/drag a clay-oven drumstick; choose cut & marinade style (tandoori, garlicky, spicy, buttery, herb, classic) |
| **Scene 02 — Sauce** | Real-time sauce visualization transforms as you drag flavor sliders (buttery, garlicky, creamy, smoky, tangy, spicy) |
| **Scene 03 — Yours** | Finished dish preview with generated number (#253), naming, rice/naan choice, nutrition profile, and order CTA |

## Design Language

- **Colors:** Deep orange, saffron, chili red, charcoal black, clay brown, cream white, herb green
- **Feel:** Premium restaurant app × food game × social platform
- **Interactions:** Swipe gestures, scroll-snap scenes, tactile sliders, spring animations

## Run Locally

```bash
cd masala-lab
npm install
npm run dev
```

Open http://localhost:5173 — best experienced in mobile viewport or the built-in phone frame.

## Live Demo

**Interactive demo (temporary tunnel):** https://replacing-nobody-premium-nominations.trycloudflare.com

Open on your phone for the best experience. Tap **Create Yours** on Butter Chicken, then scroll through the three scenes.

### Permanent hosting (GitHub Pages)

The app auto-deploys to the `gh-pages` branch on every push to `main`. To enable the permanent URL:

1. Go to [github.com/iamsean007/website/settings/pages](https://github.com/iamsean007/website/settings/pages)
2. Under **Build and deployment**, set Source to **Deploy from a branch**
3. Select branch `gh-pages`, folder `/ (root)`
4. Save — the app will be live at **https://iamsean007.github.io/website/**

## Concept Art

Static high-fidelity mockups are in `/opt/cursor/artifacts/assets/`:
- `hero-menu-concept.png`
- `chicken-scene-concept.png`
- `sauce-scene-concept.png`
- `finished-dish-concept.png`

## Tech Stack

- Vite + React + TypeScript
- Framer Motion for animations & gestures
- CSS custom properties for brand tokens
