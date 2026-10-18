"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { AGE_STORAGE_KEY } from "@/lib/age";
import { Wordmark } from "./Wordmark";

type Props = {
  dict: Dictionary["ageGate"];
  legal: Dictionary["footer"]["legal"];
  languageLabel: string;
  locale: string;
  locales: { code: string; nativeName: string; htmlLang: string }[];
};

/**
 * Legal-age confirmation. Server-rendered so there is no flash: CSS shows it
 * only when `.js` is set and `.age-ok` is not (the inline boot script in the
 * root layout adds `.age-ok` before first paint if a confirmation younger
 * than AGE_STORAGE_DAYS exists in localStorage). No cookies are used.
 */
export function AgeGate({ dict, legal, languageLabel, locale, locales }: Props) {
  const [denied, setDenied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const yesRef = useRef<HTMLButtonElement>(null);
  const changeRef = useRef<HTMLButtonElement>(null);

  // While open: everything else is inert (no focus, no screen reader access).
  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("age-ok")) {
      // Already confirmed (set by the boot script): remove the gate entirely
      // instead of relying on CSS alone to keep it hidden.
      // eslint-disable-next-line react-hooks/set-state-in-effect -- depends on client-only storage
      setConfirmed(true);
      return;
    }
    const others = Array.from(document.body.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && !el.hasAttribute("data-age-gate"),
    );
    others.forEach((el) => (el.inert = true));
    yesRef.current?.focus();
    return () => others.forEach((el) => (el.inert = false));
  }, []);

  useEffect(() => {
    if (document.documentElement.classList.contains("age-ok")) return;
    (denied ? changeRef : yesRef).current?.focus();
  }, [denied]);

  const confirm = () => {
    try {
      localStorage.setItem(AGE_STORAGE_KEY, String(Date.now()));
    } catch {
      /* Storage blocked: the gate simply reappears on the next visit. */
    }
    const root = document.documentElement;
    root.classList.add("age-ok");
    document.querySelectorAll<HTMLElement>("body > *").forEach((el) => (el.inert = false));
    document.getElementById("main")?.focus({ preventScroll: true });
    setConfirmed(true);
  };

  // Unmount after confirming, independent of the CSS that hides the gate.
  if (confirmed) return null;

  return (
    <div
      data-age-gate
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-text"
      className="age-gate fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[radial-gradient(ellipse_at_50%_40%,#2c1509_0%,#0b0503_60%)] px-5 py-10"
    >
      <div className="mx-auto w-full max-w-lg text-center">
        <Wordmark className="text-ivory" />
        <div aria-hidden className="mx-auto my-10 h-px w-16 bg-gold/70" />

        {denied ? (
          <>
            <h2 id="age-gate-title" className="subheading">
              {dict.deniedTitle}
            </h2>
            <p id="age-gate-text" className="prose-body mt-5">
              {dict.deniedText}
            </p>
            <button
              ref={changeRef}
              type="button"
              onClick={() => setDenied(false)}
              className="text-link mt-10"
            >
              {dict.changeAnswer}
            </button>
          </>
        ) : (
          <>
            <h2 id="age-gate-title" className="subheading">
              {dict.title}
            </h2>
            <p id="age-gate-text" className="prose-body mt-5 text-ivory/85">
              {dict.question}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                ref={yesRef}
                type="button"
                onClick={confirm}
                className="min-h-12 w-full border border-gold bg-gold px-7 text-xs font-semibold tracking-[0.16em] text-espresso uppercase transition-colors hover:bg-gold-soft sm:w-auto"
              >
                {dict.yes}
              </button>
              <button
                type="button"
                onClick={() => setDenied(true)}
                className="min-h-12 w-full border border-line px-7 text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:border-gold hover:text-gold sm:w-auto"
              >
                {dict.no}
              </button>
            </div>
          </>
        )}

        <p className="mt-12 text-xs leading-relaxed text-muted">
          {dict.note}{" "}
          <a href={`/${locale}/privacy#cookies`} className="underline underline-offset-4 hover:text-gold">
            {legal.cookies}
          </a>
          {" · "}
          <a href={`/${locale}/legal-notice`} className="underline underline-offset-4 hover:text-gold">
            {legal.imprint}
          </a>
        </p>

        {/* Visitors can switch language before answering. */}
        <nav aria-label={languageLabel} className="mt-8">
          <ul className="flex flex-wrap justify-center">
            {locales.map((l) => (
              <li key={l.code}>
                <a
                  href={`/${l.code}`}
                  hrefLang={l.htmlLang}
                  lang={l.htmlLang}
                  aria-current={l.code === locale ? "true" : undefined}
                  className={`flex min-h-11 min-w-11 items-center justify-center text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:text-gold ${
                    l.code === locale ? "text-gold" : "text-muted"
                  }`}
                >
                  <span className="sr-only">{l.nativeName} — </span>
                  {l.code}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
