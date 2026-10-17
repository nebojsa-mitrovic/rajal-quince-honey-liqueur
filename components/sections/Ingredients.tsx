import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import bees from "@/public/images/bees-on-honeycomb.jpg";
import quince from "@/public/images/quince-on-branch.jpg";

type Dict = Dictionary["ingredients"];

/**
 * Two renderings of the same story, toggled purely in CSS (see `.ing-pinned`
 * in globals.css) so there is no layout shift on load:
 * - pinned: desktop + motion allowed, driven by GSAP in PageMotion
 * - stacked: mobile, small screens, reduced motion, no JS
 * The hidden one is `display: none`, so it is skipped by assistive tech and
 * its lazy images never load.
 */
export function Ingredients({ dict }: { dict: Dict }) {
  return (
    <section
      id="ingredients"
      aria-labelledby="ingredients-title"
      className="relative z-10 -mt-[16svh] bg-[linear-gradient(180deg,transparent_0%,#212519_16svh,#1d2218_55%,#181b14_100%)] lg:-mt-[26svh] lg:bg-[linear-gradient(180deg,transparent_0%,#212519_26svh,#1d2218_55%,#181b14_100%)]"
    >
      <div
        data-reveal
        className="mx-auto max-w-[110rem] px-5 pt-[8svh] sm:px-8 lg:flex lg:items-end lg:justify-between lg:gap-16 lg:px-[7vw]"
      >
        <div>
          <p className="eyebrow">{dict.eyebrow}</p>
          <h2 id="ingredients-title" className="heading mt-5">
            {dict.titleA}
            <br />
            <em>{dict.titleB}</em>
          </h2>
        </div>
        <p className="prose-body mt-8 max-w-md lg:mt-0 lg:mb-3">{dict.intro}</p>
      </div>

      <PinnedSequence dict={dict} />
      <StackedSequence dict={dict} />
    </section>
  );
}

function PinnedSequence({ dict }: { dict: Dict }) {
  const steps = [dict.quince, dict.honey];
  return (
    <div className="ing-pinned">
      <div data-ing-stage className="relative h-svh overflow-hidden">
        <div className="mx-auto grid h-full max-w-[110rem] grid-cols-12 items-center gap-x-[3vw] px-[7vw]">
          {/* Text column with progress rail */}
          <div data-ing-text className="col-span-4 flex items-center gap-10">
            <ol aria-label={dict.progressLabel} className="relative flex flex-col gap-5 py-1">
              <span aria-hidden className="absolute top-0 bottom-0 left-[3px] w-px bg-line/60" />
              <span
                aria-hidden
                data-ing-progress
                className="absolute top-0 bottom-0 left-[3px] w-px origin-top scale-y-0 bg-gold"
              />
              {["I", "II", "III"].map((n, i) => (
                <li
                  key={n}
                  data-ing-marker={i}
                  className="relative pl-6 font-serif text-sm text-muted/60 transition-colors duration-500 data-[active=true]:text-gold"
                  data-active={i === 0}
                >
                  <span aria-hidden className="absolute top-1/2 left-0 size-[7px] -translate-y-1/2 rounded-full border border-current bg-[#1d2218]" />
                  {n}
                </li>
              ))}
            </ol>
            <div className="grid">
              {steps.map((step, i) => (
                <article
                  key={step.label}
                  data-ing-step={i}
                  className="col-start-1 row-start-1 self-center"
                  style={i > 0 ? { opacity: 0 } : undefined}
                >
                  <p className="eyebrow">{step.label}</p>
                  <h3 className="subheading mt-4 mb-4">{step.title}</h3>
                  <p className="prose-body max-w-sm">{step.text}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Image frame */}
          <div className="col-span-7 col-start-6 h-[78svh]">
            <div data-ing-media className="relative h-full overflow-hidden shadow-[0_50px_100px_-40px_rgb(0_0_0/0.8)]">
              <div data-ing-img="quince" className="absolute inset-0">
                <Image
                  src={quince}
                  alt={dict.quince.imageAlt}
                  fill
                  sizes="58vw"
                  quality={72}
                  placeholder="blur"
                  className="object-cover object-[50%_48%]"
                />
              </div>
              <div
                data-ing-img="honey"
                className="absolute inset-0"
                style={{ clipPath: "inset(100% 0% 0% 0%)" }}
              >
                <Image
                  src={bees}
                  alt={dict.honey.imageAlt}
                  fill
                  sizes="58vw"
                  quality={72}
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Typographic mystery beat */}
        <div
          data-ing-secret
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-[7vw] text-center"
          style={{ opacity: 0 }}
        >
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(200_161_107/0.16)_0%,transparent_65%)]"
          />
          <article className="relative max-w-4xl">
            <p className="eyebrow">{dict.secret.label}</p>
            <h3 className="mt-6 font-serif text-[clamp(3rem,2rem+4vw,6.5rem)] leading-[1.02] tracking-[-0.03em] text-balance italic">
              {dict.secret.title}
            </h3>
            <p className="prose-body mx-auto mt-8 max-w-lg text-ivory/80">{dict.secret.text}</p>
          </article>
        </div>
      </div>
    </div>
  );
}

function StackedSequence({ dict }: { dict: Dict }) {
  return (
    <div className="ing-stacked mx-auto overflow-x-clip max-w-[110rem] px-5 pt-16 pb-28 sm:px-8 lg:px-[7vw] lg:pb-40">
      <div className="grid gap-20 md:grid-cols-2 md:gap-[5vw]">
        <article data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={quince}
              alt={dict.quince.imageAlt}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              quality={72}
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <p className="eyebrow mt-8">{dict.quince.label}</p>
          <h3 className="subheading mt-3 mb-3">{dict.quince.title}</h3>
          <p className="prose-body max-w-sm">{dict.quince.text}</p>
        </article>

        <article data-reveal className="md:mt-40">
          <div className="relative ml-auto aspect-[4/5] w-[88%] overflow-hidden md:w-full">
            <Image
              src={bees}
              alt={dict.honey.imageAlt}
              fill
              sizes="(min-width: 768px) 45vw, 88vw"
              quality={72}
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <p className="eyebrow mt-8">{dict.honey.label}</p>
          <h3 className="subheading mt-3 mb-3">{dict.honey.title}</h3>
          <p className="prose-body max-w-sm">{dict.honey.text}</p>
        </article>
      </div>

      <article data-reveal className="relative mx-auto mt-28 max-w-2xl py-10 text-center">
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -z-0 size-[min(36rem,110vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(200_161_107/0.13)_0%,transparent_65%)]"
        />
        <p className="eyebrow relative">{dict.secret.label}</p>
        <h3 className="relative mt-5 font-serif text-[clamp(2.4rem,1.8rem+2.6vw,4rem)] leading-[1.06] text-balance italic">
          {dict.secret.title}
        </h3>
        <p className="prose-body relative mt-6">{dict.secret.text}</p>
      </article>
    </div>
  );
}
