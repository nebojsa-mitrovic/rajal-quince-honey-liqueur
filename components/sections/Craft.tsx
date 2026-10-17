import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import beekeeper from "@/public/images/beekeeper-at-hive.jpg";
import frame from "@/public/images/honeycomb-frame.jpg";

export function Craft({ dict }: { dict: Dictionary["craft"] }) {
  return (
    <section
      id="craft"
      aria-labelledby="craft-title"
      className="relative bg-[linear-gradient(180deg,#181b14_0%,#17150f_60%,#15100c_100%)] px-5 pt-12 pb-32 sm:px-8 lg:px-[7vw] lg:pt-24 lg:pb-48"
    >
      <div className="mx-auto grid max-w-[110rem] gap-16 lg:grid-cols-12 lg:items-center lg:gap-x-[4vw]">
        <div className="relative lg:col-span-6">
          <figure data-reveal className="relative w-[86%] sm:w-[72%] lg:w-[78%]">
            <div className="relative aspect-[2/3] overflow-hidden">
              <div data-parallax="10" className="absolute -inset-y-[8%] inset-x-0">
                <Image
                  src={beekeeper}
                  alt={dict.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 38vw, (min-width: 640px) 60vw, 86vw"
                  quality={72}
                  placeholder="blur"
                  className="object-cover object-[50%_40%]"
                />
              </div>
            </div>
            <figcaption className="mt-4 font-serif text-sm text-muted italic">{dict.caption}</figcaption>
          </figure>

          <figure
            data-reveal
            className="absolute right-0 bottom-[12%] w-[52%] overflow-hidden border-[6px] border-[#17150f] shadow-[0_30px_70px_-25px_rgb(0_0_0/0.8)] lg:right-[-4%] lg:w-[48%]"
          >
            <div className="relative aspect-[3/2]">
              <Image
                src={frame}
                alt={dict.detailAlt}
                fill
                sizes="(min-width: 1024px) 26vw, 52vw"
                quality={72}
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </figure>
        </div>

        <div className="max-w-xl lg:col-span-5 lg:col-start-8">
          <div data-reveal>
            <p className="eyebrow">{dict.eyebrow}</p>
            <h2 id="craft-title" className="heading mt-5 mb-8">
              {dict.titleA}
              <br />
              <em>{dict.titleB}</em>
            </h2>
            {dict.body.map((paragraph, i) => (
              <p key={i} className="prose-body">
                {paragraph}
              </p>
            ))}
          </div>
          <ul className="mt-12 space-y-0 border-t border-line/50">
            {dict.principles.map((principle) => (
              <li
                key={principle}
                data-reveal
                className="flex items-center gap-5 border-b border-line/50 py-5 font-serif text-xl text-gold-soft sm:text-2xl"
              >
                <span aria-hidden className="h-px w-6 bg-gold" />
                {principle}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
