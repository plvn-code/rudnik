# RUDNIK — redesign of rudnik.ua

Client site for **RUDNIK** — Ukrainian factory of mounting systems for solar power plants and facades (с. Крюківщина, Київська обл.; Instagram @rudnik.ua). White + the brand red **#d60c0c** (taken from their logo SVG) + graphite. Style references: megasolar.vercel.app, line-energy.vercel.app, aluabri.vercel.app (this project started from the Line Energy skeleton at `~/Desktop/lineenergy`).

**Talk to the user in Russian.** Site copy is **Ukrainian only** (`lang="uk"`, ’ apostrophes, «» quotes). Read `docs/STATUS.md` first (open client questions, launch checklist).

## Repo
Local git only (branch `main`). No GitHub repo and no Vercel yet — ask before creating either.

## Commands
```bash
npm run dev                                   # port 3024
npm run build && npm start                    # production on :3024
kill $(lsof -ti tcp:3024 -sTCP:LISTEN)        # restart (the LISTEN filter keeps Chrome alive)
npm run lint && npx tsc --noEmit              # must stay clean
open -a "Google Chrome" http://localhost:3024
```
Real `node_modules` (npm install), not a symlink.

## Stack
Next.js 15 App Router · React 19 · TypeScript strict · plain CSS (`src/app/globals.css`, tokens in `:root`) · next/font (Unbounded display — wide uppercase like the wordmark, Onest body, JetBrains Mono labels) · no animation libraries (IntersectionObserver + rAF: `src/lib/motion.ts`, `src/components/Effects.tsx`). All motion respects `prefers-reduced-motion`.

## Layout
```
src/app/            / · /systemy[/slug] (6 systems) · /rishennia[/slug] (5 solutions) · /vyrobnytstvo · /portfolio (?cat=) · /pro-kompaniyu · /kontakty · api/lead · sitemap · robots · icon.svg
src/components/     Header (white text over the home hero, hides on scroll down), Footer (giant outlined wordmark), Intro (the red R assembles from its 4 pieces, red wipe),
                    Logo (client's vector: Logo, Mark, path exports), LeadForm (topics as on rudnik.ua/kontakty), LeadModal/LeadButton, Gallery (lightbox), PortfolioFilter,
                    Shared (PageHero, ProductCard, Marquee, Faq + faqSchema, Partners, ContactBand), Effects, CursorLabel, MobileBar
src/components/home Hero (drone slideshow, clip-path pull-in on scroll), Manifest (word scrub + counters), Picker (signature: surface → system render, auto-cycles),
                    Production (pinned "from coil to kit", real equipment params), Rail (scroll-driven horizontal portfolio), VideoBand (client's production film),
                    Sections (Why, VideoSection, Solutions, Partnership, Process, Trusted, News, HomeFaq)
src/components/product  ProductPage (one template for all 11 products, every block optional), Variants (render switcher)
src/lib/            site.ts (contacts, nav, counters, partners, form topics) · products.ts (all system/solution copy, specs, variants, parts, FAQ) ·
                    portfolio.ts + portfolio-data.ts (83 photos with categories, generated) · copy.ts (why, partnership, process, capacities, news, home FAQ) · media.json (image sizes, generated)
```
Every fact on the site comes from rudnik.ua (all system pages incl. hidden FAQ answers, about, ЛСТК capacities, blog) or @rudnik.ua. Don't invent numbers; add open points to `docs/STATUS.md`.

## Media (`scripts/`, raw material in `research/raw`, gitignored)
- rudnik.ua (Cloudflare) answers 429 to scripts. `scripts/dl.js` runs inside the Playwright browser (`browser_run_code_unsafe` with `filename`), fetches every file from the page context and POSTs it to `scripts/receiver.py` (`python3 -I scripts/receiver.py research/raw` on 127.0.0.1:8799). The production mp4 downloads with plain curl.
- `~/Desktop/nudes/research/.venv/bin/python -I scripts/build_media.py . [images|video|sizes|all]` → `public/images/{portfolio,site,render,parts,partners}` WebP (renders keep alpha, trimmed), `public/video/production.mp4` (720×1280 H.264, ~8 MB) + poster, `src/lib/media.json`.
- Renders and component cut-outs are the client's own 3D images. Hero = their drone photos (portfolio 79, 73, 39, 11, 77).
- Raw downloads were deleted after the build (low disk); re-run dl.js to refetch.

## Leads
`/api/lead` → Telegram bot when `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` are set; otherwise 503 and the form shows the phone and e-mail. Nothing is stored. Search indexing stays off until `NEXT_PUBLIC_SITE_LIVE=1`.
