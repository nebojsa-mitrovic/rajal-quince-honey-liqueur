import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import beekeeperBottle from "@/public/images/beekeeper-holding-bottle.jpg";

type Dict = Dictionary["contact"];

export function Contact({ dict }: { dict: Dict }) {
  const { privateEmail, tradeEmail, phone } = siteConfig.contact;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative bg-[linear-gradient(180deg,#090403_0%,#16130d_35%,#1d2017_75%,#20241a_100%)] px-5 pt-24 pb-28 sm:px-8 lg:px-[7vw] lg:pt-40 lg:pb-40"
    >
      <div className="mx-auto grid max-w-[110rem] gap-16 lg:grid-cols-12 lg:items-center lg:gap-x-[4vw]">
        <div className="lg:col-span-7">
          <div data-reveal className="max-w-2xl">
            <p className="eyebrow">{dict.eyebrow}</p>
            <h2 id="contact-title" className="heading mt-5 mb-8">
              {dict.titleA}
              <br />
              <em>{dict.titleB}</em>
            </h2>
            <p className="prose-body">{dict.body}</p>
          </div>

          <div className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-10">
            <EnquiryBlock
              title={dict.privateTitle}
              text={dict.privateText}
              email={privateEmail}
              phone={phone}
              dict={dict}
            />
            <EnquiryBlock
              title={dict.tradeTitle}
              text={dict.tradeText}
              email={tradeEmail ?? privateEmail}
              phone={phone}
              dict={dict}
            />
          </div>
        </div>

        <figure data-reveal className="relative mx-auto w-full max-w-md lg:col-span-4 lg:col-start-9 lg:max-w-none">
          <div className="relative aspect-[2/3] overflow-hidden">
            <div data-parallax="8" className="absolute -inset-y-[6%] inset-x-0">
              <Image
                src={beekeeperBottle}
                alt={dict.imageAlt}
                fill
                sizes="(min-width: 1024px) 30vw, 90vw"
                quality={72}
                className="object-cover"
              />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}

function EnquiryBlock({
  title,
  text,
  email,
  phone,
  dict,
}: {
  title: string;
  text: string;
  email: string | null;
  phone: string | null;
  dict: Dict;
}) {
  return (
    <div data-reveal className="border-t border-line/60 pt-6">
      <h3 className="font-serif text-2xl">{title}</h3>
      <p className="prose-body mt-3 text-[0.95rem]">{text}</p>
      {email || phone ? (
        <ul className="mt-6 space-y-1">
          {email ? (
            <li>
              <a href={`mailto:${email}`} className="text-link normal-case tracking-normal">
                <span className="sr-only">{dict.emailLabel}: </span>
                {email}
              </a>
            </li>
          ) : null}
          {phone ? (
            <li>
              <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="text-link normal-case tracking-normal">
                <span className="sr-only">{dict.phoneLabel}: </span>
                {phone}
              </a>
            </li>
          ) : null}
        </ul>
      ) : (
        // Deliberately plain text: nothing that looks clickable until real details exist.
        <p className="mt-6 text-sm text-gold-soft/90 italic">{dict.pending}</p>
      )}
    </div>
  );
}
