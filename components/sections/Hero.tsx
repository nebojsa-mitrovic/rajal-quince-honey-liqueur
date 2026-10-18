import Image from "next/image";
import { HeroVideo } from "@/components/animation/HeroVideo";
import type { Dictionary } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import heroStill from "@/public/images/hero-bottle-on-stones.jpg";

export function Hero({ dict }: { dict: Dictionary["hero"] }) {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-night wide:justify-center"
    >
      {/* Warm halo behind the bottle so the photo's black merges with the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_72%_58%,#2c1509_0%,transparent_70%)]"
      />

      <div data-hero-media className="hero-media -z-10 will-change-transform">
        <Image
          src={heroStill}
          alt={dict.imageAlt}
          preload
          fill
          sizes="(min-width: 900px) and (min-aspect-ratio: 1/1) 67svh, 100vw"
          quality={82}
          className="object-cover"
        />
      </div>

      {siteConfig.heroVideo ? (
        <HeroVideo
          desktopSrc={siteConfig.heroVideo.desktop}
          mobileSrc={siteConfig.heroVideo.mobile}
        />
      ) : null}

      {siteConfig.heroVideo ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_35%,#0b0503_80%)] wide:bg-[linear-gradient(90deg,#0b0503_0%,rgb(11_5_3/0.82)_38%,transparent_75%)]"
        />
      ) : null}

      {/* Bottom blend into Our Story */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(180deg,transparent,#0b0503)]"
      />

      <div
        data-hero-copy
        className="hero-copy relative -mt-20 px-5 pb-28 sm:-mt-10 sm:px-8 wide:mt-0 wide:px-[7vw] wide:pt-32 wide:pb-24"
      >
        <p className="eyebrow hero-enter">{dict.eyebrow}</p>
        <h1 id="hero-title" className="display hero-enter mt-5 mb-6">
          {dict.titleA}
          <br />
          <em>{dict.titleB}</em>
        </h1>
        <p className="prose-body hero-enter-delayed max-w-md text-ivory/80">{dict.lead}</p>
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
