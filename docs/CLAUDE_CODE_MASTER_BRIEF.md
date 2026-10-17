# RAJAL Distillery — Claude Code Master Implementation Brief

## Mission
Implement a production-quality, cinematic, accessible, responsive **one-page brand website** for **Rajal Distillery Quince Honey Liqueur**, using the supplied `index.html` only as a **visual/content prototype**, not as the final architecture. Use the supplied original photos in `assets/` and preserve the actual bottle and label accurately. Never replace these assets with AI-generated approximations.

**Source of truth priority:** (1) this brief and real photos, (2) supplied English/Serbian copy document if available, (3) HTML preview, (4) aesthetic references. The Gorki List website is a reference **only for continuous sections, restrained overlaps, product depth, and scroll pacing**. Do not copy its code, assets, branding, text, or red color palette.

## Non-negotiable design direction
- **Dark Botanical Luxury**: editorial premium spirits aesthetic; cinematic, warm, understated; no generic SaaS cards.
- Palette: espresso `#130E0B`, deep olive `#252B1D`, honey gold `#C8A16B`, ivory `#F1E8D9`, amber `#7A391B`, supporting muted text `#C1B2A1`.
- Type: elegant editorial serif headings (e.g. Playfair Display or Cormorant Garamond) plus restrained modern sans (DM Sans / Manrope). Ensure fonts support all target languages and Latin diacritics.
- **No wavy/curved section edges**, no obvious alternating rectangular full-width stripes, no repeated 3-card UI grids. Section boundaries can be straight but should visually disappear via adjacent backgrounds, gradients, negative space, overlaps and photographic compositions.
- Keep scroll comfortable, intentional, and performant. Don't create excessive scroll-jacking or scroll traps.
- Use large authentic photography, intentional asymmetry, tasteful negative space, accessible contrast, and restrained gold accents.

## Required sections / story sequence
1. **Hero**: full-viewport muted autoplay looping video as `video` background (when real footage is supplied), `playsInline`, `poster` from original imagery, `preload=metadata`, overlay for readable typography; headline `The Art of Quince & Honey.`; `Rajal Distillery — Since 1999`; CTA `Discover the Story` anchors to story. **Do not fabricate a video**. Until footage is available use original photo poster with an implementation-ready video slot. On mobile use an appropriate separate crop/poster if needed. Respect reduced-motion and Save-Data preferences.
2. **Our Story**: orchard photography, family tradition since 1999, natural transition from hero; staggered editorial image/text. No invented factual claims about ownership of pictured orchard.
3. **Ingredients**: quince, 100% natural meadow honey, secret citrus note. On desktop create **one compact sticky/pinned storytelling sequence**: large imagery of quince → honey and synced text, with a separate typographic mystery beat. Provide regular stacked fallback on mobile, reduced-motion, and small screens. Avoid implying the exact citrus fruit identity is known.
4. **The Craft**: beekeeper and honeycomb photos; craft narrative, respect ingredients/process/tradition. **Do not misrepresent beekeeper photo as distillation footage.**
5. **The Experience**: original bottle-with-glass photo, aroma/balance/character, neat slightly chilled / on ice / digestif / cocktails; pairings fine cheese, dark chocolate, fruit desserts, nuts. Avoid unverified health claims.
6. **The Bottle**: authentic product photo; 0.7 L, 18% vol., Made in Serbia, limited annual production. Optional prominent bottle cutout crossing the visual transition, **only if a careful faithful cutout can be made from the original**, preserving label; otherwise use unaltered original composition. One cinematic bottle reveal, not aggressive spinning/3D fabrication.
7. **Contact / B2B**: consumer enquiry + distributors/importers/hotels/restaurants/bars/specialty retailers/corporate gifting. **Do not invent email, phone, address, shop checkout, or social URLs**. Configure via environment/content file and show safe placeholder until supplied. No nonfunctional button masquerading as a working contact action.
8. **Footer**: brand, locale switcher, responsible-drinking message and required legal links once legal copy/URLs are provided.

## Real photo assets / mapping
Original names → normalized names in `public/images/` (renamed during implementation):

| Original | Normalized | Use |
| --- | --- | --- |
| `Photo 01 (Large).jpg` | `bottle-studio-dark.jpg` | close clean bottle on dark background; OG image / product detail |
| `Photo 05 (Large).jpg` | `quince-orchard-rows.jpg` | wide quince orchard; Our Story |
| `Photo 06 (Large).jpg` | `bottle-with-glass.jpg` | bottle with liqueur glass; Experience |
| `Photo 07 (Large).jpg` | `hero-bottle-on-stones.jpg` | bottle among rocks, portrait; hero poster |
| `Photo 16 (Large).jpg` | `quince-on-branch.jpg` | quince close-up; Ingredients |
| `Photo 28 (Large).jpg` | `beekeeper-at-hive.jpg` | beekeeper with honeycomb frame; Craft |
| `Photo 32 (Large).jpg` | `bottle-among-rocks.jpg` | bottle among rocks; Bottle showcase |
| `Photo 35 (Large).jpg` | `beekeeper-holding-bottle.jpg` | beekeeper holding bottle; Contact |
| `Photo 35-1 (Large).jpg` | `quince-cluster-closeup.jpg` | another quince close-up; Story detail |
| `Photo 52 (Large).jpg` | `quince-orchard-aerial.jpg` | aerial orchard; transition band |
| `Photo 68 (Large).jpg` | `bees-on-honeycomb.jpg` | honeycomb and bees; Ingredients honey |
| `Photo 122 (Large).jpg` | `honeycomb-frame.jpg` | honeycomb frame; supporting Craft |
| `Photo 167 (Large).jpg` | `honey-pour.jpg` | flowing honey; currently unused |

