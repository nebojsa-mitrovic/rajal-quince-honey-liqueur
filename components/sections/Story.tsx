import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import orchard from "@/public/images/quince-orchard-rows.jpg";
import quinceCluster from "@/public/images/quince-cluster-closeup.jpg";
import aerial from "@/public/images/quince-orchard-aerial.jpg";

export function Story({ dict }: { dict: Dictionary["story"] }) {
  return (
    <>
      <section
        id="story"
        aria-labelledby="story-title"
        className="relative overflow-x-clip bg-[linear-gradient(180deg,#0b0503_0%,#18140e_30%,#1f2018_75%,#212519_100%)] px-5 pt-16 pb-24 sm:px-8 lg:px-[7vw] lg:pt-32 lg:pb-40"
      >
        <div className="mx-auto grid max-w-[110rem] gap-14 lg:grid-cols-12 lg:items-center lg:gap-x-[4vw]">
          <div className="relative lg:col-span-7">
            <figure data-reveal className="relative aspect-[4/3.3] overflow-hidden shadow-[0_40px_90px_-30px_rgb(0_0_0/0.7)]">
              <div data-parallax="10" className="absolute -inset-y-[8%] inset-x-0">
                <Image
                  src={orchard}
                  alt={dict.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  quality={72}
                  className="object-cover object-[35%_60%]"
                />
              </div>
            </figure>
            <figure
              data-reveal
              className="absolute right-[-4%] bottom-[-14%] w-[42%] max-w-80 overflow-hidden border-[6px] border-[#1d1c15] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.75)] lg:right-[-10%] lg:bottom-[-18%] lg:w-[34%]"
            >
              <div className="relative aspect-[2/3]">
                <Image
                  src={quinceCluster}
                  alt={dict.detailAlt}
                  fill
                  sizes="(min-width: 1024px) 20vw, 42vw"
                  quality={72}
                  className="object-cover"
                />
              </div>
            </figure>
          </div>

          <div data-reveal className="order-first max-w-xl lg:order-none lg:col-span-5 lg:pl-[4vw]">
            <p className="eyebrow">{dict.eyebrow}</p>
            <h2 id="story-title" className="heading mt-5 mb-8">
              {dict.titleA} <em>{dict.titleB}</em>
            </h2>
            {dict.body.map((paragraph, i) => (
              <p key={i} className={`prose-body ${i > 0 ? "mt-5 font-serif text-xl text-ivory/90 italic" : ""}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Quiet aerial interlude: dissolves into both neighbours, no hard edge. */}
      <div aria-hidden className="relative -mt-px h-[48svh] overflow-hidden bg-[#212519] lg:h-[78svh]">
        <div className="fade-y absolute inset-0 opacity-75">
          <div data-parallax="16" className="absolute -inset-y-[10%] inset-x-0">
            <Image
              src={aerial}
              alt=""
              fill
              sizes="100vw"
              quality={72}
              className="object-cover"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(33_37_25/0.55),transparent_40%,transparent_60%,rgb(33_37_25/0.55))]" />
      </div>
    </>
  );
}
