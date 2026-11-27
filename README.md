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
