"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { LocaleSwitcher, type LocaleOption } from "./LocaleSwitcher";
import { Wordmark } from "./Wordmark";

const SECTIONS = ["story", "ingredients", "craft", "experience", "bottle", "contact"] as const;

type Props = {
  locale: string;
  nav: Dictionary["nav"];
  locales: LocaleOption[];
};

export function SiteHeader({ locale, nav, locales }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Solid background after leaving the hero; hide while scrolling down,
  // reveal on the way up — unless keyboard focus is inside the header.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      const focusInside = headerRef.current?.contains(document.activeElement) ?? false;
      setHidden(y > 480 && y > lastY + 4 && !focusInside);
      if (Math.abs(y - lastY) > 4) lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setMenuOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  // Mobile menu: scroll lock, focus trap, Escape to close.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    root.classList.add("menu-open");
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu(true);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) closeMenu(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      root.classList.remove("menu-open");
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen, closeMenu]);

  const homeHref = `/${locale}`;

  return (
    <header
      ref={headerRef}
      // No translate/backdrop-filter while the menu is open: either would make
      // the header the containing block of the fixed full-screen panel.
      className={`fixed inset-x-0 top-0 z-50 transition-[translate,background-color,padding] duration-500 ease-out ${
        hidden && !menuOpen ? "-translate-y-full" : ""
      } ${scrolled && !menuOpen ? "bg-night/80 py-3 backdrop-blur-md" : "py-5 lg:py-8"}`}
    >
      <div className="mx-auto flex max-w-[120rem] items-center justify-between px-5 sm:px-8 lg:px-[5vw]">
        <a href={`${homeHref}#top`} aria-label={nav.home} className="relative z-10 -my-2 py-2">
          <Wordmark />
        </a>

        <nav aria-label={nav.primary} className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-4">
            {SECTIONS.map((id) => (
              <li key={id}>
                <a
                  href={`${homeHref}#${id}`}
                  className="flex min-h-11 items-center px-3 text-[0.8rem] tracking-[0.04em] text-ivory/85 transition-colors hover:text-gold"
                >
                  {nav.links[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <LocaleSwitcher current={locale} locales={locales} label={nav.language} />
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="relative z-10 flex min-h-11 min-w-11 items-center justify-end gap-3 text-xs font-semibold tracking-[0.18em] uppercase lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => (menuOpen ? closeMenu(true) : setMenuOpen(true))}
        >
          <span>{menuOpen ? nav.menuClose : nav.menuOpen}</span>
          <span aria-hidden className="relative block h-3 w-6">
            <span
              className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={nav.primary}
        hidden={!menuOpen}
        className="fixed inset-0 overflow-y-auto bg-[linear-gradient(180deg,#0b0503_0%,#1a1710_60%,#20241a_100%)] px-6 pt-28 pb-10 lg:hidden"
      >
        <nav aria-label={nav.primary}>
          <ul className="space-y-1">
            {SECTIONS.map((id, index) => (
              <li key={id}>
                <a
                  href={`${homeHref}#${id}`}
                  onClick={() => closeMenu(false)}
                  className="flex min-h-14 items-baseline gap-4 font-serif text-[2.1rem] leading-tight transition-colors hover:text-gold"
                >
                  <span className="font-sans text-[0.7rem] tracking-[0.2em] text-gold">
                    0{index + 1}
                  </span>
                  {nav.links[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-12 border-t border-line/50 pt-6">
          <p className="eyebrow mb-3">{nav.language}</p>
          <LocaleSwitcher current={locale} locales={locales} label={nav.language} inline />
        </div>
      </div>
    </header>
  );
}
