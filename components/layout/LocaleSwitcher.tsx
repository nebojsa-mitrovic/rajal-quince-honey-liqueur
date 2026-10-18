"use client";

import { useEffect, useId, useRef, useState } from "react";

export type LocaleOption = {
  code: string;
  nativeName: string;
  htmlLang: string;
};

type Props = {
  current: string;
  locales: LocaleOption[];
  label: string;
  /** Inline list (mobile menu) instead of a dropdown. */
  inline?: boolean;
};

export function LocaleSwitcher({ current, locales, label, inline = false }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const items = locales.map((l) => (
    <li key={l.code}>
      <a
        href={`/${l.code}`}
        hrefLang={l.htmlLang}
        lang={l.htmlLang}
        aria-current={l.code === current ? "true" : undefined}
        className={`flex min-h-11 items-center gap-3 px-4 text-sm transition-colors hover:text-gold ${
          l.code === current ? "text-gold" : "text-ivory/85"
        }`}
      >
        <span className="w-7 text-xs font-semibold tracking-[0.14em] uppercase">{l.code}</span>
        <span>{l.nativeName}</span>
      </a>
    </li>
  ));

  if (inline) {
    return (
      <nav aria-label={label}>
        <ul className="-mx-4 grid grid-cols-2 gap-x-2">{items}</ul>
      </nav>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-11 items-center gap-2 px-2 text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:text-gold"
      >
        <span className="sr-only">{label}: </span>
        {current}
        <svg aria-hidden width="10" height="6" viewBox="0 0 10 6" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
      <ul
        id={listId}
        hidden={!open}
        className="absolute top-full right-0 mt-2 w-52 border border-line/60 bg-espresso/95 py-2 shadow-2xl backdrop-blur"
      >
        {items}
      </ul>
    </div>
  );
}
