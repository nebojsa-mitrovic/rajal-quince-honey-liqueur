import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import bottleWithGlass from "@/public/images/bottle-with-glass.jpg";

export function Experience({ dict }: { dict: Dictionary["experience"] }) {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#15100c_0%,#0e0805_45%,#090403_100%)] pb-28 lg:py-24"
    >
      {/* Photo's black backdrop dissolves into the section instead of sitting in a box. */}
      <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-[64%]">
        <div data-reveal className="fade-bottom relative aspect-[5/4] sm:aspect-[3/2] lg:fade-frame-left lg:aspect-auto lg:h-full">
          <Image
            src={bottleWithGlass}
            alt={dict.imageAlt}
            fill
            sizes="(min-width: 1024px) 64vw, 100vw"
            quality={82}
            className="object-cover object-[44%_55%] lg:object-[38%_50%]"
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-[110rem] px-5 sm:px-8 lg:px-[7vw]">
        <div className="max-w-xl lg:w-[40%] lg:max-w-none lg:py-16">
          <div data-reveal>
            <p className="eyebrow">{dict.eyebrow}</p>
            <h2 id="experience-title" className="heading mt-5 mb-8">
              {dict.titleA}
              <br />
              <em>{dict.titleB}</em>
            </h2>
            <p className="prose-body">{dict.body}</p>
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <ServeList title={dict.servesTitle} items={dict.serves} />
            <ServeList title={dict.pairingsTitle} items={dict.pairings} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServeList({ title, items }: { title: string; items: string[] }) {
  return (
    <div data-reveal>
      <h3 className="eyebrow mb-4">{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item} className="border-t border-line/60 py-3 text-[0.95rem] text-ivory/90">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
