import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import bottle from "@/public/images/bottle-among-rocks.jpg";

export function Bottle({ dict }: { dict: Dictionary["bottle"] }) {
  return (
    <section
      id="bottle"
      aria-labelledby="bottle-title"
      className="relative isolate overflow-hidden bg-[#090403] px-5 pt-8 pb-28 sm:px-8 lg:px-[7vw] lg:py-32"
    >
      <div className="mx-auto grid max-w-[110rem] items-center gap-12 lg:grid-cols-12 lg:gap-x-[4vw]">
        <div className="relative lg:order-2 lg:col-span-6 lg:col-start-7">
          {/* CSS-only warm glow; the product photo itself is never altered. */}
          <div
            aria-hidden
            data-bottle-glow
            className="absolute top-1/2 left-1/2 -z-10 size-[120%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_45%_50%_at_50%_52%,rgb(122_57_27/0.55)_0%,rgb(122_57_27/0.12)_45%,transparent_70%)]"
          />
          <div
            data-bottle-frame
            className="fade-frame-all relative mx-auto aspect-[2/3] w-full max-w-[34rem] lg:h-[86svh] lg:w-auto lg:max-w-none"
          >
            <div data-bottle-image className="absolute inset-0">
              <Image
                src={bottle}
                alt={dict.imageAlt}
                fill
                sizes="(min-width: 1024px) 58vh, (min-width: 640px) 34rem, 100vw"
                quality={82}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div data-reveal className="max-w-xl lg:order-1 lg:col-span-5">
          <p className="eyebrow">{dict.eyebrow}</p>
          <h2 id="bottle-title" className="heading mt-5 mb-10">
            {dict.titleA}
            <br />
            <em>{dict.titleB}</em>
          </h2>
          <dl className="mb-10 grid grid-cols-3 border-y border-line/60">
            {dict.facts.map((fact, i) => (
              <div key={fact.label} className={`py-5 ${i > 0 ? "border-l border-line/60 pl-4 sm:pl-6" : "pr-4"}`}>
                <dt className="text-[0.65rem] tracking-[0.2em] text-muted uppercase">{fact.label}</dt>
                <dd className="mt-2 font-serif text-lg text-gold-soft sm:text-2xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="prose-body">{dict.body}</p>
          <a href="#contact" className="text-link mt-8">
            {dict.cta}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
