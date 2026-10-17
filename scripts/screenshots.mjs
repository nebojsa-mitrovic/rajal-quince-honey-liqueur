// Responsive screenshot + smoke check against a running server.
// Usage: node scripts/screenshots.mjs [baseUrl] [outDir]
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const outDir = process.argv[3] ?? "screenshots";
mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: "360", width: 360, height: 760 },
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1440", width: 1440, height: 900 },
  { name: "1920", width: 1920, height: 1080 },
];

async function scrollThrough(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(1200);
}

const browser = await chromium.launch();
const problems = [];

for (const vp of viewports) {
  for (const motion of ["no-preference", "reduce"]) {
    if (motion === "reduce" && !["390", "1440"].includes(vp.name)) continue;
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      reducedMotion: motion,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    page.on("console", (msg) => {
      if (["error", "warning"].includes(msg.type())) problems.push(`[${vp.name}/${motion}] ${msg.text()}`);
    });
    page.on("pageerror", (err) => problems.push(`[${vp.name}/${motion}] ${err.message}`));

    await page.goto(`${base}/en`, { waitUntil: "networkidle" });
    const tag = `${vp.name}${motion === "reduce" ? "-reduced" : ""}`;
    await page.screenshot({ path: join(outDir, `${tag}-hero.png`) });

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (overflow > 0) problems.push(`[${tag}] horizontal overflow ${overflow}px`);

    await scrollThrough(page);

    // Pinned ingredients beats (desktop with motion only)
    const pinned = await page.evaluate(() => {
      const el = document.querySelector(".ing-pinned");
      return el ? getComputedStyle(el).display !== "none" : false;
    });
    if (pinned) {
      const start = await page.evaluate(() => {
        const stage = document.querySelector("[data-ing-stage]");
        const spacer = stage.parentElement;
        return spacer.getBoundingClientRect().top + window.scrollY;
      });
      for (const [i, frac] of [0.05, 0.5, 0.97].entries()) {
        await page.evaluate((y) => window.scrollTo(0, y), start + frac * 2 * vp.height);
        await page.waitForTimeout(900);
        await page.screenshot({ path: join(outDir, `${tag}-ingredients-${i + 1}.png`) });
      }
    }

    for (const id of ["story", "ingredients", "craft", "experience", "bottle", "contact"]) {
      await page.evaluate((s) => document.getElementById(s).scrollIntoView({ behavior: "instant" }), id);
      await page.waitForTimeout(700);
      await page.screenshot({ path: join(outDir, `${tag}-${id}.png`) });
    }
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(500);
    await page.screenshot({ path: join(outDir, `${tag}-footer.png`) });
    await context.close();
  }
}

// Accessibility smoke: images without alt, heading order, duplicate ids.
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto(`${base}/en`, { waitUntil: "networkidle" });
const a11y = await page.evaluate(() => {
  const issues = [];
  document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("alt")) issues.push(`img without alt: ${img.src}`);
  });
  const ids = new Map();
  document.querySelectorAll("[id]").forEach((el) => ids.set(el.id, (ids.get(el.id) ?? 0) + 1));
  ids.forEach((n, id) => n > 1 && issues.push(`duplicate id: ${id}`));
  const visible = (el) => el.getClientRects().length > 0;
  const headings = [...document.querySelectorAll("h1,h2,h3,h4")].filter(visible);
  let last = 0;
  for (const h of headings) {
    const level = Number(h.tagName[1]);
    if (level > last + 1) issues.push(`heading jump to ${h.tagName}: "${h.textContent}"`);
    last = level;
  }
  if (document.querySelectorAll("h1").length !== 1) issues.push("expected exactly one h1");
  return issues;
});
problems.push(...a11y.map((i) => `[a11y] ${i}`));

// Keyboard: skip link is first focusable and targets main.
await page.keyboard.press("Tab");
const firstFocus = await page.evaluate(() => document.activeElement?.getAttribute("href"));
if (firstFocus !== "#main") problems.push(`[a11y] first tab stop is ${firstFocus}, expected skip link`);

// Mobile menu: opens, traps focus, closes on Escape.
await page.setViewportSize({ width: 390, height: 844 });
await page.getByRole("button", { name: "Menu" }).click();
const menuVisible = await page.locator("#mobile-menu").isVisible();
await page.keyboard.press("Escape");
const menuClosed = await page.locator("#mobile-menu").isHidden();
const focusBack = await page.evaluate(() => document.activeElement?.getAttribute("aria-controls"));
if (!menuVisible || !menuClosed || focusBack !== "mobile-menu")
  problems.push(`[menu] visible=${menuVisible} closed=${menuClosed} focusReturned=${focusBack}`);

await browser.close();

console.log(problems.length ? problems.join("\n") : "No problems found.");
