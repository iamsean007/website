# Masala Lab — Concept Prototype

A high-fidelity, mobile-first concept visualization for a next-generation Indian food brand built around customization, community, and playful food creation.

**Tagline:** *Your dish. Your name. Your flavor. Maybe next week, everyone's eating it.*

## Live Demo

### Option A — GitHub Pages (recommended, permanent)

The app auto-deploys to the `gh-pages` branch. **Enable it once:**

1. Open [github.com/iamsean007/website/settings/pages](https://github.com/iamsean007/website/settings/pages)
2. Source → **Deploy from a branch**
3. Branch: `gh-pages` · Folder: `/ (root)` → **Save**
4. Live at **https://iamsean007.github.io/website/** (takes ~1 min)

### Option B — Deploy to Vercel (instant, no GitHub Pages needed)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iamsean007/website&project-name=masala-lab&root-directory=masala-lab)

Click the button, sign in, deploy — Vercel gives you a live URL in ~30 seconds.

### Option C — Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/iamsean007/website#BASE=masala-lab)

Set **Base directory** to `masala-lab` when prompted.

## Experience Overview

| Screen | Description |
|--------|-------------|
| **Hero Menu** | Cinematic scroll through 5 signature dishes — large food cards with emotional copy, popularity scores, and "Create Yours" CTAs |
| **Scene 01 — Chicken** | Vertical ingredient journey. Swipe/drag a clay-oven drumstick; choose cut & marinade style (tandoori, garlicky, spicy, buttery, herb, classic) |
| **Scene 02 — Sauce** | Real-time sauce visualization transforms as you drag flavor sliders (buttery, garlicky, creamy, smoky, tangy, spicy) |
| **Scene 03 — Yours** | Finished dish preview with generated number (#253), naming, rice/naan choice, nutrition profile, and order CTA |

## Run Locally

```bash
cd masala-lab
npm install
npm run dev
```

Open http://localhost:5173 — best on mobile viewport or the built-in phone frame.

## Tech Stack

- Vite + React + TypeScript
- Framer Motion for animations & gestures
- CSS custom properties for brand tokens
