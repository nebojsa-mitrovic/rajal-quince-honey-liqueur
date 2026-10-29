import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { company } from "@/content/company";
import { featuredPerson } from "@/content/team";
import { siteConfig } from "@/lib/site-config";

type Dict = Dictionary["contact"];

export function Contact({ dict }: { dict: Dict }) {
  const { privateEmail, tradeEmail, phone } = siteConfig.contact;
  const people = dict.people;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative bg-[linear-gradient(180deg,#090403_0%,#16130d_35%,#1d2017_75%,#20241a_100%)] px-5 pt-24 pb-28 sm:px-8 lg:px-[7vw] lg:pt-40 lg:pb-40"
    >
      {/* Intro + who to contact for what */}
      <div className="mx-auto grid max-w-[110rem] gap-14 lg:grid-cols-12 lg:items-end lg:gap-x-[4vw]">
        <div data-reveal className="max-w-2xl lg:col-span-6">
          <p className="eyebrow">{dict.eyebrow}</p>
          <h2 id="contact-title" className="heading mt-5 mb-8">
            {dict.titleA}
            <br />
            <em>{dict.titleB}</em>
          </h2>
          <p className="prose-body">{dict.body}</p>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 sm:gap-10 lg:col-span-5 lg:col-start-8">
          <EnquiryBlock title={dict.privateTitle} text={dict.privateText} />
          <EnquiryBlock
            title={dict.tradeTitle}
            text={dict.tradeText}
            // Only shown when trade enquiries have their own address.
            email={tradeEmail !== privateEmail ? tradeEmail : null}
            dict={dict}
          />
        </div>
      </div>

      {/* The people behind RAJAL — the person you will be talking to, then the details. */}
      <div
        role="group"
        aria-labelledby="people-title"
        className="mx-auto mt-28 grid max-w-[110rem] gap-12 sm:mt-36 lg:mt-44 lg:grid-cols-12 lg:items-center lg:gap-x-[4vw]"
      >
        <figure
          data-reveal
          className="w-[72%] max-w-[18rem] sm:max-w-[20rem] lg:col-span-4 lg:col-start-2 lg:w-full lg:max-w-[25rem]"
        >
          <div className="relative aspect-[4/5] overflow-hidden shadow-[0_40px_80px_-30px_rgb(0_0_0/0.75)]">
            <div data-parallax="6" className="absolute -inset-y-[5%] inset-x-0">
              <Image
                src={featuredPerson.portrait}
                alt={people.portraitAlt}
                fill
                sizes="(min-width: 1024px) 25rem, (min-width: 640px) 20rem, 72vw"
                quality={78}
                // Gentle warm grade so the studio portrait sits in the palette.
                className="object-cover [filter:saturate(0.88)_sepia(0.06)_contrast(1.02)]"
                style={{ objectPosition: featuredPerson.objectPosition }}
              />
            </div>
            {/* Soft fade at the bottom edge (hides the studio chair, blends into the section). */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/4 bg-[linear-gradient(180deg,transparent,rgb(29_32_23/0.85))]"
            />
          </div>
        </figure>

        <div className="max-w-xl lg:col-span-6 lg:col-start-7">
          <div data-reveal>
            <p className="eyebrow">{people.eyebrow}</p>
            <h3
              id="people-title"
              className="mt-5 font-serif text-[clamp(2rem,1.4rem+2.2vw,3.4rem)] leading-[1.1] tracking-[-0.025em] text-balance"
            >
              {people.title}
            </h3>
          </div>
          <p data-reveal className="prose-body mt-6">
            {people.intro}
          </p>
          <div data-reveal className="mt-10 flex items-center gap-5">
            <span aria-hidden className="h-px w-10 bg-gold" />
            <p>
              <span className="block font-serif text-2xl text-ivory">{featuredPerson.name}</span>
              <span className="mt-1 block text-xs tracking-[0.16em] text-muted uppercase">{people.role}</span>
            </p>
          </div>

          <div data-reveal className="mt-12">
            {privateEmail || phone ? (
              <dl className="grid gap-6 sm:grid-cols-[auto_auto] sm:justify-start sm:gap-x-12 lg:grid-cols-1">
                {privateEmail ? (
                  <div>
                    <dt className="eyebrow">{dict.emailLabel}</dt>
                    <dd className="mt-2">
                      <ContactLink href={`mailto:${privateEmail}`}>{privateEmail}</ContactLink>
                    </dd>
                  </div>
                ) : null}
                {phone ? (
                  <div>
                    <dt className="eyebrow">{dict.phoneLabel}</dt>
                    <dd className="mt-2">
                      <ContactLink href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</ContactLink>
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : (
              // Deliberately plain text: nothing that looks clickable until real details exist.
              <p className="text-sm text-gold-soft/90 italic">{dict.pending}</p>
            )}
            {/* Name and country only — the full address lives in the legal notice. */}
            <address className="prose-body mt-8 not-italic text-ivory/90">
              {company.contactName}
              <br />
              {dict.country}
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="inline-flex min-h-11 items-center border-b border-gold font-serif text-xl break-words text-ivory transition-colors hover:text-gold sm:text-2xl"
    >
      {children}
    </a>
  );
}

function EnquiryBlock({
  title,
  text,
  email,
  dict,
}: {
  title: string;
  text: string;
  email?: string | null;
  dict?: Dict;
}) {
  return (
    <div data-reveal className="border-t border-line/60 pt-6">
      <h3 className="font-serif text-2xl">{title}</h3>
      <p className="prose-body mt-3 text-[0.95rem]">{text}</p>
      {email && dict ? (
        <p className="mt-4">
          <span className="sr-only">{dict.emailLabel}: </span>
          <ContactLink href={`mailto:${email}`}>{email}</ContactLink>
        </p>
      ) : null}
    </div>
  );
}
