import Image from "next/image";
import { HeroVideo } from "@/components/animation/HeroVideo";
import type { Dictionary } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import heroStill from "@/public/images/hero-bottle-on-stones.jpg";
import videoPoster from "@/public/images/hero-video-poster.jpg";

type Dict = Dictionary["hero"];

export function Hero({ dict }: { dict: Dict }) {
  const video = siteConfig.heroVideo;

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className={`relative isolate flex min-h-svh flex-col overflow-hidden bg-night wide:justify-center ${
        video ? "justify-end" : ""
      }`}
    >
      {video ? (
        <VideoBackdrop desktopSrc={video.desktop} mobileSrc={video.mobile} />
      ) : (
        <StillBackdrop alt={dict.imageAlt} />
      )}

      {/* Bottom blend into Our Story */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(180deg,transparent,#0b0503)]"
      />

      <div
        data-hero-copy
        className={`hero-copy relative px-5 sm:px-8 wide:mt-0 wide:px-[7vw] wide:pt-32 wide:pb-24 ${
          video ? "pt-40 pb-24 sm:pb-28" : "-mt-20 pb-28 sm:-mt-10"
        }`}
      >
        <p className="eyebrow hero-enter">{dict.eyebrow}</p>
        <h1 id="hero-title" className="display hero-rise mt-5 mb-6">
          {dict.titleA}
          <br />
          <em>{dict.titleB}</em>
        </h1>
        <p className="prose-body hero-enter-delayed max-w-md text-ivory/85">{dict.lead}</p>
        <a href="#story" className="text-link hero-enter-delayed mt-8">
          {dict.cta}
          <span aria-hidden>→</span>
        </a>
      </div>

      <span
        aria-hidden
        className="absolute bottom-8 left-5 hidden text-[0.65rem] tracking-[0.24em] text-muted/80 uppercase sm:left-8 md:block wide:left-[7vw]"
      >
        ↓&nbsp;&nbsp;{dict.scroll}
      </span>
    </section>
  );
}

/**
 * Full-bleed orchard video. The poster frame is the LCP image and the
 * fallback; a warm multiply grade plus gradients keep the type readable
 * and pull the bright daylight footage into the dark palette.
 */
function VideoBackdrop({ desktopSrc, mobileSrc }: { desktopSrc: string; mobileSrc: string }) {
  return (
    <>
      <div data-hero-media aria-hidden className="absolute inset-0 -z-10 will-change-transform">
        <Image
          src={videoPoster}
          alt=""
          preload
          fill
          sizes="100vw"
          quality={72}
          className="object-cover"
        />
        <HeroVideo desktopSrc={desktopSrc} mobileSrc={mobileSrc} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[#5a2a12]/35 mix-blend-multiply"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(11_5_3/0.55)_0%,rgb(11_5_3/0.2)_30%,rgb(11_5_3/0.75)_62%,rgb(11_5_3/0.95)_100%)] wide:bg-[linear-gradient(90deg,rgb(11_5_3/0.9)_0%,rgb(11_5_3/0.7)_36%,rgb(11_5_3/0.25)_72%,rgb(11_5_3/0.4)_100%)]"
      />
    </>
  );
}

/** Bottle photo hero, used when the video is switched off. */
function StillBackdrop({ alt }: { alt: string }) {
  return (
    <>
      {/* Warm halo behind the bottle so the photo's black merges with the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_72%_58%,#2c1509_0%,transparent_70%)]"
      />
      <div data-hero-media className="hero-media -z-10 will-change-transform">
        <Image
          src={heroStill}
          alt={alt}
          preload
          fill
          sizes="(min-width: 900px) and (min-aspect-ratio: 1/1) 67svh, 100vw"
          quality={82}
          className="object-cover"
        />
      </div>
    </>
  );
}
