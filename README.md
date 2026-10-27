# RAJAL Distillery — Quince Honey Liqueur

One-page brand site: Next.js 16 (App Router, Cache Components), TypeScript strict, Tailwind CSS 4, GSAP ScrollTrigger. The design and content brief is in [docs/CLAUDE_CODE_MASTER_BRIEF.md](docs/CLAUDE_CODE_MASTER_BRIEF.md).

## Local setup

```bash
npm install
cp .env.example .env.local   # optional; every value has a safe fallback
npm run dev                  # http://localhost:3000 → redirects to /en
```

Quality checks:

```bash
npx tsc --noEmit
npm run lint
npm run build && npm start
node scripts/screenshots.mjs http://localhost:3000 screenshots   # needs `npx playwright install chromium`
```

`scripts/screenshots.mjs` takes screenshots at 360, 390, 768, 1024, 1440 and 1920 px, with and without reduced motion, including the three beats of the pinned sequence. It also reports horizontal overflow, console errors, missing alt text, heading-order jumps, the skip link and the mobile menu's Escape and focus handling.

### Why the production build uses webpack

`npm run build` runs `next build --webpack`. Turbopack, Next's default bundler, processes Tailwind/PostCSS in a helper process that binds a local port, and SiteGround's build sandbox forbids that (`binding to a port – Operation not permitted`). Webpack runs PostCSS in-process. `npm run dev` still uses Turbopack locally. Tailwind is configured through `postcss.config.mjs`.

## Structure

```text
app/[locale]/layout.tsx     root layout: fonts, metadata, hreflang, header/footer
app/[locale]/page.tsx       the one page (server component)
components/sections/*       Hero, Story, Ingredients, Craft, Experience, Bottle, Contact
components/animation/*      PageMotion (all scroll choreography), HeroVideo
components/layout/*         SiteHeader (+ mobile menu), LocaleSwitcher, SiteFooter
content/{en,sr,hu,de,fr}.json   all copy (English is canonical)
lib/i18n.ts                 locales, draft/approved status, dictionaries
lib/site-config.ts          contact, legal, hero video — from env vars
proxy.ts                    redirects / to the best approved locale
public/images/              original photography (renamed, see below)
public/video/               hero video slot (empty)
```

## Editing content

- **Copy:** edit `content/<locale>.json`. Every locale file must have the same keys as `en.json`, and `tsc` fails if one is missing.
- **Translations:** English, Serbian (Latin script), Hungarian, German and French are all published. If you add a language that still needs review, set its `status` to `"draft"` in `lib/i18n.ts` and fill `draftNotice` in its JSON file. Draft locales show a small notice, are marked `noindex`, are left out of the sitemap and hreflang, and are never picked by the automatic redirect.
- **Contact and legal:** set the `NEXT_PUBLIC_*` variables in `.env.local` or your hosting dashboard (see `.env.example`). While a value is empty, the site shows plain placeholder text, never a link that looks clickable.

## Hero video

1. Export `hero-desktop.mp4` (landscape, ~1920×1080, H.264, muted, 10–20 s loop, ideally under 6 MB) and `hero-mobile.mp4` (portrait, ~1080×1920, under 4 MB).
2. Put both files in `public/video/`.
3. Set `NEXT_PUBLIC_HERO_VIDEO=true` and rebuild.

The still photo stays underneath as the poster and the fallback. The video only loads when the visitor has not asked for reduced motion and Save-Data is off. It fades in once it actually plays, so if autoplay is blocked the still remains. On desktop the video fills the whole hero and a left-hand shade keeps the headline readable, so check that the bottle in the footage sits right of centre.

## Motion

`components/animation/PageMotion.tsx` is the only place where scroll animation is defined. Entry reveals use an IntersectionObserver with a CSS transition. GSAP is loaded lazily, **only on screens 768px and wider** with motion allowed, so phones never download it. All GSAP effects live inside one `gsap.matchMedia()`:

| Element | Behaviour |
| --- | --- |
| Hero | photo scales 1 → 1.05 and the copy fades upward as you scroll (scrubbed, not pinned) |
| `[data-reveal]` | one-time fade/rise on entry (CSS, every device) |
| `[data-parallax]` | gentle yPercent drift on the inner image wrapper, from tablet width up |
| Ingredients | desktop only (≥1024×600): held by CSS `position: sticky` in a track whose height (3 viewports) is reserved up front, so there is no layout shift; GSAP only scrubs the timeline: quince → honey (rises in) → a separate typographic "secret" beat, with a progress rail |
| Bottle | one scrubbed reveal (opacity, rise, scale settling from 1.16 to 1, CSS glow) |