Optimize delivery with `next/image` (AVIF/WebP), responsive `sizes`, avoid loading all photos eagerly; priority only for the actual LCP asset. Retain originals and original aspect ratios. Note hero portrait poster can crop poorly at desktop widths: art-direct desktop and mobile hero crops carefully and avoid cutting off the bottle.

## Stack and architecture
- Next.js App Router, TypeScript strict, Tailwind CSS, semantic HTML.
- GSAP + ScrollTrigger for the **limited** pinned ingredients and bottle scroll sequence; use CSS transitions or Motion only when genuinely useful; avoid overlapping animation systems controlling the same properties. Register/cleanup ScrollTrigger via `gsap.context()` in client components; dynamic import if necessary; use `matchMedia` for responsive/reduced motion; refresh after fonts/images load.
- Server components by default; client components only for animation, navigation, locale control and interactivity.
- `next/image` for photos, native `<video>` for hero; poster always available. Avoid hydration errors, large layout shifts, and forced reflows. Use transform/opacity for animation where possible.
- Suggested structure: `app/[locale]/page.tsx`, `app/[locale]/layout.tsx`, `components/sections/*`, `components/animation/*`, `components/layout/*`, `content/{en,sr,hu,de,fr}.json`, `lib/i18n.ts`, `public/images/*`, `public/video/*`, `styles/globals.css`.
- Locale routing: `en`, `sr`, `hu`, `de`, `fr`. English is canonical content; Serbian source copy exists. **Do not invent approved translations** for Hungarian/German/French: scaffold locale support and provide clearly marked draft translations for review only, or hide incomplete languages until approved. Proper locale metadata, canonical/hreflang when published.

## Detailed motion choreography
- Hero: subtle image/video scale ~1→1.05 over scroll, headline opacity/translate fade, gradient continuity to story. Never pin a full autoplay video for multiple screens.
- Story: image slight parallax and copy reveal; image may overlap gradient into ingredients but no literal waves.
- Ingredients: desktop pinned visual area, 2–3 states (quince, honey, mystery), readable progress, ~1.5–2.5 viewport heights total, no fast flashing; on touch/mobile convert to native scroll stacked editorial layout.
- Craft: image reveal and soft parallax; text stagger only once on entry.
- Experience: lightweight text/serving item reveals, no hover-only essential information.
- Bottle: deliberate cinematic reveal using real product photo; optional transparent cutout only if faithful. Gold glow subtle and CSS-based, no synthetic rebranding.
- Contact: calm final transition, all calls to action actionable.
- Always provide `prefers-reduced-motion: reduce` mode with **no pinned sections or parallax**, immediate readable content; support keyboard navigation and screen readers.

## Responsiveness & accessibility
- Mobile-first widths: 360, 390, 768, 1024, 1440, 1920px; test intermediate widths.
- Hero headings never obscure bottle/label; nav collapses into accessible menu with focus management and Escape handling.
- Semantic heading order, landmarks, alt text for informative images, decorative alt empty, visible focus states, sufficient contrast (WCAG AA for normal text), skip-to-content link.
- Native scroll with scroll-margin for anchored sections; no inaccessible carousels; 44px target size for touch controls.
- Avoid CLS from font swap, images and pinned elements; video fallback on autoplay restrictions.
- Optimize CWV/Lighthouse (target 90+ performance on realistic mobile testing, not guaranteed). Verify with production build, mobile throttling, and Web Vitals.

## Legal/product requirements to confirm before launch
- Alcohol marketing laws for target markets (Serbia, EU countries) including responsible-drinking statement, potential age-gate requirements, restrictions on targeting minors, product claims and purchase CTA. Do not assume one universal age gate is legally sufficient everywhere.
- Privacy/cookie compliance, contact-form data handling if form added, Impressum/legal notice for markets where required, analytics consent if analytics are introduced.
- Confirm final contact details, social profiles, domain, brand/logo rights, product facts, video rights, exact bottle labeling and translations.

## Acceptance criteria
- Real RAJAL photos and correct product label, no AI bottle substitutes.
- Cinematic video-ready hero with poster fallback.
- **No waves, no blocky stripes**; seamless transitions and strong editorial composition.
- At least one polished pinned desktop ingredients sequence, one restrained bottle reveal, and gentle parallax/reveals elsewhere.
- Mobile is elegant and scrolls natively without pinning bugs.
- Reduced-motion works; accessible menu/links and alt text.
- All visible content grounded in supplied source copy; no invented commercial contact info or claims.
- Working production build and documented outstanding launch dependencies.
