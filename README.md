# Azrin Amran — Developer Portfolio (`azrinfreeman.github.io`)

Live site: **https://azrinfreeman.github.io**

Interactive freelance and software engineering portfolio built with **React, TypeScript, Vite, and Tailwind CSS**, automatically synced with public GitHub repositories tagged with `portfolio`.

## How Automatic GitHub Sync Works

1. **Publish any public repo to the portfolio:**
   - On GitHub, open the repository's **About** settings (gear icon) and add the topic **`portfolio`**.
   - Optional category topics (auto-detected from language/topics if omitted):
     - `portfolio-mobile`
     - `portfolio-backend`
     - `portfolio-edtech`
     - `portfolio-tools`
   - Optional hero showreel topic:
     - `portfolio-featured` (pins the project to the interactive top demo reel).

2. **Automatic extraction (`scripts/sync-github.mjs`):**
   - Pulls repo description, primary language, topics, latest GitHub Release tag & link, and `README.md` summary bullets.
   - Automatically discovers posters, screenshots, and MP4/WebM demo videos linked in `README.md` (or inside `docs/`, `media/`, `teaser/`, `trailer/`, `output/`, `screenshots/`) and optimizes them with `ffmpeg` into `.webp` posters and fast-start H.264 `.mp4` videos.
   - Optional per-repo `portfolio.json`: place a `portfolio.json` in any repo root if you want custom `title`, `tagline`, `category`, `problem`, `solution`, `highlights`, or `disclosureNote`.
   - Curated overrides for flagship projects live in [`src/data/overrides.ts`](src/data/overrides.ts).
   - Set `liveUrl` to a deployed HTTPS build in `portfolio.json`, or set the GitHub Website field for a standard link. Add `embedType` (`web`, `flutter`, `unity`, or `playground`) to enable the on-demand preview and `mobileOk: false` for desktop-first builds. Enable the preview only after testing the build inside its script-only sandbox. Apps that use sign-in or browser storage can open directly in a new tab via `liveUrl`.

3. **Automatic deployment triggers (`.github/workflows/deploy.yml`):**
   - **Daily schedule:** Runs every day at **03:00 AM Malaysia Time** (`19:00 UTC`).
   - **Manual trigger:** Click **Actions → Deploy Portfolio to GitHub Pages → Run workflow** anytime on GitHub.
   - **Push to `main`:** Builds and deploys automatically on every push.

## Local Development

```bash
npm install
npm run sync      # Fetch latest portfolio-tagged repos & media from GitHub
npm run dev       # Start local dev server
npm run build     # Typecheck + production build into dist/
npm run preview   # Preview production build locally
```

## Backend playground

Open **Playground** from the navigation. Send the sample sign-in request, book the sample appointment twice to see a `409`, then create a Checkout session and replay its completion webhook twice to see duplicate handling. **Reset session** restores the initial state. The playground uses a browser-only simulator. Edit the sample payloads and simulated API behavior in [`src/data/backend-playground.ts`](src/data/backend-playground.ts).

### Stripe sandbox

The optional [Cloudflare Worker](worker/stripe-checkout.mjs) creates and checks Stripe test Checkout sessions for one recurring sandbox price. It handles no production subscriptions. The Stripe section appears only when the portfolio build receives the Worker URL.

1. In a Stripe sandbox, create a recurring demo Price and a restricted test key with permission to write and read Checkout Sessions.
2. Deploy `worker/wrangler.jsonc` from the authenticated Cloudflare account with Wrangler 4.36 or later. In the Worker, set `STRIPE_TEST_KEY` as a secret and `STRIPE_TEST_PRICE_ID` to the sandbox Price ID. Keep the key out of the portfolio's build environment.
3. In the portfolio repository's Actions variables, set `STRIPE_DEMO_WORKER` to the Worker's HTTPS origin and run the Pages workflow. For a local build, the equivalent Vite variable is `VITE_STRIPE_DEMO_WORKER`. The Worker permits the origin configured in `PORTFOLIO_ORIGIN`.
