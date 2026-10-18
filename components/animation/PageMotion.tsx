"use client";

import { useEffect } from "react";

/** Keep in sync with the `.ing-pinned` media query in styles/globals.css. */
const DESKTOP_PIN_QUERY = "(min-width: 1024px) and (min-height: 600px)";
/** Scroll-linked effects (and therefore GSAP) only run from tablet width up. */
const SCROLL_FX_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

/**
 * Single owner of all scroll choreography on the page. Sections are server
 * components that only expose `data-*` hooks.
 *
 * - Entry reveals use an IntersectionObserver + CSS transition everywhere
 *   (no library, so phones never download GSAP).
 * - GSAP + ScrollTrigger is imported lazily, only on screens ≥768px with
 *   motion allowed, and wired inside one gsap.matchMedia so breakpoint and
 *   reduced-motion changes revert cleanly.
 *
 * Property ownership (no two systems animate the same property):
 * - [data-reveal]       opacity + transform via CSS class `.is-visible`
 * - [data-parallax]     yPercent            (inner image wrapper only)
 * - [data-hero-*]       scale / opacity + y (hero scroll-out)
 * - [data-ing-*]        pinned ingredients timeline (CSS sticky + scrub)
 * - [data-bottle-*]     frame opacity + y, image scale, glow opacity
 */
export function PageMotion() {
  useEffect(() => {
    const root = document.documentElement;
    // If the 4s safety net already revealed content, don't hide it again.
    const lateStart = root.classList.contains("motion-fallback");
    root.classList.add("motion-ready");

    const disposeReveals = lateStart ? undefined : setupReveals();

    let cancelled = false;
    let disposeScrollFx: (() => void) | undefined;
    const scrollFxQuery = window.matchMedia(SCROLL_FX_QUERY);

    const startScrollFx = async () => {
      if (disposeScrollFx || !scrollFxQuery.matches) return;
      scrollFxQuery.removeEventListener("change", startScrollFx);
      const dispose = await setupScrollFx(lateStart);
      if (cancelled) dispose();
      else disposeScrollFx = dispose;
    };

    void startScrollFx();
    // A phone rotated or a window widened later can still opt in.
    scrollFxQuery.addEventListener("change", startScrollFx);

    return () => {
      cancelled = true;
      scrollFxQuery.removeEventListener("change", startScrollFx);
      disposeReveals?.();
      disposeScrollFx?.();
    };
  }, []);

  return null;
}

function setupReveals() {
  const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
  const observer = new IntersectionObserver(
    (entries) => {
      let index = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        // Stagger items that enter together.
        el.style.transitionDelay = `${index++ * 120}ms`;
        el.classList.add("is-visible");
        observer.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -12% 0px" },
  );
  elements.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}

async function setupScrollFx(lateStart: boolean) {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  // Measure after the browser is idle so setup doesn't compete with first
  // render and input (keeps Total Blocking Time low).
  await new Promise<void>((resolve) =>
    "requestIdleCallback" in window
      ? window.requestIdleCallback(() => resolve(), { timeout: 1500 })
      : setTimeout(resolve, 200),
  );
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add(
    { fx: SCROLL_FX_QUERY, desktop: DESKTOP_PIN_QUERY },
    (context) => {
      const { fx, desktop } = context.conditions as Record<string, boolean>;
      if (!fx) return;

      // Hero: gentle push-in on the photo, copy drifts up and fades.
      const hero = document.getElementById("top");
      if (hero) {
        gsap
          .timeline({
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
          })
          .to("[data-hero-media]", { scale: 1.05, ease: "none" }, 0)
          .to("[data-hero-copy]", { opacity: 0, y: -60, ease: "none" }, 0);
      }

      // Parallax on inner image wrappers (frames clip the overflow).
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax) || 10;
        gsap.fromTo(
          el,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // Ingredients: one pinned sequence — quince → honey → typographic secret.
      if (desktop && !lateStart) setupIngredients(gsap);

      // Bottle: a single deliberate reveal as the section arrives.
      const frame = document.querySelector("[data-bottle-frame]");
      if (frame) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#bottle",
              start: "top 80%",
              end: "center 55%",
              scrub: 0.8,
            },
          })
          // Opacity + scale only: the frame has soft masked edges, so a
          // clip-path wipe would reintroduce hard rectangular borders.
          .fromTo(frame, { opacity: 0, y: 70 }, { opacity: 1, y: 0, ease: "power2.out" }, 0)
          .fromTo("[data-bottle-image]", { scale: 1.16 }, { scale: 1, ease: "power2.out" }, 0)
          .fromTo("[data-bottle-glow]", { opacity: 0 }, { opacity: 1, ease: "none" }, 0.2);
      }
    },
  );

  // Images are lazy and fonts swap in: re-measure once things settle.
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  window.addEventListener("load", refresh);

  return () => {
    window.removeEventListener("load", refresh);
    mm.revert();
  };
}

function setupIngredients(g: typeof import("gsap").gsap) {
  const stage = document.querySelector<HTMLElement>("[data-ing-stage]");
  const track = stage?.parentElement;
  if (!stage || !track) return;
  const steps = g.utils.toArray<HTMLElement>("[data-ing-step]", stage);
  const markers = g.utils.toArray<HTMLElement>("[data-ing-marker]", stage);
  const setActive = (index: number) =>
    markers.forEach((m, i) => (m.dataset.active = String(i === index)));

  g.set(steps[1], { opacity: 0, y: 30 });

  const tl = g.timeline({
    defaults: { ease: "power2.inOut" },
    // The stage is pinned by CSS sticky; this only scrubs across its track.
    scrollTrigger: {
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => setActive(self.progress < 0.36 ? 0 : self.progress < 0.68 ? 1 : 2),
    },
  });

  tl.to("[data-ing-progress]", { scaleY: 1, ease: "none", duration: 3 }, 0)
    // Beat 1 — quince breathes
    .fromTo('[data-ing-img="quince"]', { scale: 1.06 }, { scale: 1, duration: 1 }, 0)
    // Beat 2 — honey rises over quince
    .to(steps[0], { opacity: 0, y: -30, duration: 0.3 }, 0.75)
    .to('[data-ing-img="honey"]', { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7 }, 0.75)
    .fromTo('[data-ing-img="honey"] img', { scale: 1.12 }, { scale: 1, duration: 1 }, 0.75)
    .to(steps[1], { opacity: 1, y: 0, duration: 0.35 }, 1.1)
    // Beat 3 — imagery recedes, the secret takes the stage
    .to(steps[1], { opacity: 0, y: -30, duration: 0.3 }, 1.95)
    .to("[data-ing-text] ol", { opacity: 0, duration: 0.3 }, 1.95)
    .to("[data-ing-media]", { opacity: 0.1, scale: 0.94, duration: 0.6 }, 1.95)
    .fromTo("[data-ing-secret]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 2.2)
    .to({}, { duration: 0.3 });
}