The ingredients section has two renderings: a pinned one and a stacked editorial one. CSS media queries pick between them, so there is no layout shift. Mobile, short screens, reduced motion and visitors without JS get the stacked layout with native scrolling. With `prefers-reduced-motion: reduce` there is no pinning, no parallax and nothing hidden. If the animation bundle has not started after 4 s, all content is revealed anyway.

## Photography

Originals are kept unaltered except for the file names. `next/image` serves AVIF/WebP at responsive sizes. Only the hero image is preloaded.

| File | Original | Used in |
| --- | --- | --- |
| `hero-bottle-on-stones.jpg` | Photo 07 | Hero (art-directed: right-hand panel on landscape screens, top crop on portrait) |
| `quince-orchard-rows.jpg` | Photo 05 | Story |
| `quince-cluster-closeup.jpg` | Photo 35-1 | Story detail |
| `quince-orchard-aerial.jpg` | Photo 52 | Decorative interlude between Story and Ingredients |
| `quince-on-branch.jpg` | Photo 16 | Ingredients — quince |
| `bees-on-honeycomb.jpg` | Photo 68 | Ingredients — honey |
| `beekeeper-at-hive.jpg` | Photo 28 | Craft (captioned as beekeeping, not distillation) |
| `honeycomb-frame.jpg` | Photo 122 | Craft detail |
| `bottle-with-glass.jpg` | Photo 06 | Experience |
| `bottle-among-rocks.jpg` | Photo 32 | Bottle |
| `beekeeper-holding-bottle.jpg` | Photo 35 | Contact |
| `bottle-studio-dark.jpg` | Photo 01 | Open Graph image |
| `honey-pour.jpg` | Photo 167 | Not used: its pale, greenish tone clashed with the palette |

Copy and alt text do not claim that the pictured orchard or apiary belongs to the distillery. No bottle cut-out was made, because the photos have no clean edge to cut along. The bottle always appears in its original composition, and soft CSS masks blend the photos' black backdrops into the page.

## Legal pages and age gate

- `/[locale]/privacy`: privacy policy (GDPR and Serbian ZZPL), including the **Cookies & storage** section (`#cookies`).
- `/[locale]/legal-notice`: legal notice (Impressum).
- The texts are in `content/legal/{en,sr,de}.ts`. Hungarian and French currently show the English text with a notice. Bump `LEGAL_UPDATED` in `lib/legal.ts` whenever a text changes.
- **Company details** go in `content/company.ts` (name, address, MB, PIB, representative, hosting provider, log retention). Missing values appear as highlighted `[[placeholders]]`, so nothing is invented.
- **Age gate** (`components/layout/AgeGate.tsx`) appears on the homepage only, so the legal pages stay reachable. It includes a language switcher, so visitors can change the language before answering. After "Yes", the current time is stored in `localStorage` under `rajal-age-confirmed` for 30 days (`lib/age.ts`). No cookies are set anywhere, so there is no cookie banner. If tracking or embeds are ever added, a consent banner becomes mandatory and the privacy policy must be updated.

## Known TODOs and launch inputs

- [ ] **Hero video** files and usage rights.
- [ ] **Contact details:** private and trade email addresses, phone number. Optionally a contact form, which would need its own data handling and privacy notice.
- [ ] **Legal review:** fill in `content/company.ts` and have a lawyer review the privacy policy, legal notice and age gate.
- [ ] **Alcohol marketing compliance** for each target market (Serbia and EU countries): whether an age gate is required, the wording of the responsible-drinking message (the French version uses the Loi Évin wording), restrictions on targeting minors.
- [ ] **Cookie/analytics consent** if analytics are added (there are none today).
- [ ] **Translation review** for sr / hu / de / fr. Confirm whether Serbian should be Latin or Cyrillic script; Cyrillic would need fonts with Cyrillic subsets.
- [ ] **Product facts:** confirm 0.7 L, 18% vol., "limited annual production", and the label wording.
- [ ] **Brand assets:** an official logo (a typographic wordmark stands in for it), a final favicon, and the production domain (`NEXT_PUBLIC_SITE_URL`).
- [ ] **Social profiles:** none are linked until real URLs are supplied.

## Deployment checklist

1. Set `NEXT_PUBLIC_SITE_URL` to the production origin, plus any confirmed contact, legal and video variables.
2. `npm run build`. It must finish without errors; every locale is prerendered.
3. Run `scripts/screenshots.mjs` against the preview deployment and review the output.
4. Run Lighthouse on the **production build** (`npm run build && npm start`), in an incognito window without extensions. `npm run dev` scores much lower because of unminified code, the dev overlay and Fast Refresh. Last local measurement: desktop 94–99, mobile 84–85, CLS 0, accessibility/best practices/SEO 100. LCP is the hero image.
5. Confirm that `/` redirects to the visitor's language and that `/sitemap.xml` and `/robots.txt` are correct.
