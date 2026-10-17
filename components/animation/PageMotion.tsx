"use client";

import { useEffect } from "react";

/** Keep in sync with the `.ing-pinned` media query in styles/globals.css. */
const DESKTOP_PIN_QUERY = "(min-width: 1024px) and (min-height: 600px)";

/**
 * Single owner of all scroll choreography on the page. Sections are server
 * components that only expose `data-*` hooks; this component loads GSAP
 * lazily (off the critical path) and wires everything inside one
 * gsap.matchMedia so reduced motion and breakpoint changes revert cleanly.
 *
 * Property ownership (no two systems animate the same property):
 * - [data-reveal]       opacity + y         (entry reveal, once)
 * - [data-parallax]     yPercent            (inner image wrapper only)
 * - [data-hero-*]       scale / opacity + y (hero scroll-out)
 * - [data-ing-*]        pinned ingredients timeline
 * - [data-bottle-*]     frame opacity + y, image scale, glow opacity
 */
export function PageMotion() {
  useEffect(() => {
    const root = document.documentElement;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      // If the 4s safety net already revealed content, don't hide it again.
      const lateStart = root.classList.contains("motion-fallback");
      root.classList.add("motion-ready");

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: DESKTOP_PIN_QUERY,
          tablet: "(min-width: 768px)",
        },
        (context) => {
          const { motion, desktop, tablet } = context.conditions as Record<string, boolean>;
          if (!motion) return;

          // Entry reveals
          if (!lateStart) {
            const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
            gsap.set(reveals, { opacity: 0, y: 40 });
            ScrollTrigger.batch(reveals, {
              start: "top 88%",
              once: true,
              onEnter: (batch) =>
                gsap.to(batch, {
                  opacity: 1,
                  y: 0,
                  duration: 1.1,
                  ease: "power3.out",
                  stagger: 0.12,
                  overwrite: true,
                }),
            });
          }

          // Hero: gentle push-in on the photo, copy drifts up and fades.
          const hero = document.getElementById("top");
          if (hero) {
            const tl = gsap.timeline({
              scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
            });
            tl.to("[data-hero-media]", { scale: 1.05, ease: "none" }, 0).to(
              "[data-hero-copy]",
              { opacity: 0, y: -60, ease: "none" },
              0,
            );
          }

          // Parallax on inner image wrappers (frames clip the overflow).
          if (tablet) {
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
          }

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

      function setupIngredients(g: typeof gsap) {
        const stage = document.querySelector<HTMLElement>("[data-ing-stage]");
        if (!stage) return;
        const steps = g.utils.toArray<HTMLElement>("[data-ing-step]", stage);
        const markers = g.utils.toArray<HTMLElement>("[data-ing-marker]", stage);
        const setActive = (index: number) =>
          markers.forEach((m, i) => (m.dataset.active = String(i === index)));

        g.set(steps[1], { opacity: 0, y: 30 });

        const tl = g.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
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

      // Images are lazy and fonts swap in: re-measure once things settle.
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh);

      cleanup = () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
