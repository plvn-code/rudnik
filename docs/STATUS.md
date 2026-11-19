# Status — started 2026-11-19

Local preview: http://localhost:3024. Local git only — no GitHub / Vercel yet.

## Done
Full redesign in Ukrainian, white + RUDNIK red:
- Home: intro (the R mark assembles), drone-photo hero slideshow with scroll pull-in, manifest + counters, systems marquee, «Де стоятиме ваша станція?» picker (6 surfaces → 3D render + specs), pinned production story «Від рулону сталі до готового комплекту» (5 stages, real equipment params), why us, scroll-driven portfolio rail, production film (client's own video, sound toggle), other solutions, partnership for installers, process, partner logos, news, FAQ (+ FAQPage schema), red request band.
- 6 system pages (LANDING, Solar Parking, BALAST, SolarSet, BLOCK, фасадна) + 5 solution pages (профіль, кошики, забивання паль, проєктування, ЛСТК) from one template: specs strip, variants with render switcher, advantages, components with cut-out renders, parameter table (Solar Parking), method/stages blocks, category portfolio, FAQ from their hidden accordions.
- Catalogue pages, Виробництво (counters, film, pinned stages, equipment cards), Портфоліо (83 photos, 8 category filters, lightbox, ?cat= deep links), Про компанію, Контакти (form with their 6 topics), 404, sitemap, robots, Organization schema.
- Checked at 1440 and 390 px; no horizontal scroll; lint + tsc + production build clean.

## Added 2026-11-19 (second request)
- `/rozrakhunok` — quiz landing: video background, 6-step cost quiz in the first screen (surface → variant → modules/kW → material → who → timing → result with recommended system, power, indicative range and request form), how it works, surface cards that open the quiz pre-filled, why factory price, photos, partner logos, FAQ. Header / mobile bar / home CTAs lead here.
- Home hero: background video (Pexels montage) instead of the photo slideshow.

## Sources used
- rudnik.ua (UA, 2026-11-19): home, про компанію, systems, every system page incl. FAQ answers, інші рішення, ЛСТК (production capacities), забивання паль, проєктування, портфоліо (83 items with types), контакти, blog (4 posts).
- Instagram @rudnik.ua (175 posts): positioning lines, panels / KBE cable / EPDM in stock, CarPort.

## Questions for the client
1. **Where should requests go?** Telegram bot (token + chat id) or e-mail (then we add Resend). Until then the form shows the phone and e-mail.
2. **Metal per month:** the desktop counter on rudnik.ua says 2 400 t, the mobile one 2 500 t. Which is right? (site uses 2 400)
3. **Process step texts** («Як ми працюємо»): rudnik.ua has only the five step names; the one-line descriptions are ours — please confirm.
4. **Partner logos** (АТБ, Сільпо, Novus, Епіцентр К, ОККО, Ковальська, Perfect Group, Рудь) are taken from rudnik.ua — confirm the client may show them (written permission from those brands).
5. **Portfolio captions:** only the system and type are known. Object names, cities, power (kW) and year would make the portfolio much stronger.
6. **News:** we show 4 posts (Solar Parking, Intersolar Europe 2026, KBE BERLIN cable, EPDM). Do they want a full blog section with article pages? Photos for Intersolar / KBE are stand-ins (their stand, panel close-up).
7. **Products in stock** (solar panels, KBE cable 6 мм², EPDM seal from Instagram/blog): should there be a «Комплектуючі» page with prices or a request form?
8. **English version:** old site has /en. The redesign is UA only.
9. **Social links:** footer of rudnik.ua shows Facebook, Telegram, TikTok but the links weren't found — send real URLs.
10. **Facade layout names:** the two facade renders are labeled «Схема розкладки 01 / 02» — give real names if they have them.
11. **Video:** the production film is vertical (9:16). A horizontal drone/factory film would allow a video hero.

12. **Quiz prices — most important.** RUDNIK publishes no prices, so the quiz shows the Ukrainian retail market range for similar kits (per module: ground 1 850–3 900 грн, ballast 950–1 900, pitched roof 800–1 350, BLOCK 600–1 100; Solar Parking and facade «за проєктом»), clearly labelled as market prices. Ask for their price per module / per kit (steel vs aluminium, partner vs retail) and replace `perPanel` in `src/lib/quiz.ts`.
13. **Hero video** is stock (Pexels). If they have their own drone footage of RUDNIK objects, it would be better than stock.

## Launch checklist
- GitHub repo, Vercel project (ask the user first).
- Env: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `NEXT_PUBLIC_SITE_URL`, then `NEXT_PUBLIC_SITE_LIVE=1`.
- Send one test request from production.
