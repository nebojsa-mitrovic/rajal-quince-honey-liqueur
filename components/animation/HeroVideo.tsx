"use client";

import { useEffect, useRef, useState } from "react";

type NetworkInformation = { saveData?: boolean };

/**
 * Progressive hero video. Renders nothing until the client has confirmed that
 * motion is welcome and Save-Data is off; the still photo underneath stays the
 * poster and the permanent fallback (blocked autoplay, errors, reduced motion).
 */
export function HeroVideo({ desktopSrc, mobileSrc }: { desktopSrc: string; mobileSrc: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: NetworkInformation }).connection
      ?.saveData;
    if (reduce || saveData) return;
    const desktop = window.matchMedia("(min-width: 900px) and (min-aspect-ratio: 1/1)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- source depends on client-only media queries
    setSrc(desktop ? desktopSrc : mobileSrc);
  }, [desktopSrc, mobileSrc]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !src) return;
    video.play().catch(() => {
      /* Autoplay blocked: keep the still. */
    });
  }, [src]);

  if (!src) return null;

  return (
    <video
      ref={ref}
      aria-hidden
      className={`absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-[1500ms] ${
        playing ? "opacity-100" : "opacity-0"
      }`}
      src={src}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      onPlaying={() => setPlaying(true)}
      onError={() => setPlaying(false)}
    />
  );
}
